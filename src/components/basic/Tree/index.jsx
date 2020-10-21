import React, {memo, useState, useMemo, useEffect} from 'react'

export const TreeNode = props => {
    const {node, ...rest} = props
    const {onExpand, loadData, expandKeys, selectedKeys, onSelected, icon, style} = rest
    const {children, isOnLoad, isLeaf, levelCount} = node
    const expandNode = (node) => {
        // debugger
        if (node.children.length) {
            onExpand(node)
        }
        if (isOnLoad && !expandKeys.includes(node._id)) {
            loadData(node)
        }
    }
    const selectedNode = (node) => {
        if (isLeaf) {
            onSelected(node);
        }
    }
    const classNames = useMemo(() => {
        const head = !isLeaf ? 'parentTreeNode' : 'treeNode'
        const isSelected = selectedKeys === node._id ? 'selected' : ''
        return `${head} ${isSelected}`
    }, [isLeaf, selectedKeys])
    return <React.Fragment>
        <div className={classNames} onClick={() => selectedNode(node)} style={style}>
            {
                icon ? <span className='switchIcon' onClick={() => expandNode(node)}
                             style={{visibility: children.length ? 'visible' : 'hidden'}}
                >
                    {icon}
        </span> : null
            }
            {props.children}
        </div>
    </React.Fragment>
}
export const Tree = props => {
    const {data, className, selectedNode, defaultExpand, defaultSelected, modifyExpandKeys, children, ...rest} = props
    const [expandKeys, setExpandKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState(null)
    useEffect(() => {
        if (defaultExpand) {
            setExpandKeys(prevState => {
                return Array.from(new Set(prevState.concat(defaultExpand)))
            })
        }
    }, [defaultExpand])
    useEffect(() => {
        if (defaultSelected) {
            selectedNode(defaultSelected)
            setSelectedKeys(defaultSelected._id)
        }
    }, [defaultSelected])
    useEffect(() => {
        modifyExpandKeys(expandKeys)
    }, [expandKeys])
    const onExpand = (node) => {
        setExpandKeys(prevState => prevState.includes(node._id) ? prevState.filter(selectedKey => selectedKey !== node._id) : prevState.concat(node._id)
        )
    }
    const onSelected = (node) => {
        setSelectedKeys(prevState => node._id)
        selectedNode(node)
    }
    return <div className={`customTree`}>{
        React.Children.map(children, child => React.cloneElement(child, {
            expandKeys,
            onSelected,
            onExpand,
            selectedKeys,
            ...rest
        }))
        // (data || []).map(node => <TreeNode node={node} key={node.id} expandKeys={expandKeys} onSelected={onSelected}
        //                                    onExpand={onExpand} {...rest} selectedKeys={selectedKeys}></TreeNode>)
    }</div>
}

// export  memo(Tree)