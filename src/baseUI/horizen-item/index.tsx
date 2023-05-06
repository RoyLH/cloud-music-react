import Scroll from '@/baseUI/scroll/index'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef, useState } from 'react'
import { List, ListItem } from './style'

function Horizen(props: any) {
  const [refreshCategoryScroll, setRefreshCategoryScroll] =
    useState<boolean>(false)
  const Category = useRef<HTMLDivElement | null>(null)

  const { list, oldVal, title } = props
  const { handleClick } = props

  useEffect(() => {
    const categoryDOM = Category.current!
    const tagElems = categoryDOM.querySelectorAll('span')

    let totalWidth = 0
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth
    })
    // 选中项的 border-left + border-right
    totalWidth += 2
    categoryDOM.style.width = `${totalWidth}px`
    setRefreshCategoryScroll(true)
  }, [refreshCategoryScroll])

  const clickHandle = (item: any) => {
    handleClick(item.key)
  }
  return (
    // JSX 在Scroll下面，对第一个 div 赋予 ref
    <Scroll direction={'horizontal'} refresh={true}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {list.map((item: any) => {
            return (
              <ListItem
                key={item.key}
                className={oldVal === item.key ? 'selected' : ''}
                onClick={() => clickHandle(item)}
              >
                {item.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </Scroll>
  )
}

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,
}

export default memo(Horizen)
