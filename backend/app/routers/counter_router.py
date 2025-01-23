from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.counter_schema import CounterResponse
from app.services.counter_service import increment_and_return_counter

router = APIRouter()

@router.put("/increment", response_model=CounterResponse)
def increment_counter(db: Session = Depends(get_db)):
    return increment_and_return_counter(db)
