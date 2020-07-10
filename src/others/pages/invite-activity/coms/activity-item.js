import Taro, { Component } from '@tarojs/taro'
import { View,Image } from "@tarojs/components";
import { cdn} from '@/consts/index'
import UserItem from "./user-item";
import { AtCountdown } from "taro-ui";
import OwnProgress from "../../../../components/progress/progress";
import './activity-item.scss'
import {calcTimer} from "../../../../utils";

export default class ActivityItem extends Component{
  static options = {
    addGlobalClass:true
  }

  static defaultProps = {
    activityInfo:{
      userList:[],
      inviteNumber:10,
      step:[2,5,10,18,28],
      lastSeconds:0
    },
    onclickBtn(){},
    height:23
  }
   constructor(props) {
     super(props);
     this.state = {
       showMore:false,
       showShare:false
     }
     this.timer = calcTimer(this.props.activityInfo.lastSeconds,'s')
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
     const {userList,inviteNumber,step} = this.props.activityInfo
     let newList = []
     if(userList.length>0){
       if(showMore){
         newList = [...userList]
       }else{
         newList =  [...userList].slice(0,4)
       }
     }
     return(
       <View className='item'>
         <View className='item-header'><Image src={`${cdn}/progressing.jpg`} mode='widthFix'/></View>
         <View className='item-content'>
           <View className='item-content-left'><Image/></View>
           <View className='item-content-right'>
             <View className='item-content-right-dec'>
               {
                 this.props.inviteNumber == 0?
                   <Text>分享给好友，一元助力</Text>:
                   <Text> 已有{inviteNumber}人助力，仅差{step[step.length-1]-inviteNumber}人</Text>
               }
             </View>
             <View className='progress-container'>
               <OwnProgress height={this.props.height} info={this.props.activityInfo}/>
             </View>
               <View className='count-down-container'>
                 <AtCountdown
                   isCard
                   format={{ hours: ':', minutes: ':', seconds: '' }}
                   hours={inviteNumber === 0?0:this.timer.hh}
                   minutes={inviteNumber === 0?0:this.timer.mm}
                   seconds={inviteNumber === 0?0:this.timer.ss}
                 /><Text className='end'>{inviteNumber ===0?'参与活动开始计时':'后结束'}</Text>
               </View>
             <View className='item-content-right-btn'>
               {
                 inviteNumber >= step[step.length -1]?
                   <View className='fast-buy' onClick={this.props.onclickBtn.bind(this,'buy')}>
                      <Image src={`${cdn}/fast-buy.jpg`}/>
                   </View>:
                   inviteNumber != 0?
                   <View className='feature-btn'>
                     <View className='feature-btn-left' onClick={this.props.onclickBtn.bind(this,'share')}><Image src={`${cdn}/presist.jpg`} mode='widthFix'/></View>
                     <View onClick={this.props.onclickBtn.bind(this,'buy')}><Image src={`${cdn}/blank-btn.jpg`} mode='widthFix'/></View>
                   </View>:
                     <View className='invite-begin' onClick={this.props.onclickBtn.bind(this,'share')}>
                       <Image src={`${cdn}/fast-buy.jpg`} className='invite-begin-img' mode='widthFix'/>
                     </View>
               }
             </View>
           </View>
         </View>
         {inviteNumber !=0&&
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
                 <View onClick={this.handleMore.bind(this)} className='see-more'>{!showMore?'查看全部':'收起'}<View className={`iconfont ${showMore?'icon-more':'icon-shouqi'}`}></View></View>
               }
             </View>
           </View>
         }
       </View>
     )
   }
}
