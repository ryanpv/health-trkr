import logging

import firebase_admin
from aiocache import Cache
from auth.get_user_id import get_cached_uid, remove_cached_uid
from auth.verify_token_basic import verify_token_basic
from config import config
from database import engine, init_db, test_connection
from dotenv import load_dotenv
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import app_check, auth, credentials

# Route Imports
from routers.quest import router as quest_router
from routers.reward import router as reward_router
from routers.user import router as user_router
from routers.user_stats import router as user_stats_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Firebase admin credentials
firebase_credentials = {
    "type": config.FIREBASE_TYPE,
    "project_id": config.FIREBASE_PROJECT_ID,
    "private_key_id": config.FIREBASE_PRIVATE_KEY_ID,
    "private_key": config.FIREBASE_PRIVATE_KEY.replace("\\n", "\n"),
    "client_email": config.FIREBASE_CLIENT_EMAIL,
    "client_id": config.FIREBASE_CLIENT_ID,
    "auth_uri": config.FIREBASE_AUTH_URI,
    "token_uri": config.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": config.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": config.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": config.FIREBASE_UNIVERSE_DOMAIN,
}


# Initialize Firebase Admin SDK
cred = credentials.Certificate(firebase_credentials)
firebase_admin.initialize_app(cred)


# Cache
cache = Cache(Cache.MEMORY)


# Database events
@app.on_event("startup")
async def on_startup():
    try:
        print("initializing DB")
        # await test_connection()
        await init_db()
        print("Database connection successful")
    except Exception as e:
        print(f"Error connecting to the database: {e}")


@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/token-test/{token}")
async def token_test(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        print("Decoded token:", decoded_token)
        return decoded_token["uid"]
    except Exception as e:
        print(f"PRINT TOKEN ERROR: {e}")
        logger.error(f"Error verifying token: {e}")
        return {"error": str(e)}
    

@app.delete("/logout")
async def logout(firebase_uid: str = Depends(verify_token_basic)):
    try:
        await remove_cached_uid(firebase_uid=firebase_uid)

        return { "Message": "Logout successful"}
    except Exception as e:
        print(f"Unable to log out user: {e}")


# Routers
app.include_router(quest_router)
app.include_router(user_router)
app.include_router(reward_router)
app.include_router(user_stats_router)
