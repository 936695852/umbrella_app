import React, { useRef, useState, useEffect } from 'react'
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import { getSongUrl, isEmptyObject } from '../../api/utils'

import { connect } from 'react-redux'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
} from '../../store/player/actionCreators'

function Player(props) {
  const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong } = props
  const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch } = props

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  //歌曲总时长
  const [duration, setDuration] = useState(0)
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const audioRef = useRef()

  let currentSong = immutableCurrentSong.toJS()

  const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: ['手游《梦幻花园》苏州园林版推广曲'],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050,
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ]

  useEffect(() => {
    if (!currentSong) return
    changeCurrentIndexDispatch(0) //currentIndex默认为-1，临时改成0
    let current = playList[0]
    changeCurrentDispatch(current) //赋值currentSong
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play()
    })
    togglePlayingDispatch(true) //播放状态
    setCurrentTime(0) //从头开始播放
    setDuration((current.dt / 1000) | 0) //时长
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clickPlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
  }

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          percent={percent}
        />
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
        />
      )}
      <audio ref={audioRef}></audio>
    </div>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
})

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index))
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data))
    },
  }
}

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
