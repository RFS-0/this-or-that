/* @refresh reload */
import './index.css'
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import App from './App'
import { ApplicationContextProvider } from './AppContext'

render(
  () => (
    <ApplicationContextProvider>
      <Router>
        <App />
      </Router>
    </ApplicationContextProvider>
  ),
  document.getElementById('root') as HTMLElement
)
