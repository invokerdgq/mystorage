import Taro, { Component } from '@tarojs/taro'
import {View,Image} from "@tarojs/components";
import {cdn} from '@/consts/index'
import Detail from "./detail";

import './goods-item.scss'
export default class OwnGoodsItem extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      item_pic:'',
      item_title:'',
      level_price:[]
    },
    index:0,
    currentIndex:'',
    onclick:function(){},
    type:'show',
    disabled:false,
    price:''
  }
  constructor(props) {
    super(props);
    this.state = {
      showDetail:false
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.currentIndex !== this.props.index){
      this.setState({
        showDetail:false
      })
    }
  }

  handleClick(type,e){
    if(type === 'detail'){
      this.setState({
        showDetail:!this.state.showDetail
      })
      this.props.onclick(this.props.info,this.props.index)
      e.stopPropagation()
      return
    }
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
    const {item_pic,item_title,level_price} = this.props.info
    const {type,disabled,price,index,currentIndex} = this.props
    const {showDetail} = this.state
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
          <View className='help-btn' onClick={this.handleClick.bind(this,'buy')} >
            <Image src={`${!disabled?cdn+'/blank-btn.png':cdn+'/disable-blank-btn.png'}`} mode='widthFix' className='img'/>
            <Text className='price'>{price}元抢购</Text>
          </View>
        }
        {
          type === 'detail' &&
            <View>
              <View className='help-btn' onClick={this.handleClick.bind(this,'detail')} >
                <Image src={`${!disabled?cdn+'/blank-btn.png':cdn+'/disable-blank-btn.png'}`} mode='widthFix' className='img'/>
                <Text className='price'>{showDetail?'关闭详情':'查看详情'}</Text>
              </View>
            </View>
        }
        {
          showDetail &&(index == currentIndex)&&
            <Detail
            direction={index%2 ==0?'right':'left'}
            >
              <View className='detail-container'>
                {
                  level_price.length !==0&&
                    level_price.map((item) => {
                      return(
                        <View className='detail-item'>助力满{item.assist_number}人，可<Text className='inner'>￥{item.assist_price}</Text>元购买</View>
                      )
                    })
                }
              </View>
            </Detail>
        }
      </View>
    )
  }
}
