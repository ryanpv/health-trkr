from datetime import datetime

from sqlalchemy import Column, DateTime, text
from sqlmodel import Field, SQLModel


class Reward(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    points_cost: int
    user_id: int = Field(foreign_key="users.id")
    status: str = Field(default="not_redeemed")
    date: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )
  