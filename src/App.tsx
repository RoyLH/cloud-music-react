import { IconStyle } from '@/assets/iconfont/iconfont'
import RouterElement from '@/routes'
import slice from '@/slice'
import store from '@/store'
import { GlobalStyle } from '@/style'
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import '@/fix.css'

function App() {
  const { rtk } = process.env

  return (
    <Provider store={(rtk ? slice : store) as any}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <RouterElement></RouterElement>
      </HashRouter>
    </Provider>
  )
}

export default App
