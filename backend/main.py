from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
import json
from data import DataManager
from models import Item

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.dataManager = DataManager()
    await app.state.dataManager.initialize()
    print('===== Startup complete =====')

    yield  # App runs here

app = FastAPI(lifespan=lifespan)

# TODO: Remove this endpoint - it's just for testing.
@app.get("/")
async def root(request: Request) -> list[Item]:
	print('AT: /')

	return request.app.state.dataManager.items