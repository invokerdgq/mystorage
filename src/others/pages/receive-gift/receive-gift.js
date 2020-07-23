import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import S from '@/spx'
import api from '@/api'
import { AtCountdown } from "taro-ui";
import { calcTimer } from '@/utils'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import OwnGoodsItem from "../invite-activity/coms/goods-item";
import OwnTitle from "../../../components/own-title/own-title";
import OwnCoupon from "./coms/own-coupon";

import './receive-gift.scss'
export default class ReceiveGift extends Component{
  constructor(props) {
    super(props);
    this.state = {
      goodsList:[
        {
          "assist_id": "23",
          "item_id": "8611",
          "goods_id": "8610",
          "item_title": "弄清影中式插画釉下彩多头餐具5件/16件套",
          "item_pic": "http://sxt-img-sdn.oioos.com/1/2020/06/17/b530a367205710b6ef177bead4bc806auH7E7nbf6ZU7c0Tr9PlCdEFUnfeuR9de"
        }
      ],
      couponList:[
      ]
    }
  }
  componentDidMount() {
    this.fetch()
  }
  async fetch(){
    const [{list},{list:couponList}] = await Promise.all([api.assist.getAssistList(),api.assist.getCouponList({assist_id:Taro.getStorageSync('assist_id')})])
    this.props.setStep(list.step_conf)
    this.setState({
      goodsList:list.items,
      couponList
    })
  }
  handleClickItem(){

  }
  render() {
    const {goodsList,couponList} = this.state
    return (
    <View className='gift'>
      <View className='gift-header'><Image mode='widthFix' className='img' src={`${cdn}/receive-head.jpg`}/></View>
      <View className='gift-content'>
        <View className='gift-content-title'><OwnTitle title={'新人礼包'}/></View>
        {
          couponList.map((item,index) => {
            return(
              <OwnCoupon
                info={item}
              />
            )
          })
        }
        <View className='gift-content-dec'>领取的券可到个人中心-优惠券里查看</View>
      </View>
      <View className='goods-list'>
        {
          goodsList.map(item => {
            return(
              <OwnGoodsItem
                info={item}
                onclick={this.handleClickItem.bind(this,item)}
              >
              </OwnGoodsItem>
            )
          })
        }
      </View>
      <View className='gift-footer'><Image mode='widthFix' src={`${cdn}/invite-foot.png`} className='img'/></View>
    </View>
    );
  }
}
