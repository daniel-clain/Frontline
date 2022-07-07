
import * as React from 'react';
import { gameService } from '../../../../services/game.service';
import { mainService } from '../../../../services/main.service';

export const Start_View = () => {
  return <div className='start-view view'>
    <button onClick={gameService.waitForPvpGame}>Wait for PVP game</button>
    
    <button onClick={gameService.startGameVsAi}>Start game vs AI</button>
  </div>
}