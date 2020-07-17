import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";
import {cdn} from '@/consts/index'

import './goods-item.scss'
export default class OwnGoodsItem extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      item_pic:'',
      item_title:''
    },
    onclick:()=>{},
    type:'show',
    disabled:false,
    price:''
  }
  constructor(props) {
    super(props);
  }
  handleClick(){
    if(this.props.disabled){
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
    const {item_pic,item_title} = this.props.info
    const {type,disabled,price} = this.props
    return(
      <View className='activity-item'>
        <Image className='goods-name' src={`${cdn}/goods-bg.png`} mode='widthFix'/>
        <Text className='goods-name-text'>{item_title}</Text>
        <View className='goods-img'><Image src={item_pic} mode='widthFix' className='img'/></View>
        {type === 'buy' && disabled &&
          <View className='empty'>
            <View className='opacity-bg'/>
            <Image src={`${cdn}/test.png`} mode='widthFix' className='img'/>
          </View>
        }
        {type === 'buy'&&
          <View className='help-btn' onClick={this.state.handleClick.bind(this)} >
            <Image src={`${!disabled?cdn+'/blank-btn.png':cdn+'/disable-blank-btn.png'}`} mode='widthFix' className='img'/>
            <Text className='price'>{price}元抢购</Text>
          </View>
        }
      </View>
    )
  }
}
