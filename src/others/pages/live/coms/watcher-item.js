import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"

import './watcher-item.scss'
import {cdn} from "../../../../consts";
export default class WatcherItem extends Component{
  static options= {
    addGlobalClass:true
  }
  defaultProps = {
    info:{
      user_name:'测试'
    },
    rank:1,
    giveLike:0
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {rank,info,giveLike} = this.props
    let rankIcon
    switch (info.grade_name) {
      case '普通会员':
        rankIcon = 'icon-putong';
        break
      case '钻石会员':
        rankIcon = 'icon-zuanshi';
        break
      case '至尊会员':
        rankIcon = 'icon-zhizun';
        break
      case '王者身份':
        rankIcon = 'icon-wangzhe';
        break
      default :
        rankIcon = ''
    }
    return(
      <View className='watcher-item'>
        {
          rank&&
            <View className={`watcher-item-rank${rank}`}>{rank}</View>
        }
        <View className='avatar'>
          <Image mode='widthFix' className='img'/>
        </View>
        <Text className='user-name'>{info.user_name}</Text>
        <View className='sign'>
          <View className={`iconfont ${rankIcon}`}/><Text>{info.grade_name}</Text>
        </View>
        <View className='like'>{giveLike}</View>
      </View>
    )
  }
}
