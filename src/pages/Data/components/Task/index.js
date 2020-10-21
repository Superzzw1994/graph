import React, {useMemo, useState} from 'react'
import DataWrapper from '@/pages/Data/common/DataWrapper'
import TaskHeader from '@/pages/Data/components/Task/components/TaskHeader'
import BasicTable from 'SRC_COMP/basic/BasicTable'
import './assets/index.less'
import moment from 'moment'

const data = [
  {
    flow: 'zzw',
    createTime: 1602915598619,
    modifyTime: 1602915598619,
    type: 1,
    tags: '666',
    description: 'zzw is 666',
  },
]
const Task = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const columns = useMemo(() => {
    return [
      {
        title: '流程名称',
        dataIndex: 'flow',
        key: 'flow',
        align: 'left',
        width: '15%',
        render: (text, record) => {
          return (
            <div className="name">
              <div
                className="levelCircle"
                style={{background: 'green'}}
              ></div>
              {text}
            </div>
          )
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'left',
        width: '15%',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        align: 'left',
        width: '15%',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '流程类型',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        width: '10%',
        render: (text, record) => {
          return <div className="level">{text}</div>
        },
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        align: 'left',
        width: '15%',
        render: (text, record) => {
          return <div className="level">{text}</div>
        },
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        align: 'left',
        width: '15%',
        render: (text, record) => {
          return <div className="level">{text}</div>
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: 'left',
        width: '15%',
        render: (text, record) => {
          return (
            <div className="operates">
              <span className='start item'>启动</span>
              {/*<span>导出</span>*/}
              <span className='delete item'>删除</span>
            </div>
          )
        },
      },
    ]
  }, [])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    selectedRowKeys
  };
  return (
    <DataWrapper className="task" title="数据任务">
      <TaskHeader/>
      <div className="taskTable">
        <BasicTable rowSelection={rowSelection} columns={columns} pagination={true} data={data}/>
      </div>
    </DataWrapper>
  )
}

export default Task
