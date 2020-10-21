import './polyfill.js'
import 'core-js/es'
import 'mutation-observer'
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable'
import 'intl'
import 'intl/locale-data/jsonp/zh-Hans-CN'
import 'intl/locale-data/jsonp/en'
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import singleSpaReact from 'single-spa-react';

import Root from './Root'

let rootEle = document.getElementById("dataCenter");
if(rootEle){
  ReactDOM.render(
    <Root />,
    rootEle
  );
}

// 生产环境 - 打包成amd规范的文件，由DOCP作为微服务引入应用
const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (singlespa) => {
    return <Root {...singlespa} />;
  },
  // 可能会有加载顺序的问题
  domElementGetter
})
function domElementGetter(singlespa) {
  return document.getElementById('singlespa-container');
}

// 应用启动的钩子
export const bootstrap = [
  reactLifecycles.bootstrap,
]
// 应用启动后的钩子
export const mount = [
  reactLifecycles.mount,
]
// 应用卸载的钩子
export const unmount = [
  reactLifecycles.unmount,
]

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
