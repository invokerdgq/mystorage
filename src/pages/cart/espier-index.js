import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { SpCheckbox, SpNote, TabBar, Loading, Price, NavBar, GoodsItem } from '@/components'
import { log, navigateTo, pickBy, classNames ,calCommonExp} from '@/utils'
import debounce from 'lodash/debounce'
import api from '@/api'
import S from '@/spx'
import { withPager } from '@/hocs'
import CartItem from './comps/cart-item'
import NavGap from "../../components/nav-gap/nav-gap"

import './espier-index.scss'

@connect(({ cart, colors }) => ({
  list: cart.list,
	cartIds: cart.cartIds,
	showLikeList: cart.showLikeList,
  colors: colors.current
}), (dispatch) => ({
  onUpdateCart: (list) => dispatch({ type: 'cart/update', payload: list }),
  onUpdateCartCount: (count) => dispatch({ type: 'cart/updateCount', payload: count })
}))
@withPager
export default class CartIndex extends Component {
  static defaultProps = {
    list: null,
  }

  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      loading: true,
      cartMode: 'default',
      curPromotions: null,
      groups: [],
      likeList: [],
      invalidList: [],
      error: null,
      isPathQrcode: false
    }

    this.updating = false
    this.lastCartId = null
  }

  componentDidMount () {
    // console.log(this.$router.params, 48)
    // if(this.$router.params && this.$router.params.path === 'qrcode') {
    //   this.setState({
    //     isPathQrcode: true
    //   })
    // }
    // this.nextPage()
    //
    // if (!S.getAuthToken()) return
    //
    // this.fetchCart((list) => {
    //   const groups = this.resolveActivityGroup(list)
    //   // this.props.list 此时为空数组
    //   setTimeout(() => {
    //     this.setState({
    //       groups,
    //       loading: false
    //     })
    //   }, 40)
    // })
  }

  componentDidShow () {
    console.log(this.$router.params, 48)
    if(this.$router.params && this.$router.params.path === 'qrcode') {
      this.setState({
        isPathQrcode: true
      })
    }
    this.nextPage()

    if (!S.getAuthToken()) return

    this.fetchCart((list) => {
      const groups = this.resolveActivityGroup(list)
      // this.props.list 此时为空数组
      setTimeout(() => {
        this.setState({
          groups,
          loading: false
        })
      }, 40)
    })
    if (!S.getAuthToken() || this.state.loading) return
    this.updateCart()
  }

  componentWillReceiveProps (nextProps) {
		console.log('componentWillReceiveProps',nextProps.list , this.props.list,nextProps.list !== this.props.list)

    // if (nextProps.list !== this.props.list) {
		// 	const groups = this.resolveActivityGroup(nextProps.list)
		// 		this.setState({
		// 			groups
		// 		})
		// }
		const groups = this.resolveActivityGroup(nextProps.list)
				this.setState({
					groups
				})
  }

  handleLoginClick = () => {
    S.login(this)
  }

  handleClickItem = (item) => {
    const url = `/pages/item/espier-detail?id=${item.item_id}`
    Taro.navigateTo({
      url
    })
  }

  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    const query = {
      page,
      pageSize
    }
    const { list, total_count: total } = await api.cart.likeList(query)

    const nList = pickBy(list, {
      img: 'pics[1]',
      item_id: 'item_id',
      promotion_activity_tag: 'promotion_activity',
      price: ({price}) => (price/100).toFixed(2),
      member_price: ({ member_price }) => (member_price/100).toFixed(2),
      market_price: ({ market_price }) => (market_price/100).toFixed(2),
      title: 'itemName',
			desc: 'brief'
    })

    this.setState({
      likeList: [...this.state.likeList, ...nList],
    })

    if (!S.getAuthToken()) {
      this.setState({
        loading: false
      })
    }

    return {
      total
    }
  }

  // 活动分组
  resolveActivityGroup (cartList) {
    const groups = cartList.map(shopCart => {
      const { list, used_activity = [] } = shopCart
      const tDict = list.reduce((acc, val) => {
        acc[val.cart_id] = val
        return acc
			}, {})
			const activityGrouping = shopCart.activity_grouping
			// 活动列表
      const group = used_activity.map((act) => {
        const activity = activityGrouping.find(a => String(a.activity_id) === String(act.activity_id))
        const itemList = activity.cart_ids.map(id => {
          const cartItem = tDict[id]
          delete tDict[id]
          return cartItem
				})
				// return Object.assign({},shopCart,{list: itemList,activity})
				return {list: itemList,activity}
			})
      // 无活动列表
			group.push({activity: null, list: Object.values(tDict) })
			// console.log('group',group)
      return {shopInfo:shopCart,group}
    })
    return groups
  }

  processCart ({ valid_cart = [], invalid_cart = [] }) {
		let cartCount = 0
    const list = valid_cart.map(shopCart => {
			cartCount += shopCart.cart_total_num
      const tList = this.transformCartList(shopCart.list)
      return {
        ...shopCart,
        list: tList
      }
    })

    const invalidList = this.transformCartList(invalid_cart)
    this.setState({
      invalidList
    })

    log.debug('[cart fetchCart]', list)
    this.props.onUpdateCart(list)
		this.props.onUpdateCartCount(cartCount)

    return list
  }

  async fetchCart (cb) {
    let valid_cart = [], invalid_cart = []
    const { type = 'distributor' } = this.$router.params
    const params = {shop_type: type}
    try {
			const res = await api.cart.get(params)
      valid_cart = res.valid_cart || valid_cart
      invalid_cart = res.invalid_cart || invalid_cart
    } catch (e) {
      this.setState({
        error: e.message
      })
    }

    const list = this.processCart({
      valid_cart,
      invalid_cart
    })
    cb && cb(list)
  }

  updateCart = async () => {
    Taro.showLoading({
      mask: true
    })
    this.updating = true
    try {
			await this.fetchCart()
    } catch (e) {
      console.log(e)
		}
    this.updating = false
    Taro.hideLoading()
  }

  asyncUpdateCart = debounce(async () => {
    await this.updateCart()
  }, 300)


  toggleCartMode = () => {
    const cartMode = this.state.cartMode !== 'edit' ? 'edit' : 'default'
    this.setState({
      cartMode
    })
  }


  async handleSelectionChange (shopIndex,cart_id, checked) {

    await api.cart.select({
      cart_id,
      is_checked: checked
    })
    this.updateCart()
  }

  handleDelect = async (cart_id) => {
    const res = await Taro.showModal({
      title: '提示',
      content: '将当前商品移出购物车?',
      showCancel: true,
      cancel: '取消',
      confirmText: '确认',
      confirmColor: '#0b4137'
    })
    if (!res.confirm) return

    await api.cart.del({ cart_id })

    const cartIds = this.props.cartIds.filter(t => t !== cart_id)

		this.updateCart()
  }

  async changeCartNum (shop_id,cart_id, num) {
    const { type = 'distributor' } = this.$router.params
		try {
			const res = await api.cart.updateNum(shop_id,cart_id, num, type)
			this.processCart(res)
		}catch(e){
			Taro.showToast({
				icon: 'none',
				title: e.message,
				duration: 5000
			})
		}
    this.updateCart()
  }

  handleQuantityChange = async (shop_id,item, num, e) => {
		const { type = 'distributor' } = this.$router.params
		await api.cart.updateNum(shop_id,item.cart_id, num, type)
		this.updateCart()
  }

  handleAllSelect = async (checked,shopIndex) => {
		const  {cartIds}  = this.props

    Taro.showLoading()
    try {
      await api.cart.select({
        cart_id: cartIds[shopIndex],
        is_checked: checked
      })
    } catch (e) {
      console.log(e)
    }
    Taro.hideLoading()
		this.updateCart()
  }

  handleClickPromotion = (cart_id, e) => {
		return // 活动不需要选择
    this.isTodetail = 0
    let promotions
    this.props.list.some((cart) => {
      cart.list.some(item => {
        if (item.cart_id === cart_id) {
          promotions = item.promotions.slice()
        }
      })
    })

    this.setState({
      curPromotions: promotions
    },() =>{
      this.isTodetail = 1
    })
  }

  handleClickToDetail = (item_id) => {
    if(this.isTodetail === 0){
      return false
    }
    this.isTodetail = 1
    Taro.navigateTo({
      url: `/pages/item/espier-detail?id=${item_id}`
    })
  }

  handleSelectPromotion = async (item) => {
    const { marketing_id: activity_id, cart_id } = item
    Taro.showLoading({
      mask: true
    })
    this.setState({
      curPromotions: null
    })
    await api.cart.updatePromotion({
      activity_id,
      cart_id
    })
    await this.fetchCart()
    Taro.hideLoading()
  }

  handleClosePromotions = () => {
    this.setState({
      curPromotions: null
    })
  }

  handleCheckout = (shopCart) => {
    const { shop_id, is_delivery, is_ziti, shop_name, address, lat, lng, hour, mobile } = shopCart.shopInfo
    const { type } = this.$router.params
    if (this.updating) {
      Taro.showToast({
        title: '正在计算价格，请稍后',
        icon: 'none'
      })
      return
    }
    Taro.navigateTo({
      url: `/pages/cart/espier-checkout?cart_type=cart&type=${type}&shop_id=${shop_id}&is_delivery=${is_delivery}&is_ziti=${is_ziti}&name=${shop_name}&store_address=${address}&lat=${lat}&lng=${lng}&hour=${hour}&phone=${mobile}`
    })
  }



  transformCartList (list) {
    return pickBy(list, {
      item_id: 'item_id',
      cart_id: 'cart_id',
      activity_id: 'activity_id',
      title: 'item_name',
      is_delivery: 'is_delivery',
      is_ziti: 'is_ziti',
      desc: 'brief',
      is_checked: 'is_checked',
      store: 'store',
      curSymbol: 'cur.symbol',
      promotions: ({ promotions = [], cart_id }) => promotions.map(p => {
        p.cart_id = cart_id
        return p
      }),
      img: ({ pics }) => pics,
      price: ({ price }) => (+price / 100).toFixed(2),
      market_price: ({ market_price }) => (+market_price / 100).toFixed(2),
			num: 'num',
			packages: (item) => item.packages && item.packages.length && this.transformCartList(item.packages),
			item_spec_desc:'item_spec_desc'
    })
  }

  navigateTo = (...args) => {
    navigateTo.apply(this, args)
  }

  handleToQrcode = () => {
    Taro.navigateBack()
  }

  render () {
    const { groups, invalidList, cartMode, loading, curPromotions, likeList, page, isPathQrcode } = this.state
    const { list, showLikeList, colors } = this.props

    if (loading) {
      return <Loading />
    }
    const { type = 'distributor' } = this.$router.params
    const isDrug = type === 'drug'
    const isEmpty = !list.length
    return (
      <View>
        <NavGap
        title="购物车"
        />
        <View className={classNames('page-cart-index', isDrug && 'is-drug')}>
          {/*<NavBar*/}
          {/*  title='购物车'*/}
          {/*  leftIconType='chevron-left'*/}
          {/*  fixed='true'*/}
          {/*/>*/}
          {
            !S.getAuthToken()
              ? <View className='login-header'>
                <View>授权登录后同步购物车的商品</View>
                <View
                  className='btn-login'
                  onClick={this.handleLoginClick.bind(this)}
                  // style={`background: ${colors.data[0].primary}`}
                >授权登录</View>
              </View>
              : null
          }

          <ScrollView
            className={`${isEmpty ? 'hidden-scroll' : 'cart-list__scroll'}`}
            onScrollToLower={this.nextPage}
            scrollY
          >
            {
              // !isEmpty && (
              //   <View className='cart-list__actions'>
              //     <Text
              //       clasName='btn-cart-mode'
              //       onClick={this.toggleCartMode}
              //     >{cartMode === 'edit' ? '完成' : '编辑'}</Text>
              //   </View>
              // )
            }
            <View className='cart-list'>
              {

                groups.map((shopCart, shopIndex) => {
                  // console.log('shopCart---->',shopCart)
                  const checked_all = shopCart.shopInfo.cart_total_count == shopCart.shopInfo.list.length
                  return (
                    <View
                      className='cart-list__shop'
                      key={shopIndex}
                    >
                      { // 购物车名字   一个购物车 一个人可以产生多个购物车 每个购物车中可以有多件物品
                        shopCart.shopInfo.shop_name
                          ? <View className='shop__name'>
                            <Text className='icon-shop'></Text>
                            {shopCart.shopInfo.shop_name}
                          </View>
                          : null
                      }
                      <View className='shop__wrap'>
                        {
                          shopCart.group.map(activityGroup => {
                            // console.log('activityGroup---->',activityGroup)
                            const { activity } = activityGroup

                            return activityGroup.list.length > 0 && (
                              <View
                                className='cart-group'
                                key={shopCart.shopInfo.shop_id}
                              >
                                {activity && (
                                  <View className='cart-group__activity'>
                                    <View
                                      className='cart-group__activity-item'
                                    >
                                      <Text className='cart-group__activity-label'>{activity.activity_tag}</Text>
                                      <Text>{activity.activity_name}</Text>
                                    </View>
                                  </View>
                                )}
                                {
                                  activityGroup.list.map((item) => {
                                    // console.log('item',item)
                                    return (
                                      <View className='cart-group__item-wrap'>
                                        <CartItem
                                          key={item.cart_id}
                                          info={item}
                                          onNumChange={this.handleQuantityChange.bind(this, shopCart.shopInfo.shop_id,item)}
                                          onClickPromotion={this.handleClickPromotion.bind(this, item.cart_id)}
                                          onClickImgAndTitle={this.handleClickToDetail.bind(this, item.item_id)}
                                        >
                                          <View className='cart-item__act'>
                                            <SpCheckbox
                                              key={item.item_id}
                                              checked={item.is_checked}
                                              onChange={this.handleSelectionChange.bind(this,shopIndex, item.cart_id)}
                                            />
                                            <View
                                              className='icon-close iconfont'
                                              onClick={this.handleDelect.bind(this, item.cart_id,shopIndex)}
                                            />
                                          </View>
                                        </CartItem>
                                        {item.packages && item.packages.length && (
                                          <View class='cart-item__packages'>
                                            {item.packages.map(pack => {
                                              return (
                                                <CartItem
                                                  isDisabled
                                                  num
                                                  key={pack.package_id}
                                                  info={pack}
                                                />
                                              )
                                            })}
                                          </View>
                                        )}
                                      </View>
                                    )
                                  })
                                }
                                {activity && activity.gifts && (
                                  <View className='cart-group__gifts'>
                                    <View className='cart-group__gifts-hd'>赠品</View>
                                    <View className='cart-group__gifts-bd'>
                                      {activity.gifts.map(gift => {
                                        return (
                                          <View
                                            className='gift-item'
                                            key={gift.item_id}
                                          >
                                            <Image
                                              className='gift-item__img'
                                              src={gift.pics[0]}
                                              mode='aspectFill'
                                            />
                                            <View className='gift-item__title'>{gift.item_name}</View>
                                            <Text className='gift-item__num'>x{gift.gift_num}</Text>
                                          </View>
                                        )
                                      })}
                                    </View>
                                  </View>
                                )}
                              </View>
                            )
                          })
                        }


                        <View className={`toolbar cart-toolbar ${isEmpty && 'hidden'}`}>
                          {
                            <View className='cart-toolbar__hd'>
                              <SpCheckbox
                                // checked={this.isTotalChecked[shopIndex]}
                                checked={checked_all}
                                onChange={this.handleAllSelect.bind(this,!checked_all,shopIndex)}
                              >全选</SpCheckbox>
                            </View>
                          }
                          {
                            cartMode !== 'edit'
                              ? <View className='cart-toolbar__bd'>
                                <View className='cart-total'>
                                  {list.length && shopCart.shopInfo.discount_fee > 0 && (
                                    <View className='cart-total__discount'>
                                      <Text className='cart-total__hint'>优惠：</Text>
                                      <Price
                                        primary
                                        value={-1 * Number(shopCart.shopInfo.discount_fee )}
                                        unit='cent'
                                      />
                                    </View>
                                  )}
                                  <View className='cart-total__total'>
                                    <Text className='cart-total__hint'>总计：</Text>
                                    <Price
                                      primary
                                      value={Number(shopCart.shopInfo.total_fee)}
                                      unit='cent'
                                    />
                                  </View>
                                </View>
                                <Button
                                  type='primary'
                                  className='btn-checkout'
                                  // style={`background: ${colors.data[0].primary}`}
                                  disabled={shopCart.shopInfo.cart_total_count <= 0}
                                  onClick={this.handleCheckout.bind(this, shopCart)}>
                                  {isDrug ? '立即预约' : `结算(${list[0].list.length})`}
                                </Button>
                              </View>
                              : <View className='cart-toolbar__bd'>
                                <AtButton
                                  type='primary'
                                  className='btn-checkout'
                                  onClick={this.handleDelect}
                                >删除</AtButton>
                              </View>
                          }
                        </View>
                      </View>
                    </View>
                  )
                })
              }

              {
                (!groups.length || this.state.error) && (
                  <View>
                    <View style='margin-bottom: 20px'>
                      <SpNote img='cart_empty.png'>快去给我挑点宝贝吧~</SpNote>
                    </View>
                    <AtButton
                      className='btn-rand'
                      type='primary'
                      circle
                      onClick={this.navigateTo.bind(this, APP_HOME_PAGE, true)}
                    >去逛逛</AtButton>
                  </View>
                )
              }
            </View>
            {invalidList.length >0 && (
              <View className='cart-list cart-list__disabled'>
                <View className='cart-list__hd'><Text>已失效</Text></View>
                <View className='cart-list__bd'>
                  {invalidList.map(item => {
                    return (
                      <CartItem
                        isDisabled
                        key={item.cart_id}
                        info={item}
                      >
                        <View className='cart-item__act'>
                          <View/>
                          <View
                            className='icon-close iconfont'
                            onClick={this.handleDelect.bind(this, item.cart_id)}
                          />
                        </View>
                      </CartItem>
                    )
                  })}
                </View>
              </View>
            )}
            {
              !isDrug && likeList.length && showLikeList
                ? <View className='cart-list cart-list__disabled'>
                  <View className='cart-list__hd like__hd'><Text className='cart-list__title'>猜你喜欢</Text></View>
                  <View className='goods-list goods-list__type-grid'>
                    {
                      likeList.map(item => {
                        return (
                          <View className='goods-list__item'>
                            <GoodsItem
                              key={item.item_id}
                              info={item}
                              onClick={this.handleClickItem.bind(this, item)}
                            />
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
                : null
            }
            {
              page.isLoading
                ? <Loading>正在加载...</Loading>
                : null
            }
          </ScrollView>

          {/*
              PathQrcode ??????????????????????????????
          */
            isPathQrcode && (
              <View className='qrcode-bg' onClick={this.handleToQrcode.bind(this)}>
                <Image mode='widthFix' src='/assets/imgs/ic_scanning.png' className='qrcode-bg__img'/>
                <Text>继续添加</Text>
              </View>
            )
          }

          <AtActionSheet
            title='请选择商品优惠'
            isOpened={Boolean(curPromotions)}
            onClose={this.handleClosePromotions}
          >
            {curPromotions && curPromotions.map(item => {
              return (
                <AtActionSheetItem
                  key={item.marketing_id}
                  onClick={this.handleSelectPromotion.bind(this, item)}
                ><Text className='cart-promotion__label'>{item.promotion_tag}</Text><Text>{item.marketing_name}</Text></AtActionSheetItem>
              )
            })}
          </AtActionSheet>

          {/*{*/}
          {/*  !isDrug*/}
          {/*  && <TabBar />*/}
          {/*}*/}
          {
            process.env.TARO_ENV === 'weapp'?null:!isDrug &&
              <TabBar />
          }
        </View>
      </View>

    )
  }
}
