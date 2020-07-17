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
      help_user_name:'',
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {help_user_headimgurl,help_user_name} = this.props.info
    return(
      <View className='user-item'>
        <View className='user-item-avatar'><Image src={help_user_headimgurl}/></View>
        <View className='user-item-dec'>
          <View className='username'>{help_user_name}</View>
          <View className='message'>成功助力</View>
        </View>
        <View className='zan'><View className='iconfont icon-zan'></View></View>
        <View className='user-item-count'>助力成功</View>
      </View>
    )
  }
}
