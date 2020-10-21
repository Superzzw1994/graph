import React from 'react'
import BasicButton from "SRC_COMP/basic/BasicButton";

const SettingFooter = props => {
  const {onSave, onCancel} = props
  return <div className="footer">
    <BasicButton className='cancelBtn' onClick={onCancel}>取消</BasicButton>
    <BasicButton className='saveBtn' onClick={onSave}>保存</BasicButton>
  </div>
}

export default SettingFooter
