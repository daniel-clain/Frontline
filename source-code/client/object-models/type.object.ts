import Data_Object from "./data.object.super";

type Type_Type = 'Field' | 'Commander' | 'Structure'

export class Type_Data_Object implements Data_Object{
  id
  name: string = null
}

export interface Type_Object extends Data_Object{
  name: string
}