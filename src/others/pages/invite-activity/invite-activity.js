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

export default class InviteActivity extends Component{
  static options = {
    addGlobalClass:true
  }

  constructor(props) {
    super(props);
    this.state = {
      preSave:false,
     savePath:'',
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
        },
      showShade:false,
      showCanvas:false,
    }
    this.top = Taro.getStorageSync('top')
  }
  componentDidShow() {
    if(!S.getAuthToken()){
      Taro.showToast({
        title:'请先登录',
        icon:'none',
        duration:1500
      })
      setTimeout(() => {
        S.login(this)
      },2500)
      return;
    }
  }

  onShareAppMessage(obj) {
    return {
      title:'速来助我一臂之力',
      path:'/others/pages/help/help',
      imageUrl:this.state.savePath
    }
  }
  handleClickBtn(type){
    if(type === 'buy'){
      Taro.navigateTo({
        url:'/others/pages/select/select'
      })
    }else{
      if(this.state.savePath){
        this.setState({
          showShade:true
        })
      }else {
        Taro.showLoading('海报生成中...')
        this.setState({
          showShade:false,
          showCanvas:true
        },() => {
          Taro.hideLoading()
          this.setState({
            showShade:true,
            showCanvas:false
          })
        })
      }
    }
  }
  back(){
    Taro.navigateBack()
  }
  handleClickItem() {

  }
  handleShowCanvas(){
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

  render() {
    const {goodsList,userActivity,showShade,showCanvas}= this.state
    return(
      <View>
        <OwnShade
        show={showCanvas}
        onclickClose={this.handleCloseShade.bind(this,'canvas')}
        canvas={true}
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
              <View className='shade-slot-head-title'>仅剩<Text className='number'>{}9</Text><Text className='danwei'>人</Text>即达xx档</View>
              <View>
                <OwnProgress
                  height={28}
                  step={userActivity.step}
                  inviteNumber={userActivity.inviteNumber}
                  lastSeconds={userActivity.lastSeconds}
                />
              </View>
            </View>
            <View className='shade-slot-foot'>
              <View className='shade-slot-foot-title'>继续分享<Text className='invite'>助力</Text>选择更多<Text className='goods'>商品</Text></View>
              <View className='btn'>
                <Button className='btn-apperance' openType='share'>
                  <Image src={`${cdn}/share-friend.png`} mode='widthFix' className='shade-btn'/>
                </Button>
                <Image src={`${cdn}/save-img.png`} mode='widthFix' className='shade-btn' onClick={this.handleShowCanvas.bind(this)}/>
              </View>
            </View>
          </View>
        </OwnShade>
        <View className='iconfont icon-arrow-left' style={`top:${this.top}px`} onClick={this.back}/>
        <Image src={`${cdn}/invite-head.png`} mode='widthFix' className='bg-img'/>
        <View className='invite-act-content'>
        <View className='activity-list'>
            <ActivityItem
            activityInfo={userActivity}
            onclickBtn={this.handleClickBtn.bind(this)}
            />
        </View>
          <OwnTitle
           title={'超值产品一元购'}
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
                goodsList.map((item,index) => {
                  return(
                    <OwnGoodsItem
                      info={item}
                      onclick={this.handleClickItem.bind(this,item)}
                    />
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        <View className='rule'>
          <Image src={`${cdn}/invite-foot.png`} mode='widthFix' className='bg-img'/>
        </View>
      </View>
    )
  }
}
