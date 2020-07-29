import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"

import './recommend-item.scss'
export default class OwnRecommendItem extends Component{
  static defaultProps = {
    info:{
      room_name:'--',
      room_cover:''
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {room_name,room_cover} = this.props.info
    return(
      <View className='item'>
        <View className='item-bottom' >
          <View className='item-bottom-avatar'><Image className='img' mode='widthFix' src={room_cover}/></View>
          <View className='item-bottom-nick'>{room_name}</View>
        </View>
      </View>
    )
  }
}
