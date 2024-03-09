from fastapi import FastAPI
from middleware import setup_cors
from database import engine
from starlette import status
from models import models
from routers import note


# Create the FastAPI app
app = FastAPI(title="Procrasti-not(e) API ☕️", description="A simple API to manage your notes",
              version="0.1.0", root_path="/api")

# Setup CORS middleware
setup_cors(app)

# Create the database tables
models.Base.metadata.create_all(bind=engine)

# Import routers
app.include_router(note.router)


@app.get('/', status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Welcome, it's great to have you! 🚀"}
