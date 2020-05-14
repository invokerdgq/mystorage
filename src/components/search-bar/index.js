import Taro, { Component } from '@tarojs/taro'
import {View, Form, Text, Image} from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { classNames } from '@/utils'
import { toggleTouchMove } from '@/utils/dom'

import './index.scss'

export default class SearchBar extends Component {
  static defaultProps = {
    isOpened: false,
    keyword: '',
    showDailog: true
  }

  constructor (props) {
    super(props)

    this.state = {
      searchValue: '',
      showSearchDailog: false,
      historyList: [],
      isShowAction: false
    }
  }

  static options = {
    addGlobalClass: true
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'h5') {
      toggleTouchMove(this.refs.container)
    }
  }

  handleFocusSearchHistory = (isOpened) => {
    this.props.onFocus()
    this.setState({
      showSearchDailog: isOpened,
      isShowAction: true
    })
    Taro.getStorage({ key: 'searchHistory' })
      .then(res => {
        let stringArr = res.data.split(',')
        this.setState({ historyList: stringArr })
      })
      .catch(() => {})
  }

  handleChangeSearch = (value) => {
    value = value.replace(/\s+/g,'')
    this.props.onChange(value)
  }

  handleClear = () => {
    this.props.onClear()
  }

  handleConfirm = (e) => {
    if (e.detail.value) {
      Taro.getStorage({ key: 'searchHistory' })
        .then(res => {
          let stringArr = res.data.split(',')
          let arr = [].concat(stringArr);
          arr.unshift(e.detail.value)
          arr = Array.from(new Set(arr))
          let arrString = arr.join(',')
          Taro.setStorage({ key: 'searchHistory', data: arrString })
        })
        .catch(() => {
          let arr = []
          arr.push(this.state.searchValue)
          let arrString = arr.join(',')
          Taro.setStorage({ key: 'searchHistory', data: arrString })
        })
      this.props.onConfirm(e.detail.value)
      /*Taro.navigateTo({
        url: `/pages/item/list?keywords=${this.state.searchValue}`
      })*/
    }
    this.setState({
      showSearchDailog: false,
      isShowAction: false
    })
  }

  handleClickCancel = (isOpened) => {
    this.props.onCancel()
    this.setState({
      showSearchDailog: isOpened,
      isShowAction: false
    })
  }

  handleClickDelete = () => {
    Taro.removeStorage({ key: 'searchHistory' })
      .then(() => {
        this.setState({ historyList: [] })
      })
  }

  handleClickTag = (item) => {
    this.props.onConfirm(item)
    this.setState({
      showSearchDailog: false,
      isShowAction: false
    })
  }

  handleClickHotItem = () => {
    console.log('热门搜索', 100)
  }

  render () {
    const { isFixed, keyword, showDailog } = this.props
    const { showSearchDailog, historyList, isShowAction, searchValue } = this.state
    return (
      <View
        className={classNames('search-input', isFixed ? 'search-input-fixed' : null, showSearchDailog ? 'search-input__focus' : null, !showDailog && 'without-dialog')}
      >

        {/*<View*/}
        {/*className={classNames('search-input', className === 'category-top' ? className : '', showSearchDailog ? 'search-input__focus' : null, isFixed ? 'search-input-fixed' : null)}*/}
        {/*ref='container'*/}
        {/*>*/}
        {/*<Form className={classNames('search-input__form', className === 'home-index-search' ? `${className} login-width` : '')} onSubmit={this.handleConfirm.bind(this)}>*/}
        {/*<View className='search-input__form-cont'>*/}
        {/*{*/}
        {/*showSearchDailog === false && className === 'home-index-search' ? <View className='search-logo'>PJJ</View> : null*/}
        {/*}*/}
        {/*<View className='search-input__inner'>*/}
        {/*<AtSearchBar*/}
        {/*className={classNames('search-input__bar', className === 'home-index-search' ? className : '')}*/}
        {/*value={searchValue}*/}
        {/*actionName='取消'*/}
        {/*showActionButton={isShowAction}*/}
        {/*onFocus={this.handleFocusSearchHistory.bind(this, true)}*/}
        {/*onChange={this.handleChangeSearch.bind(this)}*/}
        {/*onConfirm={this.handleConfirm.bind(this)}*/}
        {/*onActionClick={this.handleClickCancel.bind(this, false)}*/}
        {/*/>*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</Form>*/}
        {/*<View className={classNames(showSearchDailog ? 'search-input__history' : 'search-input__history-none')}>*/}
        {/*<View className='search-input__history-title'>*/}
        {/*<Text>最近搜索</Text>*/}
        {/*<Text className='sp-icon sp-icon-shanchu icon-del' onClick={this.handleClickDelete.bind(this)}></Text>*/}
        {/*</View>*/}
        {/*<View className='search-input__history-list'>*/}
        {/*{*/}
        {/*historyList.map((item, index) => <View className='search-input__history-list__btn' key={index} onClick={this.handleClickTag.bind(this, item)}>{item}</View> )*/}
        {/*}*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</View>*/}
        <Form className='search-input__form'>
          <AtSearchBar
            className='search-input__bar'
            value={keyword}
            placeholder='请输入关键词'
            actionName='取消'
            showActionButton={isShowAction}
            onFocus={this.handleFocusSearchHistory.bind(this, true)}
            onClear={this.handleClear}
            onChange={this.handleChangeSearch.bind(this)}
            onConfirm={this.handleConfirm.bind(this)}
            onActionClick={this.handleClickCancel.bind(this, false)}
          />
        </Form>
        {
          showDailog &&
          <View className={classNames(showSearchDailog ? 'search-input__history' : 'search-input__history-none')}>
            <View className='search-input__history-title'>
              <Text>最近搜索</Text>
              <Text className='icon-trash icon-del' onClick={this.handleClickDelete.bind(this)}></Text>
            </View>
            <View className='search-input__history-list'>
             {
                historyList.map((item, index) => <View className='search-input__history-list__btn' key={index} onClick={this.handleClickTag.bind(this, item)}>{item}</View> )
             }
            </View>
            {/*<View className='search-input__history-title hot-title'>
              <Text>热门搜索</Text>
            </View>
            <View className='hot-list'>
              <View className='hot-list__item' onClick={this.handleClickHotItem.bind(this)}>
                <Text>#绿茶籽小绿瓶#</Text>
                <View className='at-icon at-icon-chevron-right'></View>
              </View>
            </View>*/}
          </View>
        }
      </View>
    )
  }
}
