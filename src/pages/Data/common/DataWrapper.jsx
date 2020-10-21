import React from 'react'
import classNames from 'classnames'
import './index.less'

const DataWrapper = props => {
  const {title, children, className} = props

  return <div className={classNames('dataWrapper', className)}>
    <div className="header">
      {title}
    </div>
    <div className="content">
      {children}
    </div>
  </div>
}

export default DataWrapper
