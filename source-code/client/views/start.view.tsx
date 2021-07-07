
import * as React from 'react';
import { mainService } from '../services/main.service';

export const Start_View = () => {
  return <div className='start-view view'>
    <button onClick={mainService.readyForGame}>Ready For Game</button>
  </div>
}