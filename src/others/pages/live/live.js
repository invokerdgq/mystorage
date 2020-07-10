import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"

import './live.scss'
export default class Live extends Component{
  constructor(props) {
    super(props);
    this.state = {
      type:''
    }
    this.top = Taro.getStorageSync('top')
  }
  clickBack(){
    Taro.navigateBack()
  }
  render() {
    const {type} = this.state
    return(
      <View>
         <View className='iconfont icon-arrow-left' style={{top:this.top+'px'}} onClick={this.clickBack}/>
         <View className='live-view'>
           <Video className='live' src="https://sxt-b-cdn.oioos.com/tupian/ws.mp4" autoplay={true}
           />
         </View>
        <View className='data-view'>
          <View className='live-header'>
            <OwnOpacity
              containerClass={'test'}
              renderTrue={<View className='true'>我少美如画</View>}
              renderHide={<View>我少美如画</View>}>
            </OwnOpacity>
          </View>
          <View className='live-footer'>
            <View className='live-footer-user'>
              <View className='container'>
                <View className='iconfont icon-gouwucheman'/>
                <Text className='buy-dec'>XXXX正在去购买</Text>
              </View>
              <View className='content'>
                <View className='iconfont icon-gouwucheman'/>
                <Text className='buy-dec'>XXXX正在去购买</Text>
              </View>
            </View>
            <View className='live-footer-message'></View>
            <View className='live-footer-feature'>
              <View className='opc'>
                <View className='send-message'/>
                <Input type='text' placeholder='说点什么...' className='input' placeholderClass='holder'/>
              </View>
              <View className='more'>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-gouwucheman'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-xinaixin'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-zhuanfa'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-close'/>
                </View>
              </View>
            </View>
          </View>
          {
            type === 'live-detail'&&
              <View className='live-detail'>

              </View>
          }
          {
            type === 'watcher-detail'&&
              <View className='watcher-detail'>

              </View>
          }
          {
            type === 'cart-detail'&&
              <View className='cart-detail'>

              </View>
          }
        </View>
      </View>
    )
  }
}
