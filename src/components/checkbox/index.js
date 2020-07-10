import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { classNames } from '@/utils'

import './index.scss'

@connect(({ colors }) => ({
  colors: colors.current
}))

export default class SpCheckbox extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      isChecked: this.props.checked
    }
  }

  componentWillReceiveProps (nextProps) {
    const { checked } = nextProps

    if (checked !== this.state.isChecked) {
      this.setState({
        isChecked: checked
      })
    }
  }

  handleClick = () => {
    console.log('oooooooooooooooooooooo')
    if (this.props.disabled) return
    const isChecked = !this.state.isChecked
    this.setState({
      isChecked
    })
    this.props.onChange && this.props.onChange(isChecked)
  }

  render () {
    const { colors } = this.props
    const { isChecked } = this.state

    return (
      <View
        className={classNames('sp-checkbox__wrap', isChecked ? 'sp-checkbox__checked' : null)}
        onClick={this.handleClick}
      >
        <View
          className='sp-checkbox'
          style={isChecked ? 'background: ' + '#c0534e' : null}
        >
          <View className='at-icon at-icon-check'></View>
        </View>
        <Text className='sp-checkbox__label'>{this.props.children}</Text>
      </View>
    )
  }
}
