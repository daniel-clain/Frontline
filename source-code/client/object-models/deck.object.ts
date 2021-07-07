import { Card_Object } from "./card.object";
import Data_Object from "./data.object.super";


export interface Deck_Data_Object extends Data_Object{
  name: string
  cardIds: string[]

}


export interface Deck_Object extends Data_Object {
  name: string
  cards: Card_Object[]
}

