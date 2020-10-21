import React, {useEffect, useState} from 'react'
import NodeDetailWrapper from "@/pages/Data/components/Flow/components/FlowSideBar/components/NodeDetailWrapper";
import {Checkbox, Divider, Form, Icon, Input, Select} from 'antd'
import BasicButton from "SRC_COMP/basic/BasicButton";
import {guid} from "@/utils/util";

const Option = Select.Option
const FormItem = Form.Item
const OutputToKafka = props => {
  const {form, typeList = []} = props
  const {getFieldDecorator, validateFields, getFieldsValue} = form
  const [types, setTypes] = useState([{
    id: guid(),
    field: undefined,
    type: 'string',
    isNull: false
  }])
  const [showMore, setShowMore] = useState(false)
  const onSave = () => {
    console.log(getFieldsValue())
  }
  const showAll = () => {
    setShowMore(prevState => !prevState)
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
        type: 'string',
        isNull: false
      })
    })
  }
  const deleteType = (id) => {
    setTypes(prevState => prevState.filter(type => type.id !== id))
  }
  return <NodeDetailWrapper title={'输出到Kafka'}>
    <Form className='outputToKafka'>
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
          getFieldDecorator('source', {
            rules: [
              {
                required: true,
                msg: '请输入输出名称'
              }
            ]
          })(
            <Select placeholder='请输入输出名称'>
              <Option value={1}>1</Option>
            </Select>
          )
        }
      </FormItem>
      <FormItem label={<span className='label'>topic</span>}>
        {
          getFieldDecorator('topic', {
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
      <Divider>
        <div onClick={showAll} className='showMore'>Kafka属性设置<Icon type={showMore ? "down" : "up"} className='moreBtn'/>
        </div>
      </Divider>
      {
        showMore ? <MoreAttr form={form}/> : null
      }
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
            <div className='isNullLabel'>是否为空</div>
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
              <FormItem className='isNull'>
                {
                  getFieldDecorator(`isNull-${type.id}`, {
                    rules: [],
                    valuePropName: 'checked'
                  })(
                    <Checkbox/>
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
    </Form>
  </NodeDetailWrapper>
}
const MoreAttr = props => {
  const {form: {getFieldDecorator, validateFields, getFieldsValue}} = props

  return <React.Fragment>
    <FormItem label={<span className='label'>ack</span>}>
      {
        getFieldDecorator('ack', {
          rules: []
        })(
          <Input/>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>retires</span>}>
      {
        getFieldDecorator('retires', {
          rules: []
        })(
          <Input placeholder='请输入输出名称'/>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>compression.type</span>}>
      {
        getFieldDecorator('compression.type', {
          rules: []
        })(
          <Select>
            <Option value={1}>1</Option>
          </Select>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>linger.ms</span>}>
      {
        getFieldDecorator('linger.ms', {
          rules: []
        })(
          <Input placeholder='请输入输出名称'/>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>batch.size</span>}>
      {
        getFieldDecorator('batch.size', {
          rules: []
        })(
          <Input placeholder='请输入输出名称'/>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>buffer.memory(type)</span>}>
      {
        getFieldDecorator('buffer.memory(type)', {
          rules: []
        })(
          <Input placeholder='请输入输出名称'/>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>value.serializer</span>}>
      {
        getFieldDecorator('value.serializer', {
          rules: []
        })(
          <Input placeholder='请输入输出名称'/>
        )
      }
    </FormItem>
    <FormItem label={<span className='label'>key.serializer</span>}>
      {
        getFieldDecorator('key.serializer', {
          rules: []
        })(
          <Input placeholder='请输入输出名称'/>
        )
      }
    </FormItem>
  </React.Fragment>
}
export default Form.create()(OutputToKafka)
