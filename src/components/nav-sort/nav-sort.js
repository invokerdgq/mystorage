import Taro, { Component } from '@tarojs/taro'
import {View, Text, Icon} from '@tarojs/components'

import './nav-sort.scss'
export default class NavSort extends Component{
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    sortList:[],
    showNumber:true,
    num:{zs:0,zz:null,wz:null},
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
            let count;
            switch (index) {
              case 0:
                count = this.props.num.zs
                break
              case 1:
                count = this.props.num.zz
                break
              case 2:
                count = this.props.num.wz
                break
            }
            return(
              <View className='nav-sort-item'>
                {this.props.showNumber&&
                <View className='count'>{count === '查看'?count:count+'人'}</View>
                }
                <Text onClick={this.sortChange.bind(this,index)} className={`nav-sort-item-title ${curIndex === index?'nav-sort-item-title-checked':''}`}>{item}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
