import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import NavGap from "../../../components";
import {cdn} from "../../../consts";

import api from '@/api'
import './own-store.scss'

export default class OwnStore extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      userInfo:{}
    }
  }
  componentWillMount(){
    const info = Taro.getStorageSync('userinfo')
    this.setState({
      userInfo:info
    })
  }
  componentDidShow() {
    this.getshopInfo()
  }

  getshopInfo = () => {
    api.store.getOwnShopInfo().then((res) => {
     this.setState({
       operator_id:res.operator_id,
       deal_count:res.deal_count,
       deal_price:res.deal_price,
       item_view_num:res.item_view_num,
     })
    })
    api.store.getOwnShopData().then((res) => {
      this.setState({
        shopData:res
      })
    })
  }
  handleFeature(type){
    if(type === 'preview'){
      Taro.navigateTo({url:`/marketing/pages/user-store/visit-store?id=${this.state.operator_id}`})
    }else{
      Taro.navigateTo({url:'/marketing/pages/user-store/store-manage'})
    }
  }
  handleOrder(status){
    Taro.navigateTo({url:`/marketing/pages/user-store/trade/list?status=${status}`})
  }
  render() {
    const {userInfo, deal_count, deal_price, item_view_num,shopData} = this.state
    return(
      <View className='personal-store'>
        <NavGap title='我的小店' bg='#c0534e' cl='white'/>
        <View className='personal-store-content'>
          <View className='content-top'>
            <View className='user-avatar'><Image mode='widthFix' className='img' src={userInfo.avatar}/></View>
            <View className='user-info'>
              <View className='user-name'>{userInfo.username}</View>
              <View className='user-vip'> <View className='iconfont icon-huiyuan'/>{userInfo.grade_name}</View>
            </View>
          </View>
          <View className='content-middle'>
            <View className='content-middle-inner'>
              <View className='own-data'>
                <View className='own-data-title'>我的数据</View>
                <View className='own-data-content'>
                  <View className='data-item'><View className='data-num'>{deal_price}</View><View className='data-dec'>成交金额（元）</View></View>
                  <View className='data-item'><View className='data-num'>{deal_count}</View><View className='data-dec'>成交订单数</View></View>
                  <View className='data-item'><View className='data-num'>{item_view_num}</View><View className='data-dec'>商品浏览次数</View></View>
                </View>
              </View>
              <View className='own-order'>
                <View className='own-order-title'>我的订单</View>
                <View className='own-order-content'>
                  <View className='order-item' onClick={this.handleOrder.bind(this,'notship')}>
                    <View className='iconfont icon-daifahuo1'/>
                    <View className='item-dec'>待发货</View>
                    <View className='num'>{shopData.normal_payed_daifahuo}</View>
                  </View>
                  <View className='order-item' onClick={this.handleOrder.bind(this,'done')}>
                      <View className='iconfont icon-jiuzhouyiwancheng'/>
                      <View className='item-dec'>已完成</View>
                  </View>
                  <View className='order-item' onClick={this.handleOrder.bind(this,'done')}>
                    <View className='iconfont icon-daifukuan'/>
                    <View className='item-dec'>去提现</View>
                    <View className='num'>{shopData.normal_notpay_notdelivery}</View>
                  </View>
                  <View className='order-item' >
                    <View className='iconfont icon-shouhou'/>
                    <View className='item-dec'>售后</View>
                    <View className='num'>{shopData.aftersales}</View>
                  </View>
                </View>
              </View>
              <View className='store-feature'>
                <View className='feature-item' onClick={this.handleFeature.bind(this,'preview')}><Image mode='widthFix' className='img' src={`${cdn}/preview-store.png`}/><Text className='dec'>店铺预览</Text></View>
                <View className='feature-item' onClick={this.handleFeature.bind(this,'manage')}><Image mode='widthFix' className='img' src={`${cdn}/store-manage.png`}/><Text className='dec'>小店管理</Text></View>
              </View>
            </View>
            </View>
        </View>
      </View>
    )
  }

}
