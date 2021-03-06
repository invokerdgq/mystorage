import req from './req'

export function getRoomList(params) {
  return req.get('/live/room',params)
}
export function postInfo(params) {
  return req.post('/live/import/account',params)
}
export function changeUserStatus(params) {
  return req.post('/live/online/status',params)
}
export function getOnlineRoom(params) {
  return req.get('/live/online/list',params)
}
export function giveLike(params) {
  return req.post('/live/like',params)
}
export function getUserSig(params) {
  return req.get('/live/usersig',params)
}
export function checkActive() {
   return req.get('/live/check')
}
export function activeLive(params) {
   return req.post('/live/activate',params)
}
export function uploadImg(params,config) {
  return req.post('/espier/upload',params,config)
}
export function postConfig(params) {
  return req.post('/live/config',params)
}
export function getConfig() {
  return req.get('/live/config',{} ,{ showError: false })
}
