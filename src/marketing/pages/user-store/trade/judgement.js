import Taro, { Component } from '@tarojs/taro'
import {View, RadioGroup, Radio, Label, Text, Input, Textarea} from '@tarojs/components'
import NavGap from "../../../../components";
import api from '@/api'
import './judgement.scss'
export default class Judgement extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info:'',
      status:'reject',
      rejectReason:''
    }
  }
  componentWillMount() {
    const {id} = this.$router.params
    this.fetchDetail(id)
  }
  async fetchDetail(id){
   const info = await api.store.getCancelOrderDetail(id)
    this.setState({
      info
    })
  }
  handleChange(e){
    this.setState({
      status:e.detail.value
    })
  }
  handleValueChange(e){
    this.state.rejectReason = e.detail.value
    this.setState({
      rejectReason:this.state.rejectReason
    })
  }
  async confirm(){
    let option = {
      order_id:this.$router.params.id,
      check_cancel:this.state.status === 'reject'?0:1,
      shop_reject_reason:this.state.rejectReason
    }
    if(this.state.status === 'reject' && !this.state.rejectReason){
      Taro.showToast({title:'请填写原因',icon:'none'})
      return
    }
    try {
      await api.store.judge(option)
      Taro.redirectTo({url:'/marketing/pages/user-store/trade/list?status=cancelapply'})
    }catch (e) {
      Taro.showToast({title:e.errMsg || '出现错误，稍后重试',icon:'none'})
    }


  }
  render() {
    const { status,rejectReason,info } = this.state
    return(
      <View className='order-judgement'>
        <NavGap title='退款审核'/>
        <View className='order-judgement-content'>
          <View className='title'>退款原因</View>
          <View className='cancel-reason'>{info.cancel_reason}</View>
          <View className='choose-judge'>
             <RadioGroup onChange={this.handleChange.bind(this)}>
               <Text>审核意见:</Text>
               <Label className='reject-cancel'><Radio value='reject' checked={status === 'reject'} name='choose' color='#c0534e'/><Text>拒绝</Text></Label>
               <Label className='resolve-cancel'><Radio value='resolve' checked={status === 'resolve'} name='choose' color='#c0534e'/><Text>同意</Text></Label>
             </RadioGroup>
            {
              status === 'reject'&&
                <View className='reject-reason'>
                  <Text>拒绝原因</Text>
                  <Textarea value={rejectReason} onInput={this.handleValueChange.bind(this)} className='reject-reason-input'/>
                </View>
            }
          </View>
          <View className='judge-feature' onClick={this.confirm.bind(this)}>
            确认
          </View>
        </View>
      </View>
    )
  }
}
