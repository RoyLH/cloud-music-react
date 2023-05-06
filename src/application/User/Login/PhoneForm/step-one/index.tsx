import React, { useEffect, useRef } from 'react'
import { trimPhone } from '@/api/utils'

const StepOne = (props: any) => {
  const { onChangePhone, onClickNext, phone } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    inputRef.current!.focus()
  })
  return (
    <>
      <p className="input">
        +86
        <input
          type="text"
          onChange={onChangePhone}
          value={phone}
          ref={inputRef}
        />
      </p>
      <hr />
      <span
        className={`LoginBtn 
          ${trimPhone(phone).length < 11 && 'disabled'}`}
        onClick={onClickNext}
      >
        下一步
      </span>
    </>
  )
}

export default StepOne
