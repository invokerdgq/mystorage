import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '@/api'
import { SpHtmlContent } from '@/components'
import { formatTime } from '@/utils'
import NavGap from "../../components/nav-gap/nav-gap";

import './index.scss'

export default class ArticleIndex extends Component {
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
    const { id } = this.$router.params
    const info = await api.article.detail(id)

    info.updated_str = formatTime(info.updated * 1000, 'YYYY-MM-DD HH:mm')
    this.setState({
      info
    })
  }

  render () {
    const { info } = this.state

    if (!info) {
      return null
    }

    return (
      <View>
        <NavGap title={info.title}/>
        <View className='article-index'>
          {info.image_url && (
            <Image
              className='article-brand'
              src={info.image_url}
              mode='widthFix'
            />
          )}
          <View className='article-info'>
            <Text className='article-title'>{info.title}</Text>
            <Text className='article-time'>{info.updated_str}</Text>
            <SpHtmlContent
              content={info.content}
            ></SpHtmlContent>
          </View>
        </View>
      </View>
    )
  }
}
