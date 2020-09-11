import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import api from '@/api'


export default class Auth extends Component{
  constructor() {
    super();
  }
  async componentWillMount() {
    const {source,timestamp,sign,mobile,url} = this.$router.params
    const {token} = await api.wx.autoLogin({
      source,timestamp,sign,mobile
    })
    if(token){
      Taro.setStorageSync('auth_token',token)
      let newUrl = decodeURIComponent(url)
      setTimeout(() => {
        try {
          Taro.navigateTo({url:newUrl.replace('https://h5.oioos.com','')})
        }catch (e) {
          Taro.navigateTo({url:'/pages/member/index'})
        }
      },500)
    }
  }
  render() {
    return(
      <View>
        登录中。。。
      </View>
    )
  }
}
