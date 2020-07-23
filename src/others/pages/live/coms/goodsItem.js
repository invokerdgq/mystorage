import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"
import OwnOpacity from "../../../../components/own-opacity/own-opacity";
import './goodsItem.scss'
import {cdn} from "../../../../consts";

export default class GoodsItem extends Component{
  static options= {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View className='live-goods-item'>
        <View className='goods-img'>
          <Image mode='widthFix' className='img'/>
          <View className='order-contain'>
            <OwnOpacity
              containerClass='contain-order'
              renderTrue={
                <View className='order'>1</View>
              }
              renderHide={
                <View>1</View>
              }
            />
          </View>
        </View>
        <View className='goods-dec'>
          <Text className='goods_name'>测试测试测试测试测试测试测试测试</Text>
          <View className='more'>规格卖点</View>
          <View className='goods-footer'>
            <View className='goods-price'>￥125</View>
            <View className='buy'>马上抢</View>
          </View>
        </View>
      </View>
    )
  }
}
