from pydantic import BaseModel
from typing import Dict

class Item(BaseModel):
	id: str
	nameSingular: str
	namePlural: str
	isEquipable: bool
	type: str
	maxNumPerSlot: int

	# TODO: Add an @classmethod constructor to take in a JSON string to initialize the object. This will reduce clutter where the objects are initialized.
