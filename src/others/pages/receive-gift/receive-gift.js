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
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:1},
        {imgUrl:'/assets/imgs/404.png',goods_name:'----',status:0}
      ],
      couponList:[
        {
          mission:55,
          number:2,
          total:398,
          endDate:'2020-6-17 -2020-6-30'
        },
        {
          mission:55,
          number:2,
          total:398,
          endDate:'2020-6-17 -2020-6-30'
        },
        {
          mission:55,
          number:2,
          total:398,
          endDate:'2020-6-17 -2020-6-30'
        },
        {
          mission:55,
          number:2,
          total:398,
          endDate:'2020-6-17 -2020-6-30'
        }
      ]
    }
  }
  handleClickItem(){

  }
  render() {
    const {goodsList,couponList} = this.state
    return (
    <View className='gift'>
      <View className='gift-header'><Image mode='widthFix' className='img'/></View>
      <View className='gift-content'>
        <View className='gift-content-title'><OwnTitle title={'新人礼包'}/></View>
        {
          couponList.map((item,index) => {
            return(
              <OwnCoupon

              />
            )
          })
        }
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
      <View className='gift-footer'><Image mode='widthFix'/></View>
    </View>
    );
  }
}
