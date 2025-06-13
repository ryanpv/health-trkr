import logging

from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from database import get_session
from fastapi import APIRouter, Depends, HTTPException
from models.reward import Reward, RewardCreate, RewardUpdate
from models.user_stats import UserStats
from sqlalchemy import asc, select, update
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

router = APIRouter()


# POST REWARD
@router.post("/rewards", status_code=201)
async def create_reward(
    reward_data: RewardCreate,
    session: AsyncSession = Depends(get_session),
    uid: str = Depends(verify_token_and_email)
  ):
  try:
    user_id = await get_cached_uid(firebase_uid=uid)

    new_reward = Reward(
      title=reward_data.title,
      user_id=user_id
    )

    session.add(new_reward)
    await session.commit()
    await session.refresh(new_reward)


    return {"id": new_reward.id, "message": "Successfully created reward"}
  except Exception as e:
    logger.error(f"Unable to create user's reward: {e}")
    raise HTTPException(
      status_code=500, detail="Unable to create a reward at this time."
    )



# GET REWARD
@router.get("/rewards", status_code=200)
async def get_rewards(
    session: AsyncSession = Depends(get_session),
    uid: str = Depends(verify_token_and_email)
):
  try:
    user_id = await get_cached_uid(firebase_uid=uid)

    result = await session.execute(
      select(Reward).where(Reward.user_id == user_id).order_by(asc(Reward.date)) # type: ignore
    )

    rewards = result.scalars().all()

    return rewards

  except Exception as e:
    logger.error(f"Unable to retrieve user's rewards: {e}")
    raise HTTPException(
      status_code=500, detail="Unable to retrieve user rewards."
    )
  

# UPDATE REWARD
@router.patch("/rewards", status_code=201)
async def update_rewards(
  reward_data: RewardUpdate,
  session: AsyncSession = Depends(get_session),
  uid: str = Depends(verify_token_and_email)
):
  try:
    user_id = await get_cached_uid(firebase_uid=uid)

    async with session.begin():
      # Check if reward exists
      reward_row = await session.execute(
        select(Reward).where(Reward.id == reward_data.id, Reward.user_id == user_id) # type: ignore
      )

      reward = reward_row.scalar_one_or_none() 
      if reward is None:
        logger.error("reward does not exist")
        raise HTTPException(status_code=404, detail="Reward does not exist.")

      # Update the reward
      update_reward = reward_data.dict(exclude_unset=True)

      if update_reward:
        await session.execute(
          update(Reward)
          .where(Reward.id == reward_data.id) # type: ignore
          .values(**update_reward)
        )
      
      print(f"REWARD UPDATE REQUEST: {update_reward}")

      # Update user stats table if reward is redeemed
      if reward_data.status == "redeemed":
        check_user_stats = await session.execute(select(UserStats).where(UserStats.user_id == user_id)) # type: ignore
        user_stats = check_user_stats.scalar_one_or_none()

        if user_stats is not None and reward_data.points_cost:
          user_stats.total_points -= reward_data.points_cost
        else:
          logger.error("User stats does not exist or no rewards points cost provided.")
          raise HTTPException(status_code=400, detail="No user stats found or no reward points cost provided.")
      
        session.add(user_stats)

      return {"message", f"Successfully redeemed reward: {reward_data.id}"}
  except Exception as e:
    logger.error(f"Unable to update reward: {e}")
    raise HTTPException(
      status_code=500, detail="Unable to update user reward."
    )