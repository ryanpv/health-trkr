import sqlalchemy
from fastapi import APIRouter, Depends, HTTPException, Request
from models.quest import QuestCreate, QuestCreateResponse

router = APIRouter()


@router.post("/quest", response_model=QuestCreateResponse, status_code=201)
async def create_quest(quest: QuestCreate):
    try:
        print("Creating quest:", quest)
        quest_id = 1
        return {
            "id": quest_id,
            "message": "Sucessfully created quest",
        }
        # return quest
    except Exception as e:
        print(f"Error creating quest: {e}")
        raise HTTPException(
            status_code=500, detail="Unable to create quest at this time"
        )
