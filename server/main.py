from fastapi import FastAPI
from starlette import status

from database import engine
from middleware import setup_cors
from models import models
from routers import admin, auth, note, user


# Create the FastAPI app
app = FastAPI(title="Procrasti-Not(e) API", version="0.1.0", root_path="/api")

# Setup CORS middleware
setup_cors(app)

# Create the database tables
models.Base.metadata.create_all(bind=engine)

# Import routers
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(note.router)
app.include_router(admin.router)


@app.get('/', status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Welcome, it's great to have you! 🚀"}
