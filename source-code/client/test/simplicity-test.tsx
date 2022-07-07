
import { observer } from 'mobx-react';
import * as React from 'react';
const state = {
  game: {
    players: [
      {
        name: "Daniel",
        library: [
          {
            name: 'card 1'
          }
        ],
        hand: [
          {
            name: 'card 2',
            image: 'images/card2.jpg'
          }
        ],
        focusCard: {
          name: 'card 4'
        }
      },

    ],
    tiles: [
      {
        card: {name: 'card 3'}
      }
    ]

  }
}



export function getGameComponent(){
  const {game} = state
  return (
    <game>
      {game.players.map(player => 
        <player>
          {player.name}
          <library>
            {player.library.map(card => 
              <card>
                {card.name}
              </card>
            )}
          </library>
          <hand>
            {player.hand.map(card => 
              <card>
                {card.name}
                <img src={card.image} />
              </card>
            )}
          </hand>
        </player>
      )}
      <battlefield>
        
        {game.tiles.map(tile => 
          <tile>
            {tile.card?.name}
          </tile>
        )}
      </battlefield>
    </game>
  )
}

export type Game_C = ReturnType<typeof getGameComponent>

export const App = () => {
  return <div></div>
}
  