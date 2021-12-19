/*
 * @author WYK
 * 各模块的接口调用
 * Auth
 */

// URL列表
import base from '../../base';
// 封装过的axios实例
import ajax from '../../http.js';
// QS  序列化参数
import qs from 'qs';

const host = base.mock;

const auth = {

  // 登录
  getTest(params) {
    return ajax.get(`${host}/getList`, qs.stringify(params));
  },
  getLogin(params) {
    return ajax.post(`${host}/login`, qs.stringify(params));
  },
};

export default auth;
