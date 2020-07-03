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
import { withPager } from '@/hocs'
import {cdn} from '@/consts/index'

@connect(({ colors }) => ({
  colors: colors.current
}))
@connect(({address}) => ({
  address:address.current
}))
@connect(({giftId}) => ({
  id:giftId.id
}))
@withPager
export default class VipIndex extends Component {
	static config = {
		navigationBarTitleText: '会员购买',
		backgroundColor: '#2f3030',
		backgroundTextStyle: 'light'
  }
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
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
      present_id:null,
      currentAddress:null,
      iconUp:[],
      curIndex:null
    }
    this.cardImgList= [
      `${cdn}/zuanshi.png`,
      `${cdn}/zhizun.png`,
      `${cdn}/wzjg.jpg`]
    this.giftNameList = [
      'PH护肤双重奏礼盒',
      'PH明星产品套盒',
      '苏尚儿微米系列组合',
      '苏尚儿精品袜套装']
    this.rankList = [
      `${cdn}/first.png`,
      `${cdn}/second.png`,
      `${cdn}/third.png`
    ]
  }
  componentDidShow() {
	  this.setState({
      currentAddress:this.props.address,
      present_id:this.props.id,
    },() => {
    })
  }

  componentDidMount () {
	 if(this.$router.params.presist){
     this.nextPage()
   }
	 const { present_id } = this.$router.params
    this.setState({
      present_id
    })
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
  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    params = {
      // ...params,
      type:0,
      page,
      pageSize
    }
    const { list, total_count: total } = await api.member.commission(params)
    this.setState({
      // list: [...this.state.list, ...nList],
      commissionList:[...this.state.commissionList, ...list]
    },() => {
      this.state.commissionList.forEach(() => {
        this.state.iconUp.push(false)
      })
      this.setState({
        iconUp:this.state.iconUp
      })
    })
    return { total }
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
      if(Number(info.userId) !== 1){
        this.setState({
          codeInput:true
        })
        return
      }
    }
    if(!this.props.address||!this.props.id) {
      Taro.hideToast()
      Taro.showToast({
        title:'请选择地址和礼包',
        icon:'none',
        duration:1500
      })
      return
    }
		const {list,curTabIdx,curCellIdx} = this.state
		const vip_grade = list[curTabIdx]
		const params = {
			vip_grade_id: vip_grade.vip_grade_id,
      card_type: vip_grade.price_list[curCellIdx].name,
			distributor_id: Taro.getStorageSync('trackIdentity').distributor_id || ''
		}
