import { Ability_Data_Object } from "../object-models/ability.object";
import { Card_Data_Object } from "../object-models/card.object";
import { Deck_Data_Object, Deck_Object } from "../object-models/deck.object";
import { Faction_Data_Object } from "../object-models/faction.object";
import { GameConfig_Data_Object } from "../object-models/game-config.object";
import { Game_Data_Object } from "../object-models/game.object";
import { Player_Data_Object } from "../object-models/player.object";
import { Type_Data_Object } from "../object-models/type.object";


export const dataObjects = {
  get player(){return new Player_Data_Object()},
  get card(){return new Card_Data_Object()},
  get faction(){return new Faction_Data_Object()},
  get deck(){return new Deck_Data_Object()},
  get ability(){return new Ability_Data_Object()},
  get type(){return new Type_Data_Object()},
  get game(){return {turnCount: null}},
  get gameConfig(){return new GameConfig_Data_Object}

}



