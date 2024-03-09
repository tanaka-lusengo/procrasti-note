from fastapi import APIRouter, HTTPException
from starlette import status
from database import db_dependency
from schemas.user import User, UserUpdate, UserUpdatePassword
from models.models import User as UserModel
from utils.auth_helpers import user_dependency
from utils.bcrypt_config import bcrypt_context

router = APIRouter(
    prefix='/user',
    tags=['user']
)


@router.get("", status_code=status.HTTP_200_OK, response_model=User)
async def get_user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    user_model = db.query(UserModel).filter(
        UserModel.id == user.get("id")).first()

    if user_model is not None:
        return user_model
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist in the system")


@router.put("", status_code=status.HTTP_204_NO_CONTENT)
async def update_user(user: user_dependency, db: db_dependency, user_update: UserUpdate):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    user_model = db.query(UserModel).filter(
        UserModel.id == user.get("id")).first()

    if user_model is not None:
        user_model.first_name = user_update.first_name
        user_model.last_name = user_update.last_name
        user_model.username = user_update.username
        user_model.email = user_update.email
        user_model.admin = user_update.admin
        user_model.is_active = user_update.is_active

        db.add(user_model)
        db.commit()
        db.refresh(user_model)

    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist in the system")


@router.put("/change-password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(user: user_dependency, db: db_dependency, user_update: UserUpdatePassword):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorisation failed: User does not exist in the system")

    user_model = db.query(UserModel).filter(
        UserModel.id == user.get("id")).first()

    if user_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist in the system")

    if not bcrypt_context.verify(user_update.old_password, user_model.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Current password does not match the one in the system")

    if user_update.new_password != user_update.confirm_new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")

    try:
        user_model.hashed_password = bcrypt_context.hash(
            user_update.new_password)
        db.add(user_model)
        db.commit()
        db.refresh(user_model)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"An error occurred while trying to update the user's password: {str(e)}")
