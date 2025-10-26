from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from game import Game
from models import AllData

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.game = Game()
    await app.state.game.initialize()
    print('===== Startup complete =====')

    yield  # App runs here

app = FastAPI(lifespan=lifespan)

# TODO: Remove this endpoint - it's just for testing.
@app.get("/")
async def root(request: Request) -> AllData:
	print('AT: /')

	return request.app.state.game.getAllData()