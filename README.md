### 包管理器
npm

### 可运行脚本
npm run start
npm run build

打包编译时候的根目录是demo，修改了build.js脚本的process.env.PUBLIC_URL
npm run build /demo 

参数2[/demoWeb]在index.html引入js、css相对路径  参数3[../demoWeb]打包编译后生成的绝对路径和文件夹名称
npm run single  == npm run build /demoWeb ../demoWeb
 
### npm run single 子模块开发时候编译打包到父模块下，根据npm命令获取参数，修改config/webpack.config.js和scripts/build.js里边配置，读取命令参数 
1）修改webpack.config.js的出口路径appBuild编译生成的文件夹名称以及相对路径
    // 获取项目运行相对路径
    const appDirectory = fs.realpathSync(process.cwd());
    const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
    // 打包部署生成相对文件夹路径
    const buildPath = process.argv[3];
    const appBuild = buildPath?resolveApp(buildPath):paths.appBuild; // 配置的打包部署默认地址
2）修改build.js的出口路径appBuild编译生成的文件夹名称以及相对路径
    // 获取项目运行绝对路径
    const appDirectory = fs.realpathSync(process.cwd());
    const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
    // 打包部署生成相对文件夹路径
    const buildPath = process.argv[3];
    const appBuild = buildPath?resolveApp(buildPath):paths.appBuild; // 配置的打包部署默认地址

### 文件目录
config--webpack等配置
loader--加载主题用的js插件
public--静态不打包文件，index.html模版文件，打包后去build里
scripts--运行环境脚本
src--开发文件
    __MOCK__--mock接口
    assets--公共样式和图片等
    api--后端接口列表
    components--公共组件
    lang--国际化文件
    pages--各个页面或者路由对应页面
    router--路由文件，每个路由可以导入store（入口文件已经导入全部store）
    store--全局基础store，各个页面的store和全局store怎么用或者合并没想好呢
    utils--公共方法文件夹
    theme--主题文件主题色变量 light和dark
    
### antd组件前缀转换，避免父和子模块引用antd样式冲突
ant-xxx转成cw-xxx

### mobx建议使用方式
组件增加observer(comp)监听上下文，
组件引入store: import store from '../xxxx'
组件内部引用store相应变量，如果引用的变量变化触发重新渲染，如果store里的其他变量变化这个组件没引入这个变量，不触发渲染
在其他组件也可以引入这个store：import store from '../xxxx'，可以调用这个store里最新的值，监听store里的值变化
useEffect可以监听某个store或state或者里边的一个值进行执行，不过初始化会执行一次 src/pages/Report/components/Effect.js

### 路由配置文件
src/router/index.js

### 路由生成文件
src/components/Router.js

### 全局mobx在store里集成里
src/store/index.js

### mobx引用在
src/root.js
<Provider {...stores}>

### 国际化引用<Language>
src/root.js

### 集成到docp注意事项
由于项目需要挂载到docp，id为demo的根div元素有可能不存在，挂载到id为singlespa-container的元素上，所以开发过程中需要注意，目前在路由外增加一层div，demo-container
message：消息框默认top值过小被docp的header遮挡，调整
modal：没有设置body区域的滚动出现问题需要处理

### 自定义图标
配置webpack.config.js下的module的rules针对svg过滤规则，exclude:/\.svgcomp.svg$/,
/src/components/basic/SvgComp.js
配置自定义图标，将svg引入当成组件使用，配置这个组件的颜色，继承父级，修改webpack配置，针对需要变成组件的svg文件进行特殊加载
组件化svg命名规范xxx.svgcomp.svg
使用demo：
    ### 组件svg引入：import SvgCopy from "SRC_COMP/svgicon/report-copy.svgcomp.svg";
    ### 公共svg图标引入：import SvgComp from 'SRC_COMP/basic/SvgComp'
    ### 使用：<SvgComp comp={SvgCopy}></SvgComp>
    修改使用方式：在SRC_COMP/svgicon把这些svg图标组件生成出来，做成公共的，其他地方使用直接调用这个生成的组件
    创建：import React from 'react';
         import SvgComp from 'SRC_COMP/basic/SvgComp'
         import Add from './svg/dash-add.svgcomp.svg'
         const IconDashAdd = ()=>{
           return (
             <SvgComp comp={Add}></SvgComp>
           );
         }
         export default IconDashAdd;
    调用：import IconDashAdd from 'SRC_COMP/svgicon/IconDashAdd'
    
