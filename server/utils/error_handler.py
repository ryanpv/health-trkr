import logging
from functools import wraps

from fastapi import HTTPException

logger = logging.getLogger(__name__)

def handle_exceptions():
  def decorator(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
      try:
        return await func(*args, **kwargs)
      except HTTPException:
        raise
      except Exception as e:
        logger.error(f"Unexpected error in {func.__name__}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
      
    return wrapper
  return decorator