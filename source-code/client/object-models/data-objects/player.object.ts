import { Card } from "./card.object"
import { GameCard } from "./game.object"
import { Person, Person_Data } from "./person.object"

export type Player = Person & {
  name: string
  hand: GameCard[]
  graveyard: GameCard[]
  library: GameCard[]
  availableBudget: number
  maxBudget: number
  morale: number
  focusingCard?: GameCard
}