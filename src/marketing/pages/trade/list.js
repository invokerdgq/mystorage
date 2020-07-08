import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from "@tarojs/redux";
import { AtTabs, AtTabsPane } from 'taro-ui'
import _mapKeys from 'lodash/mapKeys'
import { Loading, SpNote, NavBar } from '@/components'
import api from '@/api'
import { withPager, withLogin } from '@/hocs'
import { log, pickBy, resolveOrderStatus, getCurrentRoute } from '@/utils'
import TradeItem from './comps/item'
import NavGap from "../../../components/nav-gap/nav-gap";

import './list.scss'

@connect(({ colors ,address}) => ({
  colors: colors.current,
  address:address.current
}), (dispatch) => ({
  clearAddress: () => dispatch({ type: 'address/choose', payload: null }),
}))

@withPager
@withLogin()
export default class TradeList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      curTabIdx: 0,
      tabList: [
        {title: '全部订单', status: '0'},
        {title: '待付款', status: '5'},
        {title: '待收货', status: '1'},
        {title: '已完成', status: '3'},
        {title:'会员购买',status:'7'}
      ],
      list:[],
      rateStatus: false,
      curItemActionsId: null,
      changeAddress:false,
      currentId:null,
      currentOrder:null
    }
  }

   componentDidShow () {
    console.log(this.props.address)
    if(this.state.changeAddress){
      if(this.props.address){
        const address = this.props.address
        const order = this.state.currentOrder
        let params = {
           order_id:order.tid,
           address_id:address.address_id
        }
        let changeError
        try{
            api.trade.editAddress(params)
        }catch (e) {
          changeError = e
        }
       if(changeError){
         console.log(e)
       }else{
         this.setState({
           changeAddress:false
         })
         Taro.showToast({
           title:'修改成功',
           icon:'none',
           duration:1500
         })
         this.props.clearAddress()
       }
      }
    }
    const { status } = this.$router.params
    const tabIdx = this.state.tabList.findIndex(tab => tab.status === status)

    if (tabIdx >= 0) {
      this.setState({
        curTabIdx: tabIdx,
        list: []
      }, () => {
        this.resetPage()
        setTimeout(()=>{
          this.nextPage()
        },500)
      })
    } else {
      this.resetPage()
      this.setState({
        list: []
      })
      setTimeout(()=>{
        this.nextPage()
      },500)
    }

  }

  onPullDownRefresh = () =>{
    // debugger
    Taro.showLoading({
      title: '加载中',
      icon: 'none',
    })
    this.resetPage(() => {
      this.nextPage()
      this.setState({
        list: []
      })
      Taro.hideLoading()
    })
  }


  componentWillUnmount () {
    this.hideLayer()
  }

  async fetch (params) {
    const { tabList, curTabIdx } = this.state
    if(tabList[curTabIdx].status === '7'){
      const {list,total_count:total} = await api.member.getRecord(params)
      this.setState({
        list:[...this.state.list,...list]
      },() => {
        console.log('kkkkkkkkkkkk')
        console.log(this.state.list)
      })
      return {total}
    }

    params = _mapKeys({
      ...params,
      order_type: 'normal',
      status: tabList[curTabIdx].status
    }, function (val, key) {
      if (key === 'page_no') return 'page'
      if (key === 'page_size') return 'pageSize'

      return key
    })

    const { list, pager: { count: total }, rate_status } = await api.trade.list(params)
    let nList = pickBy(list, {
      tid: 'order_id',
      status_desc: 'order_status_msg',
      order_status_des: 'order_status_des',
      status: ({ order_status }) => resolveOrderStatus(order_status),
      totalItems: ({ items }) => items.reduce((acc, item) => (+item.num) + acc, 0),
      payment: ({ total_fee }) => (total_fee / 100).toFixed(2),
      total_fee: 'total_fee',
      pay_type: 'pay_type',
      point: 'point',
      is_rate: 'is_rate',
      create_date: 'create_date',
      order: ({ items }) => pickBy(items, {
        order_id: 'order_id',
        item_id: 'item_id',
        pic_path: 'pic',
        title: 'item_name',
        item_spec_desc: 'item_spec_desc',
        price: ({ item_fee }) => (+item_fee / 100).toFixed(2),
        item_fee: 'item_fee',
        point: 'item_point',
        num: 'num'
      })
    })

    log.debug('[trade list] list fetched and processed: ', nList)

    this.setState({
      list: [...this.state.list, ...nList],
      rateStatus: rate_status
    })

    Taro.stopPullDownRefresh()

    return { total }
  }

  handleClickTab = (idx) => {
    this.hideLayer()
    if (this.state.page.isLoading) return

    if (idx !== this.state.curTabIdx) {
      this.resetPage()
      this.setState({
        list: []
      })
    }

    this.setState({
      curTabIdx: idx
    }, () => {
      this.nextPage()
    })
  }

  handleClickItem = (trade) => {
    const { tid } = trade

    Taro.navigateTo({
      url: `/pages/trade/detail?id=${tid}`
    })
  }

  handleClickItemBtn = async (trade, type) => {
    let { tid } = trade
    if(!tid){
      tid = trade.order_id
    }
    if (type === 'confirm') {
      await api.trade.confirm(tid)
      Taro.redirectTo({
        url: '/pages/trade/list?status =1'
      })
      return
    }

    switch(type) {
      case 'cancel':
        Taro.navigateTo({
          url: `/pages/trade/cancel?order_id=${tid}`
        })
        break
      case 'rate':
        Taro.navigateTo({
          url: `/marketing/pages/item/rate?id=${tid}`
        })
        break
      case 'change':
        this.setState({
          changeAddress:true,
          currentOrder:trade
        })
        this.props.clearAddress()
        Taro.navigateTo({
          url:'/pages/member/address?isPicker=choose'
        })
        break
      default:
        Taro.navigateTo({
          url: `/pages/trade/detail?id=${tid}`
        })
    }
  }

  handleActionClick = (type, item) => {
    console.log(type, item)
    this.hideLayer()
  }

  handleActionBtnClick = (item) => {
    this.setState({
      curItemActionsId: item.tid
    })
  }

  hideLayer = () => {
    this.setState({
      curItemActionsId: null
    })
  }
  deliveryDec (item) {
    console.log(item)
      Taro.navigateTo({
        url: `/pages/trade/delivery-info?order_type=${item.gift?'memberCard':'normal'}&order_id=${item.order_id}&delivery_code=${item.delivery_code}&delivery_corp=${item.delivery_corp}&delivery_name=${item.delivery_corp}`
      })
  }
  render () {
    const { colors } = this.props
    const { curTabIdx, curItemActionsId, tabList, list, page, rateStatus } = this.state
    return (
      <View>
        <NavGap title='订单列表'/>
        <View className='page-trade-list'>
          <NavBar
            title='订单列表'
            leftIconType='chevron-left'
            fixed='true'
          />
          <AtTabs
            className='trade-list__tabs'
            current={curTabIdx}
            tabList={tabList}
            onClick={this.handleClickTab}
          >
            {
              tabList.map((panes, pIdx) =>
                (<AtTabsPane
                  current={curTabIdx}
                  key={pIdx}
                  index={pIdx}
                >
                </AtTabsPane>)
              )
            }
          </AtTabs>

          <ScrollView
            scrollY
            className='trade-list__scroll with-tabs'
            onScrollToUpper={this.onPullDownRefresh.bind(this)}
            onScrollToLower={this.nextPage}
          >
            { tabList[curTabIdx].status !== '7'&&
              list.map((item,index) => {
                return (
                      <TradeItem
                        payType={item.pay_type}
                        key={item.tid}
                        rateStatus={rateStatus}
                        info={item}
                        showActions={curItemActionsId === item.tid}
                        onClick={this.handleClickItem.bind(this, item)}
                        onClickBtn={this.handleClickItemBtn.bind(this, item)}
                        onActionBtnClick={this.handleActionBtnClick.bind(this, item)}
                        onActionClick={this.handleActionClick.bind(this, item)}
                      />
                  )
              })
            }
            {
              tabList[curTabIdx].status === '7'&&
                list.map((item) => {
                  return (
                    <View className='vip-order-container'>
                      <View className='vip-order-header'>
                        <View className='vip-order-header-time'>{item.created}</View>
                        <View className= 'vip-order-header-id'>订单号:{item.order_id}</View>
                      </View>
                      <View className='vip-order-body'>
                        <View className='vip-order-body-type'>会员卡:{item.title}</View>
                        <View className='vip-order-body-gift'>礼包:{item.gift}</View>
                      </View>
                      <View className='vip-order-bottom'>
                        <View className='vip-order-bottom-user'>用户:{item.username}</View>
                        <View className='vip-order-bottom-phone'>电话:{item.telephone}</View>
                        <View className='vip-order-bottom-address'>地址:{item.address}</View>
                      </View>
                      <View className='order-feature'>
                        <View className='total'><Text>共1件商品 合计：￥299.00</Text></View>
                        <View className='more-info'><Text className='delivery-status'>{item.delivery_status === 'DONE'?'已发货':'待发货'}</Text>
                          {
                            item.delivery_status === 'DONE'&&
                          <View  className='order-dec' onClick={this.deliveryDec.bind(this,item)}>
                            物流详情
                          </View>
                        }</View>
                      </View>
                    </View>
                    )
                })
            }
            {
              page.isLoading && <Loading>正在加载...</Loading>
            }
            {
              !page.isLoading && !page.hasNext && !list.length
              && (<SpNote img='trades_empty.png'>赶快去添加吧~</SpNote>)
            }
            {!!curItemActionsId && <View
              className='layer'
              onClick={this.hideLayer}
            />}
          </ScrollView>
        </View>
      </View>
    )
  }
}
