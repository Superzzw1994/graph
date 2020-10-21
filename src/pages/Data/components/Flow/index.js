import React from 'react'
import FlowHeader from "@/pages/Data/components/Flow/components/FlowHeader";
import FlowContent from "@/pages/Data/components/Flow/components/FlowContent";
import flowContext from "@/pages/Data/components/Flow/context";
import './assets/index.less'
import useFlowData from "@/pages/Data/components/Flow/Hooks/useFlowData";

const Flow = props => {
  const {form} = props
  const {
    flowData,
    dispatchFlow
  } = useFlowData()
  return <flowContext.Provider value={{
    form,
    flowData,
    dispatchFlow
  }}>
    <div className='flow' id='flow'>
        <FlowHeader/>
        <FlowContent/>
    </div>
  </flowContext.Provider>
}

export default Flow
