from fastapi import APIRouter, HTTPException, Path
from starlette import status
from database import db_dependency
from schemas.schemas import Note, NoteCreate, NoteUpdate
from models.models import Note as NoteModel

router = APIRouter(
    tags=['notes']
)


@router.get('/notes', status_code=status.HTTP_200_OK, response_model=list[Note])
async def get_all_notes(db: db_dependency):
    return db.query(NoteModel).all()


@router.get('/note/{note_id}', status_code=status.HTTP_200_OK, response_model=Note)
async def get_one_note(db: db_dependency, note_id: int = Path(gt=0)):
    single_note = db.query(NoteModel).filter(NoteModel.id == note_id).first()

    if single_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    else:
        return single_note


@router.post('/note', status_code=status.HTTP_201_CREATED)
async def create_note(db: db_dependency, note_create: NoteCreate):
    new_note_model = NoteModel(**note_create.model_dump())
    db.add(new_note_model)
    db.commit()
    db.refresh(new_note_model)
    return new_note_model


@router.put('/note/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def update_note(db: db_dependency, note_update: NoteUpdate, note_id: int = Path(gt=0)):
    new_note_model = db.query(NoteModel).filter(
        NoteModel.id == note_id).first()

    if new_note_model is None:
        raise HTTPException(status_code=404, detail="Note not found")
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
        raise HTTPException(status_code=404, detail="Note not found")
    else:
        db.delete(single_note)
        db.commit()
        return single_note
