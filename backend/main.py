from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from data import DataManager
from models import AllData

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.dataManager = DataManager()
    await app.state.dataManager.initialize()
    print('===== Startup complete =====')

    yield  # App runs here

app = FastAPI(lifespan=lifespan)

# TODO: Remove this endpoint - it's just for testing.
@app.get("/")
async def root(request: Request) -> AllData:
	print('AT: /')

	return AllData(
            items = request.app.state.dataManager.items,
            actions = request.app.state.dataManager.actions,
            locations = request.app.state.dataManager.locations,
            gameState = request.app.state.dataManager.gameState
	)