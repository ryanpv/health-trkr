from fastapi import Header, HTTPException, status
from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError


async def verify_token_basic(authorization: str = Header(...)):
  if not authorization.startswith("Bearer "):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid token"
    )
  
  token = authorization.split(" ")[1]
  try:
    decoded_token = auth.verify_id_token(token)

    return decoded_token.get("uid")
  except FirebaseError as e:
    print(f"Firebase error: { e }")
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid/expired token")

  except Exception as e:
    print(f"Error verifying token: { e }")
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Failed to verify token.")