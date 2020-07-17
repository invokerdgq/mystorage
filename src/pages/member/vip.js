import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text, Image, Navigator, Button, Icon,Swiper,SwiperItem,Canvas} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";
import GiftListItem from "./comps/gift-list";
import api from '@/api'
import {cdn} from '@/consts/index'


import './vip.scss'
const w = 200;
const h = 400;
export default class Vip extends Component{
  constructor(props) {
    super(props);
    this.state = {
      titleList : ['钻石会员','至尊会员','王者身份'],
      curIndex:0,
      giftIndex:null,
      grade_name:'',
      giftList:[],
      showFeature:false,
      res:null,
      showCanvas:false,
      path:null,
      showImage:false,
      showToolBar:false
    }
   this.couponList = [
     {title:'50元优惠券',url:`${cdn}/50元.png`},
     {title:'30元优惠券',url:`${cdn}/30元.png`},
     {title:'20元优惠券',url:`${cdn}/20元.png`},
     {title:'10元优惠券',url:`${cdn}/10元.png`},
     {title:'5元优惠券',url:`${cdn}/5元.png`}
   ]
  }
  componentDidMount() {

   let info = Taro.getSystemInfoSync();
    this.dpr = info.pixelRatio;
    this.width = info.screenWidth
    this.height = info.screenHeight
     this.getList()
     this.setState({
      grade_name:this.$router.params.grade_name,
    })
  }
  async getList() {
    let list = await api.member.getGiftList({page:1})
    this.setState({
      giftList:list.list
    })

  }
  async fetch (index,cb) {
    // const { memberInfo, vipgrade, cardInfo } = await api.member.memberInfo()
    // const params = {
    //   code_type: (cardInfo && cardInfo.code_type) || {},
    //   content: memberInfo.user_card_code,
    //   appid:Taro.getExtConfigSync().appid
    // }
    // const res = await api.member.memberCode(params)
    Taro.showLoading({
      title:'获取礼包二维码中'
    })
    const res = await api.member.inviteCode(this.state.giftList[index].code)
    Taro.hideLoading()
    this.setState({res},() => {
      cb()
    })
  }
  onShareAppMessage(obj) {
    const info = Taro.getStorageSync('userinfo')
    return {
      title:'免费成为至尊会员',
      path:`/pages/member/index?inviteCode=${this.state.giftList[this.state.giftIndex].code.toString()}&uid=${info.user_card_code}`,
      imageUrl:this.state.path
    }
  }

