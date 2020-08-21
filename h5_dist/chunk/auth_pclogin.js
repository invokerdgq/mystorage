(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"480":function(e,t,n){"use strict";var o=n(3),r=n(50),a=n.n(r),i=n(361),s=n.n(i),c=n(906),u=n(546),l=n(907),p=n(4),f=n(360),h=n(367),d=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();Object(h.c)();var b=function(e){function AtLoading(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtLoading),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtLoading.__proto__||Object.getPrototypeOf(AtLoading)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtLoading,f["a"]),d(AtLoading,[{"key":"render","value":function render(){var e=this.props,t=e.color,n=e.size,r="string"==typeof n?n:String(n),a={"width":n?""+p.a.pxTransform(parseInt(r)):"","height":n?""+p.a.pxTransform(parseInt(r)):""},i={"border":t?"1px solid "+t:"","border-color":t?t+" transparent transparent transparent":""},s=Object.assign({},i,a);return o.l.createElement(c.a,{"className":"at-loading","style":a},o.l.createElement(c.a,{"className":"at-loading__ring","style":s}),o.l.createElement(c.a,{"className":"at-loading__ring","style":s}),o.l.createElement(c.a,{"className":"at-loading__ring","style":s}))}}]),AtLoading}();b.defaultProps={"size":0,"color":""},b.propTypes={"size":s.a.oneOfType([s.a.string,s.a.number]),"color":s.a.oneOfType([s.a.string,s.a.number])},n.d(t,"a",function(){return _});var y=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}var m={"normal":"normal","small":"small"},g={"primary":"primary","secondary":"secondary"},_=function(e){function AtButton(e){!function button_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AtButton);var t=function button_possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AtButton.__proto__||Object.getPrototypeOf(AtButton)).call(this,e));return t.state={"isWEB":p.a.getEnv()===p.a.ENV_TYPE.WEB,"isWEAPP":p.a.getEnv()===p.a.ENV_TYPE.WEAPP,"isALIPAY":p.a.getEnv()===p.a.ENV_TYPE.ALIPAY},t}return function button_inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AtButton,f["a"]),y(AtButton,[{"key":"onClick","value":function onClick(e){this.props.disabled||this.props.onClick&&this.props.onClick(e)}},{"key":"onGetUserInfo","value":function onGetUserInfo(e){this.props.onGetUserInfo&&this.props.onGetUserInfo(e)}},{"key":"onContact","value":function onContact(e){this.props.onContact&&this.props.onContact(e)}},{"key":"onGetPhoneNumber","value":function onGetPhoneNumber(e){this.props.onGetPhoneNumber&&this.props.onGetPhoneNumber(e)}},{"key":"onError","value":function onError(e){this.props.onError&&this.props.onError(e)}},{"key":"onOpenSetting","value":function onOpenSetting(e){this.props.onOpenSetting&&this.props.onOpenSetting(e)}},{"key":"onSumit","value":function onSumit(e){(this.state.isWEAPP||this.state.isWEB)&&this.$scope.triggerEvent("submit",e.detail,{"bubbles":!0,"composed":!0})}},{"key":"onReset","value":function onReset(e){(this.state.isWEAPP||this.state.isWEB)&&this.$scope.triggerEvent("reset",e.detail,{"bubbles":!0,"composed":!0})}},{"key":"render","value":function render(){var e,t=this.props,n=t.size,r=void 0===n?"normal":n,i=t.type,s=void 0===i?"":i,p=t.circle,f=t.full,h=t.loading,d=t.disabled,y=t.customStyle,_=t.formType,P=t.openType,v=t.lang,E=t.sessionFrom,w=t.sendMessageTitle,O=t.sendMessagePath,k=t.sendMessageImg,C=t.showMessageCard,A=t.appParameter,x=this.state,S=x.isWEAPP,T=x.isALIPAY,j=x.isWEB,N=["at-button"],I=(_defineProperty(e={},"at-button--"+m[r],m[r]),_defineProperty(e,"at-button--disabled",d),_defineProperty(e,"at-button--"+s,g[s]),_defineProperty(e,"at-button--circle",p),_defineProperty(e,"at-button--full",f),e),G="primary"===s?"#fff":"",R="small"===r?"30":0,M=null;h&&(M=o.l.createElement(c.a,{"className":"at-button__icon"},o.l.createElement(b,{"color":G,"size":R})),N.push("at-button--icon"));var U=o.l.createElement(u.a,{"className":"at-button__wxbutton","lang":v,"formType":"submit"===_||"reset"===_?_:void 0}),L=o.l.createElement(u.a,{"className":"at-button__wxbutton","formType":_,"openType":P,"lang":v,"sessionFrom":E,"sendMessageTitle":w,"sendMessagePath":O,"sendMessageImg":k,"showMessageCard":C,"appParameter":A,"onGetUserInfo":this.onGetUserInfo.bind(this),"onGetPhoneNumber":this.onGetPhoneNumber.bind(this),"onOpenSetting":this.onOpenSetting.bind(this),"onError":this.onError.bind(this),"onContact":this.onContact.bind(this)});return o.l.createElement(c.a,{"className":a()(N,I,this.props.className),"style":y,"onClick":this.onClick.bind(this)},j&&!d&&U,S&&!d&&o.l.createElement(l.a,{"onSubmit":this.onSumit.bind(this),"onReset":this.onReset.bind(this)},L),T&&!d&&L,M,o.l.createElement(c.a,{"className":"at-button__text"},this.props.children))}}]),AtButton}();_.defaultProps={"size":"normal","type":void 0,"circle":!1,"full":!1,"loading":!1,"disabled":!1,"customStyle":{},"onClick":function onClick(){},"formType":void 0,"openType":void 0,"lang":"en","sessionFrom":"","sendMessageTitle":"","sendMessagePath":"","sendMessageImg":"","showMessageCard":!1,"appParameter":"","onGetUserInfo":function onGetUserInfo(){},"onContact":function onContact(){},"onGetPhoneNumber":function onGetPhoneNumber(){},"onError":function onError(){},"onOpenSetting":function onOpenSetting(){}},_.propTypes={"size":s.a.oneOf(["normal","small"]),"type":s.a.oneOf(["primary","secondary",""]),"circle":s.a.bool,"full":s.a.bool,"loading":s.a.bool,"disabled":s.a.bool,"onClick":s.a.func,"customStyle":s.a.oneOfType([s.a.object,s.a.string]),"formType":s.a.oneOf(["submit","reset",""]),"openType":s.a.oneOf(["contact","share","getUserInfo","getPhoneNumber","launchApp","openSetting","feedback","getRealnameAuthInfo","getAuthorize","contactShare",""]),"lang":s.a.string,"sessionFrom":s.a.string,"sendMessageTitle":s.a.string,"sendMessagePath":s.a.string,"sendMessageImg":s.a.string,"showMessageCard":s.a.bool,"appParameter":s.a.string,"onGetUserInfo":s.a.func,"onContact":s.a.func,"onGetPhoneNumber":s.a.func,"onError":s.a.func,"onOpenSetting":s.a.func}},"729":function(e,t,n){},"925":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return f});var o=n(3),r=n(357),a=n(4),i=n(906),s=n(474),c=n(480),u=n(9),l=(n(729),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),p=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0};function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(o,r){try{var a=t[o](r),i=a.value}catch(e){return void n(e)}if(!a.done)return Promise.resolve(i).then(function(e){step("next",e)},function(e){step("throw",e)});e(i)}("next")})}}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function parseUrlStr(e){var t=[];if(e)for(var n=0;n<e.split("&").length;n++)t[n]=e.split("&")[n];for(var o=[],r=0;r<t.length;r++){var a=t[r].split("=");o[a[0]]=decodeURI(a[1])}return o}var f=function(e){function PcAuth(){var e,t,n,o,i=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PcAuth);for(var s=arguments.length,c=Array(s),l=0;l<s;l++)c[l]=arguments[l];return t=n=_possibleConstructorReturn(this,(e=PcAuth.__proto__||Object.getPrototypeOf(PcAuth)).call.apply(e,[this].concat(c))),n.state={"checkStatus":!1},n.handleLogin=(o=_asyncToGenerator(regeneratorRuntime.mark(function _callee(e){var t,o,s,c;return regeneratorRuntime.wrap(function _callee$(i){for(;;)switch(i.prev=i.next){case 0:if(t=wx.getExtConfigSync?wx.getExtConfigSync():{},i.prev=1,1!=n.state.checkStatus){i.next=20;break}return i.next=5,Object(r.h)();case 5:return o=i.sent,s={"token":n.query.t,"status":e,"code":o.code,"appid":t.appid,"company_id":n.query.cid},i.prev=7,i.next=10,u.a.user.pclogin(s);case 10:(c=i.sent)&&a.a.redirectTo({"url":"/pages/index"}),console.log(c),i.next=18;break;case 15:i.prev=15,i.t0=i.catch(7),console.log(i.t0);case 18:i.next=21;break;case 20:a.a.redirectTo({"url":"/pages/auth/reg"});case 21:i.next=26;break;case 23:i.prev=23,i.t1=i.catch(1),console.log(i.t1);case 26:case"end":return i.stop()}},_callee,i,[[1,23],[7,15]])})),function(e){return o.apply(this,arguments)}),_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(PcAuth,a["a"].Component),l(PcAuth,[{"key":"componentDidMount","value":function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var e,t,n,o=this;return regeneratorRuntime.wrap(function _callee3$(a){for(;;)switch(a.prev=a.next){case 0:this.$router.params.scene&&(e=decodeURIComponent(this.$router.params.scene),t=decodeURIComponent(e),n=parseUrlStr(t),this.query=n),setTimeout(_asyncToGenerator(regeneratorRuntime.mark(function _callee2(){var e,t,n,a,i,s;return regeneratorRuntime.wrap(function _callee2$(c){for(;;)switch(c.prev=c.next){case 0:if(!o.query){c.next=12;break}return e=wx.getExtConfigSync?wx.getExtConfigSync():{},c.next=4,Object(r.h)();case 4:return t=c.sent,n=t.code,a={"code":n,"appid":e.appid,"token":o.query.t},c.next=9,u.a.user.checkpclogin(a);case 9:i=c.sent,s=i.status,o.setState({"checkStatus":s});case 12:case"end":return c.stop()}},_callee2,o)})),200);case 2:case"end":return a.stop()}},_callee3,this)}));return function componentDidMount(){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=wx.getExtConfigSync?wx.getExtConfigSync():{};return o.l.createElement(i.a,{"className":"page-wxauth"},o.l.createElement(i.a,{"className":"sec-auth"},o.l.createElement(i.a,{"className":"icon-pc icon-style"}),o.l.createElement(i.a,{"className":"auth-title"},e.wxa_name,"登录确认"),o.l.createElement(s.a,{"className":"auth-hint"},"请不要扫描来源不明的二维码"),o.l.createElement(i.a,{"className":"auth-btns"},o.l.createElement(c.a,{"type":"primary","onClick":this.handleLogin.bind(this,1)},"确认登录"),o.l.createElement(c.a,{"className":"back-btn","onClick":this.handleLogin.bind(this,0)},"取消登录"))))}},{"key":"componentDidShow","value":function componentDidShow(){p(PcAuth.prototype.__proto__||Object.getPrototypeOf(PcAuth.prototype),"componentDidShow",this)&&p(PcAuth.prototype.__proto__||Object.getPrototypeOf(PcAuth.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){p(PcAuth.prototype.__proto__||Object.getPrototypeOf(PcAuth.prototype),"componentDidHide",this)&&p(PcAuth.prototype.__proto__||Object.getPrototypeOf(PcAuth.prototype),"componentDidHide",this).call(this)}}]),PcAuth}()}}]);