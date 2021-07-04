import Data_Object from "./data.object.super";

type Faction_Type = 'Feveena' | 'Librethian' | 'Renjuren' | 'Sidives' | 'The Monsoon' | 'The Silhouette' | 'The Sun'

export interface Faction_Data_Object extends Data_Object{

}


export interface Faction_Object extends Data_Object{
  name: Faction_Type
}