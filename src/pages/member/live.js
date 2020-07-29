import Taro, { Component } from '@tarojs/taro'
import {View,Image,LivePusher,Input,Text,ScrollView} from "@tarojs/components";
import api from '@/api'

import OwnOpacity from "../../components/own-opacity/own-opacity";
import NavGap from "../../components/nav-gap/nav-gap";
import './live.scss'


export default class Live extends Component{
  constructor(props) {
    super(props);
    this.state = {
      preViewUrl:'',
      configType:'',
      showConfig:false,
      face_url:'',
      name:'',
      devicePosition:'front',
      beautify:0,
      beautifyList:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
      filterList:[
        {value:'standard',label:'标准'},
        {value:'pink',label:'粉嫩'},
        {value:'nostalgia',label:'怀旧'},
        {value:'blues',label:'蓝调'},
        {value:'romantic',label:'浪漫'},
        {value:'cool',label:'清凉'},
        {value:'fresher',label:'清新'},
        {value:'solor',label:'日系'},
        {value:'aestheticism',label:'唯美'},
        {value:'whitening',label:'美白'},
        {value:'cerisered',label:'樱红'},
        ],
      filter:'standard',
      products:[],
    }
  }
    componentDidMount() {
  }

  back(){
    Taro.navigateBack()
  }
  navigateToProgram(){
    Taro.navigateToMiniProgram({
      appId:'wxde87f955d769c707',
      path:`/others/pages/live/live`,
      extraData:{
        token:Taro.getStorageSync('auth_token'),
        owner:1,
        // im_id:this.state.room_id
      },
      envVersion:'develop',
      success(){
        console.log('跳转 苏心购')
      }
    })
  }

  changeName(e){
    this.setState({
      name:e.detail.value
    })
  }
  changeCover(){
   Taro.chooseImage({
     success:(res)=>{
       const path = res.tempFilePaths
       const fileList = res.tempFiles
       this.setState({
         preViewUrl:path
       })
      this.postImage(fileList[0])
     }
   })
  }
  changeConfig(type){
    this.setState({
      configType:type,
      showConfig:true
    })
  }
  choose(type,value){
    switch (type) {
      case 'reverse':
        this.setState({
          devicePosition:value
        })
        break
      case 'beautify':
        this.setState({
          beautify:value
        })
        break
      default :
        this.setState({
          filter:value
        })
    }
  }
  chooseGoods(){
    Taro.navigateTo({
      url:'/pages/item/list?live=true'
    })
  }
  closeConfig(){
    this.setState({
      showConfig:false
    })
  }
  async postImage(file){
    Taro.showLoading({
      title:'上传中'
    })
   const {url} = await api.live.uploadImg({file:file})
    Taro.hideLoading()
    this.setState({
      face_url:url
    })
  }
  confirmLive(){

  }
  render() {
    const {name,showConfig,configType,devicePosition,beautify,filter,beautifyList,filterList,preViewUrl} = this.state
    return(
      <View className='live'>
        <View className='live-header'>
          <View className='iconfont icon-dizhi'/><Text>杭州</Text><View className='iconfont icon-close' onClick={this.back.bind(this)}/>
        </View>
        <View className='live-body'>
          <OwnOpacity
            contain-class='live-body-bg'
                      renderTrue={
                        <View>
                          <View className='live-body-title'>苏心淘直播</View>
                          <View className='live-body-upload'>
                            <View className='left' onClick={this.changeCover.bind(this)}>
                              <View className='iconfont icon-sousuo'/>
                              <View><View className='iconfont icon-sousuo'/><Text>更换封面</Text></View>
                              {
                                preViewUrl&&
                                  <Image mode='widthFix' className='img' src={preViewUrl}/>
                              }
                            </View>
                            <View className='right'>
                              <Input type='text' value={name} className='name-input' onInput={this.changeName.bind(this)}/>
                            </View>
                          </View>
                        </View>
                      }
                      renderHide={
                        <View>
                          <View className='live-body-title'>苏心淘直播</View>
                          <View className='live-body-upload'>
                            <View className='left' onClick={this.changeCover.bind(this)}>
                              <View className='iconfont icon-sousuo'/>
                              <View><View className='iconfont icon-sousuo'/><Text>更换封面</Text></View>
                            </View>
                            <View className='right'>
                              <Input type='text' value={name} className='name-input' onInput={this.changeName.bind(this)}/>
                            </View>
                          </View>
                        </View>
                      }
          >
          </OwnOpacity>
        </View>
        <View className='live-footer'>
          <View className='live-footer-list'>
            <View className='item' onClick={this.changeConfig.bind(this,'reverse')}><View className='iconfont icon-reverse'/><Text>翻转</Text></View>
            <View className='item' onClick={this.changeConfig.bind(this,'beautify')}><View className='iconfont icon-beauty'/><Text>美颜</Text></View>
            <View className='item' onClick={this.changeConfig.bind(this,'filter')}><View className='iconfont icon-filt'/><Text>滤镜</Text></View>
            <View className='item' onClick={this.chooseGoods.bind(this)}><View className='iconfont icon-gouwucheman'/><Text>商品</Text></View>
          </View>
          <View className='live-footer-begin'>
            开始直播
          </View>
        </View>
         {
          showConfig &&
          <View className='live-config'>
            {
               configType === 'reverse'&&
                 <View className='reverse-config'>
                   <View className='title'>摄像头设置</View>
                   <View className='item-list'>
                     <View className={`config-item ${devicePosition ==='front'?'selected':''}`} onClick={this.choose.bind(this,'reverse','front')}>正面</View>
                     <View className={`config-item ${devicePosition ==='back'?'selected':''}`} onClick={this.choose.bind(this,'reverse','back')}>背面</View>
                   </View>
                 </View>
            }
            {
              configType !== 'reverse'&&
                <View className='other-config'>
                  <View className='title'>{configType === 'beautify'?'美颜':'滤镜'}</View>
                  <ScrollView
                  scrollX
                  enableFlex={true}
                  className='scroll-contain'
                  >
                    {configType === 'beautify'&&
                    <View className='item-list'>
                      {
                        beautifyList.map((item, index) => {
                          return (
                            <View className={`config-item ${beautify === item ? 'selected' : ''}`}
                                  onClick={this.choose.bind(this, 'beautify', item)}>{item}</View>
                          )
                        })
                      }
                    </View>
                    }
                    {
                      configType === 'filter'&&
                        <View className='item-list'>
                          {
                            filterList.map((item, index) => {
                              return (
                                <View className={`config-item ${filter === item.value ? 'selected' : ''}`}
                                      onClick={this.choose.bind(this, 'filter', item.value)}>{item.label}</View>
                              )
                            })
                          }
                        </View>
                    }
                  </ScrollView>
                </View>
            }
            <View onClick={this.closeConfig.bind(this)} className='config-close'><View className='iconfont icon-arrow-left'/></View>
          </View>
        }
      </View>
    )
  }
}
