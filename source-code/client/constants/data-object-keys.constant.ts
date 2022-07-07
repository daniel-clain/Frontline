import { Ability_Data } from "../object-models/data-objects/ability.object";
import { Card_Data } from "../object-models/data-objects/card.object";
import { Deck_Data, Deck } from "../object-models/data-objects/deck.object";
import { Faction_Data } from "../object-models/data-objects/faction.object";
import { defaultGameConfig, GameConfig_Data } from "../object-models/data-objects/game-config.object";
import { Game_Data } from "../object-models/data-objects/game.object";
import { Person_Data } from "../object-models/data-objects/person.object";
import { Type_Data } from "../object-models/data-objects/type.object";


export const dataObjects = {
  get person(): Omit<Person_Data, 'id'>{return {
    name: null,
    activeDeckId: null,
    deckIds: [],
    queuingForPvpGame: null
  }},
  get card(){return new Card_Data()},
  get faction(){return new Faction_Data()},
  get deck(){return new Deck_Data()},
  get ability(){return new Ability_Data()},
  get type(){return new Type_Data()},
  get game(){return {turnCount: null}},
  get gameConfig(): Omit<GameConfig_Data, 'id'> {
    return defaultGameConfig
  }

}



