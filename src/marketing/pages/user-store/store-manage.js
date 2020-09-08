import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView,Input,Image} from '@tarojs/components'
import { FilterBar ,NavGap,Loading} from "../../../components";

import api from '@/api'
import {withPager} from "../../../hocs";
import './store-manage.scss'

@withPager
export default class StoreManage extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      instock_count:0,
      onsale_count:0,
      curFilterIdx:0,
      filterList: [
        { title: '添加时间',sort:-1 },
        { title: '总销量' },
        { title: '价格', sort: -1 }
      ],
      curStatus:'in_sale',
      inSaleList:[],
      inStockList:[],
      query:'',
      createTime:'',
      totalSell:'',
      price:''
    }
  }
  componentDidMount(){
    this.nextPage()
  }
  fetch = async(params) => {
    const { page_no ,page_size } = params
    let sort;
    let obj = this.state.filterList[this.state.curFilterIdx]
    switch (obj.title) {
      case "价格":
        sort = obj.sort > 0?2:3
        break
      case "添加时间":
        sort = obj.sort >0? 4:5
        break
      default :
        sort = 1
    }
    let option = {
      page:page_no,
      pageSize:page_size,
      item_type:'normal',
      is_point:false,
      keywords:this.state.query,
      approve_status:this.state.curStatus === 'in_sale'?'onsale':'instock',
      goodsSort:sort
    }
    const { list,total_count,instock_count,onsale_count } = await api.store.getList(option)
    this.setState({
      instock_count,
      onsale_count
    })
    if(this.state.curStatus === 'in_sale'){
      this.setState({
        inSaleList:[...this.state.inSaleList,...list],
      })
    }else{
      this.setState({
        inStockList:[...this.state.inStockList,...list],
      })
    }
    return {total:total_count}
  }

  handleSearch(e){
      this.setState({
        inSaleList:[],
        inStockList:[],
        query:e.detail.value
      },() => {
        this.resetPage(() =>{
          this.nextPage()
        })
      })
  }
  handleFilterChange(e){
    if(this.state.page.isLoading) return
    this.state.filterList[e.current].sort = e.sort
    this.setState({
      inSaleList:[],
      inStockList:[],
      curFilterIdx:e.current,
      filterList:this.state.filterList
    },() => {
      this.resetPage(() =>{
        this.nextPage()
      })
    })
  }
  handleChangeStatus(type){
    if(this.state.page.isLoading) return
      this.setState({
        curStatus:type,
        inSaleList:[],
        inStockList:[]
    },() => {
      this.resetPage(() =>{
        this.nextPage()
      })
    })
  }
  handleFeature(type,item){
    switch (type) {
      case 'popularize':
        Taro.navigateTo({url:`/marketing/pages/user-store/popularize?itemId=${item.item_id}`})
        break
      case 'edit':
        Taro.navigateTo({url:`/marketing/pages/user-store/edit/edit-goods?itemId=${item.item_id}`})
        break
      case 'preview' :
        Taro.navigateTo({url:`/pages/item/espier-detail?id=${item.item_id}&operator_id=${item.operator_id}`})
        break
      case 'add':
        Taro.navigateTo({url:`/marketing/pages/user-store/edit/edit-goods`})
        break
      case 'status':
        let Err1
        try {
          api.store.changeStatus({items:[{goods_id:item.goods_id}],status:item.approve_status === 'onsale'?'instock':'onsale'})
        }catch (e) {
          Err1 = e
        }
        if(!Err1){
          Taro.showToast({title:`${item.approve_status === 'onsale'?'下架':'上架'}成功`,icon:'success'})
          Taro.redirectTo({url:'/marketing/pages/user-store/store-manage'})
        }
        break
      default :
        let Err
        try {
          api.store.deleteItems(item.item_id)
        }catch (e) {
          Err = e
        }
        if(!Err){
          Taro.showToast({title:'删除成功',icon:'success'})
          Taro.redirectTo({url:'/marketing/pages/user-store/store-manage'})
        }
    }
  }
  handleInput(e){
    this.setState({
      query:e.detail.value
    })
  }
  render() {
    const {query,inSaleList,inStockList,curStatus,filterList,curFilterIdx,instock_count,onsale_count} = this.state
    let list = curStatus === 'in_sale'?inSaleList:inStockList
    return(
      <View className='personal-store'>
        <NavGap title='小店管理'/>
        <View className='store-content'>
          <View className='store-content-search'>
            <View className='store-content-search-inner'>
              <View className='iconfont icon-sousuo'/>
              <Input
                value={query}
                placeholder='商品名称'
                placeholderClass='search-holder'
                className='search-input'
                onInput={this.handleInput.bind(this)}
                onConfirm={this.handleSearch.bind(this)}
              />
            </View>
          </View>
          <View className='store-content-goods'>
            <View className='sort-status'>
              <View
                className={`status-item ${curStatus === 'in_sale'?'checked':''}`}
                onClick={this.handleChangeStatus.bind(this,'in_sale')}
              >
                出售中({onsale_count})</View>
              <View
                className={`status-item ${curStatus === 'in_stock'?'checked':''}`}
                onClick={this.handleChangeStatus.bind(this,'in_stock')}
              >
                已下架({instock_count})</View>
            </View>
            <View className='goods-dec-sort'>
              <FilterBar
                className='goods-list__tabs'
                custom
                current={curFilterIdx}
                list={filterList}
                onChange={this.handleFilterChange.bind(this)}
              >
              </FilterBar>
            </View>
            <ScrollView
              scrollY
              enableFlex={true}
              className='scroll-view-list'
              onScrollToLower={this.nextPage}
              >
                  {
                    this.state.page.isLoading?
                      <View className='none-goods'><Loading>加载中...</Loading></View>:
                    list.length === 0?
                      <View className='none-goods'>暂时没有商品</View>:
                      <View className='goods-list'>
                        {
                          list.map((item) => {
                            let status
                            switch (item.approve_status) {
                              case 'onsale':
                                status = '前台可销售'
                                break
                              case 'offline_sale':
                                status = '线下可销售'
                                break
                              case 'only_show':
                                status = '仅展示'
                                break
                              default :
                                status = '不可销售'
                            }
                            return(
                              <View className='personal-goods-item'>
                                <View className='item-content'>
                                  <View className='item-left'>
                                    <Image mode='widthFix' className='img' src={item.pics[0]}/>
                                  </View>
                                  <View className='item-middle'>
                                    <View className='item-middle-top'>
                                      <Text className='item-name'>{item.item_name}</Text>
                                      <View className='item-price'>￥{Number(item.price)/100}</View>
                                    </View>
                                    <View className='item-middle-bottom'>
                                      <View className='dec-item'><Text>商品id:{item.item_id}</Text><Text>库存:{item.store}</Text></View>
                                      <View className='dec-item'><Text>总销量:{item.sales}</Text><Text>状态:{status}</Text></View>
                                    </View>
                                  </View>
                                  <View className='item-right iconfont icon-chakan' onClick={this.handleFeature.bind(this,'preview',item)}/>
                                </View>
                                <View className='item-feature' >
                                  <View className='feature-item' onClick={this.handleFeature.bind(this,'popularize',item)}>分佣</View>
                                  <View className='feature-item' onClick={this.handleFeature.bind(this,'edit',item)}>编辑</View>
                                  <View className='feature-item' onClick={this.handleFeature.bind(this,'status',item)}>{item.approve_status === 'onsale'?'下架':'上架'}</View>
                                  <View className='feature-item delete' onClick={this.handleFeature.bind(this,'delete',item)}>删除</View>
                                </View>
                              </View>
                            )
                          })
                        }
                      </View>
                  }
            </ScrollView>
          </View>
          <View className='store-content-add' onClick={this.handleFeature.bind(this,'add')}>
            <View className='iconfont icon-add-sy'/>
            <View>添加商品</View>
          </View>
        </View>
      </View>
    )
  }
}
