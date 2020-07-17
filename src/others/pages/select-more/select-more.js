import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import OwnGoodsItem from "../invite-activity/coms/goods-item";
import OwnTitle from "../../../components/own-title/own-title";
import api from '@/api'

import './select-more.scss'
import {connect} from "@tarojs/redux";
import {formateSelect} from "../../../utils/formate";
@connect(({step}) => ({
  step:step.currentStep
}))
export default class SelectMoreGood extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showList:[],
      goodsList:[]
    }
    this.top = Taro.getStorageSync('top')
  }
  componentDidMount() {
    const {level = 2} = this.$router.params
    this.setState({
      currentLevel:level
    })
    let list  = []
   this.props.step.map(item => {
     list.push(false)
    })
   this.setState({
     showList:list
   })
    this.fetch()
  }

  async fetch () {
    const {list} = await api.assist.getGoodsList({
      assist_id:this.$router.params.id
    })
    this.setState({
      goodsList:formateSelect(list)
    })
  }
  back(){
    Taro.navigateBack()
  }
  buy(item){
    Taro.navigateTo({
      url:`/pages/item/espier-detail?id=${item.item_id}&level=${this.state.currentLevel}&assist_id=${item.assist_id}`
    })
  }
  showMore(index){
    let list = [...this.state.showList]
    list[index] = !list[index]
    this.setState({
      showList:list
    })
  }
  render() {
    const {currentLevel,goodsList,showList} = this.state
    let title,curIndex
    this.props.step.map((item,index) => {
      if(item.level == currentLevel){
        title = item.price
        curIndex = index
      }
    })
    let newgoodsList = [...goodsList].slice(0,curIndex).reverse()
    let newList = [...this.props.step].slice(0,curIndex).reverse()
    return(
      <View className='select'>
        <View className='iconfont icon-arrow-left' style={{top:this.top+'px'}} onClick={this.back}/>
        <View className='select-header'><Image mode='widthFix' src={`${cdn}/select-header.png`} className='img'/></View>
        <View className='select-content'>
          <ScrollView
          scrollY
          enableFlex={true}
          className='select-scroll'
          >
            <View className='select-scroll-list'>
              {
                newgoodsList.map((item,index) => {
                  let newItemList = []
                  if(item.list.length >4 && !showList[index]){
                     newItemList = [...item.list].slice(0,4)
                  }else{
                    newItemList = item.list
                  }
                  return(
                    <View className='level-item'>
                      <OwnTitle title={`${newList[index].price}元购`}/>
                      <View className='level-item-list'>
                        {
                          newItemList.map((item1,index1) => {
                            return (
                              <OwnGoodsItem
                                info={item1}
                                disabled={item1.assist_store == 0}
                                type='buy'
                                onclick={this.buy.bind(this,item1)}
                                price={newList[index].price}
                              />
                            )
                          })
                        }
                      </View>
                      {newItemList.length >4&&
                      <View className='show-more' onClick={this.showMore.bind(this,index)}>{showList[index]?'收起':'查看更多'}<View className={`iconfont icon-more ${!showList[index]?'':'rotate'}`}/></View>
                      }
                    </View>
                  )
                })
                }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
