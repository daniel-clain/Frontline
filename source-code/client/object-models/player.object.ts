
import { Card_Object } from "./card.object";
import Data_Object from "./data.object.super";
import { Deck_Object } from "./deck.object";

export interface Player_Data_Object extends Data_Object {
  name: string
  activeDeckId: string
  deckIds: string[]
  ready: boolean
}
export interface Player_Object extends Data_Object {
  name: string
  activeDeck: Deck_Object
  decks: Deck_Object[]
  ready: boolean
}


export interface Player_Game_Object extends Data_Object{
  player: Card_Object
  hand: Card_Object[]
  graveyard: Card_Object[]
  library: Card_Object[]
  budget: number
}


