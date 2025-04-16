from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class BaseConfig(BaseSettings):
  ENV_STATE: Optional[str] = None

  model_config = SettingsConfigDict(env_file=".env", extra="ignore")
                                    

class GlobalConfig(BaseConfig):
    FIREBASE_TYPE: Optional[str] = None
    FIREBASE_PROJECT_ID: Optional[str] = None
    FIREBASE_PRIVATE_KEY_ID: Optional[str] = None
    FIREBASE_PRIVATE_KEY: Optional[str] = None
    FIREBASE_CLIENT_EMAIL: Optional[str] = None
    FIREBASE_CLIENT_ID: Optional[str] = None
    FIREBASE_AUTH_URI: Optional[str] = None
    FIREBASE_TOKEN_URI: Optional[str] = None
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: Optional[str] = None
    FIREBASE_CLIENT_X509_CERT_URL: Optional[str] = None
    FIREBASE_UNIVERSE_DOMAIN: Optional[str] = None
    DB_URL: Optional[str] = None


class DevConfig(GlobalConfig):
  model_config = SettingsConfigDict(env_prefix="DEV_", extra="ignore")


class ProdConfig(GlobalConfig):
  model_config = SettingsConfigDict(env_prefix="PROD_", extra="ignore")


@lru_cache()
def get_config(env_state: str):
  configs = {"dev": DevConfig, "prod": ProdConfig}
  
  return configs[env_state]()

# Retrieving config based on ENV_STATE variable
config = get_config(BaseConfig().ENV_STATE)