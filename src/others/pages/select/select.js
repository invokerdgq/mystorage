import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'

import './select.scss'
export default class SelectGood  extends Component{
  constructor(props) {
    super(props);
    this.top = Taro.getStorageSync('top')
  }
  back(){
    Taro.navigateBack()
  }
  render() {
    return(
      <View className='select'>
        <View className='iconfont icon-arrow-left' style={{top:this.top+'px'}} onClick={this.back}/>
        <View className='select-header'><Image mode='widthFix' src={`${cdn}/invite-head.png`} className='img'/></View>
        <View className='select-content'>

        </View>
        <View className='select-footer'><Image mode='widthFix' src={`${cdn}/invite-foot.png`} className='img'/></View>
      </View>
    )
  }
}
