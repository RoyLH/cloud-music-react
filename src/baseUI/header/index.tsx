import PropTypes from 'prop-types'
import React from 'react'
import { HeaderContainer } from './style'

// 处理函数组件拿不到ref的问题,所以用forwardRef
const Header = React.forwardRef((props: any, ref: any) => {
  // const { handleClick, title, isMarquee } = props
  const { handleClick, title } = props

  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {/* {isMarquee ? (
        // eslint-disable-next-line jsx-a11y/no-distracting-elements
        <marquee>
          <h1>{title}</h1>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )} */}
      <h1>{title}</h1>
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: '标题',
  isMarquee: false,
}

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
}

export default React.memo(Header)