### className命名规范，建议以-分隔（项目-）
demo-xxx-xxx-xxx

### 自定义主题加载器 add-body-css-loader.js
过滤掉modules里边的less加载，这个加载器影响antd的less文件引入顺序，需要过滤掉

### 兼容性处理
mobx：因为mobx5.x使用的是es6编辑的所以不能用，兼容不了ie9，使用mobx4.x，注意使用时候toJS(),累死深拷贝
样式兼容：flex，特殊处理根据浏览器判断增加样式表/src/Root.js
ie兼容：
    package.json 设置browserslist "ie > 9",
    package.json 调整babel编译
        ["@babel/plugin-transform-proto-to-assign"],
        ["@babel/plugin-proposal-class-properties",{"loose": true}],
        ["@babel/plugin-transform-classes",{"loose": true}]
    入口文件index.js （setprototypeof通过polyfill.js解决，放在入口文件首位）import './polyfill.js'，import 'core-js/es'，import 'mutation-observer'，import 'react-app-polyfill/ie9';，import 'react-app-polyfill/stable'
    webpack.config.js  entry：入口配置中 paths.appIndexJs,入口文件放在第一位
    react-intl国际化的兼容性：
        在父级docp解决的，require('intl'); require('intl/locale-data/jsonp/en.js'); require('intl/locale-data/jsonp/zh-Hans-CN.js'); 
        在子级国际化配置地方引入import 'intl'; require('intl/locale-data/jsonp/en.js'); require('intl/locale-data/jsonp/zh-Hans-CN.js');
    打包兼容问题：对于部分modules引入模块，使用let和const的没有编译的，this指向有问题的，需要手动编译或者赋值this，（react-datepicker，react-grid-layout，react-intl）
        配置config的paths文件的变量，保证引入是本地的文件不是modules
        reactIntl: resolveApp('src/components/modules/react-intl'),
        reactGridLayout: resolveApp('src/components/modules/react-grid-layout'),
        reactDatepicker: resolveApp('src/components/modules/react-datepicker'),
        配置webpack.config.js的alias别名
        'react-intl': paths.reactIntl,
        'react-grid-layout': paths.reactGridLayout,
        'react-datepicker': paths.reactDatepicker,
    请求响应fetch封装，IE 9将返回数据转json格式
        // IE 8-9 
        if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
            try {
                // eslint-disable-next-line no-param-reassign
                response.data = JSON.parse(response.request.responseText);
            } catch (e) {
                // ignored
            }
        }
    
### webpack中plugins插件
HtmlWebpackPlugin 根据isEnvProduction是生成环境还是开发环境，配置configName变量，生成编译html
修改public下index.html模版文件，引入动态config配置文件，且create-react-app创建的项目静态变量需要
windows.xxx引用

### 静态文件引用--create-react-app
%PUBLIC_URL%  引入public文件夹的文件，public文件夹打包不编译，直接复制到编译后的目录里

### 微服务子模块-single-spa-react
修改入口文件 /src/index.js  根据渲染跟节点元素id判断是独立项目还是微服务的子模块
路由调整 作为子模块，需要统一的父路由前缀，因为父容器需要根据这个父路由前缀打开子模块
修改打包以后文件夹名称 scripts/build.js  process.env.PUBLIC_URL = '/demo'; build时候修改这个变量，之前引用PUBLIC_URL变量地址就能改成编译后的文件夹了（开发环境代表的是public静态资源文件夹）
修改webpack输出文件：output中的filename和chunkFilename，不用hash方式清缓存，以便父容器能够加载指定的文件和入口文件
修改config中paths：修改appBuild:demo的变量为要输出的文件名称，这样打包编译后就成这个文件夹名称了，不是默认的dist了

