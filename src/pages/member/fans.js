import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import NavGap from "../../components/nav-gap/nav-gap";
import api from '@/api'
import NavSort from "../../components/nav-sort/nav-sort";

import './fans.scss'
import {withPager} from "@/hocs";
import {Loading} from "../../components";

// @withPager 双分页 不能这么写
export default class Fans extends Component{
  constructor(props) {
    super(props);
    this.state = {
      curIndex:0,
      grade1Page:{
        hasNext:true,
        isLoading:false,
        total:0,
        page_no:0,
        page_size:20
      },
      grade2Page:{
        hasNext:true,
        isLoading:false,
        total:0,
        page_no:0,
        page_size:20
      },
      grade3Page:{
        hasNext:true,
        isLoading:false,
        total:0,
        page_no:0,
        page_size:20
      },
      fansList:{
        grade1:[],
        grade2:[],
        grade3:[]
      },
      sortList:['钻石会员','至尊会员','王者身份']
    }
  }
  componentDidMount() {
    this.fetch()
  }
  async fetch (){
    if(this.state.curIndex === 0){
      let grade1 = this.state.grade1Page
      if(!grade1.hasNext) return
      grade1.isLoading = true
      grade1.page_no ++
      const {page_no:page,page_size:pageSize} = grade1
      const {list,total_count} = await api.member.getFans({page,pageSize,type:1})
      Math.ceil(total_count/grade1.page_size) > grade1.page_no?grade1.hasNext = true:grade1.hasNext = false
      this.setState({
        fansList:{grade1:[...this.state.fansList.grade1,...list],grade2:this.state.fansList.grade2,grade3:this.state.fansList.grade3},
        grade1Page:{...this.state.grade1Page,isLoading:false}
      })
    }else if(this.state.curIndex === 1){
      let grade2 = this.state.grade2Page
      if(!grade2.hasNext) return
      grade2.isLoading = true
      grade2.page_no ++
      const {page_no:page,page_size:pageSize} = grade2
      const {list,total_count} = await api.member.getFans({page,pageSize,type:2})
      Math.ceil(total_count/grade2.page_size) > grade2.page_no?grade2.hasNext = true:grade2.hasNext = false
      let newList
      if(this.state.fansList.grade2.length === 0){
        newList = list
      }else{
         newList = [...this.state.fansList.grade2,...list]
      }
      this.setState({
        fansList:{grade2:newList,grade1:this.state.fansList.grade1,grade3:this.state.fansList.grade3},
        grade2Page:{...this.state.grade2Page,isLoading:false}
      },() => {console.log(this.state.fansList)})
    }else {
      let grade3 = this.state.grade3Page
      if(!grade3.hasNext) return
      grade3.isLoading = true
      grade3.page_no ++
      const {page_no:page,page_size:pageSize} = grade3
      const {list,total_count} = await api.member.getFans({page,pageSize,type:3})
      Math.ceil(total_count/grade3.page_size) > grade3.page_no?grade3.hasNext = true:grade3.hasNext = false
      let newList
      if(this.state.fansList.grade3.length === 0){
        newList = list
      }else{
        newList = [...this.state.fansList.grade3,...list]
      }
      this.setState({
        fansList:{grade3:newList,grade1:this.state.fansList.grade1,grade2:this.state.fansList.grade2},
        grade3Page:{...this.state.grade3Page,isLoading:false}
      },() => {console.log(this.state.fansList)})
    }
  }
  handleSortChange =(index) => {
     this.setState({
       curIndex:index,
     },() => {
       this.fetch()
     })
  }
  nextPage = () => {
    console.log('到达底部')
    this.fetch()
  }
  render() {
    const {fansList,sortList} = this.state
    return(
      <View>
        <NavGap title='我的粉丝'/>
        <View className='content-container'>
          <View>
            <NavSort
              sortList={sortList}
              onsortChange={this.handleSortChange}
            />
          </View>
            <ScrollView
              className='fans-scroll'
              scrollY
              onScrollToLower={this.nextPage}
              enableFlex={true}
            >
              <View className='fans-scroll-content'>
                {
                  this.state.curIndex === 0&&
                  fansList.grade1.map((item,index) => {
                    return(
                      <View className='fans-item'>
                        <View className='fans-img'>
                          <Image src={item.headimgurl}/>
                        </View>
                        <View className='fans-info'>
                          <Text className='fans-info-name'>{item.nickname}</Text>
                          <View className='fans-info-vip'>钻石会员</View>
                          <View className='fans-info-city'>{item.city}</View>
                        </View>
                      </View>
                    )
                  })
                }
                {/*{*/}
                {/*  this.state.grade1Page.isLoading&&this.state.curIndex === 0&&*/}
                {/*  <Loading>加载中。。。</Loading>*/}
                {/*}*/}
                {
                  this.state.curIndex === 1&&
                  fansList.grade2.map((item,index) => {
                    return(
                      <View className='fans-item'>
                        <View className='fans-img'>
                          <Image src={item.headimgurl}/>
                        </View>
                        <View className='fans-info'>
                          <Text className='fans-info-name'>{item.nickname}</Text>
                          <View className='fans-info-vip'>至尊会员</View>
                          <View className='fans-info-city'>{item.city}</View>
                        </View>
                      </View>
                    )
                  })
                }
                {
                  this.state.curIndex === 2&&
                  fansList.grade3.map((item,index) => {
                    return(
                      <View className='fans-item'>
                        <View className='fans-img'>
                          <Image src={item.headimgurl}/>
                        </View>
                        <View className='fans-info'>
                          <Text className='fans-info-name'>{item.nickname}</Text>
                          <View className='fans-info-vip'>王者身份</View>
                          <View className='fans-info-city'>{item.city}</View>
                        </View>
                      </View>
                    )
                  })
                }
                {/*{*/}
                {/*  this.state.grade2Page.isLoading&& this.state.curIndex === 1&&*/}
                {/*  <Loading>加载中。。。</Loading>*/}
                {/*}*/}
              </View>
            </ScrollView>
          </View>
      </View>
    )
  }
}
