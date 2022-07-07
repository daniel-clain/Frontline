import { MainState } from "../object-models/main-state.object";
import { Collection_Type } from "../sets/firebase-collections.set";

export const mainMap = {
  
  mainState: {
    toCollection: <{[key in keyof MainState]: Collection_Type}>{
      cards: 'Cards',
      people: 'People',
      games: 'Games',
      factions: 'Factions',
      types: 'Types',
      abilities: 'Abilities',
      decks: 'Decks',
      gameConfigs: 'Game Configs'
    },
    toSingle: {
      cards: 'card',
      people: 'person',
      games: 'game',
      factions: 'faction',
      types: 'type',
      abilities: 'ability',
      decks: 'deck',
      gameConfigs: 'gameConfig',
    }
  },
  
  collection:{
    toMain:  <{[key in Collection_Type]: keyof MainState | string}>{
      'Cards': 'cards',
      'People': 'people',
      'Games': 'games',
      'Factions': 'factions',
      'Types': 'types',
      'Abilities': 'abilities',
      'Decks': 'decks',
      'Game Configs': 'gameConfigs'
    }
  },
  

  built:{
    toId:{
      cards: 'cardIds',
      decks: 'deckIds',
      people: 'peopleIds',
      ability1: 'ability1Id',
      ability2: 'ability2Id',
      faction: 'factionId',
      type: 'typeId',
      activeDeck: 'activeDeckId'
    }
  },

  id:{
    toMainState: <{[k: string]: keyof MainState | string}>{
      ability1Id: 'abilities',
      ability2Id: 'abilities',
      factionId: 'factions',
      typeId: 'types',
      cardIds: 'cards',
      deckIds: 'decks',
      activeDeckId: 'decks',
      peopleIds: 'people'
    },
    toBuilt: {
      cardIds: 'cards',
      deckIds: 'decks',
      peopleIds: 'people',
      ability1Id: 'ability1',
      ability2Id: 'ability2',
      factionId: 'faction',
      typeId: 'type',
      activeDeckId: 'activeDeck'
    }
  },

  property:{
    toLabel:{
      'startingBudget': 'Starting Budget',
      'maxBudget': 'Max Budget',
      'startingCardsInHand': 'Starting Cards In Hand',
      'rowsPerPlayer': 'Rows Per Player'
    }
  }


}

