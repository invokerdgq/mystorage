import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { classNames } from '@/utils'

import './index.scss'

@connect(({ colors }) => ({
  colors: colors.current
}))

export default class CouponItem extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    onClick: () => {},
    info: null,
    isShowCheckout: false,
    isDisabled: false
  }

  constructor (props) {
    super(props)

    this.state = {
      isItemChecked: false,
    }
  }

  handleClickChecked = (index) => {
    if(this.props.curKey === index) {
      this.setState({
        isItemChecked: !this.state.isItemChecked
      })
    } else {
      this.setState({
        isItemChecked: true
      })
    }
    this.props.onClickBtn(index)
  }

  render () {
    const { info, isShowCheckout, isChoosed, onClick, colors } = this.props
    const { isItemChecked } = this.state

    if (!info) {
      return null
    }

    const isDisabled = info.status === '2' || this.props.isDisabled

    return (
      <View
        className='coupon-item-index'
        onClick={this.props.onClick}
      >
        {
          isShowCheckout && isDisabled && <View className='coupon-item__check' onClick={this.handleClickChecked.bind(this, info.id)}>
            {

              isChoosed === info.id && isItemChecked
                ? <Text className='icon-check coupon-item__checked'> </Text>
                : <Text className='coupon-item__unchecked'> </Text>
            }
          </View>
        }
        <View className='coupon-item'>
          {
            info.card_type === 'cash'
              ? <View
                  className={classNames('coupon-item__name', isDisabled ? 'coupon-item__name-not' : null)}
                  style={isDisabled ? `background:#d7d7d7` : `background:${colors.data[0].primary}`}
                  >
                  <View className='coupon-item___number'>￥<Text className='coupon-item___number_text'>{info.reduce_cost/100}</Text></View>
                  <View className='coupon-item___info'>满{info.least_cost > 0 ? info.least_cost/100 : 0.01}可用</View>
                  <View className='radius-view radius-left-top'> </View>
                  <View className='radius-view radius-left-bottom'> </View>
                </View>
                : null
          }
          {
            info.card_type === 'gift'
              ? <View
                  className={classNames('coupon-item__name', isDisabled ? 'coupon-item__name-not' : null)}
                  style={isDisabled ? `background:#d7d7d7` : `background:${colors.data[0].primary}`}
                  >
                  <View className='coupon-item___number'>兑换券</View>
                  <View className='radius-view radius-left-top'> </View>
                  <View className='radius-view radius-left-bottom'> </View>
                </View>
                : null
          }
          {
            info.card_type === 'discount'
              ? <View
                  className={classNames('coupon-item__name', isDisabled ? 'coupon-item__name-not' : null)}
                  style={isDisabled ? `background: #d7d7d7` : `background:${colors.data[0].primary}`}                  
                  >
                <View className='coupon-item___number'><Text className='coupon-item___number_text'>{(100-info.discount)/10}</Text>折</View>
                <View className='coupon-item___info'>满{info.least_cost > 0 ? info.least_cost/100 : 0.01}可用</View>
                <View className='radius-view radius-left-top'> </View>
                <View className='radius-view radius-left-bottom'> </View>
              </View>
              : null
          }
          {
            info.card_type === 'member' && (
              <View
                className={classNames('coupon-item__name', info.status === '2' ? 'coupon-item__name-not' : null)}
                style={isDisabled ? `background:#d7d7d7` : `background:${colors.data[0].primary}`}
                >
                <View className='coupon-item___number'><Text className='coupon-item___number_text'>会员折扣</Text></View>
                <View className='radius-view radius-left-top'> </View>
                <View className='radius-view radius-left-bottom'> </View>
              </View>
            )
          }
          <View className='coupon-item__content'>
            <View className='coupon-item___description'>
              <View>{info.title}</View>
              {
                info.tagClass === 'used'
                  ? <View className='coupon-item___used'>
                      <Text className='sp-icon sp-icon-yishiyong icon-used'></Text>
                    </View>
                    : null
              }
              {info.begin_date && info.end_date && (
                <View className='coupon-item___time'><Text>{info.begin_date} ~ {info.end_date}</Text></View>
              )}
            </View>
            {this.props.children}
            <View className='radius-view radius-right-top'> </View>
            <View className='radius-view radius-right-bottom'> </View>
          </View>
          {this.props.renderFooter}
        </View>
      </View>
    )
  }
}
