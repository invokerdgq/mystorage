import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Button, Icon} from '@tarojs/components'
import {  FilterBar } from '@/components'
import './hot-area.scss'

export default class HotArea extends  Component{
  constructor(props){
    super(props)
    this.state = {
      filterList: [
        { title: '综合' },
        { title: '销量' },
        { title: '新品' },
        { title: '价格', sort: -1 }
      ],
      curFilterIdx: 0,
      hotGoodsList:[]

    }
  }
  static options = {
    addGlobalClass: true
  }
  componentDidMount(){
      // 获取热卖专区 数据 数据一页条数？？？ 是否下拉继续加载？？
  }
  handleFilterChange = (option) => {
  console.log(option)
    // 根据index 找到查询参数 调用fetch
}
async fetch () {
    // 请求数据 设置state
}
  render(){
    const {filterList , curFilterIdx,hotGoodsList} = this.state
   return(
     <View>
       <View className='wgt__header'>
         <View className='wgt__title'>
           <Text>热卖专区</Text>
           <View className='wgt__subtitle'>hot sale area</View>
         </View>
       </View>
       <FilterBar
         className='goods-list__tabs'
         custom
         current={curFilterIdx}
         list={filterList}
         onChange={this.handleFilterChange}
       />
        <View>
           {
             hotGoodsList&&hotGoodsList.map((item,index) => {
               return(
                 <View>
                   <View>
                     <Image src={item.url}></Image>
                   </View>
                   <View>
                     <View className="hot-title">{item.title}</View>
                     <View className="hot-guige">{item.guige}</View>
                     <View className="hot-price-desc">￥<Text className="hot-price-inner">{item.price}</Text></View>
                     <View className="hot-more">立即购买></View>
                   </View>
                 </View>
               )
             })
           }
        </View>
     </View>
   )
  }
}
