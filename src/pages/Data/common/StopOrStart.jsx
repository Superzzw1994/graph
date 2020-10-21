import React from 'react'
import {Select} from 'antd'

const Option = Select.Option
const StopOrStart = props => {
  return <Select className='stopOrStart' placeholder='筛选启停状态' allowClear>
    <Option value={1}>启动</Option>
    <Option value={0}>停止</Option>
  </Select>
}

export default StopOrStart
