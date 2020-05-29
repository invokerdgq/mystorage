import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { withPager, withBackToTop } from '@/hocs'
import { BackToTop, Loading, GoodsItem, NavBar, SpNote } from '@/components'
import api from '@/api'
import { pickBy } from '@/utils'
import NavGap from "../../components/nav-gap/nav-gap";

import './item-history.scss'

@withPager
@withBackToTop
export default class ItemHistory extends Component {
  static config = {
    navigationBarTitleText: '浏览记录'
  }

  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      list: []
    }
  }

  componentDidMount () {
    this.nextPage()
  }

  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    const query = {
      page,
      pageSize
    }

    const { list, total_count: total } = await api.member.itemHistory(query)

    const nList = pickBy(list, {
      img: 'itemData.pics[0]',
      item_id: 'itemData.item_id',
      title: 'itemData.itemName',
      desc: 'itemData.brief',
      price: ({ itemData }) => (itemData.price/100).toFixed(2),
      market_price: ({ itemData }) => (itemData.market_price/100).toFixed(2)
    })

    this.setState({
      list: [...this.state.list, ...nList],
      query
    })

    return {
      total
    }
  }

  handleClickItem = (item) => {
    const url = `/pages/item/espier-detail?id=${item.item_id}`
    Taro.navigateTo({
      url
    })
  }

  render () {
    const { list, showBackToTop, scrollTop, page } = this.state

    return (
      <View>
        <NavGap title='历史'/>
        <View className='page-goods-list page-goods-history'>
          <View className='goods-list__toolbar'>
            <NavBar
              leftIconType='chevron-left'
              fixed='true'
            />
          </View>

          <ScrollView
            className='goods-list__scroll'
            scrollY
            scrollTop={scrollTop}
            scrollWithAnimation
            onScroll={this.handleScroll}
            onScrollToLower={this.nextPage}
          >
            <View className='goods-list goods-list__type-grid'>
              {
                list.map(item => {
                  return (
                    <GoodsItem
                      key={item.item_id}
                      info={item}
                      onClick={() => this.handleClickItem(item)}
                    />
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

          <BackToTop
            show={showBackToTop}
            onClick={this.scrollBackToTop}
          />
        </View>
      </View>
    )
  }
}
