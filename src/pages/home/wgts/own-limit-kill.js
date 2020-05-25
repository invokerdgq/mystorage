import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Icon ,ScrollView} from '@tarojs/components'
import { calcTimer } from '@/utils'
import api from '@/api'

import './own-limit-kill.scss'


export default class WgtLimitKill extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultprops={
    info:null
  }
  constructor(props) {
    super(props);
    this.state = {
      Dec:[],
      more:false,
      index:0,
      poi: {pos:0},
      showTriangle:true,
      iconUp:false
    }
  }
  async componentDidMount() {
    //初始化 choiced
    //选中时 元素index+ 1
    const {list} = this.props.info
    let skId = list.reduce((pre,item,index) => {
      pre.push(item.config.seckillId)
      return pre
    },[])
    // let query = {
    //
    // }
    // await api.seckill.seckillList(query)
    // let skId = list.reduce((pre,item,index) => {
    //   if(item.config.lastSeconds){  pre.push(item.data[0].goodsId)}
    //   return pre
    // },[])
    // console.log('9999')
    // console.log(skId)
    // let totalData = await this.completeData(skId)
    // console.log('pppppppppppppppppppppppppppp')
    // console.log(totalData)
    this.setState({
      Dec:[this.props.info.list[0].data[0]],
    })
    this.handleTimerChange(2)
  }
  async  completeData (goodsIdList){
    let activityList = goodsIdList.reduce( (pre,item,index) => {
      let id = this.props.info.list[index].data[0].goodsId
      pre.push(api.item.detail(id,{}))
      return pre
    },[])
    return Promise.all(activityList)
  }
  handleTimerChange = (index) =>{
    console.log(index)
    let obj = {
      Dec:[this.props.info.list[index].data[0]],
      index:index,
      poi:{pos:750/8 +index*750/4},
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
  handleBuy =(index)=> {
    if(this.props.info.list[this.state.index].config.lastSeconds === 0){
      Taro.showToast({
        title:'很抱歉，活动已结束',
        icon:'none',
        duration:1500,
        complete:() => {
          setTimeout(() => {Taro.hideToast()},3000)
        }
      })
    }else{
      let id = this.state.Dec[index].goodsId
      Taro.navigateTo({
        url: `/pages/item/espier-detail?id=${id}`
      })
    }
}
  render() {
    const {list} = this.props.info
    const {Dec,index,showTriangle,iconUp,poi} = this.state
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
            scrollLeft={poi.pos +'rpx'}
            onScroll={this.handleScroll}
            scrollWithAnimation= 'true'
            enableFlex='true'
          >
              <View className='gap'/>
              <View className='gap'/>
              {
                list.map((item,index) => {
                  return(
                    <View className='timer-content' onClick={this.handleTimerChange.bind(this,index)} style={{backgroundColor:index === this.state.index?'#c0534e':'',color:index !== this.state.index?'black':'white'}}  >
                      {item.base.title + index}
                    </View>
                  )
                })
              }
              <View className='gap'/>
              <View className="gap"/>
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
                          <Text className='speed-buy' onClick={this.handleBuy.bind(this,index)}>立即购买</Text>
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
