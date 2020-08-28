import req from './req'

export function getCategory(params) {
   return  req.get('/goods/shop/category',params)
}

export function getCategoryInfo(category_id) {
  return req.get(`/goods/shop/category/${category_id}`)
}
export function getItemsDetail(itemId) {
  return req.get(`/goods/shop/items/${itemId}`)
}
export function createItems (query) {
  return req.post('/goods/shop/items', query)
}
export function updateItems (itemId, query) {
  return req.put(`/goods/shop/items/${itemId}`,query)
}
export function getList(params) {
 return req.get('/goods/shop/items',params)
}
