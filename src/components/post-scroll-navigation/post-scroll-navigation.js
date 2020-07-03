import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Navigator,Swiper,SwiperItem ,Icon} from '@tarojs/components'
import {linkPage} from "../../pages/home/wgts/helper";

import './post-scroll-navigation.scss'
export default class PostScrollNavigation extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps  = {
    info:{
      base:{},
      data:[]
    }
  }
  constructor(props) {
    super(props);
    this.state = {
    show:true
    }
  }
  clickItem =(item) => {
    console.log(item)
    if(item.type === 'liveplay'){
      Taro.navigateTo({
        url:`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${Number(item.roomId)}`
      })
    }else{
      linkPage(item.linkPage,item.id)
    }
}

  render() {
    const {data=[]} = this.props.info
    const {show} = this.state
    return(
      <View className='navigation-container' style={`display:${show?'block':'none'}`}>
        <View className='post-navigation-bg'></View>
        <View className='post-navigation-ct'>
          <Swiper
          autoplay
          animation
          interval={3000}
          style='width:500rpx;height:650rpx'
          >
            {
              data.map((item,index) => {
                return(
                  <SwiperItem onClick={this.clickItem.bind(this,item)} style='text-align:center'>
                    <Image src={item.imgUrl} style='width:500rpx' mode="widthFix"/>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <View className='close-container' onClick={() => {this.setState({show:false})}}><View className='iconfont icon-close'/></View>
        </View>
      </View>
        )
  }
}
