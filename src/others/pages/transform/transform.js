import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import {AtCountdown} from "taro-ui";
import { calcTimer } from '@/utils'


import './transform.scss'
export default class Transform extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      info:{vipgrade:{},memberInfo:{}}
    }
    this.bgList = ['/assets/imgs/zz.png','/assets/imgs/wz.png','/assets/imgs/hk.png','/assets/imgs/jl.png','/assets/imgs/btzz.png','/assets/imgs/btwz.png','/assets/imgs/wzlive.jpg']
  }
 componentDidMount() {
    if(!S.getAuthToken()){
     Taro.showToast({
       title:'请先登录',
       icon:'none'
     })
      setTimeout( () => {
        S.login(this)
      },2000)
      return
    }
    this.fetchInfo()
  }

  fetchInfo = async () => {
    const res = await api.member.memberInfo()
    if(/*!*/((res.vipgrade.grade_name !=='至尊会员'|| res.vipgrade.grade_name !=='王者身份')&&res.vipgrade.is_effective ==0)){
      Taro.showToast({
        title:'您不符合条件',
        icon:'none',
        duration: 2000,
        success:() => {
          setTimeout(() => {
            Taro.navigateTo({
              url:'/pages/member/index'
            })
          },2000)
        }
      })
    }else{
      this.setState({
        info:res
      })
    }
  }
  handleClickItem = (type) => {
    if(type === '至尊'){
      Taro.navigateTo({
        url:'/pages/index'
      })
    }else{
      Taro.navigateTo({
        url:`/pages/vip/vipgrades?grade_name=${this.state.info.vipgrade.grade_name === '至尊会员'?'王者身份':'至尊会员'}`
      })
    }
}
  render() {
    const {vipgrade={},memberInfo} = this.state.info
    return(
      <View>
        <NavGap title='限时好礼活动'/>
        <View className='container'>
          <Image mode='widthFix' style='display:block;position:absolute;top:0;z-index:-1;width:750rpx' src={`${vipgrade.grade_name ==='至尊会员'?this.bgList[0]:this.bgList[1]}`}/>
         <View className='transform-body'>
           <View className='avatar-container'>
             <Image src={memberInfo.avatar} />
           </View>
           <View className='user-info'>
               <View className='user-info-head'><Text>{memberInfo.username}</Text><Image mode='widthFix' style='width:130rpx' src={`${vipgrade.grade_name === '至尊会员'?this.bgList[2]:this.bgList[3]}`}/></View>
               <View className='user-info-foot'>NO.{memberInfo.user_card_code}</View>
             </View>

         </View>
          <View className='timer'>
            <AtCountdown
              isCard
              isShowDay
              day={1}
              hours={2}
              minutes={3}
              seconds={4}
            />
          </View>
          <View className='buy-btn-f' onClick={this.handleClickItem.bind(this,'至尊')}><Image src={this.bgList[4]} mode='widthFix' style='width:670rpx'/></View>
          <View className='buy-btn-s' onClick={this.handleClickItem.bind(this,'王者')}><Image src={`${vipgrade.grade_name === '至尊会员'?this.bgList[6]:this.bgList[5]}`} mode='widthFix' style='width:670rpx'/></View>
        </View>
      </View>
    )
  }
}
