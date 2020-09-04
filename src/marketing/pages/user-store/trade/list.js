import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,ScrollView} from '@tarojs/components'
import {FilterBar, Loading, NavGap} from "../../../../components";
import api from '@/api'
import StoreTradeItem from './trade-item'
import './list.scss'
import {withPager} from "../../../../hocs";

@withPager
export default class StoreList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      curTabIndex:0,
      statusList:[
        {title:'全部',status:''},
        {title:'待发货',status:'notship'},
        {title:'未支付',status:'notpay'},
        {title:'已完成',status:'done'},
        {title:'已取消',status:'cancel'}
      ],
      orderList:[]
    }
  }
  componentWillMount() {
    const {status} = this.$router.params
    this.setState({
      curTabIndex:this.state.statusList.findIndex(item => item.status === status)
    },() => {
      this.nextPage()
    })
  }
  getParams(status){
    return {
      order_class_exclude:'drug',
      order_type:'normal',
      order_status:status
    }
  }
  fetch = async(params) => {
    const { page_no ,page_size } = params
    let status = this.state.statusList[this.state.curTabIndex].status
    let option = this.getParams(status)
    const {list,pager} = await api.store.getTradeList({...option,page:page_no,pageSize:page_size})
    this.setState({
      orderList:[...this.state.orderList,...list]
    })
    return {total:pager.count}

  }
  handleTabChange(e){
    if(this.state.page.isLoading) return
    const {current} = e
    this.setState({
      curTabIndex:current
    },() => {
      this.resetPage(() =>{
        this.setState({
          orderList:[]
        },() =>{
          this.nextPage()
        })
      })
    })
  }
  async handleFeatureClick(type,item){
   switch (type) {
     case "detail":
       Taro.navigateTo({url:`/marketing/pages/user-store/trade/trade-detail?id=${item.order_id}`})
       break
     case "cash-out":
        let option = {
          order_id:item.order_id,
          amount:Number(item.total_fee)/100
        }
        const res = await api.store.orderCashOut(option)
       if(res.status === 'ok'){
         Taro.showToast({title:'申请提交成功',duration:1000})
       }else{
         Taro.showToast({title:'申请失败,稍后重试',icon:'none',duration:1000})
       }
       Taro.redirectTo({url:'/marketing/pages/user-store/trade/list?status=done'})
       break
     case "delivery":
       if(item.cancel_status === 'WAIT_PROCESS'){
         Taro.showToast({title:'客户已经申请退款，请先处理退款操作再决定是否发货!',icon:'none',duration:1500})
       return
       }
       Taro.navigateTo({url:`/marketing/pages/user-store/trade/delivery?id=${item.order_id}`})
       break
     default :

   }
  }
  render() {
    const {curTabIndex,statusList,orderList} = this.state
    return(
      <View className='store-trade'>
        <NavGap title='店铺订单'/>
        <View className='store-trade-content'>
         <FilterBar
           className='order-list__tabs'
           custom
           current={curTabIndex}
           list={statusList}
           onChange={this.handleTabChange.bind(this)}
         />
         <ScrollView
          scrollY
          enableFlex={true}
          className='scroll-order-list'
          onScrollToLower={this.nextPage}
         >
           <View className='list-container'>
             {
               this.state.page.isLoading?
                 <View className='none-order'><Loading>加载中...</Loading></View>:
                 orderList.length === 0?
                   <View className='none-order'>暂时没有订单</View>:
                   orderList.map((item,index) => {
                     return(
                       <StoreTradeItem
                          info={item}
                          handleClick={this.handleFeatureClick.bind(this)}
                       />
                     )
                   })
             }
           </View>
         </ScrollView>
        </View>
      </View>
    )
  }
}
