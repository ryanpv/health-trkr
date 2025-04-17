from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, text
from sqlmodel import Column, Field, SQLModel


class QuestBase(SQLModel):
    title: str
    quest_type: str
    user_id: int = Field(foreign_key="user.id")
    quest_status: str = Field(default="incomplete")


class Quest(QuestBase, table=True):
    id: int = Field(default=None, primary_key=True)
    date: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )


class QuestCreate(QuestBase):
    pass
