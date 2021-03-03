import React from 'react'
import { ListWrapper, ListItem, List } from './style'
import { getCount } from '../../api/utils'
import { RiHeadphoneFill } from 'react-icons/ri'

import LazyLoad from 'react-lazyload'

const RecommendList = ({ recommendList }) => {
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem key={item.id + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={<img width="100%" height="100%" src={require('./music.png').default} alt="music" />}
                >
                  <img src={item.picUrl + '?param=300x300'} width="100%" height="100%" alt="music" />
                </LazyLoad>
                <div className="play_count">
                  <RiHeadphoneFill style={{ verticalAlign: 'top' }} />
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)
