from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, text
from sqlmodel import Column, Field, SQLModel


class Quest(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    quest_type: str
    date: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )
    user_id: int = Field(foreign_key="user.id")
    quest_status: str = Field(default="incomplete")