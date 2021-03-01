import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import store from './store/index' //renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index.js'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

export default App
