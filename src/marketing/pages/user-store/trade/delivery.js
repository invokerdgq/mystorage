import Taro, { Component } from '@tarojs/taro'
import {View, Form, Switch, Picker, Input, Text, Image} from '@tarojs/components'

import StoreTradeItem from "./trade-item";
import NavGap from "../../../../components";
import api from "@/api"
import './delivery.scss'
export default class StoreDelivery extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pickerValue:0,
      pickerValueList:[],
      logisticsList:[],
      info:{items:[]},
      form:{
        delivery_type:'batch',
        order_id: '',
        delivery_corp: '',
        delivery_code: '',
        sepInfo: {}
      }
    }
  }
  componentWillMount() {
    const {id,is_edit} = this.$router.params
    this.state.form.order_id = id
    this.getDetail(id)
  }
  async getDetail(id){
    const [detail,res] = await Promise.all([api.store.getOrderDetail(id),api.store.getLogisticsList()])

    if(detail.orderInfo.items.length >1){
      this.state.pickerValueList = Array.from({length:detail.orderInfo.items.length}).fill(0)
    }
    this.setState({
      info:detail.orderInfo,
      logisticsList:res.list,
      pickerValueList:this.state.pickerValueList
    })
  }
  back(){
    Taro.navigateBack()
  }
  async handleSaveSetting(){
   if(this.state.form.delivery_type === 'batch'){
     if( this.state.form.delivery_corp === ''){
       Taro.showToast({title:'请选择快递公司',icon:'none',duration:1000})
       return
     }
     if(this.state.form.delivery_code === ''){
       Taro.showToast({title:'请输入正确的快递单号',icon:'none',duration:1000})
       return
     }
     this.state.form.sepInfo = {}
   }
   if(this.state.form.delivery_type === 'sep'){
    let hadError
     this.state.info.items.map((item,index) => {
       if(item.delivery_corp === ''){
         Taro.showToast({title:`请选择第${index +1}项的快递公司`})
         hadError = true
       }
       if(item.delivery_code === '' || !/^[0-9]*$/.test(item.delivery_code)){
         Taro.showToast({title:`第${index +1}项的快递单号有误`})
         hadError = true
       }
     })
     if(hadError)return
     this.state.form.delivery_code = ''
     this.state.form.delivery_corp = ''
     this.state.form.sepInfo = JSON.stringify(this.state.info.items)
   }
   const res = await api.store.delivery(this.state.form)
    if(res.delivery_status && res.delivery_status !== 'PENDING'){
      Taro.showToast({title:"发货成功",duration:1500})
      setTimeout(() => {
        Taro.redirectTo({url:'/marketing/pages/user-store/trade/list?status='})
      },1500)
    }else{
      Taro.showToast({title:"发货失败,稍后重试",icon:'none',duration:1500})
    }
  }
  handleValueChange(type,index,e){
    if(type === 'batch'){
      this.state.form.delivery_corp = this.state.logisticsList[e.detail.value].value
      this.setState({
        pickerValue:e.detail.value,
        form:this.state.form
      })
    }else{
      this.state.pickerValueList[index] = e.detail.value
      this.state.info.items[index].delivery_corp = this.state.logisticsList[e.detail.value].value
      this.setState({
        pickerValueList:this.state.pickerValueList,
        info:this.state.info
      })
    }
  }
  handleCodeChange(type,index,e){
    if(type === 'batch'){
      this.state.form.delivery_code = e.detail.value
      this.setState({
        form:this.state.form
      })
    }else{
      this.state.info.items[index].delivery_code = e.detail.value
    }
  }
  switchChange(){
    this.state.form.delivery_type = this.state.form.delivery_type === 'batch'?'sep':'batch'
    this.setState({
      form:this.state.form
    },() => {
      console.log(this.state.form.delivery_type)
    })
  }
  render() {
    const {form,info,pickerValue,pickerValueList,logisticsList} = this.state
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
      <View className='delivery'>
        <NavGap title={'发货'}/>
        <View className='delivery-content'>
         <View className='delivery-content-title'>发货设置</View>
          <View className='delivery-body'>
            <Form>
              <View className='delivery-type'><View className='dec'>发货类型:</View><View className='batch'>整单</View><Switch color={'#c0534e'} checked={form.delivery_type === 'sep'} onChange={this.switchChange.bind(this)}/><View className='sep'>拆分</View></View>
              {
                form.delivery_type === 'batch'?
                  <View className='delivery-setting-batch'>
                    <View className='dec'>商品信息</View>
                    <View className='order-goods'>
                      {
                        info.items.length !== 0&&
                        info.items.map((item,index) => {
                          return(
                            <View className='goods-item'>
                              <View className='goods-img'><Image mode='widthFix' className='img' src={item.pic}/></View>
                              <View className='dec'>
                                <View className='dec-name'>{item.item_name}</View>
                                <View className='dec-num'>{item.num}</View>
                                {item.item_spec_desc&&
                                  <View className='dec-spec'>{item.item_spec_desc}</View>
                                }
                              </View>
                              <View className='pay'>{payTypeText}</View>
                            </View>
                          )
                        })
                      }
                    </View>
                    <View className='set-delivery-company'>
                      <Text className='dec'>快递公司:</Text>
                      <Picker
                        range={logisticsList}
                        rangeKey='name'
                        value={pickerValue}
                        onChange={this.handleValueChange.bind(this,'batch','')}
                      >
                        <View className='picker-input'>
                          {!form.delivery_corp ?'请选择快递公司':logisticsList[pickerValue].name} >
                        </View>
                      </Picker>
                    </View>
                    <View className='set-delivery-code'>
                      <Text class='dec'>物流单号</Text>
                      <Input value={form.delivery_code} placeholder='物流公司单号' placeholderClass='holder-input' onInput={this.handleCodeChange.bind(this,'batch','')} className='code-input'/>
                    </View>
                  </View>:
                  <View className='delivery-setting-sep'>
                    <View className='dec'>商品信息</View>
                    {
                      info.items.length !== 0&&
                      info.items.map((item,index)=> {
                        return(
                          <View className='order-goods'>
                            <View className='signal-item'>
                              <View className='goods-item'>
                                <View className='goods-img'><Image mode='widthFix' className='img' src={item.pic}/></View>
                                <View className='dec'>
                                  <View className='dec-name'>{item.item_name}</View>
                                  <View className='dec-num'>{item.num}</View>
                                  {item.item_spec_desc&&
                                  <View className='dec-spec'>{item.item_spec_desc}</View>
                                  }
                                </View>
                                <View className='pay'>{payTypeText}</View>
                              </View>
                            </View>
                            <View className='set-delivery-company'>
                              <Text className='dec'>快递公司:</Text>
                              <Picker
                                range={logisticsList}
                                rangeKey='name'
                                value={pickerValueList[index]}
                                onChange={this.handleValueChange.bind(this,'sep',index)}
                              >
                                <View className='picker-input'>
                                  {!item.delivery_corp?'请选择快递公司':logisticsList[pickerValueList[index]].name} >
                                </View>
                              </Picker>
                            </View>
                            <View className='set-delivery-code'>
                              <Text className='dec'>物流单号</Text>
                              <Input value={item.delivery_code} placeholder='物流公司单号' placeholderClass='holder-input' onInput={this.handleCodeChange.bind(this,'sep',index)} className='code-input'/>
                            </View>
                          </View>
                        )
                      })
                    }
                  </View>
              }
              <View className='delivery-save'>
                <View className='cancel' onClick={this.back}>取消</View>
                <View className='confirm' onClick={this.handleSaveSetting.bind(this)}>确定</View>
              </View>
            </Form>
          </View>
        </View>
      </View>
    )
  }
}
