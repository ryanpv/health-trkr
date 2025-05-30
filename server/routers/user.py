from auth.get_user_id import get_cached_uid
from auth.verify_token_basic import verify_token_basic
from database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User, UserCreate
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/user", status_code=200)
async def get_user(
    uid=Depends(verify_token_basic), session: AsyncSession = Depends(get_session)
):
    try:
        user_id = await get_cached_uid(firebase_uid=uid)

        return { "user_id": user_id }
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
    print(f"*** NEW USER DATA: {user_data}")
    result = await session.execute(select(User).where(User.firebase_uid == uid)) # type: ignore
    user = result.scalar_one_or_none()

    if user:
       raise HTTPException(
          status_code=status.HTTP_409_CONFLICT,
          detail="User already exists"
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