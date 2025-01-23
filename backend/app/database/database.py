from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="./backend/.env")

SQLALCHEMY_DATABASE_URL = "sqlite:///./app/database/sqlite.db" #os.getenv("DATABASE_URL", "sqlite:///./database/sqlite.db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()