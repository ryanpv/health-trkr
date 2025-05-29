from typing import cast

from aiocache import Cache
from auth.verify_token_basic import verify_token_basic
from database import async_session, get_session
from fastapi import Depends, HTTPException
from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

cache = Cache(Cache.MEMORY)

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
    
async def get_cached_uid(firebase_uid: str) -> int:
    cached = await cache.get(firebase_uid)
    print(f"***CACHED uid: {cached}")
    if cached is not None:
        return cached
    
    async with async_session() as session:
        user_id = await fetch_user_id(session=session, firebase_uid=firebase_uid)

        if not isinstance(user_id, int):
            raise ValueError(f"Expected int userID but got {type(user_id)}")
        
        await cache.set(firebase_uid, user_id)
        return user_id