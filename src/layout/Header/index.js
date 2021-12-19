import {useState} from 'react';
import {Layout, Menu, Dropdown, Modal, Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined} from '@ant-design/icons';
import './index.less'
import store from '@/store'
import {getLogout} from '@/store/actionCreators/auth'
import {useNavigate} from 'react-router-dom';

const {Header} = Layout;

function MainHeader(props) {

  const navigate = useNavigate()

  const [isModalVisible, setIsModalVisible] = useState(false);

  const menu = (
    <Menu onClick={() => logout()}>
      <Menu.Item key="logout" danger>Logout</Menu.Item>
    </Menu>
  );

  const logout = () => {
    setIsModalVisible(true)
  }

  const logoutConfirm = async() => {
    const res = await store.dispatch(getLogout())
    if (res) navigate('/login')
  }

  const logoutCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Header className="site-layout-background main-header" style={{padding: 0}}>
      {
        props.collapsed ? <MenuUnfoldOutlined className="collapsed" onClick={props.toggle}/> :
          <MenuFoldOutlined className="collapsed" onClick={props.toggle}/>
      }
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {store.getState().userData.user}
          <DownOutlined/>
        </a>
      </Dropdown>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={logoutConfirm} onCancel={logoutCancel}>
        是否退出登录
      </Modal>

    </Header>
  )
}

export default MainHeader
