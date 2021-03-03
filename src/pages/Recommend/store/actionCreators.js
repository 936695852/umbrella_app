import * as actionTypes from './constants'
import { fromJS } from 'immutable' // 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

// State 的变化，会导致 View 的变化。
// 但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。
// Action 就是 View 发出的通知，表示 State 应该要发生变化了。

//store.dispatch()是 View 发出 Action 的唯一方法。

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

export const changeBannerList = data => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
})

export const changeRecommendList = data => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
})

// store.dispatch方法正常情况下，参数只能是对象，不能是函数。
// 就要使用中间件redux-thunk。 改造store.dispatch，使可以接受函数作为参数。
export const getBannerList = () => {
  return dispatch => {
    getBannerRequest()
      .then(data => {
        dispatch(changeBannerList(data.banners))
      })
      .catch(() => {
        console.log('轮播图数据传输错误')
      })
  }
}

export const getRecommendList = () => {
  return dispatch => {
    getRecommendListRequest()
      .then(data => {
        dispatch(changeRecommendList(data.result))
        dispatch(changeEnterLoading(false)) // 改变 loading
      })
      .catch(() => {
        console.log('推荐歌单数据传输错误')
      })
  }
}
