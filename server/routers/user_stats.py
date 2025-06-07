from datetime import datetime, timedelta

from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from database import get_session
from fastapi import APIRouter, Body, Depends, HTTPException, status
from models.quest import Quest, QuestUpdate
from models.user_stats import UserStatsBase
from sqlalchemy import insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.post("/user_stats", status_code=201)
async def post_user_stats(
  payload: QuestUpdate = Body(...),
  uid=Depends(verify_token_and_email),
  session: AsyncSession = Depends(get_session),
):
  try:
    print(f"***points: {payload}")
    user_id = await get_cached_uid(firebase_uid=uid)

    async with session.begin():
      # Update quest status
      quest_row = await session.execute(
        select(Quest).where(Quest.user_id == user_id, Quest.id == payload.id) # type: ignore
      ) 
      quest = quest_row.scalar_one_or_none()

      if not quest:
        raise HTTPException(status_code=404, detail="Unable to find quest.")
      
      update_quest_row = payload.dict(exclude_unset=True)
      points_to_add = update_quest_row.pop("points", 0)

      if update_quest_row:
        await session.execute(
          update(Quest)
          .where(Quest.id == payload.id) #type: ignore
          .values(**update_quest_row)
        )

      print(f"QUEST ROW: {update_quest_row}")

      # Update user stats
      curr_time = datetime.now()

      check_stats = await session.execute(select(UserStatsBase).where(UserStatsBase.user_id == user_id)) # type: ignore
      user_stats = check_stats.scalar_one_or_none()

      if not user_stats:
        new_stats = UserStatsBase(
          user_id=user_id,
          total_points=points_to_add,
          current_daily_streak=1,
          last_daily_completed=curr_time,
          current_weekly_streak=1,
          last_weekly_completed=curr_time
        )
        session.add(new_stats)
      else:
        user_stats.total_points += points_to_add

        # Daily streak update
        if user_stats.last_daily_completed and user_stats.last_daily_completed >= curr_time - timedelta(days=1):
          user_stats.current_daily_streak += 1
        else:
          user_stats.current_daily_streak = 1
        
        user_stats.last_daily_completed = curr_time

        # Weekly streak update
        if user_stats.last_weekly_completed and user_stats.last_weekly_completed >= curr_time - timedelta(days=7):
          user_stats.current_weekly_streak += 1
        else:
          user_stats.current_weekly_streak = 1

        user_stats.last_weekly_completed = curr_time

        session.add(user_stats)

    return {"message": f"Successfully added {payload} points."}
  except Exception as e:
    print(f"Error receiving user stats: {e}")
    return { "message": "Error receiving stats"}
