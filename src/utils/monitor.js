import WXLogger from './wxLogger.js';
import Taro from '@tarojs/taro'


const Monitor = WXLogger.init({
  pid: Taro.getExtConfigSync().appid,
  region: 'cn',
  behavior: true
});
export default Monitor;
