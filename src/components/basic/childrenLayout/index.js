import React, {useRef, useState} from 'react'
import {Layout} from 'antd'
import BasicScrollBar from "SRC_COMP/basic/BasicScrollBar";
import Bread from './components/TopHeader'
import './assets/index.less'
import {antPrefix} from "@/config/antConfig";

export default function ChildrenLayout({...props}) {
    const {header, tree} = props
    let [collapsed, setCollapsed] = useState(false)
    const headerRef = useRef(document.getElementById('protalHeader'))

    const changeCollapsed = (bool) => {
        setCollapsed(bool)
    }
    return (
        <Layout className={`${antPrefix}-layout-main-contianer`}>
            <Bread header={header}/>
            <div className={`${antPrefix}-layout-main`}>
                {tree}
                <div
                    style={{
                        height: `calc(100vh - 60px - ${headerRef.current ? headerRef.current.clientHeight : 0}px)`,
                        width: '100%'
                    }}>
                    <BasicScrollBar>
                        <Layout
                            className={
                                collapsed
                                    ? `${antPrefix}-layout-content ${antPrefix}-layout-content-container ${antPrefix}-layout-content-container-collapsed`
                                    : `${antPrefix}-layout-content ${antPrefix}-layout-content-container`
                            }
                        >
                            {props.children}
                        </Layout>
                    </BasicScrollBar>
                </div>
            </div>
        </Layout>
    )
}
