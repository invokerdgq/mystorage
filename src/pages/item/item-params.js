import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ParamsItem } from './comps'
import { pickBy } from '@/utils'
import api from '@/api'
import NavGap from "../../components/nav-gap/nav-gap";

import './item-params.scss'

export default class ItemParams extends Component {
  static config = {
    navigationBarTitleText: '商品参数'
  }

  constructor (props) {
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.fetch()
  }

  async fetch () {
    const { id } = this.$router.params
    const info = await api.item.detail(id)
    const { item_params } = info
    const itemParams = pickBy(item_params, {
      label: 'attribute_name',
      value: 'attribute_value_name'
    })
    this.setState({
      list: itemParams
    })
  }

  render () {
    const { list } = this.state

    return (
      <View>
        <NavGap title='item-params'/>
        <View className="goods-params-wrap">
          <View className="goods-params">
            {
              list.map((item, idx) => {
                return (
                  <ParamsItem
                    key={idx}
                    info={item}
                  />
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
