import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image,ScrollView} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"
import NavGap from "../../../components/nav-gap/nav-gap";
import './live-list.scss'
import {cdn} from "../../../consts";
import SearchBar from "../../../components";
import {withPager} from "../../../hocs";
import RoomItem from "./coms/room-item";
import api from '@/api'
import S from '@/spx'


@withPager
export default class LiveList extends Component{
  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      query:'',
      sort:'RANK',
      roomList:[]
    }
  }
handleValueChange(e){
   this.setState({
     query:e.detail.value
   })
}
componentDidMount() {
    if(!S.getAuthToken()){
      S.toast('请先登录')
      setTimeout(() =>{
        S.login(this)
      }, 2000)
      return
    }
    this.postUserInfo().then(() => {
      this.nextPage()
    })
}
postUserInfo = async ()=>{
    Taro.showLoading({
      title:'导入用户数据中',
      mask:true
    })
  const {vip_grade} = Taro.getStorageSync('userinfo')
  let ERR
  try{
    await api.live.postInfo({grade_id:Number(vip_grade)+1})
  }catch (e) {
    ERR= e
  }
  if(!ERR){
    Taro.hideLoading()
  }
}

fetch = async (params) => {
    const {page_no,page_size} = params
    const option ={
      page:page_no,
      pageSize:page_size,
      query:this.state.query,
      sort:this.state.sort
    }
  const {list,total_count} = await api.live.getRoomList(option)
  let total = total_count
  this.setState({
    roomList:[...this.state.roomList,...list]
  })
  return {total}
}
handleSortChange(type){
    this.resetPage()
    this.setState({
      roomList:[],
      sort:type
  },() => {
      this.nextPage()
    })
}
handleToRoom(item){
    Taro.navigateToMiniProgram({
       appId:'wxde87f955d769c707',
       path:`/others/pages/live/live?appId=${item.im_id}&token=${Taro.getStorageSync('auth_token')}`,
       extraData:{
        ...item,
         token:Taro.getStorageSync('auth_token')
      },
      envVersion:'develop',
      success(){
         console.log('跳转 苏心购')
        console.log({
          ...item,
          token:Taro.getStorageSync('auth_token')
        })
      }
    })
}
  render(){
    const {query,roomList} = this.state
    return(
      <View className='live'>
        <NavGap title='直播间列表'/>
        <View className='live-list'>
          <View className='search-container'>
            <View className='live-search'>
              <View className='iconfont icon-sousuo'/>
              <Input type='text' value={query} onInput={this.handleValueChange.bind(this)} className='live-input' placeholder='请输入昵称/ID'/>
            </View>
            <View className='iconfont icon-camera-aside'/>
          </View>
          <View className='live-tag'>
            <View className='live-tag-item' onClick={this.handleSortChange.bind(this,'RANK')}><Image mode='widthFix' className='img' src={`${cdn}/rank.png`}/><Text className='dec'>排行榜</Text></View>
            <View className='live-tag-item' onClick={this.handleSortChange.bind(this,'CITY')}><Image mode='widthFix' className='img' src={`${cdn}/samecity.png`}/><Text className='dec'>同城</Text></View>
            <View className='live-tag-item' onClick={this.handleSortChange.bind(this,'ATTEND')}><Image mode='widthFix' className='img' src={`${cdn}/attend.png`}/><Text className='dec'>关注</Text></View>
            <View className='live-tag-item'><Image mode='widthFix' className='img' src={`${cdn}/mine.png`}/><Text className='dec'>我的</Text></View>
          </View>
          <View className='room-list'>
            <ScrollView
            className='scroll-room-list'
            scrollY
            enableFlex={true}
            onScrollToLower={this.nextPage}
            >
              <View className='room-list-contain'>

                  {
                    roomList.map((item,index) =>{
                      return(
                        <View className='item-container' onClick={this.handleToRoom.bind(this,item)}>
                        <RoomItem
                          info={item}
                        />
                        </View>
                      )
                    })
                  }
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
