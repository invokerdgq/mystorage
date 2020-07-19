import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"

import './live.scss'
import {cdn} from "../../../consts";
export default class Live extends Component{
  constructor(props) {
    super(props);
    this.state = {
      type:'',
      messageList:[
        {user_name:'555',user_message:'守护这片沙滩的是谁呢'},
        {user_name:'w',user_message:'来细数你的罪恶吧'},
        {user_name:'decade',user_message:'我只是一个路过的假面骑士'},
        {user_name:'Ryuki',user_message:'我不能死，不然你就无法回头了'},
        {user_name:'Ryuki',user_message:'我不能死，不然你就无法回头了我不能死，不然你就无法回头了我不能死，不然你就无法回头了我不能死，不然你就无法回头了我不能死，不然你就无法回头了'}
      ]

    }
    this.top = Taro.getStorageSync('top')
  }
  clickBack(){
    Taro.navigateBack()
  }
  render() {
    const {type,messageList} = this.state
    return(
      <View>
         <View className='iconfont icon-arrow-left' style={{top:this.top+'px'}} onClick={this.clickBack}/>
         <View className='live-view'>
           {/*<LivePlayer className='live' src="rtmp://pull.oioos.com/sxt-live/58662927?auth_key=1594897554-d3652a08da80f1f0e92f1d2fb527d600-0-d98eb7d171d84b567afe23615c11e914" autoplay={true}*/}
           {/*/>*/}
           {/*<live-player src="https://domain/pull_stream" mode="RTC" autoplay bindstatechange="statechange" binderror="error" style="width: 300px; height: 225px;" />*/}
         </View>
        <View className='data-view'>
          <View className='live-header' style={{top:this.top +'px'}}>
             <View className='live-header-top'>
               <OwnOpacity
                 containerClass='contain-dec'
                 renderTrue={
                   <View className='header-contain'>
                     <View className='avatar'><Image mode='widthFix' className='img'/></View>
                     <View className='room-dec'>
                       <View className='room-dec-name'><Text>直播间名称...</Text></View>
                       <View className='room-dec-more'>
                         <Text>999关注</Text> | <Text>地域</Text>
                       </View>
                     </View>
                     <View className='attend'>
                       <Text>+</Text>关注
                     </View>
                   </View>
                 }
                 renderHide={
                   <View className='header-contain'>
                     <View className='avatar'><Image mode='widthFix' className='img'/></View>
                     <View className='room-dec'>
                       <View className='room-dec-name'><Text>直播间名称...</Text></View>
                       <View className='room-dec-more'>
                         <Text>999关注</Text> | <Text>地域</Text>
                       </View>
                     </View>
                     <View className='attend'>
                       <Text>+</Text>关注
                     </View>
                   </View>
                 }
               />
             </View>
            <View className='live-header-bottom'>
              <OwnOpacity
              containerClass='contain-bottom'
              renderTrue = {
                <View className='bottom-contain'>
                 <Image mode='widthFix' className='img'/>
                 <Text className='attend-dec'>亲密度2</Text>
                </View>
              }
              renderHide = {
                <View className='bottom-contain'>
                  <Image mode='widthFix' className='img' src={`${cdn}/susisang.png`}/>
                  <Text className='attend-dec'>亲密度2</Text>
                </View>
              }
              />

            </View>
          </View>
          <View className='live-footer-container'>
            <View className='live-footer'>
              <View className='live-footer-user'>
                <View className='container'>
                  <View className='iconfont icon-gouwucheman'/>
                  <Text className='buy-dec'>XXXX正在去购买</Text>
                </View>
                <View className='content'>
                  <View className='iconfont icon-gouwucheman'/>
                  <Text className='buy-dec'>XXXX正在去购买</Text>
                </View>
              </View>
              <View className='live-footer-message'>
                {
                  messageList.map((item,index) => {
                    return (
                      <OwnOpacity
                        containerClass={'message'}
                        renderTrue={<View className={`true ${index === 0?'gradient-bg':''}`}>
                          <Text className={`user_name ${index === 0?'gradient-name':''}`}>{item.user_name}:</Text><Text className={`user_message ${index === 0?'gradient-ms':''}`}>{item.user_message}</Text></View>}
                        renderHide={<View className='true'><Text className='user_name'>{item.user_name}:</Text><Text className='user_message'>{item.user_message}</Text></View>}>
                      </OwnOpacity>
                    )
                  })
                }
              </View>
          </View>
            <View className='live-footer-feature'>
              <View className='opc'>
                <View className='send-message'/>
                <Input type='text' placeholder='说点什么...' className='input' placeholderClass='holder'/>
              </View>
              <View className='more'>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-gouwucheman'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-xinaixin'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-zhuanfa'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-close'/>
                </View>
              </View>
            </View>
          </View>
          {
            type === 'live-detail'&&
              <View className='live-detail'>

              </View>
          }
          {
            type === 'watcher-detail'&&
              <View className='watcher-detail'>

              </View>
          }
          {
            type === 'cart-detail'&&
              <View className='cart-detail'>

              </View>
          }
        </View>
      </View>
    )
  }
}
