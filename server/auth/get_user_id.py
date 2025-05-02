import cachetools
from auth.verify_token_basic import verify_token_basic
from cachetools import TTLCache
from cachetools.keys import hashkey
from database import get_session
from fastapi import Depends, HTTPException
from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

db_uid = TTLCache(maxsize=100, ttl=3600)

async def fetch_user_id(session: AsyncSession = Depends(get_session), firebase_uid: str = Depends(verify_token_basic)):
  result = await session.execute(select(User).where(User.firebase_uid == firebase_uid))
  user = result.scalar_one_or_none()
  if not user:
      raise HTTPException(status_code=404, detail="User not found")
  return user.id


def make_uid_key(func, session, firebase_uid):
   return hashkey(firebase_uid)


@cachetools.cached(cache=db_uid, key=make_uid_key)
async def get_cached_user_id(session, firebase_uid):
   return await fetch_user_id(session, firebase_uid)