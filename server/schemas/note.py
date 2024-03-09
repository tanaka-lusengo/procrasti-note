from pydantic import BaseModel, Field


class NoteBase(BaseModel):
    title: str
    content: str
    priority: int


class Note(NoteBase):
    id: int
    complete: bool
    author_id: int

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
                "complete": False,
                "author_id": 1
            }
        }


class NoteCreate(NoteBase):
    title: str = Field(min_length=1)
    content: str = Field(min_length=1, max_length=100)
    priority: int = Field(ge=1, le=5)

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
            }
        }


class NoteUpdate(NoteBase):
    title: str = Field(min_length=1)
    content: str = Field(min_length=1, max_length=100)
    priority: int = Field(ge=1, le=5)
    complete: bool

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
                "complete": True,
            }
        }
