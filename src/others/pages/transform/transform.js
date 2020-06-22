import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import S from '@/spx'

export default class Transform extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(!S.getAuthToken()){
      Taro.showToast({
        title:'请先登录',
        icon:'none',
        duration:1500
      })
      setTimeout(() => {
        S.login(this)
      },1500)
    }
  }

  render() {
    return(
      <View>
        <NavGap title='限时好礼活动'/>
        <View>

        </View>
      </View>
    )
  }
}
