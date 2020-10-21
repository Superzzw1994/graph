import React, {Component} from 'react'
import {antPrefix} from "@/config/antConfig"
import {Icon, Menu, Layout, Button, Row} from 'antd'
import {menuConfig} from './config/siderNav'
import './assets/style/style.less'
import iconSiderToggle from './components/iconSiderToggle'
import rootStore from '@/store/rootStore'
import BasicScrollBar from "SRC_COMP/basic/BasicScrollBar";

const {Sider} = Layout
const {SubMenu} = Menu
const {PATH_PREFIX, isCheckAuth} = window.DATACENTERAPP

// const {rbac,checkMenuAuth} = rootStore
class siderNav extends Component {
    routeKeys = []
    state = {
        collapsed: false,
        selectedKeys: [],
        openKeys: [],
    }
    protalHeader = null

    componentDidMount() {
        this.setSelectedKeys()
        this.protalHeader = document.getElementById('protalHeader')
        window.addEventListener('hashchange', this.setSelectedKeys)
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.setSelectedKeys)
    }

    checkAuth = (menu) => {
        if (isCheckAuth) {
            if (menu.check) {
                return rootStore.checkMenuAuth(menu.id)
            } else {
                return true
            }
        } else {
            return true
        }
    }

    setSelectedKeys = () => {
        const hash = window.location.hash
        this.routeKeys = []
        this.getSelectedKeys(menuConfig)
        const openKeys = menuConfig.reduce((t, c) => {
            if (this.routeKeys.includes(c.key)) {
                return t.concat(c.key)
            }
            return t
        }, [])
        this.setState({
            selectedKeys: this.routeKeys,
            openKeys,
        })
    }
    getSelectedKeys = (arr) => {
        if (arr && arr.length) {
            const hash = window.location.hash
            ;(arr || []).forEach((item) => {
                if (
                    hash &&
                    hash.includes(`${item.key}`) &&
                    this.routeKeys.indexOf(item.key) == -1
                ) {
                    this.routeKeys.push(item.key)
                }
                if (item && item.children && item.children.length) {
                    this.getSelectedKeys(item.children)
                }
            })
        }
    }
    menuClick = (e) => {
        window.location.href = `/#${e.key}`
    }
    onCollapse = () => {
        // lusty-test：测试更新权限，菜单渲染
        // rootStore.changeRbac(["report_manage","report_dashboard","algorithm_manage","algorithm_type"])
        const collapsed = !this.state.collapsed
        this.setState(
            {
                collapsed: collapsed,
            },
            () => {
                this.props.changeCollapsed(collapsed)
            }
        )
    }
    renderMenu = (arr) => {
        if (arr && arr.length) {
            return arr.map((item) => {
                let active = this.state.selectedKeys.includes(item.key)
                if (
                    item &&
                    item.children &&
                    item.children.length &&
                    this.checkAuth(item)
                ) {
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                  {/*{active ? item.iconActive : item.icon}*/}
                                    {item.icon ? item.icon : null}
                                    <span className={`${antPrefix}-sider-text`}>{item.title}</span>
                </span>
                            }
                        >
                            {this.renderMenu(item.children)}
                        </SubMenu>
                    )
                }
                if (this.checkAuth(item)) {
                    return (
                        <Menu.Item key={item.key}>
                            {/* {active ? item.iconActive : item.icon} */}
                            {item.icon ? item.icon : null}
                            <span className={`${antPrefix}-sider-text`}>{item.title}</span>
                        </Menu.Item>
                    )
                } else {
                    return null
                }
            })
        }
        return null
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        )
        if (
            menuConfig
                .map((i) => i.key)
                .filter(Boolean)
                .indexOf(latestOpenKey) === -1
        ) {
            this.setState({openKeys})
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                className={`${antPrefix}-sider-nav`}
            >
                {/* <Row className={`${antPrefix}-trigger-container`}>
          <div className={`${antPrefix}-trigger-btn`} onClick={this.onCollapse}>
            {iconSiderToggle(this.state.collapsed)}
          </div>
        </Row> */}
                {/*<div id={'protalHeader'} style={{width: '100px', height: '100px'}}></div>*/}
                <div
                    style={{height: `calc(100vh - 50px - ${this.protalHeader ? this.protalHeader.clientHeight : 0}px)`}}>
                    <BasicScrollBar>
                        <Menu
                            selectedKeys={this.state.selectedKeys}
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            mode="inline"
                            // theme="dark"
                            className={`${antPrefix}-sider-menu`}
                            onClick={this.menuClick}
                            inlineIndent={20}
                        >
                            {this.renderMenu(menuConfig)}
                        </Menu>
                    </BasicScrollBar>
                </div>

                <div className={`${antPrefix}-trigger-btn`} onClick={this.onCollapse}>
                    {iconSiderToggle(this.state.collapsed)}
                </div>
            </Sider>
        )
    }
}

export default siderNav
