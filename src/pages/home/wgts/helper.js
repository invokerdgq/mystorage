import Taro from '@tarojs/taro'
import { WGTS_NAV_MAP } from '@/consts'

export function linkPage (type, id) {
  console.log(type, id)
  let url = ''

  switch (type) {
    case 'goods':
      url = '/pages/item/espier-detail?id=' + id
      break;
    case 'category':
      url = '/pages/item/list?cat_id=' + id
      break;
    case 'article':
      url = '/pages/article/index?id=' + id
      break;
    case 'planting':
      url = '/pages/recommend/detail?id=' + id
      break;
    case 'custom_page':
      url = '/pages/custom/custom-page?id=' + id
      break;
    case 'marketing':
      url = '/pages/item/group-list'
      break;
    case 'seckill':
      url = '/pages/item/seckill-goods-list?seckill_id=' + id
      break;
    case 'link':
      url = id === 'vipgrades' ? '/pages/vip/vipgrades' : id === 'transform'?'/others/pages/transform/transform':''
      break;
    case 'tag':
      url = '/pages/item/list?tag_id=' + id
      break;
    case 'regactivity':
      url = '/marketing/pages/reservation/goods-reservate?activity_id=' + id
      break;
    case 'custom':
      url = id
      break;
    case 'liverooms':
      url = 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+id
      break;
    default:
  }

  console.log('00000000000000000000000000000000')
  console.log(url)
  Taro.navigateTo({
    url
  })
}

export default {}
