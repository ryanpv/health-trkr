import cachetools
from auth.verify_token_basic import verify_token_basic
from cachetools import TTLCache
from cachetools.keys import hashkey
from database import get_session
from fastapi import Depends, HTTPException
from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

uid_cache = TTLCache(maxsize=100, ttl=3600)


def uid_key(_, session, firebase_uid):
    return hashkey(firebase_uid)


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


@cachetools.cached(cache=uid_cache, key=uid_key)
async def get_cached_uid(session, firebase_uid):
    return await fetch_user_id(session=session, firebase_uid=firebase_uid)
