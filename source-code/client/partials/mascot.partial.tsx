import * as React from 'react';
import {useEffect, useState} from 'react';
import clownMusicFile from '../sounds/clown-music.mp3';
import mascot from '../images/mascot.png';
export const Mascot_Partial = () => {
  const [state, setState] = useState({
    clownMusic: null as HTMLAudioElement,
    joke: null as string,
    showingJoke: false
  })
  const {showingJoke, clownMusic, joke} = state
  useEffect(() => {
    fetch('https://quotes.rest/qod.json?category=funny')
    .then(response => response.json())
    .then(json => json?.contents.quotes)
    .then(quotes => {
      setState({...state, joke: quotes[0].quote, clownMusic: new Audio(clownMusicFile)})
    })

  },[])

  return <>
    <div className={`mascot ${showingJoke ? 'showing-joke' : ''}`} >
      <img 
        src={mascot} 
        onClick={_ => {
          clownMusic?.play()
          setState({...state, showingJoke: true})
          setTimeout(() => setState({...state, showingJoke: false}), 4000)
        }} 
      />
      {showingJoke ? <div className="joke">{joke}</div> : ''}
    </div>
  </>
}