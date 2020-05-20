import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon,Radio} from '@tarojs/components'
import InputNumber from '@/components/input-number'

import './own-list-item.scss'
export default class OwnListItem extends Component{
  static defaultprops = {
    info:{},
    onNumChange:  () =>  {},
    height:347,
    type:'cart' // hot-area
  }
        constructor(props) {
          super(props);
          this.state = {
             height:props.height
          }
        }
 componentDidMount() {

        }
 render() {
          const {info= {},type} = this.props;
      return(
        <View className='list-item-container' style={{height:this.state.height+'px'}}>
          {type === 'cart'&&
            <View className='control-toolbar'>
            <Radio></Radio>
            </View>
          }
          <View className='list-left' style={{height:this.state.height+'px',width:this.state.height+'px'}}>
             <Image src={info.url} className='list-left-img'/>
          </View>
          <View className='list-right'>
            <View>
              <View className='list-right-title'>{info.title}</View>
              <View className='list-right-desc'>{info.guige}</View>
            </View>
            <View>
              <View className='list-right-cur'>￥
                <Text className='list-right-price'>
                {info.price}
                </Text>
                {
                  info.selledNmuber&&
                  <View className='list-right-number'>{info.selledNumber}</View>
                }
                {
                  !info.selledNmuber&&
                  <View className='num-calculate'>
                    <InputNumber
                      min={1}
                      max={info.store}
                      value={info.num}
                      onChange={this.props.onNumChange}
                    />
                  </View>
                }
                {
                  info.selledNmuber&&
                  <View>
                    <View>
                      <Text className='list-right-buy'>立即抢购></Text>
                    </View>
                  </View>
                }
            </View>
          </View>
          </View>
        </View>
      )}
        }

