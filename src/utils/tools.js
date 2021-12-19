/* eslint-disable */
// 工具函数

// 测试
const test = function() {
  // console.log("utils is ok")
};

// 判断类型
/*
 * @author WYK
 * @date 2020.04.20
 * @param {Any} data    想判断类型的数据
 * @return {String}     返回数据类型
 */
const getType = function(data) {
  // data = "你好 小明"
  // let reg = / ^\s]$/gi;
  // console.log(data.match(reg));
  return Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
  // return Object.prototype.toString.call(data).slice(8, -1)
};

// 防抖
/*
 * @author WYK
 * @date 2020.04.20
 * @param {Function} func    需要执行的函数
 * @param {Number} wait     等待的时间
 * @param {Boolean} immediate   是否立即执行函数
 * @return {Function}     返回执行函数
 */
const debounce = function(func, wait, immediate) {
  if (!typeof func === 'function' && !typeof wait === 'number' && !typeof immediate === 'boolean') throw new Error('error:Wrong arguments type');

  let timeout, result;

  let debounced = function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

// 节流：持续触发事件，每隔一段时间，只触发一次事件
/*
 * @author WYK
 * @date 2020.04.20
 * @param {Function} func    需要执行的函数
 * @param {Number} wait     等待的时间
 * @param {Object} options
 *         leading: false 表示禁用第一次执行
 *         railing: false 表示禁用停止触发的回调
 * @return {Function}     返回执行函数
 */
const throttle = function(func, wait, options) {
  console.log(func);

  if (!typeof func === 'function' && !typeof wait === 'number' && !(typeof options) === Object) throw new Error('error:Wrong arguments type');

  let timeout, context, args;
  let previous = 0;
  if (!options) options = {};

  let later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function() {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
};
/* 用法示例 */
// container.onmousemove = throttle(getUserAction, 1000);
// container.onmousemove = throttle(getUserAction, 1000, {
//     leading: false
// });
// container.onmousemove = throttle(getUserAction, 1000, {
//     trailing: false
// });

// 数组去重
/*
 * @author WYK
 * @date 2020.04.20
 * @param {Array}   arr     需要去重的数组
 * @return {Array}          已经去重的数组
 */
const removeRepeat = function(arr) {
  if (!Array.isArray(arr)) throw new Error('type error:argument must be a Array');

  // console.log(arr);
  let target = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    target.indexOf(arr[i]) === -1 ? target.push(arr[i]) : '';
  }
  return target;
};

// 对象数组去重，键值完全相同
/*
 * @author WYK
 * @date 2020-08-17 14:14:21
 * @param {Array} arr   需要去重的对象数组
 * @return {Array}      已经去重的对象数组
 */
const uniq = (arr) => {
  let len = arr.length;
  let tempJson = {};
  let res = [];
  for (let i = 0; i < len; i++) {        //取出每一个对象
    tempJson[JSON.stringify(arr[i])] = true;
  }
  let keyItems = Object.keys(tempJson);
  for (let j = 0; j < keyItems.length; j++) {
    res.push(JSON.parse(keyItems[j]));
  }
  return res;
};

//

// 获取地址栏参数,转化为对象
/*
 * @author WYK
 * @date 2020.04.20
 * @param {String}  url     需解析的url地址，如不传，默认解析当前地址
 * @return {Object}         返回解析出的对象
 */
const getURL = function(url) {
  if (arguments.length === 0) {
    url = window.location.href;
  }

  // 判断有无参数 无参数，提示报错
  if (url.indexOf('?') === -1) {
    message.error('getUrl：没有参数可以解析');
    return;
  }

  let parse = url.split('?')[1].split('&');

  // let target = {};
  // for (let i = 0; i < parse.length; i++) {
  //     let v = parse[i].split("=");
  //     target[v[0]] = v[1]
  // }

  return parse.reduce((prev, item,) => {
    let sli = item.split('=');
    prev[sli[0]] = sli[1];
    return prev;
  }, {});
};

// 深拷贝
/*
 * @author WYK
 * @date 2020.04.20
 * @param {Array / Object}  data    需要深拷贝的数组或者对象
 * @return {Array / Object}         返回相应的数组或者对象
 */
const deepClone = function(data) {
  // 判断传入参数类型
  let type = getType(data);
  if (type !== 'Object' && type !== 'Array') {
    throw new Error('参数需为对象或数组');
  }

  // 设置具体类型
  let target = type === 'Array' ? [] : {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // 判断每一项是否还是数组或者对象
      if (data[key] === 'object') {
        deepClone(data[key]);
      } else {
        target[key] = data[key];
      }
    }

  }
  return target;
};

