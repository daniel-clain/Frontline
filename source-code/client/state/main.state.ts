
import { observable, reaction } from "mobx";
import { GameConfig_Data } from "../object-models/data-objects/game-config.object";
import { Game_Data } from "../object-models/data-objects/game.object";
import { Person_Data, Person } from "../object-models/data-objects/person.object";
import { MainState } from "../object-models/main-state.object";
import { dataService } from "../services/data.service";
import { mainService } from "../services/main.service";

const {buildOutPerson} = dataService

export const mainState: MainState = observable<MainState>({
  activeView: 'Data Editor',
  userId: null,

  cards: [],
  people: [],
  games: [],
  abilities:[],
  factions: [],
  types: [],
  decks: [],
  gameConfigs: [],

  game: null,
  thisPerson: null,
  gameConfig: null,
})

reaction(() => mainState.people, people => {
  console.log('reacting to people update, setting this person');
  setThisPerson()
})
reaction(() => mainState.decks, decks => {
  console.log('reacting to decks update, setting this person');
  setThisPerson()
})

reaction(() => mainState.games, games => {
  mainState.game = games.find(g => 
    g.players.find(p => p.id == mainState.userId)!
  )!
})

reaction(() => mainState.gameConfigs, gameConfigs => {
  mainState.gameConfig = gameConfigs[0]
})


function setThisPerson(){
  mainState.thisPerson = buildOutPerson(
    mainState.people.find(p => p.id == mainState.userId)
  )
}