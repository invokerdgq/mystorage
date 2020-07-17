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
        {
          "id": "65",
          "user_id": "353869",
          "company_id": "1",
          "card_id": "43",
          "code": "266441963818",
          "status": "1",
          "card_type": "cash",
          "begin_date": "1594828800",
          "end_date": "1627632728",
          "title": "满200减10",
          "color": "#000000",
          "discount": "0",
          "least_cost": "20000",
          "reduce_cost": "1000",
          "use_condition": {
            "accept_category": null,
            "reject_category": null,
            "least_cost": "20000",
            "object_use_for": null,
            "can_use_with_other_discount": "false"
          },
          "rel_shops_ids": "all",
          "is_give_by_friend": null,
          "old_code": null,
          "get_outer_str": null,
          "consume_source": null,
          "location_name": null,
          "staff_open_id": null,
          "verify_code": null,
          "remark_amount": null,
          "consume_outer_str": null,
          "trans_id": null,
          "fee": null,
          "original_fee": null,
          "location_id": null,
          "friend_open_id": null,
          "is_return_back": null,
          "is_chat_room": null,
          "source_type": "助力活动赠送",
          "use_scenes": "ONLINE",
          "use_platform": "mall",
          "rel_item_ids": "all",
          "most_cost": "99999900",
          "rel_distributor_ids": "all",
          "get_date": "1594887203",
          "use_all_items": true,
          "description": "满200减10",
          "card_num": 1,
          "user_start_time": "2020-07-16 16:13:23",
          "user_end_time": "2020-07-19 16:13:23"
        },
        {
          "id": "66",
          "user_id": "353869",
          "company_id": "1",
          "card_id": "42",
          "code": "471489827955",
          "status": "1",
          "card_type": "cash",
          "begin_date": "1594828800",
          "end_date": "1627660800",
          "title": "满490减55",
          "color": "#000000",
          "discount": "0",
          "least_cost": "49000",
          "reduce_cost": "5500",
          "use_condition": {
            "accept_category": null,
            "reject_category": null,
            "least_cost": "49000",
            "object_use_for": null,
            "can_use_with_other_discount": "false"
          },
          "rel_shops_ids": "all",
          "is_give_by_friend": null,
          "old_code": null,
          "get_outer_str": null,
          "consume_source": null,
          "location_name": null,
          "staff_open_id": null,
          "verify_code": null,
          "remark_amount": null,
          "consume_outer_str": null,
          "trans_id": null,
          "fee": null,
          "original_fee": null,
          "location_id": null,
          "friend_open_id": null,
          "is_return_back": null,
          "is_chat_room": null,
          "source_type": "助力活动赠送",
          "use_scenes": "ONLINE",
          "use_platform": "mall",
          "rel_item_ids": "all",
          "most_cost": "99999900",
          "rel_distributor_ids": "all",
          "get_date": "1594887203",
          "use_all_items": true,
          "description": "满490可用",
          "distributor_info": [],
          "use_all_distributor": true,
          "card_num": 1,
          "user_start_time": "2020-07-16 16:13:23",
          "user_end_time": "2020-07-19 16:13:23"
        },
        {
          "id": "65",
          "user_id": "353869",
          "company_id": "1",
          "card_id": "43",
          "code": "266441963818",
          "status": "1",
          "card_type": "cash",
          "begin_date": "1594828800",
          "end_date": "1627632728",
          "title": "满200减10",
          "color": "#000000",
          "discount": "0",
          "least_cost": "20000",
          "reduce_cost": "1000",
          "use_condition": {
            "accept_category": null,
            "reject_category": null,
            "least_cost": "20000",
            "object_use_for": null,
            "can_use_with_other_discount": "false"
          },
          "rel_shops_ids": "all",
          "is_give_by_friend": null,
          "old_code": null,
          "get_outer_str": null,
          "consume_source": null,
          "location_name": null,
          "staff_open_id": null,
          "verify_code": null,
          "remark_amount": null,
          "consume_outer_str": null,
          "trans_id": null,
          "fee": null,
          "original_fee": null,
          "location_id": null,
          "friend_open_id": null,
          "is_return_back": null,
          "is_chat_room": null,
          "source_type": "助力活动赠送",
          "use_scenes": "ONLINE",
          "use_platform": "mall",
          "rel_item_ids": "all",
          "most_cost": "99999900",
          "rel_distributor_ids": "all",
          "get_date": "1594887203",
          "use_all_items": true,
          "description": "满200减10",
          "card_num": 1,
          "user_start_time": "2020-07-16 16:13:23",
          "user_end_time": "2020-07-19 16:13:23"
        },
        {
          "id": "66",
          "user_id": "353869",
          "company_id": "1",
          "card_id": "42",
          "code": "471489827955",
          "status": "1",
          "card_type": "cash",
          "begin_date": "1594828800",
          "end_date": "1627660800",
          "title": "满490减55",
          "color": "#000000",
          "discount": "0",
          "least_cost": "49000",
          "reduce_cost": "5500",
          "use_condition": {
            "accept_category": null,
            "reject_category": null,
            "least_cost": "49000",
            "object_use_for": null,
            "can_use_with_other_discount": "false"
          },
          "rel_shops_ids": "all",
          "is_give_by_friend": null,
          "old_code": null,
          "get_outer_str": null,
          "consume_source": null,
          "location_name": null,
          "staff_open_id": null,
          "verify_code": null,
          "remark_amount": null,
          "consume_outer_str": null,
          "trans_id": null,
          "fee": null,
          "original_fee": null,
          "location_id": null,
          "friend_open_id": null,
          "is_return_back": null,
          "is_chat_room": null,
          "source_type": "助力活动赠送",
          "use_scenes": "ONLINE",
          "use_platform": "mall",
          "rel_item_ids": "all",
          "most_cost": "99999900",
          "rel_distributor_ids": "all",
          "get_date": "1594887203",
          "use_all_items": true,
          "description": "满490可用",
          "distributor_info": [],
          "use_all_distributor": true,
          "card_num": 1,
          "user_start_time": "2020-07-16 16:13:23",
          "user_end_time": "2020-07-19 16:13:23"
        }
      ]
    }
  }
  componentDidMount() {
    this.fetch
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
