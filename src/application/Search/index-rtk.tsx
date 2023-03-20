import React, { useCallback, useEffect, useRef, useState } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { getName } from '../../api/utils'
import Loading from '../../baseUI/loading/index'
import MusicalNote from '../../baseUI/music-note'
import Scroll from '../../baseUI/scroll/index'
import SearchBox from '../../baseUI/search-box/index'
import { useAppDispatch, useAppSelector } from '../../slice'
import { SongItem } from '../Album/style'
// import * as playerActions from '../Player/store/actions'
import { getSongDetail } from '../Player/slice'
import { EnterLoading, List, ListItem } from '../Singers/style'
import searchSlice, { getHotKeyWords, getSuggestList } from './slice'
import { Container, HotKey, ShortcutWrapper } from './style'

const Search = (props: any) => {
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const musicNoteRef = useRef<any>()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {
    search: { hotList, enterLoading, suggestList, songsList },
    player: {
      playList: { length: songsCount },
    },
  } = useAppSelector((state: any) => state)

  const getHotKeyWordsDispatch = () => {
    dispatch(getHotKeyWords())
  }
  const changeEnterLoadingDispatch = (data: any) => {
    dispatch(searchSlice.actions.SET_ENTER_LOADING(data))
  }
  const getSuggestListDispatch = (data: any) => {
    dispatch(getSuggestList(data))
  }
  const getSongDetailDispatch = (id: string) => {
    dispatch(getSongDetail(id))
  }

  useEffect(() => {
    setShow(true)
    if (!hotList.size) getHotKeyWordsDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderHotKey = () => {
    const list = hotList || []
    return (
      <ul>
        {list.map((item: any) => {
          return (
            <li
              className="item"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  // const renderHistoryList = () => {
  //   return (
  //     <ul>
  //       {
  //         [1,2,3,4,5,6,7,8,9,5,5,5,5,5].map(item => {
  //           return (
  //             <li  className="history_item">
  //               <span className="text">离圣诞节分厘卡士大夫将来肯定</span>
  //               <span className="icon">
  //                 <i className="iconfont icon_delete">&#xe600;</i>
  //               </span>
  //             </li>
  //           )
  //         })
  //       }
  //     </ul>
  //   )
  // }
  const handleQuery = (q: any) => {
    setQuery(q)
    if (!q) return
    changeEnterLoadingDispatch(true)
    getSuggestListDispatch(q)
  }

  const renderSingers = () => {
    const singers = suggestList.artists
    if (!singers || !singers.length) return
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {singers.map((item: any, index: number) => {
          return (
            <ListItem
              key={item.accountId + '' + index}
              onClick={() => navigate(`/singers/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./singer.png')}
                      alt="singer"
                    />
                  }
                >
                  <img
                    src={item.picUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">歌手: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const renderAlbum = () => {
    const albums = suggestList.playlists
    if (!albums || !albums.length) return
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {albums.map((item: any, index: number) => {
          return (
            <ListItem
              key={item.accountId + '' + index}
              onClick={() => navigate(`/album/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./music.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.coverImgUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">歌单: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const selectItem = (e: any, id: string) => {
    getSongDetailDispatch(id)
    musicNoteRef.current.startAnimation({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    })
  }

  const searchBack = useCallback(() => {
    setShow(false)
  }, [])

  const renderSongs = () => {
    return (
      <SongItem style={{ paddingLeft: '20px' }}>
        {songsList.map((item: any) => {
          return (
            <li key={item.id} onClick={e => selectItem(e, item.id)}>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          )
        })}
      </SongItem>
    )
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}
          ></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
              {/* <SearchHistory>
                <h1 className="title">
                  <span className="text">搜索历史</span>
                  <span className="clear">
                    <i className="iconfont">&#xe63d;</i>
                  </span>
                </h1>
                {renderHistoryList()}
              </SearchHistory> */}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {/* 下面为搜索结果 */}
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>
    </CSSTransition>
  )
}

// const mapStateToProps = (state: any) => ({
//   hotList: state.getIn(['search', 'hotList']),
//   enterLoading: state.getIn(['search', 'enterLoading']),
//   suggestList: state.getIn(['search', 'suggestList']),
//   songsCount: state.getIn(['player', 'playList']).size,
//   songsList: state.getIn(['search', 'songsList']),
// })

// const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
//   return {
//     getHotKeyWordsDispatch() {
//       dispatch(actions.getHotKeyWords())
//     },
//     changeEnterLoadingDispatch(data: any) {
//       dispatch(actions.changeEnterLoading(data))
//     },
//     getSuggestListDispatch(data: any) {
//       dispatch(actions.getSuggestList(data))
//     },
//     getSongDetailDispatch(id: string) {
//       dispatch(playerActions.getSongDetail(id))
//     },
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))
export default React.memo(Search)