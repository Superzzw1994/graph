import KafkaSvg from '../../../assets/svgs/kafka.svg'
import FlinkSvg from '../../../assets/svgs/flink.svg'
import ToKafkaSvg from '../../../assets/svgs/toKafka.svg'
import ToSourceSvg from '../../../assets/svgs/toSource.svg'

const svgEnum = {
  Kafka: KafkaSvg,
  Flink: FlinkSvg,
  ToKafka: ToKafkaSvg,
  ToSource: ToSourceSvg
}
const dataNode = (G6) => {
  G6.registerNode('dataNode', {
    draw: (cfg, group) => {
      const {x, y, text, l, name, type} = cfg
      console.log(x, y)
      const keyShape = group.addShape('rect', {
        attrs: {
          width: 200,
          height: 100,
          x: 0,
          y: 0,
          fill: '#ffffff',
          stroke: '#CCCCCC',
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(55, 70, 95, 0.20)'
        },
        draggable: true,
        name: 'icon-box'
      })
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          text: l,
          fill: 'rgba(40, 47, 89, 0.8)',
          x: 0,
          y: 0,
          textAlign: 'center',
          fontSize: 12,
          fontFamily: 'Helvetica'
          //fontWeight: 600
        },
        draggable: true,
        name: 'text'
      })

      group.addShape('image', {
        attrs: {
          x: 0,
          y: 0,
          width: 30,
          height: 34,
          img: svgEnum[name],
          cursor: 'pointer',
        },
        draggable: true,
        name: 'icon'
      })

      return keyShape
    }
  }, 'rect')
}
export default dataNode
