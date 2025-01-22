from sqlalchemy.orm import Session
from app.repository.counter_repository import increment_counter

def increment_and_return_counter(db: Session):
    return increment_counter(db)
