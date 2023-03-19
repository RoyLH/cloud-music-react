import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { isEmptyObject } from '../../api/utils'
import style from '../../assets/global-style'
import MusicNote from '../../baseUI/music-note'
import Scroll from '../../baseUI/scroll'
import AlbumDetail from '../../components/album-detail'
import { HEADER_HEIGHT } from './../../api/config'
import Header from './../../baseUI/header'
import Loading from './../../baseUI/loading'
import { EnterLoading } from './../Singers/style'
import * as actions from './store/actions'
import { Container } from './style'

function Album(props: any) {
  const [showStatus, setShowStatus] = useState<boolean>(true)
  const [title, setTitle] = useState<string>('歌单')
  const [isMarquee, setIsMarquee] = useState<boolean>(true)

  const musicNoteRef = useRef<any>(null)
  const headerEl = useRef<HTMLDivElement | null>(null)

  const navigate = useNavigate()
  const { id } = useParams()

  const { currentAlbum, enterLoading, pullUpLoading, songsCount } = props
  const { getAlbumDataDispatch, changePullUpLoadingStateDispatch } = props

  const currentAlbumJS = currentAlbum.toJS()

  useEffect(() => {
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  const handleScroll = useCallback(
    (pos: any) => {
      const minScrollY = -HEADER_HEIGHT
      const percent = Math.abs(pos.y / minScrollY)
      const headerDom = headerEl.current!
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['theme-color']
        headerDom.style.opacity = String(Math.min(1, (percent - 1) / 2))
        setTitle(currentAlbumJS && currentAlbumJS.name)
        setIsMarquee(true)
      } else {
        headerDom.style.backgroundColor = ''
        headerDom.style.opacity = '1'
        setTitle('歌单')
        setIsMarquee(false)
      }
    },
    [currentAlbumJS]
  )

  const handlePullUp = () => {
    changePullUpLoadingStateDispatch(true)
    changePullUpLoadingStateDispatch(false)
  }

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const musicAnimation = (x: any, y: any) => {
    musicNoteRef.current!.startAnimation({ x, y })
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={songsCount}>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {!isEmptyObject(currentAlbumJS) ? (
          <Scroll
            onScroll={handleScroll}
            pullUp={handlePullUp}
            pullUpLoading={pullUpLoading}
            bounceTop={false}
          >
            <AlbumDetail
              currentAlbum={currentAlbumJS}
              pullUpLoading={pullUpLoading}
              musicAnimation={musicAnimation}
            ></AlbumDetail>
          </Scroll>
        ) : null}
        {enterLoading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state: any) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  pullUpLoading: state.getIn(['album', 'pullUpLoading']),
  enterLoading: state.getIn(['album', 'enterLoading']),
  startIndex: state.getIn(['album', 'startIndex']),
  totalCount: state.getIn(['album', 'totalCount']),
  songsCount: state.getIn(['player', 'playList']).size,
})

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
  return {
    getAlbumDataDispatch(id: string) {
      dispatch(actions.changeEnterLoading(true))
      dispatch(actions.getAlbumList(id))
    },
    changePullUpLoadingStateDispatch(state: any) {
      dispatch(actions.changePullUpLoading(state))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
