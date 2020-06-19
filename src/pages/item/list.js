import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { withPager, withBackToTop } from '@/hocs'
import { AtDrawer } from 'taro-ui'
import { BackToTop, Loading, TagsBar, FilterBar, SearchBar, GoodsItem, NavBar, SpNote } from '@/components'
import api from '@/api'
import { pickBy, classNames } from '@/utils'
import NavGap from "../../components/nav-gap/nav-gap";

import './list.scss'


@connect(({
  member
}) => ({
  favs: member.favs
}))
@withPager
@withBackToTop
export default class List extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      curFilterIdx: 0,
      curTagId: '',
      filterList: [
        { title: '综合' },
        { title: '销量' },
        { title: '价格', sort: -1 }
      ],
      query: null,
      list: [], // 商品列表
      tagsList: [], // 标签列表
      paramsList: [], // ???
      listType: 'grid', //    列表展示样式形式（grid line）
      isShowSearch: false,
      showDrawer: false,
      selectParams: [],
      info: {}
    }
  }

  componentDidMount () {
    Taro.M(this)
    const { cat_id = null, main_cat_id = null } = this.$router.params
    this.firstStatus = true
    this.setState({
      query: {
        keywords: this.$router.params.keywords,
        item_type: 'normal', // 普通商品 药物
        is_point: 'false',   // ???????
        approve_status: 'onsale,only_show',
        category: cat_id ? cat_id : '',
        main_category: main_cat_id ? main_cat_id : ''
			},
			curTagId:this.$router.params.tag_id // 标签id
    }, () => {
      this.nextPage()
    })
  }

  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    const { selectParams, tagsList, curTagId } = this.state
    const { distributor_id } = Taro.getStorageSync('curStore')
    const query = {
      ...this.state.query,
      item_params: selectParams,
      tag_id: curTagId,
      distributor_id,
      page,
      pageSize
    }
    const { list, total_count: total, item_params_list = [], select_tags_list = []} = await api.item.search(query)
    const { favs } = this.props

    item_params_list.map(item => {
      if(selectParams.length < 4){
        selectParams.push({
          attribute_id: item.attribute_id,
          attribute_value_id: 'all'
        })
      }
      item.attribute_values.unshift({attribute_value_id: 'all', attribute_value_name: '全部', isChooseParams: true})
    })

    const nList = pickBy(list, {
      img: 'pics[0]',
      item_id: 'item_id',
      title: 'itemName',
      desc: 'brief',
      promotion_activity_tag: 'promotion_activity',
      price: ({ price }) => (price/100).toFixed(2),
      member_price: ({ member_price }) => (member_price/100).toFixed(2),
      market_price: ({ market_price }) => (market_price/100).toFixed(2),
      is_fav: ({ item_id }) => Boolean(favs[item_id]),
      rebate_commission: ({rebate_commission}) => rebate_commission
    })
    this.setState({
      list: [...this.state.list, ...nList],
      // showDrawer: false,
      query
    })

    if (this.firstStatus) {
      this.setState({
        paramsList: item_params_list,
        selectParams
      })
      this.firstStatus = false
    }

    if (tagsList.length === 0) {
      let tags = select_tags_list
      tags.unshift({
        tag_id: 0,
        tag_name: '全部'
      })
      this.setState({
        //curTagId: 0,
        tagsList: tags
      })
    }
    return {
      total
    }
  }

  handleTagChange = (data) => {                   // 标签筛选改变
    const { current } = data

    this.resetPage()
    this.setState({
      list: []
    })

    this.setState({
      curTagId: current
    }, () => {
      this.nextPage()
    })
  }

  handleFilterChange = (data) => {                                           // 排序标准改变
    this.setState({
      showDrawer: false
    })
    const { current, sort } = data

    const query = {
      ...this.state.query,
      goodsSort: current === 0
          ? null
          : current === 1
            ? 1
            : (sort > 0 ? 3 : 2)
    }

    if (current !== this.state.curFilterIdx || (current === this.state.curFilterIdx && query.goodsSort !== this.state.query.goodsSort)) {
      this.resetPage()
      this.setState({
        list: []
      })
    }

    this.setState({
      curFilterIdx: current,
      query
    }, () => {
      this.nextPage()
    })
  }

  handleListTypeChange = () => {
    const listType = this.state.listType === 'grid' ? 'default' : 'grid'

    this.setState({
      listType
    })
  }

  handleClickItem = (item) => {                                              //点击单个项目 回调
    const url = `/pages/item/espier-detail?id=${item.item_id}`
    Taro.navigateTo({
      url
    })
  }

  handleClickFilter = () => {
    this.setState({
      showDrawer: true
    })
  }

  handleClickParmas = (id, child_id) => {
    const { paramsList, selectParams } = this.state
    paramsList.map(item => {
      if(item.attribute_id === id) {
        item.attribute_values.map(v_item => {
          if(v_item.attribute_value_id === child_id) {
            v_item.isChooseParams = true
          } else {
            v_item.isChooseParams = false
          }
        })
      }
    })
    selectParams.map(item => {
      if(item.attribute_id === id) {
        item.attribute_value_id = child_id
      }
    })
    this.setState({
      paramsList,
      selectParams
    })
  }

  handleClickSearchParams = (type) => {
    this.setState({
      showDrawer: false
    })
    if(type === 'reset') {
      const { paramsList, selectParams } = this.state
      this.state.paramsList.map(item => {
        item.attribute_values.map(v_item => {
          if(v_item.attribute_value_id === 'all') {
            v_item.isChooseParams = true
          } else {
            v_item.isChooseParams = false
          }
        })
      })
      selectParams.map(item => {
        item.attribute_value_id = 'all'
      })
      this.setState({
        paramsList,
        selectParams
      })
    }

    this.resetPage()
    this.setState({
      list: []
    }, () => {
      this.nextPage()
    })
  }

  handleViewChange = () => {                                                   //显示方式 发生改变
    const { listType } = this.state
    if (listType === 'grid') {
      this.setState({
        listType: 'list'
      })
    } else {
      this.setState({
        listType: 'grid'
      })
    }
  }

  handleSearchOn = () => {
    this.setState({
      isShowSearch: true
    })
  }

  handleSearchOff = () => {
    this.setState({
      isShowSearch: false
    })
  }

  handleSearchChange = (val) => {
    this.setState({
      query: {
        ...this.state.query,
        keywords: val
      }
    })
  }

  handleSearchClear = () => {
    this.setState({
      isShowSearch: false,
      query: {
        ...this.state.query,
        keywords: ''
      }
    }, () =>{
      this.resetPage()
      this.setState({
        list: [],
        oddList: [],
        evenList: []
      }, () => {
        this.nextPage()
      })
    })
  }

  handleConfirm = (val) => {
    this.setState({
      isShowSearch: false,
      query: {
        ...this.state.query,
        keywords: val,
      }
    }, () =>{
      this.resetPage()
      this.setState({
        list: []
      }, () => {
        this.nextPage()
      })
    })
	}

  render () {
    const {
      list,
      listType,
      curFilterIdx,
      filterList,
      showBackToTop,
      scrollTop,
      page,
      showDrawer,
      paramsList,
      selectParams,
      tagsList,
      curTagId,
			info,
      isShowSearch,
      query
    } = this.state

		return (
		  <View>
        <NavGap title='商品列表'/>
        <View className='page-goods-list'>
          <View className='goods-list__toolbar'>
            <View className={`goods-list__search ${(query && query.keywords && !isShowSearch) ? 'on-search' : null}`}>
              <SearchBar
                keyword={query ? query.keywords : ''}
                onFocus={this.handleSearchOn}
                onChange={this.handleSearchChange}
                onClear={this.handleSearchClear}
                onCancel={this.handleSearchOff}
                onConfirm={this.handleConfirm.bind(this)}
              />
              {
                !isShowSearch &&
                <View
                  className={classNames('goods-list__type', listType === 'grid' ? 'icon-list iconfont' : 'icon-grid iconfont')}
                  onClick={this.handleViewChange}
                >
                </View>
              }
            </View>
            {
              tagsList.length &&
              <TagsBar
                current={curTagId}
                list={tagsList}
                onChange={this.handleTagChange.bind(this)}
              />
            }
            <FilterBar
              className='goods-list__tabs'
              custom
              current={curFilterIdx}
              list={filterList}
              onChange={this.handleFilterChange}
            >
              {/*
              <View className='filter-bar__item' onClick={this.handleClickFilter.bind(this)}>
                <View className='icon-filter'></View>
                <Text>筛选</Text>
              </View>
            */}
            </FilterBar>
          </View>

          <AtDrawer
            show={showDrawer}
            right
            mask
            width={`${Taro.pxTransform(570)}`}
          >
            {
              paramsList.map((item, index) => {
                return (
                  <View className='drawer-item' key={index}>
                    <View className='drawer-item__title'>
                      <Text>{item.attribute_name}</Text>
                      <View className='at-icon at-icon-chevron-down'> </View>
                    </View>
                    <View className='drawer-item__options'>
                      {
                        item.attribute_values.map((v_item, v_index) => {
                          return (
                            <View
                              className={classNames('drawer-item__options__item' ,v_item.isChooseParams ? 'drawer-item__options__checked' : '')}
                              // className='drawer-item__options__item'
                              key={v_index}
                              onClick={this.handleClickParmas.bind(this, item.attribute_id, v_item.attribute_value_id)}
                            >
                              {v_item.attribute_value_name}
                            </View>
                          )
                        })
                      }
                      <View className='drawer-item__options__none'> </View>
                      <View className='drawer-item__options__none'> </View>
                      <View className='drawer-item__options__none'> </View>
                    </View>
                  </View>
                )
              })
            }
            <View className='drawer-footer'>
              <Text className='drawer-footer__btn' onClick={this.handleClickSearchParams.bind(this, 'reset')}>重置</Text>
              <Text className='drawer-footer__btn drawer-footer__btn_active' onClick={this.handleClickSearchParams.bind(this, 'submit')}>确定</Text>
            </View>
          </AtDrawer>

          <ScrollView
            className={classNames('goods-list__scroll', tagsList.length > 0 && 'with-tag-bar')}
            scrollY
            scrollTop={scrollTop}
            scrollWithAnimation
            onScroll={this.handleScroll}
            onScrollToLower={this.nextPage}
          >
            <View className={`goods-list goods-list__type-${listType}`}>
              {
                list.map(item => {
                  return (
                    <View className='goods-list__item'>
                      <GoodsItem
                        key={item.item_id}
                        info={item}
                        onClick={() => this.handleClickItem(item)}
                      />
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

          <BackToTop
            show={showBackToTop}
            onClick={this.scrollBackToTop}
            bottom={30}
          />
        </View>
      </View>

    )
  }
}
