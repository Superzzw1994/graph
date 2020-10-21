import React from 'react';
import SvgComp from 'SRC_COMP/basic/SvgComp'
import alertWorkspace from '../assets/images/alert-workspace.svgcomp.svg'
import alertWorkspaceHover from '../assets/images/alert-workspace-hover.svgcomp.svg'

const iconWorkspace = (active) => {
    return (
        <SvgComp comp={active ? alertWorkspaceHover : alertWorkspace}></SvgComp>
    );
}
export default iconWorkspace;
