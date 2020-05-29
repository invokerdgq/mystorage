import req from './req'

const getAppId = () => {
  const { appid } = wx.getExtConfigSync? wx.getExtConfigSync(): {}
  return appid
}

export function login (data) {
  return req.post('/login', data)
}

export function logout () {
  return req.post('/user.logout')
}

export function refreshToken () {
  return req.get('/token/refresh')
}

export function reg (params) {
  const appid = getAppId()
  return req.post('/member', {
    ...params,
    appid,
  })
}

export function regRule () {
  return req.get('/member/agreement')
}

export function regImg (params = {}) {
  return req.get('/member/image/code', params)
}

export function regSmsCode (params = {}) {
  return req.get('/member/sms/code', params)
}

export function regParam () {
  return req.get('/member/setting')
}

export function info () {
  return { data: {} }
  // return req.get('/member/setting')
}

export function forgotPwd (params = {}) {
  return req.post('/member/reset/password', params)
}

export function prelogin (data) {
  return req.post('/prelogin', data)
}

export function checkpclogin (data) {
  return req.post('/oauthlogin', data)
}

export function pclogin (data) {
  return req.post('/oauth/login/authorize', data)
}

export function reg_pclogin (data) {
  return req.post('/member/decryptPhoneOauth', data)
}

export function registrationActivity (data) {
  return req.get('/registrationActivity', data)
}

export function registrationSubmit (data) {
  return req.post('/registrationSubmit', data)
}

export function registrationRecordList (data) {
  return req.get('/registrationRecordList', data)
}

export function registrationRecordInfo (data) {
  return req.get('/registrationRecordInfo', data)
}

export function scancodeAddcart (data) {
  return req.post('/goods/scancodeAddcart', data)
}

export function newWxaMsgTmpl (params = {}) {
  return req.get('/newtemplate', params)
}
