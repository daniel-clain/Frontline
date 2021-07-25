import { mainState } from "../state/main.state";
import { Ability_Object } from "./ability.object";
import Data_Object from "./data.object.super";
import { Faction_Object } from "./faction.object";
import { Type_Object } from "./type.object";

abstract class Card_Base_Object{
  name: string = null
  hp: number = null
  budget: number = null
  morale: number = null
  armor: number = null
  image: any

}
export class Card_Data_Object extends Card_Base_Object implements Data_Object{
  id
  ability1Id: string = null
  ability2Id: string = null
  typeId: string = null
  factionId?: string = null

}

export class Card_Object extends Card_Base_Object implements Data_Object{
  id
  image: any
  faction: Faction_Object
  ability1: Ability_Object
  ability2: Ability_Object
  type: Type_Object
}

export const transformCard = (card: Card_Data_Object): Card_Object => {
  const {ability1Id, ability2Id, typeId, factionId} = card
  return {
    ...card,
    faction: mainState.factions.find(f => f.id == factionId),
    ability1: mainState.abilities.find(a => a.id == ability1Id),
    ability2: mainState.abilities.find(a => a.id == ability2Id),
    type: mainState.types.find(t => t.id == typeId)
  }
}
