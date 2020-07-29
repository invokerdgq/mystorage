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
  static externalClasses = ['true-class','contain-class']
  constructor(props) {
    super(props);
  }
  render() {
    const {containerClass,containerStyle} = this.props
    return (
       <View className='more'>
        <View className={'contain-class'} style={containerStyle}>
          <View className='own-hidden'>
            {this.props.renderHide}
          </View>
        </View>
         <View className='true-content true-class'>
           {this.props.renderTrue}
         </View>
      </View>
    )
  }
}
