
import { Card } from "./card.object";
import Data from "./data.object.super";
import { Deck } from "./deck.object";
import { GameCard } from "./game.object";

export type Person_Data = Data &{
  name: string
  activeDeckId: string
  deckIds: string[]
  queuingForPvpGame?: boolean
}
export type Person = Data &{
  name: string
  activeDeck: Deck
  decks: Deck[]
  queuingForPvpGame?: boolean
}
