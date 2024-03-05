from pydantic import BaseModel, Field


class NotesBase(BaseModel):
    title: str
    content: str
    priority: int


class Notes(NotesBase):
    id: int
    complete: bool

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
                "complete": False
            }
        }


class NotesCreate(NotesBase):
    title: str = Field(min_length=3)
    content: str = Field(min_length=3, max_length=100)
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


class NotesUpdate(NotesBase):
    title: str = Field(min_length=3)
    content: str = Field(min_length=3, max_length=100)
    priority: int = Field(ge=1, le=5)
    complete: bool

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "title": "Learn Python",
                "content": "Learn Python programming language and its libraries.",
                "priority": 3,
                "complete": True
            }
        }
