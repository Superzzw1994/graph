import React from 'react'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane
const BasicTabPaneTitle = (props) => {
  return <div className='BasicTabPaneTitle'>
    {props.children}
  </div>
}
const BasicTab = props => {
  const {children, ...rest} = props
  return <Tabs {...rest}>
    {children.map((child, index) => {
      console.log(child, 'cjild')
      const {tab = null, id = null} = child.props
      return <TabPane tab={tab ? <BasicTabPaneTitle>{tab}</BasicTabPaneTitle> : index}
                      key={id ? id : index}
      >
        {
          React.Children.map(child, c => c)
        }
      </TabPane>
    })}
  </Tabs>
}

export default BasicTab
