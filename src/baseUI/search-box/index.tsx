import { debounce } from '@/api/utils'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SearchBoxWrapper } from './style'

const SearchBox = (props: any) => {
  const queryRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState<string>('')

  const { newQuery } = props
  const { handleQuery } = props

  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500)
  }, [handleQuery])

  useEffect(() => {
    queryRef.current!.focus()
  }, [])

  useEffect(() => {
    handleQueryDebounce(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    let curQuery = query
    if (newQuery !== query) {
      curQuery = newQuery
      queryRef.current!.value = newQuery
    }
    setQuery(curQuery)
    // eslint-disable-next-line
  }, [newQuery]);

  const handleChange = (e: any) => {
    const val = e.currentTarget.value
    setQuery(val)
  }

  const clearQuery = () => {
    setQuery('')
    queryRef.current!.value = ''
    queryRef.current!.focus()
  }

  const displayStyle = query ? { display: 'block' } : { display: 'none' }

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        onChange={handleChange}
      />
      <i
        className="iconfont icon-delete"
        onClick={clearQuery}
        style={displayStyle}
      >
        &#xe600;
      </i>
    </SearchBoxWrapper>
  )
}

export default React.memo(SearchBox)
