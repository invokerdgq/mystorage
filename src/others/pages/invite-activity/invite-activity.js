import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'
import api from '@/api'
import {AtCountdown} from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import OwnGoodsItem  from './coms/goods-item'
import OwnTitle from "../../../components/own-title/own-title";
import OwnShade from "../../../components/own-shade/own-shade";
import OwnProgress from "../../../components";
import OwnPoster from "../../../components/own-poster/own-poster";
import req from '@/api/req'


import './invite-activity.scss'
import ActivityItem from "./coms/activity-item";
import {connect} from "@tarojs/redux";

@connect(({step}) => ({
  storeStep:step
}),(dispatch) =>({
  setStep:(load) => dispatch({type:'step',payload:load})
}))
export default class InviteActivity extends Component{
  static options = {
    addGlobalClass:true,
  }
  config = {
    enablePullDownRefresh: true,
  }
  static defaultProps ={
    yy:''
  }
  constructor(props) {
    super(props);
    this.state = {
      list:{
        step_conf:[{number:1}],
        user_assist_info:{}
      },
      step:0,
      items:null,
      preSave:false,
      savePath:'',
      showShade:false,
      showCanvas:false,
      showDetailIndex:'',
    }
    this.top = Taro.getStorageSync('top')
  }

  componentDidShow() {
    Promise.resolve().then(() => {console.log('活动show -> Mont  中间的过程--------------')})
    // setTimeout(() => {console.log('活动show -> Mont  中间的过程--------------')},0)
    this.props.setStep(this.state.list.step_conf)
    if(!S.getAuthToken()){
      Taro.showToast({
        title:'请先登录',
        icon:'none',
        duration:1500
      })
      setTimeout(() => {
        S.login(this)
      },2500)
      return
    }
    this.fetch()
  }
  onPullDownRefresh() {
    this.fetch()
  }
  async fetch(){
    try {
      const {list,step} = await api.assist.getAssistList()
      console.log('show----------mount之间  fetch tongbu')
      this.props.setStep(list.step_conf)
      this.setState({
        list:list,
        step:step
      })
    }catch (e) {
      Taro.showToast({
        title:e.errMsg,
        icon:'',
        duration:1500
      })
      setTimeout(() => {
        Taro.navigateTo({url:'/pages/index'})
      },1500)
    }
   }

