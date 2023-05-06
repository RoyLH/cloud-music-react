import React from 'react'
import { EnterLoadingWrapper } from './style'

const EnterLoading = (props: any) => {
  return <EnterLoadingWrapper>{props.children}</EnterLoadingWrapper>
}

export default React.memo(EnterLoading)
