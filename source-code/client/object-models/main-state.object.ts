
import { User } from "firebase";
import { View_Type } from "../sets/views.set";
import { Ability_Object } from "./ability.object";
import { Card_Object } from "./card.object";
import { Deck_Object } from "./deck.object";
import { Faction_Object } from "./faction.object";
import { Game_Object } from "./game.object";
import { Player_Object } from "./player.object";
import { Type_Object } from "./type.object";
import {IDocument} from '../interfaces/document.interface';

export interface MainState{
  activeView: View_Type
  user: User | null
  userDoc: IDocument
  cards: Card_Object[]
  players: Player_Object[]
  games: Game_Object[]
  abilities: Ability_Object[]
  factions: Faction_Object[]
  types: Type_Object[]
  decks: Deck_Object[]
}