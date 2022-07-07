import Data from "./data.object.super";

type Type_Type = 'Field' | 'Commander' | 'Structure'

export class Type_Data implements Data{
  id
  name: string = null
}

export interface Type extends Data{
  name: string
}