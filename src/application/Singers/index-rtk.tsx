import { alphaTypes, categoryTypes } from '@/api/config'
import EnterLoading from '@/baseUI/enter-loading'
import Horizen from '@/baseUI/horizen-item'
import Loading from '@/baseUI/loading'
import Scroll from '@/baseUI/scroll'
import { useAppDispatch, useAppSelector } from '@/slice'
import React, { useEffect, useRef } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { Outlet, useNavigate } from 'react-router-dom'
import singersSlice, {
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './slice'
import { List, ListContainer, ListItem, NavContainer } from './style'

function Singers(props: any) {
  const scrollRef = useRef<any>(null)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const {
    singers: {
      alpha,
      category,
      singerList,
      enterLoading,
      pullUpLoading,
      pullDownLoading,
      // pageCount,
    },
    player: {
      playList: { length: songsCount },
    },
  } = useAppSelector((state: any) => state)

  const getHotSinger = () => {
    dispatch(getHotSingerList())
  }
  const updateCategory = (newVal: string) => {
    dispatch(singersSlice.actions.CHANGE_CATOGORY(newVal))
    dispatch(getSingerList())
  }
  const updateAlpha = (newVal: string) => {
    dispatch(singersSlice.actions.CHANGE_ALPHA(newVal))
    dispatch(getSingerList())
  }
  // 滑到最底部刷新部分的处理
  const pullUpRefresh = (hot: boolean, count: number) => {
    dispatch(singersSlice.actions.CHANGE_PULLUP_LOADING(true))
    if (hot) {
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreSingerList())
    }
  }
  // 顶部下拉刷新
  const pullDownRefresh = (category: string, alpha: string) => {
    dispatch(singersSlice.actions.CHANGE_PULLDOWN_LOADING(true))
    dispatch(singersSlice.actions.CHANGE_LIST_OFFSET(0))
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList())
    }
  }

  useEffect(() => {
    if (!singerList.length && !category && !alpha) {
      getHotSinger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enterDetail = (id: string) => {
    navigate(`/singers/${id}`)
  }

  const handlePullUp = () => {
    // pullUpRefresh(category, alpha, category === '', pageCount)
    pullUpRefresh(category, alpha)
  }

  const handlePullDown = () => {
    pullDownRefresh(category, alpha)
  }

  const handleUpdateCategory = (newVal: string) => {
    if (category === newVal) return
    updateCategory(newVal)
    scrollRef.current.refresh()
  }

  const handleUpdateAlpha = (newVal: string) => {
    if (alpha === newVal) return
    updateAlpha(newVal)
    scrollRef.current.refresh()
  }

  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item: any, index: number) => {
          return (
            <ListItem
              key={item.accountId + '' + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img-wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./singer.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  return (
    <div>
      {/* 对于better-scroll来讲，其作用的元素外面必须要有一个尺寸确定的容器包裹，因此设置xxxContainer */}
      <NavContainer>
        <Horizen
          title={'分类(默认热门):'}
          list={categoryTypes}
          handleClick={v => handleUpdateCategory(v)}
          oldVal={category}
        ></Horizen>
        <Horizen
          title={'首字母:'}
          list={alphaTypes}
          handleClick={v => handleUpdateAlpha(v)}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          ref={scrollRef}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      {/* 入场加载动画 */}
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      <Outlet />
    </div>
  )
}

// const mapStateToProps = (state: any) => ({
//   alpha: state.getIn(['singers', 'alpha']),
//   category: state.getIn(['singers', 'category']),
//   singerList: state.getIn(['singers', 'singerList']),
//   enterLoading: state.getIn(['singers', 'enterLoading']),
//   pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
//   pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
//   pageCount: state.getIn(['singers', 'pageCount']),
//   songsCount: state.getIn(['player', 'playList']).size,
// })

// const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
//   return {
//     getHotSinger() {
//       dispatch(actions.getHotSingerList())
//     },
//     updateCategory(newVal: string) {
//       dispatch(actions.changeCategory(newVal))
//       dispatch(actions.getSingerList())
//     },
//     updateAlpha(newVal: string) {
//       dispatch(actions.changeAlpha(newVal))
//       dispatch(actions.getSingerList())
//     },
//     // 滑到最底部刷新部分的处理
//     pullUpRefresh(hot: boolean, count: number) {
//       dispatch(actions.changePullUpLoading(true))
//       if (hot) {
//         dispatch(actions.refreshMoreHotSingerList())
//       } else {
//         dispatch(actions.refreshMoreSingerList())
//       }
//     },
//     //顶部下拉刷新
//     pullDownRefresh(category: string, alpha: string) {
//       dispatch(actions.changePullDownLoading(true))
//       dispatch(actions.changeListOffset(0))
//       if (category === '' && alpha === '') {
//         dispatch(actions.getHotSingerList())
//       } else {
//         dispatch(actions.getSingerList())
//       }
//     },
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
export default React.memo(Singers)
