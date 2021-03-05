import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useCallback } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'

import LoadingV2 from '../loadingV2/index'
import { debounce } from '../../api/utils'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()

  const scrollContainerRef = useRef()

  const { direction, click, refresh, bounceTop, bounceBottom } = props

  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', scroll => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])
  // eslint-disable-next-line
  let pullUpDebounce = useCallback(debounce(pullUp, 300), [pullUp])
  // eslint-disable-next-line
  let pullDownDebounce = useCallback(debounce(pullDown, 300), [pullDown])
  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    // 解绑
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = pos => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))

  const PullupDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
  const PulldownDisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullupDisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PulldownDisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向上吸顶
}

export default Scroll
