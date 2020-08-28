import Taro, { Component } from '@tarojs/taro'
import {Button,Input,Switch, Picker,View, Text, ScrollView ,WebView,Form,CheckboxGroup,Checkbox,Label} from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import NavGap from "../../../../components";
import GoodsSpec from "./goods-spec";
import api from '@/api'

import './edit-goods.scss'
import {connect} from "@tarojs/redux";
@connect(({editSpec}) =>({
  simpleForm:editSpec.simpleForm,
  specItems:editSpec.specItems,
  nospec:editSpec.nospec
}),(dispatch) =>({
  setSpecItems:(payload) => dispatch({type:'spec/setSpecItems',payload}),
  setNospec:(payload) => dispatch({type:'spec/setNospec',payload}),
  setSimpleForm:(payload) => dispatch({type:'spec/setSimpleForm',payload}),
  setSkus:(payload) => dispatch({type:'spec/setSkus',payload}),
  clearSpec:(payload) => dispatch({type:'spec/clear',payload:''})
}))
export default class EditGoods extends Component{
  constructor(props) {
    super(props);
    this.state = {
      is_new:false,
      mainCategoryId:'',
      simple:true,
      fileList:[],
      moreImageList:[],
      initialData:[[[]]],
      sortInitialData:[[[]]],
      sortList:[],
      rangeList:[],
      value:0,
      mainValue:[],
      sortValue:[],
      columnStatus:[],
      sortStatus:[],
      skus:[],
      specTotal:'',
      specPagesize:10,
      specItems:[],
      form: {
        item_id: '',
        item_type: 'normal',
        special_type: 'normal',
        item_source: 'mall',
        item_category: [],
        item_params: [],
        item_name: '',
        sort: 0,
        item_bn: '',
        brief: '',
        weight: '',
        volume: '',
        price: '',
        market_price: '',
        cost_price: 0,
        barcode: '',
        item_unit: '',
        rebate: '',
        store: '',
        brand_id: '',
        templates_id: '',
        approve_status: 'onsale',
        intro: '',
        pics: [],
        videos: '',
        videos_url: '',
        nospec: true,
        is_show_specimg: false,
        spec_images: [],
        spec_items: [],
        item_main_cat_id: '',
        fictitious_sales:0
      },
    }
  }
  componentWillMount = async ()=>{
    const {itemId} = this.$router.params
   await this.init()
    if(!itemId){
      this.state.is_edit = false
      this.initMaincategory()
    }else{
      this.state.is_edit = true
      const response = await api.store.getItemsDetail(itemId)
        let itemsDetailData = response
        if (itemsDetailData.regions_id) {
          this.state.select_regions_value = itemsDetailData.regions_id
        }
        this.state.form.pics = itemsDetailData.pics
      this.state.mainCategoryId = itemsDetailData.item_main_cat_id
        // 处理图片列表
        let picList = []
        for (let item in itemsDetailData.pics) {
          let newpic = {}
          newpic.url =  itemsDetailData.pics[item]
          picList.push(newpic)
        }
        this.state.picsList = picList
        let obj = this.state.form
        this.state.form = ({obj} = {
          item_id: this.state.is_new ? '' : itemsDetailData.item_id,
          item_source: itemsDetailData.item_source,
          item_type: itemsDetailData.item_type,
          special_type: itemsDetailData.special_type,
          item_category: itemsDetailData.item_category.length > 0? itemsDetailData.item_category : [],
          item_name: itemsDetailData.item_name,
          sort: itemsDetailData.sort,
          item_bn: this.state.is_new ? '' : itemsDetailData.item_bn,
          brief: itemsDetailData.brief,
          weight: itemsDetailData.weight,
          volume: itemsDetailData.volume,
          price: itemsDetailData.price/100,
          market_price: itemsDetailData.market_price/100,
          cost_price: itemsDetailData.cost_price/100,
          barcode: itemsDetailData.barcode,
          item_unit: itemsDetailData.item_unit,
          rebate: itemsDetailData.rebate/100,
          store: itemsDetailData.store,
          brand_id: itemsDetailData.brand_id,
          templates_id: itemsDetailData.templates_id ? itemsDetailData.templates_id.toString() : '',
          approve_status: itemsDetailData.approve_status,
          pics: itemsDetailData.pics,
          videos: itemsDetailData.videos,
          videos_url: itemsDetailData.videos_url,
          nospec: itemsDetailData.nospec,
          is_show_specimg: itemsDetailData.is_show_specimg,
          item_params: itemsDetailData.item_params,
          item_main_cat_id: itemsDetailData.item_main_cat_id,
          fictitious_sales:itemsDetailData.fictitious_sales
        })
      // 处理分类
      console.log('开始处理分类----------')
      console.log(this.state.sortInitialData)
      console.log(this.state.sortList)
      console.log(itemsDetailData.item_category)
      let status = []
      this.state.sortInitialData[2].map((item,index) =>{
        item.map((item1,index1) => {
          item1.map((item2,index2) => {
            if(item2.category_id === itemsDetailData.item_category[0]){
             status = [index,index1,index2]
            }
          })
        })
      })
      this.setState({
        sortValue:status,
       sortStatus:status
      })
      // 处理商品图片
        let file = itemsDetailData.pics.map((item,index) => {
          return {url:item}
        })
      this.setState({
        fileList:file
      })
      // 处理图文详情 可直接用数组而不是html 元素 (待定)
      this.setState({
        moreImageList:Array.isArray(itemsDetailData.intro)?itemsDetailData.intro:[]
      })
        this.state.picsOldLen = this.state.form.pics.length
        if (!itemsDetailData.item_main_cat_id) {
          this.initMaincategory()
        } else {
          let category = itemsDetailData.item_category_main
          this.state.categoryNames = [category[0].category_name, category[0].children[0].category_name, category[0].children[0].children[0].category_name]
          // this.generateParams(itemsDetailData.item_params_list)
        }
        if (!this.state.form.nospec) {   // 如果有规格
          this.generateSpec(itemsDetailData.item_spec_list) // 格式化一波 浅复制给 skus
          this.state.specImages = itemsDetailData.spec_images
          itemsDetailData.spec_items.forEach(item => {
            item.item_spec.forEach(child => {
              let checkedIndex = this.state.skus.findIndex(n => child.spec_id === n.sku_id)
              let isin = this.state.skus[checkedIndex].checked_sku.findIndex(k => child.spec_value_id === k)
              if (isin === -1) {
                this.state.skus[checkedIndex].checked_sku.push(child.spec_value_id)
              }
            })
          })
           let newSku = []
          itemsDetailData.spec_items.forEach(item => {
            let sku = Object.assign({}, item)
            sku.market_price = item.market_price/100
            sku.cost_price = item.cost_price/100
            sku.price = item.price/100
            sku.item_bn = this.state.is_new ? '' : item.item_bn
            let itemId = []
            let specs = []
            item.item_spec.forEach(sub => {
              specs.push({
                spec_id: sub.spec_id,
                spec_value_id: sub.spec_value_id,
                spec_value_name: sub.spec_value_name,
                spec_custom_value_name: sub.spec_custom_value_name || ''
              })
              itemId.push(sub.spec_value_id)
            })
            sku.item_spec = specs
            itemId = itemId.join('_')
            Object.assign(sku, {sku_id: itemId})
            // store.dispatch('setSku', sku)
            newSku.push(sku)
          })
          // 存入redux 中
          this.props.setSimpleForm({
            approve_status: itemsDetailData.approve_status,
            store: itemsDetailData.store,
            item_bn: this.state.is_new ? '' : itemsDetailData.item_bn,
            weight: itemsDetailData.weight,
            volume: itemsDetailData.volume,
            price: itemsDetailData.price/100,
            market_price: itemsDetailData.market_price/100,
            cost_price: itemsDetailData.cost_price/100,
            fictitious_sales:itemsDetailData.fictitious_sales
          })
          this.props.setNospec({nospec: itemsDetailData.nospec,})
          // 处理newSku分页
          // let storeSku = []
          // while(newSku.length > 10){
          //   storeSku.push(newSku.slice(0,10))
          // }
          // storeSku.push(newSku)
          //
          // this.props.setSpecItems(storeSku)
          this.props.setSpecItems(newSku)
          this.props.setSkus(this.state.skus)
          this.updateSku()
        }else{
          this.setState({
            form:{
              ...this.state.form,
              approve_status:itemsDetailData.approve_status,
              price:itemsDetailData.price,
              market_price:itemsDetailData.market_price,
              store:itemsDetailData.store
            }
          })
          this.props.setSimpleForm({
            approve_status:itemsDetailData.approve_status,
            price:itemsDetailData.price,
            market_price:itemsDetailData.market_price,
            store:itemsDetailData.store
          })
          this.props.setSkus(this.state.skus)
        }
        // 规格 处理完毕---------------------------------------------------
        // if (typeof itemsDetailData.intro === 'object') {
        //   this.state.mode = 'component'
        //   this.state.content = itemsDetailData.intro
        // } else {
        //   this.state.form.intro = itemsDetailData.intro
        // }
    }
  }
  async init(){ // 处理 获取分类 模板 品牌等通用数据
    const option = {
      is_show:false
    }
    const res = await api.store.getCategory(option)
    console.log(res)
    let data2 = this.formateCategory(res)
    this.state.sortInitialData = data2
    this.state.sortStatus = Array.from({length:data2.length}).fill(0)
    this.state.sortList = [data2[0],data2[1][0],data2[2][0][0]]
  }
  async initMaincategory(){
    const option = {
      is_main_category:true
    }
    const res = await api.store.getCategory(option)
    let data = this.formateCategory(res)
    this.setState({
      initialData:data,
      columnStatus:Array.from({length:data.length}).fill(0),
      rangeList : [data[0],data[1][0],data[2][0][0]],
    })
  }
  formateCategory(list){
    let dataList = []
    if(!Array.isArray(list)) return
    let newList = []
    list.map(item =>{
      newList.push(item)
    })
    dataList.push([...newList])
     let deepList = newList.map(item => {
      let cList  = []
      item.children.map(item1 => {
        cList.push(item1)
      })
      return cList
    })
    dataList.push([...deepList])
    let finalList = deepList.map(item => {
      return item.map(item1 => {
        let cList = []
        item1.children.map(item2 => {
          cList.push(item2)
        })
        return cList
      })
    })
    dataList.push(finalList)
    return dataList
  }
  handleValueChange(type,e){
    if(type === 'mainCategory'){
      this.setState({
        columnStatus:e.detail.value,
        mainValue:e.detail.value
      })
      let id = this.state.rangeList[2][e.detail.value[2]].category_id
      this.state.form.item_main_cat_id = id
      this.setState({
        mainCategoryId:id,
        form:this.state.form
      })
      return
    }
    this.state.form.item_category[0] = this.state.sortList[2][e.detail.value[2]].category_id
    this.setState({
      sortStatus:e.detail.value,
      sortValue:e.detail.value,
      form:this.state.form
    })
  }
  handleColumnChange(type,e){
   if(type === 'mainCategory'){
     this.state.columnStatus[e.detail.column] = 0
     let count = e.detail.column
     if(count === this.state.columnStatus.length -1) return
     let list = [...this.state.rangeList]
     for(let i = count ;i< this.state.columnStatus.length-1;i++){
       if(i == 0){
         list[i+1] = this.state.initialData[i+1][e.detail.value]
       }else{
         list[i+1] = this.state.initialData[i+1][e.detail.value][0]
       }
     }
     this.setState({
       rangeList:list,
     })
   }else{
     this.state.sortStatus[e.detail.column] = 0
     let count = e.detail.column
     if(count === this.state.sortStatus.length -1) return
     let list = [...this.state.sortList]
     for(let i = count ;i< this.state.sortStatus.length-1;i++){
       if(i == 0){
         list[i+1] = this.state.sortInitialData[i+1][e.detail.value]
       }else{
         list[i+1] = this.state.sortInitialData[i+1][e.detail.value][0]
       }
     }
     this.setState({
       sortList:list
     })
   }
   console.log(this.state.columnStatus)
  }

