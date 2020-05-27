import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon} from '@tarojs/components'
import './nav-gap.scss'


export default class NavGap extends Component{
  static options = {
    addGlobalClass: true
  }
  constructor(props){
    super(props)
    this.props = props
    this.state= {
      showIcon:false,
      navBar : 0
    }
  }
  componentDidMount() {
    const pageList = Taro.getCurrentPages()
    let data = null;
    try{
       data  = Taro.getSystemInfoSync()
       this.setState({
         navBar:data.statusBarHeight
       })
    }catch (e) {
      console.log(e)
    }
      this.setState({
        showIcon: !/(index|category\/index|recommend\/list|cart\/espier-index|member\/index)(.)*/.test(pageList[pageList.length -1].route)
      })

  }

  handleIconClick = () => {
    Taro.navigateBack()
  }
  render(){
    const {title } = this.props
    const { showIcon } = this.state
      return (
        <View className="nav-gap-container">
          <View className='invisibilty' style={{height:`${this.navBar}px`}}/>
          {
            showIcon &&
            <View className="nav-gap-icon">
              <Icon className='iconfont icon-arrow-left' onClick={this.handleIconClick.bind(this)}></Icon>
            </View>
          }
          <View className="nav-gap-title">
            <Text>{title}</Text>
          </View>
        </View>
      )
  }
}
