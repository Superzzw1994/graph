import React, {useContext} from 'react'
import BasicScrollBar from "SRC_COMP/basic/BasicScrollBar";
import SettingFooter from "@/pages/Data/components/Flow/components/FlowSideBar/components/Footer";
import {Icon} from "antd";
import flowContext from "@/pages/Data/components/Flow/context";

const NodeDetailWrapper = props => {
  const {title, children, onSave, onCancel} = props
  const {dispatchFlow} = useContext(flowContext)
  const close = (e) => {
    dispatchFlow({
      type: 'SET_SELECT_ITEM',
      payload: {
        sideBarType: ''
      }
    })
  }
  return <div className='nodeDetailWrapper'>
    <div className="header">
      <div className='label'>{title}</div>
      <Icon type="close" className='closeBtn' onClick={close}/>
    </div>
    <div className="content">
      <BasicScrollBar>{children}</BasicScrollBar>
    </div>
    <SettingFooter onSave={onSave} onCancel={onCancel}></SettingFooter>
  </div>
}

export default NodeDetailWrapper
