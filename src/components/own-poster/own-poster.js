import Taro, { Component } from '@tarojs/taro'
import {View,Text,Canvas,Image} from "@tarojs/components"
import {cdn} from "../../consts";
import req from '@/api/req'
import S from '@/spx'

import './own-poster.scss'
export default class OwnPoster extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    Url2X:'',
    Url3X:'',
    sendPath:() =>{},
  }
  constructor(props) {
    super(props);
    this.state = {
      width:'',
      height:'',
      url:'',
      path:'',
      imgWidth:'',
      imgHeight:'',
      codePath:'',
      codeWidth:'',
      codeHeight:'',
      savePath:''
    }
  }
  componentDidMount() {
    const userinfo = Taro.getStorageSync('userinfo')
    if (!userinfo) return
    const { user_card_code:userId } = userinfo
    const host = req.baseURL.replace('/api/h5app/wxapp/','')
    const extConfig = Taro.getExtConfigSync ? Taro.getExtConfigSync() : {}
    const { distributor_id } = Taro.getStorageSync('curStore')
    // const wxappCode = `${host}/wechatAuth/wxapp/qrcode?page=pages/member/index&appid=${extConfig.appid}&company_id=1&dtid=${distributor_id}&uid=${userId}`
    let  wxappCode= 'https://sxt-s.oioos.com/wechatAuth/wxapp/qrcode?page=pages/item/espier-detail&appid=wx9378bcb903abd3ab&company_id=1&id=9326&dtid=undefined&uid=OS674E'
    Taro.getImageInfo({
      src:wxappCode,
      success:(res) => {
        this.setState({
          codePath:res.path,
          codeWidth:res.width,
          codeHeight:res.height
        },() => {
          this.initCanvas()
        })
      }
    })
  }
  initCanvas () {
    const {pixelRatio:dpr,screenWidth,screenHeight}= Taro.getSystemInfoSync()
    if(dpr<3){
      this.setState({
        url:this.props.Url2X
      })
      Taro.getImageInfo({
        src:this.props.Url2X,
        success:(res)=>{
          this.setState({
            width:res.width*(screenWidth/375)/dpr,
            height:res.height*(screenWidth/375)/dpr,
            path:res.path,
            imgWidth:res.width,
            imgHeight:res.height
          },() => {
            this.drawImg.apply(this)
          })
        },
        fail:(e) =>{
          Taro.showToast({
            title:e.errMsg,
            icon:'none',
            duration:1500
          })
        }
      })
    }else{
      this.setState({
        url:this.props.Url3X
      })
      Taro.getImageInfo({
        src:this.props.Url3X,
        success:(res)=>{
          this.setState({
            width:res.width*(screenWidth/375)/dpr,
            height:res.height*(screenWidth/375)/dpr,
            path:res.path,
            imgWidth:res.width,
            imgHeight:res.height
          },() => {
            this.drawImg.apply(this)
          })
        },
        fail:(e) =>{
          Taro.showToast({
            title:e.errMsg,
            icon:'none',
            duration:1500
          })
        }
      })
    }

  }
  drawImg= ()=>{
    const {pixelRatio:dpr,screenWidth,screenHeight}= Taro.getSystemInfoSync()
    let ctx = Taro.createCanvasContext('owncanvas',this)
    let that =this
    ctx.drawImage('/' +this.state.path,0,0,this.state.imgWidth,this.state.imgHeight,0,0,this.state.width,this.state.height)
    ctx.drawImage(this.state.codePath,0,0,this.state.codeWidth,this.state.codeHeight,50*(screenWidth/375)/2,(500)*(screenWidth/375)/2,80/2,80/2)
    ctx.draw(true,() =>{
      Taro.canvasToTempFilePath({
        x:0,
        y:0,
        width:that.state.width,
        height:that.state.height,
        destWidth:that.state.width*dpr,
        destHeight:that.state.height*dpr,
        canvasId:'owncanvas',
        success:(res) =>{
          this.props.sendPath(res.tempFilePath)
          that.setState({
            savePath:res.tempFilePath
          })
        }
      },that)
    });
  }
  save=() =>{
    Taro.saveImageToPhotosAlbum({
      filePath: this.state.savePath
    })
      .then(res => {
        Taro.showToast({
          title:'保存成功',
          icon:'success',
          duration:1500
        })
      })
      .catch(res => {
        Taro.showToast({
          title:'保存失败',
          icon:'none',
          duration:1500
        })
      })
}
  render() {
    let {width,height} = this.state
    return(
      <View className='post-container'>
       <Canvas canvas-id='owncanvas'  className='canvas' style={{width:width +'px',height:height+'px'}}/>
       <View className='save-btn-container'><Image src={`${cdn}/poster-save.png`} mode='widthFix' className='save-btn' onClick={this.save.bind(this)}/></View>
      </View>
    )
  }
}
