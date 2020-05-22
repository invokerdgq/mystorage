import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Icon ,ScrollView} from '@tarojs/components'
import { calcTimer } from '@/utils'

import './own-limit-kill.scss'

// head 样式将原来的 改掉 统一下
export default class WgtLimitKill extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      Dec:[],
      more:false,
      index:0,
      poi:'poi-0',
      showTriangle:true,
      iconUp:false
    }
  }
  componentDidMount() {
    //初始化 choiced
    //选中时 元素index+ 1
    this.setState({
      Dec:[this.props.info.list[0].data[0]],
    })
  }
  handleTimerChange = (index) =>{
    let obj = {
      Dec:[this.props.info.list[index].data[0]],
      index:index,
      poi:`poi-${index}`,
      showTriangle: false
    }
      this.setState(obj,() => {setTimeout(() => {
        this.setState({showTriangle:true})
      },500)})
  }
  handleMoreChange = () => {
    const {index,more} = this.state
    if(more){
      this.setState({
        Dec:this.props.info.list[index].data,
        more:!more,
        iconUp:true
      })
    }else{
      this.setState({
        Dec:[this.props.info.list[index].data[0]],
        more:!more,
        iconUp:false
      })
    }
  }
  handleScroll = () => {
     this.setState({
       showTriangle:false
     })
  }
  render() {
    const {list} = this.props.info
    const {Dec,index,showTriangle,iconUp} = this.state
    const config = this.props.info.list[index].config
    const timer = calcTimer(config.lastSeconds)
    return(
      <View>
        <View className='wgt__header'>
          <View>{list[0].base.title }</View>
          <View className='wgt__subtitle'>{list[0].base.subtitle}</View>
        </View>
        <View className='timer-controller'>
          <ScrollView
            className='timer-scroll'
            scrollX
            onScroll={this.handleScroll}
            scrollWithAnimation= 'true'
            enableFlex='true'
            scrollIntoView={this.state.poi}
          >
              <View className='gap' id='poi-0'/>
              <View className='gap' id='poi-1'/>
              {
                list.map((item,index) => {
                  return(
                    <View className='timer-content' onClick={this.handleTimerChange.bind(this,index)} style={{backgroundColor:index === this.state.index?'#c0534e':'',color:index !== this.state.index?'black':'white'}} id={`poi-${index+2}`} >
                      {item.base.title + index}
                    </View>
                  )
                })
              }
              <View className='gap' id={`poi-${list.length+1}`}/>
              <View className="gap" id={`poi-${list.length+2}`}/>
          </ScrollView>
        </View>
        <View className={`${showTriangle?'triangle-container':'triangle-container-none'}`}>
          <View className='triangle'/>
        </View>
        <View className='timer-show'>
          {config.lastSeconds === 0?'活动已结束':`剩余时间 ${timer.dd}天 ${timer.hh}:${timer.mm}:${timer.ss}`}
        </View>
        <View className='goods-desc'>
          {
            Dec.map((item,index) => {
              return(
                <View className={`limit-goods-detail-${index === 0?'main':'other'}`}>
                  <View className='detail-img'>
                     <Image src={item.imgUrl}/>
                    <View className='other-img'>
                    <View className='goods-dec'>
                      <View className='goods-dec-title'>{item.title}</View>
                      <View className='goods-dec-dec'>暂时需要添加的字段</View>
                    <View className='goods-tag'>
                        <Text className='goods-tag-item'>限时秒杀</Text>
                        <Text className='goods-tag-item'>其他卖点</Text>
                    </View>
                    </View>
                    <View className='goods-sell-dec'>
                      <View className='goods-sell-dec-num-contain'>
                        <Text className='goods-sell-dec-num'>售出件数</Text>
                      </View>
                      <View className='goods-sell-dec-price-contain'>
                          <Text className="price">￥<Text className="price-inner">{(item.act_price/100).toFixed(2)}</Text></Text>
                          <Text className='market-price' >￥{(item.price/100).toFixed(2)}</Text>
                          <Text className='speed-buy'>立即购买</Text>
                      </View>
                    </View>
                   </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className='more-toolbar'>
          <View className='more-toolbar-container' onClick={this.handleMoreChange}>
            <Text className='dec'>更多秒杀进行中</Text>
            <Icon className={`iconfont ${iconUp?'icon-arrow-up':'icon-arrow-down'}`}/>
          </View>
        </View>
      </View>
    )
  }
}
