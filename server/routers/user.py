from auth.verify_token_basic import verify_token_basic
from database import get_session
from fastapi import APIRouter, Depends, HTTPException
from models.user import User, UserCreate
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.post("/user", status_code=201)
async def create_user(
    user_data: UserCreate,
    session: AsyncSession = Depends(get_session),
    uid: str = Depends(verify_token_basic),
):
  try:
    # Check if user exists
    result = await session.execute(select(User).where(User.firebase_uid == uid))
    user_exists = result.scalar_one_or_none()

    if not user_exists:
      new_user = User(
        firebase_uid=uid,
        email=user_data.email,
        displayName=user_data.displayName
      )

      session.add(new_user)
      await session.commit()
      await session.refresh(new_user)

    return { "message": "User created successfully", "user": new_user }   
  
  except Exception as e:
    print(f"Error creating user: {e}")
    raise HTTPException(
      status_code=500, detail="Unable to create user at this time"
    )