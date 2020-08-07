(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"477":function(e,t,n){var o=n(478);"string"==typeof o&&(o=[[e.i,o,""]]);var r={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(o,r);o.locals&&(e.exports=o.locals)},"478":function(e,t,n){(e.exports=n(366)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\nbutton {\n  position: relative;\n  display: block;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #F8F8F8;\n}\n\nbutton[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\n\nbutton[plain][disabled] {\n  color: rgba(0, 0, 0, 0.3);\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background-color: #F7F7F7;\n}\n\nbutton[type=primary] {\n  color: #FFFFFF;\n  background-color: #1AAD19;\n}\n\nbutton[type=primary][plain] {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n  background-color: transparent;\n}\n\nbutton[type=primary][plain][disabled] {\n  color: rgba(0, 0, 0, 0.3);\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  background-color: #F7F7F7;\n}",""])},"545":function(e,t,n){"use strict";n(364);var o=n(3),r=n(365),a=n(50),i=n.n(a),s=(n(477),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),l=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}var c=function(e){function Button(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Button);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));return e.state={"hover":!1,"touch":!1},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Button,o["l"].Component),l(Button,[{"key":"componentWillUnmount","value":function componentWillUnmount(){this.startTimer&&clearTimeout(this.startTimer),this.endTimer&&clearTimeout(this.endTimer)}},{"key":"render","value":function render(){var e,t=this,n=this.props,a=n.children,l=n.disabled,c=n.className,u=n.style,p=n.onClick,m=n.onTouchStart,d=n.onTouchEnd,h=n.hoverClass,f=void 0===h?"button-hover":h,b=n.hoverStartTime,_=void 0===b?20:b,y=n.hoverStayTime,g=void 0===y?70:y,v=n.size,E=n.plain,w=n.loading,N=void 0!==w&&w,O=n.type,x=void 0===O?"default":O,k=c||i()("weui-btn",(_defineProperty(e={},""+f,this.state.hover&&!l&&"none"!==f),_defineProperty(e,"weui-btn_plain-"+x,E),_defineProperty(e,"weui-btn_"+x,!E&&x),_defineProperty(e,"weui-btn_mini","mini"===v),_defineProperty(e,"weui-btn_loading",N),_defineProperty(e,"weui-btn_disabled",l),e));return o.l.createElement("button",s({},Object(r.a)(this.props,["hoverClass","onTouchStart","onTouchEnd"]),{"className":k,"style":u,"onClick":p,"disabled":l,"onTouchStart":function _onTouchStart(e){t.setState(function(){return{"touch":!0}}),f&&"none"!==f&&!l&&(t.startTimer=setTimeout(function(){t.state.touch&&t.setState(function(){return{"hover":!0}})},_)),m&&m(e)},"onTouchEnd":function _onTouchEnd(e){t.setState(function(){return{"touch":!1}}),f&&"none"!==f&&!l&&(t.endTimer=setTimeout(function(){t.state.touch||t.setState(function(){return{"hover":!1}})},g)),d&&d(e)}}),N&&o.l.createElement("i",{"class":"weui-loading"}),a)}}]),Button}();t.a=c},"557":function(e,t,n){"use strict";n.d(t,"a",function(){return setNavigationBarColor});n(2);function setNavigationBarColor(e){var t=document.createElement("meta");t.setAttribute("name","theme-color"),t.setAttribute("content",e.backgroundColor),document.head.appendChild(t)}},"807":function(e,t,n){},"959":function(e,t,n){"use strict";n.r(t);var o,r=n(3),a=n(4),i=n(557),s=n(359),l=n(5),c=n(905),u=n(904),p=n(475),m=n(1003),d=n(545),h=n(51),f=n(9),b=n(15),_=(n(807),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),y=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),g=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0};t.default=Object(h.b)(function(e){return{"colors":e.colors.current}})(o=function(e){function DistributionDashboard(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,DistributionDashboard);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(DistributionDashboard.__proto__||Object.getPrototypeOf(DistributionDashboard)).call(this,e));return t.handleClick=function(){var e=t.state.info,n=e.isOpenShop,o=e.shop_status;a.a.navigateTo({"url":"/marketing/pages/distribution/qrcode?isOpenShop="+n+"&status="+(1===o)})},t.state={"info":{}},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(DistributionDashboard,a["a"].Component),y(DistributionDashboard,[{"key":"componentDidMount","value":function componentDidMount(){var e=this.props.colors;Object(i.a)({"frontColor":"#ffffff","backgroundColor":e.data[0].marketing}),this.fetch()}},{"key":"handleOpenApply","value":function handleOpenApply(){var e=this;Object(s.d)({"title":"申请开店","content":"是否申请开启小店推广","cancelText":"取消","confirmText":"确定"}).then(function(t){t.confirm&&f.a.distribution.update({"shop_status":2}).then(function(t){t.status&&Object(s.e)({"title":"申请成功等待审核","icon":"success","duration":2e3}).then(function(t){return e.fetch()})})})}},{"key":"onShareAppMessage","value":function onShareAppMessage(){var e=wx.getExtConfigSync?wx.getExtConfigSync():{},t=Object(l.b)("userinfo"),n=(t.username,t.userId),o=this.state.info;return{"title":e.wxa_name,"imageUrl":o.shop_pic,"path":"/pages/index?uid="+n}}},{"key":"fetch","value":function(){var e=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(o,r){try{var a=t[o](r),i=a.value}catch(e){return void n(e)}if(!a.done)return Promise.resolve(i).then(function(e){step("next",e)},function(e){step("throw",e)});e(i)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,t,n,o,r,a,i,s;return regeneratorRuntime.wrap(function _callee$(c){for(;;)switch(c.prev=c.next){case 0:return e=Object(l.b)("userinfo"),t=e.username,n=e.avatar,c.next=4,f.a.distribution.dashboard();case 4:return o=c.sent,r=Object(b.q)(o,{"itemTotalPrice":"itemTotalPrice","cashWithdrawalRebate":"cashWithdrawalRebate","promoter_order_count":"promoter_order_count","promoter_grade_order_count":"promoter_grade_order_count","rebateTotal":"rebateTotal","isbuy_promoter":"isbuy_promoter","notbuy_promoter":"notbuy_promoter","taskBrokerageItemTotalFee":"taskBrokerageItemTotalFee"}),c.next=8,f.a.distribution.info();case 8:a=c.sent,i=Object(b.q)(a,{"shop_name":"shop_name","shop_pic":"shop_pic","is_open_promoter_grade":"is_open_promoter_grade","promoter_grade_name":"promoter_grade_name","isOpenShop":"isOpenShop","shop_status":"shop_status","reason":"reason"}),s=_({"username":t,"avatar":n},r,i),this.setState({"info":s});case 12:case"end":return c.stop()}},_callee,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=this.props.colors,t=this.state.info;return r.l.createElement(c.a,{"class":"page-distribution-index"},r.l.createElement(c.a,{"className":"header","style":"background: "+e.data[0].marketing},r.l.createElement(c.a,{"className":"view-flex view-flex-middle"},r.l.createElement(u.a,{"className":"header-avatar","src":t.avatar,"mode":"aspectFill"}),r.l.createElement(c.a,{"className":"header-info view-flex-item"},t.username,t.is_open_promoter_grade&&r.l.createElement(p.a,null,"（",t.promoter_grade_name,"）")),r.l.createElement(m.a,{"className":"view-flex view-flex-middle","url":"/marketing/pages/distribution/setting"},r.l.createElement(p.a,{"className":"icon-info"}))),"true"===t.isOpenShop&&0===t.shop_status?r.l.createElement(c.a,{"className":"mini-store-apply","onClick":this.handleOpenApply.bind(this)},"申请开启我的小店"):null,"true"===t.isOpenShop&&4===t.shop_status?r.l.createElement(c.a,null,r.l.createElement(c.a,{"className":"mini-store-apply","onClick":this.handleOpenApply.bind(this)},"审核驳回，再次申请开启小店"),r.l.createElement(c.a,{"className":"mini-store-reason"},"驳回理由：",t.reason)):null,"true"===t.isOpenShop&&2===t.shop_status&&r.l.createElement(c.a,{"className":"mini-store-apply"},"申请开店审核中")),r.l.createElement(c.a,{"className":"section achievement"},r.l.createElement(c.a,{"className":"section-body view-flex"},r.l.createElement(c.a,{"className":"view-flex-item content-center"},r.l.createElement(c.a,{"className":"amount"},r.l.createElement(p.a,{"className":"count"},t.itemTotalPrice/100),"元"),r.l.createElement(c.a,null,"营业额")),r.l.createElement(c.a,{"className":"view-flex-item content-center"},r.l.createElement(c.a,{"className":"amount"},r.l.createElement(p.a,{"className":"count"},t.cashWithdrawalRebate/100),"元"),r.l.createElement(c.a,null,"可提现")))),r.l.createElement(c.a,{"className":"section analysis"},r.l.createElement(c.a,{"className":"section-body view-flex content-center"},r.l.createElement(m.a,{"className":"view-flex-item","hover-class":"none","url":"/marketing/pages/distribution/trade?type=order"},r.l.createElement(c.a,{"className":"icon-list3"}),r.l.createElement(c.a,{"className":"label"},"提成订单"),r.l.createElement(c.a,null,t.promoter_order_count)),r.l.createElement(m.a,{"className":"view-flex-item","hover-class":"none","url":"/marketing/pages/distribution/trade?type=order_team"},r.l.createElement(c.a,{"className":"icon-list2"}),r.l.createElement(c.a,{"className":"label"},"津贴订单"),r.l.createElement(c.a,null,t.promoter_grade_order_count)),r.l.createElement(m.a,{"className":"view-flex-item","hover-class":"none","url":"/marketing/pages/distribution/statistics"},r.l.createElement(c.a,{"className":"icon-money"}),r.l.createElement(c.a,{"className":"label"},"推广费"),r.l.createElement(c.a,{"className":"mark"},t.rebateTotal/100)))),r.l.createElement(c.a,{"className":"section"},r.l.createElement(m.a,{"className":"section-title with-border view-flex view-flex-middle","url":"/marketing/pages/distribution/subordinate?hasBuy="+t.isbuy_promoter+"&noBuy="+t.notbuy_promoter},r.l.createElement(c.a,{"className":"view-flex-item"},"我的会员"),r.l.createElement(c.a,{"className":"section-more icon-arrowRight"})),r.l.createElement(c.a,{"className":"content-padded-b view-flex content-center member"},r.l.createElement(c.a,{"className":"view-flex-item"},"已购买会员 ",r.l.createElement(p.a,{"className":"mark"},t.isbuy_promoter)," 人"),r.l.createElement(c.a,{"className":"view-flex-item"},"未购买会员 ",r.l.createElement(p.a,{"className":"mark"},t.notbuy_promoter)," 人"))),r.l.createElement(c.a,{"className":"section list share"},r.l.createElement(c.a,{"className":"list-item","onClick":this.handleClick},r.l.createElement(c.a,{"className":"item-icon icon-qrcode1"}),r.l.createElement(c.a,{"className":"list-item-txt"},"我的二维码"),r.l.createElement(c.a,{"className":"icon-arrowRight item-icon-go"})),r.l.createElement(m.a,{"className":"list-item","open-type":"navigateTo","url":"/marketing/pages/distribution/goods?status="+("true"===t.isOpenShop&&1===t.shop_status)},r.l.createElement(c.a,{"className":"item-icon icon-weChart"}),r.l.createElement(c.a,{"className":"list-item-txt"},"推广商品"),r.l.createElement(c.a,{"className":"icon-arrowRight item-icon-go"})),"true"===t.isOpenShop&&1===t.shop_status&&r.l.createElement(m.a,{"className":"list-item","open-type":"navigateTo","url":"/marketing/pages/distribution/shop?turnover="+t.taskBrokerageItemTotalFee},r.l.createElement(c.a,{"className":"item-icon icon-shop"}),r.l.createElement(c.a,{"className":"list-item-txt"},"我的小店"),r.l.createElement(c.a,{"className":"icon-arrowRight item-icon-go"})),1!==t.shop_status&&r.l.createElement(d.a,{"className":"share-btn list-item","open-type":"share"},r.l.createElement(c.a,{"className":"item-icon icon-share1"}),r.l.createElement(c.a,{"className":"list-item-txt"},"分享给好友"),r.l.createElement(c.a,{"className":"icon-arrowRight item-icon-go"}))))}},{"key":"componentDidShow","value":function componentDidShow(){g(DistributionDashboard.prototype.__proto__||Object.getPrototypeOf(DistributionDashboard.prototype),"componentDidShow",this)&&g(DistributionDashboard.prototype.__proto__||Object.getPrototypeOf(DistributionDashboard.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){g(DistributionDashboard.prototype.__proto__||Object.getPrototypeOf(DistributionDashboard.prototype),"componentDidHide",this)&&g(DistributionDashboard.prototype.__proto__||Object.getPrototypeOf(DistributionDashboard.prototype),"componentDidHide",this).call(this)}}]),DistributionDashboard}())||o}}]);