// 分割数组
/*
 * @author WYK
 * @date 2020.04.20
 * @param {Array}   arr     需要分割的数组
 * @param {Number}   type
 *          1：每组要几个
 *          2：我要几组
 * @param {Number}   num     对应的要几个或者要几组
 * @return {Array}          返回分割完毕的数组
 */
const breakArr = function(arr, type = 1, num = 1) {
  // 判断参数类型
  if (getType(arr) !== 'Array') throw new Error('请传入一个数组');
  // 报错处理
  switch (type) {
  case 1:
    if (num > len) throw new Error('单个数组长度超过原数组长度');
    break;
  case 2:
    // 若是子数组的个数 > 原数组长度，报错
    if (num > len) throw new Error(`最少分为${len}组`);
    break;
  }

  let len = arr.length;
  let target = [];

  // 如果指定个数，先获取组数
  if (type === 2) {
    // 向上取整
    num = Math.ceil(len / num);
  }

  // 按照每组个数循环
  for (let i = 0; i < len; i += num) {
    target.push(arr.slice(i, i + num));
  }

  return target;


  // switch (type) {
  //     case 1:
  //         // console.log(len)
  //         // 若是一个子数组的个数 > 原数组长度，报错
  //         if (num > len) throw new Error("单个数组长度超过原数组长度")
  //
  //         for (let i = 0; i < len; i += num) {
  //             target.push(arr.slice(i, i + num))
  //         }
  //         // console.log(target)
  //         return target
  //     case 2:
  //         // 若是子数组的个数 > 原数组长度，报错
  //         if (num > len) throw new Error(`最少分为${len}组`)
  //         let group = Math.ceil(len / num)
  //         console.log(group)
  //
  //         for (let i = 0; i < len; i += group) {
  //             target.push(arr.slice(i, i + group))
  //         }
  //         return target
  // }
};

// 本地存储类
/*
*
* type:
*      1.localStorage
*      2.sessionStorage
*
* */

/*
 * @author WYK
 * @date 2020.04.21
 * @param {Number}  type
 *          1.localStorage
 *          2.sessionStorage
 * @return {void}
 */

// 判断是否支持storage
function isSupport(type) {
  if (arguments.length === 0) throw  new Error('请传入参数，以便判断浏览器是否支持web存储');
  switch (type) {
  case 1:
    if (!window.localStorage) {
      throw  new Error('浏览器不支持localStorage');
    }
    break;
  case 2:
    if (!window.sessionStorage) {
      throw  new Error('浏览器不支持sessionStorage');
    }
    break;
  }
}

// 存储类型
function sType(type = 1) {
  let store;
  switch (type) {
  case 1:
    store = window.localStorage;
    break;
  case 2:
    store = window.sessionStorage;
    break;
  }
  return store;
}

// 存
/*
 * @author WYK
 * @date 2020.04.21
 * @param {String}      key       存入的键名
 * @param {Any}         value     存入的键值
 * @param {Number}      type      存在哪里，默认local
 * @return {}
 */
