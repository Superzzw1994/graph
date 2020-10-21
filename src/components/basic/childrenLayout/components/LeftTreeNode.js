import React, { useContext, useEffect, useState } from 'react'
import 'SRC_ASSETS/style/index.less'
import { Menu, Input, Icon, Tree, Tooltip } from 'antd'

const { Search } = Input

export default function LeftTreeNode({ ...props }) {
  const { leftTreeList, onLoad, getSelectItem } = props

  const gData = leftTreeList

  const getParentKey = (key, tree, value) => {
    let parentKey = []
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.name.indexOf(value) > -1)) {
          parentKey.push(node.id)
        } else if (getParentKey(key, node.children, value)) {
          parentKey.push(getParentKey(key, node.children, value))
        }
      }
    }
    return parentKey
  }
  const [expandedKeys, setExpandedKeys] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [treeSelectedItem, setTreeSelectedItem] = useState({})
  const treeItemChange = (item) => {
    if (item.children) {
      setExpandedKeys((prevState) => {
        return prevState.filter((i) => i === item.id).length
            ? prevState.filter((i) => i !== item.id)
            : [...prevState, item.id]
      })
      setAutoExpandParent((prevState) => !prevState)
    } else {
      setTreeSelectedItem(item)
    }
  }
  useEffect(() => {
      getSelectItem && getSelectItem(treeSelectedItem)
  }, [treeSelectedItem])
  if (!!leftTreeList && !!leftTreeList.length) {
    const onExpand = (expandedKeys) => {
      setExpandedKeys(expandedKeys)
      setAutoExpandParent((prevState) => !prevState)
    }

    const onChange = (e) => {
      const { value } = e.target
      let openKeys = []
      gData.forEach((item) => {
        openKeys = getParentKey(item.id, gData, value)
      })
      openKeys.filter((item, i, self) => item && self.indexOf(item) === i)
      setExpandedKeys(openKeys)
      setAutoExpandParent(true)
      setSearchValue(value)
    }
    const loop = (data) => {
      return data.map((item) => {
        const index = (item.name || '').indexOf(searchValue)
        const beforeStr = (item.name || '').substr(0, index)
        const afterStr = (item.name || '').substr(
            index + searchValue.length
        )
        const title =
            index > -1 ? (
                <div
                    className="tree_top_box"
                    onClick={() => {
                      treeItemChange(item)
                    }}
                >
                  <div className="tree_second_box">
                    <Tooltip title={item.name}>
                      <p
                          className={
                            treeSelectedItem.levelId === item.levelId
                                ? 'tree_top_box_item_select'
                                : ''
                          }
                      >
                        {beforeStr}
                        <span className="site-tree-search-value">
                      {searchValue}
                    </span>
                        {afterStr}
                      </p>
                    </Tooltip>
                  </div>
                  {!item.parentId ? null : (
                      <Icon
                          type="right"
                          className={
                            treeSelectedItem.id === item.id
                                ? 'tree_top_box_icon tree_top_box_item_select'
                                : 'tree_top_box_icon'
                          }
                      />
                  )}
                </div>
            ) : (
                <div
                    className="tree_second_box"
                    onClick={() => {
                      console.log(item,'item')
                      treeItemChange(item)
                    }}
                >
                  <Tooltip title={item.name}>
                    <p
                        className={
                          treeSelectedItem.levelId === item.levelId
                              ? 'tree_top_box_item_select'
                              : ''
                        }
                    >
                      {item.name}
                    </p>
                  </Tooltip>
                  {!item.parentId ? null : (
                      <Icon
                          type="right"
                          className={
                            treeSelectedItem.levelId === item.levelId
                                ? 'tree_top_box_icon tree_top_box_item_select'
                                : 'tree_top_box_icon'
                          }
                      />
                  )}
                </div>
            )
        if (item.children) {
          return { title, key: item.id, children: loop(item.children),levelId: item.id, }
        }

        return {
          title,
          key: item.id,
          id: item.levelId,
          levelId: item.id,
        }
      })
    }
    return (
        <div className={'left_tree_box'}>
          <Search
              style={{ marginBottom: 8 }}
              placeholder="Search"
              onChange={onChange}
          />
          <Tree
              loadData={(treeNode) => onLoad(treeNode)}
              showIcon={true}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={false}
              treeData={loop(gData)}
              switcherIcon={
                <Icon type="down-circle" style={{ fontSize: '16px' }} />
              }
          />
        </div>
    )
  } else {
    return null
  }
}