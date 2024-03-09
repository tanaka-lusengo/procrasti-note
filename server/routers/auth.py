import os
from dotenv import load_dotenv
from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from database import db_dependency
from schemas.auth import Token
from schemas.user import UserCreate
from models.models import User as UserModel
from utils.bcrypt_config import bcrypt_context
from utils.auth_helpers import authenticate_user, create_access_token

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

load_dotenv('.env')

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_user(user_create: UserCreate, db: db_dependency):
    try:
        # Create a new user model with the provided data
        new_user = UserModel(
            first_name=user_create.first_name,
            last_name=user_create.last_name,
            email=user_create.email,
            hashed_password=bcrypt_context.hash(user_create.password),
            admin=True if user_create.email == ADMIN_EMAIL else False,
            is_active=True
        )
        # default username as the email for oAuth2 integration
        new_user.username = user_create.email
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to create a new user: {str(e)}")


@router.post('/login', response_model=Token, status_code=status.HTTP_200_OK)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    # Authenticate the user with the provided username and password
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    # Create an access token for the authenticated user
    token = create_access_token(
        data={"sub": user.username, "id": user.id, "admin": user.admin}, expires_delta=timedelta(minutes=30))
    return {"access_token": token, "token_type": "bearer", "expires_in": 1800, "user": user}
