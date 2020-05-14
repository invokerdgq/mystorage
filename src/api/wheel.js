import req from './req'

// 大转盘获取
export function getTurntableconfig(params) {
  return req.get('/promotion/turntableconfig', params)
}

export function getTurntable (params = {}) {
  return req.get('/promotion/turntable', params)
}