  onShareAppMessage(obj) {
    console.log('hahahahah')
    console.log(this.state.list.assist_id)
    const userinfo = Taro.getStorageSync('userinfo')
    return {
      title:'速来助我一臂之力',
      path:`/others/pages/help/help?uid=${userinfo.user_card_code}&assist_id=${this.state.list.assist_id}`,
      imageUrl:this.state.list.poster
    }
  }
 async handleClickBtn(type){
    if(type === 'buy'){
      if(Number(this.state.list.user_assist_info.assist_amount) < Number(this.state.list.step_conf[0].number)){
        Taro.showToast({
          title:'未达到最低助力人数，无法挑选',
          icon:'none'
        })
        return
      }
      Taro.navigateTo({
        url:`/others/pages/select/select?level=${this.state.step}&id=${this.state.list.assist_id}`
      })
    }else{
      if(this.state.savePath){
        this.setState({
          showShade:true
        })
      }
        if(this.state.step ==0){
          try {
            const res = await api.assist.attendassist(this.state.list.assist_id)
            this.fetch()
          }catch(e){
           Taro.showToast({
             title:e.errMsg||'参加失败,稍后重试',
             icon:'none',
             duration:1500
           })
          }
        }else{
          Taro.hideLoading()
          this.setState({
            showShade:true,
            showCanvas:false
          })
        }
    }
  }
  back(){
    Taro.navigateBack()
  }
  handleClickItem(item,index) {
       this.setState({
         showDetailIndex:index
       })
  }
  handleShowCanvas(type){
   this.setState({
     showCanvas:true,
     showShade:false
   })
  }
  handleCloseShade =(type)=>{
    if(type === 'share'){
      this.setState({
        showShade:false
      })
    }else{
      this.setState({
        showCanvas:false,
        showShade:true
      })
    }
  }
  sendPath(path) {
    this.setState({
      savePath: path
    })
  }
  clearDetail(){
    this.setState({
      showDetailIndex:''
    })
  }
  render() {
    const {userActivity,showShade,showCanvas,list,step,showDetailIndex}= this.state
    const newList = {
      userList:step !=0?list.user_assist_info.assist_help_log:[],
      inviteNumber: step !=0?Number(list.user_assist_info.assist_amount):0,
      step:list.step_conf,
      last_seconds:step !=0?list.user_assist_info.last_seconds:0,
      poster:list.poster,
      status: step == 0?false:true,
      level:step
    }
    return(
      <View onClick={this.clearDetail.bind(this)}>
        <OwnShade
        show={showCanvas}
        onclickClose={this.handleCloseShade.bind(this,'canvas')}
        canvas={true}
        assist_id={list.assist_id}
        goodsImg={list.poster}
        sendPath={this.sendPath.bind(this)}
        presave={this.state.preSave}
        >
        </OwnShade>
        <OwnShade
        show={showShade}
        onclickClose={this.handleCloseShade.bind(this,'share')}
        >
          <View className='shade-slot'>
            <View className='img-container'>
              <Image src={`${cdn}/invite-share.png`} style={{width:'580rpx'}} mode='widthFix'/>
            </View>
            <View className='shade-slot-head'>
                <View className='shade-slot-head-title'>仅剩<Text className='number'>{this.state.step != 0?list.step_conf[list.step_conf.length-1].number-list.user_assist_info.assist_amount:list.step_conf[list.step_conf.length-1].number}</Text><Text className='danwei'>人</Text>即可最低一元购</View>
             <View>
                <OwnProgress
                  height={28}
                  step={list.step_conf}
                  inviteNumber={step !=0?list.user_assist_info.assist_amount:0}
                  lastSeconds={list.user_assist_info.last_seconds}
                />
              </View>
            </View>
            <View className='shade-slot-foot'>
              <View className='shade-slot-foot-title'>继续分享<Text className='invite'>助力</Text>选择更多<Text className='goods'>商品</Text></View>
              <View className='btn'>
                <Button className='btn-apperance' openType='share'>
                  <Image src={`${cdn}/share-friend.png`} mode='widthFix' className='shade-btn'/>
                </Button>
                <Image src={`${cdn}/save-img.png`} mode='widthFix' className='shade-btn' onClick={this.handleShowCanvas.bind(this,'save')}/>
              </View>
            </View>
          </View>
        </OwnShade>
        <View className='iconfont icon-arrow-left nav' style={`top:${this.top}px`} onClick={this.back}/>
        <Image src={`${cdn}/invite-head1.png`} mode='widthFix' className='bg-img'/>
        <View className='invite-act-content'>
        <View className='activity-list'>
            <ActivityItem
              activityInfo={newList}
              initList={list}
            onclickBtn={this.handleClickBtn.bind(this)}
            />
        </View>
          <OwnTitle
           title={'超值一元助力产品'}
           innerClass={'inner'}
           containerClass='title-container'
          />
          <ScrollView
          scrollY
          enableFlex={true}
          className='goods-scroll'
          >
            <View className='goods-scroll-list'>
              {
                list.items&&
                list.items.map((item,index) => {
                  return(
                    <OwnGoodsItem
                      info={item}
                      index={index}
                      onclick={this.handleClickItem.bind(this,item,index)}
                      currentIndex={showDetailIndex}
                      type='detail'
                    />
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        <View className='rule'>
          <Image src={`${cdn}/invite-foot1.png`} mode='widthFix' className='bg-img'/>
        </View>
      </View>
    )
  }
}
