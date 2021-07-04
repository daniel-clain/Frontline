import * as React from 'react';
import { Player_Object } from '../../object-models/player.object';

export const Player_C = ({
  gameState: {hand, graveyard, library, budget}
}: Player_Object) => 
  <>
    <div className="hand">{hand}</div>
    <div className="graveyard">{graveyard}</div>
    <div className="library">{library}</div>
    <div className="budget">{budget}</div>
  </>
