(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{"833":function(e,t,n){},"969":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return b});var r=n(3),o=n(4),i=n(552),a=n(905),s=n(533),c=n(465),u=n(559),l=n(481),p=n(17),f=n(9),h=n(1),m=(n(833),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),d=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,n)}if("value"in r)return r.value;var i=r.get;return void 0!==i?i.call(n):void 0};function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(r,o){try{var i=t[r](o),a=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}("next")})}}var b=function(e){function DistributionShopForm(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,DistributionShopForm);var n,r=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(DistributionShopForm.__proto__||Object.getPrototypeOf(DistributionShopForm)).call(this,e));return r.uploadURLFromRegionCode=function(e){var t=null;switch(e){case"z0":t="https://up.qiniup.com";break;case"z1":t="https://up-z1.qiniup.com";break;case"z2":t="https://up-z2.qiniup.com";break;case"na0":t="https://up-na0.qiniup.com";break;case"as0":t="https://up-as0.qiniup.com";break;default:console.error("please make the region is with one of [z0, z1, z2, na0, as0]")}return t},r.handleChange=function(e){var t=e.detail?e.detail.value:e,n=r.state.info,o=n.key;n.val;r.setState({"info":{"key":o,"val":t}})},r.handleSubmit=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var e,n,i,a,s;return regeneratorRuntime.wrap(function _callee$(t){for(;;)switch(t.prev=t.next){case 0:return e=r.state.info,n=e.key,i=e.val,a=_defineProperty({},n,i),t.next=4,f.a.distribution.update(a);case 4:s=t.sent,s.list[0]&&o.a.navigateBack();case 7:case"end":return t.stop()}},_callee,t)})),r.handleImageChange=(n=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(e,n){var o,a,s,c,u,l,f,m,d,b,y;return regeneratorRuntime.wrap(function _callee3$(v){for(;;)switch(v.prev=v.next){case 0:if(o=r.state.info.key,"remove"!==n){v.next=4;break}return r.setState({"imgs":e}),v.abrupt("return");case 4:for(e.length>1&&p.a.toast("最多上传1张图片"),a=e.slice(0,1),s=[],c=function _loop(e){var n,o=new Promise((n=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(n,o){var a,s,c,u,l,p,f;return regeneratorRuntime.wrap(function _callee2$(t){for(;;)switch(t.prev=t.next){case 0:if(e.file){t.next=4;break}n(e),t.next=14;break;case 4:return a=e.url.slice(e.url.lastIndexOf("/")+1),t.next=7,h.a.get("/espier/image_upload_token",{"filesystem":"qiniu","filetype":"aftersales","filename":a});case 7:s=t.sent,c=s.region,u=s.token,l=s.key,p=s.domain,f=r.uploadURLFromRegionCode(c),Object(i.a)({"url":f,"filePath":e.url,"name":"file","formData":{"token":u,"key":l},"success":function success(e){var t=JSON.parse(e.data);n({"url":p+"/"+t.key})},"fail":function fail(e){return o(e)}});case 14:case"end":return t.stop()}},_callee2,t)})),function(e,t){return n.apply(this,arguments)}));s.push(o)},u=!0,l=!1,f=void 0,v.prev=11,m=a[Symbol.iterator]();!(u=(d=m.next()).done);u=!0)b=d.value,c(b);v.next=19;break;case 15:v.prev=15,v.t0=v.catch(11),l=!0,f=v.t0;case 19:v.prev=19,v.prev=20,!u&&m.return&&m.return();case 22:if(v.prev=22,!l){v.next=25;break}throw f;case 25:return v.finish(22);case 26:return v.finish(19);case 27:return v.next=29,Promise.all(s);case 29:y=v.sent,r.setState({"imgs":y}),r.setState({"info":{"key":o,"val":y[0].url}});case 32:case"end":return v.stop()}},_callee3,t,[[11,15,19,27],[20,,22,26]])})),function(e,t){return n.apply(this,arguments)}),r.state={"info":{},"imgs":[]},r}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(DistributionShopForm,o["a"].Component),m(DistributionShopForm,[{"key":"componentDidMount","value":function componentDidMount(){this.state.imgs;var e=this.$router.params,t=e.key,n=e.val;this.setState({"info":{"key":t,"val":n}}),"shop_pic"===t&&n&&this.setState({"imgs":[{"url":n}]})}},{"key":"render","value":function render(){var e=this.state,t=e.info,n=e.imgs;return r.l.createElement(a.a,{"className":"page-distribution-shop-form"},r.l.createElement(a.a,{"className":"shop-form"},"shop_name"==t.key&&r.l.createElement(s.a,{"type":"text","title":"小店名称","value":t.val,"onChange":this.handleChange.bind(this)}),"brief"==t.key&&r.l.createElement(c.a,{"type":"textarea","title":"小店描述","value":t.val,"onChange":this.handleChange.bind(this)}),"shop_pic"==t.key&&r.l.createElement(a.a,{"className":"pic-upload__img"},r.l.createElement(Text,{"className":"pic-upload__text"},"上传店招"),r.l.createElement(a.a,{"className":"pic-upload__imgupload"},r.l.createElement(Text,{"className":"pic-upload__imgupload_text"},"图片建议尺寸：320*100"),r.l.createElement(u.a,{"mode":"aspectFill","count":1,"length":3,"files":n,"onChange":this.handleImageChange.bind(this)}," "))),r.l.createElement(a.a,{"className":"shop_pic-btn"},r.l.createElement(l.a,{"type":"primary","onClick":this.handleSubmit.bind(this)},"提交"))))}},{"key":"componentDidShow","value":function componentDidShow(){d(DistributionShopForm.prototype.__proto__||Object.getPrototypeOf(DistributionShopForm.prototype),"componentDidShow",this)&&d(DistributionShopForm.prototype.__proto__||Object.getPrototypeOf(DistributionShopForm.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){d(DistributionShopForm.prototype.__proto__||Object.getPrototypeOf(DistributionShopForm.prototype),"componentDidHide",this)&&d(DistributionShopForm.prototype.__proto__||Object.getPrototypeOf(DistributionShopForm.prototype),"componentDidHide",this).call(this)}}]),DistributionShopForm}()}}]);