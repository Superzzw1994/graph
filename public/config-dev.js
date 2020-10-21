var DATACENTERAPP = (function () {
  var bpmDomain = 'http://10.0.2.77:8085';//请求后端接口
  var prefix = "dataCenter"
  var defaultConfig = {
    bpmDomain: bpmDomain,
    fetchTimeOut: 60 * 1000,//请求超时
    loggerFlag: false,//日志是否开启
    defaultTheme: "light",//默认主题色 light dark
    localStoreType: 'localStorage',//本地存储配置
    eventPrefix: `${prefix}-`,//事件管理器事件名称前缀
    isCheckAuth: false, // 是否开启权限校验
    PATH_PREFIX: `/${prefix}`,
    ROUTE_PREFIX: '/',
    defaultRoute: '/data/task',
    project: prefix,
    refreshToken: 1000, // 刷新权限 0 不刷新
  }
  return defaultConfig;
})();
