from pydantic import BaseModel
from typing import Dict, Optional

class Item(BaseModel):
	id: str
	nameSingular: str
	namePlural: str
	isEquipable: bool
	type: str
	maxNumPerSlot: int

class SearchItemDetails(BaseModel):
	itemId: str
	minQuantity: int
	maxQuantity: int
	probability: int

class SearchActionDetails(BaseModel):
	maxItems: int
	notificationTextTemplate: str
	noItemsFoundText: str
	availableItems: list[SearchItemDetails]

class Action(BaseModel):
	id: str
	type: str # TODO: Add enums for the types (and for all of the other constants for that matter).
	name: str
	description: str
	travelDestinationId: Optional[str] = None # TODO: What is this for?
	searchDetails: Optional[SearchActionDetails] = None

class Location(BaseModel):
	id: str
	name: str
	description: str
	actions: list[str] # Array of location IDs

class InventoryItem(BaseModel):
	id: str
	count: int

class EquipmentState(BaseModel):
	headItemId: str | None
	neckItemId: str | None
	bodyItemId: str | None
	handsItemId: str | None
	onHandItemId: str | None
	offHandItemId: str | None
	ringItemId: str | None
	legsItemId: str | None
	feetItemId: str | None

class PlayerState(BaseModel):
	inventory: list[InventoryItem]
	equipment: EquipmentState

class GameState(BaseModel):
	currentLocationId: str
	player: PlayerState

# TODO: Delete this class. It is for testing only.
class AllData(BaseModel):
	items: list[Item]
	actions: list[Action]
	locations: list[Location]
	gameState: GameState
