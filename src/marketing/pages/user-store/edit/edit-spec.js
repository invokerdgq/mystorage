import Taro, { Component } from '@tarojs/taro'
import {Button,Input,Switch, Picker,View, Text, ScrollView ,WebView,Form,CheckboxGroup,Checkbox,Label} from '@tarojs/components'
import NavGap from "../../../../components";
import GoodsSpec from "./goods-spec";
import api from '@/api'

import './edit-spec.scss'
import {connect} from "@tarojs/redux";

@connect(({editSpec}) =>({
  simpleForm:editSpec.simpleForm,
  specItems:editSpec.specItems,
  nospec:editSpec.nospec,
  skus:editSpec.skus
}),(dispatch) =>({
  setSpecItems:(payload) => dispatch({type:'spec/setSpecItems',payload}),
  setNospec:(payload) => dispatch({type:'spec/setNospec',payload}),
  setSimpleForm:(payload) => dispatch({type:'spec/setSimpleForm',payload}),
  setSkus:(payload) => dispatch({type:'spec/setSkus',payload}),
}))
export default class EditSpec extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showMore:false,
      statusList:[{label:'前台可销售',value:'onsale'},{label:'不可销售',value:'instock'},],
      skus:[],
      specTotal:'',
      specPagesize:10,
      specItems:[],
      simple:true,
      simpleForm:{
        approve_status:'',
        store:'',
        price:'',
        market_price:''
      },
      formValue:'',
      fill:{
        approve_status:'',
        store:'',
        price:'',
        market_price:''
      },
      fillPickerValue:'',
      specItemsValue:[],
    }
  }
  componentWillMount() {
    const {id,is_edit} = this.$router.params
    if(this.props.skus.length !==0 || this.props.simpleForm.approve_status){
      this.setState({
        simpleForm: {...this.props.simpleForm},
        specItems:[...this.props.specItems],
        skus:[...this.props.skus],
        simple:this.props.nospec
      },() =>{
        if(this.state.simpleForm.approve_status !== ''){
          this.state.statusList.forEach((item,index) => {
            if(item.value === this.state.simpleForm.approve_status){
              this.setState({
                formValue:index
              },() => {
              })
            }
          })
        }
      })
    }else{
      this.handleCategoryChange(id)
    }
  }
   handleCategoryChange = async(id)=>{
    const res = await api.store.getCategoryInfo(id)
    // this.generateParams(detail.goods_params) // 处理主分类参数
    this.generateSpec(res.goods_spec) // 处理主分类规格
  }
  generateSpec(data) {
    let skus = []
    data.forEach(item => {
      let specs = []
      item.attribute_values.list.forEach(spec => {
        if (!spec.custom_attribute_value) {
          Object.assign(spec, {custom_attribute_value: spec.attribute_value})
        }
        specs.push(spec)
      })
      let sku = {
        sku_id: item.attribute_id,
        sku_name: item.attribute_name,
        is_image: item.is_image,
        sku_value: specs,
        checked_sku: []
      }
      skus.push(sku)
    })
    this.setState({
      skus:skus
    },() => {})
  }
  handleCheckboxChange(curIndex,e){
    this.state.skus[curIndex].checked_sku = e.detail.value
    this.setState({
      skus:this.state.skus
    },() => {
      this.updateSku()
    })
  }
  handleCheckboxValueChange(curIndex,index,id,e){
    this.state.skus[curIndex].sku_value[index].custom_attribute_value = e.detail.value
    this.setState({
      skus:this.state.skus
    },() => {
      this.updateSku()
    })
    this.handleSkuName(e.detail.value,id)
  }
  generateSkus(data) {  // 将二维数组组合成商品数组 a*b*...... 点乘 返回组合规格数组
    let len = data.length
    if (len >= 2) {
      let len1 = data[0].length
      let len2 = data[1].length
      let newlen = len1 * len2
      let temp = new Array(newlen)
      let index = 0
      for ( let i = 0; i < len1; i++) {
        for (let j = 0; j < len2; j++) {
          if (Array.isArray(data[0][i])) {
            temp[index] = [...data[0][i], data[1][j]]
          } else {
            temp[index] = [data[0][i], data[1][j]]
          }
          index++
        }
      }
      let newArray = new Array(len-1)
      for (let i = 2; i < len; i++){
        newArray[i - 1] = data[i]
      }
      newArray[0] = temp
      return this.generateSkus(newArray)
    }
    else{
      return data[0]
    }
  }
  generateSkuids(data) {  // 组合Id 将组合规格的各分量的spec_value_id 通过‘_’连接起来
    if (data.length) {
      let skuIds = []
      data.forEach(child => {
        skuIds.push(child.spec_value_id)
      })
      return skuIds.join('_')
    } else {
      return data.spec_value_id
    }
  }
  handleSkuName(val,id){
    this.state.specItems.forEach(item => {
      item.forEach(child => {
        for(let i = 0;i< child.item_spec.length;i++){
          if(child.item_spec[i].spec_value_id === id){
            child.item_spec[i].spec_custom_value_name = val
          }
        }
        this.updateSku()
      })
    })
  }
  updateSku(){
    let arr = []
    let skus = []
    this.state.skus.forEach(item => {
      if (item.checked_sku.length > 0) {
        arr.push(item)
      }
    })
    if (arr.length === 0) return
    // let n = arr.findIndex(item => JSON.parse(item.is_image))
    // if (n != -1) {
    //   let obj = {...arr[n]}
    //   let imgs = []
    //   let addedImg = this.specImages
    //   obj.checked_sku.forEach(item => {
    //     let added = addedImg.find(n => n.spec_value_id === item)
    //     let img = {
    //       spec_value_id: item,
    //       item_spec: this.getSkuName(item, obj.sku_value),
    //       item_image_url: added ? added.item_image_url : []
    //     }
    //     imgs.push(img)
    //   })
    //   this.specImages = imgs
    //   arr.splice(n, 1)
    //   arr.unshift(obj)
    // }
    arr.forEach(item => {
      let skuGroup = []
      if (item.checked_sku.length > 0) {
        item.checked_sku.forEach(checked => {
          let issue = item.sku_value.find(sku => sku.attribute_value_id === checked)
          let obj = {
            spec_id: item.sku_id,
            spec_value_id: issue.attribute_value_id,
            spec_value_name: issue.attribute_value,
            spec_custom_value_name: issue.custom_attribute_value || ''
          }
          skuGroup.push(obj)
        })
        skus.push(skuGroup) // skus  是一个二维数组 每一项为由某个规格选中的子规格信息对象组成的数组
      }
    })
    let allSku = this.generateSkus(skus)
    if (this.state.skus.length > 1 && !allSku[0].length) {
      return false
    }
    let skuList = []
    for(let i = 0;i< allSku.length;i++){
      let obj = {
        is_default: false,
        sku_id: this.generateSkuids(allSku[i]),
        item_spec: allSku[i].length ? allSku[i] : [allSku[i]],
        approve_status: '',
        store: '',
        item_bn: '',
        item_unit: '',
        weight: '',
        volume: '',
        price: '',
        cost_price: '',
        market_price: '',
        barcode: '',
        fictitious_sales:0
      }
      skuList.push(obj)
    }
    this.state.specTotal = skuList.length
    let list = skuList
    // let len = Math.ceil(skuList.length / this.state.specPagesize)
    // for (let i = 0; i < len; i++) {
    //   let childs = skuList.slice(i * this.state.specPagesize, i * this.state.specPagesize + this.state.specPagesize)
    //   list.push(childs)          //  list是二维对象数组  每一项代表一页 每一页也是一个数组 有组合商品对象组成
    // }
    //  组合发生变化 同步specItemsValue
    let valueList = []
     list.map(item => {
      // let out = []
      // valueList.push(out)
      //  item.map(() => {
      //   out.push('')
      // })
       valueList.push('')
    })
    this.setState({
      specItems:list,
      specItemsValue:valueList
    })
  }
  handleSwitchChange(e){
    this.setState({
      simple:!e.detail.value
    })
  }
  back(){
    Taro.showModal({
      title:'确认设置完毕',
      success:(res)=>{
      if(res.confirm){
        this.settingConfirm()
      }
    }
    })
  }
  handleFillChange(type,e){
    this.state.fill[type] = e.detail.value
    this.setState({
      fill:this.state.fill
    })
  }
  handleFill(){
    let valueList = []
    let list = this.state.specItems.map(item => {
      valueList.push('')
      return {...item,...this.state.fill}
    })
    this.setState({
      specItems:list,
      specItemsValue:valueList
    })
  }
  handleSpecItems(type,index,e){
    this.state.specItems[index][type] = e.detail.value
    this.setState({
      specItems:this.state.specItems
    })
  }
  clearSpecItems(index) {
    this.state.specItems[index].approve_status = ''
    this.state.specItems[index].store = ''
    this.state.specItems[index].price = ''
    this.state.specItems[index].market_price = ''
    this.setState({
      specItems:this.state.specItems
    })
  }
  handlePickerChange(type,index,e){
    switch (type) {
      case 'fill':
        this.state.fill.approve_status = this.state.statusList[e.detail.value].value
        this.setState({
          fillPickerValue:e.detail.value,
          fill:this.state.fill
        })
        break
      case 'items':
        this.state.specItems[index].approve_status = this.state.statusList[e.detail.value].value
        this.state.specItemsValue[index] = e.detail.value
        this.setState({
          specItems:this.state.specItems,
          specItemsValue:this.state.specItemsValue
        })
        break
      default :
        this.state.simpleForm.approve_status = this.state.statusList[e.detail.value].value
        this.setState({
          formValue:e.detail.value,
          simpleForm:this.state.simpleForm
        })
    }
  }
  handleForm(type,e){
    this.state.simpleForm[type] = e.detail.value
    this.setState({
      simpleForm:this.state.simpleForm
    })
  }
  settingConfirm(){
    if(this.state.simple){
      if(this.state.simpleForm.approve_status === ''){
        Taro.showToast({title:'请选择商品状态',icon:'none'})
        return
      }
      if(this.state.simpleForm.store === ''){
        Taro.showToast({title:'请输入商品库存',icon:'none'})
        return
      }
      if(this.state.simpleForm.price === ''){
        Taro.showToast({title:'请输入商品价格',icon:'none'})
        return
      }
    }else{
      let hasEmpty
      this.state.specItems.map((item,index) => {
        if(item.approve_status ===''|| item.price === '' || item.store === ''){
          hasEmpty = true
          Taro.showToast({title:`第${index+1}项有空数据，请填写`,icon:'none',duration:1500})
        }
      })
      if(hasEmpty) return;
    }
     this.props.setSpecItems(this.state.specItems)
     this.props.setNospec(this.state.simple)
     this.props.setSimpleForm(this.state.simpleForm)
     this.props.setSkus(this.state.skus)
     Taro.navigateBack()
  }
  changeShowMore(){
    this.setState({
      showMore:!this.state.showMore
    })
  }
  checkFillValid(type,index,e){
    if(!/^[0-9]*(\.)?[0-9]*$/.test(e.detail.value)){
      Taro.showToast({title:'请输入正确的数据',icon:'none',duration:1500})
      if(index !== ''){
        this.state.specItems[index][type] = ''
        this.setState({
          specItems:this.state.specItems
        })
      }else{
        this.state.fill[type] = ''
        this.setState({
          fill:this.state.fill
        })
      }
    }
  }
  render() {
    const {formValue,simpleForm,skus,simple,specItems,fill,statusList,fillPickerValue,specItemsValue,showMore} = this.state
    let newItems = []
    if(!showMore && specItems.length >3 ){
      [1,1,1].map((item,index) => {
        newItems.push(specItems[index])
      })
    }else{
      newItems = specItems
    }
    return(
      <View className='spec-page'>
        <NavGap title='选择规格' back={this.back.bind(this)} bg='#c0534e' cl='white'/>
        <View className='spec-page-content'>
          <View>
            <View className='select-simple'>
              <Text className='com'>统一规格</Text>
              <View className='multi-spec'>
                <Text>多规格</Text>
                <Switch checked={!simple} color={'#c0534e'} onChange={this.handleSwitchChange.bind(this)} className='spec-switch'/>
              </View>
            </View>
            {
              simple?
                <View className='com-spec-content'>
                  <View className='simple-spec-item'>
                    <Text className='require'>*</Text>价格
                    <Input placeholderClass='input-place' placeholder='请填写商品价格' value={simpleForm.price} onBlur={this.handleForm.bind(this,'price')} className='price-input'/>
                  </View>
                  <View className='simple-spec-item'>
                    <Text className='require none-require'>*</Text>原价
                    <Input placeholderClass='input-place' placeholder='选填' value={simpleForm.market_price} onBlur={this.handleForm.bind(this,'market_price')} className='price-input'/>
                  </View>
                  <View className='simple-spec-item'>
                    <Text className='require'>*</Text>库存
                    <Input placeholderClass='input-place' placeholder='请填写商品库存' value={simpleForm.store} onBlur={this.handleForm.bind(this,'store')} className='store-input'/>
                  </View>
                  <View className='simple-spec-item'>
                    <Text className='require'>*</Text>状态
                    <Picker
                      range={statusList}
                      rangeKey='label'
                      value={formValue}
                      onChange={this.handlePickerChange.bind(this,'form','')}
                    >
                      {formValue !== ''?
                        <View className='status-picker checked'>{statusList[formValue].label}</View>
                        :<View className='status-picker'>请选择商品状态</View>
                      }
                    </Picker>
                  </View>
                </View>:
                <View className='multi-spec-content'>
                  { skus.length !==0&&
                  skus.map((item,index) => {
                    return(
                      <GoodsSpec
                        curIndex={index}
                        info={item}
                        handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                        handleValueChange={this.handleCheckboxValueChange.bind(this)}
                      />
                    )
                  })
                  }
                  {
                    specItems.length !==0 &&
                      <View className='fill-spec-content'>
                        <View className='fill-spec-content-title'>
                          <Text className='dec-spec-name'>规格值</Text>
                          <Text className='dec-spec-status'>*状态</Text>
                          <Text className='dec-spec-store'>*库存</Text>
                          <Text className='dec-spec-price'>*价格</Text>
                        </View>
                        <View className='fill-spec-item fill-data'>
                            <Text className='spec-item-name'>批量填充</Text>
                            <Picker range={statusList} rangeKey='label' value={fillPickerValue} onChange={this.handlePickerChange.bind(this,'fill','')}>
                              {fillPickerValue === ''?
                                <Text className='status-picker'>选择 v</Text>:
                                <Text className='status-picker checked'>{statusList[fillPickerValue].label}</Text>
                              }
                            </Picker>
                            <Input value={fill.store} onInput={this.handleFillChange.bind(this,'store')} className='input-item' onBlur={this.checkFillValid.bind(this,'store')}/>
                            <Input value={fill.price} onInput={this.handleFillChange.bind(this,'price')} className='input-item' onBlur={this.checkFillValid.bind(this,'price')}/>
                            <Text onClick={this.handleFill.bind(this)} className='spec-feature'>填充</Text>
                        </View>
                        {
                          newItems.map((item,index) => {
                            let status =''
                            this.state.statusList.forEach(item1 => {
                              if(item1.value === item.approve_status){
                                status = item1.label
                              }
                            })
                            return(
                              <View className='fill-spec-item' key={item.attribute_value_id}>
                                <Text className='spec-item-name'>
                                  {
                                    item.item_spec.map((item1) =>{
                                      return (
                                        <Text>{item1.spec_custom_value_name || item1.spec_value_name}</Text>
                                      )
                                    })
                                  }
                                </Text>
                                <Picker
                                  range={statusList}
                                  rangeKey='label'
                                  value={specItemsValue[index]}
                                  onChange={this.handlePickerChange.bind(this,'items',index)}
                                >
                                  {item.approve_status === ''?
                                    <Text className='status-picker'>选择 v</Text>:
                                    <Text className='status-picker checked'>{status}</Text>
                                  }
                                </Picker>
                                <Input value={item.store} onInput={this.handleSpecItems.bind(this,'store',index)} className='input-item' onBlur={this.checkFillValid.bind(this,'store',index)}/>
                                <Input value={item.price} onInput={this.handleSpecItems.bind(this,'price',index)} className='input-item' onBlur={this.checkFillValid.bind(this,'price',index)}/>
                                <Text onClick={this.clearSpecItems.bind(this,index)} className='spec-feature'>清除</Text>
                              </View>
                            )
                          })
                        }
                        {
                          specItems.length >3 &&
                          <View className='show-more' onClick={this.changeShowMore.bind(this)}>
                            <View className={`iconfont icon-more ${this.state.showMore?'rotate':''}`}/><View>{this.state.showMore?'收起':'查看更多'}</View>
                          </View>
                        }
                      </View>
                  }
                </View>
            }
          </View>
          <View className='save-spec' onClick={this.settingConfirm.bind(this)}>保存规格</View>
        </View>
      </View>
    )
  }
}
