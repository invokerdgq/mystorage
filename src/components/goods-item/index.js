import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Progress} from '@tarojs/components'
import { Price, QnImg } from '@/components'
import { isObject, classNames } from '@/utils'
import api from '@/api'

import './index.scss'

export default class GoodsItem extends Component {
  static defaultProps = {
    onClick: () => {},
    showMarketPrice: true,
    showFav: true,
    showSku: false,
    noCurSymbol: false,
    type: 'item'
  }

  static options = {
    addGlobalClass: true
  }

  static externalClasses = ['classes']

  handleFavClick = async () => {
    const { item_id, is_fav } = this.props.info
    console.log(is_fav, item_id)
    // await api.item.collect(item_id)
  }
  handleCart = (item) =>{
   Taro.navigateTo({
     url: `/pages/item/espier-detail?id=${item.item_id}`
   })
}
  render () {
    const { info, showMarketPrice, showFav, noCurSymbol, noCurDecimal, onClick, appendText, className, isPointDraw, type } = this.props
    if (!info) {
      return null
    }
    const img = info.img || info.image_default_id

    let promotion_activity = null, act_price = null
    if( info.promotion_activity_tag && info.promotion_activity_tag.length > 1 ) {
      info.promotion_activity_tag.map(tag_item => {
        if(tag_item.tag_type === 'single_group' || tag_item.tag_type === 'normal' || tag_item.tag_type === 'limited_time_sale') {
          promotion_activity = tag_item.tag_type
          act_price = tag_item.activity_price
          return
        }
      })
    } else if( info.promotion_activity_tag && info.promotion_activity_tag.length === 1 ) {
      promotion_activity = info.promotion_activity_tag[0].tag_type
      act_price = info.promotion_activity_tag[0].activity_price
    } else {
      promotion_activity = null
      act_price = null
    }
    act_price = (act_price/100).toFixed(2)
    let price = '', marketPrice = ''
    if (isObject(info.price)) {
      price = info.price.total_price
    } else {
      price = Boolean(+act_price) ? act_price : Boolean(+info.member_price) ? info.member_price : info.price
      //marketPrice = Boolean(+act_price) || Boolean(+info.member_price) ? info.price : info.market_price
      marketPrice = info.market_price
    }

    return (
      <View className={classNames('goods-item', 'classes')}>
        <View className='goods-item__hd'>
          {this.props.renderCheckbox}
        </View>
        <View className='goods-item__bd'>
          <View
            className='goods-item__img-wrap'
            onClick={onClick}
          >
            <QnImg
              img-class='goods-item__img'
              src={img}
              mode='widthFix'
              lazyLoad
            />
          </View>
          <View className='goods-item__cont'>
            <View className='goods-item__caption'>
              {
                promotion_activity !== null
                ? <View className='goods-item__tag-list'>
                    <Text className={(promotion_activity === 'single_group' || promotion_activity === 'limited_time_sale' || promotion_activity === 'normal') ? 'goods-item__tag goods-item__group' : 'goods-item__tag'}>
                    {promotion_activity === 'single_group' ? '团购' : ''}
                    {promotion_activity === 'full_minus' ? '满减' : ''}
                    {promotion_activity === 'full_discount' ? '满折' : ''}
                    {promotion_activity === 'full_gift' ? '满赠' : ''}
                    {promotion_activity === 'normal' ? '秒杀' : ''}
                    {promotion_activity === 'limited_time_sale' ? '限时特惠' : ''}
                    </Text>
                  </View>
                : null
              }
              <View onClick={onClick}>
                <Text className='goods-item__title'>{info.title}</Text>
                <Text className='goods-item__desc'>{info.desc}</Text>
                {this.props.renderSpec}
              </View>
            </View>
            <View className='goods-item__extra'>
              <View className='goods-item__price'>
                <View className='package-price'>
                  <View className='package-price-share'>
                    <View className='goods-item__cur'>¥</View>
                    <View className='price'>{price}</View>
                    {
                      info.rebate_commission&&
                      <View className='share-get'>赚{(Number(info.rebate_commission)/100).toFixed(2)}</View>
                    }
                    {/*{*/}
                    {/*  Boolean(+marketPrice) &&*/}
                    {/*  <Text className='goods-item__price-market'>¥{marketPrice}</Text>*/}
                    {/*}*/}
                  </View>
                  <View className='che-container' onClick={this.handleCart.bind(this,info)}>
                    <View className='iconfont icon-gouwuche' />
                  </View>
                </View>
							</View>
							{this.props.children}
              {
                 showFav &&
                   (<View className='goods-item__actions'>
                     {(type === 'item') && (
                       <View
                         className={`${info.is_fav ? 'icon-star-on' : 'icon-star'}`}
                         onClick={this.handleFavClick}
                       />
                     )}
                     {type === 'recommend' && (
                       <View
                         className='icon-like'
                         onClick={this.handleLikeClick}
                       ><Text>666</Text></View>
                     )}
                   </View>)
              }
            </View>
          </View>
        </View>
        <View className='goods-item__ft'>
          {this.props.renderFooter}
        </View>
      </View>
    )
  }
}
