import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'

import './marquees.scss'

export default class WgtMarquees extends Component {   //                     文字轮播
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    info: null
  }

  constructor (props) {
    super(props)

    this.state = {
      announce: null
    }
  }

  componentDidMount () {
    const { info } = this.props
    const { config, data } = info

    if (config.direction === 'horizontal') {
      const announce = data.map(t => t.title).join('　　')
      this.setState({
        announce
      })
    }
  }

  handleClickItem = (id) => {
    try {
      Taro.navigateTo({
        url: `/pages/recommend/detail?id=${id}`
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    const { info } = this.props

    if (!info) {
      return null
    }
    const { config, base, data } = info

    return (
      <View
        className={`wgt ${base.padded ? 'wgt__padded' : null} ${config.direction === 'vertical' ? 'marquees-vertical' : 'marquees-horizontal'}`}
        style={`background:${config.bgcolor}`}
      >
        <View
          className='marquees-label'
          style={`background:${config.bgcolor}; color:${config.labelcolor}`}
        >
          {
            config.label
              ? <Text
                className='label-text'
                style={`border-color:${config.labelcolor}`}
              >{config.label}</Text>
              : null
          }
          <Text className='icon-sound'></Text>
        </View>
        {
          config.direction === 'vertical'
            ? <Swiper
              className='marquees'
              autoplay
              circular
              interval={3000}
              duration={300}
              vertical={config.direction}
              style={`background-color:${config.bgcolor}`}
            >
                  {data.map((item, idx) => {
                    return (
                      <SwiperItem
                        key={idx}
                        className='marquees-item'
                      >
                        <View
                          onClick={this.handleClickItem.bind(this, item.id)}
                          style={`color:${config.fontcolor}`}
                          className='item-text'
                        >
                          {item.title}
                        </View>
                      </SwiperItem>
                    )
                  })}
                </Swiper>
            : <View style={`background:${config.bgcolor}; color:${config.fontcolor}`}>
                <AtNoticebar marquee>
                  <Text>{announce}</Text>
                </AtNoticebar>
              </View>
        }
      </View>
    )
  }
}
