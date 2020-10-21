import React from 'react';
import {antPrefix} from "@/config/antConfig"
import { ConfigProvider } from "antd";
import { IntlProvider } from 'react-intl';
import rootStore from '@/store/rootStore'
import zh_local from '@/lang/zh';
import en_local from '@/lang/en';
import zh_antd from 'antd/es/locale/zh_CN';
import en_antd from 'antd/es/locale/en_US';
import {inject, observer} from "mobx-react";
import 'intl'
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh-Hans-CN.js');

const lang = {
	zh: {
		antdLocale: zh_antd,
		intlLocale: "zh-Hans-CN",
		messageLocale:zh_local
	},
	en: {
		antdLocale: en_antd,
		intlLocale: "en",
		messageLocale:en_local
	},
};

const Language = ({children}) => {
	const {language} = rootStore;
	return (
		<ConfigProvider prefixCls={antPrefix} locale={lang[language].antdLocale}>
			<IntlProvider locale={lang[language].intlLocale} messages={lang[language].messageLocale}>
				{children}
			</IntlProvider>
		</ConfigProvider>
	)
}
export default observer(Language);
