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
    info: {list:[{name: '',base:{},config:{start_date:'---',end_date:'---'},data:[]}],name:''}
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
      remind:false
    }
  }
   componentDidMount() {
    const {list=[]} = this.props.info
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
  handleTimerChange = (index) =>{
    let obj;
   if(index === this.state.index){
      obj = {
       index:index,
       poi:{pos:index>=2?750/8+(index-2)*750/4:0},
       showTriangle: false,
       more:false,
       iconUp: false
     }
   }else{
      obj = {
       index:index,
        poi:{pos:index>=2?750/8+(index-2)*750/4:0},
       showTriangle: false,
       more:false,
       iconUp: false
     }
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
  handleScroll = (e) => {
     this.setState({
       showTriangle:false
     })
  }
  handleBuy =async (index,goodsIndex)=> {
    if(this.props.info.list[index].config.lastSeconds === 0 ||this.props.info.list[index].config.status === 'in_the_notice'){
      if(this.props.info.list[index].config.status === 'in_the_notice'){
        if(this.props.info.list[index].data[goodsIndex].is_remind == '1')return
          let option = {
            productId:this.props.info.list[index].data[goodsIndex].goodsId,
            seckillTime:this.props.info.list[index].config.lastSeconds,
            seckillId:this.props.info.list[index].config.seckillId
          }
          let err;
          try {
            await api.member.remind(option)
          }catch (e) {
            err = e
          }
          if(err){
            Taro.showToast({
              title:`${err.message}`,
              icon:'none',
              duration:1500
            })
          }else{
            Taro.showToast({
              title:'提醒成功',
              icon:'success',
              duration:1500
            })
            this.setState({
              remind:true
            })
          }
      }else{
        Taro.showToast({
          title:'抱歉，活动已经结束',
          icon:'none',
          duration:1500
        })
      }
    }else{
      let id = this.props.info.list[index].data[goodsIndex].goodsId
      Taro.navigateTo({
        url: `/pages/item/espier-detail?id=${id}`
      })
    }
}
refresh() {
    this.props.refresh()
}
  render() {
    const {list} = this.props.info
    const {Dec,index,showTriangle,iconUp,poi,allList} = this.state
    const config = this.props.info.list[index].config
    return(
      <View className='limit-container'>
        <View className='wgt__header'>
          <View className='wgt__title'>{list[0].base.title }</View>
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
            <View style={{display:'flex',flexDirection:'row',width:'100%'}}>
              {/*<View className='gap'>没有了~</View>*/}
              {/*  <View className='gap'/>*/}
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
                          <View className='activity-dec-start' id='start' >
                            <View className='activity-dec-start-s'>{item.config.start_date.split(' ')[0].split('-')[1]}月{item.config.start_date.split(' ')[0].split('-')[2]}日 {item.config.start_date.split(' ')[1]}</View>
                            <View className='activity-dec-start-title'>{item.config.status === 'in_sale'?'开抢中':'即将开抢'}</View>
                          </View>
                        </View>
                      }
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        <View className={`${showTriangle?'triangle-container':'triangle-container-none'}`} style={`left:${this.state.index <2?(2*this.state.index+1)*750/8 - 10:list.length-3<this.state.index?750-(list.length-1-this.state.index)*750/4-750/8-10:750/2-10}rpx`}>
          <View className='triangle' style={`border-top:solid 10rpx${list[this.state.index].config.status === 'in_sale'?'#c0534e':'#a0a0a0'}`}/>
        </View>
        <View className='timer-show'>
          {
            list[index].config.status === 'ended'?
             <Text>已结束</Text>:
              list[index].config.status === 'in_sale'?
                <View>
                  <Text className='timer-dec'>剩余</Text>
                  <AtCountdown
                    format={{ day: '天',hours: ':', minutes: ':', seconds: '' }}
                    isShowDay
                    day={calcTimer(list[index].config.lastSeconds).dd}
                    hours={calcTimer(list[index].config.lastSeconds).hh}
                    minutes={calcTimer(list[index].config.lastSeconds).mm}
                    seconds={calcTimer(list[index].config.lastSeconds).ss}
                    onTimeUp={this.refresh.bind(this)}
                  />
                </View>:
                <View>
                  <Text className='timer-dec'>即将开始</Text>
                  <AtCountdown
                    format={{ day: '天',hours: ':', minutes: ':', seconds: '' }}
                    isShowDay
                    day={calcTimer(list[index].config.lastSeconds).dd}
                    hours={calcTimer(list[index].config.lastSeconds).hh}
                    minutes={calcTimer(list[index].config.lastSeconds).mm}
                    seconds={calcTimer(list[index].config.lastSeconds).ss}
                    onTimeUp={this.refresh.bind(this)}
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
                          <View className={`limit-goods-detail-${goodsIndex === 0?'main':'other'}`}  style={{display:`${(this.state.more||goodsIndex === 0)?'block':'none'}`}}>
                            <View className='detail-img' onClick={item1.config.status === 'in_sale'?this.handleBuy.bind(this,index1,goodsIndex,item1.config.status):() =>{}}>
                              <Image src={goodsItem.imgUrl} className='img' mode='widthFix'/>
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
                                    <Text className='goods-sell-dec-num'>已售{goodsItem.fictitious_sales}件</Text>
                                  </View>
                                  <View className='goods-sell-dec-price-contain'>
                                    <Text className="price">￥<Text className="price-inner">{(goodsItem.act_price/100).toFixed(2)}</Text></Text>
                                    <Text className='market-price' >￥{(goodsItem.price/100).toFixed(2)}</Text>
                                    <Text className='speed-buy' onClick={this.handleBuy.bind(this,index1,goodsIndex,item1.config.status)}>{item1.config.status === 'ended'?'已结束':item1.config.status === 'in_sale'?'立即购买':goodsItem.is_remind == '1'?'已提醒':this.state.remind?'已提醒':'开抢提醒'}</Text>
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
