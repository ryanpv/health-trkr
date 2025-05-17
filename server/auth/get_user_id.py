from auth.verify_token_basic import verify_token_basic
from database import get_session, async_session
from fastapi import Depends, HTTPException
from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from async_lru import alru_cache
from typing import cast


async def fetch_user_id(
    session: AsyncSession = Depends(get_session),
    firebase_uid: str = Depends(verify_token_basic),
) -> int:
    result = await session.execute(
        select(User).where(User.firebase_uid == firebase_uid) # type: ignore
    )
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.id


@alru_cache(maxsize=100)
async def get_cached_uid(firebase_uid: str) -> int:
    async with async_session() as session:
        user_id = await fetch_user_id(session=session, firebase_uid=firebase_uid)

        if not isinstance(user_id, int):
            raise ValueError(
                f"Expected userID as int, but got: {type(user_id)} with value {user_id}"
            )

        return cast(int, user_id)