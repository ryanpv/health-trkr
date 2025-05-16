from typing import AsyncGenerator

from config import config
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

DB_URL = config.DB_URL

engine: AsyncEngine = create_async_engine(
    DB_URL,
    echo=True,
    future=True,
)

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


async def test_connection():
    async with engine.connect() as conn:
        try:
            result = await conn.execute(text("SELECT NOW();"))
            print("Connection successful:", result.scalar())
        except Exception as e:
            print("Connection failed:", e)
