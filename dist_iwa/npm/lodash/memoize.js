var MapCache=require("./_MapCache.js"),FUNC_ERROR_TEXT="Expected a function";function memoize(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new TypeError(FUNC_ERROR_TEXT);var o=function(){var e=arguments,a=n?n.apply(this,e):e[0],c=o.cache;if(c.has(a))return c.get(a);var r=t.apply(this,e);return o.cache=c.set(a,r)||c,r};return o.cache=new(memoize.Cache||MapCache),o}memoize.Cache=MapCache,module.exports=memoize;