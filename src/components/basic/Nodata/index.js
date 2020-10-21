import React from 'react'
import nodata from "SRC_ASSETS/images/logo-icon.svg";
import './assets/style/index.less'
import defaultNodata from "./assets/images/no-data.svg";
import noSearchResult from "./assets/images/no-search-result.svg";
import noTableData from "./assets/images/no-table-data.svg";
const typeImgEnum = {
    default: defaultNodata,
    noSearchResult: noSearchResult,
    noTableData: noTableData
}
const { project } = window.DATACENTERAPP
const Nodata = (props) => {
    let icon = nodata;
    if (props.type && typeImgEnum[props.type]) {
        icon = typeImgEnum[props.type]
    } else if (props.icon) {
        icon = props.icon
    }
    return (
        <div className={project + '-nodata'} style={props.style || {}}>
            <div className={project + '-nodata-content'}>
                <div className={project + '-nodata-img'}>
                    <img src={icon} alt="" />
                </div>
                <span>{props.desc ? props.desc : "暂无数据"}</span>
            </div>
        </div>
    )
}

export default Nodata
