/*
 * @author WYK
 * @date 2020-05-07 15:47:03
 * axios封装文件
 *
 */

// 引入axios文件
import axios from 'axios';
import store from '@/store';
import {getLogout} from '@/store/actionCreators/auth'
import {message} from 'antd'

// 跳转登录页面  携带当前跳转页面的路由，以便登录完成之后返回原页面
const toLogin = async() => {
  // eslint-disable-next-line no-restricted-globals
  let {pathname} = location

  if (pathname === '/login') {
    return false;
  }
  await message.warn({
    content: '安全凭证过期，请重新登录',
    duration: 1.5
  });
  store.dispatch(getLogout())
  message.error('去登录')
};

// 请求失败之后的统一处理
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
  case 401: // token失效
    setTimeout(function() {
      // toLogin();
    }, 1000);
    break;
  case 404:
    message.error('未找到资源');
    break;
  case 500:
    message.error('服务器错误');
    break;
  default:
    break
  }
};

// 创建一个axios实例
const ajax = axios.create({
  timeout: 1000 * 10,
  // withCredentials: true
  // timeout: 1
});

// 设置post请求头
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// ajax.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
ajax.interceptors.request.use(
  (config) => {
    // do sth
    // 每次请求的请求头携带token，先从session中  或者  vuex中获取token
    const token = '';
    // console.log(token,"http文件")
    // User-Token 为在头中需要添加的字段
    token && (config.headers['User-Token'] = token);
    return config;
  },
  (error) => {
    // do sth
    console.log(error);

    return Promise.reject(error);
  }
);

// 响应拦截器
ajax.interceptors.response.use(
  // 请求成功时
  (response) => {
    // 响应
    // 状态码为200
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 请求失败的时候
  (error) => {
    // do sth
    // 超时处理
    let err = error.toString();
    if (err.indexOf('timeout') !== -1) {
      message.error('请求超时，请刷新重试')
    } else if (err.indexOf('Network Error') !== -1) {
      message.error('请求失败，请刷新重试')
    }

    // 从错误中提取response
    const {response} = error;

    if (response) {
      // 当请求发出，但是状态码不是 2XX
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 断网
      if (!window.navigator.onLine) {
        message.error('断网了哦');
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error.response);
  }
);

export default ajax;
