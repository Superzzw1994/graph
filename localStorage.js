/**
 *  Author: harry.lang
 *  Date: 17/3/9
 *  Description: Created by harrylang on 17/3/9.
 */

import { setCookie, getCookie, removeCookie, clearCookie } from './cookie'

const LOCAL_STORAGE = 'localStorage'
const LOCAL_COOKIE = 'cookie'

class localStorageClass {
  constructor(stroageType = LOCAL_STORAGE) {
    this.stroageType = stroageType
  }

  //exprieTime 传入毫秒数
  setItem(key, val, expireTime = Date.now() + 365 * 24 * 60 * 60 * 1000) {
    switch (this.stroageType) {
      case LOCAL_STORAGE:
        var value = {
          val: val,
          //expireTime: expireTime * dayMilliseconds + (new Date().getTime())
          expireTime: expireTime,
        }

        localStorage.setItem(key, JSON.stringify(value))
        break

      case LOCAL_COOKIE:
        setCookie(key, val, { expires: expireTime })
        break
      default:
        break
    }
  }

  getItem(key) {
    switch (this.stroageType) {
      case LOCAL_STORAGE:
        try {
          var item = JSON.parse(localStorage.getItem(key))
          if (item.expireTime > Date.now()) {
            return item.val
          } else {
            this.removeItem(key)
            return ''
          }
        } catch (error) {
          //console.log(error);
          return ''
        }
      // break;

      case LOCAL_COOKIE:
        //不要json_parse,返回的本身就是一个值.
        var result = getCookie(key)
        return result
      // break;
      default:
        break
    }
  }

  getItemExpire(key) {
    switch (this.stroageType) {
      case LOCAL_STORAGE:
        try {
          if (key == 'token') {
            key = 'tokenExpire'
          }

          var item = JSON.parse(localStorage.getItem(key))
          if (item.expireTime > Date.now()) {
            return item.expireTime
          } else {
            this.removeItem(key)
            return Date.now()
          }
        } catch (error) {
          // console.log(error);
          return ''
        }
      // break;

      case LOCAL_COOKIE:
        //所有的过期时间都用单独的cookies值存放
        var expireKey = key + 'Expire'
        var result = getCookie(expireKey)
        return result
      // break;
      default:
        break
    }
  }

  removeItem(key) {
    switch (this.stroageType) {
      case LOCAL_STORAGE:
        localStorage.removeItem(key)
        break

      case LOCAL_COOKIE:
        removeCookie(key)
        break
      default:
        break
    }
  }

  /**
   * 清空所有的存储
   */
  clear() {
    switch (this.stroageType) {
      case LOCAL_STORAGE:
        //首先获取不需要清除的内容
        let hideGuide = this.getItem('hideGuide')
        localStorage.clear()
        if (hideGuide) this.setItem('hideGuide', hideGuide)
        break

      case LOCAL_COOKIE:
        clearCookie()
        break
      default:
        break
    }
  }
}

export default new localStorageClass(window.DATACENTERAPP.localStoreType)
