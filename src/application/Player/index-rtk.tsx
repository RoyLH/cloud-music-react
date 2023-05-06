import { playMode } from '@/api/config'
import Lyric from '@/api/lyric-parser'
import { getLyricRequest } from '@/api/request'
import { findIndex, getSongUrl, isEmptyObject, shuffle } from '@/api/utils'
import Toast from '@/baseUI/toast'
import { useAppDispatch, useAppSelector } from '@/slice'
import React, { useEffect, useRef, useState } from 'react'
import MiniPlayer from './mini-player'
import NormalPlayer from './normal-player'
import PlayList from './play-list/index-rtk'
import playerSlice from './slice'

function Player(props: any) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentPlayingLyric, setPlayingLyric] = useState('')
  const [modeText, setModeText] = useState('')

  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const dispatch = useAppDispatch()
  const {
    player: {
      fullScreen,
      playing,
      currentSong,
      // showPlayList,
      mode,
      speed,
      currentIndex,
      playList,
      sequencePlayList,
    },
  } = useAppSelector((state: any) => state)

  const togglePlayingDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_PLAYING_STATE(data))
  }
  const toggleFullScreenDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_FULL_SCREEN(data))
  }
  const togglePlayListDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_SHOW_PLAYLIST(data))
  }
  const changeCurrentIndexDispatch = (index: number) => {
    dispatch(playerSlice.actions.SET_CURRENT_INDEX(index))
  }
  const changeCurrentDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_CURRENT_SONG(data))
  }
  const changeModeDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_PLAY_MODE(data))
  }
  const changePlayListDispatch = (data: any) => {
    dispatch(playerSlice.actions.SET_PLAYLIST(data))
  }
  const changeSpeedDispatch = (data: any) => {
    dispatch(playerSlice.actions.CHANGE_SPEED(data))
  }

  const [preSong, setPreSong] = useState<any>({})

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const toastRef = useRef<any>()

  const currentLyric = useRef<any>()
  const currentLineNum = useRef(0)
  const songReady = useRef(true)

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    ) {
      return
    }

    songReady.current = false

    const current = playList[currentIndex]
    changeCurrentDispatch(current)
    setPreSong(current)
    setPlayingLyric('')
    audioRef.current!.src = getSongUrl(current.id)
    audioRef.current!.autoplay = true
    audioRef.current!.playbackRate = speed
    togglePlayingDispatch(true)
    getLyric(current.id)
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
    // eslint-disable-next-line
  }, [currentIndex, playList]);

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause()
  }, [playing])

  useEffect(() => {
    if (!fullScreen) return
    if (currentLyric.current && currentLyric.current.lines.length) {
      handleLyric({
        lineNum: currentLineNum.current,
        txt: currentLyric.current.lines[currentLineNum.current].txt,
      })
    }
  }, [fullScreen])

  const handleLyric = ({ lineNum, txt }: any) => {
    if (!currentLyric.current) return
    currentLineNum.current = lineNum
    setPlayingLyric(txt)
  }

  const getLyric = (id: string) => {
    let lyric = ''
    if (currentLyric.current) {
      currentLyric.current.stop()
    }
    // 避免songReady恒为false的情况
    setTimeout(() => {
      songReady.current = true
    }, 3000)

    getLyricRequest(id)
      .then((data: any) => {
        lyric = data.lrc && data.lrc.lyric
        if (!lyric) {
          currentLyric.current = null
          return
        }
        currentLyric.current = new Lyric(lyric, handleLyric, speed)
        currentLyric.current.play()
        currentLineNum.current = 0
        currentLyric.current.seek(0)
      })
      .catch(() => {
        currentLyric.current = ''
        songReady.current = true
        audioRef.current!.play()
      })
  }

  const clickPlaying = (e: any, state: any) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000)
    }
  }

  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current!.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000)
    }
  }

  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime)
  }

  const handleLoop = () => {
    audioRef.current!.currentTime = 0
    togglePlayingDispatch(true)
    audioRef.current!.play()
    if (currentLyric.current) {
      currentLyric.current.seek(0)
    }
  }

  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index === 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }

  const changeMode = () => {
    const newMode = (mode + 1) % 3
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList)
      const index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
      setModeText('顺序循环')
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList)
      setModeText('单曲循环')
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(sequencePlayList)
      const index = findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
      setModeText('随机播放')
    }
    changeModeDispatch(newMode)
    toastRef.current.show()
  }

  const handleError = () => {
    songReady.current = true
    handleNext()
    alert('播放出错')
  }

  const clickSpeed = (newSpeed: number) => {
    changeSpeedDispatch(newSpeed)
    audioRef.current!.playbackRate = newSpeed
    currentLyric.current.changeSpeed(newSpeed)
    currentLyric.current.seek(currentTime * 1000)
  }

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          full={fullScreen}
          playing={playing}
          mode={mode}
          percent={percent}
          modeText={modeText}
          duration={duration}
          currentTime={currentTime}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          speed={speed}
          changeMode={changeMode}
          handlePrev={handlePrev}
          handleNext={handleNext}
          onProgressChange={onProgressChange}
          currentLineNum={currentLineNum.current}
          clickPlaying={clickPlaying}
          toggleFullScreenDispatch={toggleFullScreenDispatch}
          togglePlayListDispatch={togglePlayListDispatch}
          clickSpeed={clickSpeed}
        ></NormalPlayer>
      )}
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          playing={playing}
          full={fullScreen}
          song={currentSong}
          percent={percent}
          clickPlaying={clickPlaying}
          setFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
        ></MiniPlayer>
      )}

      <PlayList clearPreSong={setPreSong.bind(null, {})}></PlayList>
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  )
}

export default React.memo(Player)
