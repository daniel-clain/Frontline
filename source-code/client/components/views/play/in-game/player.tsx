import * as React from 'react';
import { useEffect } from 'react';
import { is, numberLoop } from '../../../../../helper-functions';
import { CardInHand_C, Card_C } from '../../../card.component';
import { mainState } from '../../../../state/main.state';
import budgetImage from '../../../images/budget.png'
import { gameService } from '../../../../services/game.service';
import { observer } from 'mobx-react';
import { Player } from '../../../../object-models/data-objects/player.object';

const {endTurn} = gameService

export const Player_C = observer(
  ({player}: {player: Player}) => {
    const {library, hand, name, availableBudget, maxBudget} = player

    return (
      <player>
        {name}
        <library>
          cards left: {library.length}
        </library>
        <hand>
          {hand.map(card => <Card_C card={card}/>)}
        </hand>
        <budget>
          {`${availableBudget}/${maxBudget}`}
        </budget>
        <button onClick={endTurn}>End Turn</button>
      </player>
    )
  }
)