from fastapi import Depends, Header, HTTPException, status
from firebase_admin import auth


async def verify_token(authorization: str = Header(...)): 
  if not authorization.startswith("Bearer "):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid token",
    )
  
  token = authorization.split(" ")[1]
  try: 
    decoded_token = auth.verify_id_token(token)
    return decoded_token["uid"]
  except Exception as e:
    print(f"Error verifying token: { e }")
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid token"
    )
