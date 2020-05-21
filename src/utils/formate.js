const LIMITKILL = '限时秒杀'

function formate(option) {
  let list = [];
  option.map((item) => {
    if(item.base.title === LIMITKILL){
      list.push(item)
    }
  })
  option = option.filter((item) => {
    return item.base.title !== LIMITKILL
  })
  option.splice(3,0,{list:list,name:'limit-kill'})
  return option
}
export default formate
