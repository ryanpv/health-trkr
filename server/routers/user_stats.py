from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from database import get_session
from fastapi import APIRouter, Body, Depends, HTTPException, status
from models.quest import Quest, QuestUpdate
from models.user_stats import UserStats
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
      
      if quest.quest_status == 'complete':
        raise HTTPException(status_code=400, detail="Quest has already been completed.")
      
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
      check_stats = await session.execute(select(UserStats).where(UserStats.user_id == user_id)) # type: ignore
      user_stats = check_stats.scalar_one_or_none()

      curr_date = datetime.now(timezone.utc)
      server_timezone = ZoneInfo("America/Toronto")

      if not user_stats:
        new_stats = UserStats(
          user_id=user_id,
          total_points=points_to_add,
          current_daily_streak=1,
          last_daily_completed=curr_date,
          current_weekly_streak=1,
          last_weekly_completed=curr_date
        )
        session.add(new_stats)
      else:
        # Add points from completed quests
        user_stats.total_points += points_to_add
      
        # Daily streak update
        if (
          user_stats.last_daily_completed 
          and (user_stats.last_daily_completed + timedelta(days=1)).date() < curr_date.astimezone(server_timezone).date()
        ):
          print('*** DAILY STREAK IS BROKEN.')
          user_stats.current_daily_streak = 1
        elif (
          user_stats.last_daily_completed
          and user_stats.last_daily_completed.date() == curr_date.astimezone(server_timezone).date()
        ):
          print("*** DAILY ALREADY COMPLETED.")
        else:
          print("*** DAILY STREAK CONTINUES.")
          user_stats.current_daily_streak += 1

        user_stats.last_daily_completed = curr_date.astimezone(server_timezone)

        # Weekly streak update
        if user_stats.current_daily_streak > 7:
          user_stats.current_weekly_streak = user_stats.current_daily_streak // 7
          print("*** WEEKLY STREAK CONTINUES")
        else:
          user_stats.current_weekly_streak = 1
          print("*** WEEKLY STREAK STARTING")
           
        session.add(user_stats)
    return {"message": f"Successfully added {payload} points."}
  except Exception as e:
    print(f"Error receiving user stats: {e}")
    raise HTTPException(
      status_code=500, detail="Error receiving stats"
    )

