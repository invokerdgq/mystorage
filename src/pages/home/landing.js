
import Taro, { Component } from '@tarojs/taro'
import {View } from '@tarojs/components'
import { connect } from "@tarojs/redux";
import { normalizeQuerys } from '@/utils'
import NavGap from "../../components/nav-gap/nav-gap";

import './landing.scss'
@connect(() => ({}), (dispatch) => ({
  onUserLanding: (land_params) => dispatch({ type: 'user/landing', payload: land_params })
}))
export default class Landing extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
    }
  }
  componentDidMount () {
    const query = normalizeQuerys(this.$router.params)

    this.props.onUserLanding(query)

    this.fetch()
  }

  async fetch () {
    Taro.redirectTo({
      url: '/pages/auth/reg'
    })
  }

  render () {
    return (
      <View>
        <NavGap title='landing'/>
        <View className='page-member-integral'>
          <View>跳转中...</View>
        </View>
      </View>
    )
  }
}
