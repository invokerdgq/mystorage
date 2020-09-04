import Taro, { Component } from '@tarojs/taro'
import {View, Text, Switch,Input} from '@tarojs/components'
import NavGap from "../../../components"
import api from '@/api'
import './popularize.scss'

export default class SetPopularize extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info:{
        shop_rebate:0
      },
      rebateSpecItems:[],
      fill:{
        is_money:false,
        value:''
      }
    }
  }
  componentWillMount() {
   const {itemId} = this.$router.params
    this.getItemInfo(itemId)
  }
  async getItemInfo(id){
    const res = await api.store.getItemsDetail(id)
    this.setState({
      info:res
    })
    this.handleRebateConf(id)
  }

  handleRebateConf(id) {
    api.store.getItemsDetail(id,{page:1, pageSize:1000, is_sku:true, item_id:id, item_type: 'normal'}).then(res => {
      let rebateSpecItems = []
      res.list.forEach(item => {
        if (item.shop_rebate_conf.length === 0 ) {
          item.shop_rebate_conf = {}
          item.shop_rebate_conf.type = 'ratio'
          item.shop_rebate_conf.rebate_task_type = 'ratio'
          item.shop_rebate_conf.value = {}
          item.shop_rebate_conf.value['first_level'] = ''
          item.shop_rebate_conf.value['second_level'] = 0
        }

        if (!item.shop_rebate_conf.rebate_task) {
          item.shop_rebate_conf.rebate_task = []
          for( let n in [0,1,2] ) {
            item.shop_rebate_conf.rebate_task[n] = {}
            item.shop_rebate_conf.rebate_task[n].filter = ''
            item.shop_rebate_conf.rebate_task[n].ratio = ''
            item.shop_rebate_conf.rebate_task[n].money = ''
          }
        }

        item.shop_rebate_conf.item_id = item.item_id
        rebateSpecItems.push(item)
      })
     this.setState({
       rebateSpecItems:rebateSpecItems
     },() => {
       console.log(this.state.rebateSpecItems)
     })
    })
  }
  handleSwitchChange(){
    this.state.info.shop_rebate = this.state.info.shop_rebate == 1?0:1
    this.setState({
      info:this.state.info
    })
  }
  handleFillSwitchChange(){
    this.state.fill.is_money = !this.state.fill.is_money
    this.setState({
      fill:this.state.fill
    })
  }
  handleSpecInput(index,e){
    this.state.rebateSpecItems[index].shop_rebate_conf.value['first_level'] = e.detail.value
    this.setState({
      rebateSpecItems:this.state.rebateSpecItems
    })
  }
  handleSpecSwitch(index){
    this.state.rebateSpecItems[index].shop_rebate_conf.type = this.state.rebateSpecItems[index].shop_rebate_conf.type === 'ratio'?'money':'ratio'
    this.setState({
      rebateSpecItems:this.state.rebateSpecItems
    })
  }
  handleFill(){
   let list =  this.state.rebateSpecItems.map((item,index) => {
      item.shop_rebate_conf.type = this.state.fill.is_money?'money':'ratio'
     item.shop_rebate_conf.value['first_level'] = this.state.fill.value
     return item
    })
    this.setState({
      rebateSpecItems:list
    })
  }
  handleFillInput(e){
    this.state.fill.value = e.detail.value
    this.setState({
      fill:this.state.fill
    })
  }
   saveRebateConf() {
    let hasEmpty
    this.state.rebateSpecItems.map((item,index) => {
      if(item.shop_rebate_conf.value['first_level'] === ''){
        Taro.showToast({title:`第${index+1}项为空，请填写`,icon:'none',duration:1500})
        hasEmpty = true
      }
    })
     if(hasEmpty) return
    let rebateConf = []
    this.state.rebateSpecItems.forEach((item,index) => {
      let rebate_conf = item.shop_rebate_conf
      rebate_conf.ratio_type = 'profit'
      rebateConf.push(rebate_conf)
    })
     Taro.showLoading({mask:true})
     api.store.updateGoodsInfo({goods_id:this.state.info.goods_id,shop_rebate:this.state.info.shop_rebate}).then(() => {
       api.store.updateItemRebateConf({rebateConf: JSON.stringify(rebateConf), rebate_type: 'default'}).then(res => {
         Taro.hideLoading()
         Taro.showToast({title:'设置成功',icon:'success',duration:1500})
         setTimeout(() => {
           Taro.redirectTo({url:'/marketing/pages/user-store/store-manage'})
         },700)
       })
     })
  }
  checkValid(type,index,e){
    if(!/^[0-9]*(\.)?[0-9]*$/.test(e.detail.value)){
      Taro.showToast({title:'请输入正确的数据',icon:'none',duration:1500})
      if(type === 'fill'){
        this.state.fill.value = ''
        this.setState({
          fill:this.state.fill
        })
      }else{
        this.state.rebateSpecItems[index].shop_rebate_conf.value['first_level'] = ''
        this.setState({
          rebateSpecItems:this.state.rebateSpecItems
        })
      }
    }
  }
  render() {
    const {info,fill,rebateSpecItems} = this.state
    return(
      <View className='popularize'>
        <NavGap title='设置分佣' bg={'#c0534e'} cl={'white'}/>
        <View className='popularize-content'>
          <View className='openPopularize'>
            <View className='openPopularize-top'>
              <Text className='goods-name'>{info.item_name}</Text>
              <Text className='switch-dec'>未开启分佣</Text>
              <Switch checked={info.shop_rebate == 1} color={'#c0534e'} onChange={this.handleSwitchChange.bind(this,'open')} className='spec-switch'/>
            </View>
            <View className='openPopularize-bottom'>
              <View className='iconfont icon-zhuyi'/>
              <Text className='popularize-dec'>
                计算方式：商品销售价 x 百分比 或者为一定金额返佣
              </Text>
            </View>
          </View>
          {info.shop_rebate == 1?
            <View className='popularize-setting'>
              <View className='popularize-setting-top'>
                <Text className='upper'>上级</Text>
                <View className='setting-input'>
                  <Input value={fill.value} className='inner' placeholderStyle={{margin:'0 auto'}} onInput={this.handleFillInput.bind(this)} onBlur={this.checkValid.bind(this,'fill','')}/>
                  <Text className='sign'>{fill.is_money?'元':'%'}</Text>
                </View>
                  <Text className={`radio ${fill.is_money?'unchecked':''}`}>比例</Text>
                  <Switch color={'#c0534e'} checked={fill.is_money} onChange={this.handleFillSwitchChange.bind(this)}/>
                  <Text className={`money ${fill.is_money?'':'unchecked'}`}>金额</Text>
                  <View className='fill' onClick={this.handleFill.bind(this)}>填充</View>
              </View>
              <View className='popularize-setting-bottom'>
                <View className='bottom-item first'>
                  <View className='item-spec'>规格值</View>
                  <View className='item-price fill'>销售价</View>
                  <View className='item-type fill'>类型</View>
                  <View className='item-dec fill'>上级</View>
                </View>
                {
                  rebateSpecItems.length !== 0&&
                  rebateSpecItems.map((item,index) => {
                    return(
                      <View className='bottom-item'>
                        <Text className='item-spec'>{item.item_spec_desc}</Text>
                        <View className='item-price'>￥{Number(item.price)/100}</View>
                        <View className='item-type'>
                          <Text className='radio'>比例</Text>
                          <Switch checked={item.shop_rebate_conf.type === 'money'} color={'#c0534e'} onChange={this.handleSpecSwitch.bind(this,index)}/>
                          <Text>金额</Text>
                        </View>
                        <View className='item-dec'>
                          <Input value={item.shop_rebate_conf.value['first_level']} onchange={this.handleSpecInput.bind(this,index)} className='inner' onBlur={this.checkValid.bind(this,'spec',index)}/>
                          <Text className='sign'>{item.shop_rebate_conf.type === 'ratio'?'%':'元'}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </View>:
            <View className='tip-dec'>
              开启分佣后 可设置相关参数
            </View>
          }
          <View className='save-popularize' onClick={this.saveRebateConf.bind(this)}>保存分佣</View>
        </View>
      </View>
    )
  }
}
