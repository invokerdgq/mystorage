import req from './req'

export function getAssistList() {
    return req.get('/promotion/assistactivity/getlist')
}
export function attendassist(id) {
    return req.post(`/promotion/assistactivity/attendassist/${id}`)
}

export function getGoodsList(params) {
   return req.get('/promotion/assistactivity/getitemslist',params)
}

export function getShareInfo(params) {
   return req.get('/promotion/assistactivity/getshareinfo',params)
}

export function assist(params) {
  return req.post('/promotion/assistactivity/help',params)
}

export function getCouponList(params) {
  return req.get('/promotion/assistactivity/getassistcardlist',params)
}
