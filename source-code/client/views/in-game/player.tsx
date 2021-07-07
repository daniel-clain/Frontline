import * as React from 'react';
import { Player_Object } from '../../object-models/player.object';
interface Player_C_Props{
  hand, graveyard, library, budget
}
export const Player_C = ({hand, graveyard, library, budget}: Player_C_Props) => {
  return <>
    <div className="hand">{hand}</div>
    <div className="graveyard">{graveyard}</div>
    <div className="library">{library}</div>
    <div className="budget">{budget}</div>
  </>
}
