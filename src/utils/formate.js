const LIMITKILL = '限时秒杀'

function formate(option,activityList) {
  console.log('格式化 开始于---------------------')
  console.log(activityList)
  let list = [];
  let curIndex = -1;

  option.map((item,index) => {
    if(item.base.title === LIMITKILL){
      if(curIndex === -1){
        curIndex = index
      }
      if(item)
      list.push(item)
    }
  })
  // 找到第一个剩余时间不是0 的项
  for( let i = 0;i<list.length;i++){
   if(list[i].config.lastSeconds === 0){
     list[i].config.status = 'ended'
   }else{
     const id = list[i].config.seckillId
     activityList.map((item) => {
       if(item.seckill_id === id){
         list[i].config.status = item.status
         list[i].config.start_date = item.activity_start_date
         list[i].config.end_date = item.activity_end_date
       }
     })
   }
  }
  let newList = [];
  let listExcludeEnd = list.filter((item,index) => {
    if(item.config.status === 'ended'){
      newList.push(item)
      return false
    }else{
      return true
    }
  })
  let listExcludeSale = listExcludeEnd.filter((item,index) => {
     if(item.config.status === 'in_sale'){
       newList.push(item)
       return false
     }else {
       return  true
     }
  })
  let finnalList = newList.concat(listExcludeSale)



  option = option.filter((item) => {
    return item.base.title !== LIMITKILL
  })
  option.splice(curIndex,0,{list:finnalList,name:'limit-kill'})
  console.log(option)
  console.log('格式化后  数据--------------------------')
  return option
}
export default formate
