import Player from '@/application/Player'
import PlayerRTK from '@/application/Player/index-rtk'
import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { Tab, TabItem, Top } from './HomeLayout.style'

const HomeLayout = (props: any) => {
  const { rtk } = props
  const navigate = useNavigate()
  const alertTip = () => alert('用户中心正在开发中，敬请期待:)')

  return (
    <div>
      <Top>
        <span className="iconfont menu" onClick={alertTip}>
          &#xe65c;
        </span>
        <span className="title">云音悦</span>
        <span className="iconfont search" onClick={() => navigate('/search')}>
          &#xe62b;
        </span>
      </Top>
      <Tab>
        <NavLink
          to="/recommend"
          className={({ isActive }) => (isActive ? 'selected' : undefined)}
        >
          <TabItem>
            <span> 推荐 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/singers"
          className={({ isActive }) => (isActive ? 'selected' : undefined)}
        >
          <TabItem>
            <span> 歌手 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/rank"
          className={({ isActive }) => (isActive ? 'selected' : undefined)}
        >
          <TabItem>
            <span> 排行榜 </span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      {rtk ? <PlayerRTK /> : <Player />}
    </div>
  )
}

export default React.memo(HomeLayout)
