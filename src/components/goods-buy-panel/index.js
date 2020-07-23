import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
// import { AtInputNumber } from 'taro-ui'
// import find from 'lodash/find'
import { Price } from '@/components'
import InputNumber from '@/components/input-number'
import { classNames, pickBy, log, isNumber } from '@/utils'
import api from '@/api'

import './index.scss'

@connect(({ colors }) => ({
  colors: colors.current
}))

export default class GoodsBuyPanel extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    level:'',
    assist_id:'',
    info: null,
    isOpened: false,
    type: 'fastbuy',
    orderType: 'normal',
    fastBuyText: '立即购买',
    busy: false,
    isexchange:false,
    onClose: () => {},
    onChange: () => {},
    onClickAddCart: () => {},
    onClickFastBuy: () => {},
    onSubmit: () => {}
  }

  constructor (props) {
    super(props)

    this.state = {
      marketing: 'normal',
      selection: [],
      promotions: [],
      activity: null,
      curSku: null,
      curImg: null,
      curLimit: false,
      quantity: 1,
      isActive: props.isOpened,
      colorStyle: ''
    }

    this.disabledSet = new Set()
  }

  componentDidMount () {
		const { info } = this.props
    const { spec_items, promotion_activity, activity_info = null, activity_type } = info

    if (promotion_activity) {
      const promotions = pickBy(promotion_activity, {
        condition_rules: 'condition_rules',
        promotion_tag: 'promotion_tag',
        items: 'items'
      })
      this.setState({
        promotions
      })
    }

    if (activity_info && activity_type === 'limited_buy') {
      const activity = pickBy([activity_info], {
        items: 'items',
        rule: 'rule'
      })
      this.setState({
        activity: activity[0]
      })
    }

    const marketing = info.activity_type
      ? info.activity_type
			: 'normal'

    const skuDict = {}

    spec_items.forEach(t => {
      const key = t.item_spec.map(s => s.spec_value_id).join('_')
      const propsText = t.item_spec.map(s => s.spec_value_name).join(' ')
      t.propsText = propsText
      skuDict[key] = t
    })
    const selection = Array(info.item_spec_desc.length).fill(null)
    this.skuDict = skuDict
    this.setState({
      marketing,
      selection
    })

    if (!spec_items || !spec_items.length) {
      this.noSpecs = true
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened } = nextProps
    if (isOpened !== this.state.isActive) {
      this.setState({
        isActive: isOpened
      })
    }
  }

  getSkuProps = () => {
    const { info } = this.props
    if (!info) return ''

    const { curSku } = this.state
    let propsText = ''

    if (this.noSpecs) {
      return ''
    }

    if (!curSku) {
      return `请选择`
    }

    propsText = curSku.propsText
    return `已选 “${propsText}”`
  }

  calcDisabled (selection) {
    const skuDict = this.skuDict
    const disabledSet = new Set()
    const makeReg = (sel, row, val) => {
      const tSel = sel.slice()
      const regStr = tSel.map((s, idx) => row === idx
        ? val
        : !s ? '(\\d+)' : s
      ).join('_')

      return new RegExp(regStr)
    }

    const isNotDisabled = (sel, row, val) => {
      const reg = makeReg(sel, row, val)

      return Object.keys(skuDict).some(key => {
        return key.match(reg) && skuDict[key].store > 0
      })
    }

    const { info } = this.props
    for (let i = 0, l = info.item_spec_desc.length; i < l; i++) {
      const { spec_values } = info.item_spec_desc[i]
      for (let j = 0, k = spec_values.length; j < k; j++) {
        const id = spec_values[j].spec_value_id
        if (!disabledSet.has(id) && !isNotDisabled(selection, i, id)) {
          disabledSet.add(id)
        }
      }
    }

    this.disabledSet = disabledSet
  }

  getCurSkuImg (sku) {
    let img = this.props.info.pics[0]
    if (!sku) {
      return img
    }

    sku.item_spec.some(s => {
      if (s.spec_image_url) {
        img = s.spec_image_url
        return true
      }
    })
    return img
  }

  updateCurSku (selection) {
    const { info } = this.props
    const { activity } = this.state
    const { activity_type } = info

    selection = selection || this.state.selection
    this.calcDisabled(selection)
    if (selection.some(s => !s)) {
      this.setState({
        curSku: null,
        curImg: null
      })
      this.props.onChange(null)
      return
    }

    const curSku = this.skuDict[selection.join('_')]
    const curImg = this.getCurSkuImg(curSku)

    this.setState({
      curSku,
      curImg
    })

    if (activity && info.activity_type === 'limited_buy') {
      const validItem = activity.items.find(n => n.item_id === curSku.item_id)
      this.setState({
        curLimit: validItem ? true : false
      })
    }

    this.props.onChange(curSku)
    log.debug('[goods-buy-panel] updateCurSku: ', curSku)
  }

  handleImgClick = () => {
    const { curSku, info } = this.state
    if (!curSku) return

    const { item_spec } = curSku
    const { item_image_url, spec_image_url } = item_spec[0]
    const { pics } = info

    let imgs = []
    if (item_image_url.length || spec_image_url) {
      imgs = item_image_url.length > 0 ? item_image_url : [spec_image_url]
    } else {
      imgs = pics
    }

    Taro.previewImage({
      urls: imgs
    })
  }

  handleQuantityChange = (val) => {
    this.setState({
      quantity: val
    })
  }

  handleSelectSku = (item, idx) => {
    if (this.disabledSet.has(item.spec_value_id)) return

    const { selection } = this.state
    if (selection[idx] === item.spec_value_id) {
      selection[idx] = null
    } else {
      selection[idx] = item.spec_value_id
    }

    this.updateCurSku(selection)
    this.setState({
      selection
    })
  }

  toggleShow = (isActive) => {
    if (isActive === undefined) {
      isActive = !this.state.isActive
    }

    this.setState({ isActive })
    this.props.onClose && this.props.onClose()
  }

  handleBuyClick = async (type, skuInfo, num) => {
    console.warn(this.props)
    if (this.state.busy) return

    const { marketing, info } = this.state
    const { special_type } = info
    const isDrug = special_type === 'drug'
    const { item_id } = this.noSpecs ? info : skuInfo
    const { distributor_id } = info
    let url = `/pages/cart/espier-checkout`

    this.setState({
      busy: true
    })

    if (type === 'cart') {
      url = `/pages/cart/espier-index`
      try {
        await api.cart.add({
          item_id,
          num,
          distributor_id,
          shop_type: isDrug ? 'drug' : 'distributor'
				})
				Taro.showToast({
					title: '成功加入购物车',
					icon: 'success'
				})
      } catch (e) {
        console.log(e)
      }

      this.setState({
        busy: false
      })

      this.props.onAddCart(item_id, num)
    }


    if (type === 'fastbuy') {
      url += `?cart_type=fastbuy&shop_id=${distributor_id}`
      if (marketing === 'group') {
        const { groups_activity_id } = info.activity_info
        url += `&type=${marketing}&group_id=${groups_activity_id}`
      } else if (marketing === 'seckill' || marketing === 'limited_time_sale') {
        const { seckill_id } = info.activity_info
        const { ticket } = await api.item.seckillCheck({ item_id, seckill_id, num }).catch(res => {
          this.setState({
            busy: false
          })
        })
        url += `&type=${marketing}&seckill_id=${seckill_id}&ticket=${ticket}`
      }else if(marketing === 'assist'){
        url += `&type=${marketing}&assist_id=${this.props.assist_id}&level=${this.props.level}`
      }

      try {
        await api.cart.fastBuy({
          item_id,
          num
        })
      } catch (e) {
       Taro.showToast({
         title:`${e.message}`,
         icon:"none",
         duration:1500
       })
        this.setState({
          busy: false
        })
        return
      }
      this.setState({
        busy: false
      })
      this.props.onFastbuy(item_id, num)
      if(this.props.isexchange){
        url += '&source=exchange'
      }
      Taro.navigateTo({
        url
      })
    }

    if (type === 'pick') {
      //const { info } = this.props
      //info.checked_spec = skuInfo
      this.setState({
        busy: false
      }, () => {
        this.props.onClose()
        this.props.onSubmit(skuInfo)
      })
    }

  }

  render () {
    const { info, type, fastBuyText, colors,isexchange } = this.props
		const { curImg, quantity, selection, isActive, busy, curSku, marketing, promotions, activity, curLimit } = this.state
    if (!info) {
      return null
    }
    const { special_type } = info
    const isDrug = special_type === 'drug'
    const curSkus = this.noSpecs ? info : curSku
    //console.warn('356',curSkus)

    const maxStore = +(curSkus ? curSkus.store : (info.store || 99999))
    const hasStore = curSkus ? curSkus.store > 0 : info.store > 0

    let price = '', marketPrice = '', ruleDay = 0
    if (curSkus) {
      price = curSkus.act_price ? curSkus.act_price : curSkus.member_price ? curSkus.member_price : curSkus.price
      //marketPrice = curSkus.act_price || curSkus.member_price ? curSkus.member_price : curSkus.market_price
      marketPrice = curSkus.market_price
      if (info.activity_type === 'limited_buy') {
        ruleDay = JSON.parse(activity.rule.day)
      }
    } else {
      price = info.act_price ? info.act_price : info.member_price ? info.member_price : info.price
      //marketPrice = info.act_price || info.member_price ? info.member_price : info.market_price
      marketPrice = info.market_price
    }

    return (
      <View className={classNames('goods-buy-panel', isActive ? 'goods-buy-panel__active' : null)}>
        <View className='goods-buy-panel__overlay'></View>

        <View className='goods-buy-panel__wrap'>
          <View
            className='at-icon at-icon-close'
            onClick={() => this.toggleShow(false)}
          />
          <View className='goods-buy-panel__hd'>
            <View
              className='goods-img__wrap'
              onClick={this.handleImgClick.bind(this)}
              >
              <Image
                className='goods-img'
                mode='aspectFill'
                src={curImg || info.pics[0]}
              />
            </View>
						<View className='goods-sku__price'>
						  <Price
                className='price'
								primary
                symbol='¥'
								unit='cent'
								value={price}
							/>
            {
              marketPrice &&
                <Price
                  className='price-market'
                  symbol='¥'
                  unit='cent'
                  value={marketPrice}
                />
            }
            </View>
            <View className='goods-sku__info'>
              {
                this.noSpecs
                  ? (<Text className='goods-sku__props'>{info.item_name}</Text>)
                  :(<Text className='goods-sku__props'>
                      <Text>{curSkus ? `已选择 ${curSkus.propsText}` : '请选择规格'}</Text>
                    </Text>)
              }
              {
                curSku &&
                  <View className='goods-sku__limit'>
                    <Text className='goods-sku__stock'>库存{curSku.store}{info.unit}</Text>
                    {
                      activity && curLimit
                        ? <Text>
                            {
                              ruleDay
                                ? <Text>每{ruleDay}天</Text>
                                : null
                            }
                            <Text>限购{activity.rule.limit}件</Text>
                          </Text>
                        : null
                    }
                  </View>
              }
            </View>
          </View>
          {
            curSkus &&
              <View className='promotions'>
                {
                  promotions.map(item =>
                    item.items[curSkus.item_id] &&
                      <View key={item.items[curSkus.item_id]} className='promotions__item'>
                        <Text className='promotions__item-tag'>{item.promotion_tag}</Text>
                        <Text className='promotions__item-title'>{item.condition_rules}</Text>
                      </View>
                  )
                }
              </View>
          }
          <View className='goods-buy-panel__bd'>
            <ScrollView
              className='goods-skus__wrap'
            >
              {
                info.item_spec_desc.map((spec, idx) => {
                  return (
                    <View
                      className='sku-item__group'
                      key={spec.spec_id}
                    >
                      {info.item_spec_desc.length > 1 && (<Text className='sku-item__group-hd'>{spec.spec_name} :</Text>)}
                      <View className='sku-item__group-bd'>
                        {
                          spec.spec_values.map(sku => {
                            return (
                              <Text
                                className={classNames('sku-item', { 'is-active': sku.spec_value_id === selection[idx], 'is-disabled': this.disabledSet.has(sku.spec_value_id) })}
                                key={sku.spec_value_id}
                                onClick={this.handleSelectSku.bind(this, sku, idx)}
                              >{sku.spec_value_name}</Text>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
            {
              type !== 'pick' &&
                <View className={`${info.item_spec_desc.length === 0?'':'add-top'} goods-quantity__wrap`}>
                  <Text className='goods-quantity__hd'>购买数量 ：</Text>
                  <View className='goods-quantity__bd'>
                    <InputNumber
                      min={1}
                      max={isexchange?1:maxStore}
                      value={quantity}
                      onChange={this.handleQuantityChange.bind(this)}
                    />
                  </View>
                </View>
            }
          </View>
          <View className='goods-buy-panel__ft'>
            <View className='goods-buy-panel__btns'>
              {(type === 'cart' && hasStore) && (
                <Button
                  loading={busy}
                  className={classNames('goods-buy-panel__btn btn-add-cart', { 'is-disabled': !curSkus })}
                  // style={`background: ${colors.data[0].accent}`}
                  onClick={this.handleBuyClick.bind(this, 'cart', curSkus, quantity)}
                  disabled={Boolean(!curSkus)}
                >{isDrug ? '加入药品清单' : '加入购物车'}</Button>
              )}
              {(type === 'fastbuy' && hasStore) && (
                <Button
                  loading={busy}
                  className={classNames('goods-buy-panel__btn btn-fast-buy', { 'is-disabled': !curSkus })}
                  // style={`background: ${colors.data[0].primary}`}
                  onClick={this.handleBuyClick.bind(this, 'fastbuy', curSkus, quantity)}
                  disabled={Boolean(!curSkus)}
                >{fastBuyText}</Button>
              )}
              {(type === 'pick' && hasStore) && (
                <Button
                  loading={busy}
                  className={classNames('goods-buy-panel__btn btn-fast-buy', { 'is-disabled': !curSkus })}
                  // style={`background: ${colors.data[0].primary}`}
                  onClick={this.handleBuyClick.bind(this, 'pick', curSkus, quantity)}
                  disabled={Boolean(!curSkus)}
                >确定</Button>
              )}
              {!hasStore && (<Button disabled className='goods-buy-panel__btn btn-fast-buy'>当前商品无货</Button>)}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
