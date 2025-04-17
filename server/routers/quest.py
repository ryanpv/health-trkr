import sqlalchemy
from fastapi import APIRouter, Depends, HTTPException, Request
from models.quest import Quest, QuestBase, QuestCreate

router = APIRouter()


@router.post("/quest", response_model=QuestBase, status_code=201)
async def create_quest(quest: QuestCreate):
    try:
        print("Creating quest:", quest)
        return quest
    except Exception as e:
        print(f"Error creating quest: {e}")
