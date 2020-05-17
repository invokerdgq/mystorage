import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView,Icon } from '@tarojs/components'
import { AtCountdown } from 'taro-ui'
import { calcTimer } from '@/utils'
import { QnImg } from '@/components'

import './goods-scroll.scss'

export default class WgtGoodsScroll extends Component {
  static options = {
    addGlobalClass: true,
    info: null
  }
  static width = 0;
  constructor (props) {
    super(props)
    this.state = {
      timer: null,
      showNum:1,
      initLeft:0
    }
  }

  componentDidMount() {
    WgtGoodsScroll.width = Taro.getSystemInfoSync().screenWidth;
    Taro.createSelectorQuery().in(this.$scope).selectAll('.position0'). boundingClientRect( (rect)=> {
      Taro.M(rect[0].left)
      this.setState({
        initLeft:rect[0].left
      })
    }).exec()
    const { info } = this.props
    let { config } = info
    if (config.lastSeconds) {
      const timer = calcTimer(config.lastSeconds)
      this.setState({
        timer
      })
     this.ST =  setInterval(() => {
        const timer = calcTimer(config.lastSeconds)
        this.setState({
          timer
        })
       config.lastSeconds -= 1;
      },1000)

    }
  }
  componentWillUnmount() {
    if(this.ST){
      ST.clear()
    }
  }

  navigateTo (url) {
    Taro.navigateTo({ url })
  }

  navigateToList = (type, seckillId) => {
    if(type === 'goods') {
      this.navigateTo('/pages/item/list')
    } else if (type === 'limitTimeSale') {
      Taro.navigateTo({
        url: `/pages/item/seckill-goods-list?seckill_type=limited_time_sale&seckill_id=${seckillId}`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/item/seckill-goods-list?seckill_type=normal&seckill_id=${seckillId}`
      })
    }
  }
 numChange = () => {
     Taro.createSelectorQuery().in(this.$scope).selectAll('.position0'). boundingClientRect( (rect)=> {
       console.log(rect[0].left)
      this.setState({
        showNum: 1+Math.floor([-(rect[0].left-this.state.initLeft)]/WgtGoodsScroll.width)
      })
     }).exec()
 }
  render () {
    const { info } = this.props
    if (!info) {
      return null
    }

    const { base, data, config } = info
    const { showNum,timer } = this.state

    return (
      <View className={`wgt ${base.padded ? 'wgt__padded' : null}`}>
        {base.title && (
          <View className='wgt__header'>
            <View className='wgt__title'>
              <Text>{base.title}</Text>
              <View className='wgt__subtitle'>{base.subtitle}</View>
              {/*{*/}
              {/*  config.type === 'goods'*/}
              {/*    ? <View className='wgt__subtitle'>{base.subtitle}</View>*/}
              {/*    : <View>*/}
              {/*        {*/}
              {/*          config.lastSeconds === 0*/}
              {/*            ? <AtCountdown*/}
              {/*                className='countdown__time'*/}
              {/*                isShowDay*/}
              {/*                day={timer.dd}*/}
              {/*                hours={timer.hh}*/}
              {/*                minutes={timer.mm}*/}
              {/*                seconds={timer.ss}*/}
              {/*              />*/}
              {/*            : <View className='countdown__time'>活动已结束</View>*/}
              {/*        }*/}
              {/*      </View>*/}
              {/*}*/}
            </View>
            <View
              className='wgt__more'
              onClick={this.navigateToList.bind(this, config.type, config.seckillId)}
            >
              {/*<View className='three-dot'></View>*/}
              {
                config.type === 'goods'?
                  <Text className="more">查看更多>></Text>:
                  <Text className="num-change"><Text className="num-change-inner">{showNum}</Text>/{data.length}</Text>
              }
            </View>
          </View>
        )}
        <View className='wgt-body'>
          <ScrollView
            className='scroll-goods'
            scrollX
            onScroll={this.numChange.bind(this)}
          >
            {
              data.map((item, idx) => {
                const price =parseInt(((item.act_price ? item.act_price : item.member_price ? item.member_price : item.price)/100).toFixed(2))
                const marketPrice = parseInt(((item.act_price ? item.price : item.member_price ? item.price : item.market_price)/100).toFixed(2))
                return (
                  <View
                    key={idx}
                    className={`${base.title === '限时秒杀'?'scroll-item-limit':'scroll-item'} position${idx}`}
                    onClick={this.navigateTo.bind(this, `/pages/item/espier-detail?id=${item.goodsId}`)}
                  >
                    {config.leaderboard && (
                      <View className='subscript'>
                        <View className='subscript-text'>NO.{idx + 1}</View>
                        <Image className='subscript-img' src='/assets/imgs/paihang.png' />
                      </View>
                    )}
                    <View className='thumbnail'>
                      <QnImg
                        img-class='goods-img'
                        src={item.imgUrl}
                        mode='aspectFill'
                        width='240'
                        lazyLoad
                      />
    								</View>
                    <View className="goods-desc">
                      {
                        base.title === '限时秒杀'&&
                        <View className="time-icon">
                          <Icon className="iconfont icon-time1"></Icon>
                          {
                           info.config.lastSeconds === 0?
                           <Text>活动已结束</Text> : <Text>{timer.dd}天{timer.hh}时{timer.mm}分{timer.ss}秒</Text>
                          }
                        </View>
                      }
                      <View className="goods-name">
                        {item.title}
                      </View>
                      {
                        config.showPrice
                        && <View className={`${base.title === '限时秒杀'?'goods-price-limit':''} goods-price`}>
                          {
                            marketPrice != 0 &&base.title === '限时秒杀'&&
                            <Text className='market-price' >原价:￥{marketPrice}</Text>
                          }
                          {
                            base.title === '限时秒杀'?
                              <Text className="price">秒杀:￥<Text className="price-inner">{price}</Text></Text>
                              :<Text className='price'>￥<Text className="price-inner">{price}</Text></Text>
                          }
                        </View>
                      }
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}
