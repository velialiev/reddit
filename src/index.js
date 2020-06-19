import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import 'antd/dist/antd.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App/>
    </DndProvider>
  </Provider>,
  document.getElementById('root'),
)
