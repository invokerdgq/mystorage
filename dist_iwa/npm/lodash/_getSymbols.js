var arrayFilter=require("./_arrayFilter.js"),stubArray=require("./stubArray.js"),objectProto=Object.prototype,propertyIsEnumerable=objectProto.propertyIsEnumerable,nativeGetSymbols=Object.getOwnPropertySymbols,getSymbols=nativeGetSymbols?function(e){return null==e?[]:(e=Object(e),arrayFilter(nativeGetSymbols(e),function(r){return propertyIsEnumerable.call(e,r)}))}:stubArray;module.exports=getSymbols;