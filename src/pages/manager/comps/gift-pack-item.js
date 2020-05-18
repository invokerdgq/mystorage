import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Picker } from '@tarojs/components'



import './gift-pack-item.scss'
export default class GiftpackItem extends Component{
  static defaultprops = {
    info:{
      inviteCode:1,
      isDispatched:false,
      isUsed:false
    }
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  handleDispatch =  () =>{

  }
  render() {
    const {inviteCode, isUsed, isDispatched} = this.props.info
    return(
      <View className='gift-pack-container'>
        <View>{inviteCode}</View>
        {
          isDispatched?
            <View>
              <Text>已分发</Text>
              <View>
                使用状态:{isUsed?'已使用':'未使用'}
              </View>
            </View>:
            <View onClick={this.handleDispatch.bind(this)}>去分发</View>
        }
      </View>
    )
  }
}
