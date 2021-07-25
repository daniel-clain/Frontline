import Data_Object from "./data.object.super";

export class GameConfig_Data_Object implements Data_Object{
  id
  startingBudget: number = null
  maxBudget: number = null
  startingCardsInHand: number = null
  rowsPerPlayer: number = null
  columns: number = null

}