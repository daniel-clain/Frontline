
import { randomNumber } from "../helper-functions";
import { mainMap } from "../map";
import Data_Object from "../object-models/data.object.super";
import { Game_Data_Object, Game_Object } from "../object-models/game.object";
import { collectionSet } from "../sets/firebase-collections.set";
import { mainState } from "../state/main.state";
import { dataService } from "./data.service";
import { gameService } from "./game.service";

export const mainService = {
  ...dataService,
  ...gameService,
  startReadingDataStreams
}

function startReadingDataStreams(){  
  collectionSet.forEach(collection => {
    dataService.data$(collection, (dataItem: Data_Object[]) => {
      mainState[mainMap.collection.toMain[collection]] = dataItem
    })
  })
}





