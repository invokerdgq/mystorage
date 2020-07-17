const LIMITKILL = '限时秒杀'

function sort(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i+1; j < list.length; j++) {
      if(list[i].config.start_time>list[j].config.start_time){
        let tmp = list[i];
        list[i] =list[j];
        list[j] = tmp
      }
    }
  }
}
  console.log(sort([{config:{start_time:2}},{config:{start_time:6}},{config:{start_time:1}}]))
   function formate(option, activityList) {
    console.log('格式化 开始于---------------------')
    console.log(activityList)
    let list = [];
    let curIndex = -1;

    option.map((item, index) => {
      if (item.base.title === LIMITKILL) {
        if (curIndex === -1) {
          curIndex = index
        }
        if (item)
          list.push(item)
      }
    })

    for (let i = 0; i < list.length; i++) {
      if (list[i].config.lastSeconds === 0) {
        list[i].config.status = 'ended'
      } else {
        const id = list[i].config.seckillId
        activityList.map((item) => {
          if (item.seckill_id === id) {
            list[i].config.status = item.status
            list[i].config.start_date = item.activity_start_date
            list[i].config.end_date = item.activity_end_date
            list[i].config.start_time =item.activity_start_time
          }
        })
      }
    }
    let newList = [];
    let listExcludeEnd = list.filter((item, index) => {
      if (item.config.status === 'ended') {
        newList.push(item)
        return false
      } else {
        return true
      }
    })
    sort(listExcludeEnd)
    let listExcludeSale = listExcludeEnd.filter((item, index) => {
      if (item.config.status === 'in_sale') {
        newList.push(item)
        return false
      } else {
        return true
      }
    })

    let finnalList = newList.concat( listExcludeSale)

    option = option.filter((item) => {
      return item.base.title !== LIMITKILL
    })
     // 合并商品
      finnalList.map((item,index) => {
      item.data =  item.data.reduce((pre,item1,index1) => {
         if(pre.length === 0){
           pre.push(item1)
         }else{
           let has = false
           pre.map((item2,index2) =>{
             if(item2.title === item1.title){
               has = true
             }
           })
           if(!has){
             pre.push(item1)
           }
         }
         return pre
       },[])
     })
    option.splice(curIndex, 0, {list: finnalList, name: 'limit-kill'})
    console.log(option)
    console.log('格式化后  数据--------------------------')
    return option
}
export default formate
export function formateSelect(list) {
  let newList = []
    list.forEach(item => {
      let obj = {level:'',list:[]}
      Object.keys(item).map((item1,index1) => {
        obj.level = item[item1].level
        obj.list.push(item[item1])
      })
      newList.push(obj)
    })
  return newList
}

