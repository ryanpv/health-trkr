import sqlalchemy
from fastapi import APIRouter, Depends, HTTPException, Request
from models.quest import Quest

router = APIRouter()


@router.post("/quest", response_model=Quest, status_code=201)
async def create_quest(quest: Quest):
    try:
        print("Creating quest:", quest)
        return {
            "quest": quest,
            "message": "Quest created successfully",
            "quest_status": "incomplete",
        }
    except Exception as e:
        print(f"Error creating quest: {e}")
