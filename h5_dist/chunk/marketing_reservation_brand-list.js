(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"458":function(t,e,n){"use strict";var o=n(17),r=function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}(),i=function get(t,e,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,e);if(void 0===o){var r=Object.getPrototypeOf(t);return null===r?void 0:get(r,e,n)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(n):void 0};function _asyncToGenerator(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function step(o,r){try{var i=e[o](r),a=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(a).then(function(t){step("next",t)},function(t){step("throw",t)});t(a)}("next")})}}var a={"WILL_MOUNT":0,"DID_MOUNT":1,"DID_SHOW":2};function withLogin(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.WILL_MOUNT;return void 0!==a[e]?(console.warn("lifeCycle is not in defined types: "+e),function(t){return t}):function withLoginComponent(t){return function(n){function WithLogin(t){return function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,WithLogin),function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(WithLogin.__proto__||Object.getPrototypeOf(WithLogin)).call(this,t))}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(WithLogin,t),r(WithLogin,[{"key":"componentWillMount","value":function(){var t=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var t;return regeneratorRuntime.wrap(function _callee$(n){for(;;)switch(n.prev=n.next){case 0:if(e!==a.WILL_MOUNT){n.next=9;break}return n.next=3,this.$__autoLogin();case 3:if(n.sent){n.next=6;break}return n.abrupt("return");case 6:i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentWillMount",this)&&i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentWillMount",this).call(this),n.next=13;break;case 9:return n.next=11,this.$__autoLoginDone();case 11:t=n.sent,i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentWillMount",this)&&t&&i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentWillMount",this).call(this);case 13:case"end":return n.stop()}},_callee,this)}));return function componentWillMount(){return t.apply(this,arguments)}}()},{"key":"componentDidMount","value":function(){var t=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(){var t;return regeneratorRuntime.wrap(function _callee2$(n){for(;;)switch(n.prev=n.next){case 0:if(e!==a.DID_MOUNT){n.next=9;break}return n.next=3,this.$__autoLogin();case 3:if(n.sent){n.next=6;break}return n.abrupt("return");case 6:i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidMount",this)&&i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidMount",this).call(this),n.next=13;break;case 9:return n.next=11,this.$__autoLoginDone();case 11:t=n.sent,i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidMount",this)&&t&&i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidMount",this).call(this);case 13:case"end":return n.stop()}},_callee2,this)}));return function componentDidMount(){return t.apply(this,arguments)}}()},{"key":"componentDidShow","value":function(){var t=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var t;return regeneratorRuntime.wrap(function _callee3$(n){for(;;)switch(n.prev=n.next){case 0:if(e!==a.DID_SHOW){n.next=9;break}return n.next=3,this.$__autoLogin();case 3:if(n.sent){n.next=6;break}return n.abrupt("return");case 6:i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidShow",this)&&i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidShow",this).call(this),n.next=13;break;case 9:return n.next=11,this.$__autoLoginDone();case 11:t=n.sent,i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidShow",this)&&t&&i(WithLogin.prototype.__proto__||Object.getPrototypeOf(WithLogin.prototype),"componentDidShow",this).call(this);case 13:case"end":return n.stop()}},_callee3,this)}));return function componentDidShow(){return t.apply(this,arguments)}}()},{"key":"$__autoLogin","value":function(){var t=_asyncToGenerator(regeneratorRuntime.mark(function _callee4(){var t;return regeneratorRuntime.wrap(function _callee4$(e){for(;;)switch(e.prev=e.next){case 0:return this.$__autoLogin_state="pending",t=void 0,e.prev=2,e.next=5,o.a.autoLogin(this);case 5:t=e.sent,this.$__autoLogin_state=t?"success":"fail",e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),this.$__autoLogin_state="fail";case 12:return e.abrupt("return",t);case 13:case"end":return e.stop()}},_callee4,this,[[2,9]])}));return function $__autoLogin(){return t.apply(this,arguments)}}()},{"key":"$__autoLoginDone","value":function $__autoLoginDone(){var t=void 0,e=8,n=this;return new Promise(function(o){!function next(){t&&clearTimeout(t),t=setTimeout(function(){var r=n.$__autoLogin_state;"success"===r||"fail"===r?(clearTimeout(t),t=null,o("success"===r)):e>0?(e--,next()):o(!1)},70)}()})}}]),WithLogin}()}}var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},s=function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}();function withPager(t){var e,n;return e=function(e){function WithPagerComponent(t){!function withPager_classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,WithPagerComponent);var e=function withPager_possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(WithPagerComponent.__proto__||Object.getPrototypeOf(WithPagerComponent)).call(this,t));n.call(e);var o=t||{},r=o.pageSize,i=void 0===r?10:r,a=o.pageNo,c=void 0===a?0:a,s=o.pageTotal,u={"isLoading":!1,"total":void 0===s?0:s,"page_no":c,"page_size":i,"hasNext":!0};return e.state.page=u,e}return function withPager_inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(WithPagerComponent,t),s(WithPagerComponent,[{"key":"resetPage","value":function resetPage(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},e=c({},this.state.page||{},{"page_no":0,"total":0,"isLoading":!1,"hasNext":!0});this.setState({"page":e},t)}},{"key":"transFormPage","value":function transFormPage(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n=c({},this.state.page||{},{"page_no":Math.ceil(t/this.state.pageSize),"total":0,"isLoading":!1,"hasNext":!0});this.setState({"page":n},e)}}]),WithPagerComponent}(),n=function _initialiseProps(){var t=this;this.nextPage=function withPager_asyncToGenerator(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function step(o,r){try{var i=e[o](r),a=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(a).then(function(t){step("next",t)},function(t){step("throw",t)});t(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,n,o,r,i,a;return regeneratorRuntime.wrap(function _callee$(s){for(;;)switch(s.prev=s.next){case 0:if(console.log("hahaha"),e=t.state.page,console.log(e.hasNext),e.hasNext&&!e.isLoading){s.next=5;break}return s.abrupt("return");case 5:return e.isLoading=!0,t.setState({"page":e}),n=e.page_no,o=e.page_size,r=n+1,s.next=11,t.fetch({"page_no":r,"page_size":o});case 11:i=s.sent,(!(a=i.total)||r>=Math.ceil(+a/o))&&(e.hasNext=!1),t.setState({"page":c({},e,{"total":a,"page_no":r,"isLoading":!1})});case 15:case"end":return s.stop()}},_callee,t)}))},e}var u=n(15),p=n(53),l=n.n(p),f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};function withBackToTop(t){return function(e){function WithBackToTopComponent(t){!function withBackToTop_classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,WithBackToTopComponent);var e=function withBackToTop_possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(WithBackToTopComponent.__proto__||Object.getPrototypeOf(WithBackToTopComponent)).call(this,t));return e.scrollBackToTop=function(){e.setState({"scrollTop":1},function(){})},e.handleScroll=l()(function(t){var n=t.detail,o=n.scrollTop;n.scrollHeight<600||(o>300&&!e.state.showBackToTop?(u.n.debug("[BackToTop] showBackToTop, scrollTop: "+o),e.setState({"showBackToTop":!0})):e.state.showBackToTop&&o<=300&&(u.n.debug("[BackToTop] hideBackToTop, scrollTop: "+o),e.setState({"showBackToTop":!1})))},70),e.state=f({},e.state,{"scrollTop":null,"showBackToTop":!1}),e}return function withBackToTop_inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(WithBackToTopComponent,t),WithBackToTopComponent}()}n.d(e,"b",function(){return withLogin}),n.d(e,"c",function(){return withPager}),n.d(e,"a",function(){return withBackToTop})},"471":function(t,e,n){var o=n(472);"string"==typeof o&&(o=[[t.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(o,r);o.locals&&(t.exports=o.locals)},"472":function(t,e,n){(t.exports=n(366)(!1)).push([t.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},"475":function(t,e,n){"use strict";n(364);var o=n(3),r=n(365),i=n(50),a=n.n(i),c=(n(471),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}),s=function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}();var u=function(t){function Text(){return function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(Text,o["l"].Component),s(Text,[{"key":"render","value":function render(){var t=this.props,e=t.className,n=t.selectable,i=void 0!==n&&n,s=a()("taro-text",{"taro-text__selectable":i},e);return o.l.createElement("span",c({},Object(r.a)(this.props,["selectable","className"]),{"className":s}),this.props.children)}}]),Text}();e.a=u},"845":function(t,e,n){},"975":function(t,e,n){"use strict";n.r(e);var o,r=n(3),i=n(4),a=n(905),c=n(904),s=n(475),u=n(458),p=(n(845),function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}()),l=function get(t,e,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,e);if(void 0===o){var r=Object.getPrototypeOf(t);return null===r?void 0:get(r,e,n)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(n):void 0};e.default=Object(u.c)(o=Object(u.a)(o=function(t){function BrandList(t){!function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,BrandList);var e=function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(BrandList.__proto__||Object.getPrototypeOf(BrandList)).call(this,t));return e.changeIntroductionView=function(t){var n=e.state.list;n.map(function(e){e.id===t&&(e.max_height=120===e.max_height?0:120)}),e.setState({"list":n})},e.reservate=function(t){i.a.navigateTo({"url":"/marketing/pages/reservation/brand-detail?id=1"})},e.state={"list":[{"id":1,"name":"讽德诵功的国际化刚刚好复健科低功耗的看过的看过后的看法更好地将更好地积分开个会12"},{"id":2,"name":"讽德诵功的国际化刚刚好复健科低功耗的看过的看过后的看法更好地将更好地积分开个会123"},{"id":3,"name":"讽德诵功的国际化刚刚好复健科低功耗的看过的看过后的看法更好地将更好地积分开个会213"}]},e}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(BrandList,i["a"].Component),p(BrandList,[{"key":"componentDidMount","value":function componentDidMount(){this.fetch()}},{"key":"fetch","value":function(){var t=function _asyncToGenerator(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function step(o,r){try{var i=e[o](r),a=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(a).then(function(t){step("next",t)},function(t){step("throw",t)});t(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var t;return regeneratorRuntime.wrap(function _callee$(e){for(;;)switch(e.prev=e.next){case 0:(t=this.state.list).map(function(t){t.max_height=0}),this.setState({"list":t});case 3:case"end":return e.stop()}},_callee,this)}));return function fetch(){return t.apply(this,arguments)}}()},{"key":"render","value":function render(){var t=this,e=this.state.list;return console.log(e,64),r.l.createElement(a.a,{"className":"brand-list"},e.map(function(e,n){return r.l.createElement(a.a,{"className":"brand-item"},r.l.createElement(a.a,{"className":"brand-item__title","key":n,"onClick":t.changeIntroductionView.bind(t,e.id)},r.l.createElement(c.a,{"mode":"widthFix","src":"/assets/imgs/pay_fail.png","className":"brand-item__title_img"})),r.l.createElement(s.a,{"className":"brand-item__btn","onClick":t.reservate.bind(t,1)},"立即预约"),r.l.createElement(a.a,{"className":"brand-item__introduction","style":"max-height: "+e.max_height+"px;","onClick":t.showIntroduction.bind(t,n)},e.name))}))}},{"key":"componentDidShow","value":function componentDidShow(){l(BrandList.prototype.__proto__||Object.getPrototypeOf(BrandList.prototype),"componentDidShow",this)&&l(BrandList.prototype.__proto__||Object.getPrototypeOf(BrandList.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){l(BrandList.prototype.__proto__||Object.getPrototypeOf(BrandList.prototype),"componentDidHide",this)&&l(BrandList.prototype.__proto__||Object.getPrototypeOf(BrandList.prototype),"componentDidHide",this).call(this)}}]),BrandList}())||o)||o}}]);