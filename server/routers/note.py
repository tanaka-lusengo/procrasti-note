from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from database import db_dependency
from schemas.note import Note, NoteCreate, NoteUpdate
from models.models import Note as NoteModel
from utils.auth_helpers import user_dependency

router = APIRouter(
    tags=['notes']
)


@router.get('/notes', status_code=status.HTTP_200_OK, response_model=list[Note])
async def get_all_notes(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    all_notes = db.query(NoteModel).filter(
        NoteModel.author_id == user.get("id")).all()

    if all_notes is not None:
        return all_notes
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No notes were found in the database.")


@router.get('/note/{note_id}', status_code=status.HTTP_200_OK, response_model=Note)
async def get_one_note(user: user_dependency, db: db_dependency, note_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    single_note = db.query(NoteModel).filter(NoteModel.id == note_id).filter(
        NoteModel.author_id == user.get("id")).first()

    if single_note is not None:
        return single_note
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} was not found in the database.")


@router.post('/note', status_code=status.HTTP_201_CREATED)
async def create_note(user: user_dependency, db: db_dependency, note_create: NoteCreate):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    try:
        new_note_model = NoteModel(
            **note_create.model_dump(), author_id=user.get("id"))
        db.add(new_note_model)
        db.commit()
        db.refresh(new_note_model)
        return new_note_model

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to create a new note: {str(e)}")


@router.put('/note/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def update_note(user: user_dependency, db: db_dependency, note_update: NoteUpdate, note_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    note_model = db.query(NoteModel).filter(
        NoteModel.id == note_id).filter(NoteModel.author_id == user.get("id")).first()

    if note_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} could not be found for update.")

    try:
        note_model.title = note_update.title
        note_model.content = note_update.content
        note_model.priority = note_update.priority
        note_model.complete = note_update.complete

        db.add(note_model)
        db.commit()
        db.refresh(note_model)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to update the note: {str(e)}")


@router.delete('/note/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_one_note(user: user_dependency, db: db_dependency, note_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    single_note = db.query(NoteModel).filter(NoteModel.id == note_id).filter(
        NoteModel.author_id == user.get("id")).first()

    if single_note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} could not be found for deletion.")
    try:
        db.delete(single_note)
        db.commit()
        return {"message": f"Note with id: {note_id} was successfully deleted from the database."}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to delete note with id: {note_id} from the database: {str(e)}")
