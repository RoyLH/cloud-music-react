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

const RecommendComponent = lazy(() => import('../application/Recommend'))
const AlbumComponent = lazy(() => import('../application/Album'))
const SingersComponent = lazy(() => import('../application/Singers'))
const SingerComponent = lazy(() => import('../application/Singer'))
const RankComponent = lazy(() => import('../application/Rank'))
const SearchComponent = lazy(() => import('../application/Search'))

const routes: RouteObject[] = [
  {
    element: <BlankLayout />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
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
