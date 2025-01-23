from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import database
from app.models import UserModel
from app.routers import example_router
from app.routers import counter_router

# Create the database and tables
database.Base.metadata.create_all(bind=database.engine)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"
]

# Create a FastAPI app
app = FastAPI()

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# include your routers here
app.include_router(example_router.router)
app.include_router(counter_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to ClipSynth.AI API"}

