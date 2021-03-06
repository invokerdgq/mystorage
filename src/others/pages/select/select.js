import { View, Text,Image,Button ,Input,ScrollView} from '@tarojs/components'
import {cdn} from '@/consts/index'
import Taro, { Component } from '@tarojs/taro'
import OwnGoodsItem from "../invite-activity/coms/goods-item";
import OwnTitle from "../../../components/own-title/own-title";
import api from '@/api'
import {formateSelect} from "../../../utils/formate";

import './select.scss'
import {connect} from "@tarojs/redux";
@connect(({step}) => ({
  step:step.currentStep||[]
}))
export default class SelectGood  extends Component{

  constructor(props) {
    super(props);
    this.state = {
      currentLevel:'',
      goodsList: []
    }
    this.top = Taro.getStorageSync('top')
  }
  componentDidMount() {
    const {level = 2} = this.$router.params
    this.setState({
      currentLevel:level
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
  selectMore(){
    Taro.navigateTo({
      url:`/others/pages/select-more/select-more?level=${this.state.currentLevel}&id=${this.$router.params.id}`
    })
  }
  render() {
    const {currentLevel,goodsList} = this.state
    let title,newList=[]
    if(this.props.step.length !=0){
      this.props.step.map(item => {
        if(item.level == currentLevel){
          title = item.number
          console.log(title)
        }
      })
    }
    if(goodsList.length != 0){
      goodsList.map(item => {
        if(item.level == currentLevel){
          newList = item.list
        }
      })
    }
    return(
      <View className='select'>
        <View className='iconfont icon-arrow-left' style={{top:this.top+'px'}} onClick={this.back}/>
        <View className='select-header'><Image mode='widthFix' src={`${cdn}/bg-header1.png`} className='img'/></View>
        <View className='select-content'>
          <View className='title-contain'>
            <OwnTitle
              title={`助力满${title}人可挑选`}
            />
          </View>
          <ScrollView
          scrollY
          enableFlex={true}
          className='select-scroll'
          >
            <View className='select-scroll-list'>
              {
                newList.map((item,index) => {
                  return(
                    <OwnGoodsItem
                      info={item}
                      disabled={item.assist_store == 0}
                      type='buy'
                      onclick={this.buy.bind(this,item)}
                      price={Number(item.assist_price)/100}
                    />
                  )
                })
              }
            </View>
            {
              currentLevel >1&&
              <View className='see-more' onClick={this.selectMore.bind(this)}>查看其他优惠 >></View>
            }
          </ScrollView>
          <View className='select-header'><Image mode='widthFix' src={`${cdn}/bg-footer.png`} className='img'/></View>
        </View>
      </View>
    )
  }
}
