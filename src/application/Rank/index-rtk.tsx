import { filterIndex } from '@/api/utils'
import EnterLoading from '@/baseUI/enter-loading'
import Loading from '@/baseUI/loading'
import Scroll from '@/baseUI/scroll'
import { useAppDispatch, useAppSelector } from '@/slice'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getRankList } from './slice'
import { Container, List, ListItem, SongList } from './style'

function Rank(props: any) {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {
    rank: { rankList, loading },
    player: {
      playList: { length: songsCount },
    },
  } = useAppSelector((state: any) => state)

  const getRankListDataDispatch = () => {
    dispatch(getRankList())
  }

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enterDetail = (detail: any) => {
    navigate(`/rank/${detail.id}`)
  }

  const renderSongList = (list: any[]) => {
    return list.length ? (
      <SongList>
        {list.map((item: any, index: number) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }

  const renderRankList = (list: any[], global?: boolean) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem
              key={`${item.coverImgId}${index}`}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img-wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update-frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  const globalStartIndex = filterIndex(rankList)
  const officialList = rankList.slice(0, globalStartIndex)
  const globalList = rankList.slice(globalStartIndex)
  const displayStyle = loading ? { display: 'none' } : { display: '' }

  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      <Outlet />
    </Container>
  )
}

// const mapStateToProps = (state: any) => ({
//   rankList: state.getIn(['rank', 'rankList']),
//   loading: state.getIn(['rank', 'loading']),
//   songsCount: state.getIn(['player', 'playList']).size,
// })

// const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
//   return {
//     getRankListDataDispatch() {
//       dispatch(actions.getRankList())
//     },
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
export default React.memo(Rank)
