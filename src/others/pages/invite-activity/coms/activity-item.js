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
      level:0,
      status:false,
      poster:'',
      userList:[],
      inviteNumber:0,
      step:[{number:1}],
      last_seconds:''
    },
    initList: {step:'',user_assist_info:{assist_status:1}},
    onclickBtn(){},
    height:23
  }
   constructor(props) {
     super(props);
     this.state = {
       timeEnd:false,
       showMore:false,
       showShare:false
     }
     // this.state.timer = calcTimer(this.props.activityInfo.last_seconds,'s')
   }
   componentDidMount() {
     console.log('item---------------------mount')
     console.log(JSON.stringify(this.props))
   }
   componentDidShow() {
     console.log('item---------------------show')
     console.log(JSON.stringify(this.props))
   }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.activityInfo.last_seconds !=0){
      this.setState({
        timeEnd:false
      })
    }
  }

  handleMore(){
    this.setState({
      showMore:!this.state.showMore
    })
   }
  timeEnd(){
    this.setState({
      timeEnd:true
    })
  }
  clickBtn(type){
    if(this.props.initList.user_assist_info.assist_status && this.props.initList.user_assist_info.assist_status !=1){
      let status = this.props.initList.user_assist_info.assist_status
      Taro.showToast({
        title:status == 2?'活动已结束':'你已兑换',
        icon:'none',
        duration:1500
      })
      return
    }
    if((this.props.activityInfo.last_seconds ==0 ||this.state.timeEnd)&&this.props.activityInfo.status){
      Taro.showToast({
        title:'很抱歉，超过时间期限',
        icon:'none',
        duration:1500
      })
    }else{
      this.props.onclickBtn(type)
    }
  }
   render() {
   const {showMore} = this.state
     const {userList,inviteNumber,step,poster,status,level} = this.props.activityInfo
     const {initList} = this.props
     let newList = []
     if(status){
       if(userList.length>0){
         if(showMore){
           newList = [...userList]
         }else{
           newList =  [...userList].slice(0,4)
         }
       }
     }
     return(
       <View className='item'>
         <View className='item-header'><Image src={`${cdn}/progressing.jpg`} mode='widthFix' className='img'/></View>
         <View className='item-content'>
           <View className='item-content-left'><Image src={poster} className='img'/></View>
           <View className='item-content-right' style={{justifyContent:initList.user_assist_info.assist_status == 1?'space-between':'space-around'}}>
             <View className='item-content-right-dec'>
               {
                 !status ?
                   <Text>分享给好友，一元助力</Text>:
                   initList.user_assist_info.assist_status == 2?
                     <Text>活动已结束</Text>
                     :initList.user_assist_info.assist_status == 3?
                     <Text>已完成兑换</Text>:
                     initList.step_conf.length == level?
                   <Text> 已完成助力,可最低一元购买</Text>:
                   <Text> 已有{inviteNumber}人助力，仅差{step[step.length-1].number-inviteNumber}人</Text>
               }
             </View>
             <View className='progress-container'>
               <OwnProgress
                 zeroShow={status}
                 height={this.props.height}
                 step={initList.step_conf}
                 inviteNumber={status?Number(initList.user_assist_info.assist_amount):0}
                 lastSeconds={status?initList.user_assist_info.last_seconds:0}
               />
             </View>
             {status && initList.user_assist_info.assist_status==1&&
               <View className='count-down-container'>
                 <AtCountdown
                   isCard
                   format={{ hours: ':', minutes: ':', seconds: '' }}
                   hours={!status?0:calcTimer(this.props.activityInfo.last_seconds,'s').hh +calcTimer(this.props.activityInfo.last_seconds,'s').dd*24 }
                   minutes={!status?0:calcTimer(this.props.activityInfo.last_seconds,'s').mm}
                   seconds={!status?0:calcTimer(this.props.activityInfo.last_seconds,'s').ss}
                   onTimeUp={this.timeEnd.bind(this)}
                 /><Text className='end'>{this.state.timeEnd?'已结束':'后结束'}</Text>
               </View>
             }
               <View className='item-content-right-btn'>
                 {
                   !status ?
                     <View className='invite-begin' onClick={this.clickBtn.bind(this,'share')}>
                       <Image src={`${cdn}/begin.png`} className='invite-begin-img' mode='widthFix'/>
                     </View>:
                     initList.user_assist_info.assist_status==1?
                       inviteNumber < Number(step[step.length -1].number)?
                         <View className='feature-btn'>
                           <View className='feature-btn-left' onClick={this.clickBtn.bind(this,'share')}><Image src={`${cdn}/presist.jpg`} mode='widthFix' className='img'/></View>
                           <View onClick={this.clickBtn.bind(this,'buy')}><Image src={`${cdn}/select.png`} mode='widthFix' className='img'/></View>
                         </View>:
                         <View className='fast-buy' onClick={this.clickBtn.bind(this,'buy')}>
                           <Image src={`${cdn}/fast-buy.jpg`} className='img'/>
                         </View>:
                       <View></View>
                 }
               </View>
           </View>
         </View>
         {inviteNumber !=0&& status &&
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
                 <View onClick={this.handleMore.bind(this)} className='see-more'><Text>{!showMore?'查看全部':'收起'}</Text><View className={`iconfont icon-more ${showMore?'rotate':''}`}/></View>
               }
             </View>
           </View>
         }
       </View>
     )
   }
}
