import React, { useContext, useEffect } from 'react'
import Horizon from '../../baseUl/horizonItem'
import Scroll from '../../baseUl/scroll'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import LazyLoad, { forceCheck } from 'react-lazyload'

import { CategoryDataContext, CHANGE_CATEGORY, CHANGE_ALPHA } from './data'

import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from './store/actionCreators'
import { connect } from 'react-redux'

// 渲染函数，返回歌手列表
const renderSingerList = singerList => {
  return (
    <List>
      {singerList.map((item, index) => {
        return (
          <ListItem key={item.accountId + '' + index}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={<img width="100%" height="100%" src={require('./singer.png').default} alt="music" />}
              >
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
              </LazyLoad>
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        )
      })}
    </List>
  )
}

function Singers(props) {
  const { singerList, pullUpLoading, pullDownLoading, pageCount } = props
  const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props

  const { data, dispatch } = useContext(CategoryDataContext)
  // 拿到 category 和 alpha 的值
  const { category, alpha } = data.toJS()

  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!singerList.size) {
      getHotSingerDispatch()
    }
    //eslint-disable-next-line
  }, [])

  const singerListJS = singerList ? singerList.toJS() : []

  const handleUpdateAlpha = val => {
    dispatch({ type: CHANGE_ALPHA, data: val })
    updateDispatch(category, val)
  }

  const handleUpdateCategory = val => {
    dispatch({ type: CHANGE_CATEGORY, data: val })
    updateDispatch(val, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount)
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }

  return (
    <NavContainer>
      <Horizon
        list={categoryTypes}
        title={'分类 (默认热门):'}
        handleClick={val => handleUpdateCategory(val)}
        oldVal={category}
      ></Horizon>
      <Horizon list={alphaTypes} title={'首字母:'} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></Horizon>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList(singerListJS)}
        </Scroll>
      </ListContainer>
    </NavContainer>
  )
}

const mapStateToProps = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
})
const mapDispatchToProps = dispatch => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)) //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)) //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha))
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0)) //属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
