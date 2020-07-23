import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button,Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtBadge } from 'taro-ui'
import { navigateTo } from '@/utils'
import { FormIdCollector } from '@/components'

import './buy-toolbar.scss'

@connect(({ colors }) => ({
  colors: colors.current
}))

export default class GoodsBuyToolbar extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    type: 'normal',
    onClickAddCart: () => {},
    onClickFastBuy: () => {},
    onFavItem: () => {},
    cartCount: '',
    info: null
  }

  handleClickCart = (id, type) => {
    Taro.reLaunch({
      url: `/pages/cart/espier-index?type=${type}`
    })
  }
  handleHome = () => {
    Taro.navigateTo({
      url:'/pages/index'
    })
  }
  render () {
    const { onClickAddCart, onClickFastBuy, cartCount, type, info, colors } = this.props

    if (!info) {
      return null
    }

    let special_type = info.special_type

    const isDrug = special_type === 'drug'
    const fastBuyText = (type === 'normal' || type === 'limited_time_sale')
      ? '立即购买'
      : (type === 'seckill')
        ? '立即抢购' : (type === 'exchange')?'立即兑换':'我要开团'

    return (
      <View className='goods-buy-toolbar'>
        <View className='goods-buy-toolbar__menus'>
          <View
            className='goods-buy-toolbar__menu-item'
            onClick={this.handleHome}
          >
           <View>
             <Icon className='iconfont icon-shouye'/>
             <View className='dec'>首页</View>
           </View>
          </View>
          <View
            className='goods-buy-toolbar__menu-item'
            onClick={this.props.onFavItem}
          >
            {
              info.is_fav
                ? <View className='iconfont icon-xing-quan' style={`color: ${colors.data[0].primary}`} />
                : <View className='iconfont icon-xingxing' />
            }
            <View className='dec'>收藏</View>
          </View>
          {/*{process.env.TARO_ENV === 'weapp' && (
            <Button className='goods-buy-toolbar__menu-item' openType='contact'>
              <View className='in-icon in-icon-kefu'></View>
            </Button>
          )}*/}
          <View
            className='goods-buy-toolbar__menu-item'
            onClick={this.handleClickCart.bind(this, info.item_id, isDrug ? 'drug' : 'distributor')}
          >
            <AtBadge
              value={cartCount || null}
              style={{background:'#c0534e'}}
            >
              <View className='iconfont icon-che'></View>
              <View className='dec'>购物车</View>
            </AtBadge>
          </View>
        </View>
        {this.props.customRender
          ? this.props.children
          : (<View className='goods-buy-toolbar__btns'>
              {!isDrug && (
                  <FormIdCollector
                    sync
                    onClick={onClickFastBuy}
                  >
                    <View className='btn-fast-buy-container'>
                      <View className={`goods-buy-toolbar__btn btn-fast-buy ${type !== 'normal' && type !== 'limited_time_sale' && 'marketing-btn'}`}>{fastBuyText}</View>
                    {/*<View className={`goods-buy-toolbar__btn btn-fast-buy ${type !== 'normal' && type !== 'limited_time_sale' && 'marketing-btn'}`} style={'background: ' + colors.data[0].primary}>{fastBuyText}</View>*/}
                    </View>
                  </FormIdCollector>
                )
              }
            {(type === 'normal' || type === 'limited_time_sale') && (
              <FormIdCollector
                sync
                onClick={onClickAddCart}
              >
                <View className='btn-add-cart-container'>
                  <View className={`goods-buy-toolbar__btn btn-add-cart ${isDrug && 'drug-btn'}`}>{isDrug ? '加入药品清单' : '加入购物车'}</View>
                  {/*<View className={`goods-buy-toolbar__btn btn-add-cart ${isDrug && 'drug-btn'}`} style={'background: ' + colors.data[0].accent}>{isDrug ? '加入药品清单' : '加入购物车'}</View>*/}
                </View>
              </FormIdCollector>
            )}
            </View>)
        }
      </View>
    )
  }
}
