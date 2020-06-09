import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";

import './present.scss'
import {connect} from "@tarojs/redux";

@connect(() => ({}),(dispatch) => ({
   onChooseId:(index)=>{
     dispatch({type:'giftId/choose',payload:index});
     setTimeout(() => {
       Taro.navigateBack()
     },700)
   }
}))
export default class Present extends Component{
  constructor(props) {
    super(props);
    this.state = {
      giftList:[
        {id:8195,url:'https://sxt-b-cdn.oioos.com/tupian/mm1.jpg'},
        {id:8196,url:'https://sxt-b-cdn.oioos.com/tupian/th1.jpg'},
        {id:8197,url:'https://sxt-b-cdn.oioos.com/tupian/mj1.jpg'},
        {id:8198,url:'https://sxt-b-cdn.oioos.com/tupian/wz1.jpg'}
        ],
      index:0
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const { giftList } = this.state
    return (
      <View className='gift-content-container'>
        {/*<NavGap title='礼包选择'/>*/}
        <View className='gift-content'>
          {
            giftList.map((item,index1) => {
              return (
                <View className={`gift-item-${index1}`} onClick={()=> {this.setState({index:index1})}}>
                     <View className='gift-item'>
                       <View className={`${index1 === this.state.index?'checked':'unchecked'}`}/>
                       <Image src={item.url} mode='widthFix'/>
                     </View>
                </View>
              )
            })
          }
          <View className='confirm' onClick={this.props.onChooseId.bind(this,this.state.giftList[this.state.index].id)}>确认选择</View>
        </View>
      </View>
    )
  }
}
