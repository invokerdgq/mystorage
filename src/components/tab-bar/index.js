import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import getStore from "../../store"
import { AtTabBar } from 'taro-ui'
import { navigateTo, getCurrentRoute } from '@/utils'
import S from '@/spx'
import { getTotalCount } from '@/store/cart'

@connect(({ tabBar,cart }) => ({
  tabBar: tabBar.current,
  cartCount: cart.cartCount
}))
export default class TabBar extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor (props) {
    super(props)
    this.state = {
      localCurrent: 0,
      backgroundColor: '',
      color: '',
      selectedColor: '',
      tabList: []
    }
  }

  componentDidMount () {
		const { tabBar } = this.props
    let list = []

    if (tabBar) {
      const { config, data } = tabBar
      const { backgroundColor, color, selectedColor } = config
      this.setState({
        backgroundColor,
        color,
        selectedColor
      })
      data.map(item => {
        let obj = {
          title: item.text,
          iconType: item.iconPath && item.selectedIconPath ? '' : item.name,
          iconPrefixClass: 'icon',
          image: item.iconPath,
          selectedImage: item.selectedIconPath,
          url: item.pagePath,
          urlRedirect: true
        }
        if (item.name === 'cart') {
          Object.assign(obj, {text: this.cartCount || '', max: '99'})
        }
        list.push(obj);
        console.log('---------');
        console.log(list)
      })
    } else {
      list = [
        { title: '首页', iconType: 'home', iconPrefixClass: 'icon', url: '/pages/index', urlRedirect: true },
        { title: '分类', iconType: 'category', iconPrefixClass: 'icon', url: '/pages/category/index', urlRedirect: true },
        { title: '购物车', iconType: 'cart', iconPrefixClass: 'icon', url: '/pages/cart/espier-index', text: this.cartCount || '', max: '99',urlRedirect: true },
        { title: '我的', iconType: 'member', iconPrefixClass: 'icon', url: '/pages/member/index', urlRedirect: true },
      ]
    }

    this.setState({
      tabList: list
    }, () => {
      this.updateCurTab()
    })
  }

  componentDidShow () {
    if (this.state.tabList.length > 0) {
      this.fetchCart()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.current !== undefined) {
      this.setState({ localCurrent: nextProps.current })
    }
  }

  get cartCount () {
    // console.log('computed')
    return this.props.cartCount
  }

  updateCurTab () {
    this.fetchCart()
    const { tabList, localCurrent } = this.state
    const fullPath = ((getCurrentRoute(this.$router).fullPath).split('?'))[0]
    const { url } = tabList[localCurrent]
    if (url && url !== fullPath) {
      const nCurrent = tabList.findIndex((t) => t.url === fullPath) || 0
      this.setState({
        localCurrent: nCurrent
      })
    }
  }

  async fetchCart () {
    if (!S.getAuthToken()) return
    const { tabList } = this.state
    const cartTabIdx = tabList.findIndex(item => item.url.indexOf('cart') !== -1)
    const updateCartCount = (count) => {
      tabList[cartTabIdx].text = count || ''
      this.setState({
        tabList
      })
    }

    const { path } = getCurrentRoute(this.$router)
    if (path === this.state.tabList[cartTabIdx].url) {
      updateCartCount('')
      return
    }

  }

  handleClick = (current) => {
    const cur = this.state.localCurrent

    if (cur !== current) {
      const curTab = this.state.tabList[current]
      const { url, urlRedirect, withLogin } = curTab
      const fullPath = ((getCurrentRoute(this.$router).fullPath).split('?'))[0]

      if (withLogin && !S.getAuthToken()) {
        return Taro.navigateTo({
          url: APP_AUTH_PAGE
        })
      }

      if (url && fullPath !== url) {
        if (!urlRedirect || (url === '/pages/member/index' && !S.getAuthToken())) {
          Taro.navigateTo({ url })
        } else {
          Taro.redirectTo({ url })
        }
      }
    }
  }

  render () {
    const { color, backgroundColor, selectedColor, tabList, localCurrent } = this.state

    // eslint-disable-next-line
    if (APP_INTEGRATION) {
      return <View></View>
    }

    return (
      <AtTabBar
        fixed
        color={color}
        backgroundColor={backgroundColor}
        selectedColor={selectedColor}
        tabList={tabList}
        onClick={this.handleClick}
        current={localCurrent}
      />
    )
  }
}
