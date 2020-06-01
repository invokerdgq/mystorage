const LIMITKILL = '限时秒杀'

function formate(option,activityList) {
  console.log('格式化 开始于---------------------')
  let list = [];
  let curIndex = null;

  option.map((item,index) => {
    if(item.base.title === LIMITKILL){
      if(item)
      list.push(item)
    }
  })
  // 找到第一个剩余时间不是0 的项
  for( let i = 0;i<list.length;i++){
    if(list[i].config.lastSeconds !== 0){
      curIndex = i;
      break
    }
  }
  // 为所有秒杀活动添加 status 判断其状态
  list.map((item,index) => {
    if(!curIndex){
      item.config.status = 'ended'
    }else{
      if(index < curIndex){
        item.config.status = 'ended'
      }else if(index === curIndex){
        activityList.map((item1,index1) => {
          if(item1.seckill_id === list[curIndex].config.seckillId){
            item.config.status = 'active'
          }
        })
      }else{
        item.config.status = 'notice'
      }
    }
  })

  option = option.filter((item) => {
    return item.base.title !== LIMITKILL
  })
  option.splice(3,0,{list:list,name:'limit-kill'})
  console.log(option)
  console.log('格式化后  数据--------------------------')
  return option
}
export default formate
