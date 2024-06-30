import os

from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv('.env')


def setup_cors(app):
    origins = os.getenv("ORIGINS").split(",")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
