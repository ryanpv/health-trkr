from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime
from sqlmodel import Field, SQLModel


class QuestBonus(SQLModel, table=True): # type: ignore
  __tablename__ = "quest_bonus"
  id: int = Field(default=None, primary_key=True)
  user_id: int = Field(foreign_key="users.id")
  last_daily_bonus: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True))
    )