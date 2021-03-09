import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRankList } from '../../store/rank'
import { Container, List, ListItem, SongList } from './style'
import { filterIndex } from '../../api/utils'
import Scroll from '../../baseUl/scroll'
import { renderRoutes } from 'react-router-config'

function Rank(props) {
  const { rankList: list, loading } = props
  const { getRankListDataDispatch } = props

  let rankList = list ? list.toJS() : []
  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)

  useEffect(() => {
    getRankListDataDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let displayStyle = loading ? { display: 'none' } : { display: '' }

  const enterDetail = detail => {
    props.history.push(`/rank/${detail.id}`)
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map(item => {
          return (
            <ListItem key={item.commentThreadId} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequency">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  const renderSongList = list => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  )
}

const mapStateToProps = state => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
})

const mapDispatchToProps = dispatch => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
