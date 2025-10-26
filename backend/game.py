from dataManager import DataManager
from models import AllData

class Game:

	def __init__(self):
		print('AT: DataManager.__init__()')

		self.dataManager: DataManager = DataManager()

	async def initialize(self):
		print('AT: Game.initialize()')

		await self.dataManager.initialize()

	def getAllData(self) -> AllData:
		print('AT: Game.getAllData()')

		return self.dataManager.getAllData()