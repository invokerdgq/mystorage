import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"

import OwnOpacity from "../../../../components/own-opacity/own-opacity";
import './room-item.scss'
export default class RoomItem extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      room_name:'测试测试',
      room_status:1,
      hot:500,
      room_cover:''
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {room_name,room_status,hot,room_cover} = this.props.info
    return(
      <View className='room-item'>
        <Image className='img' src={room_cover}/>
        <View className='content'>
          <View>
            <OwnOpacity
              renderTrue={
                <View className='dec-container'>
                  <View className='dot'></View>
                  <View className='status-dec'>{room_status == 1?'直播中':'未开播'}</View>
                </View>
              }
              renderHide={
                <View className='dec-container'>
                  <View className='dot'></View>
                  <View className='status-dec'>{room_status == 1?'直播中':'未开播'}</View>
                </View>
              }
              containerStyle={{
                background: 'rgba(0,0,0,0.3)',
                height: 34+'rpx',
                borderRadius: 17+'rpx',
                lineHeight:34+'rpx'
              }}
            />
          </View>
          <View className='user-dec'><Text className='user-name'>{room_name}</Text><View className='iconfont icon-hot'/><Text>{hot}</Text></View>
        </View>
      </View>
    )
  }
}
