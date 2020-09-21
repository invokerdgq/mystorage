import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import NavGap from "../../../../components";
import api from '@/api'

import './cash-out-detail.scss'
export default class CashOutDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info:{},
      rejectReason:''
    }
  }
  componentWillMount() {
    const {id} = this.$router.params
    this.fetchDetail(id)
  }
  async fetchDetail(id){
    const {payload} = await api.store.getCashOutDetail({order_id:id})
    this.setState({
      rejectReason:payload
    })
  }
  async handleCashOut(){
    let option = {
      order_id:this.$router.params.id,
      amount:this.$router.params.amount
    }
    const res = await api.store.orderCashOut(option)
    if(res.status === 'ok'){
      Taro.showToast({title:'申请提交成功',duration:1000})
    }else{
      Taro.showToast({title:'申请失败,稍后重试',icon:'none',duration:1000})
    }
    Taro.redirectTo({url:'/marketing/pages/user-store/trade/list?status=done'})
  }
  render() {
    return  (
      <View className='cash-out-detail'>
        <NavGap title='提现详情'/>
        <View className='cash-out-detail-content'>
          <View className='order-status'>已拒绝</View>
          <View className='reject-reason'>
            <View className='reject-title'>拒绝原因:</View>
            <View className='reject-body'>
              {this.state.rejectReason}
            </View>
          </View>
          <View className='cash-out-feature' onClick={this.handleCashOut.bind(this)}>
               再次申请提现
          </View>
        </View>
      </View>
    )
  }
}
