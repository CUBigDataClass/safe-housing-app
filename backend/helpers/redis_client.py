import redis
from config.settings import DevConfig

redis_db = redis.Redis(host=DevConfig.REDIS_HOST, port=DevConfig.REDIS_PORT, db=DevConfig.REDIS_DB)

def set(key,value):
    return redis_db.set(key, value)

def get_keys():
    return redis_db.keys()

def get(key):
    return redis_db.get(key)

def del_key(key):
    return redis_db.delete(key)

