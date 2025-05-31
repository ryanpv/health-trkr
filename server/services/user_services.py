from fastapi import HTTPException, status
from models import User
from sqlalchemy import or_, select


async def check_user_existence(session, user_data, uid):
  result = await session.execute(
    select(User).where(
      or_(
        User.firebase_uid == uid,
        User.email == user_data.email,
        User.displayName == user_data.displayName
      )
    )
  )

  users = result.scalars().all()

  for user in users:
    if user.firebase_uid == uid:
      reason = "UID already exists."
      break
    if user.email == user_data.email:
      reason = "Email already exists."
      break
    if user.displayName == user_data.displayName:
      reason = "Display name already taken."
  else:
    reason = None

  return reason
  
