from fastapi import APIRouter
from starlette import status
from database import db_dependency
from models.models import Notes

router = APIRouter(
    prefix='/notes',
    tags=['notes']
)


@router.get('/', status_code=status.HTTP_200_OK)
async def get_all_notes(db: db_dependency):
    return db.query(Notes).all()
