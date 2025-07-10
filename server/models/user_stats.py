from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, text
from sqlmodel import Field, SQLModel
from traitlets import default


class UserStats(SQLModel, table=True): # type: ignore
    __tablename__ = "user_stats" 
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    total_points: int = Field(default=0)
    current_daily_streak: int = Field(default=0)
    last_daily_completed: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), default=None)
    )
    current_weekly_streak: int = Field(default=0)
    last_weekly_completed: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), default=None)
    )
    daily_bonus_claimed_at: Optional[datetime] = Field(default=None)


class StatsUpdate(SQLModel):
    id: int
    title: Optional[str] = None
    quest_type: Optional[str] = None
    quest_status: Optional[str] = None
    date: Optional[datetime] = None
    points: Optional[int] = None

class BonusPointsUpdate(SQLModel):
    points: int