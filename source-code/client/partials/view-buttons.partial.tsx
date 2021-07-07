import * as React from 'react';
import { is } from '../helper-functions';
import { viewsSet } from '../sets/views.set';
import { mainState } from '../state/main.state';

export const ViewButtons_P = () => 
  <div className="view-buttons">
    {viewsSet.map(view => 
      <button
        key={view}
        className={is('selected').if(mainState.activeView == view)}
        onClick={_ => mainState.activeView = view}
      >{view}
      </button>
    )}
  </div>
  