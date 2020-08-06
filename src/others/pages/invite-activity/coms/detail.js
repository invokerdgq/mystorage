import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";
import {cdn} from '@/consts/index'
import './detail.scss'

export default class Detail extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    direction:'left'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {direction} = this.props
    return(
      <View className={`price-detail ani-${direction}`}>
        {
          this.props.children
        }
        <View className='triangle'/>
      </View>
    )
  }
}