const saveS = function(key, value, type = 1) {
  // 判断浏览器是否支持存储
  isSupport(type);

  // 判断类型  如果不是字符类型，转换为字符串
  if (getType(value) !== 'String') value = JSON.stringify(value);

  let store = sType(type);

  switch (type) {
  case 1:
    store.setItem(key, value);
    break;
  case 2:
    store.setItem(key, value);
    break;
  }
};

// 取
const getS = function(key, type = 1) {
  let store = sType(type);
  try {
    return JSON.parse(store.getItem(key));
  } catch (e) {
    // 解析非json形式字符串会报错，所以捕捉错误，判断是否是此类型，是则直接返回值
    let err = e + '';
    if (err.includes('JSON at position 0')) {
      return store.getItem(key);
    }
  }
};

// 删
const delS = function(key, type = 1) {
  let store = sType(type);
  store.removeItem(key);
};

// 全删
const delA = function(type = 1) {
  let store = sType(type);
  store.clear();
};

// 敏感符号转义 xss
/*
 * @author WYK
 * @date 2020.04.20
 * @param {String}  value   需转义的字符串
 * @return {String}         返回转义完毕的字符串
 */
const entities = function(value) {
  let list = {
    '\'': '&#39;',
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return value.replace(/["<>&]/g, target => {
    return list[target];
  });
};

// 判断是否苹果设备
/*
 * @author WYK
 * @date 2020.04.20
 * @return {Boolean}         表示是否
 */
const isIos = function() {
  let u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
    // return "Android";
    return false;
  } else if (u.indexOf('iPhone') > -1) { // 苹果手机
    // return "iPhone";
    return true;
  } else if (u.indexOf('iPad') > -1) { // iPad
    // return "iPad";
    return false;
  } else if (u.indexOf('Windows Phone') > -1) { // winphone手机
    // return "Windows Phone";
    return false;
  } else {
    return false;
  }
};

// 判断是否是PC端
/*
 * @author WYK
 * @date 2020.04.20
 * @return {Boolean}         表示是否
 */
const isPC = function() {
  let userAgentInfo = navigator.userAgent,
    Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'],
    flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

// 判断浏览器
const browserType = function() {
  let userAgent = navigator.userAgent, //取得浏览器的userAgent字符串
    isOpera = userAgent.indexOf('Opera') > -1, //判断是否Opera浏览器
    isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera, //判断是否IE浏览器
    isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1,
    isEdge = userAgent.indexOf('Edge') > -1 && !isIE, //判断是否IE的Edge浏览器
    isFF = userAgent.indexOf('Firefox') > -1, //判断是否Firefox浏览器
    isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1, //判断是否Safari浏览器
    isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) {
      return 'IE7';
    } else if (fIEVersion === 8) {
      return 'IE8';
    } else if (fIEVersion === 9) {
      return 'IE9';
    } else if (fIEVersion === 10) {
      return 'IE10';
    } else {
      return 'IE7以下';
    }//IE版本过低
  }
  if (isIE11) return 'IE11';
  if (isEdge) return 'Edge';
  if (isFF) return 'FireFox';
  if (isOpera) return 'Opera';
  if (isSafari) return 'Safari';
  if (isChrome) return 'Chrome';
};

// 获取一个指定范围的随机数  来自MDN
//含最大值，含最小值
const getRandom = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 获取一个随机颜色值 rgb
/*
* opacity 不透明度，默认1，取值 0 to 1
* */
const getColor = function(opacity = 1) {
  return `rgba(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)},${opacity})`;
};

// 驼峰命名法转化横线连接  userName -->  user-name
/*
*
* 若传入符合转化后标准的字符，不会发生任何改变
* connector：自定义连接符
*
* */
const toName = function(val, connector = '-') {
  // 类型检测
  if (getType(val) !== 'String' && getType(connector) !== 'String') throw new Error('传入参数需为字符串');

  let reg = /\B([A-Z])/g;
  return val.replace(reg, `${connector}$1`).toLowerCase();
};

