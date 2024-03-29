import EnterLoading from '@/baseUI/enter-loading'
import Loading from '@/baseUI/loading-v2'
import Scroll from '@/baseUI/scroll'
import RecommendList from '@/components/list'
import Slider from '@/components/slider'
import { useAppDispatch, useAppSelector } from '@/slice'
import React, { useEffect } from 'react'
import { forceCheck } from 'react-lazyload'
import { Outlet } from 'react-router-dom'
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
    if (!bannerList.length) {
      getBannerDataDispatch()
    }
    if (!recommendList.length) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content play={songsCount}>
      <Scroll onScroll={forceCheck}>
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
