from fastapi import APIRouter, HTTPException, Path
from starlette import status
from database import db_dependency
from models.schemas import Notes, NotesCreate, NotesUpdate

router = APIRouter(
    prefix='/notes',
    tags=['notes']
)


@router.get('', status_code=status.HTTP_200_OK)
async def get_all_notes(db: db_dependency):
    return db.query(Notes).all()


@router.get('/{note_id}', status_code=status.HTTP_200_OK)
async def get_one_note(db: db_dependency, note_id: int = Path(gt=0)):
    single_note = db.query(Notes).filter(Notes.id == note_id).first()

    if single_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    else:
        return single_note


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_note(db: db_dependency, notes_create: NotesCreate):
    new_note_model = Notes(**notes_create.model_dump())
    db.add(new_note_model)
    db.commit()
    db.refresh(new_note_model)
    return new_note_model


@router.put('/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def update_note(db: db_dependency, notes_update: NotesUpdate, note_id: int = Path(gt=0)):
    new_note_model = db.query(Notes).filter(Notes.id == note_id).first()

    if new_note_model is None:
        raise HTTPException(status_code=404, detail="Note not found")
    else:
        new_note_model.title = notes_update.title
        new_note_model.content = notes_update.content
        new_note_model.priority = notes_update.priority
        new_note_model.complete = notes_update.complete

        db.add(new_note_model)
        db.commit()
        db.refresh(new_note_model)


@router.delete('/{note_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_one_note(db: db_dependency, note_id: int = Path(gt=0)):
    single_note = db.query(Notes).filter(Notes.id == note_id).first()

    if single_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    else:
        db.delete(single_note)
        db.commit()
        return single_note
