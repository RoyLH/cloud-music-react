import React from 'react'
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'
import { List, ListItem, ListWrapper } from './style'

function RecommendList(props: any) {
  const { recommendList } = props
  const navigate = useNavigate()

  const enterDetail = (id: string) => {
    navigate(`/recommend/${id}`)
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map((item: any, index: any) => {
          return (
            <ListItem
              key={item.id + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img-wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./music.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play-count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">
                    {Math.floor(item.playCount / 10000)}万
                  </span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)
