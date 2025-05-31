from auth.get_user_id import get_cached_uid
from auth.verify_token_and_email import verify_token_and_email
from auth.verify_token_basic import verify_token_basic
from database import get_session
from fastapi import APIRouter, Depends, HTTPException
from models.quest import (
    Quest,
    QuestCreate,
    QuestCreateResponse,
    QuestDelete,
    QuestResponse,
)
from models.user import User
from sqlalchemy import asc, desc, select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


# GET QUEST
@router.get("/quests", response_model=list[QuestResponse], status_code=200)
async def get_quests(
    session: AsyncSession = Depends(get_session), uid: str = Depends(verify_token_basic)
):
    try:
        user_id = await get_cached_uid(firebase_uid=uid)

        result = await session.execute(
            select(Quest).where(Quest.user_id == user_id).order_by(asc(Quest.date)) # type: ignore
        )
        quests = result.scalars().all()
        print(f"quests: {quests}")
        return quests
    except Exception as e:
        print(f"Error fetching quests: {e}")
        raise HTTPException(
            status_code=500, detail="Unable to fetch quests at this time."
        )


# CREATE QUEST
@router.post("/quests", response_model=QuestCreateResponse, status_code=201)
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


# DELETE QUEST
@router.delete("/quests/{quest_id}", status_code=201)
async def delete_quest(
    quest_id: int,
    session: AsyncSession = Depends(get_session),
    uid: str = Depends(verify_token_and_email),
):
    try:
        user_id = await get_cached_uid(firebase_uid=uid)
        print(f"QUEST ID TO BE DELETED: {quest_id}")
        # Check if quest exists
        result = await session.execute(
            select(Quest).where(Quest.id == quest_id, Quest.user_id == user_id) #type: ignore
        )

        quest = result.scalar_one_or_none()

        if not quest:
            raise HTTPException(status_code=404, detail="Quest not found")

        print(f"quest: {quest}")
        await session.delete(quest)
        await session.commit()

        return {"message": "Quest deleted successfully."}

    except Exception as e:
        print(f"Error deleting quest: {e}")
        raise HTTPException(
            status_code=500, detail="Unable to delete quest at this time."
        )
