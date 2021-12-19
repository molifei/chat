import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css';
import './assets/css/base.less'
import App from './views/App';
import {Provider} from 'react-redux'
import store from './store';
import {BrowserRouter} from 'react-router-dom';

const StoreApp = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  StoreApp,
  document.getElementById('root')
);
