import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";

import NavGap from "../../components/nav-gap/nav-gap";
import './live.scss'
export default class Live extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return(
      <View>
        <NavGap title='我的直播间'/>
        <View className='live-container'>
          <Image src='https://sxt-b-cdn.oioos.com/tupian/upgrade.png' mode='widthFix'></Image>
        </View>
      </View>
    )
  }
}
