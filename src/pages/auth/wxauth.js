import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import api from '@/api'
import S from '@/spx'
import { log } from '@/utils'
import NavGap from "../../components/nav-gap/nav-gap";

import './wxauth.scss'

@connect(({ colors }) => ({
  colors: colors.current
}))

export default class WxAuth extends Component {
  state = {
    isAuthShow: false
  }

  componentDidMount () {
    this.autoLogin()
  }

  async autoLogin () {
    console.log('shouquan-0------')
    const { update } = this.$router.params
    const { code } = await Taro.login()
    try {
      const { token } = await api.wx.login({ code })
      if (!token) throw new Error(`token is not defined: ${token}`)
      S.setAuthToken(token)
      if(update == 1){
        this.setState({
          isAuthShow: true
        })
        return
      }
      return this.redirect()
    } catch (e) {
      console.log(e)
      this.setState({
        isAuthShow: true
      })
    }
  }

  redirect () {
    const redirect = this.$router.params.redirect
    Taro.M(decodeURIComponent(redirect))
    let redirect_url = ''
    if(Taro.getStorageSync('isqrcode') === 'true') {
      redirect_url = redirect
        ? decodeURIComponent(redirect)
        : '/pages/qrcode-buy'
    } else if(!Taro.getStorageSync('help')) {
      redirect_url = redirect
        ? decodeURIComponent(redirect)
        : '/pages/member/index'
    }else{
      Taro.redirectTo({
        url:'/others/pages/help/help'
      })
    }
    api.member.memberInfo().then(res => {
      Taro.setStorageSync('userinfo',{
        username:res.memberInfo.username,
        avatar:res.memberInfo.avatar,
        userId:res.memberInfo.user_id,
        user_card_code:res.memberInfo.user_card_code,
        inviter_id:res.memberInfo.inviter_id,
        is_vip:res.vipgrade.is_vip,
        vip_grade:res.vipgrade.vip_grade_id
      })
      Taro.redirectTo({
        url: redirect_url
      })
    })
  }

  handleNews = () =>{
    let templeparams = {
      'temp_name': 'yykweishop',
      'source_type': 'member',
    }
    let _this = this
    _this.handleGetUserInfo()

    // api.user.newWxaMsgTmpl(templeparams).then(tmlres => {
    //   console.log('templeparams---1', tmlres)
    //   if (tmlres.template_id && tmlres.template_id.length > 0) {
    //     wx.requestSubscribeMessage({
    //       tmplIds: tmlres.template_id,
    //       complete() {
    //         _this.handleGetUserInfo()
    //       }
    //     })
    //   }
    // })
  }


  handleGetUserInfo = async (res) => {
    const loginParams = res.detail
    const { iv, encryptedData, rawData, signature, userInfo } = loginParams

    if (!iv || !encryptedData) {
      Taro.showModal({
        title: '授权提示',
        content: `需要您的授权才能购物`,
        showCancel: false,
        confirmText: '知道啦'
      })

      return
    }

    const { code } = await Taro.login()

    Taro.showLoading({
      mask: true,
      title: '正在加载...'
    })

    try {
      const uid = Taro.getStorageSync('distribution_shop_id')
      let params = {
        code,
        iv,
        encryptedData,
        rawData,
        signature,
        userInfo
      }
      const trackParams = Taro.getStorageSync('trackParams')
      if (trackParams) {
        Object.assign(params, {source_id: trackParams.source_id, monitor_id: trackParams.monitor_id})
      }
      if (uid) {
        Object.assign(params, {inviter_id: uid})
      }
      // if(Taro.getStorageSync('scene')){
      //   Object.assign(params,{inviter_id:Taro.getStorageSync('scene')})
      // }
      const { token, open_id, union_id, user_id } = await api.wx.prelogin(params)
      if(this.$router.params.update == 1){
        Taro.showToast({
          title:'微信信息同步会有几个小时的时间差,请稍后再试',
          icon:'none',
          duration:1500
        })
        setTimeout(() => {
          Taro.navigateTo({
            url:'/pages/member/index'
          })
        },2500)
        return
      }
      S.setAuthToken(token)
      // 绑定过，跳转会员中心
      if (user_id) {
        await this.autoLogin()
        return
      }

      // 跳转注册绑定
      Taro.redirectTo({
        url: `/pages/auth/reg?code=${code}&open_id=${open_id}&union_id=${union_id}`
      })
    } catch (e) {
      console.info(e)
      Taro.showToast({
        title: '授权失败，请稍后再试',
        icon: 'none'
      })
    }

    Taro.hideLoading()
  }

  handleBackHome = () => {
    Taro.navigateBack()
  }

  render () {
    const { colors } = this.props
    const { isAuthShow } = this.state
    const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}

    return (
      <View>
        <NavGap title='授权'/>
        <View className='page-wxauth'>
          {isAuthShow && (
            <View className='sec-auth'>
              <View className='auth-title'>用户授权</View>
              <Text className='auth-hint'>{extConfig.wxa_name}申请获得你的公开信息（昵称、头像等）</Text>
              <View className='auth-btns'>
                <AtButton
                  type='primary'
                  lang='zh_CN'
                  customStyle={`background: ${colors.data[0].primary}; border-color: ${colors.data[0].primary}`}
                  openType='getUserInfo'
                  onClick={this.handleNews.bind(this)}
                  onGetUserInfo={this.handleGetUserInfo}
                >授权允许</AtButton>
                <AtButton className='back-btn' type='default' onClick={this.handleBackHome.bind(this)}>拒绝</AtButton>
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}
