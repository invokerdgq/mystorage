import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text, Image, Navigator, Button, Icon,Swiper,SwiperItem} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";
import GiftListItem from "./comps/gift-list";

import './vip.scss'
export default class Vip extends Component{
  constructor(props) {
    super(props);
    this.state = {
      titleList : ['钻石会员','至尊会员','王者身份'],
      curIndex:0,
      grade_name:'',
      giftList:[
        {status:false,code:34253634,date:'2020-11-11'},
        {status:true,code:34253634,date:'2020-11-11'},
        {status:false,code:34253634,date:'2020-11-11'},
        {status:true,code:34253634,date:'2020-11-11'}
      ]
    }
    this.similarList = [
      '身份特权',
      '积分特权',
      '升级礼包',
      '生日礼包',
      '售后保障',
      '闪电退货'
    ]
  }
  componentDidMount() {
    //  若是王者身份 请求礼包列表
    this.setState({
      grade_name:this.$router.params.grade_name
    })
  }
  handleClickBuy =(grade_name) =>{
    if(grade_name === this.state.grade_name){
      Taro.showToast({
        title:'您已激活！',
        duration:2000
      })
    }else{
      Taro.navigateTo({
        url:`/pages/vip/vipgrades?grade_name=${grade_name}`,
      })
    }
  }
  handleClickTransform = () => {
   console.log('兑换中')
  }
  handleClickLook = ()=> {
    Taro.navigateTo({
      url:'/pages/index'
    })
  }
  handleChange = (e) => {
   const detail = e.detail
    this.setState({
      curIndex:detail.current
    })
  }
  render() {
    const { titleList,curIndex ,grade_name, giftList} = this.state
    return(
      <View>
         <NavGap title='权益中心'/>
         <View className='vip-header'>
           <View className='vip'>
             <View className='vip-sort-container'>
               <View className='vip-sort-title'>- {titleList[curIndex]} -</View>
               <View className='vip-sort-look'>规则查看 ></View>
             </View>
             <View className='vip-feature'>
               <View>
                 <Swiper
                   className='vip-card-swiper'
                   current={curIndex}
                   indicatorDots = {true}
                   nextMargin={130+'rpx'}
                   previousMargin={130+'rpx'}
                   onChange={this.handleChange}
                 >
                   <SwiperItem className='swiper-item'>
                     <Image className='item-img'/>
                   </SwiperItem>
                   <SwiperItem className='swiper-item'>
                     <Image className='item-img'/>
                   </SwiperItem>
                   <SwiperItem className='swiper-item'>
                     <Image className='item-img'/>
                   </SwiperItem>
                 </Swiper>
               </View>
             </View>
           </View>

           <View className='vip-similar'>
             {
               this.similarList.map((item,index) => {
                 return(
                   <View className='similar-item'>
                     <View className=''/>
                     <View>{item}</View>
                   </View>
                 )
               })
             }
           </View>

           <View className='vip-own'>
             {
               curIndex === 0&&
                 <View className='vip-0-container'>
                   <View className='vip-0'>
                     <View className='vip-0-title'>- 任意消费 <Text className='dot'>.</Text> 激活会员 -</View>
                     <View className='vip-0-button' onClick={this.handleClickLook}>去购买 ></View>
                   </View>
                 </View>
             }
             {
               curIndex === 1&&
               <View className='vip-1'>
                  <View className='vip-1-title'>- 购买礼包 <Text className='dot'>.</Text> 激活会员 -</View>
                  <View className='vip-1-content'>
                    <View className='vip-1-content-title'>礼包包含 :</View>
                    <View className='vip-1-content-subtitle'><Text className='icon'>i</Text>激活会员后可用于苏心购使用</View>
                    <View>
                      <ScrollView
                      scrollX
                      >

                      </ScrollView>
                    </View>
                  </View>
                 <View className='vip-1-button'>
                   <View className='vip-1-button-dec'><Text className='vip-1-button-dec-1'>至尊会员</Text><Text className='vip-1-button-dec-2'>低至￥<Text className='vip-1-button-dec-3'>0.8</Text>元/每天</Text></View>
                   <View className='vip-1-button-click' onClick={this.handleClickBuy.bind(this,'至尊会员')}>{grade_name === '至尊会员'?'已激活':'激活/兑换'}</View>
                 </View>
               </View>
             }
             {
               curIndex === 2&&
               <View className='vip-2'>
                 <View className='vip-2-title'>- 购买礼包 <Text className='dot'>.</Text> 激活身份 -</View>
                 <View className='vip-2-content'>
                   <View className='vip-2-content-title'>礼包包含 :</View>
                   <View className='vip-2-content-subtitle'><Text className='icon'>i</Text>激活会员后可用于苏心购使用</View>
                   <View>
                     <ScrollView
                       scrollX
                     >

                     </ScrollView>
                   </View>
                 </View>
                 {
                   grade_name === '王者身份'&&
                   <View>
                     <View className='vip-2-title'>- 礼包码 -</View>
                     <View>
                       {
                         giftList.map((item,index) => {
                           return(
                             <View className={`gift-list gift-list-${index}`}>
                                <GiftListItem
                                  info={item}
                                  index={index}
                                />
                             </View>
                           )
                         })
                       }
                     </View>
                   </View>
                 }
                 <View className='vip-2-button'>
                   <View className='vip-2-button-dec'><Text className='vip-1-button-dec-1'>王者身份</Text><Text className='vip-2-button-dec-2'>待定展示数据</Text></View>
                   <View className='vip-2-button-click' onClick={this.handleClickBuy.bind(this,'王者身份')}>{grade_name === '王者身份'?'已激活':'激活身份'}</View>
                 </View>
               </View>
             }
           </View>
         </View>
      </View>
    )
  }
}
