import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon} from '@tarojs/components'
import './nav-gap.scss'


export default class NavGap extends Component{
  constructor(props){
    super(props)
    this.props = props
  }
  render(){
    const {title ,handleIconClick} = this.props
      return (
        <View className="nav-gap-container">
          <View className="nav-gap-icon" onClick={handleIconClick.bind(this)}>
            <Icon></Icon>
          </View>
          <View className="nav-gap-title">
            <Text>{title}</Text>
          </View>
        </View>
      )
  }
}
