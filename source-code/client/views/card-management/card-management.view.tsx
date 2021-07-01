
import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';
import { Card_Object } from "../../object-models/card.object"
import { cardsService } from '../../services/cards.service'


const CardManagement_View = observer(() => {
  const [activeCard, setActiveCard] = useState(null as Card_Object)

  return <div className='card-management'>
    <div className="active-card">
      <h1>Card Management</h1>
      <label>Card Name</label>
      <input 
        value={activeCard?.name || ''}
        onChange={e => setActiveCard({name: e.target.value})}
        onKeyUp={({code}: any) => code == 'Enter' &&  submitActiveCard()}
      />
      <button onClick={submitActiveCard}>
        {activeCard?.id ? 'Update' : 'Add'}
      </button>
    </div>
    <div className="cards-list">
      {cardsService.cards?.map(card => 
        <div key={card.id}>{card.name}</div>
      )}
    </div>
  </div>

  function submitActiveCard(){
    activeCard?.id ?
      cardsService.updateCard(activeCard) :
      cardsService.addCard(activeCard)    
    setActiveCard(null)
  }
})
export default CardManagement_View