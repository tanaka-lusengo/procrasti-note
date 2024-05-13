from datetime import datetime, timedelta, timezone
import os
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from starlette import status

from database import db_dependency
from models.models import User as UserModel
from schemas.auth import Token
from utils.auth_helpers import authenticate_user, create_access_token
from utils.bcrypt_config import bcrypt_context

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

# JWT expiration time
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Define OAuth2 password bearer with token URL
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


# Function to verify if the provided plain password matches the hashed password
def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


# Function to authenticate a user using username and password
def authenticate_user(username: str, password: str, db):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


# Function to create an access token with a specified expiry time
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    # Copy the data and add an expiry time
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    # Add issued at time
    issued_at = datetime.now(timezone.utc)
    to_encode.update({"exp": expire, "iat": issued_at})
    # Encode the data to create the JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Async function to get the current user from the token
async def get_current_user(request: Request, db: db_dependency):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Access cookies from the Authorization header
    access_token = request.headers.get('Authorization')

    if access_token and " " in access_token:
        access_token = access_token.split(' ')[1]  # Split "Bearer {token}"

    if access_token is None:
        raise credentials_exception

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(UserModel).filter(
        UserModel.username == username and UserModel.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[UserModel, Depends(get_current_user)]
):
    if current_user.is_active is False:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Define a dependency for getting the current user
user_dependency = Annotated[UserModel, Depends(get_current_active_user)]


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency
) -> Token:
    user = authenticate_user(
        form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "id": user.id}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
