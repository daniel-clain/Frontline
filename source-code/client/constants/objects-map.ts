import { MainState } from "../object-models/main-state.object";
import { Collection_Type } from "../sets/firebase-collections.set";

export const mainMap = {
  
  mainState: {
    toCollection: {
      cards: 'Cards',
      players: 'Players',
      games: 'Games',
      factions: 'Factions',
      types: 'Types',
      abilities: 'Abilities',
      decks: 'Decks',
      gameConfig: 'Game Config'
    },
    toSingle: {
      cards: 'card',
      players: 'player',
      games: 'game',
      factions: 'faction',
      types: 'type',
      abilities: 'ability',
      decks: 'deck',
      gameConfig: 'gameConfig',
    }
  },
  
  collection:{
    toMain: {
      'Cards': 'cards',
      'Players': 'players',
      'Games': 'games',
      'Factions': 'factions',
      'Types': 'types',
      'Abilities': 'abilities',
      'Decks': 'decks',
      'Game Config': 'gameConfig'
    }
  },
  

  built:{
    toId:{
      cards: 'cardIds',
      decks: 'deckIds',
      players: 'playerIds',
      ability1: 'ability1Id',
      ability2: 'ability2Id',
      faction: 'factionId',
      type: 'typeId',
      deck: 'activeDeckId'
    }
  },

  id:{
    toMainState: {
      ability1Id: 'abilities',
      ability2Id: 'abilities',
      factionId: 'factions',
      typeId: 'types',
      cardIds: 'cards',
      deckIds: 'decks',
      activeDeckId: 'decks',
      playerIds: 'players'
    },
    toBuilt: {
      cardIds: 'cards',
      deckIds: 'decks',
      playerIds: 'players',
      ability1Id: 'ability1',
      ability2Id: 'ability2',
      factionId: 'faction',
      typeId: 'type',
      activeDeckId: 'deck'
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

