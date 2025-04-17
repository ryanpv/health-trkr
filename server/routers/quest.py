import sqlalchemy
from fastapi import APIRouter, Depends, HTTPException, Request

from server.models.quest import Quest

router = APIRouter()


@router.post("/quest", response_model=Quest, status_code=201)
async def create_quest(quest: Quest):
    try:
        print("Creating quest:", quest)
    except Exception as e:
        print(f"Error creating quest: {e}")
