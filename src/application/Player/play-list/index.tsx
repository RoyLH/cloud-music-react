import React, { useCallback, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { playMode } from '../../../api/config'
import { findIndex, getName, prefixStyle, shuffle } from '../../../api/utils'
import Confirm from '../../../baseUI/confirm'
import Scroll from '../../../baseUI/scroll'
import * as actions from '../store/actions'
import {
  ListContent,
  ListHeader,
  PlayListWrapper,
  ScrollWrapper,
} from './style'

function PlayList(props: any) {
  const [isShow, setIsShow] = useState(false)
  const [canTouch, setCanTouch] = useState(true)
  const [startY, setStartY] = useState(0)
  const [initialed, setInitialed] = useState<any>(0)
  const [distance, setDistance] = useState(0)

  const transform = prefixStyle('transform')

  const listContentRef = useRef<any>(null)
  const listWrapperRef = useRef<any>(null)
  const playListRef = useRef<any>(null)
  const confirmRef = useRef<any>(null)

  const {
    currentIndex,
    currentSong: immutableCurrentSong,
    showPlayList,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
  } = props

  const { clearPreSong } = props //清空PreSong

  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    deleteSongDispatch,
    clearDispatch,
  } = props

  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()

  const changeMode = (e: any) => {
    const newMode = (mode + 1) % 3
    if (newMode === 0) {
      changePlayListDispatch(sequencePlayList)
      const index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
    } else if (newMode === 1) {
      changePlayListDispatch(sequencePlayList)
    } else if (newMode === 2) {
      const newList = shuffle(sequencePlayList)
      const index = findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
    }
    changeModeDispatch(newMode)
  }

  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) return
    changeCurrentIndexDispatch(index)
  }

  const handleScroll = (pos: any) => {
    const state = pos.y === 0
    setCanTouch(state)
  }

  const handleTouchStart = (e: any) => {
    if (!canTouch || initialed) return
    listWrapperRef.current.style['transition'] = ''
    setDistance(0)
    setStartY(e.nativeEvent.touches[0].pageY)
    setInitialed(true)
  }

  const handleTouchMove = (e: any) => {
    if (!canTouch || !initialed) return
    const distance = e.nativeEvent.touches[0].pageY - startY
    if (distance < 0) return
    setDistance(distance)
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`
  }

  const handleTouchEnd = (e: any) => {
    setInitialed(false)
    if (distance >= 150) {
      togglePlayListDispatch(false)
    } else {
      listWrapperRef.current.style['transition'] = 'all 0.3s'
      listWrapperRef.current.style[transform] = `translate3d(0px, 0px, 0px)`
    }
  }

  const handleDeleteSong = (e: any, song: any) => {
    e.stopPropagation()
    deleteSongDispatch(song)
  }

  const handleShowClear = () => {
    confirmRef.current.show()
  }

  const handleConfirmClear = () => {
    clearDispatch()
    // 修复清空播放列表后点击同样的歌曲，播放器不出现的bug
    clearPreSong()
  }

  const getFavoriteIcon = () => {
    return <i className="iconfont">&#xe601;</i>
  }

  const getCurrentIcon = (item: any) => {
    const current = currentSong.id === item.id
    const className = current ? 'icon-play' : ''
    const content = current ? '&#xe6e3;' : ''
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    )
  }

  const getPlayMode = () => {
    let content, text
    if (mode === playMode.sequence) {
      content = '&#xe625;'
      text = '顺序播放'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
      text = '单曲循环'
    } else {
      content = '&#xe61b;'
      text = '随机播放'
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={e => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={e => changeMode(e)}>
          {text}
        </span>
      </div>
    )
  }

  const onEnterCB = useCallback(() => {
    setIsShow(true)
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`
  }, [transform])

  const onEnteringCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s'
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`
  }, [transform])

  const onExitCB = useCallback(() => {
    listWrapperRef.current.style[transform] = `translate3d(0, ${distance}px, 0)`
  }, [distance, transform])

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s'
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`
  }, [transform])

  const onExitedCB = useCallback(() => {
    setIsShow(false)
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`
  }, [transform])

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExit={onExitCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: 'block' } : { display: 'none' }}
        onClick={() => togglePlayListDispatch(false)}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={(pos: any) => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {playList.map((item: any, index: number) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">{getFavoriteIcon()}</span>
                      <span
                        className="delete"
                        onClick={e => handleDeleteSong(e, item)}
                      >
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  )
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={'是否删除全部?'}
          cancelBtnText={'取消'}
          confirmBtnText={'确定'}
          handleConfirm={handleConfirmClear}
        ></Confirm>
      </PlayListWrapper>
    </CSSTransition>
  )
}

const mapStateToProps = (state: any) => ({
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
})

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
  return {
    togglePlayListDispatch(data: any) {
      dispatch(actions.changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(data: any) {
      dispatch(actions.changeCurrentIndex(data))
    },
    changeModeDispatch(data: any) {
      dispatch(actions.changePlayMode(data))
    },
    changePlayListDispatch(data: any) {
      dispatch(actions.changePlayList(data))
    },
    deleteSongDispatch(data: any) {
      dispatch(actions.deleteSong(data))
    },
    clearDispatch() {
      dispatch(actions.changePlayList([]))
      dispatch(actions.changeSequencePlayList([]))
      dispatch(actions.changeCurrentIndex(-1))
      dispatch(actions.changeShowPlayList(false))
      dispatch(actions.changeCurrentSong({}))
      dispatch(actions.changePlayingState(false))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList))
