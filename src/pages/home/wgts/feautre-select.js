import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Button, Icon} from '@tarojs/components'
import './feautre-select.scss'

class FeautreSelect extends Component{
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props);
    this.state = {
      selectList:[
        {
         iconClass:'icon-zhengpin',
          title:'正品好物'
        },
        {
          iconClass:'icon-lightning',
          title:'特价秒杀'
        },
        {
          iconClass:'icon-kefu',
          title:'售后无忧'
        }
        ]
    }
  }
  componentDidMount() {
  }
  render() {
    const {selectList} = this.state
    return(
      <View className="feautre-select-container">
        {
          selectList.map((item,index) => {
            return (
              <View key={index} className="container-content">
                <Icon className={`iconfont uu ${item.iconClass}`}/>
                <Text>{item.title}</Text>
              </View>
            )
          })
        }
          <View className="gap-line1 gap-line"/>
          <View className="gap-line2 gap-line"/>
      </View>
    );
  }
}
