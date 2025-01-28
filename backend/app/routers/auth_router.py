from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.services.oauth import oauth
from app.database.database import get_db
from app.models.UserModel import User
import uuid
import os
from fastapi.responses import RedirectResponse
from app.services.auth import create_access_token

# Add this line to create the router
router = APIRouter(prefix="/api/auth")

@router.get("/auth_callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)
    
    # Check if user exists
    db_user = db.query(User).filter(User.email == user_info['email']).first()
    
    if not db_user:
        # Create new user
        db_user = User(
            id=str(uuid.uuid4()),
            email=user_info['email'],
            name=user_info['name'],
            auth_provider="google"
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    
    # Create JWT token
    access_token = create_access_token(data={"sub": db_user.id})
    
    # Redirect to frontend with token
    redirect_url = f"{os.getenv('FRONTEND_URL')}/login?token={access_token}"
    return RedirectResponse(url=redirect_url)

@router.get("/google/login")
async def google_login(request: Request):
    redirect_uri = request.url_for('auth_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)