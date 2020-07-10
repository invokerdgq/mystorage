import Taro, { Component } from '@tarojs/taro'
import {View,Text} from "@tarojs/components"

import './own-shade.scss'
export default class OwnShade extends Component{
  static defaultProps = {
    onclickClose:() => {},
    show:''
  }
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View className='shade-container' style={{display:this.props.show?'block':'none'}}>
        <View className='shade'/>
        <View className='shade-content'>
          {this.props.children}
          <View className='iconfont icon-close' onClick={this.props.onclickClose}/>
        </View>
      </View>
    )
  }
}
