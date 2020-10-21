import React, {useState, useEffect, useLayoutEffect, memo} from 'react'
import {Select, Icon} from 'antd'

const pageSizeRange = [10, 20, 30]
const {Option} = Select
const BasicPagination = (props) => {
    const {
        count = 0,
        pageSize = 10,
        totalPage = 0,
        currentPage = 1,
        getList = () => {
        },
        pageCustom
    } = props

    return (
        <div className="basicPagination" {...pageCustom}>
            <span className="left">
                每页
                <Select value={pageSize} onChange={value => getList(value, 1)}>
                    {pageSizeRange.map((size) => (
                        <Option value={size} key={size}>
                            {`${size}条`}
                        </Option>
                    ))}
                </Select>
               共{count}条
            </span>
            <div className="right">
                <Icon
                    type="caret-left"
                    className="arrow"
                    onClick={() => {
                        if (currentPage !== 1) {
                            getList(pageSize, currentPage - 1)
                        }
                    }
                    }
                />
                {Array.from({length: totalPage}, (v, index) => index + 1).map((i) => {
                    if (i === 1 || i === totalPage || Math.abs(currentPage - i) < 4) {
                        return (
                            <span
                                key={i}
                                className={currentPage === i ? 'currentPage pageItem' : 'pageItem'}
                                onClick={() => getList(pageSize, i)}
                            >
                                {i}
                            </span>
                        )
                    } else if (Math.abs(currentPage - i) === 4) {
                        return (
                            <span key={i}>
                                ...
                            </span>
                        )
                    }
                })}
                <Icon
                    type="caret-right"
                    className="arrow"
                    onClick={() => {
                        currentPage !== totalPage && getList(pageSize, currentPage + 1)
                    }}
                />
            </div>
        </div>
    )
}

export default memo(BasicPagination)