// 横线连接转化驼峰命名法  user-name --> userName
/*
*
* connector：要判断的连接符
*
* */
const toHump = function(val, connector = '-') {
  // 类型检测
  if (getType(val) !== 'String') throw new Error('传入参数需为字符串');


  let a = val.split('');
  // 去除前后的连接符
  for (let i = 0; i < a.length; i++) {
    if (a[0] === connector) {
      a.shift();
    } else if (a[a.length - 1] === connector) {
      a.pop();
    } else {
      break;
    }
  }

  return a.reduce((prev, item, index) => {

    if (item === connector && prev !== '') {
      item = '';
      a[index + 1] = a[index + 1].toUpperCase();
    }
    return prev += item;
  }, '');
};

// 传入数字或者字符串，以及个数，生成重复的数字或者字符串
/*
*
* n：重复的次数
* immediate：如果传入的参数是数字，得出的值是否转化为数字，默认转化  123,2 ===》 123123
* "小明"，3 === 》"小明小明小明"    123,2 ===》 "123123"
*
* */
const repeat = function(val, n, immediate = true) {
  // 类型检测
  if (getType(val) !== 'String' && getType(val) !== 'Number' && getType(n) !== 'Number') throw new Error('参数应为字符串或者数字');

  let str = '';
  switch (getType(val)) {
  case 'String':
    for (let i = 0; i < n; i++) {
      str += val;
    }
    break;
  case 'Number':
    val += '';
    for (let i = 0; i < n; i++) {
      str += val;
    }
    str = immediate ? parseInt(str) : str;
    break;
  }
  return str;
};


// 合并所有传入的对象
/*
 * @author WYK
 * @date 2020-04-22 14:13:43
 * @param {Object}      传入想要合并的对象
 * @return {Object}     返回合并完毕的对象
 */
const combine = function(...args) {
  // console.log(args)
  return args.reduce((prev, item) => {
    item = deepClone(item);
    // console.log(item)
    for (let key in item) {
      prev[key] = item[key];
    }
    return prev;
  }, {});
};

// 页面平平滑滚动到指定位置
/*
 * @author WYK
 * @date 2020-04-22 15:14:40
 * @param {Number}      target      目标位置
 * @param {Number}      speed       滚动速度
 * @param {Function}    cb          滚动后的回调函数
 * @return {void}
 */
const scrollTo = function(target, speed, cb) {
  let offset = window.scrollY;
  speed = speed || 50;
  const isScrollUp = target <= offset;
  if (isScrollUp) {
    speed = -speed;
  }
  const timer = setInterval(() => {
    offset += speed;
    window.scrollTo(0, offset);
    if ((isScrollUp && offset <= target) || (!isScrollUp && offset >= target)) {
      clearInterval(timer);
      if (typeof cb === 'function') {
        cb();
      }
    }
  }, 16);
};

// 当前位置
/*
 * @author WYK
 * @date 2020-04-22 16:53:59
 * @param {}
 * @return {Object}     {x: 0, y: 200}
 */
const getScroll = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//  点击复制
/*
 * @author WYK
 * @date 2020-04-22 16:26:11
 * @param {Any}     text    复制的文本
 * @return {}
 */
const clickCopy = function(text) {
  const copyFrom = document.createElement('textarea');
  const body = document.getElementsByTagName('body')[0];
  copyFrom.textContent = text;
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
};

// 删除字符串中的html代码
/*
 * @author WYK
 * @date 2020-04-22 16:48:14
 * @param {String}  str     需要删除的字符串
 * @return {void}
 */
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

// 隐藏指定标签
/*
 * @author WYK
 * @date 2020-04-22 16:50:06
 * @param {ArrayLike}   el
 * @return {void}
 */
const hideTag = (...el) => [...el].forEach(e => (e.style.display = 'none'));
// 示例 hideTag(document.querySelectorAll('img')); /

// 字符串转base64
/*
 * @author WYK
 * @date 2020-04-22 17:14:15
 * @param {String}      str
 * @return {base64}
 */
