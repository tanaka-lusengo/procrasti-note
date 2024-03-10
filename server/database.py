import os
from dotenv import load_dotenv
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated

load_dotenv('.env')

# Define the URI for the postgres database
DATABASE_URI = os.getenv('DATABASE_URI')

# Create the database engine and session
try:
    engine = create_engine(DATABASE_URI)
except Exception as e:
    print(f"Failed to create engine: {e}")

# Create a session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the base class for the database
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Dependency to get the database session
db_dependency = Annotated[Session, Depends(get_db)]
