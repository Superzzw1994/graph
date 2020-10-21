import {omit} from "lodash-es";
import {useReducer} from "react";

const initData = {
  nodes: {},
  edges: {},
  nodeList: [],
  edgeList: [],
  selectedItem: '',
  sideBarType: ''
}
const flowHandler = (state, action) => {
  const {type, payload} = action
  if (type === 'CHANGE_NODE') {
    const {nodes, nodeList} = state
    const {id, attr} = payload
    const isContain = state.nodeList.includes(payload.id)
    return Object.assign({}, state, {
      nodeList: isContain ? nodeList.filter(node => node !== id) : nodeList.concat(id),
      nodes: isContain ? omit(nodes, id) : Object.assign({}, nodes, {
        [id]: attr
      })
    })
  } else if (type === 'SET_SELECT_ITEM') {
    return Object.assign({}, state, {...payload})
  } else if (type === 'SET_SIDEBAR_TYPE') {
    return Object.assign({}, state, {
      sideBarType: payload
    })
  }
  return state
}

const useFlowData = () => {
  const [flowData, dispatchFlow] = useReducer(flowHandler, initData, initData => initData)
  return {
    flowData,
    dispatchFlow
  }
}

export default useFlowData
