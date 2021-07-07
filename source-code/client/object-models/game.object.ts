import Data_Object from "./data.object.super";
import { Player_Game_Object, Player_Object } from "./player.object";

interface EventLog{
  soure
  effect
  
}

export interface Game_Data_Object extends Data_Object {
  playerIds: string[]
  playersTurn?: boolean
  turnCount: number
  history?: EventLog[]

}

export interface Game_Object extends Data_Object {
  players: Player_Game_Object[]
  playersTurn?: string
  turnCount: number
  history?: EventLog[]
}
