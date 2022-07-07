
import * as React from 'react';
import { observer } from 'mobx-react';
import { mainState } from '../../../state/main.state';
import { Start_View } from './start/start.view';
import { InGame_View } from './in-game/game';

export const Play_View = observer(() => {

  const {game} = mainState
  

  return <div className='frontline'>  
    {game ? <InGame_View /> : <Start_View/>} 
  </div>
})