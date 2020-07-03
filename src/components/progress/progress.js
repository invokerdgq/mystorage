import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon,Image} from '@tarojs/components'
import {cdn} from '../../consts/index'

import './progress.scss'
export default class OwnProgress extends Component{
  static config = {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      step:[2,5,10,18,28],
      current:20,
      text:'助力'
    },
    height:28
  }
   constructor(props) {
     super(props);
   }
   render() {
    const {step,text,current} = this.props.info
     return(
       <View className='progress-container' style={{borderRadius:this.props.height/2+'rpx'}}>
         <View className='progress-content' style={{borderRadius:this.props.height/2+'rpx',height:this.props.height+'rpx'}}/>
         <View className='progress-content-up' style={{borderRadius:this.props.height/2+'rpx',width:(current/(step[step.length-1]))*100+'%',height:this.props.height+'rpx'}}/>
         {
           step.map((item,index) => {
             return (
               <View className='dot-item' style={{left:(item/(step[step.length-1]))*100 + '%',width:this.props.height-4+'rpx',height:this.props.height-4+'rpx',border:`solid ${(this.props.height-4)/4}rpx white`}}/>
             )
           })
         }
         <View className='progress-dec' style={{left:(current/step[step.length-1]*100)+'%'}}>
           <Image src={`${cdn}/dialog.jpg`} className='progress-dec-img' mode='widthFix'/>
           <Text className='progress-dec-text'>{text}{current}人</Text>
         </View>
       </View>
     )
   }
}
