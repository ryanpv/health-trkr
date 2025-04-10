from typing import Optional

from sqlmodel import Field, SQLModel

class User(SQLModel, table=true):
  id: int = Field(default=None, primary_key=True)
  displayName: str
  email: str
  total_points: int
  current_daily_streak: int
  last_daily_completed: datetime = Field(sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP")))
  current_weekly_streak: int
  last_weekly_completed: datetime = Field(sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP")))
