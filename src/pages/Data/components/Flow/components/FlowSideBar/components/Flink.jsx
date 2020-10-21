import React from 'react'
import {Form, Input} from 'antd'
import NodeDetailWrapper from "@/pages/Data/components/Flow/components/FlowSideBar/components/NodeDetailWrapper";

const FormItem = Form.Item
const Flink = props => {
  const {form: {getFieldDecorator, validateFields}} = props
  return <NodeDetailWrapper title='Flink SQL'>
    <Form className="flinkWrapper">
      <FormItem label='名称'>
        {
          getFieldDecorator('flinkName', {
            rules: [{
              required: true,
              msg: '请输入flink名称'
            }]
          })(
            <Input placeholder='请输入flink名称'/>
          )
        }
      </FormItem>
      <FormItem label='SQL语句'>
        {
          getFieldDecorator('sql', {
            rules: []
          })(
            <Input.TextArea autoSize={{minRows: 6, maxRows: 6}}/>
          )
        }
      </FormItem>
    </Form>
  </NodeDetailWrapper>
}

export default Form.create()(Flink)
