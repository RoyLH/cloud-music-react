import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { IconStyle } from './assets/iconfont/iconfont'
import './fix.css'
import RouterElement from './routes'
import store from './store/index'
import { GlobalStyle } from './style'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <RouterElement></RouterElement>
      </HashRouter>
    </Provider>
  )
}

export default App
