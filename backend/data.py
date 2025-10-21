import json

from pydantic import ValidationError
from models import Item, Action

class DataManager:
	def __init__(self):
		self.items: list[Item] = []
		print('AT: DataManager.__init__()')
		
	async def initialize(self):
		print('AT: DataManager.initialize()')
		self.items: list[Item] = await loadItemsData()
		self.actions: list[Action] = await loadActionsData()
		
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
