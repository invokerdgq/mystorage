import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Loading, FloatMenus, FloatMenuItem, GoodsEvaluation, GoodsComment } from '@/components'
import api from '@/api'
import { withBackToTop, withPager } from '@/hocs'
import { normalizeQuerys } from '@/utils'
import entry from '@/utils/entry'

import './espier-evaluation.scss'

@withPager
@withBackToTop
export default class Evaluation extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      evaluationList: [],
      evaluationTotal: 0,
      showCommentPanel: false,
      curRate: {},
      userInfo: {}
    }
  }

  async componentWillMount() {
    const query = normalizeQuerys(this.$router.params)
    this.$router.params.id = query.id
    await entry.entryLaunch(this.$router.params, false)
  }

  componentDidMount () {
    const userInfo = Taro.getStorageSync('userinfo')
    this.setState({
      userInfo
    })
    this.nextPage()
  }

  async fetch (params) {
    const { page_no: page, page_size: pageSize } = params
    const query = {
      page,
      pageSize,
      item_id: this.$router.params.id
    }
    const { list, total_count } = await api.item.evaluationList(query)
    list.map(item => {
      item.picList = item.rate_pic ? item.rate_pic.split(',') : []
    })

    this.setState({
      evaluationList: [...this.state.evaluationList, ...list],
      evaluationTotal: total_count
    })
    return {
      total: total_count
    }
  }

  /*async handlePraiseRate (item) {
    Taro.showLoading({
      mask: true
    })
    await api.item.praiseRate(item.rate_id)
    Taro.hideLoading()
    const { evaluationList } = this.state
    for (let evaluation of evaluationList) {
      if (evaluation.rate_id == item.rate_id) {
        if (item.praise_status) {
          evaluation.praise_num--
          evaluation.praise_status = false
        } else {
          evaluation.praise_num++
          evaluation.praise_status = true
        }
        break
      }
      continue
    }
    this.setState({
      evaluationList
    })
  }*/

  handleReplyRate = async (e) => {
    console.log(this.itemComment, 92)
    if (!e) {
      return
    }
    Taro.showLoading({
      mask: true
    })
    await api.item.replyRate({
      rate_id: this.itemComment.rate_id,
      content: e
    })

    Taro.hideLoading()
   /* const { userInfo, info } = this.state

    if (!e) {
      return
    }
    Taro.showLoading({
      mask: true
    })
    await api.item.replyRate({
      rate_id: info.rate_id,
      content: e
    })

    Taro.hideLoading()
    info.reply.list.unshift({
      username: userInfo.username,
      content: e
    })
    info.reply.total_count++
    this.setState({
      info,
      showCommentPanel: false
    },()=>{
      this.props.onAddEvaluation({info: info})
    })*/
  }

  showComment =(item) => {
    this.itemComment = item
    this.setState({
      showCommentPanel: true
    })
  }



  render () {
    const { showBackToTop, evaluationList, showCommentPanel } = this.state

    if (!evaluationList.length) {
      return (
        <Loading />
      )
    }

    return (
      <View className='page-goods-evaluation'>
        <ScrollView
          className='goods-detail__scroll'
          onScrollToLower={this.nextPage}
          scrollY
        >
          <View className='goods-evaluation-wrap'>
            <View className='evaluation-list'>
              {evaluationList.map(item => {
                return (
                  <GoodsEvaluation
                    info={item}
                    key={item.rate_id}
                    pathRoute='espier-evaluation'
                    showComment={true}
                    onReplyRate={this.showComment.bind(this, item)}
                  />
                )
              })}
            </View>
          </View>
        </ScrollView>

        <FloatMenus>
          <FloatMenuItem
            iconPrefixClass='apple'
            icon='arrow-up'
            hide={!showBackToTop}
            onClick={this.scrollBackToTop}
          />
        </FloatMenus>

        {
          showCommentPanel && <GoodsComment
            isOpened={showCommentPanel}
            onClose={() => this.setState({ showCommentPanel: false, curRate: {} })}
            onReplyRate={this.handleReplyRate.bind(this)}
          />
        }
      </View>
    )
  }
}
