/*
 * @author WYK
 * 各模块的接口调用
 * Auth
 */

// URL列表
import base from '@/api/base';
// 封装过的axios实例
import ajax from '@/api/http.js';
// QS  序列化参数
import qs from 'qs';

const host = base.dev;

const auth = {

  // 登录
  getLogin(params) {
    return ajax.post(`${host}/login`, qs.stringify(params));
  },
  getTest(params) {
    return ajax.get(`${host}getList`, qs.stringify(params));
  },

};

export default auth;
