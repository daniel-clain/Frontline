
import { observable } from "mobx";
import { Ability_Object } from "../object-models/ability.object";
import { Card_Object } from "../object-models/card.object";
import { Deck_Object } from "../object-models/deck.object";
import { Faction_Object } from "../object-models/faction.object";
import { Game_Object } from "../object-models/game.object";
import { MainState } from "../object-models/main-state.object";
import { Player_Object } from "../object-models/player.object";
import { Type_Object } from "../object-models/type.object";



export const mainState: MainState = observable({
  activeView: 'Data Editor',
  cards: <Card_Object[]>[],
  players: <Player_Object[]>[],
  games: <Game_Object[]>[],
  abilities: <Ability_Object[]>[],
  factions: <Faction_Object[]>[],
  types: <Type_Object[]>[],
  decks: <Deck_Object[]>[]
})
