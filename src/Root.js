import React, {useState, Fragment} from 'react';
import {observer} from 'mobx-react';
import './assets/style/index.css';
import './assets/style/index.less';
import App from '@/App';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';
import stores from './store';
import localStorage from 'SRC_UTILS/localStorage';
import Language from 'SRC_COMP/basic/Language';

import {configure} from 'mobx'; //开启严格模式

import {IEVersion} from 'SRC_UTILS/util';
import {ContextManager} from '@/store/contextManager';

const ieVersion = IEVersion();
if (ieVersion === 'safari' || (ieVersion !== 'edge' && ieVersion > 0)) {
  import('./assets/style/ie-fix.less').then(() => {
    console.log('ie-fix.less has imported!!!!!');
  });
}
if (ieVersion === 9) {
  import('./assets/style/ie-9-fix.less').then(() => {
    console.log('ie-9-fix.less has imported!!!!!');
  });
} else if (ieVersion === 10) {
  import('./assets/style/ie-10-fix.less').then(() => {
    console.log('ie-10-fix.less has imported!!!!!');
  });
}
configure({enforceActions: 'always'}) //开启严格模式

;(function () {
  let _theme = localStorage.getItem('theme') || window.DATACENTERAPP.defaultTheme;
  let bodyEl = document.querySelector('body');
  bodyEl.setAttribute('data-theme', _theme);
})();

const RootAevt = ({...singlespa}) => {
  let [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = (bool) => {
    setCollapsed(bool);
  };
  const {portalStore = {}} = singlespa;
  // 自定义Provider
  const MyProvider = portalStore && Object.keys(portalStore).length ? ContextManager.Provider : Fragment;
  const MyProps = portalStore && Object.keys(portalStore).length ? {value: portalStore} : {};
  return (
    <Provider {...stores} portalStore={portalStore}>
      <MyProvider {...MyProps}>
        <Language>
          <HashRouter>
            <App {...singlespa} />
          </HashRouter>
        </Language>
      </MyProvider>
    </Provider>
  );
};
export default observer(RootAevt);
