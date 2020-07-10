import Taro, { Component } from '@tarojs/taro'
import {View,Image,Icon} from "@tarojs/components";
import {cdn} from '@/consts/index'

import './user-item.scss'
export default class UserItem extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      imgUrl:'',
      username:'',
      count:0
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {imgUrl,username,count} = this.props.info
    return(
      <View className='user-item'>
        <View className='user-item-avatar'><Image src={imgUrl}/></View>
        <View className='user-item-dec'>
          <View className='username'>{username}</View>
          <View className='message'>成功助力</View>
        </View>
        <View className='zan'><Icon className='iconfont icon-zan'></Icon></View>
        <View className='user-item-count'>助力<Text className='mount'>{count}</Text>元</View>
      </View>
    )
  }
}
