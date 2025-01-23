from fastapi import APIRouter

router = APIRouter()
#just putting this here as ane xample so I can test stuff

@router.get("/items/")
async def read_items():
    return [{"item_id": 1, "name": "Item One"}, {"item_id": 2, "name": "Item Two"}]
