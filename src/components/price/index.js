import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { classNames, isNumber } from '@/utils'

import './price.scss'

export default class Price extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    className: null,
    value: null,
    primary: false,
    noSymbol: false,
    noDecimal: false,
    unit: 'default',
    appendText: '',
    choiceColor:false
  }

  static externalClasses = ['classes']

  render () {
    const { value = '', noSymbol, primary, noDecimal, className, unit, appendText, lineThrough ,choiceColor} = this.props
    let priceVal = (unit === 'cent') ? (+value) / 100 : value
    if (isNumber(priceVal)) {
      priceVal = priceVal.toFixed(2)
    }
    const [int, decimal] = (priceVal || '').split('.')
    const minus = value < 0
    const symbol = this.props.symbol || '¥'

    return (
      <Text className={`${classNames(lineThrough ? 'price-market' : 'price', 'classes', primary ? 'price__primary' : null, className)} ${choiceColor?'theme-color':'default-color'}`}>
        {minus && (<Text>-</Text>)}
        {noSymbol ? null : <Text className='price__symbol'>{symbol}</Text>}
        <Text className='price__int'>{int.indexOf('-') === 0 ? int.slice(1) : int}</Text>
        {decimal !== undefined && !noDecimal && (
          <Text className='price__decimal'>.{decimal}</Text>
        )}
        {appendText && (<Text className='price__append'>{appendText}</Text>)}
      </Text>
    )
  }
}
