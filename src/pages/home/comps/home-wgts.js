import Taro, { PureComponent,Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import {WgtLimitKill ,FeautreSelect, WgtSearchHome, WgtFilm, WgtMarquees, WgtSlider, WgtImgHotZone, WgtNavigation, WgtCoupon, WgtGoodsScroll, WgtGoodsGrid, WgtShowcase, HotArea } from '../wgts'
import S from '@/spx'
import PostScrollNavigation from "../../../components/post-scroll-navigation/post-scroll-navigation"

export default class HomeWgts extends PureComponent {
  state = {
    screenWidth: 375
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    wgts: []
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    Taro.getSystemInfo()
      .then(res =>{
        this.setState({
          screenWidth: res.screenWidth
        })
      })
  }
  refresh(){
    this.props.refresh()
  }

  handleEntry =() => {
    if(S.getAuthToken()){
       Taro.navigateTo({
         url:'/others/pages/exchange/exchange'
       })
    }else{
      S.toast('请先登录')
      setTimeout(() => {
        Taro.navigateTo({
          url:'/pages/member/index'
        })
      },2000)
    }
  }

  render () {
    const  wgts  = this.props.wgts
    const { screenWidth } = this.state
    return (
      <View>
        {
          wgts.map((item, idx) => {
            return (
              <View className='wgt-wrap' key={idx}>
                {item.name === 'post_scroll'&&<PostScrollNavigation info={item}/>}
                {item.name === 'limit-kill'&& <WgtLimitKill info={item} refresh={this.refresh.bind(this)}/>}
                {item.name === 'search' && <WgtSearchHome info={item} />}
                {item.name === 'film' && <WgtFilm info={item} />}
                {item.name === 'marquees' && <WgtMarquees info={item} />}
                {item.name === 'slider' &&
                  <View>
                    <WgtSlider isHomeSearch info={item} width={screenWidth} />
                    {
                      idx === 1 &&
                      <FeautreSelect/>
                    }
                  </View>
                }
                {item.name === 'navigation' && <WgtNavigation info={item} />}
                {item.name === 'coupon' && <WgtCoupon info={item} />}
                {item.name === 'imgHotzone' && <WgtImgHotZone info={item} />}
                {item.name === 'goodsScroll' && <WgtGoodsScroll info={item} />}
                {item.name === 'goodsGrid' && <WgtGoodsGrid info={item} />}
                {item.name === 'showcase' && <WgtShowcase info={item} />}
              </View>
            )
          })
        }
        {/*{*/}
        {/*  <HotArea></HotArea>*/}
        {/*}*/}
      </View>
    )
  }
}
