import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockRules from '../__MOCK__' //引入mock规则库
//axios全局配置
axios.defaults.headers.common['s-token'] = window.shareToken || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.timeout = window.DATACENTERAPP.fetchTimeOut

//实例化axios
const axiosInstance = axios.create({
  baseURL: window.DATACENTERAPP.bpmDomain,
})

//实例化mock axios
const mockInstance = new MockAdapter(axiosInstance)
//注册mock rule
mockRules.forEach((rule) => {
  let method =
    'on' +
    rule.request.method.charAt(0).toUpperCase() +
    rule.request.method.slice(1)
  mockInstance[method](rule.request.url).reply((config) => {
    let data = rule.response.data
    //如果是函数，则执行函数，函数返回promise
    if (data instanceof Function) {
      return new Promise((resolve, reject) => {
        data(config.data, config)
          .then((res) => {
            resolve([rule.response.status, res.data, config.headers])
          })
          .catch((error) => {
            if (process.env.NODE_ENV == 'development') {
              console.log(error)
            }
            reject(error)
          })
      })
    } else {
      return [rule.response.status, data, config.headers]
    }
  })
})
//透传所有不匹配mock数据的api请求
mockInstance.onAny().passThrough()

//注册拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      // IE 8-9
      if (
        response.data == null &&
        response.config.responseType === 'json' &&
        response.request.responseText != null
      ) {
        try {
          // eslint-disable-next-line no-param-reassign
          response.data = JSON.parse(response.request.responseText)
        } catch (e) {
          // ignored
        }
      }
      return response
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          break
        case 403:
          // window.location.hash = '/';
          break
        // license 过期
        case 499:
          // hashHistory.push('/logout');
          break
        default:
          throw error
      }
    }
  }
)

//axios发起请求
function axiosRequest(config) {
  config.url = `${config.url}${
    config.url.indexOf('?') > -1 ? '&' : '?'
  }__timestap=${+new Date()}`
  return axiosInstance
    .request(config)
    .then((response) => {
      if (response instanceof Object) {
        return response.data
      } else {
        return response
      }
    })
    .catch((error) => {
      if (process.env.NODE_ENV == 'development') {
        console.log('requestError:', error)
      }
      if (error.response) {
        let status = error.response.status
        if (status == 400 || status == 404 || status == 500) {
          return {
            status: 'failed',
            message: error.response.data,
          }
        }
      }
      return {
        code: '100111', //全局错误码
        msg: '请求过程发生错误,已经取消请求!',
      }
    })
}

export function upload(
  url,
  params = {},
  onUploadProgress = (progressEvent) => {},
  options = {}
) {
  if (!(params instanceof FormData)) {
    let formData = new FormData()
    for (let [k, v] of Object.entries(params)) {
      if (Array.isArray(v)) {
        v.forEach((item) => formData.append(`${k}`, item))
      } else {
        formData.append(k, v)
      }
    }
    params = formData
  }

  options = Object.assign(
    {
      url,
      method: 'post',
      data: params,
      // `onUploadProgress`允许处理上传的进度事件
      onUploadProgress: onUploadProgress,

      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    options
  )

  return axiosRequest(options)
}
export function fetchPost(url, options) {
  let config = {
    method: 'post',
    url: url,
    ...options,
  }
  if (options && options.body) {
    config.data = options.body
  }
  return axiosRequest(config)
}

export function fetchGet(url, options) {
  let config = {
    method: 'get',
    url: url,
    ...options,
  }

  return axiosRequest(config)
}

export function fetchDelete(url, options) {
  let config = {
    method: 'delete',
    url: url,
    ...options,
  }
  if (options && options.body) {
    config.data = options.body
  }

  return axiosRequest(config)
}

export function fetchPut(url, options) {
  let config = {
    method: 'put',
    url: url,
    ...options,
  }
  if (options && options.body) {
    config.data = options.body
  }

  return axiosRequest(config)
}