  规格处理
  // async handleCategoryChange(id) {
  //   // const res = await api.store.getCategoryInfo(id)
  //   let dec = {
  //     "data":{
  //       "id":"5",
  //       "category_id":"5",
  //       "company_id":"1",
  //       "category_name":"家居日用",
  //       "label":"家居日用",
  //       "parent_id":"2",
  //       "distributor_id":"0",
  //       "path":"1,2,5",
  //       "sort":"0",
  //       "is_main_category":true,
  //       "goods_params":[
  //
  //       ],
  //       "goods_spec":[
  //         {
  //           "attribute_id":"3",
  //           "company_id":"1",
  //           "shop_id":"0",
  //           "attribute_type":"item_spec",
  //           "attribute_name":"颜色",
  //           "attribute_memo":"家居日用-颜色",
  //           "attribute_sort":"0",
  //           "distributor_id":"0",
  //           "is_show":"true",
  //           "is_image":"true",
  //           "image_url":null,
  //           "created":1590050588,
  //           "updated":1590923543,
  //           "operator_id":"1",
  //           "attribute_values":{
  //             "total_count":31,
  //             "list":[
  //               {
  //                 "attribute_value_id":"18",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"白色",
  //                 "sort":"0",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"19",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"黑色",
  //                 "sort":"1",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"20",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"绿色",
  //                 "sort":"2",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"21",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"红色",
  //                 "sort":"3",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"22",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"粉色",
  //                 "sort":"4",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"23",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"卡其色",
  //                 "sort":"5",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"24",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"黄色",
  //                 "sort":"6",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"25",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"金色",
  //                 "sort":"7",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"26",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"银色",
  //                 "sort":"8",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"27",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"灰色",
  //                 "sort":"9",
  //                 "image_url":null,
  //                 "created":1590458665,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"553",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色1",
  //                 "sort":"10",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"554",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色2",
  //                 "sort":"11",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"555",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色3",
  //                 "sort":"12",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"556",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色4",
  //                 "sort":"13",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"557",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色5",
  //                 "sort":"14",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"558",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色6",
  //                 "sort":"15",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"559",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色7",
  //                 "sort":"16",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"560",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色8",
  //                 "sort":"17",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"561",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色9",
  //                 "sort":"18",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"562",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色10",
  //                 "sort":"19",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"563",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色11",
  //                 "sort":"20",
  //                 "image_url":null,
  //                 "created":1592379437,
  //                 "updated":1592379437
  //               },
  //               {
  //                 "attribute_value_id":"578",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色21",
  //                 "sort":"21",
  //                 "image_url":null,
  //                 "created":1592379729,
  //                 "updated":1592379729
  //               },
  //               {
  //                 "attribute_value_id":"579",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色22",
  //                 "sort":"22",
  //                 "image_url":null,
  //                 "created":1592379729,
  //                 "updated":1592379729
  //               },
  //               {
  //                 "attribute_value_id":"580",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"1",
  //                 "attribute_value":"颜色23",
  //                 "sort":"23",
  //                 "image_url":null,
  //                 "created":1592379729,
  //                 "updated":1592379729
  //               },
  //               {
  //                 "attribute_value_id":"640",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色24",
  //                 "sort":"24",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               },
  //               {
  //                 "attribute_value_id":"641",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色25",
  //                 "sort":"25",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               },
  //               {
  //                 "attribute_value_id":"642",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色26",
  //                 "sort":"26",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               },
  //               {
  //                 "attribute_value_id":"643",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色27",
  //                 "sort":"27",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               },
  //               {
  //                 "attribute_value_id":"644",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色28",
  //                 "sort":"28",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               },
  //               {
  //                 "attribute_value_id":"645",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色29",
  //                 "sort":"29",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               },
  //               {
  //                 "attribute_value_id":"646",
  //                 "attribute_id":"3",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"颜色30",
  //                 "sort":"30",
  //                 "image_url":null,
  //                 "created":1592386215,
  //                 "updated":1592386215
  //               }
  //             ]
  //           }
  //         },
  //         {
  //           "attribute_id":"9",
  //           "company_id":"1",
  //           "shop_id":"0",
  //           "attribute_type":"item_spec",
  //           "attribute_name":"规格",
  //           "attribute_memo":"家居日用-规格",
  //           "attribute_sort":"0",
  //           "distributor_id":"0",
  //           "is_show":"true",
  //           "is_image":"false",
  //           "image_url":null,
  //           "created":1590050588,
  //           "updated":1590050588,
  //           "operator_id":"1",
  //           "attribute_values":{
  //             "total_count":21,
  //             "list":[
  //               {
  //                 "attribute_value_id":"100",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"1个",
  //                 "sort":"0",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"101",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"2个",
  //                 "sort":"1",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"102",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"3个",
  //                 "sort":"2",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"103",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"4个",
  //                 "sort":"3",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"104",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"5个",
  //                 "sort":"4",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"105",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"6个",
  //                 "sort":"5",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"106",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"1箱",
  //                 "sort":"6",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"107",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"2箱",
  //                 "sort":"7",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"108",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"3箱",
  //                 "sort":"8",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"109",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"4箱",
  //                 "sort":"9",
  //                 "image_url":null,
  //                 "created":1590463615,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"595",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格1",
  //                 "sort":"10",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"596",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格2",
  //                 "sort":"11",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"597",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格3",
  //                 "sort":"12",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"598",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格4",
  //                 "sort":"13",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"599",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格5",
  //                 "sort":"14",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"600",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格6",
  //                 "sort":"15",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"601",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格7",
  //                 "sort":"16",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"602",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格8",
  //                 "sort":"17",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"603",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格9",
  //                 "sort":"18",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"604",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格10",
  //                 "sort":"19",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               },
  //               {
  //                 "attribute_value_id":"605",
  //                 "attribute_id":"9",
  //                 "company_id":"1",
  //                 "shop_id":"0",
  //                 "attribute_value":"规格11",
  //                 "sort":"20",
  //                 "image_url":null,
  //                 "created":1592383854,
  //                 "updated":1592383854
  //               }
  //             ]
  //           }
  //         }
  //       ],
  //       "category_level":3,
  //       "image_url":null,
  //       "created":1590050549,
  //       "updated":1598261723,
  //       "operator_id":"0",
  //       "state":1
  //     }
  //   }
  //   let res = dec.data
  //     // this.generateParams(detail.goods_params) // 处理主分类参数
  //     this.generateSpec(res.goods_spec) // 处理主分类规格
  // }
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
    this.state.skus = skus
    this.setState({
      skus:skus
    })
  }
  // handleCheckboxChange(curIndex,e){
  //   this.state.skus[curIndex].checked_sku = e.detail.value
  //   this.setState({
  //     skus:this.state.skus
  //   },() => {
  //     this.updateSku()
  //   })
  // }
  // handleCheckboxValueChange(curIndex,index,id,e){
  //   this.state.skus[curIndex].sku_value[index].custom_attribute_value = e.detail.value
  //   this.setState({
  //     skus:this.state.skus
  //   })
  //   this.handleSkuName(e.detail.value,id)
  // }
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
  updateSku() {
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
        fictitious_sales:''
      }
      skuList.push(obj)
    }
    // if (this.editingSkus.length > 0) {
    //   this.editingSkus.forEach(item => {
    //     let in_item = skuList.find(n => item.sku_id === n.sku_id)
    //     if (!in_item) {
    //       store.dispatch('removeSku', item)
    //     }
    //   })
    // }

    this.state.specTotal = skuList.length
    let list = []
    let len = Math.ceil(skuList.length / this.state.specPagesize)
    for (let i = 0; i < len; i++) {
      let childs = skuList.slice(i * this.state.specPagesize, i * this.state.specPagesize + this.state.specPagesize)
      list.push(childs)          //  list是二维对象数组  每一项代表一页 每一页也是一个数组 有组合商品对象组成
    }
    //------------------------------
    if (this.props.specItems.length > 0) {
      list.forEach(item => {
        item.forEach(child => {
          let in_sku = this.props.specItems.find(editor => editor.sku_id === child.sku_id)
          if (in_sku) {
            Object.assign(child, in_sku)
          }
        })
      })
    }
    this.setState({
      specItems:list
    })
  }
  handleSkuName (val, id) {
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
  handleSwitchChange(e){
    this.setState({
      simple:e.detail.value
    })
  }

  handleFormInfo(type,e){
    this.state.form[type] = e.detail.value
    this.setState({
      form:this.state.form
    })
  }
  handleImageChange(type,files){
    if(type === 'goods'){
      let list = files.map(item => {
        return item.url
      })
      this.state.form.pics = list
      this.setState({
        fileList:files,
        form:this.state.form
      })
    }else{
      this.setState({
        moreImageList:files
      })
    }
  }
  toSetSpec(){
    if(!this.state.mainCategoryId){
      Taro.showToast({title:'请先选择当前类目',icon:'none'})
      return
    }
    Taro.navigateTo({
      url:`/marketing/pages/user-store/edit/edit-spec?id=${this.state.mainCategoryId}&is_edit=${this.state.is_edit}`
    })
  }
  submitCancel(){
    this.props.clearSpec()
    Taro.navigateBack()
  }
  submitItemsActionConfirm() {
    Taro.showLoading({
      title:'保存中'
    })
    let formSkuItem = []
    this.props.specItems.forEach(item => {
      item.forEach(child => {
        formSkuItem.push(child)
      })
    })
    this.state.form = {...this.state.form,...this.props.simpleForm}
    // if (this.selectedMainCategory.length > 0) {
    //   this.form.item_main_cat_id = this.selectedMainCategory[this.selectedMainCategory.length-1]
    // }
    if (!this.props.nospec) {
      if (formSkuItem.length > 0) {
        formSkuItem[0].is_default = true
      } else {
        Taro.showToast({
          title:'请设置规格',
          icon:'none'
        })
        return
      }
    }
    this.state.form.spec_images = ''
    this.state.form.spec_items = JSON.stringify(formSkuItem)
    if (this.state.is_edit) {
      api.store.updateItems(this.state.form.item_id, this.state.form).then(response => {
        Taro.hideLoading()
        Taro.showToast({
          title:'更新成功',
          icon:'success',
          duration:1500
        })
        this.props.clearSpec()
        setTimeout(() => {
          Taro.navigateTo({url:'/marketing/pages/user-store/user-store'})
        },700)
      }).catch(error => {
        Taro.showToast({
          title:error.errMsg ||'出现错误，稍后重试',
          icon:'none',
          duration:1500
        })
      })
    } else {
      api.store.createItems(this.state.form).then(response => {
        Taro.hideLoading()
        Taro.showToast({
          title:'添加成功',
          icon:'success',
          duration:1500
        })
        this.props.clearSpec()
        setTimeout(() => {
          Taro.navigateTo({url:'/marketing/pages/user-store/user-store'})
        },700)
      }).catch(error => {
        Taro.showToast({
          title:error.errMsg ||'出现错误，稍后重试',
          icon:'none',
          duration:1500
        })
      })
    }
  }
  back(){
    Taro.showModal({
      title:'确认放弃此次设置',
      success:(res) =>{
        if(res.confirm){
          this.props.clearSpec()
          Taro.navigateBack()
        }
      }
    })
  }
  render() {
    const {rangeList,sortList,columnStatus,sortStatus,form,mainValue,sortValue,is_edit} = this.state
    return(
      <View className='edit-goods'>
        <NavGap title='商品管理' bg={'#c0534e'} cl={'white'} back={this.back.bind(this)}/>
        <View className='edit-goods-content'>
          <Form>
            {is_edit?
              <View className='main-cat-item'>
                <Text className='main-cat-item-dec'><Text className='require'>*</Text>当前类目</Text>
                <Text className='main-cat-name'>{this.state.categoryNames}</Text>
              </View>:
              <View className='main-cat-item'>
              <Text className='main-cat-item-dec'><Text className='require'>*</Text>当前类目</Text>
              <Picker mode='multiSelector'
                      range={rangeList}
                      rangeKey='category_name'
                      value={columnStatus}
                      onChange={this.handleValueChange.bind(this, 'mainCategory')}
                      onColumnChange={this.handleColumnChange.bind(this, 'mainCategory')}
                      onCancel={this.handleCancel.bind(this, 'mainCategory')}
              >
                  { mainValue.length !== 0 ?
                  <Text className='main-cat-name'>
                    {this.state.rangeList[0][mainValue[0]].category_name} > {this.state.rangeList[1][mainValue[1]].category_name} > {this.state.rangeList[2][mainValue[2]].category_name} >
                  </Text>:
                    <Text className='main-cat-name'>选择类目 ></Text>
                  }
              </Picker>
            </View>
            }
            {
                <View className='form-content'>
                  <View className='base-info'>
                    <View className='base-info-content'>
                      <View className='title-brief main-cat-item'>
                        <Label className='form-item-title'>
                          <Text><Text className='require'>*</Text>商品标题</Text>
                          <Input value={form.item_name} onBlur={this.handleFormInfo.bind(this,'item_name')} className='title-input'
                          placeholder='输入标题:例如 【新款】夏季连衣裙'
                          />
                        </Label>
                        <Label className='form-item-brief'>
                          <Text><Text className='brief-require'>*</Text>副标题</Text>
                          <Input value={form.brief} onBlur={this.handleFormInfo.bind(this,'brief')} className='brief-input' placeholder='选填'/>
                        </Label>
                      </View>
                      <View className='main-cat-item'>
                        <Text className='main-cat-item-dec'><Text className='require'>*</Text>商品分类</Text>
                          <Picker mode='multiSelector'
                                  range={sortList}
                                  rangeKey='category_name'
                                  value={sortStatus}
                                  onChange={this.handleValueChange.bind(this,'sort')}
                                  onColumnChange={this.handleColumnChange.bind(this,'sort')}
                                  onCancel={this.handleCancel.bind(this,'sort')}
                          >
                              {sortValue.length!==0?
                              <Text className='main-cat-name'>
                                {this.state.sortList[0][sortValue[0]].category_name} > {this.state.sortList[1][sortValue[1]].category_name} > {this.state.sortList[2][sortValue[2]].category_name} >
                              </Text>:
                              <Text className='main-cat-name'>选择分类 ></Text>
                              }
                          </Picker>
                      </View>
                      <View className='more-info goods-img'>
                        <Text className='more-info-title'><Text className='require'>*</Text>商品图<Text className='extra-dec'>(800*800 最多四张)</Text></Text>
                          <AtImagePicker
                           length={4}
                           count={4}
                           mode='widthFix'
                           showAddBtn={this.state.fileList.length <4}
                           files={this.state.fileList}
                           onChange={this.handleImageChange.bind(this,'goods')}
                          />
                      </View>
                    </View>
                  </View>
                  <View className='more-info'>
                    <Text className='more-info-title'><Text className='require'>*</Text>商品详情<Text className='extra-dec'>(200M以内)</Text></Text>
                    <AtImagePicker
                      length={4}
                      count={4}
                      mode='widthFix'
                      showAddBtn={this.state.moreImageList.length <4}
                      files={this.state.moreImageList}
                      onChange={this.handleImageChange.bind(this,'more')}
                    />
                  </View>
                  <View className='spec-info main-cat-item' onClick={this.toSetSpec}>
                    <Text className='main-cat-item-dec'><Text className='require'>*</Text>商品规格</Text>
                    <View className='main-cat-name'>选择规格 ></View>
                  </View>
                  <View className='save-setting'>
                    <View className='cancel' onClick={this.submitCancel.bind(this)}>取消</View>
                    <View onClick={this.submitItemsActionConfirm.bind(this)} className='save'>保存商品</View>
                  </View>
                </View>
            }
          </Form>
        </View>
      </View>
    )
  }
}
