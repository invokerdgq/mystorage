import req from './req'

export function getCategory(params) {
   return  req.get('/goods/shop/category',params)
}

export function getCategoryInfo(category_id) {
  return req.get(`/goods/shop/category/${category_id}`)
}
export function getItemsDetail(itemId,params) {
  if(params && params.item_id){
    return req.get('/goods/shop/items',params)
  }else{
    return req.get(`/goods/shop/items/${itemId}`)
  }
}
export function createItems (query) {
  return req.post('/goods/shop/items', query)
}
export function updateItems (itemId, query) {
  return req.put(`/goods/shop/items/${itemId}`,query)
}
export function deleteItems (itemId, query) {
  return req.delete(`/goods/shop/items/${itemId}`,query,{ showError: false })
}
export function getList(params) {
 return req.get('/goods/shop/items',params)
}
export function changeStatus(params) {
 return req.put('/goods/shop/itemstatusupdate',params)
}
export function openStore(params) {
  return req.post('/shops/managementnew',params)
}
export function getShopInfo(id) {
 return req.get(`/usershops/shops/${id}`)
}
export function updateGoodsInfo(params){
  return req.put('/goods/shop/itemsupdate',params)
}
export function updateItemRebateConf(params) {
  return req.post('/goods/shop/rebateconf',params)
}
export function getOwnShopInfo() {
  return req.get('/usershops/ownshops')
}
export function getTradeList(params) {
 return req.get('/usershops/orders',params)
}
export function getOrderDetail(id) {
 return req.get(`usershops/order/${id}`)
}
export function getLogisticsList() {
  return req.get('/usershops/trade/logistics/list')
}
export function delivery(params) {
 return req.post('/usershops/delivery',params)
}
export function getShopHistoryList(params) {
 return req.get('/usershops/shops',params)
}
export function orderCashOut(params) {
 return req.post('/member/commissionorder/withdraw',params)
}
export function getOwnShopData() {
 return req.get('/usershops/orderscount')
}
