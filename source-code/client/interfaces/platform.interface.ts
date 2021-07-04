import { Game_Object } from "../object-models/game.object";
import { Player_Object } from "../object-models/player.object";

export interface Platorm_I {
  players: Player_Object[]
  games: Game_Object[]
}

