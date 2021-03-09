//reducer.js
import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from './recommend/index'
import { reducer as singersReducer } from './singers/index'
import { reducer as rankReducer } from './rank/index'
import { reducer as albumReducer } from './album/index'
import { reducer as singerInfoReducer } from './singer/index'
import { reducer as playerReducer } from './player/index'

export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
})
