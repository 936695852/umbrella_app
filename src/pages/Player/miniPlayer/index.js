import React, { useRef } from 'react'
import { getName } from '../../../api/utils'
import { MiniPlayerContainer } from './style'
import { BsMusicNoteList, BsPause, BsCaretRight } from 'react-icons/bs'
import { CSSTransition } from 'react-transition-group'
import ProgressCircle from '../../../baseUl/progress-circle'

function MiniPlayer(props) {
  const { song, playing, fullScreen } = props

  const { clickPlaying, toggleFullScreen } = props

  const miniPlayerRef = useRef()
  const percent = 0.2
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex'
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none'
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            {/* 暂停的时候唱片也停止旋转 */}
            <img className={`play ${playing ? '' : 'pause'}`} src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={33} percent={percent}>
            {playing ? (
              <BsPause className="icon-mini iconfont icon-pause" onClick={e => clickPlaying(e, false)} />
            ) : (
              <BsCaretRight className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)} />
            )}
          </ProgressCircle>
        </div>
        <div className="control">
          <BsMusicNoteList className="iconfont" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)
