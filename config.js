var DATACENTERAPP = (function () {
  var bpmDomain =
    window.location.protocol +
    '//' +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '') //请求后端接口
  var defaultConfig = {
    bpmDomain: bpmDomain,
    fetchTimeOut: 60 * 1000, //请求超时
    loggerFlag: false, //日志是否开启
    defaultTheme: 'light', //默认主题色 light dark
    localStoreType: 'localStorage', //本地存储配置
    eventPrefix: 'aevt-', //事件管理器事件名称前缀
    isCheckAuth: false, // 是否开启权限校验
    PATH_PREFIX: '/aevt',
    ROUTE_PREFIX: '/algorithm',
    defaultRoute: '/algorithm/type',
    project: 'aevt',
    refreshToken: 1000, // 刷新权限 0 不刷新
  }
  return defaultConfig
})()
