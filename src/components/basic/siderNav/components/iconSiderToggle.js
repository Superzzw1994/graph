import React from 'react';
import {antPrefix} from "@/config/antConfig"
import SvgComp from 'SRC_COMP/basic/SvgComp'
import siderToggle from '../assets/images/sider-toggle.svgcomp.svg'
import siderToggleHide from '../assets/images/sider-toggle-hide.svgcomp.svg'
import '../assets/style/icon.less'

const iconSiderToggle = (hide) => {
    return (
        <SvgComp comp={hide ? siderToggleHide : siderToggle} className={`${antPrefix}-icon-sider-toggle`}></SvgComp>
    );
}
export default iconSiderToggle;
