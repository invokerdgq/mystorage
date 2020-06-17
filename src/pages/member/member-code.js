import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Button } from '@tarojs/components'
import { withLogin } from '@/hocs'
import S from '@/spx'
import api from '@/api'
import NavGap from "../../components/nav-gap/nav-gap";

import './member-code.scss'

@withLogin()
export default class MemberCode extends Component {
  constructor (props) {
    super(props)

    this.state = {
      info: null,
      tmpPath:''
    }
  }

  componentDidMount () {
    this.fetch()
  }

  async fetch() {
    const { memberInfo, vipgrade, cardInfo } = await api.member.memberInfo()
    const params = {
      code_type: (cardInfo && cardInfo.code_type) || {},
      content: memberInfo.user_card_code,
      appid:Taro.getExtConfigSync().appid
    }
    const res = await api.member.memberCode(params)

    this.setState({
      info: {
        ...res,
        userCardCode: memberInfo.user_card_code,
        vipType: vipgrade.is_vip && vipgrade.vip_type
      }
    },() => {
      this.handleSaveImage()
    })
  }
  onShareAppMessage(obj) {
    const userinfo = Taro.getStorageSync('userinfo')
    const { user_card_code :userId } = Taro.getStorageSync('userinfo')
       console.log(this.state.tmpPath)
    return {
      title: `${userinfo.username}邀请你进入苏心淘`,
      path: `/pages/member/index?uid=${userId}`,
      imageUrl:this.state.tmpPath
    }
  }

  handleCopy =() => {
    Taro.setClipboardData({
      data:this.state.info.userCardCode,
      success(res) {
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
 handleSaveImage() {
     let fileManage = Taro.getFileSystemManager();
     let date = new Date().getTime();
     fileManage.writeFile({
       filePath:Taro.env.USER_DATA_PATH + `/pict${date}.png`,
       data:this.state.info.qrcode_url.slice(22),
       encoding:'base64',
       success:()=>{
         console.log('hahahah')
         this.setState({
           tmpPath:Taro.env.USER_DATA_PATH + `/pict${date}.png`
         },() => {})
       }
     })
 }
 handleSave(){
    console.log('klllll')
   Taro.saveImageToPhotosAlbum({
     filePath:this.state.tmpPath,
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
  render () {
    const { username, avatar } = Taro.getStorageSync('userinfo')
    const { info } = this.state

    return (
      <View>
        <NavGap title='分享二维码'/>
        <View className="member-code-wrap">
          <View className="member-code">
            <View className="avatar">
              <Image className="avatar-img" src={avatar} mode="aspectFill" />
              {
                info.vipType && (info.vipType === 'vip' || info.vipType === 'svip')
                && <Image className="icon-vip" src="../images/svip.png" />
              }
            </View>
            <View className="nickname">{username}</View>
            {/*<Image className="member-code-bar" mode="aspectFill" src={info.barcode_url} />*/}
            <Image className="member-code-qr" mode="aspectFit" src={info.qrcode_url} />
            <View>{info.userCardCode}</View>
            <View className="muted">使用时，出示此码</View>
          </View>
          <View className='feature'>
            <Button onClick={this.handleSave} className='code-save'><Image src='../../assets/imgs/friend.jpg'/></Button>
            <Button openType='share' className='code-share'><Image src='../../assets/imgs/share.png'/></Button>
            <Button onClick={this.handleCopy.bind(this)} className='code-copy'><Image src='../../assets/imgs/copy.jpg'/></Button>
          </View>
        </View>
      </View>
    )
  }
}
