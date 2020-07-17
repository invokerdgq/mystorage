import Taro, { Component } from '@tarojs/taro'
import {View,Text} from "@tarojs/components";

import './own-opacity.scss'
export default class OwnOpacity extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    containerClass:'',
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {containerClass} = this.props
    return (
       <View className={`more `}>
         <View className='true-content'>
           {this.props.renderTrue}
         </View>
        <View className={containerClass}>
          <View className='own-hidden'>
            {this.props.renderHide}
          </View>
        </View>
      </View>
    )
  }
}
