import React from 'react'
import { getName } from '../../../api/utils'
import { MiniPlayerContainer } from './style'
import { BsMusicNoteList, BsPause } from 'react-icons/bs'

function MiniPlayer(props) {
  const { song } = props
  return (
    <MiniPlayerContainer>
      <div className="icon">
        <div className="imgWrapper">
          <img className="play" src={song.al.picUrl} width="40" height="40" alt="img" />
        </div>
      </div>
      <div className="text">
        <h2 className="name">{song.name}</h2>
        <p className="desc">{getName(song.ar)}</p>
      </div>
      <div className="control">
        <BsPause className="iconfont" />
      </div>
      <div className="control">
        <BsMusicNoteList className="iconfont" />
      </div>
    </MiniPlayerContainer>
  )
}

export default React.memo(MiniPlayer)