const strToBase64 = function(str) {
// 对字符串进行编码
  let encode = encodeURI(str);
// 对编码的字符串转化base64
  let base64 = btoa(encode);
  return base64;
};

// 图片转base64
/*
 * @author WYK
 * @date 2020-04-22 17:14:42
 * @param {String}      url     图片地址
 * @return {base64}
 */
const imgToBase64 = function(url) {
  let canvas = document.createElement('canvas');
  canvas.width = url.width;
  canvas.height = url.height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(url, 0, 0, url.width, url.height);
  let ext = url.src.substring(url.src.lastIndexOf('.') + 1).toLowerCase();
  let dataURL = canvas.toDataURL('image/' + ext);
  return dataURL;
};

// base64解码
/*
 * @author WYK
 * @date 2020-04-22 17:01:07
 * @param {data}    data    base64码
 * @return {}
 */
const base64Decode = function(data) {
  let b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    dec = '',
    tmp_arr = [];
  if (!data) {
    return data;
  }
  data += '';
  do {
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));
    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;
    o1 = (bits >> 16) & 0xff;
    o2 = (bits >> 8) & 0xff;
    o3 = bits & 0xff;
    if (h3 === 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 === 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);
  dec = tmp_arr.join('');
  dec = utf8_decode(dec);
  return dec;
};

// 压缩css代码
/*
 * @author WYK
 * @date 2020-04-22 17:16:53
 * @param {String}      s       css代码
 * @return {}
 */
const compressCss = function(s) {
  //压缩代码
  s = s.replace(/\/\*(.|\n)*?\*\//g, ''); //删除注释
  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
  s = s.replace(/\,[\s\.\#\d]*\{/g, '{'); //容错处理
  s = s.replace(/;\s*;/g, ';'); //清除连续分号
  s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
  return s == null ? '' : s[1];
};

// 检测url连接是否有效
/*
 * 注：仅IE有效
 * @author WYK
 * @date 2020-04-22 17:20:46
 * @param {String}      URL     检测的连接
 * @return {Boolean}
 */
function getUrlState(URL) {
  let xmlhttp = new ActiveXObject('microsoft.xmlhttp');
  xmlhttp.Open('GET', URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    let result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

// 性能检测
const power = function() {
  setTimeout(function() {
    let t = performance.timing;
    console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0));
    console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0));
    console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0));
    console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0));
    console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0));
    console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0));
    console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0));

    if (t === performance.memory) {
      console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%');
    }
  });
};

// 传入一个对象数组和一个数组，检测数组中的值是否与对象数组中的某个对象的id相同，相同则撇弃
/*
 * @author WYK
 * @date 2020-05-20 14:52:41
 * @param {Array}   objArr  对象数组
 * @param {Array}   arr     数组
 * @return {Array}  筛选完毕的数组
 */
const removeArr = function(objArr, arr) {
  return objArr.filter(item => {
    return arr.indexOf(item.id) === -1;
  });
};

// 传入一个对象数组，根据对象的相同的某个值合并对象
/*
 * @author WYK
 * @date 2020-05-31 12:00:10
 * @param {Array}   data  对象数组
 * @param {String}   str     关键词，有相同内容的属性
 * @return {Array}  合并之后的对象数组
 */
const alikeMerge = function(data, str) {
  // 存储数组：存储已经遍历过的id
  let tempArr = [];
  // 返回数组：将要返回的数组
  let returnArr = [];
  // 循环当前数组
  for (let i = 0; i < data.length; i++) {
    // 如果存储数组中没有和当前循环项一样的id
    if (tempArr.indexOf(data[i][str]) === -1) {
      // 将对象添加进返回数组
      returnArr.push(data[i]);
      // 此项已经处理过，将id存入存储数组
      tempArr.push(data[i][str]);
    } else {
      // 获取已经遍历过id的项在存储数组中的位置
      let _index = returnArr.findIndex(item => {
        return data[i][str] === item[str];
      });
      // 合并返回数组中的这一项和当前循环项
      let tar = Object.assign(returnArr[_index], data[i]);
      // 在返回数组的替换进合并完毕的数组
      returnArr.splice(_index, 1, tar);
    }
  }
  return returnArr;
};

