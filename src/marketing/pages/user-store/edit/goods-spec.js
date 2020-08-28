import Taro, { Component } from '@tarojs/taro'
import {Input, View, Text, CheckboxGroup,Checkbox} from '@tarojs/components'

import './goods-spec.scss'
export default class GoodsSpec extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      is_image:'',
      checked_sku:[],
      sku_id:'',
      sku_name: '',
      sku_value: [{attribute_id:'',attribute_value_id:'',attribute_value:'',custom_attribute_value:'',sort:'',image_url:''}]
    },
    curIndex:'',
    handleCheckboxChange:()=> {},
    handleValueChange:()=> {}
  }
  constructor(props) {
    super(props);
    this.state = {
      showAll:false
    }
  }
  handleValueChange(item,e){
    item.custom_attribute_value = e.detail.value
  }
  changeShowAll(){
    this.setState({
      showAll:!this.state.showAll
    })
  }
  render() {
    const {info,curIndex} = this.props
    let newList = []
    if(!this.state.showAll && info.sku_value.length >6){
      newList = info.sku_value.reduce((pre,item,index) => {
        if(index <6){
          pre.push(item)
        }
        return pre
      },[])
    }else{
      newList = info.sku_value
    }
    return(
      <View className='spec-container'>
        <View className='spec-title'><Text className='spec_name'>{info.sku_name}</Text><Text className='spec-dec'>(选中参数可更改)</Text></View>
        <View className='spec-content'>
          <CheckboxGroup onChange={(e) => {this.props.handleCheckboxChange(curIndex,e)}} className='spec-content-group'>
            {
              newList.map((item,index) => {
                let is_checked = info.checked_sku.indexOf(item.attribute_value_id) !== -1
                return(
                  <View className='checkbox-item' key={item.attribute_id}>
                   <Checkbox value={item.attribute_value_id} checked={is_checked} className='check-box-spec' color={'#C0534E'}/>
                   <Input placeholderClass='input-center' value={is_checked?item.custom_attribute_value:item.attribute_value} disabled={!is_checked} className={`custom-${is_checked?'checked':'unchecked'}`} onBlur={(e) => {this.props.handleValueChange(curIndex,index,item.attribute_value_id,e)}}/>
                  </View>
                )
              })
            }
          </CheckboxGroup>
          {
            info.sku_value.length >6&&
            <View className='show-more' onClick={this.changeShowAll.bind(this)}>
              <View className={`iconfont icon-more ${this.state.showAll?'rotate':''}`}/><View>{this.state.showAll?'收起':'查看更多'}</View>
            </View>
          }
        </View>
      </View>
    )
  }
}
