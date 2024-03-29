import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ConfirmWrapper } from './style'

const Confirm = forwardRef((props: any, ref) => {
  const [show, setShow] = useState(false)
  const { text, cancelBtnText, confirmBtnText } = props

  const { handleConfirm } = props

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true)
    },
  }))
  // style={{display: show ? "block": "none"}}
  return (
    <CSSTransition
      classNames="confirm-fade"
      timeout={300}
      appear={true}
      in={show}
    >
      <ConfirmWrapper
        style={{ display: show ? 'block' : 'none' }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          <div className="confirm-content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate-btn left" onClick={() => setShow(false)}>
                {cancelBtnText}
              </div>
              <div
                className="operate-btn"
                onClick={() => {
                  setShow(false)
                  handleConfirm()
                }}
              >
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </ConfirmWrapper>
    </CSSTransition>
  )
})

export default React.memo(Confirm)
