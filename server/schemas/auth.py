from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "access_token": "string",
                "token_type": "bearer",
                "expires_in": 1800,
            }
        }
