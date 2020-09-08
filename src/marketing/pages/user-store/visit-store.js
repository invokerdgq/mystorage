import Taro, { Component } from '@tarojs/taro'
import {View,Text,Image,ScrollView,Input} from "@tarojs/components"
import api from '@/api'
import { FilterBar } from "../../../components";
import NavGap from "../../../components/nav-gap/nav-gap";
import { withPager } from "../../../hocs";
import './visit-store.scss'
@withPager
export default class VisitStore extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      curFilterIdx:0,
      filterList: [
        { title:'综合排序'},
        { title: '销量' },
        { title: '上新时间',sort:-1 },
        { title: '价格', sort: -1 }
      ],
      query:'',
      createTime:'',
      totalSell:'',
      price:'',
      goodsList:[]
    }
  }
 componentDidMount() {
    const {id} = this.$router.params
   this.fetchBaseInfo(id)
    this.nextPage()
}

fetchBaseInfo = async(id) =>{
  const res = await api.store.getShopInfo(id)
  this.setState({
    ownername:res.username,
    avatar:res.head_portrait
  })
}
fetch =async (params) =>{
   const {page_no,page_size} = params
    let sort
    let obj = this.state.filterList[this.state.curFilterIdx]
    switch (obj.title) {
      case "销量":
        sort = 1
        break
      case "上新时间":
        sort = obj.sort >0? 4:5
        break
      case "价格":
        sort = obj.sort > 0?2:3
        break
      default :
        sort=''
    }
    const option = {
      page:page_no,
      pageSize:page_size,
      item_type:'normal',
      is_point:false,
      keywords:this.state.query,
      goodsSort:sort,
      operator_id:this.$router.params.id
    }
    let total
    const {list,total_count} = await api.item.search(option)
    this.setState({
      goodsList:[...this.state.goodsList,...list]
    })
  total = total_count
  return {total}
}

  handleSearch(e){
    this.setState({
      goodsList:[],
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
      goodsList:[],
      curFilterIdx:e.current,
      filterList:this.state.filterList
    },() => {
      this.resetPage(() =>{
        this.nextPage()
      })
    })
  }
  handleInput(e){
    this.setState({
      query:e.detail.value
    })
  }
  handleDetail(id){
    Taro.navigateTo({url:`/pages/item/espier-detail?id=${id}&operator_id=${this.$router.params.id}`})
  }
  render() {
    const {goodsList,curFilterIdx,filterList,query,avatar,ownername} = this.state
    return(
      <View className='store'>
        <NavGap title='店铺详情'/>
        <View className='store-content'>
           <View className='user-dec'>
             <View className='avatar-img'><Image  mode='widthFix' className='img' src={avatar}/></View><Text className='user-name'>{ownername}的微小店</Text>
           </View>
          <View className='dec'>
            <View className='search-input'>
              <Input onConfirm={this.handleSearch.bind(this)} value={query} className='inner-input'  onInput={this.handleInput.bind(this)}/>
              <View className='iconfont icon-sousuo'/>
            </View>
            <View className='iconfont icon-fenlei'/>
          </View>
           <View className='goodsList-content'>
             <FilterBar
               className='goods-list__tabs'
               custom
               current={curFilterIdx}
               list={filterList}
               onChange={this.handleFilterChange.bind(this)}
             />
             <View className='goods-list'>
               <ScrollView
               scrollY
               enableFlex={true}
               onScrollToLower={this.nextPage}
               className='goods-scroll'
               >
                 <View className='list-container'>
                   {goodsList.length !==0?
                     goodsList.map((item,index) => {
                       return(
                         <View className='item-container' onClick={this.handleDetail.bind(this,item.item_id)}>
                           <View className='img-container'>
                             <Image mode='widthFix' className='img' src={item.pics[0]}/>
                           </View>
                           <View className='goods-dec'>
                             <View className='goods-name'>{item.item_name}</View>
                             <View className='goods-price'><Text className='inner'>￥{Number(item.price)/100}</Text><Text className='sale-count'>已售{item.fictitious_sales}件</Text></View>
                           </View>
                         </View>
                       )
                     }):
                     <View className='none-goods'>暂时没有数据</View>
                   }
                 </View>
               </ScrollView>
             </View>
           </View>
        </View>
      </View>
    )
  }
}
