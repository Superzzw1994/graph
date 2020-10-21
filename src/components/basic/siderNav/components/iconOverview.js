import React from 'react';
import basic from '../assets/icon/icon-jichujiankong.svg'
import cloud from '../assets/icon/icon-yunjiankong.svg'
import strategy from '../assets/icon/icon-jkcl.png'
import business from '../assets/icon/icon-yewujiankong.svg'
import application from '../assets/icon/icon-zhibiaotixi.svg'
import domm from '../assets/icon/icon-yingyongjiankong.svg'

const iconConf = {
    basic,
    strategy,
    business,
    application,
    domm,
    cloud
}
const iconOverview = (icon,active) => {
    return (
        <img src={iconConf[icon]} alt="icon"/>
    );
}
export default iconOverview;