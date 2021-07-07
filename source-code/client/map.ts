import { MainState } from "./object-models/main-state.object";
import { Collection_Type } from "./sets/firebase-collections.set";

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
      'Decks': 'decks'
    }
  },

  id:{
    toMainState: {
      'ability1Id': 'abilities',
      'ability2Id': 'abilities',
      'factionId': 'factions',
      'typeId': 'types',
      'cardIds': 'cards'
    }
  },


  idsToBuilt: {
    cardIds: 'cards',
    deckIds: 'decks'
  },
  idToBuilt: {
    cardId: 'card',
    factionId: 'faction',
    typeId:'type',
    ability1Id: 'ability 1',
    ability2Id: 'ability 2',
    cardIds: 'cards'
  },
  idsToCount: {
    cardIds: 'cards'
  }


}
