import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { styleNames } from '@/utils'

import './index.scss'

export default class BackToTop extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    bottom: null
  }

  render () {
    const { bottom } = this.props

    return (
      <View
        className='float-menus'
        style={styleNames(bottom ? { bottom: `${Taro.pxTransform(bottom)}` } : null)}
      >
        {this.props.children}
      </View>
    )
  }
}
