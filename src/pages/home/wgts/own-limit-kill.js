import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Icon ,ScrollView} from '@tarojs/components'

import './own-limit-kill.scss'

// head 样式将原来的 改掉 统一下
export default class WgtLimitKill extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      Dec:[]
    }
  }
  componentDidMount() {
    //初始化 choiced
    //选中时 元素index+ 1
    console.log('7777')
    console.log(this.props.info)
    this.setState({
      Dec:[this.props.info.list[0].data[0]]
    })
  }
  handleTimerChange = (index) =>{
      this.setState({
        Dec:this.props.info.list[index].data
      })
  }
  render() {
    const {list} = this.props.info
    const {Dec} = this.state
    console.log('-----')
    console.log(Dec)
    return(
      <View>
        <View className='wgt__header'>
          <View>{list[0].base.title}</View>
          <View className='wgt__subtitle'>{list[0].base.subtitle}</View>
        </View>
        <View className='timer-controller'>
          <ScrollView
            className='timer-scroll'
            scrollX
          >
            <View className='timer-scroll-content'>
              <View className='gap'/>
              {
                list.map((item,index) => {
                  return(
                    <View className='timer-content' onClick={this.handleTimerChange.bind(this,index)}>
                      {item.base.title}
                    </View>
                  )
                })
              }
              <View className="gap"/>
            </View>
          </ScrollView>
        </View>
        <View className='triangle-container'>
          <View className='triangle'/>
        </View>
        <View className='goods-desc'>
          {
            Dec.map((item) => {
              return(
                <View className='limit-goods-detail'>
                  <View className='detail-img'>
                     <Image src={item.imgUrl}/>
                    <View>
                      <View>{item.title}</View>
                      <View>暂时需要添加的字段</View>
                      <View>
                        <Text>限时秒杀</Text>
                        <Text>其他卖点（缺少）</Text>
                      </View>
                    </View>
                    <View>
                      <Text>￥{item.act_price}</Text>
                      <Text>￥{item.price}</Text>
                      <Text>售出件数（缺少）</Text>
                      <View>立即购买</View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className='more-toolbar'>
           <Text className='dec'>更多秒杀进行中<Icon className='iconfont icon-arrow-down'/></Text>
        </View>
      </View>
    )
  }
}
