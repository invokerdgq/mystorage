import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Icon ,ScrollView} from '@tarojs/components'
import { calcTimer } from '@/utils'
import api from '@/api'
import {AtCountdown} from "taro-ui";

import './own-limit-kill.scss'


export default class WgtLimitKill extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps={
    info: {list:[{name: '',base:{},config:{start_date:'',end_date:''},data:[]}],name:''}
  }
  constructor(props) {
    super(props);
    this.state = {
      more:false,
      index:0,
      poi: {pos:0},
      showTriangle:true,
      iconUp:false,
      timer:[],
    }
  }
   componentDidMount() {
    const {list} = this.props.info
     let cur = -1
      if(list.length){
        for (let i = 0;i<list.length;i++) {
          if (list[i].config.status !== 'ended') {
            if(cur === -1){
              cur = i
            }
          }
        }
      }
     this.handleTimerChange(cur === -1?0:cur)
  }
  // setTimer(indexList){
  //   indexList.setInterval(() => {
  //
  //   },1000)
  // }
  handleTimerChange = (index) =>{
    let obj = {
      index:index,
      poi:{pos:index*750/4 + (750/8) -index-1},
      showTriangle: false,
      more:false,
      iconUp: false
    }
      this.setState(obj,() => {setTimeout(() => {
        this.setState({showTriangle:true})
      },500)})
  }
  handleMoreChange = () => {
    const {index,more} = this.state
    if(more){
      this.setState({
        more:!more,
        iconUp:!this.state.iconUp
      })
    }else{
      this.setState({
        more:!more,
        iconUp:!this.state.iconUp
      })
    }
  }
  handleScroll = () => {
     this.setState({
       showTriangle:false
     })
  }
  handleBuy =(index,goodsIndex)=> {
    if(this.props.info.list[index].config.lastSeconds === 0 ||this.props.info.list[index].config.status === 'notice'){
      Taro.showToast({
        title:`很抱歉，${this.props.info.list[index].config.status === 'ended'?'已经结束':'还未开始'}`,
        icon:'none',
        duration:1500,
        complete:() => {
          setTimeout(() => {Taro.hideToast()},3000)
        }
      })
    }else{
      let id = this.props.info.list[index].data[goodsIndex].goodsId
      Taro.navigateTo({
        url: `/pages/item/espier-detail?id=${id}`
      })
    }
}
refresh() {
    this.props.Refresh()
}
  render() {
    const {list} = this.props.info
    const {Dec,index,showTriangle,iconUp,poi,allList} = this.state
    const config = this.props.info.list[index].config
    // const timer = calcTimer(config.lastSeconds)
    return(
      <View className='limit-container'>
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
            <View className='gap'>没有了~</View>
              <View className='gap'/>
              {
                list.map((item,index) => {
                  return(
                    <View className='timer-content' onClick={this.handleTimerChange.bind(this,index)} style={{backgroundColor:index === this.state.index ?item.config.status === 'in_sale'?'#c0534e':'#a0a0a0':'white',color:index !== this.state.index?'black':'white'}}  >
                      {
                        item.config.status === 'ended'&&
                          <Text>已结束</Text>
                      }
                      {
                        item.config.status !== 'ended'&&
                          <View className='activity-dec'>
                            <ScrollView
                              className='scroll-activity'
                              scrollY
                              // scrollTop={topShow}
                              scrollWithAnimation= 'true'
                            >
                              <View className='activity-dec-start' id='start' >
                                <View className='activity-dec-start-s'>{item.config.start_date.split(' ')[0].split('-')[1]}月{item.config.start_date.split(' ')[0].split('-')[2]}日 {item.config.start_date.split(' ')[1]}</View>
                                <View className='activity-dec-start-title'>{item.config.status === 'in_sale'?'开抢中':'即将开抢'}</View>
                                {/*<View className='activity-dec-start-e'>{item.config.start_date.split(' ')[1]}</View>*/}
                              </View>
                              {/*<View className='activity-dec-end' id='end'>*/}
                              {/*  <Text className='activity-dec-end-title'>结束</Text>*/}
                              {/*  <Text className='activity-dec-end-s'>{item.config.end_date.split(' ')[0]}</Text>*/}
                              {/*  <Text className='activity-dec-end-e'>{item.config.end_date.split(' ')[1]}</Text>*/}
                              {/*</View>*/}
                            </ScrollView>
                          </View>
                      }
                    </View>
                  )
                })
              }
              <View className="gap"/>
              <View className='gap'>没有了~ </View>

          </ScrollView>
        </View>
        <View className={`${showTriangle?'triangle-container':'triangle-container-none'}`} >
          <View className='triangle' style={{'border-top-color':index === this.state.index ?list[this.state.index].config.status === 'in_sale'?'#c0534e':'#a0a0a0':'white'}}/>
        </View>
        <View className='timer-show'>
          {
            list[index].config.status === 'ended'?
             <Text>已结束</Text>:
              list[index].config.status === 'in_sale'?
                <View>
                  <Text>剩余</Text>
                  <AtCountdown
                    isShowDay
                    day={calcTimer(list[index].config.lastSeconds).dd}
                    hours={calcTimer(list[index].config.lastSeconds).hh}
                    minutes={calcTimer(list[index].config.lastSeconds).mm}
                    seconds={calcTimer(list[index].config.lastSeconds).ss}
                    onTimeUp={this.refresh}
                  />
                </View>:
                <View>
                  <Text>即将开始</Text>
                  <AtCountdown
                    isShowDay
                    day={calcTimer(list[index].config.lastSeconds).dd}
                    hours={calcTimer(list[index].config.lastSeconds).hh}
                    minutes={calcTimer(list[index].config.lastSeconds).mm}
                    seconds={calcTimer(list[index].config.lastSeconds).ss}
                    onTimeUp={this.refresh}
                  />
                </View>
          }
        </View>
        <View className='goods-desc'>
          {
            list.map((item1,index1) => {
              return (
                <View>
                  <View style={{display:`${index1 === this.state.index?'block':'none'}`}}>
                    {
                      item1.data.map((goodsItem,goodsIndex) => {
                        return(
                          <View className={`limit-goods-detail-${goodsIndex === 0?'main':'other'}`} onClick={this.handleBuy.bind(this,index1,goodsIndex)} style={{display:`${(this.state.more||goodsIndex === 0)?'block':'none'}`}}>
                            <View className='detail-img'>
                              <Image src={goodsItem.imgUrl}/>
                              <View className='other-img'>
                                <View className='goods-dec'>
                                  <View className='goods-dec-title'>{goodsItem.title}</View>
                                  {/*<View className='goods-dec-dec'>暂时需要添加的字段</View>*/}
                                  <View className='goods-tag'>
                                    <Text className='goods-tag-item'>限时秒杀</Text>
                                    {/*<Text className='goods-tag-item'>其他卖点</Text>*/}
                                  </View>
                                </View>
                                <View className='goods-sell-dec'>
                                  <View className='goods-sell-dec-num-contain'>
                                    {/*<Text className='goods-sell-dec-num'>售出件数</Text>*/}
                                  </View>
                                  <View className='goods-sell-dec-price-contain'>
                                    <Text className="price">￥<Text className="price-inner">{(goodsItem.act_price/100).toFixed(2)}</Text></Text>
                                    <Text className='market-price' >￥{(goodsItem.price/100).toFixed(2)}</Text>
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
                </View>
              )
            })
          }
        </View>
        <View style={{display:`${list[index].data.length <= 1?'none':'block'}`}}>
          <View className='more-toolbar'>
            <View className='more-toolbar-container' onClick={this.handleMoreChange}>
              <Text className='dec'>更多秒杀进行中</Text>
              <Icon className={`iconfont ${iconUp?'icon-arrow-up':'icon-arrow-down'}`}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
