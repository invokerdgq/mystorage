import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView ,WebView} from '@tarojs/components'
import NavGap from "../../../components";

import api from '@/api'
import './user-store.scss'
import {withPager} from "../../../hocs";
@withPager
export default class UserStore extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state ={
      ...this.state,
      goodsList:[]
    }
  }
  componentWillMount(){
    this.nextPage()
  }
  fetch = async(params)=>{
    const { page_no ,page_size} = params
    const {list,total_count} = await api.store.getList({page:page_no,pageSize:page_size})
    this.setState({
      goodsList:[...this.state.goodsList,...list]
    })
    let total = total_count
    return {total}
}
  handleAddGoods(type,id){
    Taro.navigateTo({
      url:`/marketing/pages/user-store/edit/edit-goods?itemId=${type === 'edit'?id:''}`
    })
  }
  render() {
    const {goodsList} = this.state
    return(
      <View className='my-store'>
        <NavGap title='我的小店'/>
        <View className='store-content'>
          <View>个人信息</View>
          <View>订单</View>
          <View>商品列表</View>
          <View onClick={this.handleAddGoods.bind(this,'create')}>添加商品</View>
          <View>设置分佣</View>
        </View>
        <View>
          <View>商品列表</View>
          {
            goodsList.length !==0 &&
              goodsList.map((item) => {
                return(
                  <View>
                    <Text>{item.item_id} |</Text>
                    <Text>{item.item_name} |</Text>
                    <Text>{item.brief}</Text>
                    <Text onClick={this.handleAddGoods.bind(this,'edit',item.item_id)}>编辑商品</Text>
                  </View>
                )
              })
          }
        </View>
      </View>
    )
  }
}
