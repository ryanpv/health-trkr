from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, text
from sqlmodel import Field, SQLModel


class UserStats(SQLModel, table=True): # type: ignore
    __tablename__ = "user_stats" 
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    total_points: int
    current_daily_streak: int
    last_daily_completed: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    )
    current_weekly_streak: int
    last_weekly_completed: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    )


class StatsUpdate(SQLModel):
    id: int
    title: Optional[str] = None
    quest_type: Optional[str] = None
    quest_status: Optional[str] = None
    date: Optional[datetime] = None
    points: Optional[int] = None

class BonusPointsUpdate(SQLModel):
    points: int