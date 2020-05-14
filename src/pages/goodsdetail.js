import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class HomeIndex extends Component {

  componentDidMount () {
    if (this.$router.params.scene) {
      const scene = decodeURIComponent(this.$router.params.scene)
      //格式化二维码参数
      const options = this.parseUrlStr(scene)
      Taro.redirectTo({
        url: `/pages/item/espier-detail?id=${options.id}&dtid=${options.dtid}`
      })
    } else {
      Taro.redirectTo({
        url: `/pages/item/espier-detail?id=${this.$router.params.id}&dtid=${this.$router.params.dtid}`
      })
    }
  }

  // 格式化URL字符串
  parseUrlStr (urlStr) {
    var keyValuePairs = []
    if (urlStr) {
      for (var i = 0; i < urlStr.split('&').length; i++) {
        keyValuePairs[i] = urlStr.split('&')[i]
      }
    }
    var kvObj = []
    for (var j = 0; j < keyValuePairs.length; j++) {
      var tmp = keyValuePairs[j].split('=')
      kvObj[tmp[0]] = decodeURI(tmp[1])
    }
    return kvObj
  }

  render () {
    return (
      <View></View>
    )
  }
}
