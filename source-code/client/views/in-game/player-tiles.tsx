
import * as React from 'react';
import { is, numberLoop } from '../../helper-functions';
import { Player_Game_Object, Player_Object } from '../../object-models/player.object';
import { DraggedCard } from './in-game.view';
import { Tile_C } from './tile';
type Props = {
  rowsPerPlayer: number
  columns: number
  player: Player_Game_Object
}
export const PlayerTiles_C = ({rowsPerPlayer, columns, player}: Props) => {

  return <>
    {numberLoop(rowsPerPlayer, rowNumber =>
      <div className="row" key={rowNumber}>
        {numberLoop(columns, colNumber => 
          <Tile_C key={colNumber} {...{row: rowNumber, column: colNumber, playerId: player.playerId}} />
        )}
      </div>
    )}
  </>
}