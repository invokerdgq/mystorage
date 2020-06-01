import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './gift-list.scss'
export default class GiftListItem extends Component{
  static defaultprops = {
    info:null,
    index:0,
    onclick:() =>{
}
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const {index ,info,onclick} =this.props
    return(
      <View className='gift'>
        <View className='gift-title'>礼包{index+1}</View>
        <View className='gift-code'>电子码 ：{info.code}</View>
        {
          info.use_date&&
          <View className='use-limit'>使用日期 ：{info.use_date}</View>
        }
        <View className={`gift-status ${info.is_use === 1?'used':'unused'}`} onClick={this.props.onclick.bind(this,index)}>{info.is_use === 1?'已使用':'去使用'}</View>
      </View>
    )
  }
}
