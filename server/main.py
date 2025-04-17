import logging

import firebase_admin
from config import config
from database import engine, test_connection
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import app_check, auth, credentials

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
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
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

# Database events
@app.on_event("startup")
async def on_startup():
    try:
        await test_connection()
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
        return decoded_token["uid"]
    except Exception as e:
        print(f"PRINT TOKEN ERROR: {e}")
        logger.error(f"Error verifying token: {e}")
        return {"error": str(e)}


# Routers
app.include(quest_router)
