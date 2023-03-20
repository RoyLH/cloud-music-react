import React, {
  FunctionComponent,
  lazy,
  LazyExoticComponent,
  ReactNode,
  Suspense,
} from 'react'
import { Navigate, useRoutes, type RouteObject } from 'react-router'
import BlankLayout from '../layouts/BlankLayout'
import HomeLayout from '../layouts/HomeLayout'

const LazyImportComponent = (props: {
  fallback?: ReactNode
  lazy: LazyExoticComponent<FunctionComponent>
}) => {
  return (
    <Suspense fallback={props.fallback}>
      <props.lazy />
    </Suspense>
  )
}

const { rtk } = process.env

let RecommendComponent,
  AlbumComponent,
  SingersComponent,
  SingerComponent,
  RankComponent,
  SearchComponent

if (rtk) {
  RecommendComponent = lazy(() => import('../application/Recommend/index-rtk'))
  AlbumComponent = lazy(() => import('../application/Album/index-rtk'))
  SingersComponent = lazy(() => import('../application/Singers/index-rtk'))
  SingerComponent = lazy(() => import('../application/Singer/index-rtk'))
  RankComponent = lazy(() => import('../application/Rank/index-rtk'))
  SearchComponent = lazy(() => import('../application/Search/index-rtk'))
} else {
  RecommendComponent = lazy(() => import('../application/Recommend'))
  AlbumComponent = lazy(() => import('../application/Album'))
  SingersComponent = lazy(() => import('../application/Singers'))
  SingerComponent = lazy(() => import('../application/Singer'))
  RankComponent = lazy(() => import('../application/Rank'))
  SearchComponent = lazy(() => import('../application/Search'))
}

const routes: RouteObject[] = [
  {
    element: <BlankLayout />,
    children: [
      {
        path: '/',
        element: <HomeLayout rtk={rtk} />,
        children: [
          {
            index: true,
            element: <Navigate to="/recommend" />,
          },
          {
            path: 'recommend',
            children: [
              {
                index: true,
                element: <LazyImportComponent lazy={RecommendComponent} />,
              },
              {
                path: ':id',
                element: <LazyImportComponent lazy={AlbumComponent} />,
              },
            ],
          },
          {
            path: 'singers',
            children: [
              {
                index: true,
                element: <LazyImportComponent lazy={SingersComponent} />,
              },
              {
                path: ':id',
                element: <LazyImportComponent lazy={SingerComponent} />,
              },
            ],
          },
          {
            path: 'rank',
            children: [
              {
                index: true,
                element: <LazyImportComponent lazy={RankComponent} />,
              },
              {
                path: ':id',
                element: <LazyImportComponent lazy={AlbumComponent} />,
              },
            ],
          },
          {
            path: 'rank',
            element: <LazyImportComponent lazy={AlbumComponent} />,
          },
          {
            path: 'search',
            element: <LazyImportComponent lazy={SearchComponent} />,
          },
        ],
      },
    ],
  },
]

const RouteElement = () => {
  return useRoutes(routes)
}

export default RouteElement
