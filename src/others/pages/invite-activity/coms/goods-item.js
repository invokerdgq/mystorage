import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";
import {cdn} from '@/consts/index'

import './goods-item.scss'
export default class GoodsItem extends Component{
  static options = {
    addGlobalClass:true
  }
  defaultProps = {
    info:{},
    onclick:()=>{}
  }
  constructor(props) {
    super(props);
  }
  handleClick(){
    if(this.props.info.status != 1){
      Taro.showToast({
        title:'已售完',
        icon:'none',
        duration:1500
      })
    }else{
      this.props.onclick()
    }
  }
  render() {
    const {imgUrl,goods_name,status} = this.props.info
    return(
      <View className='activity-item'>
        <Image className='goods-name' src={`${cdn}/goods-bg.png`} mode='widthFix'/>
        <Text className='goods-name-text'>{goods_name}</Text>
        <View className='goods-img'><Image src={imgUrl} mode='widthFix'/></View>
        <View className='help-btn'><Image src={`${status == 1?cdn+'/help-btn.png':cdn+'/help-btn-disable.png'}`} mode='widthFix' onClick={this.state.handleClick.bind(this)}/></View>
      </View>
    )
  }
}
