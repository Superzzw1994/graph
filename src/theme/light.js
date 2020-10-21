const common = require('./common')
const theme = {
    "primary-color": "#008DFF", // 全局主色
    "link-color": "#008DFF", // 链接色
    "success-color": "#52c41a", // 成功色
    "warning-color": "#faad14", // 警告色
    "error-color": "#f5222d", // 错误色
    "font-size-base": "14px", // 主字号
    "heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
    "text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
    "text-color-secondary": "rgba(0, 0, 0, .45)", // 次文本色
    "disabled-color": "rgba(0, 0, 0, .25)", // 失效色
    "border-radius-base": "4px", // 组件/浮层圆角
    "border-color-base": "#d9d9d9", // 边框色
    "box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)", // 浮层阴影
    "background": "#111111", // 背景色
    "marginBottom": "0px",


    "main-color": "#1F1F1F",
    "main-active-color": "#008DFF",
    "sub-color": "#333333",
    "extra-color": "#666666",
    "main-border": "#D9D9D9",
    "main-line": "#707D96",
    "title-font": "#29364B",
    "header-font": "#253248",
    "header-background": "#FFFFFF",
    "body-background": "#F4F7FD",
    "main-background": "#FFFFFF",
    "column-backround": "#FFFFFF",
    "sub-menu-background": "#d6f6f5",
    "content-color": "#8F9EAD",
    "main-shadow": "rgba(33,29,112,0.10)",
    "background-active": "#008DFF",

    "form-border": "#C5CCD3",
    "form-font": "#505E7C",
    "form-back": "#FFFFFF",
    "form-border-on": "#008DFF",
    "form-font-on": "#008DFF",
    "form-back-on": "#008DFF",
    "form-back-font": "#FFFFFF",

    //--------------------------通用按钮颜色---------------------------------//
    "btn-back": "#FFFFFF",
    "btn-border": "#FFFFFF",
    "btn-font": "#282F59",
    "btn-active-back": "#FFFFFF",
    "btn-active-border": "#FFFFFF",
    "btn-active-font": "#FFFFFF",

    //--------------------------modal 仪表盘深色---------------------------------//
    'dark-modal-head-back': '#44505F',
    'dark-modal-head-border': 'rgba(0,0,0,0.3)',
    'dark-modal-shadow': 'rgba(0,0,0,0.5)',
    'dark-modal-head-font': '#CBD8E3',
    'dark-modal-body-back': '#28323E',
    'dark-modal-body-font': '#6E7F90',
    'dark-modal-foot-back': '#28323E',
    'dark-modal-form-font': '#6E7F90',
    'dark-modal-form-back': '#161C24',
    'dark-modal-form-border': '#3C4855',

    //--------------------------tooltip 仪表盘深色---------------------------------//
    'dark-tooltip-back': 'rgba(0,0,0,0.75)',
    'dark-tooltip-border': 'rgba(0,0,0,0.3)',
    'dark-tooltip-font': '#ffffff',
    'dark-tooltip-shadow': 'rgba(0,0,0,0.4)',

    //--------------------------message 仪表盘深色---------------------------------//
    'dark-message-back': '#28323E',
    'dark-message-border': 'rgba(0,0,0,0.3)',
    'dark-message-font': '#6E7F90',
    'dark-message-shadow': 'rgba(0,0,0,0.5)',

    //--------------------------datePicker 仪表盘深色---------------------------------//
    'dark-picker-back': '#2D343E',
    'dark-picker-con-back': '#262C35',
    'dark-picker-form-back': '#161C24',
    'dark-picker-border': '#3C4855',
    'dark-picker-font': '#AEBAC5',

    "search-input-split": "rgba(112,125,150,50)", // 输入框下分割线颜色

    //-------------------------------表格样式----------------------------------//
    'table-bg': '#fff',
    'table-head-bg': 'rgba(47,132,251,0.06)',
    'table-head-color': '#282F59',
    'table-color': 'rgba(40,47,89,0.80)',
    'table-active-color': '#2F84FB',
    'table-border-color': 'rgba(93,103,211,0.12)',

    //-----------------------------严重级别颜色----------------------------------//
    'level-severity': '#AE0B0B',
    'level-high': '#FF354F',
    'level-middle': '#FAD961',
    'level-low': '#F5C100',
    'level-normal': '#00AC57',
    'color': 'red'
};

module.exports = Object.assign({}, theme, common);
