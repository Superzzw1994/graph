import React, {useState} from 'react'
import {antPrefix} from "@/config/antConfig"
import SiderNav from 'SRC_COMP/basic/siderNav'
import {Layout} from 'antd'
import {useLocation} from "react-router";

export const routeContext = React.createContext(null)
export default function CLayout({...props}) {
  let [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = (bool) => {
    setCollapsed(bool)
  }
  const [isVisibleSideNav, setIsVisibleSideNav] = useState(true)
  const location = useLocation()
  return (
    <routeContext.Provider value={{isVisibleSideNav, setIsVisibleSideNav}}>
      <Layout
        className={`${antPrefix}-layout-main-container`}
        style={{flexFlow: 'row wrap', flexDirection: 'row', height: '100%'}}
      >
        <SiderNav changeCollapsed={changeCollapsed}/> <Layout
        className={
          collapsed
            ? `${antPrefix}-layout-content ${antPrefix}-layout-content-container ${antPrefix}-layout-content-container-collapsed`
            : `${antPrefix}-layout-content ${antPrefix}-layout-content-container`
        }
      >
        {props.children}
      </Layout>
      </Layout>
    </routeContext.Provider>
  )
}
