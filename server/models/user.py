from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, text
from sqlmodel import Field, SQLModel


class UserCreate(SQLModel):
    firebase_uid: str
    displayName: str
    email: str


class User(UserCreate, table=True):
    id: int = Field(default=None, primary_key=True)
    __tablename__ = "users"


class UserStats(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    total_points: int
    current_daily_streak: int
    last_daily_completed: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )
    current_weekly_streak: int
    last_weekly_completed: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )
