import './index.less';
import {authRouterList} from '@/router/routerList';
import PrivateRoute from '@/layout/PrivateRoute';
import {deleteCurrent} from '@/utils/tools';
import store from '@/store';
import {cloneDeep} from 'lodash'

function App() {
  let list = cloneDeep(authRouterList)

  let {userData: {roleList}} = store.getState()

  deleteCurrent(list, roleList || [], 'name', 'children')

  return (
    <PrivateRoute />
  );
}

export default App;
