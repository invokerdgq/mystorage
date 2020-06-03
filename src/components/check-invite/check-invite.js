import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './check-invite.scss'
export default class CheckInvite extends Component{
  static defaultProps = {
    show:false,
    onclose:() => {},
    onconfirm: () => {},
    onValueChange:() =>{},
    iconTitle:'邀',
    mainTitle:'请输入邀请码',
    cancelTitle:'暂不输入',
    placeTitle:'邀请码',
    confirmTitle:'提交邀请码'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const {show,iconTitle,mainTitle,cancelTitle,confirmTitle,onclose,onconfirm,placeTitle,onValueChange} = this.props
    return (
      <View>
        <View className='inputCode-container' style={{display:`${show?'block':'none'}`}}/>
         <View className='code-input' style={{display:`${show?'block':'none'}`}}>
           <View className='img-dec'>
             <View className='title'>
             <View className='title-dec'>{iconTitle}</View>
           </View>
        <View className='close' onClick={onclose}>X</View>
        </View>
       <View className='input-title'>{mainTitle}</View>
         <View className='code-input-content'><Input placeholder={placeTitle} type='text' onInput={onValueChange} placeholderStyle='color:#666666;font-size:17rpx;margin-left:20rpx'/></View>
           <View className='code-input-controller'>
            <View className='cancel' onClick={onclose}>{cancelTitle}</View>
            <View className='confirm' onClick={onconfirm}>{confirmTitle}</View>
           </View>
        </View>
      </View>
    )
  }
}
