(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{"824":function(t,e,n){},"967":function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return p});var o=n(3),i=n(4),a=n(906),r=n(546),c=n(532),u=n(9),s=(n(824),function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}()),l=function get(t,e,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,e);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:get(i,e,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0};function _asyncToGenerator(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function step(o,i){try{var a=e[o](i),r=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(r).then(function(t){step("next",t)},function(t){step("throw",t)});t(r)}("next")})}}var p=function(t){function DistributionWithdrawalsAcount(t){var e=this;!function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,DistributionWithdrawalsAcount);var n=function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(DistributionWithdrawalsAcount.__proto__||Object.getPrototypeOf(DistributionWithdrawalsAcount)).call(this,t));return n.handleChange=function(t,e){n.setState(function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):t[e]=n,t}({},t,e))},n.handleClick=function(){n.setState({"isEdit":!0})},n.handleSubmit=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var t,o,a,r,c,s,l,p,h;return regeneratorRuntime.wrap(function _callee$(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state,o=t.name,a=t.acount,t.new_acount,t.hasBind,t.isEdit,r={"alipay_name":o,"alipay_account":a},e.next=4,u.a.distribution.update(r);case 4:c=e.sent,s=c.list,l=s[0],p=l.alipay_name,h=l.alipay_account,n.setState({"name":p,"acount":h,"new_acount":"","isEdit":!1}),i.a.navigateBack();case 9:case"end":return e.stop()}},_callee,e)})),n.state={"acount":"","name":"","new_acount":"","hasBind":!1,"isEdit":!1},n}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(DistributionWithdrawalsAcount,i["a"].Component),s(DistributionWithdrawalsAcount,[{"key":"componentDidMount","value":function componentDidMount(){this.fetch()}},{"key":"fetch","value":function(){var t=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(){var t,e,n;return regeneratorRuntime.wrap(function _callee2$(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,u.a.distribution.info();case 2:t=o.sent,e=t.alipay_name,n=t.alipay_account,this.setState({"name":e,"acount":n,"hasBind":!!e&&!!n});case 6:case"end":return o.stop()}},_callee2,this)}));return function fetch(){return t.apply(this,arguments)}}()},{"key":"render","value":function render(){var t=this.state,e=t.name,n=t.acount;t.isEdit,t.hasBind;return o.l.createElement(a.a,{"className":"page-distribution-acount"},o.l.createElement(a.a,{"className":"section list message"},o.l.createElement(c.a,{"className":"message-input","title":"开户人姓名：","type":"text","maxLength":"30","onChange":this.handleChange.bind(this,"name"),"value":e,"placeholder":"请输入开户人姓名"}),o.l.createElement(c.a,{"className":"message-input","title":"支付宝账号","type":"text","maxLength":"30","onChange":this.handleChange.bind(this,"acount"),"value":n,"placeholder":"请输入账号"})),o.l.createElement(a.a,{"className":"content-padded"},o.l.createElement(r.a,{"type":"primary","onClick":this.handleSubmit},"确认绑定")),o.l.createElement(a.a,{"className":"g-ul"},o.l.createElement(a.a,{"className":"g-ul-li"},"请务必准确填写开户人姓名和支付宝账号")))}},{"key":"componentDidShow","value":function componentDidShow(){l(DistributionWithdrawalsAcount.prototype.__proto__||Object.getPrototypeOf(DistributionWithdrawalsAcount.prototype),"componentDidShow",this)&&l(DistributionWithdrawalsAcount.prototype.__proto__||Object.getPrototypeOf(DistributionWithdrawalsAcount.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){l(DistributionWithdrawalsAcount.prototype.__proto__||Object.getPrototypeOf(DistributionWithdrawalsAcount.prototype),"componentDidHide",this)&&l(DistributionWithdrawalsAcount.prototype.__proto__||Object.getPrototypeOf(DistributionWithdrawalsAcount.prototype),"componentDidHide",this).call(this)}}]),DistributionWithdrawalsAcount}()}}]);