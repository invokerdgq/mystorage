import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon} from '@tarojs/components'

import './nav-sort.scss'
export default class NavSort extends Component{
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    sortList:[],
    onsortChange:(index) =>{}
  }
  constructor(props) {
    super(props);
    this.state = {
      curIndex:0
    }
  }
  sortChange(index){
    this.setState({
      curIndex:index
    },() => {
      this.props.onsortChange(index)
    })
  }
  render() {
    const {onsortChange,sortList} = this.props
    const {curIndex} = this.state
    return(
      <View className='nav-sort'>
        {
          sortList.map((item,index) => {
            return(
              <View className='nav-sort-item'>
                <Text onClick={this.sortChange.bind(this,index)} className={`nav-sort-item-title ${curIndex === index?'nav-sort-item-title-checked':''}`}>{item}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
