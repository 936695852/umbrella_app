//reducer.js
import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../pages/Recommend/store/index'
import { reducer as singersReducer } from '../pages/Singers/store/index'

export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
  singers: singersReducer,
})
