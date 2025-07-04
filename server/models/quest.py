from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, text
from sqlmodel import Column, Field, SQLModel


class QuestBase(SQLModel):
    title: str
    quest_type: str
    quest_status: str = Field(default="incomplete")


class Quest(QuestBase, table=True): #type: ignore
    id: Optional[int] = Field(default=None, primary_key=True)
    date: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP")),
    )
    completed_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True))
    )
    user_id: int = Field(foreign_key="users.id")


class QuestCreate(QuestBase):
    pass


class QuestDelete(QuestBase):
    quest_id: int


class QuestCreateResponse(SQLModel):
    id: int
    message: str = "Successfully created quest"


class QuestResponse(SQLModel):
    id: int
    title: str
    quest_type: str
    quest_status: str
    date: datetime = Field(
        sa_column=Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    )

class QuestCountResponse(SQLModel):
    quests_completed_today: int

class QuestUpdate(SQLModel):
    id: int
    title: Optional[str] = None
    quest_type: Optional[str] = None
    quest_status: Optional[str] = None
    date: Optional[datetime] = None
    points: Optional[int] = None