import firebase_admin
from config import config
from dotenv import load_dotenv
from fastapi import FastAPI
from firebase_admin import auth, credentials

load_dotenv()

app = FastAPI()


firebase_admin.initialize_app()


@app.get("/")
async def root():
  return { "message": "Hello World" }
