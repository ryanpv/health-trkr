from auth.verify_token_basic import verify_token_basic
from database import get_session, async_session
from fastapi import Depends, HTTPException
from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from async_lru import alru_cache


async def fetch_user_id(
    session: AsyncSession = Depends(get_session),
    firebase_uid: str = Depends(verify_token_basic),
):
    result = await session.execute(
        select(User).where(User.firebase_uid == firebase_uid)
    )
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.id


@alru_cache(maxsize=100)
async def get_cached_uid(firebase_uid: str):
    async with async_session() as session:
        return await fetch_user_id(session=session, firebase_uid=firebase_uid)
