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
      mission:55,
      number:2,
      total:398,
      endDate:'2020-6-17 -2020-6-30'
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
            <Text className='cur'>￥</Text><Text className='total'>{info.mission}</Text> <Text className='discount'>满减优惠券x{info.number}张</Text>
          </View>
          <View className='middle'>满{info.total}可用</View>
          <View className='bottom'>
            有效期:{info.endDate}
          </View>
        </View>
        <View className='coupon-right' >
          <Image mode='widthFix' className='see' onClick={this.handleHome.bind(this)}/>
        </View>
      </View>
    )
  }
}
