from fastapi import APIRouter, HTTPException, Path
from starlette import status
from database import db_dependency
from schemas.note import Note, NoteCreate, NoteUpdate
from models.models import Note as NoteModel

router = APIRouter(
    tags=['notes']
)


@router.get('/notes', status_code=status.HTTP_200_OK, response_model=list[Note])
async def get_all_notes(db: db_dependency):
    try:
        return db.query(NoteModel).all()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to retrieve all notes from the database: {str(e)}")


@router.get('/note/{note_id}', status_code=status.HTTP_200_OK, response_model=Note)
async def get_one_note(db: db_dependency, note_id: int = Path(gt=0)):
    single_note = db.query(NoteModel).filter(NoteModel.id == note_id).first()

    if single_note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} was not found in the database.")
    else:
        return single_note


@router.post('/note', status_code=status.HTTP_201_CREATED)
async def create_note(db: db_dependency, note_create: NoteCreate):
    try:
        new_note_model = NoteModel(**note_create.model_dump())
        db.add(new_note_model)
        db.commit()
        db.refresh(new_note_model)
        return new_note_model
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to create a new note: {str(e)}")


@router.put('/note/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def update_note(db: db_dependency, note_update: NoteUpdate, note_id: int = Path(gt=0)):
    new_note_model = db.query(NoteModel).filter(
        NoteModel.id == note_id).first()

    if new_note_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} could not be found for update.")
    else:
        new_note_model.title = note_update.title
        new_note_model.content = note_update.content
        new_note_model.priority = note_update.priority
        new_note_model.complete = note_update.complete

        db.add(new_note_model)
        db.commit()
        db.refresh(new_note_model)


@router.delete('/note/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_one_note(db: db_dependency, note_id: int = Path(gt=0)):
    single_note = db.query(NoteModel).filter(NoteModel.id == note_id).first()

    if single_note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with id: {note_id} could not be found for deletion.")
    else:
        db.delete(single_note)
        db.commit()
        return single_note
