import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import NavGap from "../../../components/nav-gap/nav-gap";
import api from '@/api'
import {withPager} from "../../../hocs";

import './gift-exchange.scss'
import {Loading} from "../../../components";
@withPager
export default class Exchange extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      giftGoodsList:[]
    }
  }
  componentDidMount() {
    this.nextPage()
  }
  async fetch (params){
     const {page_no,page_size} =params;
     let option = {
       item_type:'normal',
       is_point:false,
       approve_status:'onsale,only_show',
       category:'',
       main_category: '',
       page:page_no,
       pageSize:page_size
     }
    const {list,total_count:total} = await api.item.getCardList(option)
    this.setState({
      giftGoodsList:[...this.state.giftGoodsList,...list]
    })
  return {total}
  }

  handleClickItem(id){
    Taro.navigateTo({
      url:`/pages/item/espier-detail?id=${id}&source=exchange`
    })
  }
  render() {
    const {giftGoodsList} = this.state
    return(
      <View>
        <NavGap title='兑换中心'/>
        <View className='scroll-container'>
          <View className='gift-dec'></View>
          <ScrollView
            className='scroll'
            scrollY
            onScrollToLower={this.nextPage}
          >
            {
             giftGoodsList.map((item,index)=> {
               return(
                 <View className='gift-goods-item'>
                   <View className='gift-goods-item-img'><Image src={item.pics[0]}/></View>
                   <View className='gift-goods-item-info'>
                     <View className='gift-goods-item-info-name'>{item.item_name}</View>
                     <View className='feature'>
                       <View className='price'><Text>￥</Text><Text className='price-inner'>{(Number(item.price)/100).toFixed(2)}</Text></View>
                       <View onClick={this.handleClickItem.bind(this,item.item_id)} className='exchange'>立即兑换 ></View>
                     </View>
                   </View>
                 </View>
               )
             })
            }
            {
              this.state.page.isLoading&&
                <Loading>正在加载...</Loading>
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}
