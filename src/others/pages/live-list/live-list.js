import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"
import NavGap from "../../../components/nav-gap/nav-gap";
import './live-list.scss'
import {cdn} from "../../../consts";

export default class LiveList extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View>
        <NavGap title='直播间列表'/>
        <View className='live-list'>

        </View>
      </View>
    )
  }
}