### 下载兼容性解决，创建a标签，赋值href，a标签click，a标签移除，封装方法
newWin = (url) => {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.style.display = "none"
    document.body.appendChild(a);
    a.click();
    // 移除
    document.body.removeChild(a)
}

### 打包完成运行  
npm install -g serve （https://github.com/zeit/serve）
serve --help
serve -s dist（编译后文件夹）
serve -s dist -l 8802 （-s 运行目录 -l 端口号）

### 编译后单独运行报错
    serve -s demo
    Uncaught SyntaxError: Unexpected token '<'
    https://github.com/facebook/create-react-app/issues/6035
    https://github.com/facebook/create-react-app/issues/8398
    https://create-react-app.dev/docs/using-the-public-folder/
    因为打包部署以后锁定了根目录资源demo这个文件夹，但是serve -s demo时候不识别了，这应该是给微服务用的
    单独部署的话调整下---修改打包以后文件夹名称 scripts/build.js  process.env.PUBLIC_URL = './';
    
### 菜单权限控制，路由权限控制（非微服务形式权限控制）
    1）获取权限存储到根store，全局使用
        获取操作：src/index.js 在入口文件处获取并更新rootStore.changeRbac
    2）根据路由配置里的id，check（是否校验当前路由权限），配置文件里的isCheckAuth（是否校验权限），layout判断是否需要侧边栏等布局
        配置文件：src/router/index.js
        拦截操作：src/components/basic/Router.js  无权限的Redirect到无权限页面 且不同父菜单级别id不同
    3）根据菜单配置里的id，check（是否校验当前菜单权限），配置文件里的isCheckAuth（是否校验权限）
        配置文件：src/components/basic/SiderNav/config/siderNav.js
        拦截操作：src/components/basic/SiderNav/index.js 无权限的不渲染菜单，权限来源根store，父级菜单id是子级菜单的一部分，且不同父菜单级别id不同，与路由类似
        
### useEffect监听不到store值的变化 与 Form.create() 有关
    useEffect(()=>{},[infoType])
    监听不到：observer(Form.create()(AlgorithmType));
    监听的到：Form.create()(observer(AlgorithmType));

### 在package.json配置eslintConfig，增加debugger警告，但是.eslintignore中配置了singlespa过滤不检测
    "no-debugger": "warn" // off关闭检测0  warn警告1 error错误2
    参考规则地址：https://www.jianshu.com/p/feb0fd5c6e0b
    配置eslint的地方是/config/webpack.config.js下的module的rules
    
### 开发sourceMap方便生产锁定报错位置
    修改的/config/webpack.config.js下的变量shouldUseSourceMap改为true
    参考地址：https://blog.csdn.net/holdsky/article/details/102573842
         
### vscode配置的webpack别名
    根目录增加jsconfig.json文件
    配置paths里边变量根据/config/webpack.config.js：alias配置，地址和相对位置参考/config/paths.js
    "paths": {
        "@/*": ["src/*"],
        "SRC_COMP/*": ["src/components/*"]
        ...
    }
    
