import React, {useContext, useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group";
import flowContext from "@/pages/Data/components/Flow/context";
import PageSetting from "@/pages/Data/components/Flow/components/FlowSideBar/components/PageSetting";
import OutputToKafka from "@/pages/Data/components/Flow/components/FlowSideBar/components/OutputToKafka";
import Kafka from "@/pages/Data/components/Flow/components/FlowSideBar/components/Kafka";
import Flink from "@/pages/Data/components/Flow/components/FlowSideBar/components/Flink";
import OutputToSource from "@/pages/Data/components/Flow/components/FlowSideBar/components/OutputToSource";

const FlowSideBar = props => {
  const {flowData} = useContext(flowContext)
  const [type, setType] = useState(null)
  const {sideBarType} = flowData
  const sideEnum = {
    page: <PageSetting name='page'/>,
    ToKafka: <OutputToKafka name='kafka'/>,
    Kafka: <Kafka name='outKa' typeList={[]}/>,
    Flink: <Flink name='flink'/>,
    ToSource: <OutputToSource name='toSource'/>,
  }
  useEffect(() => {
    if (sideBarType !== '') {
      setType(sideBarType)
    }
  }, [sideBarType])
  return <CSSTransition
    in={sideBarType !== ''}
    timeout={300}
    classNames='flowSideBar'
    onExited={() => {
    }}
    unmountOnExit
  >
    <div className='flowSide'>
      {
        sideEnum[type]
      }
    </div>
  </CSSTransition>
}

export default FlowSideBar
