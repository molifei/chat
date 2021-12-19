import React, {lazy, Suspense} from 'react'
import Home from '@v/Home'
import Login from '@v/Login';
import Video from '@v/Video';
import Short from '@v/Video/short';
import Movie from '@v/Video/movie';
import Work from '@v/Work';
import WorkDetail from '@v/Work/detail';
import NotFound from '@v/NotFound';

// const Short = lazy(() => import('@v/Video/short'));
// const Movie = lazy(() => import('@v/Video/movie'));
// const Work = lazy(() => import('../views/Work'));
// const NotFound = lazy(() => import('@v/NotFound'));

// // 使用@loadable/component 懒加载路由
// import Loadable from './loadableComponent'
//
// const Home = Loadable(() => import ('../views/Home'))
// const Login = Loadable(() => import ('../views/Login'))
// const Video = Loadable(() => import ('../views/Video'))
// const Short = Loadable(() => import ('../views/Video/short'))
// const Movie = Loadable(() => import ('../views/Video/movie'))
// const Work = Loadable(() => import ('../views/Work'))
// const NotFound = Loadable(() => import ('../views/NotFound'))

const SuspenseComponent = Component => props => {
  console.log(Component, props)
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

const authRouterList = [
  {
    id: 1,
    path: '/video',
    name: 'VIDEO',
    meta: {
      isLogin: true,
      isExact: false,
      isIndex: true, // 是否不渲染组件
      isMenu: true,
      title: '视频教程'
    },
    children: [
      {
        id: 11,
        path: '/video/short',
        name: 'SHORT',
        meta: {
          isLogin: true,
          isExact: false,
          isMenu: true,
          title: '短视频'
        },
        // element: SuspenseComponent(Short),
        element: <Short/>
      },
      {
        id: 12,
        path: '/video/movie',
        name: 'MOVIE',
        meta: {
          isLogin: true,
          isExact: false,
          isMenu: true,
          title: '电影'
        },
        // element: SuspenseComponent(Movie),
        element: <Movie/>,
      },
    ]
  },
  {
    id: 2,
    path: '/work',
    name: 'WORK',
    meta: {
      isLogin: true,
      isExact: false,
      isMenu: true,
      title: '职场技能'
    },
    // element: SuspenseComponent(Work),
    element: <Work/>,
  },
  {
    id: 3,
    path: '/work-detail/:id',
    name: 'WORKDETAIL',
    meta: {
      isLogin: true,
      isExact: false,
      isMenu: false,
      title: '职场技能详情'
    },
    // element: SuspenseComponent(Work),
    element: <WorkDetail/>,
  },
]

const routerList = [
  {
    id: 99,
    path: '/',
    name: 'Home',
    meta: {
      isLogin: true,
      isExact: true,
      title: '首页'
    },
    element: <Home/>,
  },
  {
    id: 0,
    path: '/login',
    name: 'Login',
    meta: {
      isLogin: false,
      isExact: false,
      isAlways: true,
      title: '登录'
    },
    element: <Login/>,
  },
  {
    id: 999,
    path: '*',
    name: 'NotFound',
    meta: {
      isLogin: false,
      isExact: false,
      title: '404'
    },
    // element: SuspenseComponent(NotFound),
    element: <NotFound/>,
  }
]

export {routerList, authRouterList}
