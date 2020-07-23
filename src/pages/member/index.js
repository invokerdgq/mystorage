import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text, Image, Navigator, Button, Icon} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { SpToast, TabBar, SpCell} from '@/components'
import api from '@/api'
import S from '@/spx'
import NavGap from "../../components/nav-gap/nav-gap";

import './index.scss'
import {memberInfo} from "../../api/member";

@connect(({ colors }) => ({
  colors: colors.current
}), (dispatch) => ({
  onFetchFavs: (favs) => dispatch({ type: 'member/favs', payload: favs })
}))
export default class MemberIndex extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      info: {
        deposit: '',
        point: '',
        coupon: '',
        luckdraw: '',
        username: '',
        user_card_code: '',

      },
      vipgrade: {
        grade_name: '',
        end_date: '',
        is_vip: '',
        vip_type: '',
        is_open: '',
        background_pic_url: '',
        is_effective:null
      },
      gradeInfo: {
        user_card_code: '',
        grade_name: '',
        background_pic_url: ''
      },
      orderCount: '',
      memberDiscount: '',
      isOpenPopularize: false,
      salespersonData:null,
      inviter_name:'',
      is_effective:null,
      fansCount:{count:0},
      totalConsumption:''
    }
    this.orderList = [
      {icon:'iconfont icon-daifukuan',dec:'待付款',type:5},
      {icon:'iconfont icon-daishouhuo',dec:'待收货',type:1},
      {icon:'iconfont icon-jiuzhouyiwancheng',dec:'已完成',type:3},
      {icon:'iconfont icon-shouhou',dec:'售后',type:''}
    ]
    this.featureList = [
      {url:'/assets/imgs/fans.jpg',dec:'我的粉丝',onclick:this.handleClick.bind(this, '/pages/member/fans',false),openType:'click'},
      {url:'/assets/imgs/group.png',dec:'我的拼团',onclick:this.handleClick.bind(this, '/pages/member/group-list',false) ,openType:'click'},
      {url:'/assets/imgs/buy.png',dec:'我的预约',onclick:this.handleClick.bind(this, '/marketing/pages/member/item-activity',false) ,openType:'click'},
      {url:'/assets/imgs/kefu.png',dec:'我的客服',openType:'contact'},
      {url:'/assets/imgs/live.png',dec:'我的直播间',onclick:this.handleClick.bind(this, '/pages/member/live',false),openType:'click'},
      {url:'/assets/imgs/address.png',dec:'地址管理',onclick: this.handleClick.bind(this, '/pages/member/address',false),openType:'click'},
      {url:'/assets/imgs/share.png',dec:'我要分享',openType:'share'},
      {url:'https://sxt-b-cdn.oioos.com/tupian/lb.png',dec:'礼包兑换',openType:'click',onclick: this.handleClick.bind(this, '/others/pages/exchange/exchange',false)},
    ]
  }

  navigateTo (url) {
    Taro.navigateTo({ url })
  }

  componentDidShow () {
    Taro.navigateTo({url:'/others/pages/live/live'})
    const { colors } = this.props
    Taro.setNavigationBarColor({
      backgroundColor: colors.data[0].marketing,
      frontColor: '#000000'
    })
    this.fetch()
    if(S.getAuthToken()){
      this.toActiveVip()
    }

  }
  toActiveVip(){
    let inviteCode  = null
    try{
     inviteCode =  Taro.getStorageSync('inviteCode')
      if(inviteCode){
        Taro.showModal({
          title:'立刻去激活至尊会员',
          content:'使用邀请码免费成为至尊会员',
          success:(res) => {
             if(res.confirm){
               Taro.navigateTo({
                 url:'/pages/vip/vipgrades?grade_name=至尊会员'
               })
             }
          }
        })
      }
    }catch (e) {
      console.log(e)
    }
  }
  async fetch () {
    if (!S.getAuthToken()) return

    let resUser = null
    if(Taro.getStorageSync('userinfo')){
      resUser = Taro.getStorageSync('userinfo')
      this.setState({
        info: {
          username: resUser.username,
          avatar: resUser.avatar,
          isPromoter: resUser.isPromoter,
        }
      })
    }
    const [res, { list: favs }, orderCount, { list: memberDiscount }, assets,fansCount] = await Promise.all([api.member.memberInfo(), api.member.favsList(), api.trade.getCount(), api.vip.getList(), api.member.memberAssets(),api.member.getFansCount()])
    if((res.vipgrade.grade_name === '至尊会员')|| (res.vipgrade.grade_name === '王者身份')){
    }else{
      console.log('shangchu')
      this.featureList = this.featureList.filter((item) => {
        return  item.dec !== '我的直播间'
      })
    }
    this.props.onFetchFavs(favs)
    this.setState({
      isOpenPopularize: res.is_open_popularize,
      inviter_name:res.memberInfo.inviter_name,
      inviter_id:res.memberInfo.inviter_id,
      is_effective:res.vipgrade.is_effective,
      fansCount,
      totalConsumption:res.memberInfo.totalConsumption
    })
    const userObj = {
      username: res.memberInfo.username,
      avatar: res.memberInfo.avatar,
      userId: res.memberInfo.user_id,
      isPromoter: res.is_promoter,
      user_card_code:res.memberInfo.user_card_code,
      inviter_id:res.memberInfo.inviter_id,
      is_vip:res.vipgrade.is_vip,
    }
    if(!resUser || resUser.username !== userObj.username || resUser.avatar !== userObj.avatar||resUser.inviter_id !== userObj.inviter_id) {
      Taro.setStorageSync('userinfo', userObj)
      this.setState({
        info: {
          username: res.memberInfo.username,
          avatar: res.memberInfo.avatar,
          isPromoter: res.is_promoter,
          inviter_name:res.memberInfo.inviter_name
        }
      })
    }
    this.setState({
      vipgrade: {
        grade_name: res.vipgrade.grade_name,
        end_date: res.vipgrade.end_time,
        is_vip: res.vipgrade.is_vip,
        vip_type: res.vipgrade.vip_type,
        is_open: res.vipgrade.is_open,
        background_pic_url: res.vipgrade.background_pic_url,
        is_effective:res.vipgrade.is_effective
      },
      gradeInfo: {
        user_card_code: res.memberInfo.user_card_code,
        grade_name: res.memberInfo.gradeInfo.grade_name,
        background_pic_url: res.memberInfo.gradeInfo.background_pic_url
      },
      orderCount,
      memberDiscount: memberDiscount.length > 0 ? memberDiscount[memberDiscount.length-1].privileges.discount_desc : '',
      memberAssets: assets,
      is_effective:res.is_effective,
      commission:res.memberInfo.commission,
      expect_commission:res.memberInfo.expect_commission
    })
  }

  handleClickRecommend = async () => {
    const { info } = this.state
    if (!info.is_open_popularize) {
      S.toast('未开启推广')
      return
    }

    if (info.is_open_popularize && !info.is_promoter) {
      await api.member.promoter()
    }

    Taro.navigateTo({
      url: '/pages/member/recommend'
    })
  }

  handleClick = (url,type = false) => {
    if (!S.getAuthToken()) {
      return S.toast('请先登录')
    }
    if(type){
      if((this.state.vipgrade.grade_name ==='至尊会员' || this.state.vipgrade.grade_name === '王者身份')&&this.state.vipgrade.is_effective == 0  ){
        Taro.navigateTo({url:'/others/pages/transform/transform'})
      }else{
        url = url + `?grade_name=${this.state.vipgrade.is_vip?this.state.vipgrade.grade_name:this.state.gradeInfo.grade_name}`
        Taro.navigateTo({url})
      }
    }else{
      url = url + `?grade_name=${this.state.vipgrade.is_vip?this.state.vipgrade.grade_name:this.state.gradeInfo.grade_name}`
      Taro.navigateTo({url})
    }
  }
  handleUpdate() {
    if(!S.getAuthToken()){
      Taro.showToast({
        title:'请先登录',
        icon:'none',
        duration:1500
      })
      return
    }
    Taro.navigateTo({
      url:'/pages/auth/wxauth?update=1'
    })
  }

  beDistributor = async () => {
    const { info } = this.state
    const { username, avatar, isPromoter } = info
    if ( isPromoter ) {
      Taro.navigateTo({
        url: '/marketing/pages/distribution/index'
      })
      return
    }
    const { confirm } = await Taro.showModal({
      title: '邀请推广',
      content: '确定申请成为推广员？',
      showCancel: true,
      cancel: '取消',
      confirmText: '确认',
      confirmColor: '#0b4137'
    })
    if (!confirm) return

    const res = await api.distribution.become()
    const { status } = res
    if (status) {
      Taro.showModal({
        title: '恭喜',
        content: '已成为推广员',
        showCancel: false,
        confirmText: '好'
      })
      let userinfo = {
        username,
        avatar,
        isPromoter: true
      }
      console.log(userinfo)
      Taro.setStorageSync('userinfo', userinfo)
      this.setState({
        info: userinfo
      })
    }
  }

  handleTradeClick = (type) => {
    if (!S.getAuthToken()) {
      return S.toast('请先登录')
    }
    Taro.navigateTo({
      url: `/pages/trade/list?status=${type}`
    })
  }

  handleTradePickClick = () => {
    if (!S.getAuthToken()) {
      return S.toast('请先登录')
    }
    Taro.navigateTo({
      url: '/pages/trade/customer-pickup-list'
    })
  }

  handleLoginClick = () => {
    S.login(this, true)
  }

  viewAftersales = () => {
    if (!S.getAuthToken()) {
      return S.toast('请先登录')
    }
    Taro.navigateTo({
      url: `/pages/trade/after-sale`
    })
  }

  handleCodeClick = () => {
    if (!S.getAuthToken()) {
      return S.toast('请先登录')
    }
    Taro.navigateTo({
      url: `/pages/member/member-code`
    })
  }
  handlePresist = (grade_name) => {
    Taro.navigateTo({
      url:`/pages/vip/vipgrades?grade_name=${grade_name}&presist=true&commission=${(this.state.expect_commission/100).toFixed(2)}`
    })
  }
  handleCashOut =(commissiom) => {
    Taro.navigateTo({
      url:`/pages/member/cash-out?commission=${commissiom}`
    })
  }
  handleCopy(data) {
    Taro.setClipboardData({
      data:data,
      success(){
        Taro.showToast({
          title:'复制成功',
          icon:'success',
          duration:1500
        })
      }
    })
  }
  render () {
    const { colors } = this.props
    const {expect_commission, commission,vipgrade, gradeInfo, orderCount, memberDiscount, memberAssets, info, isOpenPopularize, salespersonData } = this.state
    return (
      <View>
        <NavGap title="个人中心"/>
        <View className='page-member-index'>
          <ScrollView
            className='member__scroll'
            scrollY
          >
            <View className='member-header'>
                    <View className='member-header-user' style={`min-height:${vipgrade.is_vip?'300rpx':this.state.inviter_name?'300rpx':'240rpx'}`}>
                      <View className='member-header-user-logo'><Image src='../../assets/imgs/logo.png' mode='widthFix' className='img'/></View>
                      <View className='member-header-user-info'>
                        {
                          S.getAuthToken()?
                              <View className='member-header-user-info-login'>
                                <Image className='avatar-img' src={info.avatar} mode='aspectFill' />
                                <View className='user-name'>{info.username?info.username:'-'}</View>
                                <View className='user-inviter'>
                                  {
                                    this.state.inviter_id != 0&&
                                      <Text className='inviter'>推荐人:{this.state.inviter_name?this.state.inviter_name:'-'}</Text>
                                  }
                                  {
                                    vipgrade.is_vip&&vipgrade.grade_name !== '钻石会员'&&vipgrade.is_effective == 0&&this.state.totalConsumption ==0&&
                                      <Text className='effective'>未激活</Text>
                                  }
                                </View>
                              </View>:
                              <View className='member-header-user-info-unlogin'>
                                <View className='icon-container'>
                                   <View className='iconfont icon-weidenglu'/>
                                </View>
                                <View className='login' onClick={this.handleLoginClick.bind(this)}>登入/注册</View>
                              </View>
                        }
                      </View>
                      <View className='member-header-user-setting' onClick={this.handleUpdate.bind(this)}>
                        <View className='iconfont icon-setting-copy'/>
                        <Text>更新信息</Text>
                      </View>
                      <View className='member-header-user-code' onClick={this.handleCodeClick.bind(this)}>
                        <View className='iconfont icon-erweima'/>
                        <Text>会员码</Text>
                      </View>
                    </View>
                    <View className='member-header-vip' style={`height:${vipgrade.is_vip?'110rpx':'80rpx'}`}>
                      <View className='member-header-vip-dec' style={`height:${vipgrade.is_vip?'50%':'100%'}`}>
                        <View className='iconfont icon-huiyuan'/>
                        <Text className='gold'>{vipgrade.is_vip?vipgrade.is_effective != 0?vipgrade.grade_name:this.state.totalConsumption != 0?'至尊会员':'钻石会员':'普通用户'}</Text>
                        <Text className='feature' onClick={this.handleClick.bind(this,'/pages/member/vip',true)}>{vipgrade.is_vip?'查看权益':'开通会员'}</Text>
                        <View className='iconfont icon-chakan'/>
                      </View>
                      {
                        vipgrade.is_vip&&
                        <View className='member-header-vip-dec-small' style={`height:${vipgrade.is_vip?'50%':'100%'}`}>
                          <Text className='gold' onLongPress={this.handleCopy.bind(this,gradeInfo.user_card_code)}>NO. {gradeInfo.user_card_code}</Text>
                          <Text  className='feature'>到期时间:{vipgrade.end_date}</Text>
                        </View>
                      }
                    </View>
            </View>
            <View className='member-body'>
              {
                S.getAuthToken()&&
                <View className='member-assets view-flex'>
                  <View
                    className='view-flex-item'
                    onClick={this.handleClick.bind(this, '/pages/member/coupon')}
                  >
                    <View className='member-assets__value'>{memberAssets.discount_total_count||0}</View>
                    <View className='member-assets__label'>优惠券</View>
                  </View>
                  <View className='view-flex-item' onClick={this.handlePresist.bind(this,vipgrade.is_vip?vipgrade.grade_name:gradeInfo.grade_name,true)}>
                    <View className='member-assets__value'>{(Number(expect_commission)/100).toFixed(2)}</View>
                    <View className='member-assets__label'>预计收益</View>
                  </View>
                  <View className='view-flex-item' onClick={this.handleCashOut.bind(this,commission)}>
                    <View className='member-assets__value'>{(commission/100).toFixed(2)}</View>
                    <View className='member-assets__label'>可提收益</View>
                  </View>
                  <View
                    className='view-flex-item'
                    onClick={this.handleClick.bind(this, '/pages/member/item-fav')}
                  >
                    <View className='member-assets__value'>{memberAssets.fav_total_count||0}</View>
                    <View className='member-assets__label'>收藏</View>
                  </View>
                </View>
              }
              <View className='member-order'>
                <View className='member-order-dec' onClick={this.handleTradeClick.bind(this)}><Text className='my-order'>我的订单</Text><Icon className='iconfont icon-chakan'/></View>
                <View className='member-order-list'>
                  {
                    this.orderList.map((item,index) => {
                      return(
                        <View className='member-order-list-item' onClick={index === 3?this.viewAftersales.bind(this):this.handleTradeClick.bind(this,item.type)}>
                          <Icon className={`${item.icon} item-icon`} />
                          <Text className='member-order-list-item-dec'>{item.dec}</Text>
                          {
                            index === 0 &&orderCount.normal_notpay_notdelivery > 0 && (<View className='trade-num' >{orderCount.normal_notpay_notdelivery}</View>)
                          }
                          {
                            index === 1&&orderCount.normal_payed_notdelivery > 0 && (<View className='trade-num'>{orderCount.normal_payed_notdelivery}</View>)
                          }
                          {
                              index === 2&&orderCount.normal_payed_delivered > 0 && <View className='trade-num'>{orderCount.normal_payed_delivered}</View>
                          }
                          {
                            index === 3 &&orderCount.aftersales > 0 && (<View className='trade-num'>{orderCount.aftersales}</View>)
                          }
                        </View>
                      )
                    })
                  }
                </View>
              </View>
              <View className='member-feature'>
                <View className='member-feature-dec'><Text className='serve'>我的服务</Text><Icon className='iconfont icon-arrowRight'/></View>
                <View className='member-feature-list'>
                  {
                    this.featureList.map((item,index) => {
                      return (
                        <View className='member-feature-list-item'>
                          {
                            item.openType === 'click'?
                                  <View onClick={item.onclick} className='member-feature-list-item-click'>
                                    <Image src={item.url} className='img'/>
                                    <Text className='dec'>{item.dec}</Text>
                                  </View>
                              :
                              <Button openType={item.openType} className='member-feature-list-item-button'>
                                <Image src={item.url} className='img'/>
                                <Text className='dec'>{item.dec}</Text>
                              </Button>
                          }
                        </View>
                      )
                    })
                  }
                </View>
              </View>
            </View>
          </ScrollView>

          <SpToast />

          {
            process.env.TARO_ENV === 'weapp'?null:
              <TabBar />
          }
        </View>
      </View>

    )
  }
}
