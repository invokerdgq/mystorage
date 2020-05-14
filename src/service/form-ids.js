import api from '@/api'
import { log } from '@/utils'

class FormIds {
  constructor (options = {}) {
    this._collectingFormIdsTimer = null
    this._formIds = []
    this.options = {
      duration: 30 * 1000,
      ...options
    }
  }

  startCollectingFormIds () {
    if (this._collectingFormIdsTimer) {
      clearInterval(this._collectingFormIdsTimer)
    }

    const collecting = () => {
      this.flush()
    }

    this._collectingFormIdsTimer = setInterval(collecting, this.options.duration)
    log.debug(`[form-ids] start collecting`)
  }

  collectFormIds (ids, sync) {
    if (!ids) return
    if (!Array.isArray(ids)) {
      ids = [ids]
    }

    if (sync) {
      this.flush(ids)
    } else {
      this._formIds = [...this._formIds, ...ids]
    }
  }

  async flush (ids = [], needsMerge = true, needsClean = true) {
    if (needsMerge) {
      ids = [...this._formIds, ...ids]
    }
    ids = ids.filter(id => id !== 'the formId is a mock one')

    if (!ids.length) return
    ids = ids.join(',')

    log.debug(`[form-ids] sending ids: `, ids)
    // try {
    //   await api.member.formId(ids)            //   无作用且会报错 401 会触发跳转到member page 此时$router.params.path 变成‘page/member’   login 2s后 还是跳转member 界面 不会跳回购物车界面 可以注释掉
    // } catch (e) {
    //   console.log(e)
    // }
    if (needsClean) {
      this._formIds = []
    }
  }

  stop () {
    if (this._collectingFormIdsTimer) {
      clearInterval(this._collectingFormIdsTimer)
      log.debug(`[form-ids] stop collecting`)
    }
  }
}

export default new FormIds()
