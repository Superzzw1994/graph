import React from 'react';
import SvgComp from 'SRC_COMP/basic/SvgComp'
import Add from './svg/dash-add.svgcomp.svg'
const IconDashAdd = ({...props})=>{
    return (
      <SvgComp {...props} comp={Add}></SvgComp>
    );
}
export default IconDashAdd;