
import * as React from 'react';
import { gameService } from '../services/game.service';
import { mainService } from '../services/main.service';

export const Start_View = () => {
  return <div className='start-view view'>
    <button onClick={gameService.readyForGame}>Ready For Game</button>
  </div>
}