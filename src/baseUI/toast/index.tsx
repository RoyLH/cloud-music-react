import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ToastWrapper } from './style'

const Toast = forwardRef((props: any, ref) => {
  const [show, setShow] = useState<boolean>(false)
  const [timer, setTimer] = useState<any>('')
  const { text } = props

  useImperativeHandle(ref, () => ({
    show() {
      if (timer) clearTimeout(timer)
      setShow(true)
      setTimer(
        setTimeout(() => {
          setShow(false)
        }, 3000)
      )
    },
  }))
  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
})

export default React.memo(Toast)
