import * as React from 'react';
import { Card_Object } from "../object-models/card.object";
import imagePlaceholder from '../images/image-placeholder.jpg'
import imageFace from '../images/card-face.png'
import imageBack from '../images/card-back.png'
type Props = {
  card: Card_Object
}
export const Card_P = ({card}: Props) => 
  <div className="card">
    <div className="card-image-wrapper">
      <div className="face-up">
        <img className="card-image-frame" src={imageFace}/>
        <img className="card-image" src={card?.image || imagePlaceholder}/>
      </div>
      <div className="face-down">
        <img className="card-image-back" src={imageBack}/>
      </div>
    </div>
    <div className="card-inner">
      <img className="card__image" />
        <div className="card__name">
          {card?.name}
        </div>
      </div>
  </div>
