(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{"1014":function(e,t,n){"use strict";n.r(t);var r,o,i=n(3),a=n(905),c=n(904),s=n(9),l=n(34),u=n(5),f=n(4),p=n(542),m=n(370),d=n(475),h=(n(897),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var b=(o=r=function(e){function OwnCoupon(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OwnCoupon);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(OwnCoupon.__proto__||Object.getPrototypeOf(OwnCoupon)).call(this,e));return t.state={},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(OwnCoupon,f["a"].Component),h(OwnCoupon,[{"key":"handleHome","value":function handleHome(){f.a.navigateTo({"url":"/pages/index"})}},{"key":"render","value":function render(){var e=this.props.info;return i.l.createElement(a.a,{"className":"coupon"},i.l.createElement(a.a,{"className":"coupon-left"},i.l.createElement(a.a,{"className":"top"},i.l.createElement(d.a,{"className":"cur"},"￥"),i.l.createElement(d.a,{"className":"total"},Number(e.reduce_cost)/100)," ",i.l.createElement(d.a,{"className":"discount"},"满减优惠券x",e.card_num,"张")),i.l.createElement(a.a,{"className":"middle"},"满",Number(e.least_cost)/100,"可用"),i.l.createElement(a.a,{"className":"bottom"},"有效期:",e.user_start_time,"-",e.user_end_time)),i.l.createElement(a.a,{"className":"coupon-right"},i.l.createElement(a.a,{"className":"dash"}),i.l.createElement(c.a,{"mode":"widthFix","className":"see","onClick":this.handleHome.bind(this),"src":l.d+"/see.png"})))}}]),OwnCoupon}(),r.defaultProps={"info":{"reduce_cost":"","card_num":2,"least_cost":398,"user_start_time":"","user_end_time":""}},o);n(899);n.d(t,"default",function(){return w});var y=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&c.return&&c.return()}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),v=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,n)}if("value"in r)return r.value;var i=r.get;return void 0!==i?i.call(n):void 0};var w=function(e){function ReceiveGift(e){!function receive_gift_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ReceiveGift);var t=function receive_gift_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(ReceiveGift.__proto__||Object.getPrototypeOf(ReceiveGift)).call(this,e));return t.state={"goodsList":[{"assist_id":"23","item_id":"8611","goods_id":"8610","item_title":"弄清影中式插画釉下彩多头餐具5件/16件套","item_pic":"http://sxt-img-sdn.oioos.com/1/2020/06/17/b530a367205710b6ef177bead4bc806auH7E7nbf6ZU7c0Tr9PlCdEFUnfeuR9de"}],"couponList":[]},t}return function receive_gift_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ReceiveGift,f["a"].Component),_(ReceiveGift,[{"key":"componentDidMount","value":function componentDidMount(){this.fetch(),console.log("获取数据")}},{"key":"fetch","value":function(){var e=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(r,o){try{var i=t[r](o),a=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,t,n,r;return regeneratorRuntime.wrap(function _callee$(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([s.a.assist.getAssistList(),s.a.assist.getCouponList({"assist_id":Object(u.b)("assist_id")})]);case 2:e=o.sent,t=y(e,2),n=t[0].list,r=t[1].list,console.log(n),this.setState({"goodsList":n.items,"couponList":r});case 8:case"end":return o.stop()}},_callee,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"handleClickItem","value":function handleClickItem(){}},{"key":"render","value":function render(){var e=this,t=this.state,n=t.goodsList,r=t.couponList;return i.l.createElement(a.a,{"className":"gift"},i.l.createElement(a.a,{"className":"gift-header"},i.l.createElement(c.a,{"mode":"widthFix","className":"img","src":l.d+"/receive-head.jpg"})),i.l.createElement(a.a,{"className":"gift-content"},i.l.createElement(a.a,{"className":"gift-content-title"},i.l.createElement(m.a,{"title":"新人礼包"})),r.map(function(e,t){return i.l.createElement(b,{"info":e})}),i.l.createElement(a.a,{"className":"gift-content-dec"},"领取的券可到个人中心-优惠券里查看")),i.l.createElement(a.a,{"className":"goods-list"},n.map(function(t){return i.l.createElement(p.a,{"info":t,"onclick":e.handleClickItem.bind(e,t)})})),i.l.createElement(a.a,{"className":"gift-footer"},i.l.createElement(c.a,{"mode":"widthFix","src":l.d+"/invite-foot.png","className":"img"})))}},{"key":"componentDidShow","value":function componentDidShow(){v(ReceiveGift.prototype.__proto__||Object.getPrototypeOf(ReceiveGift.prototype),"componentDidShow",this)&&v(ReceiveGift.prototype.__proto__||Object.getPrototypeOf(ReceiveGift.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){v(ReceiveGift.prototype.__proto__||Object.getPrototypeOf(ReceiveGift.prototype),"componentDidHide",this)&&v(ReceiveGift.prototype.__proto__||Object.getPrototypeOf(ReceiveGift.prototype),"componentDidHide",this).call(this)}}]),ReceiveGift}()},"370":function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r,o,i=n(3),a=n(4),c=n(905),s=n(475),l=(n(385),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var u=(o=r=function(e){function OwnTitle(e){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OwnTitle),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(OwnTitle.__proto__||Object.getPrototypeOf(OwnTitle)).call(this,e))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(OwnTitle,a["a"].Component),l(OwnTitle,[{"key":"render","value":function render(){var e=this.props,t=e.title,n=e.innerClass;return i.l.createElement(c.a,{"className":"title"},i.l.createElement(s.a,{"className":"line"}),i.l.createElement(s.a,{"className":n},t),i.l.createElement(s.a,{"className":"line"}))}}]),OwnTitle}(),r.defaultProps={"title":"","innerClass":""},o)},"385":function(e,t,n){},"471":function(e,t,n){var r=n(472);"string"==typeof r&&(r=[[e.i,r,""]]);var o={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(r,o);r.locals&&(e.exports=r.locals)},"472":function(e,t,n){(e.exports=n(366)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},"475":function(e,t,n){"use strict";n(364);var r=n(3),o=n(365),i=n(50),a=n.n(i),c=(n(471),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),s=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var l=function(e){function Text(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Text,r["l"].Component),s(Text,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.selectable,i=void 0!==n&&n,s=a()("taro-text",{"taro-text__selectable":i},t);return r.l.createElement("span",c({},Object(o.a)(this.props,["selectable","className"]),{"className":s}),this.props.children)}}]),Text}();t.a=l},"542":function(e,t,n){"use strict";n.d(t,"a",function(){return p});var r,o,i=n(3),a=n(359),c=n(4),s=n(905),l=n(904),u=n(34),f=(n(543),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var p=(o=r=function(e){function OwnGoodsItem(e){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OwnGoodsItem),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(OwnGoodsItem.__proto__||Object.getPrototypeOf(OwnGoodsItem)).call(this,e))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(OwnGoodsItem,c["a"].Component),f(OwnGoodsItem,[{"key":"handleClick","value":function handleClick(){this.props.disabled?Object(a.e)({"title":"已售完","icon":"none","duration":1500}):this.props.onclick()}},{"key":"render","value":function render(){var e=this.props.info,t=e.item_pic,n=e.item_title,r=this.props,o=r.type,a=r.disabled,c=r.price;return i.l.createElement(s.a,{"className":"activity-item"},i.l.createElement(l.a,{"className":"goods-name","src":u.d+"/goods-bg.png","mode":"widthFix"}),i.l.createElement(Text,{"className":"goods-name-text"},n),i.l.createElement(s.a,{"className":"goods-img"},i.l.createElement(l.a,{"src":t,"mode":"widthFix","className":"img"})),"buy"===o&&a&&i.l.createElement(s.a,{"className":"empty"},i.l.createElement(s.a,{"className":"opacity-bg"}),i.l.createElement(l.a,{"src":u.d+"/test.png","mode":"widthFix","className":"img"})),"buy"===o&&i.l.createElement(s.a,{"className":"help-btn","onClick":this.state.handleClick.bind(this)},i.l.createElement(l.a,{"src":a?u.d+"/disable-blank-btn.png":u.d+"/blank-btn.png","mode":"widthFix","className":"img"}),i.l.createElement(Text,{"className":"price"},c,"元抢购")))}}]),OwnGoodsItem}(),r.options={"addGlobalClass":!0},r.defaultProps={"info":{"item_pic":"","item_title":""},"onclick":function onclick(){},"type":"show","disabled":!1,"price":""},o)},"543":function(e,t,n){},"897":function(e,t,n){},"899":function(e,t,n){}}]);