### 服务间通讯
    1）都使用父模块的eventManager，子模块在注册应用的时候通过自定义属性customProps时候传递下去，子模块通过获取这个eventManager注册事件，子父模块互相调用事件
        1-1）父模块传递子模块接收eventManager
            a）父模块传递：/src/pages/SingleSpa/index.js
                registerApplication(x,x,x,{
                    portalStore:rootStore,
                    globalManager:eventManager
                })
            b）子模块接收demo模块：/demo/src/index.js，其中spa里包含了父模块customProps即含有globalManager事件
                const reactLifecycles = singleSpaReact({
                  React,
                  ReactDOM,
                  rootComponent: (singlespa) => {
                    return <Root {...singlespa} />;
                  },
                })
            c）修改<Root {...singlespa} />组件（/demo/src/Root.js），将singlespa属性传递下去
            d）修改<Router {...singlespa} />组件（/demo/src/components/basic/Router.js），将singlespa属性传递到每个路由对应的组件里
                const Routers = ({...singlespa}) => {
                  return <HashRouter><div id="theia-container">{renderRoutes(routes,{...singlespa})}</div></HashRouter>;
                };
                <route.component {...props} singlespa={singlespa} route={route} routes={route.children}>{renderChildRoutes}</route.component>
            e）各个路由页面接收singlespa属性（/demo/src/pages/Algorithm/Type/index.js）
                const {singlespa} = props
                const {globalManager,portalStore={}} = singlespa
        1-2）子模块注册和注销事件：（/demo/src/pages/Algorithm/Type/index.js）
            // 接收消息
            const receiveEventMessage = (params,callback)=>{
                alert("接收消息："+JSON.stringify(params));
                callback && typeof callback=="function" && callback()
            }
            useEffect(()=>{
                globalManager && globalManager.on("receivemess",receiveEventMessage)
                return ()=>{
                    globalManager && globalManager.off("receivemess",receiveEventMessage)
                }
            })
        1-3）父模块触发事件（/src/components/basic/Layout/index.js）
            // 发送消息
            const postEventMessage =()=>{
                eventManager.emit("receivemess",{from:'docp',value:'123'},()=>{
                    alert("消息发送成功！")
                })
            }
        1-4）触发时机
            当子模块是demo模块，路由页面进入到type时候，注册了事件，离开type以后注销事件
            点击父模块菜单前的的logo，触发父模块postEventMessage方法，调用子模块注册receiveEventMessage方法
    2）全局状态管理器，不管是父级还是子级都使用父级的rootStore（/src/store/rootStore.js）作为全局状态管理，传递到子模块，类似eventManager
        类似eventManager，通过注册应用时候传递到子应用的
        registerApplication(x,x,x,{
            portalStore:rootStore,
            globalManager:eventManager
        })
        注意需要使用的地方要加mobx-react的observer监听组件状态变化
        在父模块顶部菜单（/src/components/basic/Layout/index.js）也做了mess消息渲染<span style={{color:"#fff"}}>rootstore消息:{mess}</span>
        1）费劲使用：一级一级传递到子模块的子组件里，类似eventManager，将portalStore传递到路由引入的组件里（/demo/src/components/basic/Router.js）
            <route.component {...props} singlespa={singlespa} route={route} routes={route.children}>{renderChildRoutes}</route.component>
            如使用（/demo/src/pages/Algorithm/Type/index.js）
            const {singlespa} = props
            const {globalManager,portalStore={}} = singlespa
            const {theme,changeMess,mess} = portalStore
            测试方法：修改mess值触发使用mess和监听（observer）mess的组件渲染
            // 改变父级消息
            const changePortalMess = (mess)=>{
                changeMess && changeMess(mess,"changePortalMess")
            }
            点击demo模块type页面AlgorithmType文案触发
        2）针对类组件：通过mobx-react 的 Provider (/demo/src/Root.js)让下边所有类组件能监听，通过@inject("portalStore")，在当前类组件引用，那个组件使用那个组件引入
            2-1）demo等子模块入口文件处（/demo/src/Root.js）给Provider增加portalStore的store，来源于父模块的全局store
                <Provider {...stores} portalStore={portalStore}>
            2-2）使用demo模块下type页面下的TestDocpStore类组件（/demo/src/pages/Algorithm/Type/TestDocpStore.js）
                类组件之前注释引入属性：@inject("portalStore")，是获取子Root根组件mobx-react 的 Provider，然后通过props获取
                const {portalStore={}} = this.props;
                const {mess,theme} = portalStore
                测试方法：
                // 测试消息切换方法
                changePortalMessTest = (mess)=>{
                    const {portalStore={}} = this.props;
                    const {changeMess} = portalStore
                    changeMess && changeMess(mess,"changePortalMessTest")
                }
                点击demo模块type页面底部changePortalMess文案触发
        3）针对函数组件：自定义Provider，通过context监听，以及createContext和useContext以及自定义Provider让下边所有函数组件能监听到，ContextManager和useContext那个组件使用那个组件引入
            参考文档：https://react.docschina.org/docs/context.html （关于主题的theme-context.js）
            3-1）通过react的createContext方法创建自定义上下文context文件ContextManager（/demo/src/store/contextManager.js）创建一个空白上下文congtext，监听属性通过使用时候value传递
                import React from 'react';
                export const ContextManager = React.createContext(null);
            3-2)demo等子模块入口文件处（/demo/src/Root.js）增加自定义Provider
                引入ContextManager文件
                import {ContextManager} from "@/store/contextManager";
                判断是否有父模块传递的全局状态
                // 自定义Provider
                const MyProvider = portalStore && Object.keys(portalStore).length ? ContextManager.Provider : Fragment;
                const MyProps = portalStore && Object.keys(portalStore).length ? {value:portalStore} : {};
                在默认的mobx-react的Provider下增加自定义的Provider并且给Provider赋监听上下文的值value，也就是父模块传递的全局状态
                <Provider {...stores} portalStore={portalStore}>
                  <MyProvider {...MyProps}>
            3-3）使用方式
                在需要的组件引入ContextManager，import {ContextManager} from "@/store/contextManager";如demo子模块的Manage页面（/demo/src/pages/Algorithm/Manage/index.js）
                通过useContext获取上下文监听也就是之前的自定义的Provider的value，即父模块传递的全局状态，const portalStore = useContext(ContextManager) || {};
                获取store里的值渲染到页面，const {theme,changeMess,mess} = portalStore
                测试方法：
                // 改变父级消息
                const changePortalMess = (mess)=>{
                    changeMess && changeMess(mess,"changePortalMess")
                }
                点击demo模块下mange页面的AlgorithmManage文档
                
                
