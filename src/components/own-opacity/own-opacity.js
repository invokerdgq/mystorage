import Taro, { Component } from '@tarojs/taro'
import {View,Text} from "@tarojs/components";

import './own-opacity.scss'
export default class OwnOpacity extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    containerClass:'',
    containerStyle:null
  }
  constructor(props) {
    super(props);
    this.externalClasses = [this.props.containerClass]
  }
  render() {
    const {containerClass,containerStyle} = this.props
    return (
       <View className='more'>
        <View className={containerStyle?'':containerClass} style={containerStyle}>
          <View className='own-hidden'>
            {this.props.renderHide}
          </View>
        </View>
         <View className='true-content'>
           {this.props.renderTrue}
         </View>
      </View>
    )
  }
}
