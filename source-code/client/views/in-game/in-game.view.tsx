import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import { Game_Object } from '../../object-models/game.object';
import { UserService } from '../../services/user.service';
import {mainState} from '../../state/main.state';
import { Player_C } from './player';
export const InGame_View = () => {
  const {players} = mainState
  return <>
    <div className="game-board"></div>
    {players.map(player => <Player_C {...player} />)}
  </>
}