import json

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
	with open('./data/items.json') as file:
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
	with open('./data/actions.json') as file:
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
	with open('./data/locations.json') as file:
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
	with open('./data/gameState.json') as file:
		stateJson = json.load(file)

	return GameState.model_validate(stateJson)
