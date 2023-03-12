import React from 'react'
import { HashRouter } from 'react-router-dom'
import { IconStyle } from './assets/iconfont/iconfont'
import RouterElement from './routes'
import { GlobalStyle } from './style'

function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <RouterElement></RouterElement>
      <IconStyle></IconStyle>
    </HashRouter>
  )
}

export default App
