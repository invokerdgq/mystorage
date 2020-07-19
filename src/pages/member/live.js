import Taro, { Component } from '@tarojs/taro'
import {View,Image,LivePusher} from "@tarojs/components";

import OwnOpacity from "../../components/own-opacity/own-opacity";
import NavGap from "../../components/nav-gap/nav-gap";
import './live.scss'
export default class Live extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  back(){
    Taro.navigateBack()
  }
  render() {
    return(
      <View className='live'>
        {/*<NavGap title='我的直播间'/>*/}
        {/*<View className='live-container'>*/}
        {/*  <Image src='https://sxt-b-cdn.oioos.com/tupian/upgrade.png' mode='widthFix'></Image>*/}
        {/*</View>*/}
        <View className='live-header'>
          <View className='iconfont icon-dizhi'/><Text>杭州</Text><View className='iconfont icon-close' onClick={this.back.bind(this)}/>
        </View>
        <View className='live-body'>
          <OwnOpacity
          containerClass='live-body-bg'
          renderTrue={
            <View>
              <View className='live-body-title'>苏心淘直播</View>
              <View className='live-body-upload'></View>
              <View className='live-body-feature'></View>
            </View>
          }
          renderHide={
            <View>
              <View className='live-body-title'>苏心淘直播</View>
              <View className='live-body-upload'></View>
              <View className='live-body-feature'></View>
            </View>
          }
          >
          </OwnOpacity>
        </View>
        <View className='live-footer'>
           <View className='live-footer-list'>
             <View className='item'><View className='iconfont icon-reverse'/><Text>翻转</Text></View>
             <View className='item'><View className='iconfont icon-beauty'/><Text>美颜</Text></View>
             <View className='item'><View className='iconfont icon-filt'/><Text>滤镜</Text></View>
             <View className='item'><View className='iconfont icon-gouwucheman'/><Text>商品</Text></View>
           </View>
          <View className='live-footer-begin'>
            开始直播
          </View>
        </View>
        <LivePusher src=''></LivePusher>
      </View>
    )
  }
}
