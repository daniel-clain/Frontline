
import { observer } from 'mobx-react';
import * as React from 'react';
import {mainState} from '../../state/main.state';
import { Player_C } from './player';


export const InGame_View = observer(() => {

  const {user, games} = mainState
  const game = games.find(g => g.players.some(p => p.id == user.uid))
  const {players, turnCount, playersTurn, history} = game


  return <div className="view in-game-view">

    <div className="turn">Turn: {turnCount}</div>
    <div className="game-board"></div>
    {players.map(player => <Player_C {...player} />)}
    {players.length == 1 ? <Player_C {...{} as any} /> : ''}
    <div className="history">
      {history.map(h => <div className='history-item'>
        Source: {h.soure}<br/>
        Effect: {h.effect}<br/>
        <hr/>
      </div>)}
    </div>

  </div>

})