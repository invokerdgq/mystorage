import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtFloatLayout, AtButton ,AtInput} from 'taro-ui'
import { SpCheckbox } from '@/components'
import S from '@/spx'

import './payment-picker.scss'

@connect(({ colors }) => ({
  colors: colors.current
}))

export default class PaymentPicker extends Component {
  static defaultProps = {
    isOpened: false,
    type: 'wxpay',
    disabledPayment: null
  }

  static options = {
    addGlobalClass: true
  }

  constructor (props) {
    super(props)

    this.state = {
      localType: props.type,
      total_balance:0,
      commission_balance:''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type !== this.props.type) {
      this.setState({
        localType: nextProps.type
      })
    }
  }
 componentDidMount() {
 }

  handleCancel = () => {
    this.setState({
      localType: this.props.type
    })
    this.props.onClose()
  }

  handlePaymentChange = (type) => {
    // const { disabledPayment } = this.props
    // if (disabledPayment && disabledPayment.name === type) return
   const {disabledSurplus = false,disabledWxpaySurplus = false } = this.props
    switch (type) {
      case 'surplus':
        if(disabledSurplus) {
          Taro.showToast({
            title:'余额不足',
            icon:'none',
            duration:1500
          })
          return
        }
        break;
      case 'wxpaysurplus':
        if(disabledWxpaySurplus)
        {
          Taro.showToast({
            title:'余额不足',
            icon:'none',
            duration:1500
          })
          return
        }
        break;
      default:
        break
    }
    this.setState({
      localType: type
    })
  }

