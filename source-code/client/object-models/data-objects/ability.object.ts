import Data from "./data.object.super";

type Ability_Type = 'Affliction' | 'Poison' | 'Object' | 'Direct' | 'Stun' | 'Paralyse'


export class Ability_Data implements Data{
  id
  name = null
}

export interface Ability extends Data{
}