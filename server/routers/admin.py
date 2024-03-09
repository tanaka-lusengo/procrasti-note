from typing import Annotated
from fastapi import APIRouter, HTTPException, Path
from starlette import status
from database import db_dependency
from schemas.note import Note
from models.models import Note as NoteModel
from utils.auth_helpers import user_dependency

router = APIRouter(
    prefix='/admin',
    tags=['admin']
)


@router.get('/notes', status_code=status.HTTP_200_OK, response_model=list[Note])
async def get_all_notes(user: user_dependency, db: db_dependency):
    if user is None or user.get("admin") is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    try:
        return db.query(NoteModel).all()

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to retrieve all notes from the database: {str(e)}")


@router.delete('/note/{note_id}', status_code=status.HTTP_200_OK)
async def delete_one_note(user: user_dependency, db: db_dependency, note_id: int = Path(gt=0)):
    if user is None or user.get("admin") is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    single_note = db.query(NoteModel).filter(NoteModel.id == note_id).first()

    if single_note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} was not found in the database.")

    try:
        db.delete(single_note)
        db.commit()
        return {"message": f"Note with id: {note_id} was successfully deleted from the database."}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to delete note with id: {note_id} from the database: {str(e)}")
