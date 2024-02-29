import os
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated
from dotenv import load_dotenv

# Load the environment variables
load_dotenv('.env')

# Define the URI for the SQLite database
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')

# Create the database engine and session
try:
    engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True,
                           connect_args={'check_same_thread': False})
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
