import React, { useEffect } from 'react'
import { forceCheck } from 'react-lazyload'
import { Outlet } from 'react-router-dom'
import Loading from '../../baseUI/loading-v2'
import Scroll from '../../baseUI/scroll'
import RecommendList from '../../components/list'
import Slider from '../../components/slider'
import { useAppDispatch, useAppSelector } from '../../slice'
import { EnterLoading } from '../Singers/style'
import { getBannerList, getRecommendList } from './slice'
import { Content } from './style'

function Recommend(props: any) {
  const dispatch = useAppDispatch()

  const {
    recommend: { bannerList, recommendList, enterLoading },
    player: {
      playList: { length: songsCount },
    },
  } = useAppSelector((state: any) => state)

  const getBannerDataDispatch = () => {
    dispatch(getBannerList())
  }
  const getRecommendListDataDispatch = () => {
    dispatch(getRecommendList())
  }

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      <Outlet />
    </Content>
  )
}

export default React.memo(Recommend)
