import isObject from "lodash-es/isObject";

// 后端接口返回数据格式化
export function formatResponse(res = {}) {
  if (res.data && isObject(res.data)) {
    for (var key in res.data) {
      switch (key) {
        case "error_code":
          res.data.code = res.data.error_code
          if (res.data.error_code == "000000") {
            res.data.code = 100000
          }
          delete res.data.error_code
          break
        case "error_msg":
          res.data.msg = res.data.error_msg
          if (res.data.error_msg.toLowerCase() == "success") {
            res.data.status = "success"
          } else {
            res.data.status = "failed"
          }
          delete res.data.error_msg
          break
        default:
          break;
      }
    }
  }
  return res
}

/**
 * 事件管理
 *
 * ------使用方式------
 * 1、添加事件监听：
 *  eventManager.on('timeChange',function(){
 *      alert('Time is change!');
 *  });
 *
 * 2、触发指定事件监听：
 *  eventManager.emit('timeChange',...args);
 *
 * 3、game over!!!!!
 * @type {{events: {}, on: Function, emit: Function, off: Function}}
 */
export const eventManager = {
  /**
   * 存储事件监听信息
   */
  events: {},
  /**
   * 添加监听
   * @param name
   * @param fn
   */
  on: function (name, fn) {
    this.events[name] = this.events[name] || []
    this.events[name].push(fn)

    return this
  },
  /**
   * 触发事件
   * @param name
   * @returns {Event}
   */
  emit: function (name) {
    if (name) {
      var fns = this.events[name] || []
      var params = [].slice.call(arguments, 1)
      for (var i = 0, l = fns.length; i < l; i++) {
        fns[i].apply(this, params)
      }
    }
    return this
  },
  /**
   * 移除事件监听
   * @param name
   * @returns {eventManager}
   */
  off: function (name, fn) {
    var events = this.events[name]
    if (name && events) {
      if (fn) {
        for (var i = 0, l = events.length; i < l; i++) {
          if (events[i] == fn) {
            events.splice(i, 1)
            break
          }
        }
      } else {
        delete this.events[name]
      }
    }
    return this
  },
}

/***
 * 将params转为 a=b&c=d 格式
 * @param params
 */
export function parseParamsToUrl(params) {
  let queryParam = null
  if (params) {
    let keys = Object.keys(params)

    keys.forEach(function (key) {
      let _value =
        typeof params[key] == 'object'
          ? JSON.stringify(params[key])
          : params[key]
      queryParam = queryParam
        ? queryParam + '&' + key + '=' + _value
        : key + '=' + _value
    })
  }
  return queryParam
}

/**
 * 获取地址栏中url后面拼接的参数
 * eg:
 *   浏览器地址栏中的地址：http://1.1.1.1/test.html?owner=2db08226-e2fa-426c-91a1-66e26f62c13f&view=pc
 *   var param=location.search;//?owner=2db08226-e2fa-426c-91a1-66e26f62c13f&view=pc
 *   var ownerId = getUrlParam("owner",param);
 *   var view = getUrlParam("view",param);
 */
export function getUrlParam(name, param) {
  if (!param) {
    return null
  }
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = param.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 下载动态文件方法
 * @param {*buffer} content 返回的文件内容（二进制流）
 * @param {*string} filename 文件名
 * @param {*string} type 文件类型
 */
export const funDownload = (content, filename, type = 'word') => {
  const docType = {
    excel: 'application/zip', // excel默认都是返回zip格式文件
    word:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  const blob = new Blob([content], {type: docType[type]})
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

//取值共用方法
export const commValue = (value) => {
  let unit = ''
  if (value >= 1000) {
    value = value / 1000 //千
    if (value >= 1000000) {
      value = value / 1000000
      value = value.toFixed(2)
      unit = 'B'
    } else if (value >= 1000) {
      value = value / 1000
      value = value.toFixed(2)
      unit = 'M'
    } else if (value >= 10) {
      value = value / 10
      value = value.toFixed(2)
      unit = 'W'
    } else {
      value = value.toFixed(2)
      unit = 'K'
    }
  } else {
    value = value.toFixed(2)
  }
  return {
    value,
    unit,
  }
}

//生成唯一id
export const guid = () => {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 获取ie版本
export function IEVersion() {
  // 取得浏览器的userAgent字符串
  var userAgent = navigator.userAgent
  // 判断是否为Safari浏览器
  var isSafari =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  // 判断是否为小于IE11的浏览器
  var isLessIE11 =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  // 判断是否为IE的Edge浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11
  // 判断是否为IE11浏览器
  var isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isLessIE11) {
    var IEReg = new RegExp('MSIE (\\d+\\.\\d+);')
    // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
    IEReg.test(userAgent)
    // 取正则表达式中第一个小括号里匹配到的值
    var IEVersionNum = parseFloat(RegExp['$1'])
    if (IEVersionNum === 7) {
      // IE7
      return 7
    } else if (IEVersionNum === 8) {
      // IE8
      return 8
    } else if (IEVersionNum === 9) {
      // IE9
      return 9
    } else if (IEVersionNum === 10) {
      // IE10
      return 10
    } else {
      // IE版本<7
      return 6
    }
  } else if (isEdge) {
    // edge
    return 'edge'
  } else if (isIE11) {
    // IE11
    return 11
  } else if (isSafari) {
    return 'safari'
  } else {
    // 不是ie浏览器
    return -1
  }
}

export function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
