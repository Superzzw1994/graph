import {Form, Input} from "antd";
import React from "react";
import BasicModal from "SRC_COMP/basic/BasicModal";

const CreateTag = Form.create()((props) => {
  const {form: {getFieldDecorator, validateFields}, setAddTagVisible, addTagVisible} = props
  const closeModal = () => {
    setAddTagVisible(false)
  }
  const onSave = () => {
    validateFields((error, values) => {
        console.log(values)
    })
  }
  return <BasicModal
    title='新建标签'
    visible={addTagVisible}
    footer={null}
    onCancel={closeModal}
    onSave={onSave}
  >
    <Form>
      <Form.Item label='标签名称'>
        {
          getFieldDecorator('tag', {
            rules: [
              {
                required: true,
                msg: '请输入标签名称'
              }
            ]
          })(
            <Input placeholder='请输入标签名称'/>
          )
        }
      </Form.Item>
    </Form>
  </BasicModal>
})

export default CreateTag
