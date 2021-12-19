import {useState, useEffect} from 'react'
import {Layout, Menu} from 'antd';
import './index.less'
import LeftNav from '@/layout/LeftNav'
import MainHeader from '@/layout/Header'
import {Outlet, useNavigate, Navigate} from 'react-router-dom';
import store from '@/store'

const {Content} = Layout;

export default function Home() {

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout className='main-wrap'>
      <LeftNav collapsed={collapsed}/>
      <Layout className="site-layout">
        <MainHeader collapsed={collapsed} toggle={toggle}/>
        <Content className="site-layout-background" style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
          <h3>父组件</h3>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
  // else
  //   return (
  //     <Navigate to='/login' />
  //   )
}
