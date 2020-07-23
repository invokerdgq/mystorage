import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import { AtCountdown } from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import OwnProgress from "../../../components";
import OwnShade from "../../../components/own-shade/own-shade";

import './help.scss'
import OwnGoodsItem from "../invite-activity/coms/goods-item";
import OwnTitle from "../../../components/own-title/own-title";
export default class Help extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      info:{},
      list: {items:[]},
      showGift:false
    }
    this.top = Taro.getStorageSync('top')
  }
  componentDidShow() {
    Taro.setStorageSync('help',true)
    Taro.setStorageSync('canHelp',false)
    if(!S.getAuthToken()){
      Taro.showToast({
        title:'请先登录',
        icon:'none',
        duration:1500
      })
      setTimeout(() => {
        S.login(this)
      },1000)
      return
    }
    this.fetch()
  }
  async fetch(){
   const params = {
     assist_id:Taro.getStorageSync('assist_id'),
     user_card_code:Taro.getStorageSync('userinfo').user_card_code
   }
   const {list,share_user_info} = await api.assist.getShareInfo(params)
    this.setState({
      list:list,
      info:share_user_info
    })
  }
  back(){
    Taro.showModal({
      title:'是否放弃助力机会',
      content:'如果放弃此次机会，则会视为老用户',
      showCancel:true,
      success(res){
        if(res.confirm){
          Taro.navigateTo({
            url:'/pages/index'
          })
        }
      }
    })
  }
  handleClickItem(){

  }
  handleCloseShade(){
    this.setState({
      showGift: false
    })
  }
  handleShowGift(){
    if(Taro.getStorageSync('canHelp')){
      this.setState({
        showGift:true
      })
    }else{
      Taro.showToast({
        title:'您不符合助力条件,无法为好友助力,3s后返回首页',
        icon:'none',
        duration:1500
      })
      setTimeout(() => {
        Taro.navigateTo({
          url:'/pages/index'
        })
      },3000)
    }
  }
  async handleReceiveGift(){
    const params = {
      assist_id:Taro.getStorageSync('assist_id'),
      user_card_code:Taro.getStorageSync('userinfo').user_card_code
    }
    let Err
    try {
      await api.assist.assist(params)
    }catch (e) {
      Err = e
      Taro.showToast({
        title:e.errMsg||'领取失败，稍后重试',
        icon:'none',
        duration:1500
      })
      console.log(Err)
    }
    if(!Err){
      Taro.showToast({
        title:'领取成功',
        icon:'success',
        duration:1500
      })
      Taro.setStorageSync('canHelp',false)
      setTimeout(() => {
        Taro.navigateTo({url:'/others/pages/receive-gift/receive-gift'})
      },1500)
    }
  }
  timeEnd(){
    this.setState({
      timeEnd:true
    })
  }
  render() {
    const {info,showGift,list} = this.state
    return(
      <View>
        <OwnShade
        show={showGift}
        onclickClose={this.handleCloseShade.bind(this)}
        close={false}
        >
          <View className='show-gift'>
            <View className='show-gift-title'><View className='avatar'><Image mode='widthFix' className='avatar-img' src={info.avatar}/></View><View className='triangle'/><View className='thanks'>感谢你已经帮我助力</View></View>
            <View className='gift-img' onClick={this.handleReceiveGift.bind(this)}><Image mode='widthFix' src={`${cdn}/gift.png`} className='img'/></View>
          </View>
        </OwnShade>
      <View className='help-title' style={{top:this.top+'px'}}><View className='iconfont icon-arrow-left' onClick={this.back.bind(this)}/><View className='help-title-inner'>一元助力</View></View>
       <View className='help'>
         <View className='help-header'>
           <View className='help-header-userinfo'>
             <View className='help-header-userinfo-avatar'><Image src={info.avatar} mode='widthFix' className='img'/></View>
             <View className='help-header-userinfo-dec'>
               <View className='help-header-userinfo-dec-name'>{info.username}</View>
               <View className='help-header-userinfo-dec-help'>快来帮我助力吧~</View>
             </View>
           </View>
           <View className='help-header-activity'>
             <View className='help-header-activity-goods-img'><Image className='inner' src={list.poster} /></View>
             <View className='help-header-activity-dec'>
               <View className='help-header-activity-dec-title'>苏心淘一元助力商品</View>
               <View className='help-header-activity-dec-dec'>助力成功后，可获得<Text className='gift'>新人大礼包</Text></View>
               <View className='help-header-activity-dec-number'>
                 <OwnProgress
                   height={28}
                   step={list.step_conf}
                   inviteNumber={list.user_assist_info?list.user_assist_info.assist_amount:0}
                   lastSeconds={list.user_assist_info?list.user_assist_info.last_seconds:0}
                 />
               </View>
             </View>
           </View>
           <View className='help-header-btn' onClick={this.handleShowGift.bind(this)}><Image src={`${cdn}/help.jpg`} className='help-btn' mode='widthFix'/></View>
         </View>
         <OwnTitle
           title='超值产品一元购'
           containerclass='container'
         />
         <View className='help-body'>
           {
             list.items.map(item =>{
               return(
                 <OwnGoodsItem
                   info={item}
                   onclick={this.handleClickItem.bind(this,item)}
                 />
               )
             })
           }
         </View>
       </View>
      </View>
    )
  }
}
