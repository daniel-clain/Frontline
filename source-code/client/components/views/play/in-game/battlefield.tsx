
import * as React from 'react';
import { Tile_Game } from '../../../../object-models/tile.object';
import { gameService } from '../../../../services/game.service';
import { mainState } from '../../../../state/main.state';


const {getPlayerTiles} = gameService


export const Battlefield_C = () => {
  const {players} = mainState.game
  return (
    <battlefield>
      {players.map(player => 
        <player-tiles playerName={player.name}>
          {getPlayerTiles(player).map(t => 
            <tile>{t.cardOnTile?.name || ''}</tile>
          )}
        </player-tiles>
      )}
    </battlefield>
  )
}