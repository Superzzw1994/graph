import React, {useContext, useEffect, useRef, useState} from 'react'
import BasicScrollBar from "SRC_COMP/basic/BasicScrollBar";
import Kafka from '../../assets/svgs/kafka.svg'
import Flink from '../../assets/svgs/flink.svg'
import ToKafka from '../../assets/svgs/toKafka.svg'
import ToSource from '../../assets/svgs/toSource.svg'
import {dragContext} from "@/pages/Data/components/Flow/components/FlowContent";

const Items = props => {
  const {children, title} = props
  return <div className='items'>
    <div className='title'>
      {title}
    </div>
    <div className='itemsContent'>
      {children}
    </div>
  </div>
}
const Item = (props) => {
  const {src, label, type, name} = props
  const [isUnmount, setIsUnmount] = useState(false)
  const item = useRef(null)
  const bBox = useRef(null)
  const {setDragPosition} = useContext(dragContext)
  const dragRef = useRef(null)
  const mouseDown = (e) => {
    setIsUnmount(false)
    const {x, y, width, height} = document.getElementById('flowContent').getBoundingClientRect()
    const {x: canvasX, y: canvasY, width: canvasWidth, height: canvasHeight} = document.getElementById('flowCanvas').getBoundingClientRect()
    bBox.current = {
      minX: x,
      maxX: x + width,
      minY: y,
      maxY: y + height,
      canvasMinX: canvasX,
      canvasMaxX: canvasX + canvasWidth,
      canvasMinY: canvasY,
      canvasMaxY: canvasY + canvasHeight
    }
    const {clientX, clientY} = e
    const dom = document.createElement('div')
    dom.className = `virtualDiv ${name}`
    dom.id = 'virtualDiv'
    dom.style.left = (clientX - 30) + 'px'
    dom.style.top = (clientY - 30) + 'px'
    item.current = dom
    document.getElementsByTagName('body')[0].appendChild(dom)
    window.addEventListener('mousemove', mouseMove)
    dom.addEventListener('mouseup', mouseUp)
  }
  const mouseMove = (e) => {
    const {minX, canvasMaxX, minY, canvasMaxY} = bBox.current
    const left = e.clientX - 30
    const top = e.clientY - 30
    item.current.style.left = left + 'px'
    item.current.style.top = top + 'px'
    // item.current.style.left = (left < minX ? minX : left > canvasMaxX - 60 ? canvasMaxX - 60 : left) + 'px'
    // item.current.style.top = (top < minY ? minY : top > canvasMaxY - 60 ? canvasMaxY - 60 : top) + 'px'
  }
  const mouseUp = e => {
    const dom = document.getElementById('virtualDiv')
    const {minX, canvasMaxX, canvasMinX, minY, canvasMaxY} = bBox.current
    const {clientX, clientY} = e
    if (dom) {
      if (canvasMinX < clientX && clientX < canvasMaxX && minY < clientY && clientY < canvasMaxY) {
        const {x, y} = dom.getBoundingClientRect()
        console.log(x, y)
        setDragPosition({x, y, clientX, clientY, type, name, l: label})
      }
    }
    window.removeEventListener('mousemove', mouseMove)
    setIsUnmount(true)
  }
  useEffect(() => {
    if (isUnmount) {
      const dom = document.getElementById('virtualDiv')
      dom.removeEventListener('mouseup', mouseUp)
      document.getElementsByTagName('body')[0].removeChild(dom)
    }
  }, [isUnmount])
  return <div className='item'>
    <div className="type" ref={dragRef} id={name} onMouseDown={mouseDown}>
      <img src={src}/>
    </div>
    <div className="label">{label}</div>
  </div>
}
const Nodes = (props) => {
  const {getDragProps} = props
  const itemPosition = useRef(null)
  const dom = useRef(null)
  return <div className='nodes' id='nodes' ref={dom}>
    <BasicScrollBar>
      <Items title='数据源'>
        <Item src={Kafka} label={'kafka数据源'} name={'Kafka'} type={'source'}/>
      </Items>
      <Items title='算子'>
        <Item src={Flink} label={'Flink SQL'} name={'Flink'} type={'operator'}/>
      </Items>
      <Items title='数据输出'>
        <Item src={ToKafka} label={'输出到Kafka'} name={'ToKafka'} type={'output'}/>
        <Item src={ToSource} label={'输出到数据列表'} name={'ToSource'} type={'output'}/>
      </Items>
    </BasicScrollBar>
  </div>
}

export default Nodes
