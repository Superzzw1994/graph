import React, { Component } from 'react';
import {antPrefix,mainContainer} from "@/config/antConfig"
import { Modal } from 'antd';
import './styles/modal.less'
const privateConfig = {
    okButtonProps:{
        className:`${antPrefix}-form ${antPrefix}-form-bg`
    },
    cancelButtonProps:{
        className:`${antPrefix}-form ${antPrefix}-form-on`
    }
}
class AevtModal extends Component {
    render() {
    	  let bodyStyle = {maxHeight:'400px',overflow:'auto'};
        let _props = this.props,_className,_container=_props.getContainer;
        if(_props.className){
            if(_props.className!=`${antPrefix}-modal`){
                _className = `${_props.className} ${antPrefix}-modal`;
            }else {
                _className = _props.className;
            }
        }else {
            _className = `${antPrefix}-modal`
        }
        if(!_props.getContainer){
            _container = document.getElementById(mainContainer)
        }
        if(_props.bodyStyle){
	        bodyStyle = Object.assign({},bodyStyle,_props.bodyStyle);
        }
        _props = Object.assign({},_props,privateConfig,{className:_className,getContainer:_container,bodyStyle})
        return (
            <Modal {..._props} />
        );
    }
}

export default AevtModal;
