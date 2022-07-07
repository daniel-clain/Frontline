import { Card_Data } from "./data-objects/card.object";

export type Tile_Game = {
  playerId: string
  row: number
  column: number
  card: Card_Data
}