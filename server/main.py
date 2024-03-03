from fastapi import FastAPI
from database import engine
from starlette import status
from models import schemas
from routers import notes


# Create the FastAPI app
app = FastAPI(title="Procrasti-not(e) API ☕️", version="0.1.0")

# Create the database tables
schemas.Base.metadata.create_all(bind=engine)

# Import routers
app.include_router(notes.router)


@app.get('/', status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Welcome, it's great to have you! 🚀"}
