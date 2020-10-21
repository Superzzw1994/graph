import React from 'react'
import {Form, Input, Select} from 'antd'
import NodeDetailWrapper from "@/pages/Data/components/Flow/components/FlowSideBar/components/NodeDetailWrapper";

const FormItem = Form.Item
const Option = Select.Option
const OutputToSource = props => {
  const {form: {getFieldDecorator, validateFields, getFieldsValue}} = props

  return <NodeDetailWrapper title='输出到数据表'>
    <Form className='outPutToSource'>
      <FormItem label={<span className='label'>输出名称</span>}>
        {
          getFieldDecorator('outPutKafka', {
            rules: [
              {
                required: true,
                msg: '请输入输出名称'
              }
            ]
          })(
            <Input placeholder='请输入输出名称'/>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>选择数据表</span>}>
        {
          getFieldDecorator('table', {
            rules: []
          })(
            <Select placeholder='请输入输出名称'>
              <Option value={1}>1</Option>
            </Select>
          )
        }
      </FormItem>
    </Form>
  </NodeDetailWrapper>
}

export default Form.create()(OutputToSource)
