import React, { Component } from 'react';
import { Tooltip } from 'antd';
import {antPrefix,mainContainer} from "@/config/antConfig"

import './styles/tooltip.less'
class AevtTooltip extends Component {
    render() {
        let _props = this.props,_overlayClassName,_container=_props.getPopupContainer;
        if(_props.overlayClassName){
            if(_props.overlayClassName!=`${antPrefix}-tooltip`){
                _overlayClassName = `${_props.overlayClassName} ${antPrefix}-tooltip`;
            }else {
                _overlayClassName = _props.overlayClassName;
            }
        }else {
            _overlayClassName = `${antPrefix}-tooltip`
        }
        if(!_props.getPopupContainer){
            _container = ()=>{return document.getElementById(mainContainer)}
        }
        _props = Object.assign({},_props,{overlayClassName:_overlayClassName,getPopupContainer:_container})
        return (
            <Tooltip {..._props} />
        );
    }
}

export default AevtTooltip;
