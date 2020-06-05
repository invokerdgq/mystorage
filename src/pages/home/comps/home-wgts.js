import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {WgtLimitKill ,FeautreSelect, WgtSearchHome, WgtFilm, WgtMarquees, WgtSlider, WgtImgHotZone, WgtNavigation, WgtCoupon, WgtGoodsScroll, WgtGoodsGrid, WgtShowcase, HotArea } from '../wgts'


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
    console.log('kkkkkkkk')
    console.log(this.props.wgts)
    Taro.getSystemInfo()
      .then(res =>{
        this.setState({
          screenWidth: res.screenWidth
        })
      })
  }
  Refresh(){
    this.props.Refresh()
  }

  render () {
    const  wgts  = this.props.wgts
    console.log('yyyyyyyyyy')
    console.log(wgts)
    const { screenWidth } = this.state
    return (
      <View>
        {
          wgts.map((item, idx) => {
            return (
              <View className='wgt-wrap' key={idx}>
                {item.name === 'limit-kill'&& <WgtLimitKill info={item} Refresh={this.Refresh}/>}
                {item.name === 'search' && <WgtSearchHome info={item} />}
                {item.name === 'film' && <WgtFilm info={item} />}
                {item.name === 'marquees' && <WgtMarquees info={item} />}
                {item.name === 'slider' &&
                  <View>
                    <WgtSlider isHomeSearch info={item} width={screenWidth} />
                      <FeautreSelect/>
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
