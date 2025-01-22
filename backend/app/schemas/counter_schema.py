from pydantic import BaseModel

class CounterBase(BaseModel):
    value: int

class CounterResponse(CounterBase):
    id: int

    class Config:
        orm_mode = True
