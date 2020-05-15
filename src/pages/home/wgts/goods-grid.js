import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { QnImg } from '@/components'
import { classNames } from '@/utils'

import './goods-grid.scss'

export default class WgtGoodsGrid extends Component {
  static options = {
    addGlobalClass: true
  }

  navigateTo (url) {
    Taro.navigateTo({ url })
  }
  moreGoods (){
    Taro.navigateTo({ url:'/pages/item/list' })
  }
  handleClickItem = (item) => {
    const url = `/pages/item/espier-detail?id=${item.item_id}`
    Taro.navigateTo({
      url
    })
  }

  render () {
    const { info } = this.props
    if (!info) {
      return null
    }

		const { base, data, config } = info
    /*let listData = []
    data.map(item => {
      listData.push({
        title: item.title,
        desc: item.desc,
        img: item.imgUrl,
        is_fav: item.is_fav,
        item_id: item.goodsId,
      })
    })*/

    return (
      <View className={`wgt wgt-grid ${base.padded ? 'wgt__padded' : null}`}>
        {base.title && (
          <View className='wgt__header'>
            <View className='wgt__title'>
              <Text>{base.title}</Text>
              <View className='wgt__subtitle'>{base.subtitle}</View>
            </View>
            {/*<View
              className='wgt__more'
              onClick={this.navigateTo.bind(this, '/pages/item/list')}
            >
              <View className='three-dot'></View>
            </View>*/}
            <View
              className='wgt__goods__more'
              onClick={this.navigateTo.bind(this, '/pages/item/list')}
            >
              <View className='all-goods'>全部商品</View>
            </View>
          </View>
        )}
        <View className='wgt__body with-padding'>
          <View className='grid-goods out-padding grid-goods__type-grid'>
            {
              data.map((item, idx) => {
                const price = ((item.act_price ? item.act_price : item.member_price ? item.member_price : item.price)/100).toFixed(2)
                //const marketPrice = ((item.act_price ? item.price : item.member_price ? item.price : item.market_price)/100).toFixed(2)
                const marketPrice = (item.market_price/100).toFixed(2)
                return (
                  <View
    								key={idx}
                    className={classNames('grid-item',{'grid-item-three': config.style=='grids'})}
                    onClick={this.navigateTo.bind(this, `/pages/item/espier-detail?id=${item.goodsId}`)}
                  >
                    <View className='goods-wrap'>
                      <View className='thumbnail'>
                        <QnImg
                          img-class='goods-img'
                          src={item.imgUrl}
                          mode='aspectFill'
                          width='400'
                          lazyLoad
                        />
                      </View>
                      <View className='caption'>
                        {config.brand && item.brand && (
                          <QnImg
                            img-class='goods-brand'
                            src={item.brand}
                            mode='aspectFill'
                            width='300'
                          />
                        )}
                        <View className={`goods-title ${!config.brand || !item.brand ? 'no-brand' : ''}`}>{item.title}</View>
                        {item.brief && <View className={`goods-brief ${!config.brand || !item.brand ? 'no-brand' : ''}`}>{item.brief}</View>}
                        {
                          config.showPrice
                          && <View className="goods-price">
                            <Text className="cur">¥{price}</Text>
                            <View className="speed-buy-container">
                              <Text className="speed-buy">立即抢购</Text>
                            </View>
                            </View>
                        }
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        {
          base.title === '苏尚儿新品'&&
          <View className="goods-more-container">
            <View className={"goods-more-content"} onClick={this.moreGoods.bind(this)}>
              <View className="goods-more-des1">更多商品</View>
              <View className="goods-more-des2">点击购买</View>
            </View>
          </View>
        }

      </View>
    )
  }
}
