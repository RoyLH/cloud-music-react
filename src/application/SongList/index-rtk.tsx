import { ONE_PAGE_COUNT } from '@/api/config'
import { getName } from '@/api/utils'
import playerSlice from '@/application/Player/slice'
import { useAppDispatch } from '@/slice'
import React, { useEffect, useState } from 'react'
import { SongItem, SongList } from './style'

const SongsList = React.forwardRef((props: any, refs: any) => {
  const [startIndex, setStartIndex] = useState(0)

  const {
    songs,
    collectCount,
    showCollect,
    loading = false,
    usePageSplit,
  } = props
  const totalCount = songs.length

  const { musicAnimation } = props

  const dispatch = useAppDispatch()

  const changePlayListDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_PLAYLIST(data))
  }
  const changeCurrentIndexDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_CURRENT_INDEX(data))
  }
  const changeSequencePlayListDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_SEQUENCE_PLAYLIST(data))
  }

  useEffect(() => {
    if (!loading) return
    if (startIndex + 1 + ONE_PAGE_COUNT >= totalCount) return
    setStartIndex(startIndex + ONE_PAGE_COUNT)
  }, [loading, startIndex, totalCount])

  const selectItem = (e: any, index: number) => {
    changePlayListDispatch(songs)
    changeSequencePlayListDispatch(songs)
    changeCurrentIndexDispatch(index)
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY)
  }

  const songList = (list: any[]) => {
    const res = []
    // 判断页数是否超过总数
    const end = usePageSplit ? startIndex + ONE_PAGE_COUNT : list.length
    for (let i = 0; i < end; i++) {
      if (i >= list.length) break
      const item = list[i]
      res.push(
        <li key={item.id} onClick={e => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{' '}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res
  }

  const collect = (count: number) => {
    return (
      <div className="add-list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
      // <div className="collected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    )
  }
  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className="first-line">
        <div className="play-all" onClick={e => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  )
})

export default React.memo(SongsList)
