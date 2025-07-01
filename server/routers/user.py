from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from auth.verify_token_basic import verify_token_basic
from database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from models.quest_bonus import QuestBonus
from models.user import User, UserCreate
from models.user_stats import UserStats
from services.user_services import check_user_existence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/user", status_code=200)
async def get_user(
    uid=Depends(verify_token_and_email), session: AsyncSession = Depends(get_session)
):
    try:
        user_id = await get_cached_uid(firebase_uid=uid)
        user_query = await session.execute(
           select( # type: ignore
              UserStats, 
              User.email, # type: ignore
              User.displayName, # type: ignore
              QuestBonus.last_daily_bonus # type: ignore
          )
          .join(User, UserStats.user_id == User.id)
          .where(UserStats.user_id == user_id)
          .outerjoin(QuestBonus, UserStats.user_id == QuestBonus.user_id)
        )
        user_data = user_query.first()

        if user_data is None:
           raise HTTPException(status_code=404, detail="No available stats for user.")

        user_stats, email, display_name, last_daily_bonus = user_data
        print(f"*** USER STATS: {user_stats}")
        return { "data": {
           "totalPoints": user_stats.total_points,
           "dailyStreak": user_stats.current_daily_streak,
           "weeklyStreak": user_stats.current_weekly_streak,
           "email": email,
           "displayName": display_name,
           "lastDailyBonus": last_daily_bonus
        } }
    except Exception as e:
        print(f"Unable to retrieve user: {e}")


@router.post("/user", status_code=201)
async def create_user(
    user_data: UserCreate,
    session: AsyncSession = Depends(get_session),
    uid: str = Depends(verify_token_basic),
):
  try:
    # Check if user exists
    result = await check_user_existence(session, user_data, uid)
    if result:
        raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail=result
      )

    user = User(
      firebase_uid=uid,
      email=user_data.email,
      displayName=user_data.displayName
    )

    session.add(user)
    await session.commit()
    await session.refresh(user)

    return { "message": "User created successfully", "user": user }   
  except Exception as e:
    print(f"Error creating user: {e}")
    raise HTTPException(
      status_code=500, detail="Unable to create user at this time"
    )