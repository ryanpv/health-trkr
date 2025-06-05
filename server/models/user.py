from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, text
from sqlmodel import Field, SQLModel


class UserCreate(SQLModel):
    firebase_uid: str
    displayName: str
    email: str


class User(UserCreate, table=True): # type: ignore
    id: int = Field(default=None, primary_key=True)
    __tablename__ = "users" 