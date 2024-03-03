from database import Base
from sqlalchemy import Column, Integer, String, Boolean
from pydantic import BaseModel, Field


class Notes(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)


class NotesCreate(BaseModel):
    title: str = Field(min_length=3)
    content: str = Field(min_length=3, max_length=100)
    priority: int = Field(ge=1, le=5)

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
            }
        }


class NotesUpdate(BaseModel):
    title: str = Field(min_length=3)
    content: str = Field(min_length=3, max_length=100)
    priority: int = Field(ge=1, le=5)
    complete: bool

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
                "complete": True
            }
        }
