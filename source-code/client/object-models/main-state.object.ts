
import { User } from "firebase";
import { View_Type } from "../sets/views.set";
import { Ability_Data_Object } from "./ability.object";
import { Card_Data_Object, Card_Object } from "./card.object";
import { Deck_Data_Object,  } from "./deck.object";
import { Faction_Data_Object,  } from "./faction.object";
import { Game_Data_Object } from "./game.object";
import { Player_Data_Object } from "./player.object";
import { Type_Data_Object } from "./type.object";
import {IDocument} from '../interfaces/document.interface';
import { GameConfig_Data_Object } from "./game-config.object";
import { DraggedCard } from "../views/in-game/in-game.view";

export interface MainState{
  activeView: View_Type
  user: User | null
  userDoc: IDocument
  cards: Card_Data_Object[]
  players: Player_Data_Object[]
  games: Game_Data_Object[]
  abilities: Ability_Data_Object[]
  factions: Faction_Data_Object[]
  types: Type_Data_Object[]
  decks: Deck_Data_Object[]
  gameConfig: GameConfig_Data_Object[]

  draggedCard: DraggedCard
  hoveredCard: Card_Object
}