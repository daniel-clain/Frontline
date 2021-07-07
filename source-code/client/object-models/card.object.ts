import { mainState } from "../state/main.state";
import { Ability_Object } from "./ability.object";
import Data_Object from "./data.object.super";
import { Faction_Object } from "./faction.object";
import { Type_Object } from "./type.object";


export interface Card_Data_Object extends Data_Object{
  name: string
  ability1Id: string
  ability2Id: string
  hp: number
  typeId: string
  budget: number
  morale: number
  factionId?: string
  armor: number

}

export interface Card_Object extends Data_Object{
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
