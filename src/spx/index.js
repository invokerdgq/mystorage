import Taro from '@tarojs/taro'
import '@tarojs/async-await'
import api from '@/api'
import { getCurrentRoute, log } from '@/utils'

const globalData = {}
const TOKEN_IDENTIFIER = 'auth_token'
const TOKEN_TIMESTAMP = 'refresh_token_time'

function remove (arr, item) {
  const idx = arr.indexOf(item)
  if (idx >= 0) {
    arr.splice(idx, 1)
  }
}

function isAsync (func) {
  const string = func.toString().trim()

  return !!(
    string.match(/^async /) ||
    string.match(/return _ref[^.]*\.apply/) || // babel transform
    func.then
  )
}

class Spx {
  constructor (options = {}) {
    this.hooks = []
    this.options = {
      autoRefreshToken: true,
      ...options
    }

    if (this.options.autoRefreshToken) {
      this.startRefreshToken()
    }
  }

  getAuthToken () {
    const authToken = Taro.getStorageSync(TOKEN_IDENTIFIER)
    if (authToken && !this.get(TOKEN_IDENTIFIER)) {
      this.set(TOKEN_IDENTIFIER, authToken)
    }
    return authToken
  }

  setAuthToken (token) {
    this.set(TOKEN_IDENTIFIER, token)
    Taro.setStorageSync(TOKEN_IDENTIFIER, token)
    Taro.setStorageSync(TOKEN_TIMESTAMP, Date.now() + 55 * 60 * 1000)
  }

  startRefreshToken () {
    if (this._refreshTokenTimer) {
      clearTimeout(this._refreshTokenTimer)
    }
    const checkAndRefresh = async () => {
      const expired = Taro.getStorageSync(TOKEN_TIMESTAMP)
      if (!expired) return
      const delta = expired - Date.now()
      if (delta > 0 && delta <= 5 * 60 * 1000) {
        const { token } = await api.user.refreshToken()
        clearTimeout(this._refreshTokenTimer)
        this.setAuthToken(token)
      }
    }

    this._refreshTokenTimer = setInterval(checkAndRefresh, 5 * 60 * 1000)
  }

  async getUserInfo () {
    let userInfo = this.get('userInfo')
    const token = this.getAuthToken()
    if (!userInfo && token) {
      userInfo = await api.user.info()
      this.set('userInfo', userInfo)
    }

    return userInfo
  }

  get (key) {
    return globalData[key]
  }

  set (key, val) {
    globalData[key] = val
  }

  hasHook (name) {
    return this.hooks[name] !== undefined
  }

  async trigger (name, ...args) {
    const cbs = this.hooks[name]
    if (!cbs) return

    const ret = []

    for (let cb of cbs) {
      let rs = isAsync(cb)
        ? await cb.apply(this, args)
        : cb.apply(this, args)

      ret.push(rs)
    }

    return ret
  }

  bind (name, fn) {
    const fns = this.hooks[name] || []
    fns.push(fn)
    this.hooks[name] = fns
  }

  unbind (name, fn) {
    const fns = this.hooks[name]
    if (!fns) return

    remove(fns, fn)
  }

  async autoLogin (ctx, next) {
    try {
      await this.trigger('autoLogin', ctx)
      // if (process.env.NODE_ENV === 'weapp') {
      //   await Taro.checkSession()
      // }
      if (!this.getAuthToken()) {
        throw new Error('auth token not found')
      }

      let userInfo = await this.getUserInfo()
      if (next) await next(userInfo)
      if (!userInfo) throw new Error('userInfo is empty')

      return userInfo
    } catch (e) {
      log.debug('[auth failed] redirect to login page: ', e)

      this.login(ctx)
    }
  }

  login (ctx, isRedirect = false) {
    const { path, fullPath } = getCurrentRoute(ctx.$router)
    const encodedRedirect = encodeURIComponent(fullPath)
    if (path === APP_AUTH_PAGE) {
      return
    }

    const authUrl = APP_AUTH_PAGE + `?redirect=${encodedRedirect}`

    Taro[isRedirect ? 'redirectTo' : 'navigateTo']({
      url: authUrl
    })
  }

  logout () {
    Taro.removeStorageSync(TOKEN_IDENTIFIER)
    delete globalData[TOKEN_IDENTIFIER]
    this.trigger('logout')
  }

  globalData () {
    if (process.env.NODE_ENV === 'production') {
      return null
    } else {
      return globalData
    }
  }

  toast (...args) {
    Taro.eventCenter.trigger.apply(Taro.eventCenter, ['sp-toast:show', ...args])
  }

  closeToast () {
    Taro.eventCenter.trigger('sp-toast:close')
  }
}



export default new Spx()
