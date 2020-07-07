import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";
import {cdn} from '@/consts/index'
import UserItem from "./user-item";
import {AtCountdown} from "taro-ui";
import OwnProgress from "../../../../components/progress/progress";
import './activity-item.scss'

export default class ActivityItem extends Component{
  static config = {
    addGlobalClass:true
  }
  static defaultProps = {
    activityInfo:{
      userList:[],
      current:10,
      step:[2,5,10,18,28]
    },
    height:23
  }
   constructor(props) {
     super(props);
     this.state = {
       showMore:false
     }
   }
   componentDidMount() {
   }
   handleMore(){
    this.setState({
      showMore:!this.state.showMore
    })
   }
   render() {
   const {showMore} = this.state
     const {userList,current,step} = this.props.activityInfo
     let newList = []
     if(showMore){
       newList = [...userList]
     }else{
       newList = newList = [...userList].slice(0,4)
     }
     return(
       <View className='item'>
         <View className='item-header'><Image src={`${cdn}/progressing.jpg`} mode='widthFix'/></View>
         <View className='item-content'>
           <View className='item-content-left'><Image/></View>
           <View className='item-content-right'>
             <View className='item-content-right-dec'>已被助力{}元，仅差{}</View>
             <View className='progress-container'>
               <OwnProgress height={this.props.height}/>
             </View>
             <View className='count-down-container'>
               <AtCountdown
                 isCard
                 format={{ hours: ':', minutes: ':', seconds: '' }}
               /><Text className='end'>后结束</Text>
             </View>
             <View className='item-content-right-btn'>
               {
                 current >= step[step.length -1]?
                   <View className='fast-buy'>
                      <Image src={`${cdn}/fast-buy.jpg`}/>
                   </View>:
                   <View className='feature-btn'>
                     <View className='feature-btn-left'><Image src={`${cdn}/presist.jpg`} mode='widthFix'/></View>
                     <View><Image src={`${cdn}/blank-btn.jpg`} mode='widthFix'/></View>
                   </View>
               }
             </View>
           </View>
         </View>
         <View className='item-user'>
           <View className='item-user-dec'>助力记录</View>
           <View className='user-list'>
             {
               newList.map((item,index) => {
                 return (
                   <UserItem
                   info={item}
                   />
                 )
               })
             }
             {
               userList.length>4&&
                 <View onClick={this.handleMore.bind(this)}>查看全部<View className={`iconfont ${showMore?'icon-arrow-up':'icon-arrow-down'}`}></View></View>
             }
           </View>
         </View>
       </View>
     )
   }
}
