import React from 'react';
import localStorage from 'SRC_UTILS/localStorage'
import {antPrefix,mainContainer} from "@/config/antConfig"
import {observer} from "mobx-react";
import styles from './assets/style/style.less'
import {Select} from "antd";
import rootStore from "@/store/rootStore";
const { Option } = Select;

const Theme = ({...props}) => {
	const {theme,changeTheme} = rootStore;
	const themeChange = value => {
		let bodyEl = document.querySelector("body");
		bodyEl.setAttribute("data-theme", value);
		localStorage.setItem('theme',value)
		changeTheme(value)
	};

	let defaultTheme = localStorage.getItem("theme") || window.DATACENTERAPP.defaultTheme;
	changeTheme(defaultTheme)

	let themeStr = process.env["REACT_APP_theme"];
	let themes = [];
	if (themeStr) {
		themes = themeStr.split(";");
	}

	return (
		<div className={`${antPrefix}-theme`}>
			<Select
				defaultValue={defaultTheme}
				style={{ width: 120 }}
				onChange={themeChange}
			>
				{themes.map(item => {
					return (
						<Option key={item} value={item}>
							{item}
						</Option>
					);
				})}
			</Select>
		</div>
	)

}

export default observer(Theme);
