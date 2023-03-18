import React, { useEffect } from 'react'
import { forceCheck } from 'react-lazyload'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loading from '../../baseUI/loading-v2'
import Scroll from '../../baseUI/scroll'
import RecommendList from '../../components/list'
import Slider from '../../components/slider'
import { EnterLoading } from '../Singers/style'
import * as actions from './store/actions'
import { Content } from './style'

function Recommend(props: any) {
  const { bannerList, recommendList, songsCount, enterLoading } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
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

const mapStateToProps = (state: any) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  songsCount: state.getIn(['player', 'playList']).size,
  enterLoading: state.getIn(['recommend', 'enterLoading']),
})

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => {
  return {
    getBannerDataDispatch() {
      dispatch(actions.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actions.getRecommendList())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))
