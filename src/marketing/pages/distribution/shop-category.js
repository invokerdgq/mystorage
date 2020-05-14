import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import { Loading,GoodsItem,SpNote} from '@/components'
import { classNames, pickBy,getCurrentRoute } from '@/utils'
import { withPager, withBackToTop } from '@/hocs'
import api from '@/api'

import './shop-category.scss'
import {AtTabBar, AtTabsPane} from "taro-ui";
@withPager
@withBackToTop
export default class DistributionShopCategory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      curTabIdx: 0,
      currentIndex:0,
      tabList: [
        { title: '重点推荐', iconType: 'home', iconPrefixClass: 'icon',url: '/pages/distribution/shop-home',urlRedirect: true },
        { title: '分类', iconType: 'category', iconPrefixClass: 'icon', url: '/marketing/pages/distribution/shop-category', urlRedirect: true },
      ],
      contentList: [],
      list:[],
      hasSeries: false,
      isChanged: false,
      localCurrent:1,
      defaultId:0,
      shop_pic:''
    }
  }
  componentWillReceiveProps (nextProps){
    if(nextProps.isChanged === true) {
      this.setState({
        currentIndex: 0,
      })
    }
  }

  componentDidMount () {
    this.fetchInfo()
  }
  async fetchInfo (){
    const query = {
      category_level:2
    }

    const { userId } = Taro.getStorageSync('userinfo')
    const distributionShopId = Taro.getStorageSync('distribution_shop_id')
    const param = distributionShopId ? {
      user_id: distributionShopId,
    } : {
      user_id: userId,
    }
    const { banner_img } = await api.distribution.shopBanner(param || null)
    const { list } = await api.distribution.getCategorylevel(query)
    //const [banner_img,list] = await Promise.all([api.distribution.shopBanner(param || null),api.distribution.getCategorylevel(query)])
    const cate_id = list[0].category_id
    const nList = pickBy(list, {
      name: 'category_name',
      id: 'category_id',
    })
    this.setState({
      list: nList,
      defaultId:cate_id,
      hasSeries: false,
      shop_pic:banner_img
    },() => {
      this.nextPage()
    })
  }

  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    const { defaultId } = this.state
    let distribution_shop_id = Taro.getStorageSync('distribution_shop_id')

    const query = {
      ...this.state.query,
      category: defaultId,
      item_type:'normal',
      page,
      pageSize,
      promoter_shop_id:distribution_shop_id,
      promoter_onsale:true,
      approve_status: 'onsale,only_show'
    }
    //console.warn('83',params)
      const { list: goodsList, total_count: total} = await api.item.search(query)
      const nItem = pickBy(goodsList,{
        img: 'pics[0]',
        item_id: 'item_id',
        goods_id: 'goods_id',
        title: 'itemName',
        desc: 'brief',
        price: ({ price }) => (price/100).toFixed(2),
        //promoter_price: ({ promoter_price }) => (promoter_price/100).toFixed(2),
        market_price: ({ market_price }) => (market_price/100).toFixed(2)
      })
      this.setState({
        contentList:[...this.state.contentList,...nItem],
        query
      })
      //Taro.stopPullDownRefresh()
      return {
        total
      }

  }
//  handleClickCategoryNav = (gIndex,value) => {
//    console.warn(value)
//   this.setState({
//     currentIndex: gIndex,
//     defaultId:value.id
//   },() => {
//     this.nextPage()
//   })
//  // console.warn(categoryId)
// }
handleClickCategoryNav = (idx,value) => {
  console.warn(idx)
  if (this.state.page.isLoading) return

  if (idx !== this.state.curTabIdx) {
    this.resetPage()
    this.setState({
      contentList: []
    })
  }

  this.setState({
    currentIndex: idx,
    defaultId:value.id
  }, () => {
    this.nextPage()
  })
}


  handleClick = (current) => {
    const cur = this.state.localCurrent

    if (cur !== current) {
      const curTab = this.state.tabList[current]
      const { url, urlRedirect } = curTab

      const fullPath = ((getCurrentRoute(this.$router).fullPath).split('?'))[0]
      if (url && fullPath !== url) {
        if (!urlRedirect || (url === '/pages/member/index' && !S.getAuthToken())) {
          Taro.navigateTo({ url })
        } else {
          Taro.redirectTo({ url })
        }
      }
    }
  }
  handleClickItem = (item) => {
    console.warn(item)
    const { goods_id} = item
    let url = ''
    if (goods_id) {
      url = `/pages/item/espier-detail?id=${goods_id || ''}`
    }
    if (url) {
      Taro.navigateTo({
        url
      })
    }
  }
  render () {
    const { list, isChanged,tabList,localCurrent, contentList ,defaultId ,shop_pic ,currentIndex, page, scrollTop } = this.state
    return (
      <View className='page-category-index'>
        <View className='category-banner'>
              <Image
                className='banner-img'
                src={shop_pic || null}
                mode='aspectFill'
          />
      </View>
        <View className={`${hasSeries && tabList.length !== 0 ? 'category-comps' : 'category-comps-not'}`}>
          {/* <SeriesItem
            isChanged={isChanged}
            info={list}
            content= {contentList}
            defaultId={defaultId}
            onClick = {this.handleClickCategory.bind(this)}
          /> */}
      <View className='category-list'>
        <ScrollView
          className='category-list__nav'
          scrollY
        >
          <View className='category-nav'>
            {
              list.map((item, index) =>
                <View
                  className={classNames('category-nav__content', currentIndex == index ? 'category-nav__content-checked' : null)}
                  key={index}
                  onClick={this.handleClickCategoryNav.bind(this,index,item)}
                >
                  { item.hot && <Text className='hot-tag'></Text> }{item.name}
                </View>
              )
            }
          </View>
        </ScrollView>
        {/*右*/}
        <View className='shop-category__wrap'>
          <ScrollView
            className='category-list__scroll'
            scrollY
            scrollTop={scrollTop}
            scrollWithAnimation
            onScroll={this.handleScroll}
            onScrollToLower={this.nextPage}
          >
            <View className='grid-goods'>
            {
              contentList.length && contentList.map(item =>{
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
            !page.isLoading && !page.hasNext && !contentList.length
              && (<SpNote img='trades_empty.png'>暂无数据~</SpNote>)
          }

          </ScrollView>

        </View>
      </View>


        </View>
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={this.handleClick}
          current={localCurrent}
        />
      </View>

    )
  }
}
