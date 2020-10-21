import React, {useContext, useEffect, useReducer, useState} from 'react'
import {Checkbox, Divider, Form, Icon, Input, Select, Tabs} from "antd";
import BasicButton from "SRC_COMP/basic/BasicButton";
import CreateTag from "@/pages/Data/components/Flow/components/FlowSideBar/components/CreateTag";
import flowContext from "@/pages/Data/components/Flow/context";
import BasicScrollBar from "SRC_COMP/basic/BasicScrollBar";
import SettingFooter from "@/pages/Data/components/Flow/components/FlowSideBar/components/Footer";

const {TabPane} = Tabs;
const FormItem = Form.Item
const Option = Select.Option
const tagsData = {
  list: [],
  pageNum: 1,
  pageSize: 10,
  totalPage: 1
}
const tagsHandler = (state = tagsData, action) => {
  const {type, payload} = action
  if (type === 'INIT') {
    console.log(payload)
    return Object.assign({}, state, payload)
  } else if (type === 'MODIFY_PAGE_NUMBER') {
    return Object.assign({}, state, {pageNum: payload})
  }
  return state
}
const TabWrapper = props => {
  const {children, ...rest} = props
  return <div className='tabWrapper' {...rest}>
    <BasicScrollBar>
      <div className='tab'>
        {children}
      </div>
    </BasicScrollBar>
  </div>
}
const PageSetting = props => {
  const {form} = props
  const {dispatchFlow} = useContext(flowContext)
  const {getFieldDecorator, getFieldsValue} = form
  const [activeKey, setActiveKey] = useState('flowBaseInfo')
  const [addTagVisible, setAddTagVisible] = useState(false)
  const [tags, disPatchTags] = useReducer(tagsHandler, tagsData, (data) => data)
  useEffect(() => {
    // getTags().then(res => {
    //   if (res.status === 'success') {
    //     const {pages, list, pageNum} = res.data
    //     disPatchTags({
    //       type: 'INIT',
    //       payload: {
    //         list,
    //         pageNum,
    //         totalPage: pages
    //       }
    //     })
    //   }
    // })
  }, [])
  const closeTabs = () => {
    dispatchFlow({
      type: 'SET_SIDEBAR_TYPE',
      payload: ''
    })
  }
  const tabChange = (key) => {
    setActiveKey(key)
  }
  const addTag = () => {
    setAddTagVisible(prevState => !prevState)
  }
  const onSave = () => {
    console.log(getFieldsValue(), 'getFieldsValue')
  }
  return <Form className='pageSettingForm'><Tabs
    tabBarGutter={5}
    // animated={true}
    onChange={tabChange}
    activeKey={activeKey}
    tabBarExtraContent={
      <Icon type="close" className='closeBtn' onClick={closeTabs}/>
    }
  >
    <TabPane key='flowBaseInfo' tab={'流程基本信息'}>
      <TabWrapper>
        <FormItem label={<span className='label'>流程名称</span>} className='formItem'>
          {
            getFieldDecorator('flow', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Input/>
            )
          }
        </FormItem>
        <FormItem label={<span className='label'>选择标签</span>} className='tagsWrapper formItem'>
          {
            getFieldDecorator('tags', {
              rules: []
            })(
              <Select className='tags' placeholder='请选择标签'>
                {
                  (tags.list || []).map(tag => <Option value={tag.id} key={tag.id}>
                    {tag.name}
                  </Option>)
                }
              </Select>
            )
          }
          <BasicButton onClick={addTag}>新增</BasicButton>
        </FormItem>
        <FormItem label={<span className='label'>描述</span>} className='tagsWrapper'>
          {
            getFieldDecorator('description', {
              rules: []
            })(
              <Input.TextArea autoSize={{minRows: 6, maxRows: 6}}
              />
            )
          }
        </FormItem>
      </TabWrapper>
    </TabPane>
    <TabPane key='flowSetting' tab={'流程设置'}>
      <TabWrapper>
        <div className="title">
          重启策略配置
        </div>
        <FormItem label={<span className='label'>重启策略</span>} className='formItem'>
          {
            getFieldDecorator('a', {
              rules: [],
              initialValue: 'none'
            })(
              <Select>
                <Option value={'fix'}>固定间隔</Option>
                <Option value={'percent'}>失败比率</Option>
                <Option value={'none'}>不重启</Option>
              </Select>
            )
          }
        </FormItem>
        <div className="delayWrapper formItem">
          <FormItem label={<span className='label'>延迟间隔</span>} className='tagsWrapper delay'>
            {
              getFieldDecorator('delay', {
                rules: [],
                initialValue: 1
              })(
                <Input/>
              )
            }
          </FormItem>
          <FormItem className='delayInterval'>
            {
              getFieldDecorator('c', {
                rules: [],
                initialValue: 'min'
              })(
                <Select>
                  <Option value={'min'}>分钟</Option>
                  <Option value={'moment'}>秒</Option>
                </Select>
              )
            }
          </FormItem>
        </div>
        <FormItem label={<span className='label'>重启尝试次数</span>} className='formItem'>
          {
            getFieldDecorator('delayCount', {
              rules: []
            })(
              <Input/>
            )
          }
        </FormItem>
        <Divider/>
        <FormItem label={<span className='label'>检查点配置</span>} className='formItem'>
          {
            getFieldDecorator('checkPoint', {
              rules: [],
              valuePropName: 'checked'
            })(
              <Checkbox>开启检查点</Checkbox>
            )
          }
        </FormItem>
        <FormItem label={<span className='label'>模式</span>} className='formItem'>
          {
            getFieldDecorator('a', {
              rules: [],
              initialValue: 'exactly once'
            })(
              <Select>
                <Option value={'exactly once'}>精准一次</Option>
                <Option value={'At least once'}>至少一次</Option>
              </Select>
            )
          }
        </FormItem>
        <div className="delayWrapper formItem">
          <FormItem label={<span className='label'>间隔</span>} className='tagsWrapper delay'>
            {
              getFieldDecorator('checkDelay', {
                rules: [],
                initialValue: 1
              })(
                <Input/>
              )
            }
          </FormItem>
          <FormItem className='delayInterval'>
            {
              getFieldDecorator('checkInterVal', {
                rules: [],
                initialValue: 'min'
              })(
                <Select>
                  <Option value={'min'}>分钟</Option>
                  <Option value={'moment'}>秒</Option>
                </Select>
              )
            }
          </FormItem>
        </div>
        <div className="delayWrapper formItem">
          <FormItem label={<span className='label'>超时</span>} className='tagsWrapper delay'>
            {
              getFieldDecorator('overlay', {
                rules: [],
                initialValue: 1
              })(
                <Input/>
              )
            }
          </FormItem>
          <FormItem className='delayInterval'>
            {
              getFieldDecorator('overlayInterVal', {
                rules: [],
                initialValue: 'min'
              })(
                <Select>
                  <Option value={'min'}>分钟</Option>
                  <Option value={'moment'}>秒</Option>
                </Select>
              )
            }
          </FormItem>
        </div>
      </TabWrapper>
    </TabPane>
  </Tabs>
    {/*<div className="footer">*/}
    {/*  <BasicButton className='cancelBtn'>取消</BasicButton>*/}
    {/*  <BasicButton className='saveBtn'>保存</BasicButton>*/}
    {/*</div>*/}
    <SettingFooter onSave={onSave}/>
    <CreateTag
      addTagVisible={addTagVisible}
      setAddTagVisible={setAddTagVisible}
    />
  </Form>
}

export default Form.create()(PageSetting)
