import React from 'react'
import { Button } from 'antd'
import './index.less'
const BasicButton = (props) => {
  const { children, icon, afterIcon, className = '', ...rest } = props
  return (
    <Button {...rest} className={`basicBtn ${className}`}>
      {icon}
      {children}
      {afterIcon}
    </Button>
  )
}

export default BasicButton
