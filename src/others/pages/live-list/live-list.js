import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image,ScrollView} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"
import NavGap from "../../../components/nav-gap/nav-gap";
import {cdn} from "../../../consts";
import SearchBar from "../../../components";
import {withPager} from "../../../hocs";
import RoomItem from "./coms/room-item";
import api from '@/api'
import S from '@/spx'
import './live-list.scss'
import OwnRecommendItem from "./coms/recommend-item";

@withPager
export default class LiveList extends Component{
  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      query:'',
      sort:'RANK',
      presort:'',
      roomList:[],
      list:[]
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
    if(type === 'ATTEND'){
      this.state.presort = this.state.sort
    }
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
       path:`/others/pages/live/live`,
       extraData:{
        ...item,
         token:Taro.getStorageSync('auth_token'),
         owner:0
      },
      envVersion:'develop',
      success(){
         console.log('跳转 苏心购')
      }
    })
}
backSort(){
    this.handleSortChange(this.state.presort)
}
handleSearch (){
    this.nextPage()
}
handleToMember(){
    Taro.navigateTo({
      url:'/others/pages/live-list/member'
    })
}
  render(){
    const {query,roomList,sort,list} = this.state
    return(
      <View className='live'>
        <NavGap title='直播间列表'/>
        <View className='live-list'>
          <View className='search-container'>
            {
              sort === 'ATTEND'&&
              <View className='iconfont icon-arrow-left' onClick={this.backSort.bind(this)}/>
            }
            <View className='live-search'>
              <View className='iconfont icon-sousuo'/>
              <Input type='text' value={query} onInput={this.handleValueChange.bind(this)} className='live-input' placeholder='请输入昵称/ID' onConfirm={this.handleSearch.bind(this)}/>
            </View>
            <View className='iconfont icon-camera-aside'/>
          </View>
          {sort !== 'ATTEND'&&
            <View className='live-tag'>
              <View className='live-tag-item' onClick={this.handleSortChange.bind(this,'RANK')}><Image mode='widthFix' className='img' src={`${cdn}/rank.png`}/><Text className='dec'>排行榜</Text></View>
              <View className='live-tag-item' onClick={this.handleSortChange.bind(this,'CITY')}><Image mode='widthFix' className='img' src={`${cdn}/samecity.png`}/><Text className='dec'>同城</Text></View>
              <View className='live-tag-item' onClick={this.handleSortChange.bind(this,'ATTEND')}><Image mode='widthFix' className='img' src={`${cdn}/attend.png`}/><Text className='dec'>关注</Text></View>
              <View className='live-tag-item' onClick={this.handleToMember.bind(this)}><Image mode='widthFix' className='img' src={`${cdn}/mine.png`}/><Text className='dec'>我的</Text></View>
            </View>
          }
          {sort !== 'ATTEND'&&
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
          }
          {
            sort === 'ATTEND'&&roomList.length === 0?
              <View className='attend-none'>
                 <Image src={`${cdn}/none.png`} mode='widthFix' className='img'/>
                 <View className='recommend-live'>
                   <View className='recommend-live-dec'>为你推荐</View>
                   <View className='recommend-live-list'>
                     {
                       list.length !== 0 &&
                       list.map((item,index) => {
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
                 </View>
              </View>:
              sort === 'ATTEND'?
              <View className='attend-dec'>
                 <View className='own-recommend'>
                   <View className='own-recommend-dec'>为你推荐</View>
                   <ScrollView
                   scrollX
                   enableFlex={true}
                   className='scroll-live'
                   >
                     <View className='own-recommend-list'>
                       {
                         list.map((item,index) => {
                           return(
                             <View className='item-container' onClick={this.handleToRoom.bind(this,item)}>
                               <OwnRecommendItem
                                 info={item}
                               />
                             </View>
                           )
                         })
                       }
                     </View>
                   </ScrollView>
                 </View>
                <View className='attend-list'>
                  <View className='attend-list-dec'>我的关注</View>
                  <View className='attend-list-list'>
                    {
                      roomList.map((item,index) => {
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
                  <View className='more' onClick={this.handleSortChange.bind(this,'RANK')}>更多精彩内容,去主页看看吧 ></View>
                </View>
              </View>:
               <View></View>
          }
        </View>
      </View>
    )
  }
}
