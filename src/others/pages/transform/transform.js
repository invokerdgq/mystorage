import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import {AtCountdown} from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'


import './transform.scss'
export default class Transform extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    const timeNow = Date.now();
    const timeEnd = new Date('july 1,2020').getTime()
    this.time = timeEnd- timeNow
    this.state = {
      info:{},
    }
    this.bgList = [`${cdn}/zz.png`,`${cdn}/wz.png`,`${cdn}/hk.png`,`${cdn}/jl.png`,`${cdn}/btzz.png`,`${cdn}/btwz.png`,`${cdn}/wzlive.jpg`]
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
    Taro.showLoading({
      title:'登录中',
      mask:true
    })
    const res = await api.member.memberInfo()
    if(!Taro.getStorageSync('userinfo')){
      Taro.setStorageSync('userinfo',{
        username:res.memberInfo.username,
        avatar:res.memberInfo.avatar,
        userId:res.memberInfo.userId,
        user_card_code:res.memberInfo.user_card_code,
        inviter_id:res.memberInfo.inviter_id,
        is_vip:res.vipgrade.is_vip
      })
    }
    if(((res.vipgrade.grade_name ==='至尊会员'|| res.vipgrade.grade_name ==='王者身份')&&res.vipgrade.is_effective ==0)){
      Taro.hideLoading()
      this.setState({
        info:res
      })
    }else{
      Taro.showToast({
        title:'您已激活',
        icon:'none',
        duration: 2000,
        success:() => {
          setTimeout(() => {
            Taro.hideLoading()
            Taro.redirectTo({
              url:'/pages/member/vip'
            })
          },2000)
        }
      })
    }
  }
  handleClickItem = (type) => {
    if(type === '至尊'){
      Taro.showModal({
        title:'去商城下一单?',
        success(res){
          if(res.confirm){
            Taro.navigateTo({
              url:'/pages/index'
            })
          }
        }
      })
    }else{
      Taro.navigateTo({
        url:`/pages/vip/vipgrades?grade_name=${this.state.info.vipgrade.grade_name === '至尊会员'?'王者身份':'至尊会员'}`
      })
    }
}
  render() {
    const {vipgrade={},memberInfo={}} = this.state.info
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
              isCard = {true}
              isShowDay = {true}
              day={calcTimer(this.time,'ms').dd}
              hours={calcTimer(this.time,'ms').hh}
              minutes={calcTimer(this.time,'ms').mm}
              seconds={calcTimer(this.time,'ms').ss}
            />
          </View>
          <View className='buy-btn-f' onClick={this.handleClickItem.bind(this,'至尊')}><Image src={this.bgList[4]} mode='widthFix' style='width:670rpx'/></View>
          <View className='buy-btn-s' onClick={this.handleClickItem.bind(this,'王者')}><Image src={`${vipgrade.grade_name === '至尊会员'?this.bgList[6]:this.bgList[5]}`} mode='widthFix' style='width:670rpx'/></View>
        </View>
      </View>
    )
  }
}
