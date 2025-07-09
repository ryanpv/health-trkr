import logging
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from database import get_session
from fastapi import APIRouter, Body, Depends, HTTPException, status
from models.quest import Quest
from models.user_stats import BonusPointsUpdate, StatsUpdate, UserStats
from sqlalchemy import func, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)
router = APIRouter()



@router.post("/user_stats", status_code=200)
async def post_user_stats(
  payload: StatsUpdate = Body(...),
  uid=Depends(verify_token_and_email),
  session: AsyncSession = Depends(get_session),
):
  try:
    user_id = await get_cached_uid(firebase_uid=uid)
    curr_date = datetime.now(timezone.utc)
    server_timezone = ZoneInfo("America/Toronto")

    async with session.begin():
      # Check existence of quest to be updated
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

      if update_quest_row.get("quest_status") == "complete":
        update_quest_row["completed_at"] = curr_date.astimezone(server_timezone)

      if update_quest_row:
        await session.execute(
          update(Quest)
          .where(Quest.id == payload.id) #type: ignore
          .values(**update_quest_row)
        )

      # Update user stats
      check_stats = await session.execute(select(UserStats).where(UserStats.user_id == user_id)) # type: ignore
      user_stats = check_stats.scalar_one_or_none()

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
          user_stats.current_daily_streak = 1
        elif (
          user_stats.last_daily_completed
          and user_stats.last_daily_completed.date() == curr_date.astimezone(server_timezone).date()
        ):
          print("*** DAILY ALREADY COMPLETED.")
        else:
          user_stats.current_daily_streak += 1

        user_stats.last_daily_completed = curr_date.astimezone(server_timezone)

        # Weekly streak update
        if user_stats.current_daily_streak > 7:
          user_stats.current_weekly_streak = user_stats.current_daily_streak // 7
        else:
          user_stats.current_weekly_streak = 1
           
        session.add(user_stats)

        # Check if daily bonus can be claimed
        today = curr_date.astimezone(server_timezone).date()
        
        # Query for quests completed today
        completed_today_query = await session.execute(
          select(Quest)
          .where(
            Quest.user_id == user_id, # type: ignore
            Quest.quest_status == "complete", # type: ignore
            func.date(Quest.completed_at) == today
          )
        )
        min_daily_completed = len(completed_today_query.scalars().all()) >= 5
        print(f"*** DAILY: {min_daily_completed}")
        # Check if daily bonus has been claimed
        daily_bonus_query = await session.execute(
          select(UserStats)
          .where(
            UserStats.user_id == user_id, #type: ignore
            func.date(UserStats.daily_bonus_claimed_at) == today
          )
        )

        daily_bonus_claimed = daily_bonus_query.scalar_one_or_none()
        print(f"*** DAILY BONUS CLAIMED? : {daily_bonus_claimed}")
        can_claim_bonus = (min_daily_completed and (
        daily_bonus_claimed is None or daily_bonus_claimed < today
        ))

        if can_claim_bonus:
          return {"message": "OK", "can_claim_bonus": can_claim_bonus}

    return {"message": f"Successfully added {payload} points."}
  except Exception as e:
    print(f"Error receiving user stats: {e}")
    raise HTTPException(
      status_code=500, detail="Error receiving stats"
    )


@router.post("/user_stats/bonus", status_code=201)
async def add_bonus(
    payload: BonusPointsUpdate,
    uid=Depends(verify_token_and_email),
    session: AsyncSession = Depends(get_session)
):
  try:
    user_id = await get_cached_uid(firebase_uid=uid)

    result = await session.execute(
        update(UserStats)
        .where(UserStats.user_id == user_id) # type: ignore
        .values(total_points=UserStats.total_points + payload.points)
    )
    await session.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="UserStats not found for user.")

    return {"message": "Successfully added bonus points"}
  except Exception as e:
    logger.error("Error adding bonus points.", e)
    raise HTTPException(
      status_code=500, detail="Unable to add bonus points."
    )