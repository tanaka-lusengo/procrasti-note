import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from fastapi import HTTPException, Depends
from utils.bcrypt_config import bcrypt_context
from datetime import timedelta, datetime
from starlette import status
from models.models import User as UserModel
from database import db_dependency
from jose import jwt, JWTError

load_dotenv('.env')

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

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
def create_access_token(data: dict, expires_delta: timedelta):
    # Copy the data and add an expiry time
    to_encode = data.copy()
    expires = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expires})
    # Encode the data to create the JWT
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Async function to get the current user from the token
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency):
    try:
        # Decode the JWT to get the payload
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # Extract the username, user_id, and admin status from the payload
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        admin: bool = payload.get("admin")

        if username is None or user_id is None:
            missing_data = "username" if username is None else "user_id"
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid token - missing {missing_data}")

        token_data = {"username": username, "id": user_id, "admin": admin}
        return token_data

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid token - JWTError: {str(e)}")

# Define a dependency for getting the current user
user_dependency = Annotated[dict, Depends(get_current_user)]
