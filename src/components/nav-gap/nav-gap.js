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
    const {title,home } = this.props
    const { showIcon } = this.state
    const top = Taro.getStorageSync('top')
      return (
        <View className="nav-gap-container" style={{background:this.props.bg?this.props.bg:''}}>
          {/*<NavBar*/}
          {/*title={title}*/}
          {/*back = {showIcon}*/}
          {/*home={home}*/}
          {/*background='#fff'*/}
          {/*>*/}
          {/*</NavBar>*/}
          <View className='iconfont icon-arrow-left' onClick={this.handleIconClick} style={{top:top+'px'}}/>
          <View style={{top:top+'px'}} className='gap-title'>{title}</View>
        </View>
      )
  }
}
