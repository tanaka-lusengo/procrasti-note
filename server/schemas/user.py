from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str


class User(UserBase):
    id: int
    username: str
    is_active: bool
    admin: bool

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "first_name": "Kevin",
                "last_name": "Heart",
                "username": "kevinheart",
                "email": "kevin@heart.com",
                "is_active": True,
                "admin": False
            }
        }


class UserCreate(UserBase):
    first_name: str = Field(min_length=2)
    last_name: str = Field(min_length=2)
    email: EmailStr
    password: str = Field(min_length=8)

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "first_name": "Kevin",
                "last_name": "Heart",
                "email": "kevin@heart.com",
                "password": "hashed_password",
            }
        }


class UserUpdate(UserBase):
    first_name: str = Field(min_length=2)
    last_name: str = Field(min_length=2)
    username: str = Field(min_length=1)
    email: EmailStr
    admin: bool
    is_active: bool

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "first_name": "Donald",
                "last_name": "Glover",
                "username": "donaldglover",
                "email": "donald@glover.com",
                "admin": True,
                "is_active": False
            }
        }


class UserUpdatePassword(BaseModel):
    old_password: str
    new_password: str = Field(min_length=8)
    confirm_new_password: str = Field(min_length=8)

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "old_password": "old_password",
                "new_password": "new_password",
                "confirm_new_password": "new_password"
            }
        }
