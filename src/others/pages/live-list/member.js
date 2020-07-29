import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image,ScrollView} from "@tarojs/components"
import NavGap, {Loading} from "../../../components";
import './member.scss'
import {cdn} from "../../../consts";
export default class LiveMember extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      attendList:[
        {user_name:'pppp'},
        {user_name:'pppp'},
        {user_name:'pppp'}, {user_name:'pppp'},
        {user_name:'pppp'}, {user_name:'pppp'}, {user_name:'pppp'}
      ]
    }
  }
  render() {
    const {attendList} = this.state
    return(
      <View className='live-member'>
        <NavGap title='我的' bg={'#c0534e'} cl={'white'}/>
        <View className='live-member-content'>
          <View className='live-member-header'>
            <View className='user-info'>
              <View className='avatar'><Image mode='widthFix' className='img'/></View>
              <View className='dec'>
                <View className='user-name'>用户名</View>
                <View className='user-grade'><Image mode='widthFix' className='img'/><Text>钻石会员</Text></View>
              </View>
            </View>
          </View>
          <View className='live-member-footer'>
            <View className='order'>
              <View className='order-dec'>我的订单</View>
              <View className='order-type'>
                <View className='order-type-item'><View className='iconfont icon-daifukuan'/><Text className='dec'>待付款</Text></View>
                <View className='order-type-item'><View className='iconfont icon-daishouhuo'/><Text className='dec'>待收货</Text></View>
                <View className='order-type-item'><View className='iconfont icon-jiuzhouyiwancheng'/><Text className='dec'>已完成</Text></View>
                <View className='order-type-item'><View className='iconfont icon-shouhou'/><Text className='dec'>售后</Text></View>
              </View>
            </View>
            <View className='live-member-footer-content'>
              <Image mode='widthFix' className='vip-img' src={`${cdn}/vip-buy.png`}/>
              <View className='user-attend'>
                <View className='user-attend-dec'>
                  <View className='left'>我关注的主播</View>
                  <View className='right'>查看全部 ></View>
                </View>
                <View className='user-attend-list'>
                  {
                    attendList.map((item,index) => {
                            return (
                              <View className='list-item'>
                                <View className='avatar'><Image mode='widthFix' className='img'/></View>
                                <Text className='user-name'>{item.user_name}</Text>
                              </View>
                            )
                          })
                  }
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
