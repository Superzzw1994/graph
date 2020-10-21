import { Modal } from 'antd';
import {antPrefix,mainContainer} from "@/config/antConfig"
import './styles/confirm.less'
const { confirm } = Modal;
const prefixCls = {
    prefixCls:`${antPrefix}-modal`,
    okButtonProps: {
        prefixCls: `${antPrefix}-btn ${antPrefix}-form ${antPrefix}-form-bg`,
    },
    cancelButtonProps: {
        prefixCls: `${antPrefix}-btn ${antPrefix}-form ${antPrefix}-form-on`,
    }
}
const aevtConfirm = ({...props})=>{

    let container=props.getContainer;
    if(!container){
        container = document.getElementById(mainContainer)
    }

    return confirm(Object.assign({},props,prefixCls,{getContainer:container}));
}
export default aevtConfirm