# 新增antd前缀使用优化，避免全局查找替换
    * 新增配置文件/src/config/antConfig.js
        作用：配齐ant前缀，以及二级主要容器名称变量，项目名称
    * 主题变量调整：使用antConfig.js配置定义主要的主题变量，且不分主题是通用的
        ```
        const {project,mainContainer,antPrefix} = require('../config/antConfig')
        module.exports = {
            "project": project,
            "main-container": mainContainer,
            "ant-prefix": antPrefix,
        }
        ```
    * webpack.config.js调整
        ```
        const {antPrefix} = require("../src/config/antConfig");
        // 配置less编译antd时候注入变量
        lessOption = {
          modifyVars: {
            'ant-prefix': antPrefix,
            'menu-prefix-cls': `${antPrefix}-menu`,
            'table-prefix-cls': `${antPrefix}-table`,
            'layout-prefix-cls': `${antPrefix}-layout`,
            'steps-prefix-cls': `${antPrefix}-steps`,
            'border-radius-base': '2px',
            'font-size-base': '12px'
            // 'hack': `true; @import "../src/assets/style/steps.less"`
          },
          javascriptEnabled: true
        }
        ```
    * antd前缀使用--less文件
        ```
        main-container和ant-prefix 主题全局变量
        @main-border 主题颜色变量
        
        #@{main-container}{
        	.@{ant-prefix}-modal {
        		.@{ant-prefix}-modal-header {
        			background: @body-background;
        			border: 1px solid @main-border;
        			color: @form-font;
                }
            }
        }
        ```
    * antd前缀使用--js文件
        定义元素className和id
        import {antPrefix} from "@/config/antConfig"
        <Layout
            id={`${antPrefix}-layout`}
            className={`${antPrefix}-layout-main-container`}
            style={{flexFlow: 'row wrap', flexDirection: 'row', height: '100%'}}
        >
    * 注意Tooltip等挂载的组件设置的挂载容器
        ```
        /src/components/antd/Tooltip.js
        import {antPrefix,mainContainer} from "@/config/antConfig"
        if(!_props.getPopupContainer){
            _container = ()=>{return document.getElementById(mainContainer)}
        }
        ```
    * 之后使用修改配置
        1）/public/config.js和/public/config-dev.js  的 var prefix = "dataCenter"
        2）/src/config/antConfig.js 的 const prefix = "dataCenter";
        