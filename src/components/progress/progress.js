import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon,Image} from '@tarojs/components'
import {cdn} from '../../consts/index'

import './progress.scss'
export default class OwnProgress extends Component{
  static config = {
    addGlobalClass:true
  }
  static defaultProps = {
      zeroShow:true,
      step:[
        {number:2,price:59.9,level:'level1'},
        {number:5,price:19.9,level:'level2'},
        {number:10,price:9.9,level:'level3'},
        {number:28,price:1,level:'level4'}
      ],
      inviteNumber:20,
      text:'助力',
      height:28
  }
   constructor(props) {
     super(props);
   }
   render() {
    const {step,text,inviteNumber,zeroShow} = this.props
     return(
       <View className='progress-container' style={{borderRadius:this.props.height/2+'rpx'}}>
         <View className='progress-content' style={{borderRadius:this.props.height/2+'rpx',height:this.props.height+'rpx'}}/>
         <View className='progress-content-up' style={{borderRadius:this.props.height/2+'rpx',width:(inviteNumber/step[step.length-1].number)*100+'%',height:this.props.height+'rpx'}}/>
         {
           step.map((item,index) => {
             return (
               <View className='dot-item' style={{left:(item.number/(step[step.length-1]).number)*100 + '%',width:this.props.height-4+'rpx',height:this.props.height-4+'rpx',border:`solid ${(this.props.height-4)/4}rpx white`}}/>
             )
           })
         }
         {(inviteNumber !=0|| zeroShow)&&
           <View className='progress-dec' style={{left:(inviteNumber/step[step.length-1].number*100)+'%'}}>
             <Image src={`${cdn}/dialog.png`} className='progress-dec-img' mode='widthFix'/>
             <Text className='progress-dec-text'>{text}{inviteNumber}人</Text>
           </View>
         }
       </View>
     )
   }
}
