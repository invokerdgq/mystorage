import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text, Image, Navigator, Button, Icon} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";

import './vip.scss'
export default class Vip extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  handleClickBuy =(grade_name) =>{
    Taro.navigateTo({
      url:`/pages/vip/vipgrades?grade_name=${grade_name}`,
    })
  }
  handleClickTransform = () => {
   console.log('兑换中')
  }
  handleClickLook = ()=> {
    Taro.navigateTo({
      url:'/pages/index'
    })
  }
  render() {
    return(
      <View>
         <NavGap title='权益中心'/>
         <View className='vip'>
           <View className='vip-sort-container'>
             <View>青铜</View>
             <View>钻石</View>
             <View>至尊</View>
           </View>
           <View className='vip-feature'>
             <View>
               <Text>青铜权益</Text>
               <Text>描述</Text>
               <Text onClick={this.handleClickLook}>去看看</Text>
             </View>
             <View>
               <Text>钻石权益</Text>
               <Text>描述</Text>
               <Text onClick={this.handleClickBuy.bind(this,'钻石会员')}>去购买</Text>
               <Text onClick={this.handleClickTransform}>兑换</Text>
             </View>
             <View>
               <Text>至尊权益</Text>
               <Text>描述</Text>
               <Text onClick={this.handleClickBuy.bind(this,'至尊会员')}>去购买</Text>
             </View>
           </View>
         </View>
      </View>
    )
  }
}
