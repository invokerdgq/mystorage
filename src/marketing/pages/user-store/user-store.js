import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView ,WebView} from '@tarojs/components'
import NavGap from "../../../components";

import './user-store.scss'
export default class UserStore extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
  }
  handleAddGoods(type){
    Taro.navigateTo({
      url:`/marketing/pages/user-store/edit/edit-goods?itemId=${type === 'edit'?10885:''}`
    })
  }
  render() {
    return(
      <View className='my-store'>
        <NavGap title='我的小店'/>
        <View className='store-content'>
          <View>个人信息</View>
          <View>订单</View>
          <View>商品列表</View>
          <View onClick={this.handleAddGoods.bind(this,'create')}>添加商品</View>
          <View onClick={this.handleAddGoods.bind(this,'edit')}>编辑商品</View>
          <View>设置分佣</View>
        </View>
      </View>
    )
  }
}
