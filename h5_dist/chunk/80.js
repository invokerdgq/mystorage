(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{"356":function(e,t,o){"use strict";o.d(t,"a",function(){return delayQuerySelector}),o.d(t,"e",function(){return uuid}),o.d(t,"c",function(){return initTestEnv}),o.d(t,"d",function(){return isTest}),o.d(t,"b",function(){return handleTouchScroll});var n=o(4),r=o(363),a=n.a.getEnv();function delay(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;return new Promise(function(t){[n.a.ENV_TYPE.WEB,n.a.ENV_TYPE.SWAN].includes(a)?setTimeout(function(){t()},e):t()})}function delayQuerySelector(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500,i=a===n.a.ENV_TYPE.WEB?e:e.$scope,s=Object(r.a)().in(i);return new Promise(function(e){delay(o).then(function(){s.select(t).boundingClientRect().exec(function(t){e(t)})})})}function uuid(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),n=[],r=0;if(t=t||o.length,e)for(r=0;r<e;r++)n[r]=o[0|Math.random()*t];else{var a=void 0;for(n[8]=n[13]=n[18]=n[23]="-",n[14]="4",r=0;r<36;r++)n[r]||(a=0|16*Math.random(),n[r]=o[19===r?3&a|8:a])}return n.join("")}function initTestEnv(){0}function isTest(){return!1}var i=0;function handleTouchScroll(e){a===n.a.ENV_TYPE.WEB&&(e?(i=document.documentElement.scrollTop,document.body.classList.add("at-frozen"),document.body.style.top=-i+"px"):(document.body.style.top=null,document.body.classList.remove("at-frozen"),document.documentElement.scrollTop=i))}},"461":function(e,t,o){"use strict";var n=o(3),r=o(350),a=o.n(r),i=o(747),s=o(49),c=o.n(s),u=o(349),l=o(376),f=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var p=function(e){function AtCountdownItem(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtCountdownItem),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtCountdownItem.__proto__||Object.getPrototypeOf(AtCountdownItem)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtCountdownItem,u["a"]),f(AtCountdownItem,[{"key":"formatNum","value":function formatNum(e){return e<=9?"0"+e:""+e}},{"key":"render","value":function render(){var e=this.props,t=e.num,o=e.separator;return n.l.createElement(i.a,{"className":"at-countdown__item"},n.l.createElement(i.a,{"className":"at-countdown__time-box"},n.l.createElement(l.a,{"className":"at-countdown__time"},this.formatNum(t))),n.l.createElement(l.a,{"className":"at-countdown__separator"},o))}}]),AtCountdownItem}();p.defaultProps={"num":0,"separator":":"},p.propTypes={"num":a.a.number.isRequired,"separator":a.a.string};var h=p;o.d(t,"a",function(){return v});var d=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var m=function toSeconds(e,t,o,n){return 60*e*60*24+60*t*60+60*o+n},v=function(e){function AtCountdown(){!function countdown_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtCountdown);var e=function countdown_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtCountdown.__proto__||Object.getPrototypeOf(AtCountdown)).apply(this,arguments)),t=e.props,o=t.day,n=t.hours,r=t.minutes,a=t.seconds;e.seconds=m(o,n,r,a);var i=e.calculateTime(),s=i.day,c=i.hours,u=i.minutes,l=i.seconds;return e.state={"_day":s,"_hours":c,"_minutes":u,"_seconds":l},e.timer=null,e}return function countdown_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtCountdown,u["a"]),d(AtCountdown,[{"key":"setTimer","value":function setTimer(){this.timer||this.countdonwn()}},{"key":"clearTimer","value":function clearTimer(){this.timer&&(clearTimeout(this.timer),this.timer=null)}},{"key":"calculateTime","value":function calculateTime(){var e=0,t=0,o=0,n=0;return this.seconds>0&&(e=this.props.isShowDay?Math.floor(this.seconds/86400):0,t=Math.floor(this.seconds/3600)-24*e,o=Math.floor(this.seconds/60)-24*e*60-60*t,n=Math.floor(this.seconds)-24*e*60*60-60*t*60-60*o),{"day":e,"hours":t,"minutes":o,"seconds":n}}},{"key":"countdonwn","value":function countdonwn(){var e=this,t=this.calculateTime(),o=t.day,n=t.hours,r=t.minutes,a=t.seconds;if(this.setState({"_day":o,"_hours":n,"_minutes":r,"_seconds":a}),this.seconds--,this.seconds<0)return this.clearTimer(),void this.props.onTimeUp();this.timer=setTimeout(function(){e.countdonwn()},1e3)}},{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){if(JSON.stringify(this.props)!==JSON.stringify(e)){var t=e.day,o=e.hours,n=e.minutes,r=e.seconds;this.seconds=m(t,o,n,r),this.clearTimer(),this.setTimer()}}},{"key":"componentDidMount","value":function componentDidMount(){this.setTimer()}},{"key":"componentWillUnmount","value":function componentWillUnmount(){this.clearTimer()}},{"key":"componentDidHide","value":function componentDidHide(){this.clearTimer()}},{"key":"componentDidShow","value":function componentDidShow(){this.setTimer()}},{"key":"render","value":function render(){var e=this.props,t=e.className,o=e.customStyle,r=e.format,a=e.isShowDay,s=e.isCard,u=e.isShowHour,l=this.state,f=l._day,p=l._hours,d=l._minutes,m=l._seconds;return n.l.createElement(i.a,{"className":c()({"at-countdown":!0,"at-countdown--card":s},t),"style":o},a&&n.l.createElement(h,{"num":f,"separator":r.day}),u&&n.l.createElement(h,{"num":p,"separator":r.hours}),n.l.createElement(h,{"num":d,"separator":r.minutes}),n.l.createElement(h,{"num":m,"separator":r.seconds}))}}]),AtCountdown}();v.defaultProps={"customStyle":"","className":"","isCard":!1,"isShowDay":!1,"isShowHour":!0,"format":{"day":"天","hours":"时","minutes":"分","seconds":"秒"},"day":0,"hours":0,"minutes":0,"seconds":0,"onTimeUp":function onTimeUp(){}},v.propTypes={"customStyle":a.a.oneOfType([a.a.object,a.a.string]),"className":a.a.oneOfType([a.a.array,a.a.string]),"isCard":a.a.bool,"isShowDay":a.a.bool,"isShowHour":a.a.bool,"format":a.a.object,"day":a.a.number,"hours":a.a.number,"minutes":a.a.number,"seconds":a.a.number,"onTimeUp":a.a.func}},"472":function(e,t,o){"use strict";o.d(t,"a",function(){return r}),o.d(t,"b",function(){return a});var n=o(1),r=Object(n.i)("getLocation"),a=Object(n.i)("openLocation",{"scale":18})},"489":function(e,t,o){"use strict";o.d(t,"b",function(){return setNavigationBarTitle}),o.d(t,"a",function(){return setNavigationBarColor});var n=o(1);function setNavigationBarTitle(e){var t=Object(n.l)(e);if(!t.res){var o={"errMsg":"setNavigationBarTitle"+t.msg};return console.error(o.errMsg),Promise.reject(o)}var r=e.title,a=e.success,i=e.fail,s=e.complete,c={"errMsg":"setNavigationBarTitle:ok"};return r&&"string"==typeof r?(document.title!==r&&(document.title=r),"function"==typeof a&&a(c),"function"==typeof s&&s(c),Promise.resolve(c)):(c.errMsg=Object(n.e)({"name":"setNavigationBarTitle","para":"title","correct":"String","wrong":r}),console.error(c.errMsg),"function"==typeof i&&i(c),"function"==typeof s&&s(c),Promise.reject(c))}function setNavigationBarColor(e){var t=document.createElement("meta");t.setAttribute("name","theme-color"),t.setAttribute("content",e.backgroundColor),document.head.appendChild(t)}},"510":function(e,t,o){"use strict";o.d(t,"a",function(){return v});var n=o(3),r=o(747),a=o(376),i=o(748),s=o(350),c=o.n(s),u=o(49),l=o.n(u),f=o(52),p=o.n(f),h=o(349),d=o(356),m=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var v=function(e){function AtFloatLayout(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtFloatLayout);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtFloatLayout.__proto__||Object.getPrototypeOf(AtFloatLayout)).apply(this,arguments));t.handleClose=function(){p()(t.props.onClose)&&t.props.onClose()},t.close=function(){t.setState({"_isOpened":!1},t.handleClose)},t.handleTouchMove=function(e){e.stopPropagation()};var o=e.isOpened;return t.state={"_isOpened":o},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtFloatLayout,h["a"]),m(AtFloatLayout,[{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){var t=e.isOpened;this.props.isOpened!==t&&Object(d.b)(t),t!==this.state._isOpened&&this.setState({"_isOpened":t})}},{"key":"render","value":function render(){var e=this.state._isOpened,t=this.props,o=t.title,s=t.scrollY,c=t.scrollX,u=t.scrollTop,f=t.scrollLeft,p=t.upperThreshold,h=t.lowerThreshold,d=t.scrollWithAnimation,m=l()("at-float-layout",{"at-float-layout--active":e},this.props.className);return n.l.createElement(r.a,{"className":m,"onTouchMove":this.handleTouchMove},n.l.createElement(r.a,{"onClick":this.close,"className":"at-float-layout__overlay"}),n.l.createElement(r.a,{"className":"at-float-layout__container layout"},o?n.l.createElement(r.a,{"className":"layout-header"},n.l.createElement(a.a,{"className":"layout-header__title"},o),n.l.createElement(r.a,{"className":"layout-header__btn-close","onClick":this.close})):null,n.l.createElement(r.a,{"className":"layout-body"},n.l.createElement(i.a,{"scrollY":s,"scrollX":c,"scrollTop":u,"scrollLeft":f,"upperThreshold":p,"lowerThreshold":h,"scrollWithAnimation":d,"onScroll":this.props.onScroll,"onScrollToLower":this.props.onScrollToLower,"onScrollToUpper":this.props.onScrollToUpper,"className":"layout-body__content"},this.props.children))))}}]),AtFloatLayout}();v.defaultProps={"title":"","isOpened":!1,"scrollY":!0,"scrollX":!1,"scrollWithAnimation":!1,"onClose":function onClose(){},"onScroll":function onScroll(){},"onScrollToLower":function onScrollToLower(){},"onScrollToUpper":function onScrollToUpper(){}},v.propType={"title":c.a.string,"isOpened":c.a.bool,"scrollY":c.a.bool,"scrollX":c.a.bool,"scrollTop":c.a.number,"scrollLeft":c.a.number,"upperThreshold":c.a.number,"lowerThreshold":c.a.number,"scrollWithAnimation":c.a.bool,"onClose":c.a.func,"onScroll":c.a.func,"onScrollToLower":c.a.func,"onScrollToUpper":c.a.func}},"590":function(e,t,o){var n=o(591);"string"==typeof n&&(n=[[e.i,n,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};o(358)(n,r);n.locals&&(e.exports=n.locals)},"591":function(e,t,o){(e.exports=o(357)(!1)).push([e.i,".taro-canvas {\r\n  position: relative;\r\n  width: 300px;\r\n  height: 150px;\r\n}\r\n",""])},"759":function(e,t,o){"use strict";t.a=function getImageInfo(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.src,o=e.success,n=e.fail,r=e.complete;return new Promise(function(e,a){var i=new Image;i.onload=function(){!function onSuccess(t){o&&o(t),r&&r(),e(t)}({"errMsg":"getImageInfo:ok","width":i.naturalWidth,"height":i.naturalHeight})},i.onerror=function(e){!function onError(e){n&&n(e),r&&r(),a(e)}({"errMsg":"getImageInfo:fail "+e.message})},i.src=t})}},"760":function(e,t,o){"use strict";var n=o(1),r=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var o=[],n=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(o.push(i.value),!t||o.length!==t);n=!0);}catch(e){r=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(r)throw a}}return o}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.a=function createCanvasContext(e,t){var o="__taroref_"+e,a=Object(n.d)(o,t).vnode.dom.querySelector("[canvasId="+e+"]"),i=a.getContext("2d"),s=[],c=function enqueueActions(e){return function(){for(var t=arguments.length,o=Array(t),n=0;n<t;n++)o[n]=arguments[n];s.push({"func":e,"args":o})}},u={};return[["setFillStyle",function(e){i.fillStyle=e}],["setFontSize",function(e){i.font=e}],["setGlobalAlpha",function(e){i.globalAlpha=e}],["setLineDash",function(e,t){i.setLineDash(e),i.lineDashOffset=t}],["setLineCap",function(e){i.lineCap=e}],["setLineJoin",function(e){i.lineJoin=e}],["setLineWidth",function(e){i.lineWidth=e}],["setMiterLimit",function(e){i.miterLimit=e}],["setShadow",function(e,t,o,n){i.shadowOffsetX=e,i.shadowOffsetY=t,i.shadowColor=o,i.shadowBlur=n}],["setStrokeStyle",function(e){i.strokeStyle=e}],["setTextAlign",function(e){i.textAlign=e}],["setTextBaseline",function(e){i.textBaseline=e}]].forEach(function(e){var t=r(e,2),o=t[0],n=t[1];Object.defineProperty(u,o,{"get":function get(){return c(n)},"enumerable":!0})}),[["arc"],["arcTo"],["beginPath"],["bezierCurveTo"],["clearRect"],["clip"],["closePath"],["createCircularGradient"],["createLinearGradient"],["createPattern"],["drawImage"],["fill"],["fillRect"],["fillText"],["lineTo"],["measureText",!0],["moveTo"],["quadraticCurveTo"],["rect"],["restore"],["rotate"],["save"],["scale"],["setTransform"],["stroke"],["strokeRect"],["strokeText"],["transform"],["translate"]].forEach(function(e){var t=r(e,2),o=t[0],n=t[1];Object.defineProperty(u,o,{"get":n?function(){return i[o].bind(i)}:function(){return c(i[o])},"enumerable":!0})}),["fillStyle","font","globalAlpha","lineCap","lineDashOffset","lineJoin","lineWidth","miterLimit","shadowOffsetX","shadowOffsetY","shadowColor","shadowBlur","strokeStyle","textAlign","textBaseline","direction","globalCompositeOperation","imageSmoothingEnabled ","imageSmoothingQuality","filter"].forEach(function(e){Object.defineProperty(u,e,{"get":function get(){return i[e]},"set":function set(t){return c(function(){i[e]=t})(),!0}})}),Object.defineProperty(u,"draw",{"value":function draw(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];try{return e||i.clearRect(0,0,a.width,a.height),s.forEach(function(e){var t=e.func,o=e.args;t.apply(i,o)}),function emptyActions(){s.length=0}(),t&&t(),Promise.resolve()}catch(e){return Promise.reject({"errMsg":e.message})}}}),u}},"761":function(e,t,o){"use strict";var n=o(1);t.a=function canvasToTempFilePath(e,t){var o=e.canvasId,r=e.fileType,a=e.quality,i=e.success,s=e.fail,c=e.complete,u="__taroref_"+o,l=Object(n.d)(u,t).vnode.dom.querySelector("[canvasId="+o+"]");try{var f={"tempFilePath":l.toDataURL("image/"+(r||"png"),a),"res":"canvasToTempFilePath:ok"};return i&&i(f),c&&c(),Promise.resolve(f)}catch(e){var p={"errMsg":e.message};return s&&s(p),c&&c(),Promise.reject(p)}}},"831":function(e,t,o){"use strict";var n=o(4),r=o(3),a=o(355),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},s=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var c,u,l,f=function transformTouches(e,t){for(var o=t.offsetX,n=t.offsetY,r=[],a=e.length,i=0;i<a;i++){var s=e.item(i);r.push({"x":s.pageX-o,"y":s.pageY-n,"identifier":s.identifier})}return r},p=function touchable(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{"longTapTime":500};return function(t){var o,c;return c=o=function(o){function TouchableComponent(){var t,o,n;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,TouchableComponent);for(var r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];return o=n=_possibleConstructorReturn(this,(t=TouchableComponent.__proto__||Object.getPrototypeOf(TouchableComponent)).call.apply(t,[this].concat(a))),n.timer=null,n.offset={"offsetX":0,"offsetY":0},n.onTouchStart=function(t){var o=n.props,r=o.onTouchStart,a=o.onLongTap;Object.defineProperty(t,"touches",{"value":f(t.touches,n.offset)}),r&&r(t),n.timer=setTimeout(function(){a&&a(t)},e.longTapTime)},n.onTouchMove=function(e){n.timer&&clearTimeout(n.timer);var t=n.props.onTouchMove;Object.defineProperty(e,"touches",{"value":f(e.touches,n.offset)}),t&&t(e)},n.onTouchEnd=function(e){n.timer&&clearTimeout(n.timer);var t=n.props.onTouchEnd;Object.defineProperty(e,"touches",{"value":f(e.touches,n.offset)}),t&&t(e)},n.onTouchCancel=function(e){n.timer&&clearTimeout(n.timer);var t=n.props.onTouchCancel;Object.defineProperty(e,"touches",{"value":f(e.touches,n.offset)}),t&&t(e)},n.updatePos=function(){var e=function getOffset(e){var t=e.getBoundingClientRect(),o=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop;return{"offsetY":t.top+n,"offsetX":t.left+o}}(n.vnode.dom),t=e.offsetX,o=e.offsetY;n.offset.offsetX=t,n.offset.offsetY=o},_possibleConstructorReturn(n,o)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(TouchableComponent,n.a.Component),s(TouchableComponent,[{"key":"componentDidMount","value":function componentDidMount(){this.updatePos()}},{"key":"componentDidUpdate","value":function componentDidUpdate(){this.updatePos()}},{"key":"render","value":function render(){var e=i({"onTouchStart":this.onTouchStart,"onTouchMove":this.onTouchMove,"onTouchEnd":this.onTouchEnd,"onTouchCancel":this.onTouchCancel},Object(a.a)(this.props,["onTouchStart","onTouchMove","onTouchEnd","onTouchCancel","onLongTap"]));return r.l.createElement(t,e)}}]),TouchableComponent}(),o.defaultProps={"onTouchStart":null,"onTouchMove":null,"onTouchEnd":null,"onTouchCancel":null,"onLongTap":null},c}},h=o(49),d=o.n(h),m=(o(590),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}),v=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();function canvas_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var y=p()((l=u=function(e){function Canvas(){var e,t,o;!function canvas_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Canvas);for(var n=arguments.length,r=Array(n),a=0;a<n;a++)r[a]=arguments[a];return t=o=canvas_possibleConstructorReturn(this,(e=Canvas.__proto__||Object.getPrototypeOf(Canvas)).call.apply(e,[this].concat(r))),o.width=300,o.height=150,o.getWrapRef=function(e){e&&(o.wrapDom=e)},o.getCanvasRef=function(e){e&&(o.canvasRef=e)},o.setSize=function(e,t){o.canvasRef.setAttribute("width",e),o.canvasRef.setAttribute("height",t),o.width=e,o.height=t},canvas_possibleConstructorReturn(o,t)}return function canvas_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Canvas,n["a"].PureComponent),v(Canvas,[{"key":"componentDidMount","value":function componentDidMount(){if(this.wrapDom){var e=this.wrapDom.getBoundingClientRect(),t=e.width,o=e.height;this.setSize(t,o)}}},{"key":"componentDidUpdate","value":function componentDidUpdate(){var e=this.wrapDom.getBoundingClientRect(),t=e.width,o=e.height;this.width===t&&this.height===o||this.setSize(t,o)}},{"key":"componentDidCatch","value":function componentDidCatch(e){var t=this.props.onError;t&&t({"errMsg":e.message})}},{"key":"render","value":function render(){var e=this.props,t=e.canvasId,o=e.onTouchStart,n=e.onTouchMove,a=e.onTouchEnd,i=e.onTouchCancel,s=e.className,c=function _objectWithoutProperties(e,t){var o={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(o[n]=e[n]);return o}(e,["canvasId","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel","className"]),u=m({"className":d()("taro-canvas",s),"ref":this.getWrapRef},c),l={"canvasId":t,"onTouchStart":o,"onTouchMove":n,"onTouchEnd":a,"onTouchCancel":i,"width":this.width,"height":this.height,"ref":this.getCanvasRef};return r.l.createElement("div",u,r.l.createElement("canvas",l))}}]),Canvas}(),u.defaultProps={"canvasId":"","disableScroll":!1,"onError":null},c=l))||c;t.a=y}}]);