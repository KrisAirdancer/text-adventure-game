import json
from pathlib import Path
from pydantic import ValidationError
from models import Item, Action, Location, GameState

class DataManager:
	def __init__(self):
		print('AT: DataManager.__init__()')

		# TODO: Replace these lists with a new Pydantic model of ItemList, ActionList, etc. that contains the list of elements and some metadata.
		self.items: list[Item] = []
		self.actions: list[Action] = []
		self.locations: list[Location] = []
		self.gameState: GameState | None = None
		
	async def initialize(self):
		print('AT: DataManager.initialize()')
		self.items = await loadItemsData()
		self.actions = await loadActionsData()
		self.locations = await loadLocationsData()
		self.gameState = await loadGameStateData()
		
async def loadItemsData() -> list[Item]:
	print('AT: DataManager.loadItemsData()')

	path = Path(__file__).parent / 'data' / 'items.json'
	with open(path) as file:
		itemsJson = json.load(file)

	items = []
	for item in itemsJson:
		try:
			items.append(Item.model_validate(item))
		except ValidationError as e:
			print(f'Invalid item: {item}\nError: {e}')
	
	return items

async def loadActionsData() -> list[Action]:
	print('AT: DataManager.loadActionsData()')

	path = Path(__file__).parent / 'data' / 'actions.json'
	with open(path) as file:
		actionsJson = json.load(file)

	actions = []
	for action in actionsJson:
		try:
			actions.append(Action.model_validate(action))
		except ValidationError as e:
			print(f'Invalid action: {action}\nError: {e}')
	
	return actions

async def loadLocationsData() -> list[Location]:
	print('AT: DataManager.loadLocationsData()')

	path = Path(__file__).parent / 'data' / 'locations.json'
	with open(path) as file:
		locationsJson = json.load(file)

	locations = []
	for location in locationsJson:
		try:
			locations.append(Location.model_validate(location))
		except ValidationError as e:
			print(f'Invalid location: {location}\nError: {e}')
	
	return locations

async def loadGameStateData() -> GameState:
	print('AT: DataManager.loadGameStateData()')

	path = Path(__file__).parent / 'data' / 'gameState.json'
	with open(path) as file:
		stateJson = json.load(file)

	return GameState.model_validate(stateJson)
