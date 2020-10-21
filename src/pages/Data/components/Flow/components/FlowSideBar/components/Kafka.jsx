import React, {useEffect, useState} from 'react'
import {Divider, Form, Icon, Input, Radio, Select} from 'antd'
import NodeDetailWrapper from "@/pages/Data/components/Flow/components/FlowSideBar/components/NodeDetailWrapper";
import BasicButton from "SRC_COMP/basic/BasicButton";
import {guid} from "@/utils/util";

const Option = Select.Option
const FormItem = Form.Item
const Kafka = props => {
  const {form: {getFieldDecorator, validateFields, getFieldsValue}, typeList = []} = props
  const [types, setTypes] = useState([{
    id: guid(),
    field: undefined,
    type: 'string'
  }])
  const onSave = () => {
    console.log(getFieldsValue())
  }
  useEffect(() => {
    if (typeList.length > 0) {
      setTypes(typeList)
    }
  }, [typeList])
  const addType = () => {
    setTypes(prevState => {
      return prevState.concat({
        id: guid(),
        field: undefined,
        type: 'string'
      })
    })
  }
  const deleteType = (id) => {
    setTypes(prevState => prevState.filter(type => type.id !== id))
  }
  return <NodeDetailWrapper title='Kafka数据源' onSave={onSave}>
    <Form className='kafkaWrapper'>
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
      <FormItem label={<span className='label'>选择数据源</span>}>
        {
          getFieldDecorator('dataSource', {
            rules: [],
            initialValue: 1
          })(
            <Radio.Group>
              <Radio value={1}>数据接入</Radio>
              <Radio value={2}>数据处理</Radio>
              <Radio value={3}>外部kafka</Radio>
            </Radio.Group>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>topic</span>}>
        {
          getFieldDecorator('topic', {
            rules: []
          })(
            <Input placeholder='请输入topic'/>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>输出名称</span>}>
        {
          getFieldDecorator('groupId', {
            rules: []
          })(
            <Input placeholder='请输入groupId'/>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>消息偏移量</span>}>
        {
          getFieldDecorator('offset', {
            rules: [],
            initialValue: 1
          })(
            <Radio.Group>
              <Radio value={1}>从头开始消费</Radio>
              <Radio value={2}>从现在开始消费</Radio>
            </Radio.Group>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>最大拉取记录数</span>}>
        {
          getFieldDecorator('record', {
            rules: []
          })(
            <Input placeholder='请输入拉取记录数'/>
          )
        }
      </FormItem>
      <Divider/>
      <FormItem label={<span className='label'>表名</span>}>
        {
          getFieldDecorator('table', {
            rules: [{
              required: true,
              msg: '请输入表名'
            }]
          })(
            <Input placeholder='请输入表名'/>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>输入格式</span>}>
        <div className='typeWrapper'>
          <div className="title">
            <div className='fieldLabel'>字段名称</div>
            <div className='typeLabel'>类型</div>
          </div>
          {
            types.map(type => <div className='typeItem' key={type.id}>
              <FormItem className='field'>
                {
                  getFieldDecorator(`field-${type.id}`, {
                    rules: []
                  })(
                    <Input/>
                  )
                }
              </FormItem>
              <FormItem className='type'>
                {
                  getFieldDecorator(`type-${type.id}`, {
                    rules: []
                  })(
                    <Select>
                      <Option value={1}>string</Option>
                    </Select>
                  )
                }
              </FormItem>
              {
                types.length > 1 ? <Icon type="delete" onClick={() => deleteType(type.id)} className='deleteBtn'/>
                  : null
              }
            </div>)
          }
        </div>
        <BasicButton onClick={addType}>添加</BasicButton>
      </FormItem>
      <Divider/>
      <FormItem label={<span className='label'>自带时间戳字段</span>}>
        {
          getFieldDecorator('timestamp', {
            rules: [],
            initialValue: 1
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          )
        }
      </FormItem>
      <FormItem>
        {
          getFieldDecorator('timestamp', {
            rules: [],
            initialValue: 1
          })(
            <Select>
              <Option value={1}>timeStamp</Option>
              <Option value={2}>否</Option>
            </Select>
          )
        }
      </FormItem>
      <div className="waterMarkWrapper">
        <FormItem label={<span className='label'>水位线</span>} className='waterMark'>
          {
            getFieldDecorator('waterMark', {
              rules: []
            })(
              <Input placeholder='请输入并行度'/>
            )
          }
        </FormItem>
        <FormItem className='waterMarkInterval'>
          {
            getFieldDecorator('waterMarkInterval', {
              rules: [],
              initialValue: 1
            })(
              <Select>
                <Option value={1}>秒</Option>
                <Option value={2}>分</Option>
              </Select>
            )
          }
        </FormItem>
      </div>
      <FormItem label={<span className='label'>并行度</span>}>
        {
          getFieldDecorator('parallelism', {
            rules: []
          })(
            <Input placeholder='请输入并行度'/>
          )
        }
      </FormItem>
      <Divider/>
    </Form>
  </NodeDetailWrapper>
}

export default Form.create()(Kafka)
