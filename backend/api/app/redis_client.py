from redis import asyncio as aioredis
import os
import dotenv

dotenv.load_dotenv()

redis = None

REDIS_HOST = os.getenv("REDIS_HOST", "redis-15041.crce179.ap-south-1-1.ec2.redns.redis-cloud.com")
REDIS_PORT = int(os.getenv("REDIS_PORT", 15041))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", "VK15bQhwwywvG3TvLB8lnJzfv2GTu9j2")

async def get_redis():
    global redis
    if not redis:
        redis = await aioredis.from_url(
            f"redis://{REDIS_HOST}:{REDIS_PORT}",
            password=REDIS_PASSWORD,
            decode_responses=True
        )
    return redis
