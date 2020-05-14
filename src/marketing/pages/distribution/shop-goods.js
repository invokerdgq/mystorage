import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Navigator } from '@tarojs/components'
import { SpToast, BackToTop, Loading, FilterBar, SpNote, GoodsItem } from '@/components'
import S from '@/spx'
import api from '@/api'
import { withPager, withBackToTop } from '@/hocs'
import { classNames, pickBy } from '@/utils'
import entry from '@/utils/entry'

import './shop-goods.scss'

@withPager
@withBackToTop
export default class DistributionShopGoods extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      query: null,
      list: [],
      goodsIds: [],
      curIdx: ''
    }
  }

  componentDidMount () {
    this.setState({
      query: {
        item_type: 'normal',
        approve_status: 'onsale,only_show',
        rebate_type: ['total_money', 'total_num']
      }
    }, () => {
      this.nextPage()
    })
  }

  async fetch (params) {
    const { userId } = Taro.getStorageSync('userinfo')
    const { page_no: page, page_size: pageSize } = params
    const { selectParams } = this.state
    const query = {
      ...this.state.query,
      page,
      pageSize
    }

    const { list, total_count: total} = await api.item.search(query)

    const nList = pickBy(list, {
      img: 'pics[0]',
      item_id: 'item_id',
      goods_id: 'goods_id',
      title: 'itemName',
      desc: 'brief',
      rebate_type: 'rebate_type',
      price: ({ price }) => (price/100).toFixed(2),
      market_price: ({ market_price }) => (market_price/100).toFixed(2),
      cost_price: 'cost_price',
      details: null,
      view_detail: false,
    })

    let ids = []
    list.map(item => {
      ids.push(item.goods_id)
    })

    const param = {
      goods_id: ids,
      user_id: userId
    }

    const { goods_id } = await api.distribution.items(param)

    this.setState({
      list: [...this.state.list, ...nList],
      goodsIds: [...this.state.goodsIds, ...goods_id],
      query
    })

    return {
      total
    }
  }

  handleViewDetail = (idx, id) => {
    const { list } = this.state
    this.setState({
      curIdx: idx
    }, async () => {
      const query = {
        is_default: false,
        goods_id: id,
        item_type: 'normal',
        pageSize: 50,
        page: 1
      }
      const res = await api.item.search(query)
      const details = pickBy(res.list, {
        item_spec: 'item_spec',
        rebate_task_type: ({rebate_conf}) => rebate_conf.rebate_task_type,
        task: ({rebate_conf}) => rebate_conf.rebate_task
      })
      console.log(details)
      list[idx].details = details
      list[idx].view_detail = true
      this.setState({
        list
      })
    })
  }

  handleItemRelease = async (id) => {
    const { goodsIds } = this.state
    const goodsId = {goods_id: id}
    const idx = goodsIds.findIndex(item => id === item)
    const isRelease = idx !== -1
    if (!isRelease) {
      const { status } = await api.distribution.release(goodsId)
      if ( status ) {
        this.setState({
          goodsIds: [...this.state.goodsIds, id]
        }, () => {
          S.toast('上架成功')
        })
      }
    } else {
      const { status } = await api.distribution.unreleased(goodsId)
      if ( status ) {
        goodsIds.splice(idx, 1)
        this.setState({
          goodsIds
        }, () => {
          S.toast('下架成功')
        })
      }
    }
  }

  onShareAppMessage (res) {
    const { userId } = Taro.getStorageSync('userinfo')
    const { info } = res.target.dataset

    return {
      title: info.title,
      imageUrl: info.img,
      path: `/pages/item/espier-detail?id=${info.item_id}&uid=${userId}`
    }
  }

  render () {
    const { list, goodsIds, page, scrollTop } = this.state

    return (
      <View className="page-distribution-shop">
        <ScrollView
          className='goods-list__scroll'
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation
          onScroll={this.handleScroll}
          onScrollToLower={this.nextPage}
        >
          <View className='goods-list'>
          {
            list.map((item, index) => {
              const isRelease = goodsIds.findIndex(n => item.goods_id == n) !== -1
              console.log(isRelease)
              return (
                <DistributionGoodsItem
                  key={index}
                  info={item}
                  isRelease={isRelease}
                  onClick={() => this.handleClickItem(item.goods_id)}
                />
              )
            })
          }
            {
              list.map((item, index) => {
                const isRelease = goodsIds.findIndex(n => item.goods_id == n) !== -1
                return (
                  <View
                    className='shop-goods-item'
                    >
                    <View className='shop-goods'>
                      <Image className='shop-goods__thumbnail' src={item.img} mode='aspectFill' />
                      <View className='shop-goods__caption'>
                        <View className='view-flex-item'>
                          <View className='shop-goods__title'>{item.title}</View>
                          <View className='shop-goods__desc'>{item.desc}</View>
                          <View className='shop-goods__price'><Text className='cur'>¥</Text> {item.price}</View>
                        </View>
                        <View className='shop-goods__task'>
                          <View className='shop-goods__task-label'>任务模式</View>
                          { item.rebate_type === 'total_num' && <View className='shop-goods__task-type'>按售出总量</View> }
                          { item.rebate_type === 'total_money' && <View className='shop-goods__task-type'>按总销售金额</View> }
                        </View>
                      </View>
                      {
                        !item.view_detail
                          ? <View
                              className='shop-goods__detail'
                              onClick={this.handleViewDetail.bind(this, index, item.item_id)}
                              >
                              <Text className='icon-search'></Text> 查看指标明细
                            </View>
                          : <View
                              className='shop-goods__detail'
                              >
                              <View className='content-bottom-padded view-flex'>
                                <View className='view-flex-item2'>规格</View>
                                <View className='view-flex-item'>指标</View>
                                <View className='view-flex-item'>奖金</View>
                              </View>
                              {
                                item.details && item.details.map(detail =>
                                  <View class="shop-goods__detail-item">
                                    <View className='shop-goods__detail-skus view-flex-item2'>
                                      {
                                        detail.item_spec
                                          ? detail.item_spec.map(sku =>
                                              <View className='sku-item'>
                                                {
                                                  sku.spec_image_url &&
                                                    <Image className='sku-img' src={sku.spec_image_url} mode="aspectFill"/>
                                                }
                                                {sku.spec_custom_value_name}
                                              </View>
                                            )
                                          : <Text>单规格</Text>
                                      }
                                    </View>
                                    <View className='view-flex-item2'>
                                      {
                                        detail.task.map(task =>
                                          <View className='view-flex'>
                                            <View className='view-flex-item'>{task.filter}</View>
                                            <View className='view-flex-item'>
                                              {
                                                task.money &&
                                                  <Text>¥</Text>
                                              }
                                              {task.money}
                                            </View>
                                          </View>
                                        )
                                      }
                                    </View>
                                  </View>
                                )
                              }
                            </View>
                      }

                    </View>
                    <View className='shop-goods__footer'>
                      <View
                        className={classNames('shop-goods__footer-item', !isRelease ? 'unreleased' : null)}
                        onClick={this.handleItemRelease.bind(this, item.item_id)}
                      >
                        {
                          isRelease
                            ? <Text className='icon-moveDown'> 从小店下架</Text>
                            : <Text className='icon-moveUp'> 上架到小店</Text>
                        }
                      </View>
                      <Button
                        className='shop-goods__footer-item'
                        dataInfo={item}
                        openType='share'
                        size="small"
                      >
                        <Text className='icon-share2'> 分享给好友</Text>
                      </Button>
                    </View>
                  </View>
                )
              })
            }
          </View>
          {
            page.isLoading
              ? <Loading>正在加载...</Loading>
              : null
          }
          {
            !page.isLoading && !page.hasNext && !list.length
              && (<SpNote img='trades_empty.png'>暂无数据~</SpNote>)
          }
        </ScrollView>
        <SpToast />
      </View>
    )
  }
}
