import React, { useContext } from 'react'
import 'SRC_ASSETS/style/index.less'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const { project } = window.DATACENTERAPP

export default function Bread({ ...props }) {
  const { header, separator = '/' } = props
  let breadItems = []
  header.forEach((item, index) => {
    breadItems.push(
      <Breadcrumb.Item key={index}>
        {item.link ? (
          <span
            onClick={
              item.backClick instanceof Function ? item.backClick : () => {}
            }
          >
            <Link to={item.link}>{item.label}</Link>
          </span>
        ) : (
          <span>{item.label}</span>
        )}
      </Breadcrumb.Item>
    )
  })
  return (
    <div className={project + '-bread-container'}>
      <Breadcrumb separator={separator}>{breadItems}</Breadcrumb>
    </div>
  )
}
