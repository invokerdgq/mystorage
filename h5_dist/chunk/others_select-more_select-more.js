(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{"369":function(e,t,o){"use strict";o.d(t,"a",function(){return u});var n,r,i=o(3),l=o(4),s=o(906),c=o(474),a=(o(384),function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}());var u=(r=n=function(e){function OwnTitle(e){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OwnTitle),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(OwnTitle.__proto__||Object.getPrototypeOf(OwnTitle)).call(this,e))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(OwnTitle,l["a"].Component),a(OwnTitle,[{"key":"render","value":function render(){var e=this.props,t=e.title,o=e.innerClass;return i.l.createElement(s.a,{"className":"title"},i.l.createElement(c.a,{"className":"line"}),i.l.createElement(c.a,{"className":o},t),i.l.createElement(c.a,{"className":"line"}))}}]),OwnTitle}(),n.defaultProps={"title":"","innerClass":""},r)},"379":function(e,t,o){var n=o(380);"string"==typeof n&&(n=[[e.i,n,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};o(366)(n,r);n.locals&&(e.exports=n.locals)},"380":function(e,t,o){(e.exports=o(365)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-scroll {\n  -webkit-overflow-scrolling: auto;\n}\n\n.taro-scroll::-webkit-scrollbar {\n  display: none;\n}\n\n.taro-scroll-view {\n  overflow: hidden;\n}\n\n.taro-scroll-view__scroll-x {\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n\n.taro-scroll-view__scroll-y {\n  overflow-x: hidden;\n  overflow-y: scroll;\n}",""])},"384":function(e,t,o){},"458":function(e,t,o){"use strict";o(363);var n=o(3),r=o(364),i=o(50),l=o.n(i),s=(o(379),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}),c=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{"value":o,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=o,e}function easeOutScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments[2];if(e!==t&&"number"==typeof e){var n=t-e,r=500,i=+new Date,l=t>=e;!function step(){e=function linear(e,t,o,n){return o*e/n+t}(+new Date-i,e,n,r),l&&e>=t||!l&&t>=e?o(t):(o(e),requestAnimationFrame(step))}()}}function scrollIntoView(e){document.querySelector("#"+e).scrollIntoView({"behavior":"smooth","block":"center","inline":"start"})}function scrollVertical(e,t){var o=this;t?easeOutScroll(this._scrollTop,e,function(e){console.log("props.scrollY",o.container,o._scrollTop),o.container&&(o.container.scrollTop=e)}):this.container&&(this.container.scrollTop=e),this._scrollTop=e}function scrollHorizontal(e,t){var o=this;t?easeOutScroll(this._scrollLeft,e,function(e){o.container&&(o.container.scrollLeft=e)}):this.container&&(this.container.scrollLeft=e),this._scrollLeft=e}var a=function(e){function ScrollView(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ScrollView);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(ScrollView.__proto__||Object.getPrototypeOf(ScrollView)).apply(this,arguments));return e.onTouchMove=function(e){e.stopPropagation()},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ScrollView,n["l"].Component),c(ScrollView,[{"key":"componentDidMount","value":function componentDidMount(){this.handleScroll(this.props,!0)}},{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){this.handleScroll(e)}},{"key":"handleScroll","value":function handleScroll(e){var t=this,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e.scrollIntoView&&"string"==typeof e.scrollIntoView&&document&&document.querySelector&&document.querySelector("#"+e.scrollIntoView))o?setTimeout(function(){return scrollIntoView(e.scrollIntoView)},500):scrollIntoView(e.scrollIntoView);else{var n="scrollWithAnimation"in e;e.scrollY&&"number"==typeof e.scrollTop&&e.scrollTop!==this._scrollTop&&(o?setTimeout(function(){return scrollVertical.bind(t)(e.scrollTop,n)},10):scrollVertical.bind(this)(e.scrollTop,n)),e.scrollX&&"number"==typeof e.scrollLeft&&e.scrollLeft!==this._scrollLeft&&(o?setTimeout(function(){return scrollHorizontal.bind(t)(e.scrollLeft,n)},10):scrollHorizontal.bind(this)(e.scrollLeft,n))}}},{"key":"render","value":function render(){var e,t=this,o=this.props,i=o.className,c=o.onScroll,a=o.onScrollToUpper,u=o.onScrollToLower,p=o.onTouchMove,f=o.scrollX,d=o.scrollY,h=this.props,m=h.upperThreshold,b=void 0===m?50:m,v=h.lowerThreshold,y=void 0===v?50:v,_=l()("taro-scroll",(_defineProperty(e={},"taro-scroll-view__scroll-x",f),_defineProperty(e,"taro-scroll-view__scroll-y",d),e),i);b=parseInt(b),y=parseInt(y);var w=function throttle(e,t){var o=null;return function(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];clearTimeout(o),o=setTimeout(function(){e.apply(void 0,r)},t)}}(function uperAndLower(e){if(t.container){var o=t.container,n=o.offsetWidth,r=o.offsetHeight,i=o.scrollLeft,l=o.scrollTop,s=o.scrollHeight,c=o.scrollWidth;u&&(t.props.scrollY&&r+l+y>=s||t.props.scrollX&&n+i+y>=c)&&u(e),a&&(t.props.scrollY&&l<=b||t.props.scrollX&&i<=b)&&a(e)}},200);return n.l.createElement("div",s({"ref":function ref(e){t.container=e}},Object(r.a)(this.props,["className","scrollTop","scrollLeft"]),{"className":_,"onScroll":function _onScroll(e){var o=t.container,n=o.scrollLeft,r=o.scrollTop,i=o.scrollHeight,l=o.scrollWidth;t._scrollLeft=n,t._scrollTop=r,Object.defineProperty(e,"detail",{"enumerable":!0,"writable":!0,"value":{"scrollLeft":n,"scrollTop":r,"scrollHeight":i,"scrollWidth":l}}),w(e),c&&c(e)},"onTouchMove":function _onTouchMove(e){p?p(e):t.onTouchMove(e)},"onLoad":function onLoad(e){console.log("onload",e)}}),this.props.children)}}]),ScrollView}();t.a=a},"470":function(e,t,o){var n=o(471);"string"==typeof n&&(n=[[e.i,n,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};o(366)(n,r);n.locals&&(e.exports=n.locals)},"471":function(e,t,o){(e.exports=o(365)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},"474":function(e,t,o){"use strict";o(363);var n=o(3),r=o(364),i=o(50),l=o.n(i),s=(o(470),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}),c=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var a=function(e){function Text(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Text,n["l"].Component),c(Text,[{"key":"render","value":function render(){var e=this.props,t=e.className,o=e.selectable,i=void 0!==o&&o,c=l()("taro-text",{"taro-text__selectable":i},t);return n.l.createElement("span",s({},Object(r.a)(this.props,["selectable","className"]),{"className":c}),this.props.children)}}]),Text}();t.a=a},"541":function(e,t,o){},"543":function(e,t,o){},"545":function(e,t,o){"use strict";var n,r,i=o(3),l=o(358),s=o(4),c=o(906),a=o(905),u=o(34),p=(o(541),function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}());var f=(r=n=function(e){function Detail(e){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Detail),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Detail.__proto__||Object.getPrototypeOf(Detail)).call(this,e))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Detail,s["a"].Component),p(Detail,[{"key":"render","value":function render(){var e=this.props.direction;return i.l.createElement(c.a,{"className":"price-detail ani-"+e},this.props.children,i.l.createElement(c.a,{"className":"triangle"}))}}]),Detail}(),n.options={"addGlobalClass":!0},n.defaultProps={"direction":"left"},r);o(543);o.d(t,"a",function(){return b});var d,h,m=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var b=(h=d=function(e){function OwnGoodsItem(e){!function goods_item_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OwnGoodsItem);var t=function goods_item_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(OwnGoodsItem.__proto__||Object.getPrototypeOf(OwnGoodsItem)).call(this,e));return t.state={"showDetail":!1},t}return function goods_item_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(OwnGoodsItem,s["a"].Component),m(OwnGoodsItem,[{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e,t){e.currentIndex!==this.props.index&&this.setState({"showDetail":!1})}},{"key":"handleClick","value":function handleClick(e,t){if("detail"===e)return this.setState({"showDetail":!this.state.showDetail}),this.props.onclick(this.props.info,this.props.index),void t.stopPropagation();this.props.disabled?Object(l.e)({"title":"已售完","icon":"none","duration":1500}):this.props.onclick()}},{"key":"render","value":function render(){var e=this.props.info,t=e.item_pic,o=e.item_title,n=e.level_price,r=this.props,l=r.type,s=r.disabled,p=r.price,d=r.index,h=r.currentIndex,m=this.state.showDetail;return i.l.createElement(c.a,{"className":"activity-item"},i.l.createElement(a.a,{"className":"goods-name","src":u.d+"/goods-bg.png","mode":"widthFix"}),i.l.createElement(Text,{"className":"goods-name-text"},o),i.l.createElement(c.a,{"className":"goods-img"},i.l.createElement(a.a,{"src":t,"mode":"widthFix","className":"img"})),"buy"===l&&s&&i.l.createElement(c.a,{"className":"empty"},i.l.createElement(c.a,{"className":"opacity-bg"}),i.l.createElement(a.a,{"src":u.d+"/test.png","mode":"widthFix","className":"img"})),"buy"===l&&i.l.createElement(c.a,{"className":"help-btn","onClick":this.handleClick.bind(this,"buy")},i.l.createElement(a.a,{"src":s?u.d+"/disable-blank-btn.png":u.d+"/blank-btn.png","mode":"widthFix","className":"img"}),i.l.createElement(Text,{"className":"price"},p,"元抢购")),"detail"===l&&i.l.createElement(c.a,null,i.l.createElement(c.a,{"className":"help-btn","onClick":this.handleClick.bind(this,"detail")},i.l.createElement(a.a,{"src":s?u.d+"/disable-blank-btn.png":u.d+"/blank-btn.png","mode":"widthFix","className":"img"}),i.l.createElement(Text,{"className":"price"},m?"关闭详情":"查看详情"))),m&&d==h&&i.l.createElement(f,{"direction":d%2==0?"right":"left"},i.l.createElement(c.a,{"className":"detail-container"},0!==n.length&&n.map(function(e){return i.l.createElement(c.a,{"className":"detail-item"},"助力满",e.assist_number,"人，可",i.l.createElement(Text,{"className":"inner"},"￥",e.assist_price),"元购买")}))))}}]),OwnGoodsItem}(),d.options={"addGlobalClass":!0},d.defaultProps={"info":{"item_pic":"","item_title":"","level_price":[]},"index":0,"currentIndex":"","onclick":function onclick(){},"type":"show","disabled":!1,"price":""},h)},"553":function(e,t,o){"use strict";o.d(t,"b",function(){return formateSelect});var n="限时秒杀";function sort(e){for(var t=0;t<e.length;t++)for(var o=t+1;o<e.length;o++)if(e[t].config.start_time>e[o].config.start_time){var n=e[t];e[t]=e[o],e[o]=n}}function formateSelect(e){var t=[];return e.forEach(function(e){var o={"level":"","list":[]};Object.keys(e).map(function(t,n){o.level=e[t].level,o.number=e[t].assist_number,o.list.push(e[t])}),t.push(o)}),console.log(t),t}console.log(sort([{"config":{"start_time":2}},{"config":{"start_time":6}},{"config":{"start_time":1}}])),t.a=function formate(e,t){console.log("格式化 开始于---------------------"),console.log(t);var o=[],r=-1;e.map(function(e,t){e.base.title===n&&(-1===r&&(r=t),e&&o.push(e))});for(var i=function _loop(e){var n=void 0;t.map(function(t,r){t.seckill_id===o[e].config.seckillId&&(n=r)}),n?(o[e].config.lastSeconds=t[n].last_seconds,o[e].config.status=t[n].status,o[e].config.start_date=t[n].activity_start_date,o[e].config.end_date=t[n].activity_end_date,o[e].config.start_time=t[n].activity_start_time):o[e].config.status="ended"},l=0;l<o.length;l++)i(l);var s=[],c=o.filter(function(e,t){return"ended"!==e.config.status||(s.push(e),!1)});sort(c);var a=c.filter(function(e,t){return"in_sale"!==e.config.status||(s.push(e),!1)}),u=s.concat(a);return e=e.filter(function(e){return e.base.title!==n}),u.map(function(e,t){e.data=e.data.reduce(function(e,t,o){if(0===e.length)e.push(t);else{var n=!1;e.map(function(e,o){e.title===t.title&&(n=!0)}),n||e.push(t)}return e},[])}),e.splice(r,0,{"list":u,"name":"limit-kill"}),console.log("格式化后  数据--------------------------"),console.log(e),e}},"902":function(e,t,o){},"995":function(e,t,o){"use strict";o.r(t);var n,r=o(3),i=o(906),l=o(905),s=o(458),c=o(34),a=o(5),u=o(4),p=o(545),f=o(369),d=o(9),h=(o(902),o(51)),m=o(553),b=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}(),v=function get(e,t,o){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,o)}if("value"in n)return n.value;var i=n.get;return void 0!==i?i.call(o):void 0};function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}t.default=Object(h.b)(function(e){return{"step":e.step.currentStep||[]}})(n=function(e){function SelectMoreGood(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SelectMoreGood);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(SelectMoreGood.__proto__||Object.getPrototypeOf(SelectMoreGood)).call(this,e));return t.state={"showList":[],"goodsList":[]},t.top=Object(a.b)("top"),t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(SelectMoreGood,u["a"].Component),b(SelectMoreGood,[{"key":"componentDidMount","value":function componentDidMount(){var e=this.$router.params.level,t=void 0===e?2:e;this.setState({"currentLevel":t});var o=[];this.props.step.map(function(e){o.push(!1)}),this.setState({"showList":o}),this.fetch()}},{"key":"fetch","value":function(){var e=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,o){return function step(n,r){try{var i=t[n](r),l=i.value}catch(e){return void o(e)}if(!i.done)return Promise.resolve(l).then(function(e){step("next",e)},function(e){step("throw",e)});e(l)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,t;return regeneratorRuntime.wrap(function _callee$(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,d.a.assist.getGoodsList({"assist_id":this.$router.params.id});case 2:e=o.sent,t=e.list,this.setState({"goodsList":Object(m.b)(t)});case 5:case"end":return o.stop()}},_callee,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"back","value":function back(){u.a.navigateBack()}},{"key":"buy","value":function buy(e,t){u.a.navigateTo({"url":"/pages/item/espier-detail?id="+e.item_id+"&level="+(this.state.currentLevel-1-t)+"&assist_id="+e.assist_id})}},{"key":"showMore","value":function showMore(e){var t=[].concat(_toConsumableArray(this.state.showList));t[e]=!t[e],this.setState({"showList":t})}},{"key":"render","value":function render(){var e=this,t=this.state,o=t.currentLevel,n=t.goodsList,a=t.showList,u=void 0;this.props.step.map(function(e,t){e.level==o&&(e.number,u=t)});var d=[].concat(_toConsumableArray(n)).slice(0,u).reverse();[].concat(_toConsumableArray(this.props.step)).slice(0,u).reverse();return r.l.createElement(i.a,{"className":"select"},r.l.createElement(i.a,{"className":"iconfont icon-arrow-left","style":{"top":this.top+"px"},"onClick":this.back}),r.l.createElement(i.a,{"className":"select-header"},r.l.createElement(l.a,{"mode":"widthFix","src":c.d+"/bg-header1.png","className":"img"})),r.l.createElement(i.a,{"className":"select-content"},r.l.createElement(s.a,{"scrollY":!0,"enableFlex":!0,"className":"select-scroll"},r.l.createElement(i.a,{"className":"select-scroll-list"},d.map(function(t,o){var n=[];return n=t.list.length>4&&!a[o]?[].concat(_toConsumableArray(t.list)).slice(0,4):t.list,r.l.createElement(i.a,{"className":"level-item"},r.l.createElement(f.a,{"title":"助力满"+t.number+"人可挑选"}),r.l.createElement(i.a,{"className":"level-item-list"},n.map(function(t,n){return r.l.createElement(p.a,{"info":t,"disabled":0==t.assist_store,"type":"buy","onclick":e.buy.bind(e,t,o),"price":Number(t.assist_price)/100})})),t.list.length>4&&r.l.createElement(i.a,{"className":"show-more","onClick":e.showMore.bind(e,o)},a[o]?"收起":"查看更多",r.l.createElement(i.a,{"className":"iconfont icon-more "+(a[o]?"rotate":"")})))}))),r.l.createElement(i.a,{"className":"select-header"},r.l.createElement(l.a,{"mode":"widthFix","src":c.d+"/bg-footer.png","className":"img"}))))}},{"key":"componentDidShow","value":function componentDidShow(){v(SelectMoreGood.prototype.__proto__||Object.getPrototypeOf(SelectMoreGood.prototype),"componentDidShow",this)&&v(SelectMoreGood.prototype.__proto__||Object.getPrototypeOf(SelectMoreGood.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){v(SelectMoreGood.prototype.__proto__||Object.getPrototypeOf(SelectMoreGood.prototype),"componentDidHide",this)&&v(SelectMoreGood.prototype.__proto__||Object.getPrototypeOf(SelectMoreGood.prototype),"componentDidHide",this).call(this)}}]),SelectMoreGood}())||n}}]);