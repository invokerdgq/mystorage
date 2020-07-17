import Taro from '@tarojs/taro'
import api from '@/api'
import req from '@/api/req'

export function newUser() {
   if(Taro.getStorageSync('help')){
     Taro.setStorageSync('canHelp',true)
   }
}

