import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";
import api from '@/api'

import './cash-out.scss'
import {withPager} from "@/hocs";


@withPager
export default class CashOut extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      value:'',
      commissionList:[]
    }
  }
 componentDidMount() {
   this.nextPage()
 }
  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    params = {
      // ...params,
      type:1,
      page,
      pageSize
    }
    const { list, total_count: total } = await api.member.commission(params)
    this.setState({
      // list: [...this.state.list, ...nList],
      commissionList:[...this.state.commissionList, ...list]
    })

    return { total }
  }
//  async fetchMission  ()  {
//    let res = await api.member.commission({page:1,pageSize:10,type:1});
//   let newList =  res.list.filter((item,index) => {
//      return item.type === '佣金提现'
//    })
//    console.log('kkkk')
//    console.log(newList)
//    this.setState({
//      commissionList:newList
//    })
// }
 async handleComfirm  () {
    if(this.state.value > 5000){
      Taro.showToast({
        title:'超过单笔限额',
        icon:'none',
        duration:1500,
      })
      return
    }else if(this.state.value < 1){
      Taro.showToast({
        title:'最低为一元',
        icon:'none',
        duration:1500,
      })
      return
    }
    console.log('类型')
   console.log(typeof this.state.value)
   if(Number(this.state.value) > (Number(this.$router.params.commission)/100).toFixed(2)){
     Taro.showToast({
       title:'超过可提现总额',
       icon:'none',
       duration:1500,
     })
     return
   }
  const res = await api.member.cashOut({amount:this.state.value})
   if(res.status === 'ok'){
     Taro.showToast({
       title:'提交申请成功，请等待审核',
       icon:'none',
       duration:2000,
       success() {
         setTimeout(() => {
           Taro.navigateBack()
         },2000)
       }
     })
   }else{
     Taro.showToast({
       title:res.errMsg,
       icon:'none',
       duration:1500
     })
   }
 }
 handleAll =() =>{
    console.log(this.$router.params.commission)
    this.setState({
      value:(Number(this.$router.params.commission)/100).toFixed(2)
    })
 }
 setValue =(e) => {
    this.setState({
      value:e.detail.value
    })
 }
 render() {
    const {commissionList} = this.state
   const { commission } = this.$router.params
   const info = Taro.getStorageSync('userinfo')
   return (
     <View>
       <NavGap title='立即提现'/>
       <View className='cash-out-container'>
         <View className='cash-out'>
           <View>
             <View className='cash-out-count'>￥{(Number(commission)/100).toFixed(2)}</View>
             <View className='cash-out-dec'>可提现金额</View>
           </View>
           <View className='cash-out-input-dec'>提现金额</View>
           <View className='cash-out-input'>
             ￥<Input type='number' placeholder='输入提现金额(1~5000)' placeholderStyle='color:#bcbcbc;font-size:31rpx' onInput={this.setValue} value={this.state.value}/>
             <Text className='cash-out-all' onClick={this.handleAll}>全部</Text>
           </View>
           <View className='cash-out-from'>微信到账 {info.username}</View>
         </View>
         <View className='check-button' onClick={this.handleComfirm.bind(this)}>提交申请</View>
         <View>
           <View className='detail-title'>提现状态明细</View>
           <View>
             <ScrollView
             scrollY = {true}
             class='dec-scroll'
             onScrollToLower={this.nextPage.bind(this)}
             >
               {
                 commissionList.map((item,index) => {
                   return (
                     <View className='detail-item'>
                       <View className='source-type'><Text>{item.type?item.type:'暂时未知'}</Text><Text className='status'>{item.status}</Text></View>
                       <View className='create-time'>创建时间 :{item.created}</View>
                       <View className='remark-mount'>
                         <View className='remark'>备注:{item.remark}</View>
                         <View className='mount'><Text className='mount-inner'>￥{(Number(item.amount)/100).toFixed(2)}</Text></View>
                       </View>
                     </View>
                   )
                 })
               }
             </ScrollView>
           </View>
         </View>
       </View>
     </View>
   )
 }
}
