import Data_Object from "./data.object.super";

type Ability_Type = 'Affliction' | 'Poison' | 'Object' | 'Direct' | 'Stun' | 'Paralyse'


export class Ability_Data_Object implements Data_Object{
  id
  name = null
}

export interface Ability_Object extends Data_Object{
}