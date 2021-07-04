
import { View_Type } from "../types/views.type";
import { Ability_Object } from "./ability.object";
import { Card_Object } from "./card.object";
import { Deck_Object } from "./deck.object";
import { Faction_Object } from "./faction.object";
import { Game_Object } from "./game.object";
import { Player_Object } from "./player.object";
import { Type_Object } from "./type.object";

export interface MainState{
  activeView: View_Type
  cards: Card_Object[]
  players: Player_Object[]
  games: Game_Object[]
  abilities: Ability_Object[]
  factions: Faction_Object[]
  types: Type_Object[]
  decks: Deck_Object[]
}