// 根据传入的父id拼接树数据
/*
 * @author WYK
 * @date 2020-06-08 17:58:33
 * @param {Array} data 需要拼接的数据
 * @param {String} son 子项的判断字段
 * @param {String} par 父项的判断字段
 * @return {Array} 返回拼接完毕的数组
 */
const splitTree = function(data, son, par) {
  // 需要返回拼接完毕的数组
  let results = [];

  // 存储以子项判断字段为索引的对象
  let map = {};
  data.forEach(function(mapItem) {
    map[mapItem[son]] = mapItem;
  });

  for (let i = 0; i < data.length; i++) {
    // 在map中取出当前项的父项
    let parent = map[data[i][par]];

    // 如果父项存在，则在父项的children数组中添加进当前项
    if (parent) {
      (parent.children || (parent.children = [])).push(data[i])
      // eslint-disable-next-line brace-style
    }
    // 否则直接在数组中添加当前项
    else {
      results.push(data[i]);
    }
  }
  return results;
};

// 生成一个随机的汉字
/*
 * @author WYK
 * @date 2020-06-13 14:38:57
 * @param {}
 * @return {}
 */
const getOneChinese = function() {
  let _rsl = '';
  let _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
  eval('_rsl=' + '"\\u' + _randomUniCode + '"');
  return _rsl;
};

// 获取指定长度范围的随机汉字段落
/*
 * @author WYK
 * @date 2020-06-13 14:49:03
 * @param {Number}  min  最少几位
 * @param {Number}  max  最多几位
 * @return {}
 */
const getRandomChinese = function(min, max) {
  let arr = new Array(getRandom(min, max)).fill(1);
  let str = '';
  arr.map(item => {
    str += getRandomChinese();
  });
  return str;
};

// 添加cookies
/*
 * @author WYK
 * @date 2020-07-01 12:05:36
 * @param {String}  name  cookies名字
 * @param {String}  val  cookies值
 * @param {Number}  expire  过期时间(天数) 0为不过期
 * @return {void}
 */
const saveCookie = function(name, val, expire) {
  let cookieString = name + '=' + escape(val);

  // 判断是否设置了过期时间
  if (expire > 0) {
    let date = new Date();
    // 设置以毫秒数为单位的时间
    date.setTime(date.getTime() + 60 * 60 * 1000 * expire);
    cookieString = cookieString + ';expires=' + date.toUTCString();
  }
  window.document.cookie = cookieString;
};

// 返回指定名称的cookie
/*
 * @author WYK
 * @date 2020-07-01 14:07:41
 * @param {name}  要取出的cookie名称
 * @return {String} cookie值
 */
const getCookie = function(name) {
  let cookiesList = window.document.cookie.split('; ');
  let a = cookiesList.filter(item => {
    return item.split('=')[0] === name;
  });
  // console.log(a);
  if (!a.length) return null;
  return unescape(a[0].split('=')[1]);
};

// 删除某个cookie
/*
 * @author WYK
 * @date 2020-07-01 14:30:47
 * @param {String / Array}  name  要删除的cookie们，可传一个字符串或者多个[数组形式]
 * @return {void}
 */
const delCookie = function(name) {
  let date = new Date();
  date.setTime(date.getTime() - 100000000);
  if (getType(name) === 'String') {
    window.document.cookie = name + '=v;expires=' + date.toUTCString();
    return;
  }
  name.forEach(item => {
    window.document.cookie = item + '=v;expires=' + date.toUTCString();
  });
};

