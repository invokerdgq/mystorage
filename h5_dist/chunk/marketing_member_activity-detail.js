(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{"471":function(e,t,n){var r=n(472);"string"==typeof r&&(r=[[e.i,r,""]]);var o={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(367)(r,o);r.locals&&(e.exports=r.locals)},"472":function(e,t,n){(e.exports=n(366)(!1)).push([e.i,"/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n/*==============================\n=            colors            =\n==============================*/\n\n/*===============================\n=            z-index            =\n===============================*/\n\n.taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},"475":function(e,t,n){"use strict";n(364);var r=n(3),o=n(365),i=n(50),a=n.n(i),c=(n(471),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),s=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var l=function(e){function Text(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Text,r["l"].Component),s(Text,[{"key":"render","value":function render(){var e=this.props,t=e.className,n=e.selectable,i=void 0!==n&&n,s=a()("taro-text",{"taro-text__selectable":i},t);return r.l.createElement("span",c({},Object(o.a)(this.props,["selectable","className"]),{"className":s}),this.props.children)}}]),Text}();t.a=l},"859":function(e,t,n){},"981":function(e,t,n){"use strict";n.r(t);var r,o=n(3),i=n(4),a=n(905),c=n(475),s=n(51),l=n(9),u=n(15),p=(n(859),function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}()),f=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,n)}if("value"in r)return r.value;var i=r.get;return void 0!==i?i.call(n):void 0};t.default=Object(s.b)(function(e){return{"colors":e.colors.current}})(r=function(e){function ActivityDetail(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ActivityDetail);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(ActivityDetail.__proto__||Object.getPrototypeOf(ActivityDetail)).call(this,e));return t.handleback=function(){i.a.navigateBack()},t.state={"cur_activity_info":""},t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ActivityDetail,i["a"].Component),p(ActivityDetail,[{"key":"componentDidMount","value":function componentDidMount(){this.fetch()}},{"key":"fetch","value":function(){var e=function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function step(r,o){try{var i=t[r](o),a=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}("next")})}}(regeneratorRuntime.mark(function _callee(){var e,t,n;return regeneratorRuntime.wrap(function _callee$(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l.a.user.registrationRecordInfo({"record_id":this.$router.params.record_id});case 2:e=r.sent,t=e.content,n=[],t.map(function(e){e.formdata&&e.formdata.length>0&&e.formdata.map(function(e){Object(u.j)(e.answer)&&("checkbox"===e.form_element&&(e.answer=e.answer.join(",")),"area"===e.form_element&&(e.answer=e.answer.join(""))),n.push({"field_title":e.field_title,"answer":e.answer})})}),this.setState({"cur_activity_info":n});case 7:case"end":return r.stop()}},_callee,this)}));return function fetch(){return e.apply(this,arguments)}}()},{"key":"render","value":function render(){var e=this.props.colors,t=this.state.cur_activity_info;return o.l.createElement(a.a,{"className":"activity-detail"},o.l.createElement(a.a,{"className":"activity-detail__list"},t.map(function(e,t){return o.l.createElement(a.a,{"key":t,"className":"activity-detail__item"},o.l.createElement(c.a,{"className":"activity-detail__item_title"},e.field_title),o.l.createElement(c.a,{"className":"activity-detail__item_value"},e.answer))})),o.l.createElement(a.a,{"className":"activity-detail__btn","style":"background: "+e.data[0].primary,"onClick":this.handleback.bind(this)},"返回"))}},{"key":"componentDidShow","value":function componentDidShow(){f(ActivityDetail.prototype.__proto__||Object.getPrototypeOf(ActivityDetail.prototype),"componentDidShow",this)&&f(ActivityDetail.prototype.__proto__||Object.getPrototypeOf(ActivityDetail.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){f(ActivityDetail.prototype.__proto__||Object.getPrototypeOf(ActivityDetail.prototype),"componentDidHide",this)&&f(ActivityDetail.prototype.__proto__||Object.getPrototypeOf(ActivityDetail.prototype),"componentDidHide",this).call(this)}}]),ActivityDetail}())||r}}]);