from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from database import get_session
from fastapi import APIRouter, Depends, HTTPException
from models.reward import Reward, RewardCreate
from sqlalchemy import asc, select
from sqlalchemy.ext.asyncio import AsyncSession

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
    print(f"Error cxx reating reward: {e}")
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
    print(f"Unable to retrieve user's rewards: {e}")
    raise HTTPException(
      status_code=500, detail="Unable to retrieve user rewards."
    )