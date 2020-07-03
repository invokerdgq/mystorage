import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import {AtCountdown} from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import GoodsItem  from './coms/goods-item'

import './invite-activity.scss'
import ActivityItem from "./coms/activity-item";
export default class InviteActivity extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      goodsList:[
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0}
        ],
      activityList:[
        {
          userList:[
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0},
            {imgUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMibfJiaefDHTRwCbjpQKRDvzhNu9INUEiaCcDicic5mmpnF1NIFwWQbpZGh3xdcK7xAjuBEnhibB1kvwQ/132',username:'--',count:0}
          ]
        }
      ]
    }
    this.top = Taro.getStorageSync('top')
  }
  componentDidMount() {

  }
  back(){
    Taro.navigateBack()
  }
  handleClickItem() {

  }
  render() {
    const {goodsList,activityList}= this.state
    return(
      <View>
        <View className='iconfont icon-arrow-left' style={`top:${this.top}px`} onClick={this.back}/>
        <Image src={`${cdn}/invite-head.png`} mode='widthFix' className='bg-img'/>
        <View className='invite-act-content'>
        <View className='activity-list'>
            <ActivityItem
            activityInfo={activityList[0]}
            />
        </View>
          <ScrollView
          scrollY
          enableFlex={true}
          className='goods-scroll'
          >
            {
              goodsList.map((item,index) => {
                return(
                  <GoodsItem
                  info={item}
                  onclick={this.handleClickItem.bind(this,item)}
                  />
                )
              })
            }
          </ScrollView>
        </View>
        <View className='rule'>
          <View className='rule-title'><Text className='line'/> 活动规则 <Text className='line'/></View>
          <View className='rule-content'>
            <View className='rule-item'>1、如未完成拉新但商品已无,助力人数可平移至其他商品;</View>
            <View className='rule-item'>2、被邀请人仅可助力一次,成功领取过优惠券即算老用户;</View>
            <View className='rule-item'>3、完成任务后助力人数清零;</View>
            <View className='rule-item'>4、拉新人限时48小时</View>
            <View className='rule-item'>5、活动时间：新系统上线一周后开始。</View>
          </View>
          <View className='rule-footer'>本活动最终解释权归杭州茵莱芙有限公司所有</View>
        </View>
      </View>
    )
  }
}
