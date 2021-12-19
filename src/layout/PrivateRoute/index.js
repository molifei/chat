import {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useLocation, useRoutes} from 'react-router-dom';
import store from '@/store';
import {routerList, authRouterList} from '@/router/routerList';
import {deleteCurrent} from '@/utils/tools';
import {cloneDeep} from 'lodash'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './index.less'


function PrivateRoute() {

  const location = useLocation()
  const {pathname} = location

  useEffect(() => {
    Nprogress.done()
    return () => {
      Nprogress.start()
    }
  })

  // 弃用
  // const renderRoute = (data) => {
  //   return data.reduce((prev, tar) => {
  //     if (tar.children?.length > 0) {
  //       prev.push(
  //         <Route exact={tar.isExact} key={tar.id} path={tar.path} element={tar.element}>
  //           {renderRoute(tar.children)}
  //         </Route>
  //       )
  //     } else {
  //       prev.push(<Route exact={tar.isExact} key={tar.id} path={tar.path} element={tar.element}/>)
  //     }
  //     return prev
  //   }, [])
  // }

  const renderOption = () => {

    const isLogin = Boolean(store.getState().userData.token)

    // 未登录并且访问的不是登录页时，跳转登录
    if (!isLogin && pathname !== '/login') {
      return <Navigate to="/login" replace />
    } else if (isLogin && pathname === '/login') {
      // 登录之后访问登录页，跳转首页
      return <Navigate to="/" replace />
    } else {
      let menuList = cloneDeep(authRouterList)
      let finallyList = cloneDeep(routerList)

      deleteCurrent(menuList, store.getState().userData.roleList, 'name', 'children')

      finallyList[0].children = menuList

      return <AppRouter finallyList={finallyList} />
    }
  };

  return (
    renderOption()
  );
}

function AppRouter(props) {
  return useRoutes(props.finallyList)
};

export default PrivateRoute
