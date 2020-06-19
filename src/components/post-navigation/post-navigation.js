import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Navigator } from '@tarojs/components'

import './post-navigation.scss'
export default class PostNavigation extends Component{
  static defaultprops = {
  }
  constructor(props) {
    super(props);
    this.state={
      show:true
    }
  }
  componentDidMount() {
  }

  render() {
    const {imgUrl,roomId} = this.props.info.data[0]
    const {show} = this.state
    return(
      <View className='navigation-container' style={`display:${show?'block':'none'}`}>
        <View className='post-navigation-bg'></View>
        <View className='post-navigation-ct'>
          <Navigator className='post-navigation-img' url={`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${Number(roomId)}`} ><Image src={imgUrl} mode='widthFix' style='width:550rpx'/></Navigator>
          <View className='close-container' onClick={() => {this.setState({show:false})}}><Text className='post-navigation-close'>X</Text></View>
        </View>
      </View>
    )
  }
}
