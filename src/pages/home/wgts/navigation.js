/*
 * @Author: Arvin
 * @GitHub: https://github.com/973749104
 * @Blog: https://liuhgxu.com
 * @Description: 说明
 * @FilePath: /xinbai-p/src/pages/home/wgts/navigation.js
 * @Date: 2020-03-11 17:06:55
 * @LastEditors: Arvin
 * @LastEditTime: 2020-03-16 12:10:34
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { QnImg } from '@/components'
import { linkPage } from './helper'

import './navigation.scss'

export default class WgtNavigation extends Component {   //---------------------图片导航
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    info: null
  }

  handleClickItem = linkPage

  render () {
    const { info } = this.props

    if (!info) {
      return null
    }

    const { base, data } = info

    return (
      <View className={`wgt ${base.padded ? 'wgt__padded' : null}`}>
        <View className='wgt__body with-padding'>
          <View className='navigation'>
            {data.map((item, idx) => {
              return (
                <View
                  className='nav-item'
                  key={idx}
                  onClick={this.handleClickItem.bind(this, item.linkPage, item.id)}
                >
                  <View class='nav-img-wrap'>
                    <QnImg
                      img-class='nav-img'
                      src={item.imgUrl}
                      mode='widthFix'
                      // width='100%'
                      lazyLoad
                    />
                  </View>
                  <Text className='nav-name'>{item.content}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}
