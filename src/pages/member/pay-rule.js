
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { NavBar } from '@/components'
import { withPager } from '@/hocs'
import api from '@/api'

import './pay.scss'

@withPager
export default class PayRule extends Component {
  constructor (props) {
    super(props)

    this.state = {
      info: null
    }
  }

  componentDidMount () {
    this.fetch()
  }

  async fetch () {
    const { content } = await api.member.depositPayRule()
    this.setState({
      info: content
    })
    console.log(content)
  }

  render () {
    const { info } = this.state

    return (
      <View className='page-member-integral'>
        <NavBar
          title='充值协议'
          leftIconType='chevron-left'
        />
        <View className='pay-rule-style'>{info}</View>
      </View>
    )
  }
}
