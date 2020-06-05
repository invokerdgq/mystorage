import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input} from '@tarojs/components'
import { Price} from '@/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane} from 'taro-ui'
import api from '@/api'
import S from '@/spx'
import { classNames, pickBy } from '@/utils'
import './vipgrades.scss'
import NavGap from "../../components/nav-gap/nav-gap";
import CheckInvite from "../../components/check-invite/check-invite";

@connect(({ colors }) => ({
  colors: colors.current
}))
@connect(({address}) => ({
  address:address.current
}))

export default class VipIndex extends Component {
	static config = {
		navigationBarTitleText: '会员购买',
		backgroundColor: '#2f3030',
		backgroundTextStyle: 'light'
  }
  constructor (props) {
    super(props)

    this.state = {
			userInfo:null,
			curTabIdx: 0,
			curCellIdx: 0,
			tabList:[],
			list:[],
			cur:null,
      value:'',
      inviter_id:'',
      commissionList:[],
      totalMount:0,
      showToolBar:false,
      codeInput:false,
    }
    this.cardImgList= ['https://sxt-b-cdn.oioos.com/tupian/zuanshi.png','https://sxt-b-cdn.oioos.com/tupian/zhizun.png','https://sxt-b-cdn.oioos.com/tupian/wangzhe.png']
  }

