import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image,ScrollView,Radio} from '@tarojs/components'
import NavGap from "../../components";

import './live-store.scss'
export default class LiveStore extends Component{
  constructor(props) {
    super(props);
    this.state = {
      goodsList:[],
      moveIndex:[],
      statusList:[]
    }
  }
  componentDidShow() {
    const list = Taro.getStorageSync('chooseList')
    if(list){
      let statusList = list.reduce((pre,item,index) => {
        pre.push(false)
        return pre
      },[])
      this.setState({
        goodsList:list,
        statusList
      })
    }
  }

  handleMove(){
    if(this.state.moveIndex.length === 0) return
    let newList = this.state.goodsList.filter((item,index) =>{
      return this.state.moveIndex.indexOf(index) === -1
    })
    let newStatus = this.state.statusList.filter((item,index) => {
      return this.state.moveIndex.indexOf(index) === -1
    })
    this.setState({
      goodsList:newList,
      moveIndex:[],
      statusList:newStatus
    })
    Taro.setStorageSync('chooseList',newList)
  }
 signMove(index){
    if(!this.state.statusList[index]){
      this.state.moveIndex.push(index)
    }else{
      this.state.moveIndex =this.state.moveIndex.filter(item => {
        return item !== index
      })
    }
   this.state.statusList[index] = !this.state.statusList[index]
   this.setState({
     statusList: [...this.state.statusList],
     moveIndex: [...this.state.moveIndex]
   },() => {
     console.log(this.state)
   })
 }
  handleAdd(){
    Taro.navigateTo({
      url:'/pages/item/list?is_live=true'
    })
  }
  render() {
    const {goodsList,moveIndex,statusList} = this.state
    return(
      <View className='live-store'>
        <NavGap title='小店管理'/>
        <View className='live-store-content'>
          <View className='header'>
            <View className='header-left'>
              <View className='top'> 移除选中商品</View>
              <View className='dec'>
                {
                  moveIndex.length ===0 ?
                    <Text className='no-move'>全部商品 : {goodsList.length}</Text>:
                    <Text className='has-move'>已选中<Text className='num'>{moveIndex.length}</Text>件商品</Text>
                }
              </View>
            </View>
            <View className={`header-right`} onClick={this.handleMove.bind(this)}><Text style={{color:`${moveIndex.length !=0?'#c0534e':''}`}}>移除</Text></View>
          </View>
          <View className='main'>
            <ScrollView
            className='live-goods-scroll'
            >
              {goodsList !== 0&&
                <View className='item-list'>
                  {
                    goodsList.map((item,index) => {
                      return(
                        <View className='live-item'>
                          <View className='radio-contain' onClick={this.signMove.bind(this,index)}><Radio checked={statusList[index]} color='#c0534e' className='radio'/></View>
                          <View className='goods-img'><Image className='img' src={item.img}/></View>
                          <View className='live-goods-dec'>
                            <View className='dec'>
                              <View className='main-dec'><View className='store-tag'>小店</View><Text className='goods-name'>{item.title}</Text></View>
                              {/*<View className='minor'>xxx人看过</View>*/}
                            </View>
                            <View className='price'>￥<Text className='inner'>{item.price}</Text></View>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              }
                <View className='goods-none'>
                   没有更多了哦~
                </View>
            </ScrollView>
          </View>
          <View className='footer' onClick={this.handleAdd.bind(this)}>
            <View className='iconfont icon-add-sy'/><View>添加商品</View>
          </View>
        </View>
      </View>
    )
  }
}
