/**
 *  Author: harry.lang
 *  Date: 17/3/14
 *  Description: Created by harrylang on 17/3/14.
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import './assets/style/style.less'
const {project} = window.DATACENTERAPP

class AevtBread extends Component {
    render() {
        const { items,separator=">" } = this.props;
        let breadItems = [];
        items.forEach((item,index)=>{
          breadItems.push(
            <Breadcrumb.Item key={index}>
              {
                item.link?
                  <span onClick={item.backClick instanceof Function?item.backClick:()=>{}}>
                    <Link to={item.link}>{item.label}</Link>
                  </span>
                :
                  item.label
              }
            </Breadcrumb.Item>
          )
        })
        return (
            <div className={project+"-bread-container"}>
                <Breadcrumb separator={separator}>
                    {breadItems}
                </Breadcrumb>
            </div>
        )
    }
}

export default AevtBread;
