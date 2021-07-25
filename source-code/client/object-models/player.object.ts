
import { Card_Object } from "./card.object";
import Data_Object from "./data.object.super";
import { Deck_Object } from "./deck.object";

export class Player_Data_Object implements Data_Object {
  id
  name: string = null
  userId: string = null
  activeDeckId: string = null
  deckIds: string[] = []
  ready?: boolean = null
}
export interface Player_Object extends Data_Object {
  name: string
  activeDeck: Deck_Object
  decks: Deck_Object[]
  ready?: boolean
}


export interface Player_Game_Object{
  playerId: string
  name: string
  hand: Card_Object[]
  graveyard: Card_Object[]
  library: Card_Object[]
  budget: number
  maxBudget: number
}

