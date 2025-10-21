import json

from pydantic import ValidationError
from models import Item

class DataManager:
	def __init__(self):
		self.items: list[Item] = []
		print('AT: DataManager.__init__()')
		
	async def initialize(self):
		print('AT: DataManager.initialize()')
		self.items: list[Item] = await loadItemsData('./data/items.json')
		
async def loadItemsData(filePath: str) -> list[Item]:
	print('AT: DataManager.loadItemsData()')
	with open(filePath) as file:
		itemsJson = json.load(file)

	items = []
	for item in itemsJson:
		try:
			items.append(Item.model_validate(item))
		except ValidationError as e:
			print(f'Invalid item: {item}\nError: {e}')
	
	return items
