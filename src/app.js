import Taro, { Component } from '@tarojs/taro'
import S from '@/spx'
import { Provider } from '@tarojs/redux'
import configStore from '@/store'
import useHooks from '@/hooks'
import req from '@/api/req'
import api from '@/api'
import { FormIds, WxAuth } from '@/service'
import Index from './pages/index'

import './app.scss'
import qs from 'qs'

Taro.M = function (option) {
  console.log('--------------')
  console.log(option)
  console.log('----------------')
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
if(process.env.TARO_ENV === 'weapp'){
  function isTabBarPage(url){
    return /\/(index|category\/index|recomend\/list|cart\/espier-index|member\/index)(.)*/.test(url)
  }
  function isTradePage(url) {
    return /\/trade(.)*/.test(url)
  }
  let originNav = Taro.navigateTo
  Taro.navigateTo = function (option) {
    isTabBarPage(option.url)?Taro.switchTab(option): originNav(option)
  }
  let originRed = Taro.redirectTo
  Taro.redirectTo = function (option) {
    isTabBarPage(option.url)?Taro.switchTab(option): originRed(option)
    }
  let originNav1 = Taro.navigateTo
  Taro.navigateTo = function (option) {
    if(isTradePage(option.url)) option.url = `/marketing${option.url}`
    originNav1(option)
  }
  let originRed1 = Taro.redirectTo
  Taro.redirectTo = function (option) {
    if(isTradePage(option.url)) option.url = `/marketing${option.url}`
    originRed1(option)
  }
}


const { store } = configStore()
useHooks()

  class App extends Component {
    // eslint-disable-next-line react/sort-comp
    componentWillMount () {

    }
    componentDidMount () {
      const promoterExp = Taro.getStorageSync('distribution_shop_exp')
      if (Date.parse(new Date()) - promoterExp > 86400000 * 3) {
        Taro.setStorageSync('distribution_shop_id', '')
        Taro.setStorageSync('distribution_shop_exp', '')
      }
    if(process.env.TARO_ENV === 'weapp') this.fetchTabs()
      this.fetchColors()
    }
    config = {
      tabBar:process.env.TARO_ENV === 'weapp'? {
        list:[
          {pagePath: "pages/index", text: "首页", name: "home", iconPath: "assets/imgs/home.jpg", selectedIconPath: "assets/imgs/home_selected.jpg"},
          {pagePath: "pages/category/index", text: "分类", name: "category", iconPath: "assets/imgs/catagory.jpg", selectedIconPath: "assets/imgs/catagory_selected.jpg"},
          {pagePath: "pages/recommend/list", text: "种草", name: "article", iconPath: "assets/imgs/grass.jpg", selectedIconPath: "assets/imgs/grass_selected.jpg"},
          {pagePath: "pages/cart/espier-index", text: "购物车", name: "cart", iconPath: "assets/imgs/cart.jpg", selectedIconPath: "assets/imgs/cart_selected.jpg"},
          {pagePath: "pages/member/index", text: "我的", name: "member", iconPath: "assets/imgs/mine.jpg", selectedIconPath: "assets/imgs/mine_selected.jpg"}
             ],
        selectedColor:'#c1534e',
        borderStyle:'black'
      }:null
      ,
      window:{
        navigationStyle: "custom"
      },
      pages: [
        'pages/index',
        'pages/goodsdetail',
        'pages/home/landing',
        'pages/category/index',
        'pages/item/list',
        'pages/item/espier-detail',
        'pages/item/item-params',
        'pages/item/package-list',
        'pages/item/group-list',
        'pages/item/group-detail',
        'pages/item/seckill-list',
        'pages/item/seckill-goods-list',
        'pages/home/coupon-home',

        'pages/cart/espier-index',
        'pages/cart/espier-checkout',
        'pages/cart/coupon-picker',
        'pages/article/index',

        'pages/recommend/list',
        'pages/recommend/detail',

        'pages/auth/reg',
        'pages/auth/reg-rule',
        'pages/auth/login',
        'pages/auth/forgotpwd',
        'pages/auth/wxauth',
        'pages/auth/pclogin',

        'pages/cashier/index',
        'pages/cashier/cashier-result',

        'pages/member/index',
        'pages/member/pay',
        'pages/member/pay-rule',
        'pages/member/coupon',
        'pages/member/coupon-detail',
        'pages/member/address',
        'pages/member/edit-address',
        'pages/member/setting',
        'pages/member/userinfo',
        'pages/member/item-history',
        'pages/member/item-fav',
        'pages/member/item-guess',
        'pages/member/group-list',
        'pages/member/member-code',
        'pages/qrcode-buy',

         'pages/manager/manager',
        'pages/distribution/shop-home',

        'pages/store/index',
        'pages/store/list',

        'pages/vip/vipgrades',

        'pages/custom/custom-page',

      ],
      subpackages: [
        {
          root: 'marketing',
          pages: [
            'pages/trade/list',
            'pages/trade/customer-pickup-list',
            'pages/trade/drug-list',
            'pages/trade/detail',
            'pages/trade/delivery-info',
            'pages/trade/rate',
            'pages/trade/cancel',
            'pages/trade/after-sale',
            'pages/trade/refund',
            'pages/trade/refund-detail',
            'pages/trade/refund-sendback',
            'pages/trade/invoice-list',

            'pages/distribution/index',
            'pages/distribution/setting',
            'pages/distribution/statistics',
            'pages/distribution/trade',
            'pages/distribution/subordinate',
            'pages/distribution/withdraw',
            'pages/distribution/withdrawals-record',
            'pages/distribution/withdrawals-acount',
            'pages/distribution/goods',
            'pages/distribution/shop',
            'pages/distribution/shop-setting',
            'pages/distribution/shop-form',
            'pages/distribution/qrcode',
            'pages/distribution/shop-goods',
            'pages/distribution/shop-category',
            'pages/distribution/shop-trade',
            'pages/distribution/shop-achievement',

            'pages/reservation/brand-list',
            'pages/reservation/brand-detail',
            'pages/reservation/brand-result',
            'pages/reservation/reservation-list',
            'pages/reservation/goods-reservate',
            'pages/reservation/reservation-detail',

            'pages/member/item-activity',
            'pages/member/activity-detail',
            'pages/member/user-info',
            'pages/item/espier-evaluation',
            'pages/item/rate',
            'pages/item/success',

            'pages/wheel/index'
          ]
        },
        {
          root: 'others',
          pages: [
            'pages/home/license',
            'pages/protocol/privacy'
          ]
        }
      ],
      permission: {
        "scope.userLocation": {
          "desc": "您的位置信息将用于定位附近门店"
        }
      },
      navigateToMiniProgramAppIdList: [
        'wx4721629519a8f25b',
        'wx2fb97cb696f68d22',
        'wxf91925e702efe3e3'
      ]
    }
    componentDidShow (options) {
      if (process.env.TARO_ENV === 'weapp') {
        FormIds.startCollectingFormIds()
        if (S.getAuthToken()) {
          api.member.favsList()
            .then(({ list }) => {
              if (!list) return
              store.dispatch({
                type: 'member/favs',
                payload: list
              })
            })
            .catch(e => {
              console.info(e)
            })
        }
      }

      const { referrerInfo } = options || {}
      if (referrerInfo) {
        console.log(referrerInfo)
      }
    }

    componentDidHide () {
      FormIds.stop()
    }

    async fetchTabs () {
      const url = '/pageparams/setting?template_name=yykweishop&version=v1.0.1&page_name=tabs'
      const defaultTabs = {
        config: {
          backgroundColor: "#ffffff",
          color: "#333333",
          selectedColor: "#E33420"
        },
        data: [{
          name: "home",
          pagePath: "/pages/index",
          text: "首页"
        },{
          name: "category",
          pagePath: "/pages/category/index",
          text: "分类"
        },{
          name: "cart",
          pagePath: "/pages/cart/espier-index",
          text: "购物车"
        },{
          name: "member",
          pagePath: "/pages/member/index",
          text: "我"
        }],
        name: "tabs"
      }
      const info = await req.get(url)
      store.dispatch({
        type: 'tabBar',
        payload: info.list.length ? info.list[0].params : defaultTabs
      })
    }

    async fetchColors () {
      const url = '/pageparams/setting?template_name=yykweishop&version=v1.0.1&page_name=color_style'
      const defaultColors = {
        data: [
          {
            primary: '#d42f29',
            accent: '#fba629',
            marketing: '#2e3030'
          }
        ],
        name: 'base'
      }
      const info = await req.get(url)
      store.dispatch({
        type: 'colors',
        payload: info.list.length ? info.list[0].params : defaultColors
      })
    }

    componentDidCatchError () {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
      return (
        <Provider store={store}>
          <Index />
        </Provider>
      )
    }
  }
  Taro.render(<App />, document.getElementById('app'))





