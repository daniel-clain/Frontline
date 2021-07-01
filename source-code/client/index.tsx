
import { render } from 'react-dom'
import * as React from 'react';
import { Provider } from 'react-redux'
import { clientState } from './global-state/client.state';
import { Start_View } from './views/start.view';

const reactRenderingTag = document.createElement('react')
document.body.appendChild(reactRenderingTag)
render(
  //<Provider store={clientState}>
    <Start_View/>
  //</Provider>
  , reactRenderingTag
)


