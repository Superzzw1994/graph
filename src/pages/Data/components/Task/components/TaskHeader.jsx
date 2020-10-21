import React from 'react'
import BasicButton from "SRC_COMP/basic/BasicButton";
import StopOrStart from "@/pages/Data/common/StopOrStart";
import {Input, Select} from "antd";
import {useHistory} from "react-router";

const Option = Select.Option
const Search = Input.Search
const TaskHeader = props => {
  const {push} = useHistory()
  const createFlow = () => {
    push('/dataCenter/flow')
  }
  return <div className='taskHeader'>
    <div className="left">
      <StopOrStart/>
      <Search placeholder='请输入流程名称' className='searchInput'/>
      <Select placeholder='按照标签搜索' className='searchTags'>
        <Option value='1'>1</Option>
      </Select>
    </div>
    <div className="right">
      <BasicButton className='headerBtn'>批量操作</BasicButton>
      {/*<BasicButton>导入</BasicButton>*/}
      <BasicButton className='createBtn' onClick={createFlow}>创建</BasicButton>
    </div>
  </div>
}

export default TaskHeader
