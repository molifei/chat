import {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import {authRouterList} from '@/router/routerList';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {deleteCurrent} from '@/utils/tools'
import store from '@/store';
import {cloneDeep} from 'lodash'

const {Sider} = Layout;
const {SubMenu} = Menu;

function LeftNav(props) {

  const location = useLocation()
  const {pathname} = location

  const navigate = useNavigate()

  // 可展开的keys
  let subMenuKeys = []
  // 选中项
  const [selectedKeys, setSelectedKeys] = useState([pathname])
  // 展开项
  const [openKeys, setOpenKeys] = useState([])

  useEffect(() => {
    let pathList = pathname.split('-')
    if (pathList.length > 1) {
      setSelectedKeys([pathList[0]])
      setOpenKeys([findKey(pathList[0])])
      console.log()
    }
    let pathOpenList = pathname.split('/')

    // 当长度大于3时，说明是2级菜单需要展开
    if (pathOpenList.length > 2) {
      // 开头和最后一个不需要
      let filterList = pathOpenList.slice(1, pathOpenList.length - 1)

      // 拼接出想要的数组
      setOpenKeys(filterList.reduce((prev, tar) => {
        prev.slice(-1) ? (prev.push(prev.slice(-1) + '/' + tar)) : (prev.push('/' + tar))
        return prev
      }, []))
    }
  }, [pathname])

  // 查找当前的key是否在展开数组中存在
  const findKey = (key) => {
    return subMenuKeys.find(k => key.indexOf(k) > -1)
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (subMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const jumpLink = ({item, key, keyPath, domEvent}) => {
    // 提取自定的路由信息
    let {props: {link}} = item
    // 判断是否和当前路径相同，不相同则跳转
    if (pathname === link.path) return
    setSelectedKeys(link.path)
    navigate(link.path)
  }

  const renderMenu = (data) => {
    // 深拷贝防止操作影响原数据
    let renderData = cloneDeep(data)

    // 根据权限列表删除不需要的路由
    deleteCurrent(renderData, store.getState().userData.roleList, 'name', 'children')

    // 添加展开列表
    if (subMenuKeys.length === 0) subMenuKeys = renderData.filter(i => i.children).map(i => i.path)
    return renderData.map(item => {
      if (item.children?.length > 0 && item.meta.isMenu) {
        return (<SubMenu key={item.path} title={item.meta.title}>
          {renderMenu(item.children)}
        </SubMenu>)
      } else if (!item.children && item.meta.isMenu) {
        return (<Menu.Item key={item.path} link={item}>{item.meta.title}</Menu.Item>)
      }
    })
  }

  return (<Sider trigger={null} collapsible collapsed={props.collapsed}>
    <div className="logo" style={{color: '#fff'}}>LOGO</div>
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={jumpLink}
    >
      {renderMenu(authRouterList)}
    </Menu>
  </Sider>)
}

export default LeftNav
