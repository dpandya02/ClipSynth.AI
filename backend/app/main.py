from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from database import database
from models import UserModel
from routers import example_router

app = FastAPI()

# # CORS middleware configuration
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Create database tables
# models.Base.metadata.create_all(bind=database.engine)

# # Include routers
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(users.router, prefix="/users", tags=["users"])

app.include_router(example_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to ClipSynth.AI API"}