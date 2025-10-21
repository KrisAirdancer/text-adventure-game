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

# TODO: Delete this class. It is for testing only.
class AllData(BaseModel):
	items: list[Item]
	actions: list[Action]
