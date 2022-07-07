import Data from "./data.object.super";

export type GameConfig_Data = Data &{
  startingBudget: number
  maxBudget: number
  startingCardsInHand: number
  rowsPerPlayer: number
  columns: number
  startingMorale: number
}

export const defaultGameConfig: Omit<GameConfig_Data, 'id'> = {
  startingBudget: 0,
  maxBudget :10,
  startingCardsInHand: 7,
  rowsPerPlayer: 5,
  columns: 7,
  startingMorale: 100
}