import Taro, { Component } from '@tarojs/taro'
import {View, Form, Text, Image, Icon,Slot} from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { classNames } from '@/utils'
import { toggleTouchMove } from '@/utils/dom'
import NavBar from 'taro-navigationbar';
import {cdn} from '../../../consts/index'

import './search-home.scss'

export default class WgtSearchHome extends Component {
  static defaultProps = {
    info: null
  }

  constructor (props) {
    super(props)
    const top = Taro.getStorageSync('top')
    this.state = {
      searchValue: '',
      historyList: [],
      isShowAction: false,
      top:top
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
          <View className="search-box-container" style={{position:'fixed',top:`${this.state.top}px`}}>
            <View className="search-nav" onClick={this.searchTap.bind(this)}>
              <Image src={`${cdn}/susisang.png`}  className='search-box-img'/>
              <View className="search-placeholder">
                搜索你喜欢的商品
              </View>
            </View>
          </View>
    )
  }
}
