import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Progress} from '@tarojs/components'
import { Price, QnImg } from '@/components'
import { isObject, classNames } from '@/utils'
import api from '@/api'

import './index.scss'

export default class RecommendItem extends Component {
  static defaultProps = {
    onClick: () => {},
    showMarketPrice: true,
    noCurSymbol: false,
    type: 'item',
  }

  static options = {
    addGlobalClass: true
  }


  handleLikeClick = async (e) => {
    e.stopPropagation()
    const { item_id, is_like } = this.props.info
    console.log(is_like, item_id)
    // await api.item.collect(item_id)
  }

  render () {
    const { info, noCurSymbol, noCurDecimal, onClick, appendText, className, isPointDraw, type } = this.props
    if (!info) {
      return null
    }

    const img = info.img || info.image_default_id
    const img_head = info.head_portrait || info.image_default_id

    return (
      <View className={classNames('recommend-item', className)}>
        <View className='recommend-item__hd'>
          {this.props.children}
        </View>
        <View
          className='recommend-item__bd'
          onClick={onClick}
        >
          <View className='recommend-item__img-wrap'>
            <QnImg
              img-class='recommend-item__img'
              src={img}
              mode='widthFix'
              lazyLoad
            />
          </View>
          <View className='recommend-item__cont'>
            <View className='recommend-item__caption'>
              <Text className='recommend-item__title'>{info.title}</Text>
              <Text className='recommend-item__desc'>{info.summary}</Text>
            </View>
            <View className='recommend-item__extra'>
              <View className='recommend-item__author'>
                <Image
                  className='recommend-item__author-avatar'
                  src={img_head}
                  mode='aspectFill'
                />
                <Text className='recommend-item__author-name'>{info.author}</Text>
              </View>
              <View className={`recommend-item__actions ${info.isPraise ? 'is_like__active' : ''}`}>
                <View
                  className='icon-like'
                ><Text>{info.articlePraiseNum}</Text></View>
              </View>
            </View>
          </View>
        </View>
        <View className='recommend-item__ft'>
          {this.props.renderFooter}
        </View>
      </View>
    )
  }
}
