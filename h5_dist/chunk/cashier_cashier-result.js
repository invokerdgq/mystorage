(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"365":function(e,t,n){var o=n(366);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(358)(o,r);o.locals&&(e.exports=o.locals)},"366":function(e,t,n){(e.exports=n(357)(!1)).push([e.i,"button {\n  position: relative;\n  display: block;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #F8F8F8;\n}\n\nbutton[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\n\nbutton[plain][disabled] {\n  color: rgba(0, 0, 0, 0.3);\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background-color: #F7F7F7;\n}\n\nbutton[type=primary] {\n  color: #FFFFFF;\n  background-color: #1AAD19;\n}\n\nbutton[type=primary][plain] {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n  background-color: transparent;\n}\n\nbutton[type=primary][plain][disabled] {\n  color: rgba(0, 0, 0, 0.3);\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background-color: #F7F7F7;\n}",""])},"372":function(e,t,n){var o=n(373);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(358)(o,r);o.locals&&(e.exports=o.locals)},"373":function(e,t,n){(e.exports=n(357)(!1)).push([e.i,'img[src=""] {\n  own-opacity: 0;\n}\n\n.taro-img {\n  display: inline-block;\n  overflow: hidden;\n  position: relative;\n  font-size: 0;\n  width: 320px;\n  height: 240px;\n}\n\n.taro-img.taro-img__widthfix {\n  height: 100%;\n}\n\n.taro-img__mode-scaletofill {\n  width: 100%;\n  height: 100%;\n}\n\n.taro-img__mode-aspectfit {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.taro-img__mode-aspectfill {\n  min-width: 100%;\n  height: 100%;\n}\n\n.taro-img__mode-widthfix {\n  width: 100%;\n}\n\n.taro-img__mode-top {\n  width: 100%;\n}\n\n.taro-img__mode-bottom {\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n}\n\n.taro-img__mode-left {\n  height: 100%;\n}\n\n.taro-img__mode-right {\n  position: absolute;\n  height: 100%;\n  right: 0;\n}\n\n.taro-img__mode-topright {\n  position: absolute;\n  right: 0;\n}\n\n.taro-img__mode-bottomleft {\n  position: absolute;\n  bottom: 0;\n}\n\n.taro-img__mode-bottomright {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n}',""])},"456":function(e,t,n){"use strict";n(354);var o=n(3),r=n(355),i=n(49),a=n.n(i),l=(n(365),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),s=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}var c=function(e){function Button(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Button);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));return e.state={"hover":!1,"touch":!1},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Button,o["l"].Component),s(Button,[{"key":"render","value":function render(){var e,t=this,n=this.props,i=n.children,s=n.disabled,c=n.className,u=n.style,d=n.onClick,p=n.onTouchStart,h=n.onTouchEnd,f=n.hoverClass,m=void 0===f?"button-hover":f,b=n.hoverStartTime,g=void 0===b?20:b,y=n.hoverStayTime,_=void 0===y?70:y,v=n.size,w=n.plain,O=n.loading,E=void 0!==O&&O,C=n.type,k=void 0===C?"default":C,S=c||a()("weui-btn",(_defineProperty(e={},""+m,this.state.hover&&!s),_defineProperty(e,"weui-btn_plain-"+k,w),_defineProperty(e,"weui-btn_"+k,!w&&k),_defineProperty(e,"weui-btn_mini","mini"===v),_defineProperty(e,"weui-btn_loading",E),_defineProperty(e,"weui-btn_disabled",s),e));return o.l.createElement("button",l({},Object(r.a)(this.props,["hoverClass","onTouchStart","onTouchEnd"]),{"className":S,"style":u,"onClick":d,"disabled":s,"onTouchStart":function _onTouchStart(e){t.setState(function(){return{"touch":!0}}),m&&!s&&setTimeout(function(){t.state.touch&&t.setState(function(){return{"hover":!0}})},g),p&&p(e)},"onTouchEnd":function _onTouchEnd(e){t.setState(function(){return{"touch":!1}}),m&&!s&&setTimeout(function(){t.state.touch||t.setState(function(){return{"hover":!1}})},_),h&&h(e)}}),E&&o.l.createElement("i",{"class":"weui-loading"}),i)}}]),Button}();t.a=c},"462":function(e,t,n){"use strict";n(354);var o=n(3),r=n(49),i=n.n(r),a=(n(372),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),l=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var s=function(e){function Image(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Image);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Image.__proto__||Object.getPrototypeOf(Image)).apply(this,arguments));return e.state={"isLoaded":!1},e.imageOnLoad=e.imageOnLoad.bind(e),e._handleScroll=e._handleScroll.bind(e),e.handleScroll=e.throttle(e._handleScroll,100),e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Image,o["l"].Component),l(Image,[{"key":"componentDidMount","value":function componentDidMount(){this.props.lazyLoad&&(window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleScroll),this._handleScroll())}},{"key":"componentWillUnMount","value":function componentWillUnMount(){this.props.lazyLoad&&(window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleScroll))}},{"key":"getClientHeight","value":function getClientHeight(){return document.body.clientHeight&&document.documentElement.clientHeight?Math.min(document.body.clientHeight,document.documentElement.clientHeight):Math.max(document.body.clientHeight,document.documentElement.clientHeight)}},{"key":"getScrollTop","value":function getScrollTop(){return document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body?document.body.scrollTop:window.scrollY||window.pageYOffset}},{"key":"throttle","value":function throttle(e,t){var n=null;return function(){var o=this,r=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(o,r)},t)}}},{"key":"_handleScroll","value":function _handleScroll(){var e=this,t=this.props.offset,n=void 0===t?0:t,r=this.getNodeTop(),i=r.nodeTop,a=r.nodeBottom,l=this.getScrollTop(),s=l+this.getClientHeight();a+n>=l&&i-n<=s&&(this.setState({"isLoaded":!0},function(){o.l.findDOMNode(e).children[0].src=e.props.src}),window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleScroll))}},{"key":"getNodeTop","value":function getNodeTop(){var e=this.getScrollTop(),t=o.l.findDOMNode(this),n=t.getBoundingClientRect().top+e;return{"nodeTop":n,"nodeBottom":n+t.offsetHeight}}},{"key":"imageOnLoad","value":function imageOnLoad(e){var t=this.props.onLoad;Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"width":this.imgRef.width,"height":this.imgRef.height}}),t&&t(e)}},{"key":"render","value":function render(){var e=this,t=this.props,n=t.className,r=t.src,l=t.style,s=t.mode,c=t.onError,u=t.lazyLoad,d=function _objectWithoutProperties(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(t,["className","src","style","mode","onError","lazyLoad"]),p=i()("taro-img",{"taro-img__widthfix":"widthFix"===s},n),h=i()("taro-img__mode-"+(s||"scaleToFill").toLowerCase().replace(/\s/g,"")),f=r;u&&(f=this.state.isLoaded?r:"");return o.l.createElement("div",a({"className":p,"style":l},d),u?o.l.createElement("img",{"ref":function ref(t){return e.imgRef=t},"className":h,"data-src":f,"onLoad":this.imageOnLoad,"onError":c}):o.l.createElement("img",{"ref":function ref(t){return e.imgRef=t},"className":h,"src":f,"onLoad":this.imageOnLoad,"onError":c}))}}]),Image}();t.a=s},"668":function(e,t,n){},"778":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return h});var o=n(3),r=n(4),i=n(347),a=n(747),l=n(462),s=n(456),c=n(13),u=n(15),d=(n(668),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),p=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(n):void 0};var h=function(e){function CashierResult(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CashierResult);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(CashierResult.__proto__||Object.getPrototypeOf(CashierResult)).call(this,e));return t.handleClickBack=function(e){-1===e.indexOf("CJ")?r.a.navigateTo({"url":"/pages/trade/detail?id="+e}):r.a.navigateTo({"url":"/pages/member/point-draw-order"})},t.handleClickRoam=function(){r.a.navigateTo({"url":"/pages/index"})},t.state={"info":{"payStatus":""},"showTabBar":""},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(CashierResult,r["a"].Component),d(CashierResult,[{"key":"componentDidMount","value":function componentDidMount(){var e=this;Object(i.b)(),setTimeout(function(){Object(i.a)(),e.fetch()},2e3)}},{"key":"fetch","value":function(){var e=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(o,r){try{var i=t[o](r),a=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,t,n;return regeneratorRuntime.wrap(function _callee$(o){for(;;)switch(o.prev=o.next){case 0:return e=this.$router.params.order_id,o.next=3,u.a.cashier.getOrderDetail(e);case 3:t=o.sent,-1!==(n=Object(c.q)(t,{"create_time":function create_time(e){var t=e.create_time;return Object(c.f)(1e3*t)},"order_id":"order_id","payDate":function payDate(e){var t=e.payDate;return Object(c.f)(1e3*t)},"tradeId":"tradeId","payStatus":"payStatus"})).order_id.indexOf("CZ")&&this.setState({"showTabBar":"CZ"}),this.setState({"info":n}),Object(i.a)();case 8:case"end":return o.stop()}},_callee,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=this.state,t=e.info,n=e.showTabBar;return o.l.createElement(a.a,{"className":"page-cashier-index"},o.l.createElement(a.a,{"className":"cashier-content"},o.l.createElement(a.a,{"className":"cashier-result"},o.l.createElement(a.a,{"className":"cashier-result__img"},o.l.createElement(l.a,{"className":"note__img","mode":"aspectFill","src":"/assets/imgs/pay_"+t.payStatus+".png"})),o.l.createElement(a.a,{"className":"cashier-result__info"},o.l.createElement(a.a,{"className":"cashier-result__info-title"},"订单支付","fail"===t.payStatus?"失败":"","success"===t.payStatus?"成功":""),o.l.createElement(a.a,{"className":"cashier-result__info-news"},"订单号：",t.order_id),"success"===t.payStatus?o.l.createElement(a.a,{"className":"cashier-result__info-news"},"支付单号：",t.tradeId):null,o.l.createElement(a.a,{"className":"cashier-result__info-news"},"创建时间：",t.create_time),"success"===t.payStatus?o.l.createElement(a.a,{"className":"cashier-result__info-news"},"支付时间：",t.payDate):null))),"CZ"===n?o.l.createElement(a.a,{"className":"goods-buy-toolbar"},o.l.createElement(a.a,{"className":"goods-buy-toolbar__btns"},o.l.createElement(s.a,{"className":"goods-buy-toolbar__btn btn-add-cart","onClick":this.handleClickRoam},"返回首页"))):o.l.createElement(a.a,{"className":"goods-buy-toolbar"},"fail"===t.payStatus?o.l.createElement(a.a,{"className":"goods-buy-toolbar__btns"},o.l.createElement(s.a,{"className":"goods-buy-toolbar__btn btn-fast-buy","onClick":this.handleClickBack.bind(this,t.order_id)},"订单详情")):o.l.createElement(a.a,{"className":"goods-buy-toolbar__btns"},o.l.createElement(s.a,{"className":"goods-buy-toolbar__btn btn-add-cart","onClick":this.handleClickRoam},"返回首页"),o.l.createElement(s.a,{"className":"goods-buy-toolbar__btn btn-fast-buy","onClick":this.handleClickBack.bind(this,t.order_id)},"订单详情"))))}},{"key":"componentDidShow","value":function componentDidShow(){p(CashierResult.prototype.__proto__||Object.getPrototypeOf(CashierResult.prototype),"componentDidShow",this)&&p(CashierResult.prototype.__proto__||Object.getPrototypeOf(CashierResult.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){p(CashierResult.prototype.__proto__||Object.getPrototypeOf(CashierResult.prototype),"componentDidHide",this)&&p(CashierResult.prototype.__proto__||Object.getPrototypeOf(CashierResult.prototype),"componentDidHide",this).call(this)}}]),CashierResult}()}}]);
