from datetime import datetime

from sqlalchemy import Column, DateTime, text
from sqlmodel import Field, SQLModel


class RewardBase(SQLModel):
    title: str
    status: str = Field(default="not_redeemed")
    points_cost: int = Field(default=100)


class Reward(RewardBase, table=True): # type: ignore
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    date: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )
  
class RewardCreate(RewardBase):
    pass