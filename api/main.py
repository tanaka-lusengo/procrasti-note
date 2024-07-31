from fastapi import FastAPI
from starlette import status

from database import engine, database
from middleware import setup_cors
from models import models
from routers import admin, auth, note, user, health
from utils.logger import logger

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
app.include_router(health.router)

# Run the database connection on startup and close it on shutdown
@app.on_event("startup")
async def startup():
    logger.info("Starting up...")
    if not database.is_connected:
        await database.connect()
        logger.info("Database connected")

@app.on_event("shutdown")
async def shutdown():
    logger.info("Shutting down...")
    if database.is_connected:
        await database.disconnect()
        logger.info("Database disconnected")

# Root route
@app.get('/', status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Welcome aboard, Proscrasti-noter! 🚀"}