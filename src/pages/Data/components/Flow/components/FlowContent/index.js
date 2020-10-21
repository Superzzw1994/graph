import React, {createContext, useContext, useState} from 'react'
import FlowSideBar from "@/pages/Data/components/Flow/components/FlowSideBar";
import FlowCanvas from "@/pages/Data/components/Flow/components/FlowCanvas";
import Nodes from "@/pages/Data/components/Flow/components/Nodes";
import flowContext from "@/pages/Data/components/Flow/context";
import {useUpdateEffect} from "ahooks";

export const dragContext = createContext(null)
const FlowContent = props => {
  const [dragPosition, setDragPosition] = useState(null)
  const {flowData, dispatchFlow} = useContext(flowContext)
  const {selectedItem, nodes, sideBarType} = flowData
  useUpdateEffect(() => {
  }, [flowData])
  return <dragContext.Provider value={{setDragPosition, dragPosition, flowData, dispatchFlow}}>
    <div className='flowContent' id={'flowContent'}>
      <Nodes/>
      <FlowCanvas/>
      <FlowSideBar/>
    </div>
  </dragContext.Provider>
}

export default FlowContent
