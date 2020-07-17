import Taro, { Component } from '@tarojs/taro'
import {View,Text,Canvas,Image} from "@tarojs/components"
import {cdn} from "../../consts";
import req from '@/api/req'

import './own-shade.scss'
export default class OwnShade extends Component{
  static defaultProps = {
    onclickClose:() => {},
    show:'',
    close:true,
    canvas:false,
    goodsImg:'',
    assist_id:'',
    sendPath:() => {},
  }
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      preSave:false,
      width:'',
      height:'',
      url:'',
      path:'',
      goodsPath:'',
      imgWidth:'',
      imgHeight:'',
      goodsImgWidth:'',
      goodsImgHeight:'',
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
    // const wxappCode = `${host}/wechatAuth/wxapp/qrcode?page=others/pages/help/help&appid=${extConfig.appid}&company_id=1&dtid=${distributor_id}&uid=${userId}&help=true`
    // const  wxappCode= 'https://sxt-s.oioos.com/wechatAuth/wxapp/qrcode?page=pages/item/espier-detail&appid=wx9378bcb903abd3ab&company_id=1&id=9326&dtid=undefined&uid=OS674E'
    const  wxappCode= `https://sxt-s.oioos.com/wechatAuth/wxapp/qrcode?page=pages/index&appid=wx9378bcb903abd3ab&company_id=1&assist_id=${this.props.assist_id}&uid=OS674E`
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
        url:`${cdn}/init-post.png`
      })
      Taro.getImageInfo({
        src:`${cdn}/init-post.png`,
        success:(res)=>{
          this.setState({
            width:res.width*(screenWidth/375)/dpr,
            height:res.height*(screenWidth/375)/dpr,
            path:res.path,
            imgWidth:res.width,
            imgHeight:res.height
          },() => {
            this.drawImg()
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
        url:`${cdn}/post.png`
      })
      Taro.getImageInfo({
        src:`${cdn}/post.png`,
        success:(res)=>{
          this.setState({
            width:res.width*(screenWidth/375)/dpr,
            height:res.height*(screenWidth/375)/dpr,
            path:res.path,
            imgWidth:res.width,
            imgHeight:res.height
          },() => {
            this.drawImg()
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
    Taro.getImageInfo({
      src:this.props.goodsImg,
      success:(res) => {
        this.setState({
          goodsPath:res.path,
          goodsImgWidth:res.width,
          goodsImgHeight:res.height
        },() =>{
          this.drawImg()
        })
      }
    })
  }
  drawImg= ()=>{
    if(!(this.state.goodsPath &&this.state.path)) return
    const {pixelRatio:dpr,screenWidth,screenHeight}= Taro.getSystemInfoSync()
    let ctx = Taro.createCanvasContext('owncanvas',this.$scope)
    let that =this
    ctx.drawImage(process.env.NODE_ENV === 'production'?this.state.path:'/' +this.state.path,0,0,this.state.imgWidth,this.state.imgHeight,0,0,this.state.width,this.state.height)
    ctx.drawImage( this.state.goodsPath,0,0,this.state.goodsImgWidth,this.state.goodsImgHeight,0,0,this.state.width,this.state.goodsImgHeight*(this.state.width/this.state.goodsImgWidth))
    ctx.drawImage(this.state.codePath,0,0,this.state.codeWidth,this.state.codeHeight,22*(screenWidth/375)/2,(493)*(screenWidth/375)/2,60*(screenWidth/375),60*(screenWidth/375))
    ctx.draw(true,()=> {
      Taro.canvasToTempFilePath({
        x:0,
        y:0,
        width:that.state.width,
        height:that.state.height,
        canvasId:"owncanvas",
        success:(res) =>{
          this.props.sendPath(res.tempFilePath)
          that.setState({
            savePath:res.tempFilePath
          })
        },
        fail:(res) => {
          console.log(res)
        }
      },that.$scope)
    });
  }
  save(){
    const {pixelRatio:dpr,screenWidth,screenHeight}= Taro.getSystemInfoSync()
    let that = this
      Taro.canvasToTempFilePath({
        x:0,
        y:0,
        width:that.state.width,
        height:that.state.height,
        canvasId:"owncanvas",
        success:(res) =>{
          this.props.sendPath(res.tempFilePath)
          that.setState({
            savePath:res.tempFilePath
          },() =>{
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
                console.log(res)
                Taro.showToast({
                  title:'保存失败',
                  icon:'none',
                  duration:1500
                })
              })
          })
        },
        fail:(res) => {
          console.log(res)
        }
      },that.$scope)

  }
  render() {
    const {width,height} = this.state
    return(
      <View className='shade-container' style={{visibility:!this.props.show?'hidden':'visible'}}>
        <View className='shade'/>
        <View className='shade-content'>
          {this.props.children}
          {this.props.canvas&&
          <View className='post-container'>
            <View className='canvas-shadow'>
              <Canvas canvas-id='owncanvas'  className='canvas' style={{width:width +'px',height:height+'px'}}/>
            </View>
            <View className='save-btn-container'><Image src={`${cdn}/poster-save.png`} mode='widthFix' className='save-btn' onClick={this.save.bind(this)}/></View>
          </View>
          }
          <View className='iconfont icon-close' onClick={this.props.onclickClose} style={{display:this.props.close?'block':'none'}}/>
        </View>
      </View>
    )
  }
}
