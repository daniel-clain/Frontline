import { Card_Object } from "./card.object";
import Data_Object from "./data.object.super";


export class Deck_Data_Object implements Data_Object{
  id
  name: string = null
  cardIds: string[] = []

}


export interface Deck_Object extends Data_Object {
  name: string
  cards: Card_Object[]
}