  handleClickBuy =(grade_name) =>{
    if(grade_name === this.state.grade_name){
      Taro.showToast({
        title:'您已激活！',
        duration:2000
      })
    }else if(grade_name === '钻石会员'){
      Taro.navigateTo({
        url:'/pages/index',
      })
    }else {
      Taro.navigateTo({
        url:`/pages/vip/vipgrades?grade_name=${grade_name}`,
      })
    }
  }
  handleClickTransform = () => {
   console.log('兑换中')
  }
  handleClickLook = ()=> {
    Taro.navigateTo({
      url:'/pages/index'
    })
  }
  handleChange = (e) => {
   const detail = e.detail
    this.setState({
      curIndex:detail.current
    })
  }
  handleUse =(index) => {
    if(this.state.giftList[index].is_use === 1)return
    this.setState({
      showFeature:true,
      giftIndex:index
    },() => {
      this.fetch(index,() => { this.drawImg()})
    })
  }
  handleHide =() => {
    this.setState({
      showFeature:false
    })
  }
  handleShowDec() {
    this.drawImg(() => {
      this.setState({
        showImage:true,
        showFeature:!this.state.showFeature
      })})
  }
  handleSaveImg = () => {
      Taro.saveImageToPhotosAlbum({
        filePath:this.state.path,
        success(){
          Taro.showToast({
            title:'保存成功',
            icon:'success',
            duration:1500
          })
        },
        fail:() =>{
          Taro.showToast({
            title:'保存失败',
            icon:'none',
            duration:1500
          })
        },
        complete:() =>{
          this.setState({
            showCanvas: !this.state.showCanvas
          })
        }
      })
  }
  handleCopyCode =() => {
    Taro.setClipboardData({
      data:this.state.giftList[this.state.giftIndex].code.toString(),
      success(res) {
        console.log(res)
        Taro.showToast({
          title:`复制成功`,
          icon:'success',
          duration:1500
        })
      },
      fail(e){
        Taro.showToast({
          title:'复制失败，稍后重试',
          icon:'none',
          duration:1500
        })
      }
    })
  }
  handleShareCode =() => {

  }
drawImg = (cb=() => {}) =>{
    let file = Taro.getFileSystemManager();
    let date = new Date().getTime()
    file.writeFile({
      filePath:Taro.env.USER_DATA_PATH + `/pic${date}.png`,
      data:this.state.res.qrcode_url.slice(22),
      encoding:'base64',
      success:(res) => {
        const w = (375/2)*(this.width/375)
        const h = 480/2
        console.log('success')
        let ctx = Taro.createCanvasContext('own-canvas');
        ctx.setFontSize(28/2)
        let length = ctx.measureText('您的专属激活码')
        ctx.fillText('您的专属激活码',0.5*w -length.width/2,20);
        ctx.setFontSize(40/2)
        let length1 = ctx.measureText(this.state.giftList[this.state.giftIndex].code)
        ctx.fillText(this.state.giftList[this.state.giftIndex].code,0.5*w -length1.width/2,50);
        ctx.setFontSize(28/2)
        // ctx.moveTo(0,55)
        // ctx.lineTo(w,55)
        // ctx.setLineDash([4,4],4)
        ctx.stroke()
        ctx.drawImage(  Taro.env.USER_DATA_PATH + `/pic${date}.png`,w*0.2,h*0.28,0.6*w,0.6*w)
        ctx.setFillStyle('#c0534e');
        ctx.rect((w-110)/2,0.85*h,110,20)
        ctx.fill();
        ctx.beginPath()
        ctx.arc((w-110)/2,0.85*h+10,10,Math.PI/2-1,3/2*Math.PI+1,false)
        ctx.closePath()
        ctx.arc((w+110)/2,0.85*h+10,10,-Math.PI/2-1,3/2*Math.PI+1,false)
        ctx.closePath()
        ctx.fill()
        ctx.setFillStyle('white')
        ctx.setFontSize(10);
        let length2 = ctx.measureText('长按小程序码进入苏心淘')
        ctx.fillText('长按小程序码进入苏心淘',0.5*w -length2.width/2,0.85*h +13)
        ctx.draw(false,() => {
          Taro.canvasToTempFilePath({
            x: 0,
            y: 0,
            width:w,
            height: h,
            destWidth: w,
            destHeight: h,
            canvasId: 'own-canvas',
            success:(res) => {
              this.setState({path:res.tempFilePath},() => {
                cb()
              })
            }
          })
        })
      }
    })
}
// handleShare =() => {
//     this.drawImg(() => {
//       this.setState({
//         showImage:true,
//         showFeature:!this.state.showFeature
//     })})
// }
handleCancelImg =()=> {
    this.setState({
      showImage:false
    })
}

