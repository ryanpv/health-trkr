from config import config
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

DB_URL = config.DB_URL

engine: AsyncEngine = create_async_engine(
    DB_URL,
    echo=True,
    future=True,
)

async_session = sessionmaker(
  engine, class_=AsyncSession, expire_on_commit=False
)

async def test_connection():
  async with engine.connect() as conn:
    result = await conn.execute(text("SELECT NOW();"))
    print("Connection successful:", result.scalar())