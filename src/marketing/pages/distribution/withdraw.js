import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, Button, Picker } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import api from '@/api'

import './withdraw.scss'

export default class DistributionWithdraw extends Component {
  constructor (props) {
    super(props)

    this.state = {
      limit_rebate: 0,
      cashWithdrawalRebate: 0,
      submitLoading: false,
      amount: null,
      curIdx: '0',
      payList: ['微信(金额 ≦ 800)', '支付宝'],
      // payList:[
      //   {title:'微信(金额 ≦ 800)',type:'wechat'},
      //   {title:'支付宝',type:'wechat'},

      // ],
      alipay_account: '',
      accountInfo:{}
    }
  }

  componentDidShow () {
    this.fetch()
  }

  async fetch() {
    const { cashWithdrawalRebate } = await api.distribution.statistics()
    if (cashWithdrawalRebate) {
      this.setState({
        cashWithdrawalRebate,
      })
    }
   
    const { alipay_account, config } = await api.distribution.info()
    //const dataInfo = await api.distribution.info()
  
    if (alipay_account) {
      this.setState({
        alipay_account
      })
    }
    // if (config.limit_rebate) {
    //   this.setState({
    //     limit_rebate: config.limit_rebate,
    //   })
    // }
  }

  handleWithdrawAll = () => {
    const { cashWithdrawalRebate } = this.state
    if (!cashWithdrawalRebate) return
    this.setState({
      amount: (cashWithdrawalRebate/100).toFixed(2)
    })
  }
  goWithdraw = async () =>{ 
    const {amount,curIdx} = this.state
    const query = {
      money: amount*100,
      pay_type:curIdx === '0' ? 'wechat' : 'alipay'
      //money:(amount/100).toFixed(2)
    }  
  
      const { confirm } = await Taro.showModal({
        title: '确定提现？',
        content: ''
      })
      if (confirm) {
        await api.distribution.getCash(query)
        setTimeout(()=>{
          Taro.navigateBack()
        }, 700)
      }
      return

  }

  handleWithdrawAll = () => {
    const { cashWithdrawalRebate } = this.state
    if (!cashWithdrawalRebate) return
    this.setState({
      amount: (cashWithdrawalRebate/100).toFixed(2)
    })
  }

  handleChange = (val) => {
    this.setState({
      amount: val
    })
  }

  handlePick = (e) => {
    const idx = e.detail.value
    this.setState({
      curIdx: idx
    })
  }

  render () {
    const { cashWithdrawalRebate, limit_rebate, amount, curIdx, payList, alipay_account } = this.state

    return (
      <View className="page-distribution-withdraw">
        <View className="section withdraw">
          <View className="withdraw-title">可提现金额(元)：￥{cashWithdrawalRebate/100}</View>
          <View className="withdraw-body">
            <AtInput
              className="withdraw-body-input"
              onChange={this.handleChange.bind(this)}
              type='number'
              placeholder='请输入提现金额'
              value={amount}
            />
            <View
              className="withdraw-body-btn"
              onClick={this.handleWithdrawAll}
            >
              全部提现
            </View>
          </View>
        </View>
        <View className="section list">
          <View className="list-item" style="position: relative;">
            <Picker
              onChange={this.handlePick.bind(this)}
              value={curIdx}
              range={payList}
            >
              <View className="pay-type-picker"></View>
            </Picker>
            <View className="label">提现方式</View>
            <View className="list-item-txt content-right">{payList[curIdx]}</View>
            <View className="item-icon-go icon-arrowRight"></View>
          </View>
          {
            curIdx === '1'
            && <Navigator url="/marketing/pages/distribution/withdrawals-acount" className="list-item">
                <View className="label">提现账户</View>
                <View className="list-item-txt content-right">{alipay_account ? alipay_account : '去设置'}</View>
                <View className="item-icon-go icon-arrowRight"></View>
              </Navigator>
          }
        </View>
        <View className="content-padded">
          <Button
            className="g-button {{isClick ? '_off' : ''}}"
            type="primary"
            onClick={this.goWithdraw}
            disabled={!curIdx && amount > 800}>提现</Button>
        </View>
        <View className="g-ul">
          <View className="g-ul-li">每月只能提取2次，每次需大于等于1元</View>
          <View className="g-ul-li">金额低于{limit_rebate}元时不可提现</View>
          <View className="g-ul-li">预计三个工作日到账</View>
          <View className="g-ul-li">未实名认证的微信用户，将无法提现到收款账户</View>
        </View>
      </View>
    )
  }
}
