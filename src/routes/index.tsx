import HomeLayout from '@/layouts/HomeLayout'
import React, {
  FunctionComponent,
  lazy,
  LazyExoticComponent,
  ReactNode,
  Suspense,
} from 'react'
import { Navigate, useRoutes, type RouteObject } from 'react-router'

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

let Recommend, Album, Singers, Singer, Rank, Search

if (rtk) {
  Recommend = lazy(() => import('../application/Recommend/index-rtk'))
  Album = lazy(() => import('../application/Album/index-rtk'))
  Singers = lazy(() => import('../application/Singers/index-rtk'))
  Singer = lazy(() => import('../application/Singer/index-rtk'))
  Rank = lazy(() => import('../application/Rank/index-rtk'))
  Search = lazy(() => import('../application/Search/index-rtk'))
} else {
  Recommend = lazy(() => import('../application/Recommend'))
  Album = lazy(() => import('../application/Album'))
  Singers = lazy(() => import('../application/Singers'))
  Singer = lazy(() => import('../application/Singer'))
  Rank = lazy(() => import('../application/Rank'))
  Search = lazy(() => import('../application/Search'))
}

const routes: RouteObject[] = [
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
            element: <LazyImportComponent lazy={Recommend} />,
          },
          {
            path: ':id',
            element: <LazyImportComponent lazy={Album} />,
          },
        ],
      },
      {
        path: 'singers',
        children: [
          {
            index: true,
            element: <LazyImportComponent lazy={Singers} />,
          },
          {
            path: ':id',
            element: <LazyImportComponent lazy={Singer} />,
          },
        ],
      },
      {
        path: 'rank',
        children: [
          {
            index: true,
            element: <LazyImportComponent lazy={Rank} />,
          },
          {
            path: ':id',
            element: <LazyImportComponent lazy={Album} />,
          },
        ],
      },
      {
        path: '/album/:id',
        element: <LazyImportComponent lazy={Album} />,
      },
      {
        path: 'search',
        element: <LazyImportComponent lazy={Search} />,
      },
    ],
  },
]

const RouteElement = () => {
  return useRoutes(routes)
}

export default RouteElement
