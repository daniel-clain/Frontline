import { Card_Object } from "./card.object";
import Data_Object from "./data.object.super";
import { Deck_Object } from "./deck.object";

interface GameState_Object{
  hand: Card_Object[]
  budget: number
  library: Card_Object[]
  graveyard: Card_Object[]
  cardsInPlay: Card_Object[]
}

export interface Player_Object extends Data_Object {
  name: string
  activeDeck: Deck_Object
  decks: Deck_Object[]
  ready: boolean
  gameState?: GameState_Object
}

