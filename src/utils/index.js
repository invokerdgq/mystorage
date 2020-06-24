import Taro from '@tarojs/taro'
import classNames from 'classnames'
import styleNames from 'stylenames'
import qs from 'qs'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import S from '@/spx'
import { STATUS_TYPES_MAP } from '@/consts'
import _get from 'lodash/get'
import _findKey from 'lodash/findKey'
import _pickBy from 'lodash/pickBy'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import log from './log'
import canvasExp from './canvasExp'
import calCommonExp from './calCommonExp'
const isPrimitiveType = (val, type) => Object.prototype.toString.call(val) === type

export function isFunction (val) {
  return isPrimitiveType(val, '[object Function]')
}

export function isNumber (val) {
  return isPrimitiveType(val, '[object Number]')
}

export function isObject (val) {
  return isPrimitiveType(val, '[object Object]')
}

export function isArray (arr) {
  return Array.isArray(arr)
}

export function isString (val) {
  return typeof val === 'string'
}

export function normalizeArray (...args) {
  return args.reduce((ret, item) => ret.concat(item), [])
}

export function getCurrentRoute (router) {
  if (process.env.TARO_ENV === 'weapp') {
    // eslint-disable-next-line
    const page = getCurrentPages().pop()
    router = page.$component.$router
  }
  const { path, params: origParams } = router
  const params = _pickBy(origParams, val => val !== '')

  const fullPath = `${path}${Object.keys(params).length > 0 ? '?' + qs.stringify(params) : ''}`

  return {
    path,
    fullPath,
    params
  }
}

export function normalizeQuerys (params = {}) {
  const { scene, ...rest } = params
  const queryStr = decodeURIComponent(scene)

  const ret = {
    ...rest,
    ...qs.parse(queryStr)
  }

  return ret
}

export function pickBy (arr, keyMaps = {}) {
  const picker = (item) => {
    const ret = {}

    Object.keys(keyMaps).forEach(key => {
      const val = keyMaps[key]

      if (isString(val)) {
        ret[key] = _get(item, val)
      } else if (isFunction(val)) {
        ret[key] = val(item)
      } else {
        ret[key] = val
      }
    })

    return ret
  }

  if (isArray(arr)) {
    return arr.map(picker)
  } else {
    return picker(arr)
  }
}

export function navigateTo (url, isRedirect) {
  if (isObject(isRedirect)) {
    isRedirect = false
  }

  if (isRedirect) {
    return Taro.redirectTo({ url })
  }

  return Taro.navigateTo({ url })
}

export function resolvePath (baseUrl, params = {}) {
  const queryStr = typeof params === 'string'
    ? params
    : qs.stringify(params)

  return `${baseUrl}${baseUrl.indexOf('?') >= 0 ? '&' : '?'}${queryStr}`
}

export function formatTime (time, formatter = 'YYYY-MM-DD') {
  return moment(time).format(formatter)
}

export function formatDataTime (time, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(formatter)
}

export function copyText (text, msg = '内容已复制') {
  return new Promise((resolve, reject) => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.setClipboardData({
        data: text,
        success: resolve,
        error: reject
      })
    } else {
      if (copy(text)) {
        S.toast(msg)
        resolve(text)
      } else {
        reject()
      }
    }
  })
}

export function calcTimer (totalSec,type='s') {
  let remainingSec = totalSec
  const dd = Math.floor(type === 's'?totalSec / 24 / 3600:totalSec / 24 / 3600/1000)
  remainingSec -= type === 's'? dd * 3600 * 24:dd * 3600 * 24 * 1000
  const hh = Math.floor(type === 's'?remainingSec / 3600:remainingSec / 3600/1000)
  remainingSec -= type === 's'? hh * 3600:hh * 3600 * 1000
  const mm = Math.floor(type === 's'?remainingSec / 60:remainingSec / 60/1000)
  remainingSec -= type === 's'?mm * 60:mm * 60 * 1000
  const ss = Math.floor(type === 's'?remainingSec:remainingSec/1000)

  return {
    dd,
    hh,
    mm,
    ss
  }
}

export function resolveOrderStatus (status, isBackwards) {
  if (isBackwards) {
    return _findKey(STATUS_TYPES_MAP, o => o === status)
  }

  return STATUS_TYPES_MAP[status]
}

export function goToPage (page) {
  // eslint-disable-next-line
  const loc = location
  page = page.replace(/^\//, '')
  const url = `${loc.protocol}//${loc.host}/${page}`
  console.log(url)
  loc.href = url
}

export function maskMobile (mobile) {
  return mobile.replace(/^(\d{2})(\d+)(\d{2}$)/, '$1******$3')
}

// 不可使用promise/async异步写法
export function authSetting (scope, succFn, errFn) {
  Taro.getSetting({
    success (res) {
      const result = res.authSetting[`scope.${scope}`]
      if (result === undefined) {
        Taro.authorize({
          scope: `scope.${scope}`
        }).then(succFn, errFn)
      } else if (!result) {
        Taro.openSetting().then(succFn, errFn)
      } else {
        succFn()
      }
    }
  })
}

export function imgCompression (url) {
  const rule = '?imageView2/1/w/80'
  return url +  rule
}

export {
  classNames,
  styleNames,
  log,
  debounce,
	throttle,
	calCommonExp,
  canvasExp
}
