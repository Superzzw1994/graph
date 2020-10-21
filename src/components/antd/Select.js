/**
 * Created by Happily on 19/6/21.
 */


import React, { Component } from 'react';
import { Select } from 'antd';


class aevtSelect  extends Component {
    render() {
        return (
            <Select {...this.props}  getPopupContainer={triggerNode => triggerNode.parentNode } />
        );
    }
}

export default aevtSelect;
