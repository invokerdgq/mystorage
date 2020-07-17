import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import S from '@/spx'
import api from '@/api'
import { AtCountdown } from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'

import './own-coupon.scss'
export default class OwnCoupon extends Component{
  static defaultProps = {
    info:{
      reduce_cost:'',
      card_num:2,
      least_cost:398,
      user_start_time:'',
      user_end_time:''
    }
  }
  constructor(props) {
    super(props);
    this.state = {
    }
  }
handleHome(){
    Taro.navigateTo({url:'/pages/index'})
}
  render() {
    const {info} = this.props
    return (
      <View className='coupon'>
        <View className='coupon-left'>
          <View className='top'>
            <Text className='cur'>￥</Text><Text className='total'>{Number(info.reduce_cost)/100}</Text> <Text className='discount'>满减优惠券x{info.card_num}张</Text>
          </View>
          <View className='middle'>满{Number(info.least_cost)/100}可用</View>
          <View className='bottom'>
            有效期:{info.user_start_time}-{info.user_end_time}
          </View>
        </View>
        <View className='coupon-right' >
          <View className='dash'/>
          <Image mode='widthFix' className='see' onClick={this.handleHome.bind(this)} src={`${cdn}/see.png`}/>
        </View>
      </View>
    )
  }
}
