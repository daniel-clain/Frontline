import Data_Object from "./data.object.super";

type Type_Type = 'Field' | 'Commander' | 'Structure'

export interface Type_Data_Object extends Data_Object{

}

export interface Type_Object extends Data_Object{
  name: Type_Type
}