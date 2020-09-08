import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,ScrollView} from '@tarojs/components'
import api from '@/api'
import NavGap from "../../../../components";
import './trade-detail.scss'
export default class StoreTradeDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cancelData: {},
      orderInfo: {items:[]},
      tradeInfo: {}
    }
  }
  componentWillMount() {
    const {id} = this.$router.params
    this.getDetail(id)
  }
  async getDetail(id){
    const res = await api.store.getOrderDetail(id)
    this.setState({
      cancelData: res.cancelData,
      orderInfo:res.orderInfo,
      tradeInfo:res.tradeInfo,
    })
  }
  render() {
    const {orderInfo,tradeInfo,cancelData} = this.state
    let payType
    switch (tradeInfo.payType) {
      case "wxpay":
        payType = '微信支付'
        break
      case "surplus":
        payType = '余额支付'
        break
      default :
        payType = '混合支付'
    }
    return(
      <View className='trade-detail'>
        <NavGap title='订单详情'/>
        <View className='trade-detail-content'>
          <View className='base detail-item'>
            <View className='title'>订单基本信息</View>
            <View className='item-content'>
              <View className='item-item'><Text>订单号:{orderInfo.order_id}</Text></View>
              <View className='item-item'><Text>会员姓名:{orderInfo.receiver_name}</Text></View>
              <View className='item-item'><Text>订单总金额:{Number(orderInfo.total_fee)/100}</Text><Text>运费:{Number(orderInfo.freight_fee)/100}</Text></View>
              {
               cancelData.cancel_reason&&
               <View>申请取消原因:{cancelData.cancel_reason}</View>
              }
            </View>
          </View>
          <View className='goods detail-item'>
            <View className='title'>商品信息</View>
            <View className='item-content'>
              {orderInfo.items.length !== 0&&
                orderInfo.items.map(item => {
                  return(
                    <View className='order-item'>
                      <View className='goods-item'>
                        <View className='goods-img'><Image mode='widthFix' className='img' src={item.pic}/></View>
                        <View className='goods-dec'>
                          <View>{item.item_name}</View>
                          <View>数量:{item.num}</View>
                          {item.item_spec_desc&&
                            <View>{item.item_spec_desc}</View>
                          }
                        </View>
                        <View className='price'>￥{Number(item.item_fee)/100}</View>
                      </View>
                       {
                         item.delivery_code&&
                         <View className='delivery-dec'>
                           <View className='delivery-status'>{item.delivery_status === 'PENDING'?'待发货':'已发货'}</View>
                           {
                             item.delivery_status === 'DONE'&&
                             <View className='dec-more'>
                               <View>快递公司:{item.delivery_corp_name}</View>
                               <View>快递单号:{item.delivery_code}</View>
                             </View>
                           }
                         </View>
                       }
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View className='delivery detail-item'>
            <View className='title'>物流信息</View>
            <View className='item-content'>
              <View className='item-item'>收货人:{orderInfo.receiver_name}</View>
              <View className='item-item'>收货人手机:{orderInfo.receiver_mobile}</View>
              <View className='item-item'>地址: {orderInfo.receiver_state}{orderInfo.receiver_city}{orderInfo.receiver_district}{orderInfo.receiver_address}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
