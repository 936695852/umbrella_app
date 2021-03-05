import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config' //renderRoutes 读取路由配置转化为 Route 标签
import store from './store/index'
import routes from './routes/index.js'
import { BrowserRouter } from 'react-router-dom'

import { Data } from './pages/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <Data>{renderRoutes(routes)}</Data>
      </BrowserRouter>
    </Provider>
  )
}

export default App
