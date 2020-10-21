/*
*aevt
	Message({
		config:{duration: 3},
		level:'error',
		content:'返回根节点到指定节点路线',
		duration:1,
		onClose:()=>{
			console.log("onClose");
		},
		afterClose:()=>{
			console.log("afterClose");
			Message({
				level:'success',
				content:'显示修改路径弹层',
				duration:2
			})
		}
	})
*/
import {mainContainer,antPrefix} from "@/config/antConfig"
import { message } from 'antd';
import './styles/message.less'
const privateConfig = {
    prefixCls:`${antPrefix}-message`,
    getContainer:()=>{return document.getElementById(mainContainer)},
		top : document.getElementById(antPrefix) ? 10 : 60
}
const aevtMessage = ({config={},level,content,duration,onClose,afterClose})=>{
		let _config = Object.assign({},privateConfig,config)
    message.config(_config)
    return message[level](content, duration, onClose).then(afterClose)
}
export default aevtMessage
