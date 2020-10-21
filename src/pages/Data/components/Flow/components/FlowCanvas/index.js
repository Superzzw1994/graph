import React, {useContext, useEffect, useRef} from 'react'
import G6 from '@antv/g6'
import {dragContext} from "@/pages/Data/components/Flow/components/FlowContent";
import {useUpdateEffect} from "ahooks";
import {guid} from "@/utils/util";
import registerNodes from './nodes'
import flowContext from "@/pages/Data/components/Flow/context";

let graph = null
registerNodes(G6)
const FlowCanvas = props => {
  const {attr} = props
  const {dragPosition} = useContext(dragContext)
  const {flowData, dispatchFlow} = useContext(flowContext)

  const {nodeList, nodes, edges, edgeList} = flowData
  const g6Dom = useRef(null)
  const bindEvent = () => {
    graph.on('node:click', nodeClick)
    graph.on('canvas:click', canvasClick)
    graph.on('canvas:mouseup', canvasMouseUp)
    graph.on('canvas:dragstart', canvasDrag)
  }
  const unbindEvent = () => {
    graph.off('node:click', nodeClick)
    graph.off('canvas:click', canvasClick)
    graph.on('canvas:mouseup', canvasMouseUp)
  }
  const nodeClick = (e) => {
    dispatchFlow({
      type: 'SET_SELECT_ITEM',
      payload: {
        selectedItem: e.item._cfg.id,
        sideBarType: e.item._cfg.model.name
      }
    })
  }
  const canvasMouseUp = (e) => {
    console.log(graph.getZoom())
  }
  const canvasDrag = (e) => {
    console.log(e)
    debugger
  }
  const canvasClick = (e) => {
    console.log(graph.getNodes())
    dispatchFlow({
      type: 'SET_SELECT_ITEM',
      payload: {
        selectedItem: '',
        sideBarType: ''
      }
    })
  }
  // const mouseEnter = (e) => {
  //   const {clientX, clientY} = e
  //   console.log(clientX, clientY)
  // }
  useEffect(() => {
    if (!graph) {
      const {clientWidth, clientHeight} = g6Dom.current
      graph = new G6.Graph({
        container: g6Dom.current,
        width: clientWidth,
        height: clientHeight,
        modes: {
          default: ['drag-node', 'drag-canvas'],
        },
        defaultNode: {
          type: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 12,
            },
          },
          style: {
            stroke: '#72CC4A',
            width: 150,
          },
        },
        defaultEdge: {
          type: 'polyline',
        },
      })
      bindEvent()
    }
    return () => {
      unbindEvent()
      graph = null
    }
  }, [])
  useUpdateEffect(() => {
    const {x, y, clientX, clientY, type, name, l} = dragPosition
    const {left, top} = g6Dom.current.getBoundingClientRect()

    // const point = graph.getPointByClient(x, y)
    // const canvasXY = graph.getCanvasByPoint(point.x, point.y);
    //
    // console.log(x, y, clientX, clientY)
    // console.log(point, 'point')
    // console.log(canvasXY)
    // console.log(clientX, clientY)
    console.log(clientX - left, clientY - top)
    const id = guid()
    dispatchFlow({
      type: 'CHANGE_NODE',
      payload: {
        id,
        attr: {
          id,
          x: clientX - left,
          y: clientY - top,
          text: type,
          type: 'dataNode',
          name,
          l
        }
      }
    })
  }, [dragPosition])
  useEffect(() => {
    console.log(nodes, 'flowData')
    const data = {
      nodes: nodeList.map(id => nodes[id]),
      edges: edgeList.map(id => edges[id]),
    }
    graph.data(data)
    graph.render()
  }, [nodes, edges])
  return <div className='flowCanvas' {...attr} ref={g6Dom} id={'flowCanvas'}>
  </div>
}

export default FlowCanvas
