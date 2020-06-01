import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import './share-panel.scss';

export default class SharePanel extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    info: null,
    onClose: () => {},
    onClick: () => {}
  }

  render () {
    const { info, isOpen, onClose, onClick } = this.props

    return (
      <AtFloatLayout
        isOpened={isOpen}
        title=" "
        onClose={onClose}
        scrollX={false}
        scrollY={false}
        >
        <View className="share-panel">
          <View className="share-panel__item" onClick={onClick}>
            <Button className="icon-pengyouquan iconfont"></Button>
            <View>分享到朋友圈</View>
          </View>
          <View className="share-panel__item" >
            <Button
              openType='share'
              className=" icon-wechat iconfont ">
            </Button>
            <View>分享给微信好友</View>
          </View>
        </View>
      </AtFloatLayout>
    )
  }
}
