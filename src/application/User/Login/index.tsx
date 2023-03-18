import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import PhoneForm from './PhoneForm'
import * as actions from './store/actions'
import { Container, LoginContainer, LogoContainer, LogoImg } from './style'

import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

const Login = (props: any) => {
  const {
    LoginByVcodeDispatch,
    sentVcodeDispatch,
    sentStatus,
    loginStatus,
    changeSentStatusDispatch,
    history,
  } = props
  const [inPhone, setInPhone] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const checkBoxRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (loginStatus) {
      navigate('/recommend')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, history])

  const jumpToIndex = () => {
    navigate('/recommend')
  }

  const jumpToLogin = (method: string) => {
    if (!agreed) {
      // alert("请同意条款");
      checkBoxRef.current!.classList.add('shake-horizontal')
      setTimeout(() => {
        checkBoxRef.current!.classList.remove('shake-horizontal')
      }, 500)
      return
    }
    if (method === 'phone') {
      setInPhone(true)
    }
  }

  const onPhoneBack = () => {
    setInPhone(false)
  }

  return (
    <>
      <CSSTransition in={!inPhone} timeout={500} classNames="push-out">
        <Container>
          <LogoContainer>
            <div>
              <LogoImg />
            </div>
          </LogoContainer>
          <LoginForm
            jumpToLogin={jumpToLogin}
            jumpToIndex={jumpToIndex}
            setAgreed={setAgreed}
            ref={checkBoxRef}
          />
        </Container>
      </CSSTransition>
      <CSSTransition
        in={inPhone}
        timeout={500}
        classNames="push-in"
        unmountOnExit
        onExited={() => changeSentStatusDispatch()}
      >
        <LoginContainer>
          <PhoneForm
            // loginByPhone={LoginByPhoneDispatch}
            loginByVcode={LoginByVcodeDispatch}
            onClickBack={onPhoneBack}
            sentVcode={sentVcodeDispatch}
            sentStatus={sentStatus}
          />
        </LoginContainer>
      </CSSTransition>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.getIn(['user', 'userInfo']),
  sentStatus: state.getIn(['user', 'sentStatus']),
  loginStatus: state.getIn(['user', 'loginStatus']),
})

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
  return {
    LoginByPhoneDispatch(phone: string, password: string) {
      dispatch(actions.loginByPhone(phone, password))
    },
    LoginByVcodeDispatch(phone: string, vcode: string) {
      dispatch(actions.loginByVcode(phone, vcode))
    },
    sentVcodeDispatch(phone: string) {
      dispatch(actions.sentVcode(phone))
    },
    changeSentStatusDispatch() {
      dispatch(actions.saveSentStatus(false))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login))
