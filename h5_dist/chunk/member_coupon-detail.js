(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{"369":function(e,t,n){"use strict";n.d(t,"a",function(){return p});var o,r,a=n(3),i=n(4),s=n(473),c=n(5),l=n(905),u=(n(378),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}());var p=(r=o=function(e){function NavGap(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,NavGap);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(NavGap.__proto__||Object.getPrototypeOf(NavGap)).call(this,e));return t.handleIconClick=function(){console.log("kakakakk"),i.a.navigateBack()},t.props=e,t.state={"showIcon":!1,"navBar":0},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(NavGap,i["a"].Component),u(NavGap,[{"key":"componentDidMount","value":function componentDidMount(){var e=i.a.getCurrentPages(),t=null;try{t=Object(s.b)(),this.setState({"navBar":t.statusBarHeight})}catch(e){console.log(e)}this.setState({"showIcon":!/(index|category\/index|recommend\/list|cart\/espier-index|member\/index)(.)*/.test(e[e.length-1].route)})}},{"key":"render","value":function render(){var e=this.props,t=e.title,n=(e.home,this.state.showIcon),o=Object(c.b)("top");return a.l.createElement(l.a,{"className":"nav-gap-container","style":{"background":this.props.bg?this.props.bg:"","color":this.props.cl?this.props.cl:"black"}},a.l.createElement(l.a,{"className":"iconfont icon-arrow-left","onClick":this.handleIconClick.bind(this),"style":{"top":o+"px","display":n?"block":"none"}}),a.l.createElement(l.a,{"style":{"top":o+"px"},"className":"gap-title"},t))}}]),NavGap}(),o.options={"addGlobalClass":!0},r)},"378":function(e,t,n){},"380":function(e,t,n){var o=n(381);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(o,r);o.locals&&(e.exports=o.locals)},"381":function(e,t,n){(e.exports=n(366)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\ninput {\n  display: block;\n  height: 24px;\n  text-align: inherit;\n  text-overflow: clip;\n  overflow: hidden;\n  white-space: nowrap;\n}",""])},"459":function(e,t,n){"use strict";n(364);var o=n(3),r=n(365),a=n(50),i=n.n(a),s=(n(380),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),c=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function getTrueType(e,t,n){if(!e)throw new Error("unexpected type");return"search"===t&&(e="search"),n&&(e="password"),"digit"===e&&(e="number"),e}var l=function(e){function Input(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Input);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Input.__proto__||Object.getPrototypeOf(Input)).apply(this,arguments));return e.onInput=e.onInput.bind(e),e.onFocus=e.onFocus.bind(e),e.onBlur=e.onBlur.bind(e),e.onKeyDown=e.onKeyDown.bind(e),e.handleComposition=e.handleComposition.bind(e),e.isOnComposition=!1,e.onInputExcuted=!1,e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Input,o["l"].Component),c(Input,[{"key":"componentDidMount","value":function componentDidMount(){"file"===this.props.type&&this.inputRef.addEventListener("change",this.onInput)}},{"key":"componentWillUnmount","value":function componentWillUnmount(){"file"===this.props.type&&this.inputRef.removeEventListener("change",this.onInput)}},{"key":"onInput","value":function onInput(e){var t=this.props,n=t.type,o=t.maxLength,r=t.confirmType,a=t.password,i=t.onInput,onInput=void 0===i?"":i,s=t.onChange,c=void 0===s?"":s;if(!this.isOnComposition&&!this.onInputExcuted){var l=e.target.value,u=getTrueType(n,r,a);if(this.onInputExcuted=!0,"number"===u&&l&&o<=l.length&&(l=l.substring(0,o),e.target.value=l),Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":l}}),!(["number","file"].indexOf(u)>=0)){var p=e.target.selectionEnd;setTimeout(function(){e.target.selectionStart=p,e.target.selectionEnd=p})}if(c)return c(e);if(onInput)return onInput(e)}}},{"key":"onFocus","value":function onFocus(e){var onFocus=this.props.onFocus;this.onInputExcuted=!1,Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),onFocus&&onFocus(e)}},{"key":"onBlur","value":function onBlur(e){var onBlur=this.props.onBlur;Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),onBlur&&onBlur(e)}},{"key":"onKeyDown","value":function onKeyDown(e){var t=this.props,n=t.onConfirm,onKeyDown=t.onKeyDown;this.onInputExcuted=!1,onKeyDown&&onKeyDown(e),13===e.keyCode&&n&&(Object.defineProperty(e,"detail",{"enumerable":!0,"value":{"value":e.target.value}}),n(e))}},{"key":"handleComposition","value":function handleComposition(e){e.target instanceof HTMLInputElement&&("compositionend"===e.type?(this.isOnComposition=!1,this.onInputExcuted=!1,this.onInput(e)):this.isOnComposition=!0)}},{"key":"render","value":function render(){var e=this,t=this.props,n=t.className,a=void 0===n?"":n,c=t.placeholder,l=t.type,u=void 0===l?"text":l,p=t.password,d=t.disabled,h=t.maxLength,f=t.confirmType,m=void 0===f?"":f,v=t.focus,y=void 0!==v&&v,b=t.value,g=i()("weui-input",a),w=Object(r.a)(this.props,["className","placeholder","disabled","max","onChange","onFocus","onBlur","type","focus"]);return"value"in this.props&&(w.value=function fixControlledValue(e){return void 0===e||null===e?"":e}(b)),o.l.createElement("input",s({"ref":function ref(t){e.inputRef=t}},w,{"className":g,"placeholder":c,"disabled":d,"maxlength":h,"onInput":this.onInput,"onFocus":this.onFocus,"onBlur":this.onBlur,"autofocus":y,"onKeyDown":this.onKeyDown,"type":getTrueType(u,m,p),"onCompositionStart":this.handleComposition,"onCompositionEnd":this.handleComposition}))}}]),Input}();l.defaultProps={"type":"text"},t.a=l},"743":function(e,t,n){},"930":function(e,t,n){"use strict";n.r(t);var o,r=n(3),a=n(359),i=n(4),s=n(905),c=n(904),l=n(459),u=n(51),p=n(9),d=n(369),h=(n(743),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),f=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0};function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(o,r){try{var a=t[o](r),i=a.value}catch(e){return void n(e)}if(!a.done)return Promise.resolve(i).then(function(e){step("next",e)},function(e){step("throw",e)});e(i)}("next")})}}t.default=Object(u.b)(function(e){return{"colors":e.colors.current}})(o=function(e){function CouponDetail(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CouponDetail);var n=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(CouponDetail.__proto__||Object.getPrototypeOf(CouponDetail)).call(this,e));return n.chooseStore=function(){var e=n.state.storeDialogShow;n.setState({"storeDialogShow":!e})},n.storeTap=function(e,t){console.log("pppppppppppppp"),console.log(e),n.setState({"curindex":t,"curStore":e.companyName,"curBranchStore":e.storeName,"storeDialogShow":!1,"params":{"shop_id":e.wxShopId}})},n.handletouchtart=function(e){console.log(e),n.setState({"beginX":e.touches[0].pageX,"beginY":e.touches[0].pageY})},n.handletouchmove=function(e){n.setState({"lastX":e.touches[0].pageX,"lastY":e.touches[0].pageY})},n.handletouchend=function(e){var o=n.state,r=o.lastX,i=o.beginX,s=o.showCodeInput,c=o.params;if(!(r<i)){if(s&&!c.verify_code)return Object(a.d)({"title":"提示","content":"请输入验证码"}),!1;c.consume_outer_str="用户自助核销",n.setState({"params":c},_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var e;return regeneratorRuntime.wrap(function _callee$(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.a.member.userUsedCard(c);case 2:if(!(e=t.sent).error){t.next=8;break}return Object(a.d)({"title":"提示","content":e.error.message}),t.abrupt("return",!1);case 8:n.setState({"show":!1});case 9:case"end":return t.stop()}},_callee,t)})))}},n.inputBlur=function(e){var t=n.state.params;t.verify_code=e.detail.value,n.setState({"params":t})},n.handleClickTab=function(e){n.state.page.isLoading||(e!==n.state.curTabIdx&&(n.resetPage(),n.setState({"list":[]})),n.setState({"curTabIdx":e},function(){n.nextPage()}))},n.state={"curStore":"","curBranchStore":"","code":"","curindex":0,"storeDialogShow":!1,"show":!0,"beginX":0,"beginY":0,"lastX":0,"lastY":0,"storeList":[],"params":{"code":"","card_id":"","shop_id":"","verify_code":"","remark_amount":"","consume_outer_str":""},"cardCode":{},"cardDetail":{},"cardInfo":{},"showCodeInput":!1},n}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(CouponDetail,i["a"].Component),h(CouponDetail,[{"key":"componentDidMount","value":function componentDidMount(){this.fetch()}},{"key":"fetch","value":function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(){var e,t,n,o,r,a,i,s,c;return regeneratorRuntime.wrap(function _callee2$(l){for(;;)switch(l.prev=l.next){case 0:return e=this.$router.params,t=e.card_id,n=e.code,console.log(this.$router.params),o={"card_id":t,"code":n},l.next=5,p.a.member.getCardDetail(o);case 5:if(r=l.sent,a=r.detail,i=r.card_code,s=r.card_info,c=r.shop_list,2==a.status&&this.setState({"show":!1}),c.list.length){l.next=13;break}return l.abrupt("return");case 13:o.shop_id=c.list[0].wxShopId,this.setState({"cardCode":i,"cardInfo":s,"storeList":c.list,"curStore":c.list[0].companyName,"curBranchStore":c.list[0].storeName,"params":o}),s&&"SELF"==s.use_scenes&&s.self_consume_code>0&&this.setState({"showCodeInput":!0});case 16:case"end":return l.stop()}},_callee2,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=this,t=this.props.colors,n=this.state,o=n.cardInfo,a=n.curStore,i=n.curBranchStore,u=n.showCodeInput,p=n.curindex,h=n.show;return r.l.createElement(s.a,null,r.l.createElement(d.a,{"title":"优惠券详情"}),r.l.createElement(s.a,null,0===this.state.storeList.length&&r.l.createElement("view",null,"暂时没有商店"),o.use_scenes&&r.l.createElement(s.a,{"className":"page-coupon-detail","style":"background: "+t.data[0].marketing},"SELF"!==o.use_scenes&&"SWEEP"!==o.use_scenes&&r.l.createElement(s.a,{"className":"sweep-coupon-box"},r.l.createElement(s.a,{"className":"content-padded card-header"},r.l.createElement(s.a,{"className":"qrcode"},r.l.createElement(s.a,{"className":"qrcode-num"},"该卡券不适用线下消费")))),"SELF"==o.use_scenes&&r.l.createElement(s.a,{"className":"store-box"},r.l.createElement(s.a,{"className":"view-flex","onClick":this.chooseStore.bind(this)},r.l.createElement(s.a,{"className":"view-flex-item"},"选择门店"),r.l.createElement(s.a,{"className":"view-flex-item content-right cur-store"},i,r.l.createElement(s.a,{"className":"arrow-right {{storeDialogShow ? 'down' : ''}}"}))),r.l.createElement(s.a,{"className":"store-list "+(storeDialogShow?"act":"")},storeList.map(function(t,n){return r.l.createElement(s.a,{"className":"store-item "+(p===n?"cur":""),"onClick":e.storeTap.bind(e,t,n)},r.l.createElement(s.a,{"className":"content-padded"},t.companyName," (",t.storeName,")"))}))),"SWEEP"==o.use_scenes&&r.l.createElement(s.a,{"className":"sweep-coupon-box"},r.l.createElement(s.a,{"className":"content-padded card-header"},r.l.createElement(s.a,{"className":"qrcode"},r.l.createElement(c.a,{"className":"qrcode-img","src":cardCode.qrcode_url,"mode":"aspectFill"}),r.l.createElement(s.a,{"className":"qrcode-num"},cardCode.code)))),"SELF"==o.use_scenes&&r.l.createElement(s.a,{"className":"coupon-box"},r.l.createElement(s.a,{"className":"content-padded card-header","style":"background: radial-gradient(circle at bottom, transparent 3px, "+t.data[0].primary+" 3px); background-size: 20rpx 100%;"},r.l.createElement(s.a,{"className":"hr"},r.l.createElement(s.a,{"className":"card-title"},"商户名称"),r.l.createElement(s.a,{"className":"card-val"},a)),r.l.createElement(s.a,{"className":"hr"},r.l.createElement(s.a,{"className":"card-title"},"分店名称"),r.l.createElement(s.a,{"className":"card-val"},i)),u&&r.l.createElement(s.a,null,r.l.createElement(s.a,{"className":"card-title"},"验证码"),r.l.createElement(s.a,{"className":"card-val"},r.l.createElement(l.a,{"type":"number","focus":!0,"onInput":this.inputBlur.bind(this),"placeholder":"请输入验证码","maxlength":"4","confirm-type":"done"}))),r.l.createElement(s.a,{"className":"icon-used use-icon "+(h?"":"show")}),r.l.createElement(s.a,{"className":"card-decorate"})),r.l.createElement(s.a,{"className":"content-padded card-footer "+(h?"":"act"),"onTouchStart":this.handletouchtart.bind(this),"onTouchMove":this.handletouchmove.bind(this),"onTouchEnd":this.handletouchend.bind(this)},r.l.createElement(s.a,{"className":"gray remind-txt"},"划开副券确认使用"),r.l.createElement(s.a,{"className":"view-flex"},r.l.createElement(s.a,{"className":"view-flex-item red"},"仅限商户操作"),r.l.createElement(s.a,{"className":"view-flex-item content-right"},r.l.createElement(c.a,{"src":"../images/code.png"}))))))))}},{"key":"componentDidShow","value":function componentDidShow(){f(CouponDetail.prototype.__proto__||Object.getPrototypeOf(CouponDetail.prototype),"componentDidShow",this)&&f(CouponDetail.prototype.__proto__||Object.getPrototypeOf(CouponDetail.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){f(CouponDetail.prototype.__proto__||Object.getPrototypeOf(CouponDetail.prototype),"componentDidHide",this)&&f(CouponDetail.prototype.__proto__||Object.getPrototypeOf(CouponDetail.prototype),"componentDidHide",this).call(this)}}]),CouponDetail}())||o}}]);