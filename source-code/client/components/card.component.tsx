import * as React from 'react';
import imagePlaceholder from '../images/image-placeholder.jpg'
import imageFace from '../images/card-face.png'
import imageBack from '../images/card-back.png'
import { Card } from '../object-models/data-objects/card.object';
import { GameCard } from '../object-models/data-objects/game.object';
import { gameService } from '../services/game.service';
import { cardService } from '../services/card.service';
type CardProps = {
  card: GameCard
  cardProps?: {
    isFocusCard?
    onMouseEnter?
    onMouseLeave?
    onMouseDown?
    onMouseUp?
    onMouseMove?
    style?
  }
}

const {getCardInHandProps} = cardService


export const Card_C = ({card, cardProps}: CardProps) => 
  <card {...cardProps}>
    {card.name}
    <img src={card.image}/>
  </card>


export const FocusCard_C = ({card}) => 
  <Card_C {...{
    card,
    cardProps: {
      isFocusCard: true
    }
  }}/>

export const CardInHand_C = ({card}) => 
  <Card_C {...{
    card,
    cardProps: getCardInHandProps(card)
  }}/>