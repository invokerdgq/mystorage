(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{"361":function(e,t,n){"use strict";n.d(t,"a",function(){return s});var o=n(4),r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var l=function objectToString(e){if(e&&"object"===(void 0===e?"undefined":i(e))){var t="";return Object.keys(e).forEach(function(n){var o=n.replace(/([A-Z])/g,"-$1").toLowerCase();t+=o+":"+e[n]+";"}),t}return e&&"string"==typeof e?e:""},s=function(e){function AtComponent(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtComponent),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtComponent.__proto__||Object.getPrototypeOf(AtComponent)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtComponent,o["a"].Component),r(AtComponent,[{"key":"mergeStyle","value":function mergeStyle(e,t){return e&&"object"===(void 0===e?"undefined":i(e))&&t&&"object"===(void 0===t?"undefined":i(t))?Object.assign({},e,t):l(e)+l(t)}}]),AtComponent}();s.options={"addGlobalClass":!0}},"362":function(e,t,n){e.exports=n(536)()},"368":function(e,t,n){"use strict";n.d(t,"a",function(){return delayQuerySelector}),n.d(t,"e",function(){return uuid}),n.d(t,"c",function(){return initTestEnv}),n.d(t,"d",function(){return isTest}),n.d(t,"b",function(){return handleTouchScroll});var o=n(4),r=n(637),i=o.a.getEnv();function delay(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;return new Promise(function(t){[o.a.ENV_TYPE.WEB,o.a.ENV_TYPE.SWAN].includes(i)?setTimeout(function(){t()},e):t()})}function delayQuerySelector(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500,l=i===o.a.ENV_TYPE.WEB?e:e.$scope,s=Object(r.a)().in(l);return new Promise(function(e){delay(n).then(function(){s.select(t).boundingClientRect().exec(function(t){e(t)})})})}function uuid(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[],r=0;if(t=t||n.length,e)for(r=0;r<e;r++)o[r]=n[0|Math.random()*t];else{var i=void 0;for(o[8]=o[13]=o[18]=o[23]="-",o[14]="4",r=0;r<36;r++)o[r]||(i=0|16*Math.random(),o[r]=n[19===r?3&i|8:i])}return o.join("")}function initTestEnv(){0}function isTest(){return!1}var l=0;function handleTouchScroll(e){i===o.a.ENV_TYPE.WEB&&(e?(l=document.documentElement.scrollTop,document.body.classList.add("at-frozen"),document.body.style.top=-l+"px"):(document.body.style.top=null,document.body.classList.remove("at-frozen"),document.documentElement.scrollTop=l))}},"383":function(e,t,n){var o=n(384);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(o,r);o.locals&&(e.exports=o.locals)},"384":function(e,t,n){(e.exports=n(366)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-scroll {\n  -webkit-overflow-scrolling: auto;\n}\n\n.taro-scroll::-webkit-scrollbar {\n  display: none;\n}\n\n.taro-scroll-view {\n  overflow: hidden;\n}\n\n.taro-scroll-view__scroll-x {\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n\n.taro-scroll-view__scroll-y {\n  overflow-x: hidden;\n  overflow-y: scroll;\n}",""])},"460":function(e,t,n){"use strict";n(364);var o=n(3),r=n(365),i=n(50),l=n.n(i),s=(n(383),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),c=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}function easeOutScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments[2];if(e!==t&&"number"==typeof e){var o=t-e,r=500,i=+new Date,l=t>=e;!function step(){e=function linear(e,t,n,o){return n*e/o+t}(+new Date-i,e,o,r),l&&e>=t||!l&&t>=e?n(t):(n(e),requestAnimationFrame(step))}()}}function scrollIntoView(e){document.querySelector("#"+e).scrollIntoView({"behavior":"smooth","block":"center","inline":"start"})}function scrollVertical(e,t){var n=this;t?easeOutScroll(this._scrollTop,e,function(e){console.log("props.scrollY",n.container,n._scrollTop),n.container&&(n.container.scrollTop=e)}):this.container&&(this.container.scrollTop=e),this._scrollTop=e}function scrollHorizontal(e,t){var n=this;t?easeOutScroll(this._scrollLeft,e,function(e){n.container&&(n.container.scrollLeft=e)}):this.container&&(this.container.scrollLeft=e),this._scrollLeft=e}var a=function(e){function ScrollView(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ScrollView);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(ScrollView.__proto__||Object.getPrototypeOf(ScrollView)).apply(this,arguments));return e.onTouchMove=function(e){e.stopPropagation()},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ScrollView,o["l"].Component),c(ScrollView,[{"key":"componentDidMount","value":function componentDidMount(){this.handleScroll(this.props,!0)}},{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){this.handleScroll(e)}},{"key":"handleScroll","value":function handleScroll(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e.scrollIntoView&&"string"==typeof e.scrollIntoView&&document&&document.querySelector&&document.querySelector("#"+e.scrollIntoView))n?setTimeout(function(){return scrollIntoView(e.scrollIntoView)},500):scrollIntoView(e.scrollIntoView);else{var o="scrollWithAnimation"in e;e.scrollY&&"number"==typeof e.scrollTop&&e.scrollTop!==this._scrollTop&&(n?setTimeout(function(){return scrollVertical.bind(t)(e.scrollTop,o)},10):scrollVertical.bind(this)(e.scrollTop,o)),e.scrollX&&"number"==typeof e.scrollLeft&&e.scrollLeft!==this._scrollLeft&&(n?setTimeout(function(){return scrollHorizontal.bind(t)(e.scrollLeft,o)},10):scrollHorizontal.bind(this)(e.scrollLeft,o))}}},{"key":"render","value":function render(){var e,t=this,n=this.props,i=n.className,c=n.onScroll,a=n.onScrollToUpper,u=n.onScrollToLower,f=n.onTouchMove,p=n.scrollX,h=n.scrollY,d=this.props,b=d.upperThreshold,y=void 0===b?50:b,m=d.lowerThreshold,v=void 0===m?50:m,_=l()("taro-scroll",(_defineProperty(e={},"taro-scroll-view__scroll-x",p),_defineProperty(e,"taro-scroll-view__scroll-y",h),e),i);y=parseInt(y),v=parseInt(v);var g=function throttle(e,t){var n=null;return function(){for(var o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];clearTimeout(n),n=setTimeout(function(){e.apply(void 0,r)},t)}}(function uperAndLower(e){if(t.container){var n=t.container,o=n.offsetWidth,r=n.offsetHeight,i=n.scrollLeft,l=n.scrollTop,s=n.scrollHeight,c=n.scrollWidth;u&&(t.props.scrollY&&r+l+v>=s||t.props.scrollX&&o+i+v>=c)&&u(e),a&&(t.props.scrollY&&l<=y||t.props.scrollX&&i<=y)&&a(e)}},200);return o.l.createElement("div",s({"ref":function ref(e){t.container=e}},Object(r.a)(this.props,["className","scrollTop","scrollLeft"]),{"className":_,"onScroll":function _onScroll(e){var n=t.container,o=n.scrollLeft,r=n.scrollTop,i=n.scrollHeight,l=n.scrollWidth;t._scrollLeft=o,t._scrollTop=r,Object.defineProperty(e,"detail",{"enumerable":!0,"writable":!0,"value":{"scrollLeft":o,"scrollTop":r,"scrollHeight":i,"scrollWidth":l}}),g(e),c&&c(e)},"onTouchMove":function _onTouchMove(e){f?f(e):t.onTouchMove(e)},"onLoad":function onLoad(e){console.log("onload",e)}}),this.props.children)}}]),ScrollView}();t.a=a},"471":function(e,t,n){var o=n(472);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(o,r);o.locals&&(e.exports=o.locals)},"472":function(e,t,n){(e.exports=n(366)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},"475":function(e,t,n){"use strict";n(364);var o=n(3),r=n(365),i=n(50),l=n.n(i),s=(n(471),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),c=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var a=function(e){function Text(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Text,o["l"].Component),c(Text,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.selectable,i=void 0!==n&&n,c=l()("taro-text",{"taro-text__selectable":i},t);return o.l.createElement("span",s({},Object(r.a)(this.props,["selectable","className"]),{"className":c}),this.props.children)}}]),Text}();t.a=a},"534":function(e,t,n){"use strict";n.d(t,"a",function(){return b});var o=n(3),r=n(50),i=n.n(r),l=n(362),s=n.n(l),c=n(905),a=n(460),u=n(4),f=n(361),p=n(368),h=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}var d=u.a.getEnv(),b=function(e){function AtTabs(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtTabs);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtTabs.__proto__||Object.getPrototypeOf(AtTabs)).call(this,e));return t.updateState=function(e){if(t.props.scroll)switch(d){case u.a.ENV_TYPE.WEAPP:case u.a.ENV_TYPE.ALIPAY:case u.a.ENV_TYPE.SWAN:var n=Math.max(e-1,0);t.setState({"_scrollIntoView":"tab"+n});break;case u.a.ENV_TYPE.WEB:var o=Math.max(e-1,0),r=t.tabHeaderRef.childNodes[o];r&&t.setState({"_scrollTop":r.offsetTop,"_scrollLeft":r.offsetLeft});break;default:console.warn("AtTab 组件在该环境还未适配")}},t.state={"_scrollLeft":0,"_scrollTop":0,"_scrollIntoView":""},t._tabId=Object(p.d)()?"tabs-AOTU2018":Object(p.e)(),t._touchDot=0,t._timer=null,t._interval=0,t._isMoving=!1,t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtTabs,f["a"]),h(AtTabs,[{"key":"handleClick","value":function handleClick(e,t){this.props.onClick(e,t)}},{"key":"handleTouchStart","value":function handleTouchStart(e){var t=this,n=this.props,o=n.swipeable,r=n.tabDirection;o&&"vertical"!==r&&(this._touchDot=e.touches[0].pageX,this._timer=setInterval(function(){t._interval++},100))}},{"key":"handleTouchMove","value":function handleTouchMove(e){var t=this.props,n=t.swipeable,o=t.tabDirection,r=t.current,i=t.tabList;if(n&&"vertical"!==o){var l=e.touches[0].pageX-this._touchDot,s=i.length;!this._isMoving&&this._interval<10&&this._touchDot>20&&(r+1<s&&l<=-100?(this._isMoving=!0,this.handleClick(r+1,e)):r-1>=0&&l>=100&&(this._isMoving=!0,this.handleClick(r-1,e)))}}},{"key":"handleTouchEnd","value":function handleTouchEnd(){var e=this.props,t=e.swipeable,n=e.tabDirection;t&&"vertical"!==n&&(clearInterval(this._timer),this._interval=0,this._isMoving=!1)}},{"key":"getTabHeaderRef","value":function getTabHeaderRef(){d===u.a.ENV_TYPE.WEB&&(this.tabHeaderRef=document.getElementById(this._tabId))}},{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){e.scroll!==this.props.scroll&&this.getTabHeaderRef(),e.current!==this.props.current&&this.updateState(e.current)}},{"key":"componentDidMount","value":function componentDidMount(){this.getTabHeaderRef(),this.updateState(this.props.current)}},{"key":"componentWillUnmount","value":function componentWillUnmount(){this.tabHeaderRef=null}},{"key":"render","value":function render(){var e,t=this,n=this.props,r=n.customStyle,l=n.className,s=n.height,u=n.tabDirection,f=n.animated,p=n.tabList,h=n.scroll,b=n.current,y=this.state,m=y._scrollLeft,v=y._scrollTop,_=y._scrollIntoView,g={"height":s},w={"height":"vertical"===u?100*p.length+"%":"1PX","width":"horizontal"===u?100*p.length+"%":"1PX"},T={},P="translate3d(0px, -"+100*b+"%, 0px)";"horizontal"===u&&(P="translate3d(-"+100*b+"%, 0px, 0px)"),Object.assign(T,{"transform":P,"-webkit-transform":P}),f||(T.transition="unset");var O=p.map(function(e,n){var r=i()({"at-tabs__item":!0,"at-tabs__item--active":b===n});return o.l.createElement(c.a,{"className":r,"id":"tab"+n,"key":e.title,"onClick":t.handleClick.bind(t,n)},e.title,o.l.createElement(c.a,{"className":"at-tabs__item-underline"}))}),S=i()((_defineProperty(e={"at-tabs":!0,"at-tabs--scroll":h},"at-tabs--"+u,!0),_defineProperty(e,"at-tabs--"+d,!0),e),l),E="horizontal"===u,k="vertical"===u;return o.l.createElement(c.a,{"className":S,"style":this.mergeStyle(g,r)},h?o.l.createElement(a.a,{"id":this._tabId,"className":"at-tabs__header","style":g,"scrollX":E,"scrollY":k,"scrollWithAnimation":!0,"scrollLeft":m,"scrollTop":v,"scrollIntoView":_},O):o.l.createElement(c.a,{"id":this._tabId,"className":"at-tabs__header"},O),o.l.createElement(c.a,{"className":"at-tabs__body","onTouchStart":this.handleTouchStart.bind(this),"onTouchEnd":this.handleTouchEnd.bind(this),"onTouchMove":this.handleTouchMove.bind(this),"style":this.mergeStyle(T,g)},o.l.createElement(c.a,{"className":"at-tabs__underline","style":w}),this.props.children))}}]),AtTabs}();b.defaultProps={"customStyle":"","className":"","tabDirection":"horizontal","height":"","current":0,"swipeable":!0,"scroll":!1,"animated":!0,"tabList":[],"onClick":function onClick(){}},b.propTypes={"customStyle":s.a.oneOfType([s.a.object,s.a.string]),"className":s.a.oneOfType([s.a.array,s.a.string]),"height":s.a.string,"tabDirection":s.a.oneOf(["horizontal","vertical"]),"current":s.a.number,"swipeable":s.a.bool,"scroll":s.a.bool,"animated":s.a.bool,"tabList":s.a.array,"onClick":s.a.func}},"535":function(e,t,n){"use strict";n.d(t,"a",function(){return f});var o=n(3),r=n(50),i=n.n(r),l=n(362),s=n.n(l),c=n(905),a=n(361),u=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var f=function(e){function AtTabsPane(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtTabsPane),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtTabsPane.__proto__||Object.getPrototypeOf(AtTabsPane)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtTabsPane,a["a"]),u(AtTabsPane,[{"key":"render","value":function render(){var e=this.props,t=e.customStyle,n=e.className,r=e.tabDirection,l=e.index,s=e.current;return o.l.createElement(c.a,{"className":i()({"at-tabs-pane":!0,"at-tabs-pane--vertical":"vertical"===r,"at-tabs-pane--active":l===s,"at-tabs-pane--inactive":l!==s},n),"style":t},this.props.children)}}]),AtTabsPane}();f.defaultProps={"customStyle":"","className":"","tabDirection":"horizontal","index":0,"current":0},f.propTypes={"customStyle":s.a.oneOfType([s.a.object,s.a.string]),"className":s.a.oneOfType([s.a.array,s.a.string]),"tabDirection":s.a.oneOf(["horizontal","vertical"]),"index":s.a.number,"current":s.a.number}},"536":function(e,t,n){"use strict";var o=n(537);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,e.exports=function(){function shim(e,t,n,r,i,l){if(l!==o){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function getShim(){return shim}shim.isRequired=shim;var e={"array":shim,"bool":shim,"func":shim,"number":shim,"object":shim,"string":shim,"symbol":shim,"any":shim,"arrayOf":getShim,"element":shim,"elementType":shim,"instanceOf":getShim,"node":shim,"objectOf":getShim,"oneOf":getShim,"oneOfType":getShim,"shape":getShim,"exact":getShim,"checkPropTypes":emptyFunctionWithReset,"resetWarningCache":emptyFunction};return e.PropTypes=e,e}},"537":function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},"637":function(e,t,n){"use strict";n.d(t,"a",function(){return createSelectorQuery});var o=n(3),r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function filter(e,t,n){if(!t)return null;var o=e.id,r=e.dataset,i=e.rect,l=e.size,s=e.scrollOffset,c=e.properties,a=void 0===c?[]:c,u=e.computedStyle,f=void 0===u?[]:u,p=t.getBoundingClientRect(),h=p.left,d=p.right,b=p.top,y=p.bottom,m=p.width,v=p.height,_="html"===n,g={};if(o&&(g.id=t.id),r&&(g.dataset=Object.assign({},t.dataset)),i&&(_?(g.left=0,g.right=0,g.top=0,g.bottom=0):(g.left=h,g.right=d,g.top=b,g.bottom=y)),l&&(_?(g.width=t.clientWidth,g.height=t.clientHeight):(g.width=m,g.height=v)),s&&(g.scrollLeft=t.scrollLeft,g.scrollTop=t.scrollTop,g.scrollHeight=t.scrollHeight,g.scrollWidth=t.scrollWidth),a.length&&a.forEach(function(e){var n=t.getAttribute(e);n&&(g[e]=n)}),f.length){var w=window.getComputedStyle(t);f.forEach(function(e){var t=w.getPropertyValue(e);t&&(g[e]=t)})}return g}var i=function(){function Query(){_classCallCheck(this,Query),this._defaultWebviewId=null,this._webviewId=null,this._queue=[],this._queueCb=[],this._component=null}return r(Query,[{"key":"in","value":function _in(e){return this._component=e,this}},{"key":"select","value":function select(e){return"string"==typeof e&&(e=e.replace(">>>",">")),new l(e,this,!0)}},{"key":"selectAll","value":function selectAll(e){return"string"==typeof e&&(e=e.replace(">>>",">")),new l(e,this,!1)}},{"key":"selectViewport","value":function selectViewport(){return new l("html",this,!0)}},{"key":"exec","value":function exec(e){var t=this;!function queryBat(e,t){var n=[];e.forEach(function(e){var t=e.selector,r=e.single,i=e.fields,l=e.component,s=null!==l&&o.l.findDOMNode(l)||document,c=!1;if(s!==document)for(var a=s.parentNode.querySelectorAll(t),u=0,f=a.length;u<f;++u)if(s===a[u]){c=!0;break}if(r){var p=!0===c?s:s.querySelector(t);n.push(filter(i,p,t))}else{var h=s.querySelectorAll(t),d=[];!0===c&&d.push(s);for(var b=0,y=h.length;b<y;++b)d.push(h[b]);n.push(d.map(function(e){return filter(i,e)}))}}),t(n)}(this._queue,function(n){var o=t._queueCb;n.forEach(function(e,n){"function"==typeof o[n]&&o[n].call(t,e)}),"function"==typeof e&&e.call(t,n)})}},{"key":"_push","value":function _push(e,t,n,o){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;this._queue.push({"component":t,"selector":e,"single":n,"fields":o}),this._queueCb.push(r)}}]),Query}(),l=function(){function NodesRef(e,t,n){_classCallCheck(this,NodesRef),this._component=t._component,this._selector=e,this._selectorQuery=t,this._single=n}return r(NodesRef,[{"key":"boundingClientRect","value":function boundingClientRect(e){var t=this._selector,n=this._component,o=this._single,r=this._selectorQuery;return r._push(t,n,o,{"id":!0,"dataset":!0,"rect":!0,"size":!0},e),r}},{"key":"scrollOffset","value":function scrollOffset(e){var t=this._selector,n=this._component,o=this._single,r=this._selectorQuery;return r._push(t,n,o,{"id":!0,"dataset":!0,"scrollOffset":!0},e),r}},{"key":"fields","value":function fields(e,t){var n=this._selector,o=this._component,r=this._single,i=this._selectorQuery,l=e.id,s=e.dataset,c=e.rect,a=e.size,u=e.scrollOffset,f=e.properties,p=void 0===f?[]:f,h=e.computedStyle,d=void 0===h?[]:h;return i._push(n,o,r,{"id":l,"dataset":s,"rect":c,"size":a,"scrollOffset":u,"properties":p,"computedStyle":d},t),i}}]),NodesRef}();function createSelectorQuery(){return new i}}}]);