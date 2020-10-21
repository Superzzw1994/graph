import React, {Component} from 'react';
import {antPrefix} from "@/config/antConfig"
import './assets/style/style.less'

class AevtHeader extends Component {
	/*constructor(props) {
		super(props)
	}*/

	render() {
		let {config,onChange} = this.props
		let {title="",timeRender} = config;
		return (
			<div className={`${antPrefix}-header clearBoth`}>
				<div className={`${antPrefix}-title`}>{title}</div>
				<div className={`${antPrefix}-time`}>
					{timeRender}
				</div>
			</div>
		)
	}
}

export default AevtHeader;
