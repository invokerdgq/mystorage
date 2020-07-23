import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text, Image, Navigator, Button, Icon,Swiper,SwiperItem,Canvas} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";

import './vip-rule.scss'
export default class VipRule extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <View className='rule-desc'>
        <NavGap title='规则说明'/>
        <Image mode='widthFix' src='https://sxt-b-cdn.oioos.com/tupian/des.png' className='img'/>
      </View>
    )
  }
}
