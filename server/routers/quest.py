from auth.verify_token_and_email import verify_token_and_email
from database import get_session
from fastapi import APIRouter, Depends, HTTPException
from models.quest import Quest, QuestCreate, QuestCreateResponse
from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from auth.get_user_id import get_cached_uid

router = APIRouter()


# CREATE QUEST
@router.post("/quest", response_model=QuestCreateResponse, status_code=201)
async def create_quest(
    quest_data: QuestCreate,
    session: AsyncSession = Depends(get_session),
    uid: str = Depends(verify_token_and_email),
):
    try:
        user_id = await get_cached_uid(firebase_uid=uid)

        new_quest = Quest(
            title=quest_data.title,
            quest_type=quest_data.quest_type,
            quest_status=quest_data.quest_status,
            user_id=user_id,
        )

        session.add(new_quest)
        await session.commit()
        await session.refresh(new_quest)

        return {"id": new_quest.id, "message": "Sucessfully created quest"}
    except Exception as e:
        print(f"Error creating quest: {e}")
        raise HTTPException(
            status_code=500, detail="Unable to create quest at this time"
        )
