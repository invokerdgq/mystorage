import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";
import {cdn} from '@/consts/index'

import './user-item.scss'
export default class UserItem extends Component{
  static config = {
    addGlobalClass:true
  }
  static defauleProps = {
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
        <View>
          <View>{username}</View>
          <View>成功助力</View>
        </View>
        <View className='iconfont icon-dianzan'/>
        <View className='user-item-count'>助力<Text>{count}</Text></View>
      </View>
    )
  }
}
