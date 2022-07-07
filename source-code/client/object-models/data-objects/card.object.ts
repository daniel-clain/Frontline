import { mainState } from "../../state/main.state";
import { Ability } from "./ability.object";
import Data from "./data.object.super";
import { Faction } from "./faction.object";
import { Type } from "./type.object";

abstract class Card_Base{
  name: string = null
  hp: number = null
  budget: number = null
  morale: number = null
  armor: number = null
  image: any

}
export class Card_Data extends Card_Base implements Data{
  id
  ability1Id: string = null
  ability2Id: string = null
  typeId: string = null
  factionId?: string = null

}

export class Card extends Card_Base implements Data{
  id
  image: any
  faction: Faction
  ability1: Ability
  ability2: Ability
  type: Type
}

export const transformCard = (card: Card_Data): Card => {
  const {ability1Id, ability2Id, typeId, factionId} = card
  return {
    ...card,
    faction: mainState.factions.find(f => f.id == factionId),
    ability1: mainState.abilities.find(a => a.id == ability1Id),
    ability2: mainState.abilities.find(a => a.id == ability2Id),
    type: mainState.types.find(t => t.id == typeId)
  }
}
