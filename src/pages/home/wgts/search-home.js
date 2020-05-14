import Taro, { Component } from '@tarojs/taro'
import {View, Form, Text, Image, Icon} from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { classNames } from '@/utils'
import { toggleTouchMove } from '@/utils/dom'

import './search-home.scss'

export default class WgtSearchHome extends Component {
  static defaultProps = {
    info: null
  }

  constructor (props) {
    super(props)

    this.state = {
      searchValue: '',
      historyList: [],
      isShowAction: false
    }
  }

  static options = {
    addGlobalClass: true
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'h5') {
      toggleTouchMove(this.refs.container)
    }
  }

  searchTap = () => {
    Taro.navigateTo({
      url: '/pages/item/list'
    })
  }

  render () {
    const { info } = this.props
    if (!info) {
      return null
    }

    const { base, config } = info

    return (
      // <View className={`wgt ${base.padded ? 'wgt__padded' : null}`}>
      //   <View className={`search ${config.fixTop ? 'fixed' : null}`}>
      //     <View className="content-padded">
      //       <View className="search-box view-flex view-flex-middle view-flex-center" onClick={this.searchTap.bind(this)}>
      //         <Icon className="search-icon" type="search" size="14" color="#999999"></Icon>
      //         <View>输入商品名称</View>
      //       </View>
      //     </View>
      //   </View>
      // </View>
      <View className="search-box-container">
         <View className="search-nav" onClick={this.searchTap.bind(this)}>
           <Icon className=""/>
           <View className="search-placeholder">
             搜索你喜欢的商品
           </View>
         </View>
      </View>
    )
  }
}
