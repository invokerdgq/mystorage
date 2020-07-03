import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import { connect } from "@tarojs/redux";
import { Loading, SearchBar, TabBar } from '@/components'
import Series from './comps/series'
import { classNames, pickBy } from '@/utils'
import api from '@/api'
import NavGap from'../../components/nav-gap/nav-gap'

import './index.scss'
import {AtTabs, AtTabsPane} from "taro-ui";

@connect(store => ({
  store
}))
export default class Category extends Component {
  constructor (props) {
    super(props)

    this.state = {
      curTabIdx: 0,
      tabList: [],
      contentList: [],
      list: null,
      hasSeries: false,
      isChanged: false
    }
  }

  componentDidShow () {
    this.fetch()
  }

  async fetch () {
    /*const nList = pickBy(res, {
      category_name: 'category_name',
      image_url: 'image_url',
      children: 'children'
    })*/

    const query = {template_name: 'yykweishop', version: 'v1.0.1', page_name: 'category'}
    const { list } = await api.category.getCategory(query)
    let seriesList = list[0] ? list[0].params.data : []
    if (!seriesList.length) {
      const res = await api.category.get()
      const nList = pickBy(res, {
        name: 'category_name',
        img: 'image_url',
        id: 'id',
        category_id: 'category_id',
        children: ({ children }) => pickBy(children, {
          name: 'category_name',
          img: 'image_url',
          id: 'id',
          category_id: 'category_id',
          children: ({ children }) => pickBy(children, {
            name: 'category_name',
            img: 'image_url',
            category_id: 'category_id'
          })
        })
      })
      this.setState({
        list: nList,
        hasSeries: false
      })
    } else {
      let tabList = []
      let contentList = []
      if (list[0].params.hasSeries) {
        seriesList.map(item => {
          tabList.push({ title: item.title, status: item.name })
          contentList.push(item.content)
        })
      } else {
        contentList.push(seriesList)
      }
      const curIndexList = contentList[this.state.curTabIdx]
      const nList = pickBy(curIndexList, {
        name: 'name',
        img: 'img',
        children: 'children',
        hot: 'hot',
        id: 'id'
      })
      this.setState({
        tabList,
        contentList,
        hasSeries: true,
        list: nList,
      })
    }
  }

  handleClickTab = (idx) => {
    const curIndexList = this.state.contentList[idx]

    const nList = pickBy(curIndexList, {
      name: 'name',
      img: 'img',
      children: 'children',
      hot: 'hot',
      id: 'id'
    })
    this.setState({
      curTabIdx: idx,
      list: nList,
    })
    if(idx === this.state.curTabIdx){
      this.setState({
        isChanged: false
      })
    } else {
      this.setState({
        isChanged: true
      })
    }
  }

  render () {
    const { curTabIdx, tabList, list, hasSeries, isChanged } = this.state
    return (
        <View className='page-category-index'>
          {
            <NavGap title = '分类'/>
          }
          {
            tabList.length !== 0
              ? <AtTabs
                className='category__tabs'
                current={curTabIdx}
                tabList={tabList}
                onClick={this.handleClickTab}
              >
                {
                  tabList.map((panes, pIdx) =>
                    (<AtTabsPane
                      current={curTabIdx}
                      key={pIdx}
                      index={pIdx}
                    >
                    </AtTabsPane>)
                  )
                }
              </AtTabs>
              : null
          }
          <View className={`${hasSeries && tabList.length !== 0 ? 'category-comps' : 'category-comps-not'}`}>
            <Series
              isChanged={isChanged}
              info={list}
            />
            <View className='line-left'/>
          </View>
          {
            process.env.TARO_ENV === 'weapp'?null:
              <TabBar />
          }
        </View>
    )
  }
}
