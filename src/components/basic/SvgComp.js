import React, { Component } from 'react';
import { Icon } from 'antd';
import {antPrefix,mainContainer} from "@/config/antConfig"

class SvgComp extends Component {
  render() {
    const Comp = this.props.comp
    const className = this.props.className || '';
    const disabled = this.props.disabled
    const onClick = this.props.onClick
    return (
      <Icon
        {...Object.assign({}, this.props, { comp: "" })}
        onClick={disabled ? () => { } : onClick}
        className={`${antPrefix}-icon ` + className + ` ${disabled ? `${antPrefix}-icon-disabled` : ''}`}
        component={() => <Comp className="icon-svg-comp" />}
      />
    );
  }
}

export default SvgComp;
