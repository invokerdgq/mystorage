import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'

import './trade-item.scss'
export default class StoreTradeItem extends Component{
  static defaultProps = {
    info:{},
    handleClick:() => {},
    top:true,
    bottom:true
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {info} = this.props
    let payTypeText = ''
    switch (info.pay_type) {
      case "wxpay":
        payTypeText = '微信支付'
        break
      case "surplus":
        payTypeText = '余额抵扣'
        break
      default :
        payTypeText = '混合支付'
    }
    return(
      <View className='store-trade-item'>
        {
          this.props.top&&
          <View className='item-top'>
            <Text>{info.create_date}</Text>
            <Text>订单号: {info.order_id}</Text>
          </View>
        }
        <View className='item-middle'>
          {
            info.items.map((item,index) => {
              return(
                <View className='goods-item'>
                  <View className='goods-img'><Image mode='widthFix' className='img' src={item.pic}/></View>
                  <View className='dec'>
                    <View className='dec-name'>{item.item_name}</View>
                    <View className='dec-num'>{item.num}</View>
                    {
                      item.item_spec_desc&&
                      <View className='dec-spec'>{item.item_spec_desc}</View>
                    }
                  </View>
                  <View className='pay'>{payTypeText}</View>
                </View>
              )
            })
          }
        </View>
        {
          this.props.bottom&&
          <View className='item-bottom'>
            <View className='bottom-dec'>共{info.items.length}件商品 合计：￥{Number(info.total_fee)/100}</View>
            <View className='bottom-feature'>
              <View className='feature-status'>{info.order_status_msg}</View>
              <View className='feature-detail feature' onClick={() => {this.props.handleClick('detail',info)}}>订单详情</View>
              {
                info.order_status === 'PAYED'&&
                <View className='feature-delivery feature' onClick={() => {this.props.handleClick('delivery',info)}}>发货</View>
              }
              {
                info.order_status === 'DONE'&&
                  <View>
                    {
                      info.commission_status == '2'&&
                      <View className='feature-cash-out' >提现完成</View>
                    }
                    {
                      info.commission_status == '1'&&
                      <View className='feature-cash-out'>提现中</View>
                    }
                    {
                      info.commission_status == '0'&&
                      <View className='feature-cash-out'>提现审核中</View>
                    }
                    {
                      info.commission_status == '-1'&&
                      <View className='feature-cash-out'>提现审核失败</View>
                    }
                    {
                      info.commission_status == '-2'&&
                      <View className='feature-cash-out'>提现已失效</View>
                    }
                    {
                      info.commission_status == '4'&&
                      <View className='feature-cash-out feature' onClick={() =>{this.props.handleClick('cash-out',info)}}>申请提现</View>
                    }
                  </View>
              }
            </View>
          </View>
        }
      </View>
    )
  }
}
