import Taro from '@tarojs/taro'
import api from '@/api'
import req from '@/api/req'

// 请在onload 中调用此函数，保证千人千码跟踪记录正常
// 用户分享和接受参数处理
async function entryLaunch(data, isNeedLocate) {
  let options = null
  if (data.scene) {
    const scene = decodeURIComponent(data.scene)
    //格式化二维码参数
    if(/=/.test(scene)){
      options = parseUrlStr(scene)
    }else{
      options = {
        uid:data.scene
      }
    }
  } else {
    options = data
  }

  // 如果没有带店铺id
  if (!options.dtid) {
    let { distributor_id } = Taro.getStorageSync('curStore')
    if (distributor_id) {
      options.dtid = distributor_id
    }
  }
  if(options.assist_id){
    Taro.setStorageSync('assist_id',options.assist_id)
  }
  let dtidValid = false
  let store = {}

  // 传过来的店铺id
  if (options.dtid) {
    store = await handleDistributorId(options.dtid)
    dtidValid = store.status ? false : true
  }

  // 如果需要定位,并且店铺无效，
  if (!dtidValid) {
    store = await getLocal(isNeedLocate)

  }

  if (!store.status) {
    options.store = store
    options.dtid = store.distributor_id
  }

  if (options.uid) {
    // 如果分享带了会员ID 那么
    Taro.setStorageSync('distribution_shop_id', options.uid)
    Taro.setStorageSync('distribution_shop_exp', Date.parse(new Date()))
    Taro.setStorageSync('trackParams', {})
  } else if (options.s && options.m) {
    Taro.setStorageSync('distribution_shop_id', '')
    Taro.setStorageSync('distribution_shop_exp', '')
    Taro.setStorageSync('trackParams', {source_id: options.s, monitor_id: options.m})
    trackViewNum(options.m, options.s)
  }

  if(options.i){
    Taro.setStorageSync('inviteCode', options.a)
  }
  if(options.a){
    Taro.setStorageSync('distribution_shop_id', options.i)
  }
  return options
}

//获取定位配置
async function getLocalSetting() {
  const filter = {template_name: 'yykweishop', version: 'v1.0.1', name: 'setting'}
  // const res = await api.category.getCategory(filter)
  let res = []
  const data = res.length ? res[0].params : null
  if (res.length > 0) {
    if (!data || !data.config) {
      return true
    } else if(data.config.location){
      return true
    } else {
      return false
    }
  } else {
    return true
  }
  return positionStatus
}

async function getLocal (isNeedLocate) {
  const positionStatus = await getLocalSetting()
  let store = null
  if (!positionStatus) {
    store = await api.shop.getShop()
  } else {
    let lnglat = Taro.getStorageSync('lnglat')
    if (lnglat) {
      let param = {}
      if (isNeedLocate && positionStatus) {
        param.lat = lnglat.latitude
        param.lng = lnglat.longitude
      }
      store = await api.shop.getShop(param)
    } else {
      if (process.env.TARO_ENV === 'weapp') {
        var locationData = await getLoc()
        if (locationData !== '') {
          let param = {}
          if (isNeedLocate && positionStatus) {
            param.lat = locationData.latitude
            param.lng = locationData.longitude
          }
          store = await api.shop.getShop(param)

        } else {
          store = await api.shop.getShop()
        }
      } else {
        store = await api.shop.getShop()
      }
    }
  }

  if (!store.status) {
    Taro.setStorageSync('curStore', store)
  } else {
    Taro.setStorageSync('curStore', [])
  }
  return store
}

async function getLoc () {
  return await Taro.getLocation({type: 'gcj02'}).then(locationData => {
    Taro.setStorage({ key: 'lnglat', data: locationData })
    return locationData
  }, res => {
    return ''
  })
}

// 新增千人千码跟踪记录
function trackViewNum (monitor_id, source_id) {
  let _session = Taro.getStorageSync('_session')
  if (!_session) {
    return true
  }

  if (monitor_id && source_id) {
    let param = {source_id: source_id, monitor_id: monitor_id}
    api.track.viewnum(param)
  }
  return true
}

// distributorId 店铺ID
async function handleDistributorId(distributorId) {
  const res = await api.shop.getShop({distributor_id: distributorId})
  if (res.status === false) {
    Taro.setStorageSync('curStore', res)
  } else {
    Taro.setStorageSync('curStore', [])
  }
  return res
}

// 格式化URL字符串
function parseUrlStr (urlStr) {
  var keyValuePairs = []
  if (urlStr) {
    for (var i = 0; i < urlStr.split('&').length; i++) {
      keyValuePairs[i] = urlStr.split('&')[i]
    }
  }
  var kvObj = []
  for (var j = 0; j < keyValuePairs.length; j++) {
    var tmp = keyValuePairs[j].split('=')
    kvObj[tmp[0]] = decodeURI(tmp[1])
  }
  return kvObj
}

export default {
  entryLaunch,
  getLocal,
  getLocalSetting
}
