
import { View_Type } from "../sets/views.set";
import { Ability_Data } from "./data-objects/ability.object";
import { Card_Data } from "./data-objects/card.object";
import { Deck_Data,  } from "./data-objects/deck.object";
import { Faction_Data,  } from "./data-objects/faction.object";
import { Game_Data } from "./data-objects/game.object";
import { Person_Data, Person } from "./data-objects/person.object";
import { Type_Data } from "./data-objects/type.object";
import {IDocument} from '../interfaces/document.interface';
import { GameConfig_Data } from "./data-objects/game-config.object";

export type MainState = {
  activeView: View_Type
  userId: string
  
  cards: Card_Data[]
  people: Person_Data[]
  games: Game_Data[]
  abilities: Ability_Data[]
  factions: Faction_Data[]
  types: Type_Data[]
  decks: Deck_Data[]
  gameConfigs: GameConfig_Data[]

  thisPerson: Person
  game: Game_Data
  gameConfig: GameConfig_Data
}