// 对象数组根据某个字段去重
/*
 * @author WYK
 * @date 2020-07-28 11:50:32
 * @param {Array}   dataArr 需要去重的对象数组
 * @param {String}  key 去重关键字
 * @return {Array}  去重完毕的数组
 */
const accordRemoveRepeat = (dataArr, key) => {
  let tar = [];
  tar = dataArr.reduce(function(arr, current) {
    tar[current[key]] ? '' : tar[current[key]] = true && arr.push(current);
    return arr;
  }, []);

  return tar;
};

// 对象数组根据某个字段去重,并计数
/*
 * @author WYK
 * @date2020-07-29 15:35:38
 * @param {Array}   dataArr 需要去重的对象数组
 * @param {String}   key 去重关键字
 * @param {String}   count 计数字段
 * @return {Array}  去重完毕的数组
 */
const accordRemoveRepeatCount = (dataArr, key, count) => {
  return dataArr.reduce((obj, item) => {
    let find = obj.find(i => i[key] === item[key]);
    let _d = {
      ...item,
    };
    _d[count] = 1;
    find ? find[count]++ : obj.push(_d);
    return obj;
  }, []);
};

/*
 * @desc 深拷贝（新）
 * @author WYK
 * @date 2020-11-02 17:08:12
 * @param {Array / Object}  data    需要深拷贝的数组或者对象
 * @return {Array / Object}         返回相应的数组或者对象
 */

const deepClone2 = function(data) {
  // 判断传入参数类型
  if (typeof data !== 'object') throw new Error('深拷贝参数错误');

  // 设置具体类型
  let target = Array.isArray(data) ? [] : {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // 判断每一项是否还是数组或者对象
      target[key] = typeof data[key] === 'object' ? deepClone2(data[key]) : data[key];
    }

  }
  return target;
};

/*
 * @desc base64转码解码
 * @author WYK
 * @date 2020-11-09 17:58:44
 * @param {}
 * @return {}
 */
const base64Handle = function() {

  let target = {};

  // private property
  let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  // public method for encoding
  target.encode = function(input) {
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };

  // public method for decoding
  target.decode = function(input) {
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  };

  // private method for UTF-8 encoding
  let _utf8_encode = function(string) {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  };

  // private method for UTF-8 decoding
  let _utf8_decode = function(utftext) {
    let string = '';
    let i = 0;
    let c, c1, c2, c3;
    c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  };

  return target;
};

/*
 * @desc 删除数组中不符合要求的项
 * @author WYK
 * @date 2020-11-14 22:24:34
 * @param {Array} arr 需要进行操作的数组
 * @param {Array} deleteList 删除依据数组（数组中有的保留）
 * @param {String} key 删除依据字段
 * @param {String} children 子项字段
 * @return {}
 */
const deleteCurrent = (arr, deleteList = [], key = 'id', children = 'children') => {
  for (let i = arr.length; i > 0; i--) {
    if (!deleteList.includes(arr[i - 1][key])) {
      arr.splice(i - 1, 1)
    } else {
      if (arr[i - 1][children]) {
        deleteCurrent(arr[i - 1][children], deleteList, key, children)
      }
    }
  }
}

export {
  test,
  getType,
  debounce,
  throttle,
  removeRepeat,
  getURL,
  deepClone,
  breakArr,
  saveS,
  getS,
  delS,
  delA,
  entities,
  isIos,
  isPC,
  browserType,
  getRandom,
  getColor,
  toName,
  toHump,
  repeat,
  combine,
  scrollTo,
  getScroll,
  clickCopy,
  stripHTMLTags,
  hideTag,
  strToBase64,
  imgToBase64,
  base64Decode,
  compressCss,
  getUrlState,
  power,
  alikeMerge,
  splitTree,
  getOneChinese,
  getRandomChinese,
  saveCookie,
  getCookie,
  delCookie,
  accordRemoveRepeat,
  accordRemoveRepeatCount,
  deepClone2,
  base64Handle,
  deleteCurrent
};
