import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Button ,Input} from '@tarojs/components'
import { Price } from '@/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane} from 'taro-ui'
import api from '@/api'
import S from '@/spx'
import { classNames, pickBy } from '@/utils'
import './vipgrades.scss'
import NavGap from "../../components/nav-gap/nav-gap";

@connect(({ colors }) => ({
  colors: colors.current
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
      value:null
    }
  }

	componentDidMount () {
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

	async fetchInfo () {
		const { cur, list } = await api.vip.getList()
		const { grade_name } = this.$router.params //  跳转之前 会员等级名称
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

		const {list,curTabIdx,curCellIdx} = this.state
		const vip_grade = list[curTabIdx]
		const params = {
			vip_grade_id: vip_grade.vip_grade_id,
			card_type: vip_grade.price_list[curCellIdx].name,
			distributor_id: Taro.getStorageSync('trackIdentity').distributor_id || ''
		}
		Taro.showLoading({ mask: true })

		const data = await api.vip.charge(params)

		Taro.hideLoading()

		var config = data
		var that = this
		wx.requestPayment({
			'timeStamp': '' + config.timeStamp,
			'nonceStr': config.nonceStr,
			'package': config.package,
			'signType': config.signType,
			'paySign': config.paySign,
			'success': function (res) {
				wx.showModal({
					content: '支付成功',
					showCancel: false,
					success: function(res) {
						Taro.navigateTo({
              url:'/pages/member/index'
            })
					}
				})
			},
			'fail': function (res) {
				wx.showModal({
					content: '支付失败',
					showCancel: false
				})
			}
		})
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
	render () {
		const { colors } = this.props
		const { userInfo, list, cur, curTabIdx, userVipInfo, tabList ,value} = this.state
    const {grade_name} = this.$router.params
		return (
		  <View>
        <NavGap title='支付中心'/>
        <View className='container'>
          <View className='header'>
            <View className='header-title'>{this.$router.params.presist?`${grade_name}续费`:`激活${grade_name}`}</View>
            <View className='header-isauth'>
              <Image className='header-isauth__avatar' src={userInfo.avatar} mode='aspectFill'/>
              <View className='header-isauth__info'>
                <View className='nickname'>{userInfo.username}
                <View className='header-grade_name'>{userVipInfo.grade_name}</View>
                  {/*<Image  className='icon-vip' src='/assets/imgs/svip.png' />*/}
                </View>
                {userVipInfo.is_vip&&
                  <View className='mcode'>{userVipInfo.end_time} 到期，购买后有效期将延续</View>
                }
              </View>
            </View>
            {/*<AtTabs className='header-tab'*/}
            {/*        current={curTabIdx}*/}
            {/*        tabList={tabList}*/}
            {/*        onClick={this.handleClickTab} >*/}
            {/*  {*/}
            {/*    tabList.map((panes, pIdx) =>*/}
            {/*      (<AtTabsPane*/}
            {/*        current={curTabIdx}*/}
            {/*        key={pIdx}*/}
            {/*        index={pIdx}*/}
            {/*      >*/}
            {/*      </AtTabsPane>)*/}
            {/*    )*/}
            {/*  }*/}
            {/*</AtTabs>*/}
          </View>
          <View className='section'>
            <View className='section-body'>
              {
                this.$router.params.presist?
                  <View className='body-presist' onClick={this.handleCharge}>
                    确认续费
                  </View>:
                  <View className='section-body-vip'>
                    <View className='card-container'> </View>
                    <View className='code'>
                      {grade_name === '至尊会员'&&
                        <View className='code-inner'><Text>待激活（选填）</Text><Input type='text' placeholder='请输入激活码' placeholderStyle='text-align:right' value={this.state.value} onInput={this.handleValue}/></View>
                      }
                      <View className='code-inner'><Text>会员发放时间</Text><Text>立即到账</Text></View>
                    </View>
                      {grade_name === '至尊会员'?
                        <View className='vip-1-button'>
                          <View className='vip-1-button-dec'><Text className='vip-1-button-dec-1'>至尊会员</Text><Text className='vip-1-button-dec-2'>低至￥<Text className='vip-1-button-dec-3'>0.8</Text>元/每天</Text></View>
                          <View className='vip-1-button-click' onClick={this.handleCharge}>{grade_name === '至尊会员'?value === null?'立即激活￥ 299':'立即激活':''}</View>
                        </View>:
                        <View className='vip-2-button'>
                          <View className='vip-2-button-dec'><Text className='vip-1-button-dec-1'>王者身份</Text><Text className='vip-2-button-dec-2'>待定展示数据</Text></View>
                          <View className='vip-2-button-click' onClick={this.handleCharge}>{grade_name === '王者身份'?'立即激活￥ 299 x 20':''}</View>
                        </View>
                      }
                  </View>

              }

              {/*{*/}
              {/*  cur && cur.rate && cur.rate != 1 && (*/}
              {/*    <View className='text-muted'>*/}
              {/*      <text className='icon-info'></text> 货币汇率：1{cur.title} = {cur.rate}RMB*/}
              {/*    </View>*/}
              {/*  )*/}
              {/*}*/}
              {/*<View className='grade-list'>*/}
              {/*  {*/}
              {/*    list[curTabIdx]&&list[curTabIdx].price_list.map((item,index) => {*/}
              {/*      return (*/}
              {/*        (item.price != 0 && item.price != null)&&(*/}
              {/*          <View className={`grade-item ${index == curCellIdx && 'active'}`} key={index} onClick={this.checkHandle.bind(this,index)}>*/}
              {/*            <View className='item-content'>*/}
              {/*              <View className='desc'>{item.desc}</View>*/}
              {/*              <View className='amount'>*/}
              {/*                <Price primary value={Number(item.price)} />*/}
              {/*              </View>*/}
              {/*            </View>*/}
              {/*          </View>*/}
              {/*        )*/}
              {/*      )*/}
              {/*    })*/}
              {/*  }*/}
              {/*</View>*/}
              {/*<Button className='pay-btn' onClick={this.handleCharge}>立即支付</Button>*/}
              {/*<View className='content-v-padded'>会员权益</View>*/}
              {/*<View className='text-muted'>*/}
              {/*  {*/}
              {/*    list[curTabIdx] && list[curTabIdx].description.split('\n').map((item,index)=> {*/}
              {/*      return (*/}
              {/*        <View key={index}>{item}</View>*/}
              {/*      )*/}
              {/*    })*/}
              {/*  }*/}
              {/*</View>*/}
            </View>
          </View>
        </View>
      </View>
		)
	}

}
