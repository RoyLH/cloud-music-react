import { prefixStyle } from '@/api/utils'
import React, { useEffect, useRef, useState } from 'react'
import { ProgressBarWrapper } from './style'

function ProgressBar(props: any) {
  const progressBar = useRef<HTMLDivElement | null>(null)
  const progress = useRef<HTMLDivElement | null>(null)
  const progressBtn = useRef<HTMLDivElement | null>(null)
  const [touch, setTouch] = useState<any>({})

  const { percent, percentChange } = props

  const transform = prefixStyle('transform') as any

  const progressBtnWidth = 16

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current!.clientWidth - progressBtnWidth
      const offsetWidth = percent * barWidth
      progress.current!.style.width = `${offsetWidth}px`
      progressBtn.current!.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0, 0)`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  const _offset = (offsetWidth: number) => {
    progress.current!.style.width = `${offsetWidth}px`
    progressBtn.current!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }

  const _changePercent = () => {
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth
    const curPercent = progress.current!.clientWidth / barWidth
    percentChange(curPercent)
  }

  const progressClick = (e: any) => {
    const rect = progressBar.current!.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    _offset(offsetWidth)
    _changePercent()
  }

  const progressTouchStart = (e: any) => {
    const startTouch = {} as any
    startTouch.initiated = true
    startTouch.startX = e.touches[0].pageX
    startTouch.left = progress.current!.clientWidth
    setTouch(startTouch)
  }

  const progressTouchMove = (e: any) => {
    if (!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    _offset(offsetWidth)
  }

  const progressTouchEnd = (e: any) => {
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default React.memo(ProgressBar)