  showToolBar =()=> {
    this.setState({
      showToolBar:true
    })
  }
  hideToolBar=()=>{
    setTimeout(() => {
      this.setState({
        showToolBar:false
      })
    },2500)
  }
  handleRule(){
    Taro.navigateTo({
      url:'/pages/member/vip-rule'
    })
  }
  render() {
    const { showToolBar,titleList,curIndex ,grade_name, giftList,showFeature,giftIndex,res,showCanvas} = this.state
    return(
      <View className='vip-view' onTouchStart={this.showToolBar} onTouchEnd={this.hideToolBar}>
        <View style={`display:${this.state.showImage?'block':'none'}`} className='vip-fixed'/>
        <View style={`display:${this.state.showImage?'block':'none'}`} className='img-container'>
          <Image   style={`width:375rpx;height:480rpx`} showMenuByLongpress={true} src={this.state.path}/>
          <View className='img-controll' onClick={this.handleSaveImg}>保存到相册</View>
          <View className='close' onClick={this.handleCancelImg}>X</View>
        </View>
        <View className='vip-fixed' style={{display:`${showFeature?'block':'none'}`}}/>
          <Canvas canvasId='own-canvas' className='own-canvas' style={`width:375rpx;height:480rpx;display:${showFeature?'block':'none'}`}/>
        <View style={{display:`${showFeature?'flex':'none'}`}} className='vip-fixed-bottom'>
           <View className='vip-fixed-bottom-container'>
             <View className='message-item'>
               <Icon className='iconfont icon-fenxiang'/>
               <Button openType='share'>分享给好友</Button>
             </View>
             <View className='message-item' onClick={this.handleCopyCode}>
               <Icon className='iconfont icon-fuzhi'/>
               <Button>复制激活码</Button>
             </View>
             <View className='message-item' onClick={this.handleShowDec}>
               <Icon className='iconfont icon-copy'/>
               <Button>保存图片</Button>
             </View>
           </View>
          <View className='vip-fixed-bottom-controll' onClick={this.handleHide}>取消</View>
        </View>
         <NavGap title='权益中心'/>
         <View className='vip-header'>
           <View className='vip'>
             <View className='vip-sort-container'>
               <View className='vip-sort-title'>- {titleList[curIndex]} -</View>
               <View className='vip-sort-look' onClick={this.handleRule}>规则查看 ></View>
             </View>
             <View className='vip-feature'>
               <View>
                 <Swiper
                   className='vip-card-swiper'
                   current={curIndex}
                   indicatorDots = {true}
                   nextMargin={130+'rpx'}
                   previousMargin={130+'rpx'}
                   onChange={this.handleChange}
                 >
                   <SwiperItem className='swiper-item'>
                     <Image className='item-img' src={`${cdn}/zuanshi.png`}/>
                   </SwiperItem>
                   <SwiperItem className='swiper-item'>
                     <Image className='item-img' src={`${cdn}/zhizun.png`}/>
                   </SwiperItem>
                   <SwiperItem className='swiper-item'>
                     <Image className='item-img' src={`${cdn}/wangzhe.png`}/>
                   </SwiperItem>
                 </Swiper>
               </View>
             </View>
           </View>

           <View className={`vip-similar-${curIndex}`}>
             {
               curIndex === 0&&
                 <Image src={`${cdn}/zsqy.jpg`} mode='widthFix' />
             }
             {
               curIndex === 1&&
               <Image src={`${cdn}/zzqy.jpg`} mode='widthFix'/>
             }
             {
               curIndex === 2&&
               <Image src={`${cdn}/wzqy.jpg`} mode='widthFix'/>
             }
           </View>

           <View className='vip-own'>
             <View className='vip-0-title'>- 权益专享 -</View>
             <View>
               {
                 curIndex !== 0&&
                 <View className='vip-2-content'>
                   <View className='vip-2-content-title'>300 元优惠券 :</View>
                   <View className='vip-2-content-subtitle'><Text className='icon'>i</Text>激活会员后可用于苏心淘使用</View>
                   <View>
                     <ScrollView
                       scrollX
                       enableFlex={true}
                       className='scroll-coupon'
                     >
                       {
                         this.couponList.map((item,index) => {
                           return(
                             <View className='coupon-item'>
                               <Image src={item.url}/>
                               <View className='coupon-dec'>{item.title}</View>
                             </View>
                           )
                         })
                       }
                     </ScrollView>
                   </View>
                 </View>
               }
             </View>
             <View className='quanyi-1'>
               {
                 curIndex === 0&&
                 <Image src={`${cdn}/zsqy1.jpg`} mode='widthFix'/>
               }
               {
                 curIndex === 1&&
                 <Image src={`${cdn}/zzqy1.jpg`} mode='widthFix'/>
               }
               {
                 curIndex === 2&&
                 <Image src={`${cdn}/wzqy1.jpg`} mode='widthFix'/>
               }
             </View>
             <View>
               {
                titleList[curIndex] === '王者身份'&& grade_name === '王者身份'&&
                 <View>
                   <View className='vip-2-title'>- 礼包码 -</View>
                   <View>
                     <ScrollView
                        scrollY
                        onScrollToLower={this.nextPage}
                        className='gift-list'
                     >
                       {
                         giftList.map((item,index) => {
                           return(
                             <View className={`gift-list gift-list-${index}`}>
                               <GiftListItem
                                 info={item}
                                 index={index}
                                 onclick={this.handleUse}
                               />
                             </View>
                           )
                         })
                       }
                     </ScrollView>
                   </View>
                 </View>
             }
             </View>
             <View className='button-bottom'>
               <View className='vip-1-button'>
                 <View className='vip-1-button-dec'><Text className='vip-1-button-dec-1'>{titleList[curIndex]}</Text>
                   {
                     curIndex === 0&&
                     <Text className='vip-1-button-dec-2'>任意消费即可激活</Text>
                   }
                   {
                     curIndex === 1&&
                     <Text className='vip-1-button-dec-2'>低至￥<Text className='vip-1-button-dec-3'>0.8</Text>元/每天</Text>
                   }
                   {
                     curIndex === 2&&
                     <Text className='vip-1-button-dec-2'>享受返佣</Text>
                   }
                 </View>
                 <View className='vip-1-button-click' onClick={this.handleClickBuy.bind(this,titleList[curIndex])}>{grade_name === titleList[curIndex]?'已付款':`${curIndex === 1?'支付/兑换':curIndex === 0?'去下单':'支付'}`}</View>
               </View>
             </View>
           </View>
         </View>
      </View>
    )
  }
}
