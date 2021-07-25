
import { observable } from "mobx";
import { MainState } from "../object-models/main-state.object";



export const mainState = observable<MainState>({
  activeView: 'Data Editor',
  user: null,
  userDoc: null,
  cards: [],
  players: [],
  games: [],
  abilities:[],
  factions: [],
  types: [],
  decks: [],
  gameConfig: null,

  draggedCard: null,
  hoveredCard: null

})