  handleChange = (type,commission_balance) => {
    if(type === 'wxpaysurplus'){
      if(!/^[0-9][0-9]*(\.){0,1}[0-9]{0,2}$/.test(commission_balance)){
       Taro.showToast({
         title:'请输入正确的金额',
         icon:'none',
         duration:1500
       })
        return
      }
      if(Number(commission_balance) == 0){
        Taro.showToast({
          title:'不能为0',
          icon:'none',
          duration:1500
        })
        return
      }
      if(Number(commission_balance) > Number(this.props.total)){
        Taro.showToast({
          title:'不能超过余额总数',
          icon:'none',
          duration:1500
        })
        return
      }

      if(Number(commission_balance) >= Number(this.props.orderTotal/100)){
        Taro.showToast({
          title:'不能超过订单总额',
          icon:'none',
          duration:1500
        })
        return
      }
    }
    this.props.onChange(type,commission_balance)
  }
  handleInputChange (value){
    this.setState({
      commission_balance:value
    })
  }
  render () {
    const { orderTotal,isOpened, loading, disabledPayment, colors, isShowPoint = true, isShowBalance = true,isShowsurplus = true,isShowwxpaysurplus = true,disabledSurplus = false,disabledWxpaySurplus = false ,total = 0} = this.props
    const { localType,commission_balance } = this.state

    return (
      <AtFloatLayout
        isOpened={isOpened}
      >
        <View className='payment-picker'>
          <View className='payment-picker__hd'>
            <Text>支付方式</Text>
            <View
              className='at-icon at-icon-close'
              onClick={this.handleCancel}
            />
          </View>
          <View className='payment-picker__bd'>
            {
              isShowsurplus&&
              <View
                className={`payment-item ${disabledPayment && disabledPayment.name === 'point' ? 'is-disabled' : ''}`}
                onClick={this.handlePaymentChange.bind(this, 'surplus')}
              >
                <View className='payment-item__bd'>
                  <Text className='payment-item__title'>全余额支付</Text>
                  <Text className='payment-item__desc'>{disabledSurplus ? '余额不足':'余额全款支付' }</Text>
                </View>
                <View className='payment-item__ft'>
                  <SpCheckbox
                    disabled={disabledSurplus}
                    colors={colors}
                    checked={localType === 'surplus'}
                  />
                </View>
              </View>
            }
            {
              isShowwxpaysurplus&&
                <View>
                  <View
                    className={`payment-item ${disabledPayment && disabledPayment.name === 'point' ? 'is-disabled' : ''}`}
                    onClick={this.handlePaymentChange.bind(this, 'wxpaysurplus')}
                  >
                    <View className='payment-item__bd'>
                      <Text className='payment-item__title'>混合支付</Text>
                      <Text className='payment-item__desc'>{disabledWxpaySurplus?'余额不足':'部分使用余额支付' }</Text>
                    </View>
                    <View className='payment-item__ft'>
                      <SpCheckbox
                        disabled={disabledWxpaySurplus}
                        colors={colors}
                        checked={localType === 'wxpaysurplus'}
                      />
                    </View>
                  </View>
                  {
                    localType === 'wxpaysurplus'&&
                    <View className='part-balance-payment'>
                      <Text className='dec'>输入余额抵扣金额:</Text><AtInput placeholderStyle='margin-left:20rpx' className='input' border={false} type='text' placeholder='请输入(最多两位小数)' value={this.state.commission_balance} onChange={this.handleInputChange.bind(this)}/><Text className='dec'>余额<Text className='total'>{total}</Text></Text>
                    </View>
                  }
                </View>
            }
          {/*{*/}
          {/*    isShowPoint && process.env.TARO_ENV === 'weapp' &&*/}
          {/*    <View*/}
          {/*      className={`payment-item ${disabledPayment && disabledPayment.name === 'point' ? 'is-disabled' : ''}`}*/}
          {/*      onClick={this.handlePaymentChange.bind(this, 'point')}*/}
          {/*    >*/}
          {/*      <View className='payment-item__bd'>*/}
          {/*        <Text className='payment-item__title'>积分支付</Text>*/}
          {/*        <Text className='payment-item__desc'>{disabledPayment && disabledPayment.name === 'point' ? disabledPayment.message : '使用积分支付'}</Text>*/}
          {/*      </View>*/}
          {/*      <View className='payment-item__ft'>*/}
          {/*        <SpCheckbox*/}
          {/*          disabled={!!disabledPayment}*/}
          {/*          colors={colors}*/}
          {/*          checked={localType === 'point'}*/}
          {/*        ></SpCheckbox>*/}
          {/*      </View>*/}
          {/*    </View>*/}
          {/*  }*/}
          {/*  {*/}
          {/*    isShowBalance && process.env.TARO_ENV === 'weapp' &&*/}
          {/*    <View*/}
          {/*      className={`payment-item ${disabledPayment && disabledPayment.name === 'balance' ? 'is-disabled' : ''}`}*/}
          {/*      onClick={this.handlePaymentChange.bind(this, 'balance')}*/}
          {/*    >*/}
          {/*      <View className='payment-item__bd'>*/}
          {/*        <Text className='payment-item__title'>余额支付</Text>*/}
          {/*        <Text className='payment-item__desc'>{disabledPayment && disabledPayment.name === 'balance' ? disabledPayment.message : '使用余额支付'}</Text>*/}
          {/*      </View>*/}
          {/*      <View className='payment-item__ft'>*/}
          {/*        <SpCheckbox*/}
          {/*          disabled={!!disabledPayment}*/}
          {/*          colors={colors}*/}
          {/*          checked={localType === 'balance'}*/}
          {/*        ></SpCheckbox>*/}
          {/*      </View>*/}
          {/*    </View>*/}
          {/*  }*/}
            <View
              className='payment-item no-border'
              onClick={this.handlePaymentChange.bind(this, 'wxpay')}
            >
              <View className='payment-item__bd'>
                <Text className='payment-item__title'>微信支付</Text>
                <Text className='payment-item__desc'>微信支付</Text>
              </View>
              <View className='payment-item__ft'>
                <SpCheckbox
                  checked={localType === 'wxpay'}
                ></SpCheckbox>
              </View>
            </View>
          </View>
          <Button
            type='primary'
            className='btn-submit'
            style={`background: ${colors.data[0].primary}; border-color: ${colors.data[0].primary};`}
            loading={loading}
            onClick={this.handleChange.bind(this, localType,commission_balance)}
          >确定</Button>
        </View>
      </AtFloatLayout>
    )
  }
}
