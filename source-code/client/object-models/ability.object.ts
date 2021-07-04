import Data_Object from "./data.object.super";

type Ability_Type = 'Affliction' | 'Poison' | 'Object' | 'Direct' | 'Stun' | 'Paralyse'


export interface Ability_Data_Object extends Data_Object{

}

export interface Ability_Object extends Data_Object{
  id
  type: Ability_Type
}