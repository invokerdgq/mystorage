import Taro, { Component } from '@tarojs/taro'
import {View,Text} from "@tarojs/components";

import './own-title.scss'
export default class OwnTitle extends Component{
  static defaultProps = {
    title:'',
    innerClass:''
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {title,innerClass} = this.props
    return(
      <View className={`title`}>
        <Text className='line'/>
        <Text className={innerClass}>{title}</Text>
        <Text className='line'/>
      </View>
    )
  }
}
