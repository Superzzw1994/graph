import React, {memo, useContext} from 'react'
import {Form, Icon} from "antd";
import {useHistory} from "react-router";
import BasicButton from "SRC_COMP/basic/BasicButton";
import flowContext from "@/pages/Data/components/Flow/context";

const FormItem = Form.Item
const FlowHeader = (props) => {
  const {title = '未命名项目'} = props
  const {
    flowData,
    dispatchFlow
  } = useContext(flowContext)
  const {sideBarType} = flowData
  const {push} = useHistory()
  const onBack = () => {
    push('/dataCenter/data/task')
  }
  const setting = () => {
    dispatchFlow({
      type: 'SET_SIDEBAR_TYPE',
      payload: sideBarType !== 'page' ? 'page' : ''
    })
  }
  const save = () => {
    // console.log(getFieldsValue())
  }
  return <div className='flowHeader'>
    <div className="left">
      <div className='backBtn' onClick={onBack}>
        <Icon type="left-circle" className='btnIcon'/>
        返回
      </div>
      <div className='prefix'></div>
      <div className="title">
        {title}
      </div>
      <div className="settingBtn" onClick={setting}>
        <Icon type="setting"/>
      </div>
    </div>
    <div className="right">
      <BasicButton className='sqlBtn'>切换为SQL模式</BasicButton>
      <BasicButton className='debuggerBtn'>调试</BasicButton>
      <BasicButton className='runBtn'>运行</BasicButton>
      <BasicButton className='saveBtn' onClick={save}>保存</BasicButton>
    </div>
  </div>
}
export default memo(FlowHeader)