console.log(list)
    if(this.state.value !== ''){
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
       let address = `address=${this.props.address.address_id}|gift=${this.state.present_id?this.state.present_id:8195}`
      const data = await api.vip.charge({...params,address_id: address,come_from:id})
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
chooseGift =() => {
  Taro.navigateTo({
    url:'/pages/vip/present'
  })
}
handleClick(index) {
	  console.log('hhh')
  this.state.iconUp[index] = !this.state.iconUp[index]
	  this.setState({
      iconUp:this.state.iconUp,
      curIndex:index
    })
}
	render () {
		const { colors } = this.props
		const { present_id,codeInput,showToolBar,userInfo, list, cur, curTabIdx, userVipInfo, tabList ,value,commissionList,totalMount} = this.state
    const {grade_name,commission,presist} = this.$router.params
		return (
		  <View onTouchStart={this.showToolBar} onTouchEnd={this.hideToolBar}>
        <NavGap title={`${presist?'收益中心':'支付中心'}`}/>
        <View className='container'>
          {
            this.$router.params.presist !== 'true'&&
            <View className='header'>
              <View className='header-title'>{this.$router.params.presist?`${grade_name}续费`:`激活${grade_name}`}</View>
              <View className='header-isauth'>
                <Image className='header-isauth__avatar' src={userInfo.avatar} mode='aspectFill'/>
                <View className='header-isauth__info'>
                  <View className='nickname'>{userInfo.username}
                    <View className='header-grade_name'>{userVipInfo.is_vip?userVipInfo.is_effective !=0?userVipInfo.grade_name:userInfo.totalConsumption !=0?'至尊会员':'钻石会员':'普通会员'}</View>
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
                  <View className='commission-header-title'>我的收益</View>
                  <View className='commission-header-mount'>￥<Text className='inner'>{commission}</Text></View>
                  <View className='commission-header-dec'>累计收益</View>
                </View>
                <View className='commission-body'>
                  <View className='commission-body-title'>{commissionList.length === 0?'暂无收益':'全部'}</View>
                  <View className='list-container'>
                    <ScrollView
                    scrollY
                    className='scroll-dec'
                    onScrollToLower={this.nextPage.bind(this)}
                    >
                      {
                        commissionList.length !== 0&&
                        commissionList.map((item,index) => {
                          let url;
                          if(item.type === '王者分红'){
                            url=this.rankList[2]
                          }else {
                            if(item.payload){
                              JSON.parse(item.payload).level === 1?url = this.rankList[0]:url=this.rankList[1]
                            }
                          }
                          return (
                            <View>
                              <View className='item-content'>
                                <View className='item-left'>
                                  <View className='item-left-name'>{item.nickname}<Image src={url}/> </View>
                                  <View className='item-left-time'>创建时间 : {item.created}</View>
                                  <View className='item-left-type'>类型 : {item.type}</View>
                                  <View className='item-left-remark'>备注 : {item.remark}</View>
                                </View>
                                <View className='item-right'>
                                  <View className='item-right-mount'>+￥{(Number(item.amount)/100).toFixed(2)}</View>
                                  <View>{item.status === '等待收货'?'待到账':'已到账'}</View>
                                  <View className='detail' onClick={this.handleClick.bind(this,index)}>查看详情<Icon className={`${this.state.iconUp[index]?'icon-arrow-up':'icon-arrow-down'} iconfont`}/></View>
                                </View>
                              </View>
                              {
                                this.state.iconUp[index]&&item.payload&&
                                  <View className='goods-dec-item-content'>
                                    {
                                      JSON.parse(item.payload).items.map(goods => {
                                        console.log('bug')
                                        return (
                                          <View className='goods-dec-item'>
                                            {goods.item_name}*{goods.item_count}
                                          </View>
                                        )
                                      })
                                    }
                                    <View className='goods-status'>{item.status}</View>
                                  </View>
                              }
                            </View>
                          )
                        })}
                    </ScrollView>
                  </View>
                </View>
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
                  <View className='choose-gift' onClick={this.chooseGift}>选择礼包: <Text className='right'>{this.giftNameList[present_id -8195]}></Text></View>
                  <View className='choose-address' onClick={this.chooseAddress}>选择地址:<Text className='right'>{this.state.currentAddress?this.state.currentAddress.province+this.state.currentAddress.city+this.state.currentAddress.county +this.state.currentAddress.adrdetail:''}></Text></View>
                  <View className='code-inner'><Text>会员发放时间</Text><Text>立即到账</Text></View>
                </View>
                {grade_name === '至尊会员'?
                  <View >
                    <View className='vip-1-button'>
                      <View className='vip-1-button-dec'><Text className='vip-1-button-dec-1'>至尊会员</Text><Text className='vip-1-button-dec-2'>低至￥<Text className='vip-1-button-dec-3'>0.8</Text>元/每天</Text></View>
                      <View className='vip-1-button-click' onClick={this.handleCharge}>{grade_name === '至尊会员'?value === ''?'立即支付￥ 299':'立即激活':''}</View>
                    </View>
                  </View>
                  :
                  <View >
                    <View className='vip-2-button'>
                      <View className='vip-2-button-dec'><Text className='vip-1-button-dec-1'>王者身份</Text><Text className='vip-2-button-dec-2'>享受返佣</Text></View>
                      <View className='vip-2-button-click' onClick={this.handleCharge}>立即支付</View>
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