  componentDidMount () {
	 if(this.$router.params.presist){
	   this.fetchMission()
   }
		const { colors } = this.props
		Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: colors.data[0].marketing
    })
		const userInfo = Taro.getStorageSync('userinfo')
		this.setState({
			userInfo
		}, () => {
			this.fetchInfo()
			this.fetchUserVipInfo()
		})
	}
  async fetchMission  () {
	  let res = await api.member.commission();
	  // let mount = res.list.reduce((pre,item,index) => {
	  //   pre += Number(item.amount)
    //   return pre
    // },0)
	  this.setState({
      commissionList:res.list,
    })
  }
	async fetchInfo () {
		const { cur, list } = await api.vip.getList()
		const { grade_name,commission } = this.$router.params //  跳转之前 会员等级名称
    if(grade_name === '至尊会员'){
      if(Taro.getStorageSync('inviteCode')){
        this.setState({
          value:Taro.getStorageSync('inviteCode')
        })
      }
    }
		const tabList = pickBy(list, {
			title: ({grade_name}) => grade_name
		})
		const curTabIdx = tabList.findIndex(item => item.title === grade_name)

		this.setState({
			tabList, // grade_name 列表
			cur,
			list,
			curTabIdx: curTabIdx === -1 ? 0 : curTabIdx
		})
	}

	handleClickTab = (idx) => {
    this.setState({
      curTabIdx: idx
    })
	}

	checkHandle = ( index ) =>{
		this.setState({
			curCellIdx:index
		})
	}
 chooseAddress = () =>{
   Taro.navigateTo({
     url: `/pages/member/address?isPicker=choose`
   })
 }
	async handleCharge () {

		if (!S.getAuthToken()) {
      Taro.showToast({
        title: '请先登录再购买',
        icon: 'none'
      })

      setTimeout(() => {
        S.login(this)
      }, 2000)

      return
		}
		const info = Taro.getStorageSync('userinfo')
    const id = Taro.getStorageSync('distribution_shop_id')
    if(!Number(info.inviter_id) && !id && this.state.value === ''){
      this.setState({
        codeInput:true
      })
      return
    }
		if(!this.props.address){
		  this.chooseAddress()
      return
    }else if(!Taro.getStorageSync('address_choose')){
      this.chooseAddress()
		  return
    }
    console.log(this.props.store)
		console.log('第一次提交')
		const {list,curTabIdx,curCellIdx} = this.state
		const vip_grade = list[curTabIdx]
		const params = {
			vip_grade_id: vip_grade.vip_grade_id,
      card_type: vip_grade.price_list[curCellIdx].name,
			distributor_id: Taro.getStorageSync('trackIdentity').distributor_id || ''
		}

    if(this.state.value !== ''){
      console.log('jihuo--------------------')
        api.member.codeActive(this.state.value).then((res) => {
          Taro.setStorageSync('inviteCode','')
          Taro.navigateTo({url:'/pages/member/index'})
        }).catch((e) => {
          Taro.showToast({
            title:e.message,
            icon:'none',
            duration:1500
          })
        })
    }else{
      Taro.showLoading({ mask: true })

      const data = await api.vip.charge({...params,address_id: this.props.address.address_id,come_from:id})
      Taro.setStorageSync('address_choose',false)
      Taro.hideLoading()

      var config = data
      var that = this
      Taro.requestPayment({
        'timeStamp': '' + config.timeStamp,
        'nonceStr': config.nonceStr,
        'package': config.package,
        'signType': config.signType,
        'paySign': config.paySign,
        'success': function (res) {
          Taro.showModal({
            content: '支付成功',
            showCancel: false,
            success: function(res) {
              // let id =  Taro.getStorageSync('distribution_shop_id')
              // api.member.bind({userInviteId:id}).then((res) => {
              //   let userinfo = Taro.getStorageSync('userinfo');
              //   if(res.status === 1){
              //     userinfo.inviter_id = id
              //     Taro.setStorageSync('userinfo',userinfo)
              //   }
              // })
              setTimeout(() => {
                Taro.navigateTo({
                  url:'/pages/member/index'
                })
              },500)
            }
          })
        },
        'fail': function (res) {
          Taro.showModal({
            content: '支付失败',
            showCancel: false
          })
        }
      })
    }
	}

	async fetchUserVipInfo() {
		const userVipInfo = await api.vip.getUserVipInfo()
		this.setState({
			userVipInfo
		})
	}
  handleValue =(e) => {
	  this.setState({
      value:e.detail.value
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
async codeConfirm () {
	  console.log('fsfasfafs')
  if(this.state.inviter_id === ''){
    Taro.showToast({
      title:'内容不能为空！',
      icon:'none',
      duration:1500
    })
  }else{
    let res = await api.member.userinfo({user_card_code:this.state.inviter_id})
    if(res.status === 1){
      this.setState({
        codeInput:false,
      })
      Taro.setStorageSync('distribution_shop_id',this.state.inviter_id)
      this.setState({codeInput:false})
      this.handleCharge()
    }else{
      Taro.showToast({
        title: '邀请码错误',
        icon:'none',
        duration:1500,
        success(){}
      })
    }
  }
}
	render () {
		const { colors } = this.props
		const { codeInput,showToolBar,userInfo, list, cur, curTabIdx, userVipInfo, tabList ,value,commissionList,totalMount} = this.state
    const {grade_name,commission} = this.$router.params
		return (
		  <View onTouchStart={this.showToolBar} onTouchEnd={this.hideToolBar}>
        <NavGap title='支付中心'/>
        <View className='container'>
          {
            this.$router.params.presist !== 'true'&&
            <View className='header'>
              <View className='header-title'>{this.$router.params.presist?`${grade_name}续费`:`激活${grade_name}`}</View>
              <View className='header-isauth'>
                <Image className='header-isauth__avatar' src={userInfo.avatar} mode='aspectFill'/>
                <View className='header-isauth__info'>
                  <View className='nickname'>{userInfo.username}
                    <View className='header-grade_name'>{userVipInfo.is_vip?userVipInfo.grade_name:'普通会员'}</View>
                    {/*<Image  className='icon-vip' src='/assets/imgs/svip.png' />*/}
                  </View>
                  {userVipInfo.is_vip&&
                  <View className='mcode'>{userVipInfo.end_time} 到期，购买后有效期将延续</View>
                  }
                </View>
              </View>
            </View>
          }
          {
            this.$router.params.presist?
              <View>
                <View className='commission-header'>
                  <View className='commission-header-title'>我的佣金</View>
                  <View className='commission-header-mount'>￥<Text className='inner'>{commission}</Text></View>
                  <View className='commission-header-dec'>累计结算收益</View>
                </View>
                <View className='commission-body'>
                  <View className='commission-body-title'>{commissionList.length === 0?'暂无返佣':'全部'}</View>
                  <View className='list-container'>
                    {
                      commissionList.length !== 0&&
                      commissionList.map((item,index) => {
                        return (
                          <View>
                            <View className='source-type'>{item.type?item.type:'暂时未知'}</View>
                            <View className='create-time'>创建时间 :{item.created}</View>
                            <View className='remark-mount'>
                              <View className='remark'>备注:{item.remark}</View>
                              <View className='mount'>+<Text className='mount-inner'>￥{(Number(item.amount)/100).toFixed(2)}</Text></View>
                            </View>
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
                {/*<View style={{display:`${this.$router.params.grade_name === '普通会员'?'none':'block'}`}} className='vip-1-button-container'>*/}
                {/*  <View >*/}
                {/*    <View className='vip-1-button'>*/}
                {/*      <View className='vip-1-button-dec'>{this.$router.params.grade_name} <Text className='inner'>{userVipInfo.end_time} 到期</Text> </View>*/}
                {/*      <View className='vip-1-button-click' onClick={this.handleCharge}>立即续费</View>*/}
                {/*    </View>*/}
                {/*  </View>*/}
                {/*</View>*/}
              </View>
              :
              <View className='section-body-vip'>
                <View className='card-container'>
                  <Image src={this.cardImgList[curTabIdx]} mode='widthFix'/>
                </View>
                <View className='code'>
                  {grade_name === '至尊会员'&&
                  <View className='code-inner'><Text>待激活(选填)</Text><Input type='text' placeholder='请输入激活码' placeholderStyle='text-align:right' value={this.state.value} onInput={this.handleValue}/></View>
                  }
                  <View className='code-inner'><Text>会员发放时间</Text><Text>立即到账</Text></View>
                </View>
                {grade_name === '至尊会员'?
                  <View >
                    <View className='vip-1-button'>
                      <View className='vip-1-button-dec'><Text className='vip-1-button-dec-1'>至尊会员</Text><Text className='vip-1-button-dec-2'>低至￥<Text className='vip-1-button-dec-3'>0.8</Text>元/每天</Text></View>
                      <View className='vip-1-button-click' onClick={this.handleCharge}>{grade_name === '至尊会员'?value === null?'立即激活￥ 299':'立即激活':''}</View>
                    </View>
                  </View>
                  :
                  <View >
                    <View className='vip-2-button'>
                      <View className='vip-2-button-dec'><Text className='vip-1-button-dec-1'>王者身份</Text><Text className='vip-2-button-dec-2'>享受返佣</Text></View>
                      <View className='vip-2-button-click' onClick={this.handleCharge}>{grade_name === '王者身份'?'立即激活￥ 299 x 20':''}</View>
                    </View>
                  </View>
                }
              </View>
          }
        </View>
        <CheckInvite
         show={codeInput}
         onclose={() => {this.setState({codeInput:false})}}
         onconfirm={this.codeConfirm.bind(this)}
         onValueChange={(e) => {
           this.setState({
             inviter_id:e.detail.value
           })
         }}
        />
      </View>
		)
	}

}
