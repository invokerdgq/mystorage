(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{"360":function(e,t,n){"use strict";n.d(t,"a",function(){return s});var o=n(4),r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var a=function objectToString(e){if(e&&"object"===(void 0===e?"undefined":i(e))){var t="";return Object.keys(e).forEach(function(n){var o=n.replace(/([A-Z])/g,"-$1").toLowerCase();t+=o+":"+e[n]+";"}),t}return e&&"string"==typeof e?e:""},s=function(e){function AtComponent(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtComponent),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtComponent.__proto__||Object.getPrototypeOf(AtComponent)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtComponent,o["a"].Component),r(AtComponent,[{"key":"mergeStyle","value":function mergeStyle(e,t){return e&&"object"===(void 0===e?"undefined":i(e))&&t&&"object"===(void 0===t?"undefined":i(t))?Object.assign({},e,t):a(e)+a(t)}}]),AtComponent}();s.options={"addGlobalClass":!0}},"361":function(e,t,n){e.exports=n(535)()},"368":function(e,t,n){"use strict";n.d(t,"a",function(){return p});var o,r,i=n(3),a=n(4),s=n(472),c=n(5),u=n(906),l=(n(377),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var p=(r=o=function(e){function NavGap(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,NavGap);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(NavGap.__proto__||Object.getPrototypeOf(NavGap)).call(this,e));return t.handleIconClick=function(){console.log("kakakakk"),a.a.navigateBack()},t.props=e,t.state={"showIcon":!1,"navBar":0},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(NavGap,a["a"].Component),l(NavGap,[{"key":"componentDidMount","value":function componentDidMount(){var e=a.a.getCurrentPages(),t=null;try{t=Object(s.b)(),this.setState({"navBar":t.statusBarHeight})}catch(e){console.log(e)}this.setState({"showIcon":!/(index|category\/index|recommend\/list|cart\/espier-index|member\/index)(.)*/.test(e[e.length-1].route)})}},{"key":"render","value":function render(){var e=this.props,t=e.title,n=(e.home,this.state.showIcon),o=Object(c.b)("top");return i.l.createElement(u.a,{"className":"nav-gap-container","style":{"background":this.props.bg?this.props.bg:"","color":this.props.cl?this.props.cl:"black"}},i.l.createElement(u.a,{"className":"iconfont icon-arrow-left","onClick":this.handleIconClick.bind(this),"style":{"top":o+"px","display":n?"block":"none"}}),i.l.createElement(u.a,{"style":{"top":o+"px"},"className":"gap-title"},t))}}]),NavGap}(),o.options={"addGlobalClass":!0},r)},"377":function(e,t,n){},"470":function(e,t,n){var o=n(471);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(366)(o,r);o.locals&&(e.exports=o.locals)},"471":function(e,t,n){(e.exports=n(365)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},"474":function(e,t,n){"use strict";n(363);var o=n(3),r=n(364),i=n(50),a=n.n(i),s=(n(470),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),c=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var u=function(e){function Text(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Text,o["l"].Component),c(Text,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.selectable,i=void 0!==n&&n,c=a()("taro-text",{"taro-text__selectable":i},t);return o.l.createElement("span",s({},Object(r.a)(this.props,["selectable","className"]),{"className":c}),this.props.children)}}]),Text}();t.a=u},"482":function(e,t,n){"use strict";var o=n(3),r=n(50),i=n.n(r),a=n(361),s=n.n(a),c=n(906),u=n(360),l=n(474),p=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var f=function(e){function AtCountdownItem(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtCountdownItem),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtCountdownItem.__proto__||Object.getPrototypeOf(AtCountdownItem)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtCountdownItem,u["a"]),p(AtCountdownItem,[{"key":"formatNum","value":function formatNum(e){return e<=9?"0"+e:""+e}},{"key":"render","value":function render(){var e=this.props,t=e.num,n=e.separator;return o.l.createElement(c.a,{"className":"at-countdown__item"},o.l.createElement(c.a,{"className":"at-countdown__time-box"},o.l.createElement(l.a,{"className":"at-countdown__time"},this.formatNum(t))),o.l.createElement(l.a,{"className":"at-countdown__separator"},n))}}]),AtCountdownItem}();f.defaultProps={"num":0,"separator":":"},f.propTypes={"num":s.a.number.isRequired,"separator":s.a.string},n.d(t,"a",function(){return h});var m=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var d=function toSeconds(e,t,n,o){return 60*e*60*24+60*t*60+60*n+o},h=function(e){function AtCountdown(e){!function countdown_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtCountdown);var t=function countdown_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtCountdown.__proto__||Object.getPrototypeOf(AtCountdown)).call(this,e)),n=t.props,o=n.day,r=n.hours,i=n.minutes,a=n.seconds;t.seconds=d(o,r,i,a);var s=t.calculateTime(),c=s.day,u=s.hours,l=s.minutes,p=s.seconds;return t.state={"_day":c,"_hours":u,"_minutes":l,"_seconds":p},t.timer=void 0,t}return function countdown_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtCountdown,u["a"]),m(AtCountdown,[{"key":"setTimer","value":function setTimer(){this.timer||this.countdonwn()}},{"key":"clearTimer","value":function clearTimer(){this.timer&&(clearTimeout(this.timer),this.timer=void 0)}},{"key":"calculateTime","value":function calculateTime(){var e=0,t=0,n=0,o=0;return this.seconds>0&&(e=this.props.isShowDay?Math.floor(this.seconds/86400):0,t=Math.floor(this.seconds/3600)-24*e,n=Math.floor(this.seconds/60)-24*e*60-60*t,o=Math.floor(this.seconds)-24*e*60*60-60*t*60-60*n),{"day":e,"hours":t,"minutes":n,"seconds":o}}},{"key":"countdonwn","value":function countdonwn(){var e=this,t=this.calculateTime(),n=t.day,o=t.hours,r=t.minutes,i=t.seconds;if(this.setState({"_day":n,"_hours":o,"_minutes":r,"_seconds":i}),this.seconds--,this.seconds<0)return this.clearTimer(),void(this.props.onTimeUp&&this.props.onTimeUp());this.timer=setTimeout(function(){e.countdonwn()},1e3)}},{"key":"componentWillReceiveProps","value":function componentWillReceiveProps(e){if(JSON.stringify(this.props)!==JSON.stringify(e)){var t=e.day,n=e.hours,o=e.minutes,r=e.seconds;this.seconds=d(t,n,o,r),this.clearTimer(),this.setTimer()}}},{"key":"componentDidMount","value":function componentDidMount(){this.setTimer()}},{"key":"componentWillUnmount","value":function componentWillUnmount(){this.clearTimer()}},{"key":"componentDidHide","value":function componentDidHide(){this.clearTimer()}},{"key":"componentDidShow","value":function componentDidShow(){this.setTimer()}},{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.customStyle,r=e.format,a=e.isShowDay,s=e.isCard,u=e.isShowHour,l=this.state,p=l._day,m=l._hours,d=l._minutes,h=l._seconds;return o.l.createElement(c.a,{"className":i()({"at-countdown":!0,"at-countdown--card":s},t),"style":n},a&&o.l.createElement(f,{"num":p,"separator":r.day}),u&&o.l.createElement(f,{"num":m,"separator":r.hours}),o.l.createElement(f,{"num":d,"separator":r.minutes}),o.l.createElement(f,{"num":h,"separator":r.seconds}))}}]),AtCountdown}();h.defaultProps={"customStyle":"","className":"","isCard":!1,"isShowDay":!1,"isShowHour":!0,"format":{"day":"天","hours":"时","minutes":"分","seconds":"秒"},"day":0,"hours":0,"minutes":0,"seconds":0,"onTimeUp":function onTimeUp(){}},h.propTypes={"customStyle":s.a.oneOfType([s.a.object,s.a.string]),"className":s.a.oneOfType([s.a.array,s.a.string]),"isCard":s.a.bool,"isShowDay":s.a.bool,"isShowHour":s.a.bool,"format":s.a.object,"day":s.a.number,"hours":s.a.number,"minutes":s.a.number,"seconds":s.a.number,"onTimeUp":s.a.func}},"535":function(e,t,n){"use strict";var o=n(536);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,e.exports=function(){function shim(e,t,n,r,i,a){if(a!==o){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function getShim(){return shim}shim.isRequired=shim;var e={"array":shim,"bool":shim,"func":shim,"number":shim,"object":shim,"string":shim,"symbol":shim,"any":shim,"arrayOf":getShim,"element":shim,"elementType":shim,"instanceOf":getShim,"node":shim,"objectOf":getShim,"oneOf":getShim,"oneOfType":getShim,"shape":getShim,"exact":getShim,"checkPropTypes":emptyFunctionWithReset,"resetWarningCache":emptyFunction};return e.PropTypes=e,e}},"536":function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},"876":function(e,t,n){},"991":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return w});var o,r,i=n(3),a=n(358),s=n(5),c=n(4),u=n(906),l=n(905),p=n(474),f=n(368),m=n(17),d=n(9),h=n(482),y=n(15),b=n(34),v=(n(876),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),_=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(n):void 0};var w=(r=o=function(e){function Transform(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Transform);var n=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Transform.__proto__||Object.getPrototypeOf(Transform)).call(this,e));n.fetchInfo=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(o,r){try{var i=t[o](r),a=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e;return regeneratorRuntime.wrap(function _callee$(t){for(;;)switch(t.prev=t.next){case 0:return Object(a.c)({"title":"登录中","mask":!0}),t.next=3,d.a.member.memberInfo();case 3:e=t.sent,Object(s.b)("userinfo")||Object(s.f)("userinfo",{"username":e.memberInfo.username,"avatar":e.memberInfo.avatar,"userId":e.memberInfo.userId,"user_card_code":e.memberInfo.user_card_code,"inviter_id":e.memberInfo.inviter_id,"is_vip":e.vipgrade.is_vip}),"至尊会员"!==e.vipgrade.grade_name&&"王者身份"!==e.vipgrade.grade_name||0!=e.vipgrade.is_effective?Object(a.e)({"title":"您已激活","icon":"none","duration":2e3,"success":function success(){setTimeout(function(){Object(a.a)(),c.a.redirectTo({"url":"/pages/member/vip"})},2e3)}}):(Object(a.a)(),n.setState({"info":e}));case 6:case"end":return t.stop()}},_callee,t)})),n.handleClickItem=function(e){"至尊"===e?Object(a.d)({"title":"去商城下一单?","success":function success(e){e.confirm&&c.a.navigateTo({"url":"/pages/index"})}}):c.a.navigateTo({"url":"/pages/vip/vipgrades?grade_name="+("至尊会员"===n.state.info.vipgrade.grade_name?"王者身份":"至尊会员")})};var o=Date.now(),r=new Date("july 1,2020").getTime();return n.time=r-o,n.state={"info":{}},n.bgList=[b.d+"/zz.png",b.d+"/wz.png",b.d+"/hk.png",b.d+"/jl.png",b.d+"/btzz.png",b.d+"/btwz.png",b.d+"/wzlive.jpg"],n}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Transform,c["a"].Component),v(Transform,[{"key":"componentDidMount","value":function componentDidMount(){var e=this;if(!m.a.getAuthToken())return Object(a.e)({"title":"请先登录","icon":"none"}),void setTimeout(function(){m.a.login(e)},2e3);this.fetchInfo()}},{"key":"render","value":function render(){var e=this.state.info,t=e.vipgrade,n=void 0===t?{}:t,o=e.memberInfo,r=void 0===o?{}:o;return i.l.createElement(u.a,null,i.l.createElement(f.a,{"title":"限时好礼活动"}),i.l.createElement(u.a,{"className":"container"},i.l.createElement(l.a,{"mode":"widthFix","style":"display:block;position:absolute;top:0;z-index:-1;width:750rpx","src":""+("至尊会员"===n.grade_name?this.bgList[0]:this.bgList[1])}),i.l.createElement(u.a,{"className":"transform-body"},i.l.createElement(u.a,{"className":"avatar-container"},i.l.createElement(l.a,{"src":r.avatar})),i.l.createElement(u.a,{"className":"user-info"},i.l.createElement(u.a,{"className":"user-info-head"},i.l.createElement(p.a,null,r.username),i.l.createElement(l.a,{"mode":"widthFix","style":"width:130rpx","src":""+("至尊会员"===n.grade_name?this.bgList[2]:this.bgList[3])})),i.l.createElement(u.a,{"className":"user-info-foot"},"NO.",r.user_card_code))),i.l.createElement(u.a,{"className":"timer"},i.l.createElement(h.a,{"isCard":!0,"isShowDay":!0,"day":Object(y.b)(this.time,"ms").dd,"hours":Object(y.b)(this.time,"ms").hh,"minutes":Object(y.b)(this.time,"ms").mm,"seconds":Object(y.b)(this.time,"ms").ss})),i.l.createElement(u.a,{"className":"buy-btn-f","onClick":this.handleClickItem.bind(this,"至尊")},i.l.createElement(l.a,{"src":this.bgList[4],"mode":"widthFix","style":"width:670rpx"})),i.l.createElement(u.a,{"className":"buy-btn-s","onClick":this.handleClickItem.bind(this,"王者")},i.l.createElement(l.a,{"src":""+("至尊会员"===n.grade_name?this.bgList[6]:this.bgList[5]),"mode":"widthFix","style":"width:670rpx"}))))}},{"key":"componentDidShow","value":function componentDidShow(){_(Transform.prototype.__proto__||Object.getPrototypeOf(Transform.prototype),"componentDidShow",this)&&_(Transform.prototype.__proto__||Object.getPrototypeOf(Transform.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){_(Transform.prototype.__proto__||Object.getPrototypeOf(Transform.prototype),"componentDidHide",this)&&_(Transform.prototype.__proto__||Object.getPrototypeOf(Transform.prototype),"componentDidHide",this).call(this)}}]),Transform}(),o.options={"addGlobalClass":!0},r)}}]);