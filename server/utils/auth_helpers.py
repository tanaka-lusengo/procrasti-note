import os
from datetime import timedelta, datetime

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from starlette import status
from typing import Annotated

from models.models import User as UserModel
from utils.bcrypt_config import bcrypt_context

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")

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
    if expires_delta:
        expire = datetime.now(datetime.UTC) + expires_delta
    else:
        expire = datetime.now(datetime.UTC) + timedelta(minutes=5)
    to_encode.update({"exp": expire})
    # Encode the data to create the JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Async function to get the current user from the token
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode the JWT to get the payload
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # Extract the username and user_id from the payload
        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        if username is None or user_id is None:
            raise credentials_exception

        token_data = {"username": username, "id": user_id}
        return token_data

    except JWTError:
        raise credentials_exception

# Define a dependency for getting the current user
user_dependency = Annotated[dict, Depends(get_current_user)]
