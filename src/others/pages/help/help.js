import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import { AtCountdown } from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import OwnProgress from "../../../components";

import './help.scss'
export default class Help extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      info:{
        username:'少少'
      },
      goodsList:[
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0}
      ],
      userActivity:
        {
          userList:[
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0}
          ],
          inviteNumber:30,
          lastSeconds:7200,
          step:[2,5,10,18,28,40]
        }
    }
    this.top = Taro.getStorageSync('top')
  }
  back(){
    Taro.navigateBack()
  }
  render() {
    const {info,userActivity} = this.state
    return(
      <View>
      <View className='help-title' style={{top:this.top+'px'}}><View className='iconfont icon-arrow-left' onClick={this.back.bind(this)}/><View className='help-title-inner'>一元助力</View></View>
       <View className='help'>
         <View className='help-header'>
           <View className='help-header-userinfo'>
             <View className='help-header-userinfo-avatar'><Image src={info.avatar}/></View>
             <View className='help-header-userinfo-dec'>
               <View className='help-header-userinfo-dec-name'>{info.username}</View>
               <View className='help-header-userinfo-dec-help'>快来帮我助力吧~</View>
             </View>
           </View>
           <View className='help-header-activity'>
             <View className='help-header-activity-goods-img'><Image className='inner'/></View>
             <View className='help-header-activity-dec'>
               <View className='help-header-activity-dec-title'>苏心淘一元助力商品</View>
               <View className='help-header-activity-dec-dec'>助力成功后，可获得<Text className='gift'>新人大礼包</Text></View>
               <View className='help-header-activity-dec-number'>
                 <OwnProgress
                   height={28}
                   step={userActivity.step}
                   inviteNumber={userActivity.inviteNumber}
                   lastSeconds={userActivity.lastSeconds}
                 />
               </View>
             </View>
           </View>
           <View className='help-header-btn'><Image/></View>
         </View>
         <View className='help-body'></View>
       </View>
      </View>
    )
  }
}
