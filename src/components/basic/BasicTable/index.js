import React, { useMemo, memo, forwardRef } from 'react'
import { Table, Icon, Modal } from 'antd'
import BasicPagination from './BasicPagination'
import Nodata from '../Nodata'
import './assets/index.less'

const BasicTable = (props, ref) => {
    const {
        data,
        isSearchResult,
        columns,
        pagination = false,
        tableCustom = {},
        style,
        className = '',
        wrapperClassName,
        wrapperStyle = {},
        ...rest
    } = props
    const classNames = useMemo(() => {
        return `basicList ${className}`
    }, [className])
    return data && data.length
        ? <div style={wrapperStyle} className={wrapperClassName ? wrapperClassName : ''}>
            <Table
                className={classNames}
                columns={columns}
                dataSource={data}
                pagination={false}
                style={style}
                rowKey={(record, index) => index}
                {...tableCustom}
                {...rest}
            />
            {pagination && rest.count ? <BasicPagination {...rest} /> : null}
        </div>
        : <Nodata
            style={style ? style : wrapperStyle ? wrapperStyle : null}
            type={isSearchResult ? "noSearchResult" : "noTableData"}
            desc={isSearchResult ? "搜索无结果" : '列表无数据'}
        />
}

export default memo(forwardRef(BasicTable))
