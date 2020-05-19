import Taro, { Component } from '@tarojs/taro'
import {Button, Image, View} from '@tarojs/components'
import { pickBy, formatDataTime } from '@/utils'
import api from '@/api'
import NavGap from "../../components/nav-gap/nav-gap";

import './cashier-result.scss'

export default class CashierResult extends Component {
  constructor (props) {
    super(props)

    this.state = {
      info: {
        payStatus: ''
      },
      showTabBar: '',
    }
  }
  componentDidMount () {
    Taro.showLoading()
    setTimeout(()=>{
      Taro.hideLoading()
      this.fetch()
    },2000)
  }

  async fetch () {
    const { order_id } = this.$router.params
    const orderInfo = await api.cashier.getOrderDetail(order_id)
    const info = pickBy(orderInfo, {
      create_time: ({ create_time }) => (formatDataTime(create_time * 1000)),
      order_id: 'order_id',
      payDate: ({ payDate }) => (formatDataTime(payDate * 1000)),
      tradeId: 'tradeId',
      payStatus: 'payStatus'
    })
    if(info.order_id.indexOf('CZ') !== -1) {
      this.setState({
        showTabBar: 'CZ'
      })
    }
    this.setState({
      info: info
    })
    Taro.hideLoading()
  }

  handleClickBack = (order_id) => {
    if(order_id.indexOf('CJ') === -1){
      Taro.navigateTo({
        url: `/pages/trade/detail?id=${order_id}`
      })
    }else {
      Taro.navigateTo({
        url: `/pages/member/point-draw-order`
      })
    }
  }

  handleClickRoam = () => {
    Taro.navigateTo({
      url: APP_HOME_PAGE
    })
  }

  render () {
    const { info, showTabBar } = this.state

    return (
      <View>
        <NavGap title='cashier-result'/>
        <View className='page-cashier-index'>
          <View className='cashier-content'>
            <View className='cashier-result'>
              <View className='cashier-result__img'>
                <Image
                  className='note__img'
                  mode='aspectFill'
                  src={`/assets/imgs/pay_${info.payStatus}.png`}
                />
              </View>
              <View className='cashier-result__info'>
                <View className='cashier-result__info-title'>订单支付{info.payStatus === 'fail' ? '失败' : ''}{info.payStatus === 'success' ? '成功' : ''}</View>
                <View className='cashier-result__info-news'>订单号：{info.order_id}</View>
                {
                  info.payStatus === 'success' ? <View className='cashier-result__info-news'>支付单号：{info.tradeId}</View> : null
                }
                <View className='cashier-result__info-news'>创建时间：{info.create_time}</View>
                {
                  info.payStatus === 'success' ? <View className='cashier-result__info-news'>支付时间：{info.payDate}</View> : null
                }
              </View>
            </View>
          </View>

          {
            showTabBar === 'CZ'
              ? <View className='goods-buy-toolbar'>
                <View className='goods-buy-toolbar__btns'>
                  <Button
                    className='goods-buy-toolbar__btn btn-add-cart'
                    onClick={this.handleClickRoam}
                  >返回首页</Button>
                </View>
              </View>
              : <View className='goods-buy-toolbar'>
                {
                  info.payStatus === 'fail'
                    ? <View className='goods-buy-toolbar__btns'>
                      <Button
                        className='goods-buy-toolbar__btn btn-fast-buy'
                        onClick={this.handleClickBack.bind(this, info.order_id)}
                      >订单详情</Button>
                    </View>
                    : <View className='goods-buy-toolbar__btns'>
                      <Button
                        className='goods-buy-toolbar__btn btn-add-cart'
                        onClick={this.handleClickRoam}
                      >返回首页</Button>
                      <Button
                        className='goods-buy-toolbar__btn btn-fast-buy'
                        onClick={this.handleClickBack.bind(this, info.order_id)}
                      >订单详情</Button>
                    </View>
                }
              </View>
          }


        </View>
      </View>

    )
  }
}
