import { Card } from "./card.object";
import Data from "./data.object.super";


export class Deck_Data implements Data{
  id
  name: string = null
  cardIds: string[] = []

}


export interface Deck extends Data {
  name: string
  cards: Card[]
}

