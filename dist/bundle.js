/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var hyperHTML=function(e,t){"use strict";function n(e){return arguments.length<2?null==e?X("html"):"string"==typeof e?i(null,e):"raw"in e?X("html")(e):"nodeType"in e?r(e):Z(e,"html"):("raw"in e?X("html"):i).apply(null,arguments)}function r(e){return c.bind(e)}function i(e,t){return arguments.length<1?X("html"):null==e?X(t||"html"):Z(e,t||"html")}function o(){}function a(e,n){return this.node=e,this.childNodes=n,t.aura(this,n)}function c(e){var t=_e.get(this);return t&&t.template===le(e)?q.apply(t.updates,arguments):F.apply(this,arguments),this}function l(e,t,n){var r,i,o,a=e.ownerElement,c="data"===n,l=!c&&/^on/.test(n),u=c||S(a,n)&&!Y.test(n),s=l?n.slice(2):"",f=u||l,h=u&&(c||n in a);return(l||h)&&(t.push(a,n),l&&(s===fe||s===he?Me.add(a):n.toLowerCase()in a&&(s=s.toLowerCase()))),u&&(h||(o=$e.get(a),o||(o={_:Object.create(null),$:function(){$e.delete(a);for(var e in this._)this._[e].$()}},$e.set(a,o)),o._[n]={_:null,$:function(){h=!0,i(this._)}}),i=function(t){h?r!==t&&(r=t,a[n]!==t&&(null==t?(a[n]=null,a.removeAttribute(n)):a[n]=t)):(e.value=t,o._[n]._=t,n in a&&o.$())}),l?function(e){r!==e&&(r&&a.removeEventListener(s,r,!1),r=e,e&&a.addEventListener(s,e,!1))}:u?i:function(t){r!==t&&(r=t,e.value!==t&&(null==t?f||(f=!0,a.removeAttributeNode(e)):(e.value=t,f&&(f=!1,a.setAttributeNode(e)))))}}function u(e){var t;return function(n){n!==t&&(t=n,e.textContent=n)}}function s(e,t,n){var r;return function i(a){switch(typeof a){case"string":case"number":case"boolean":var c=t.length;1===c&&t[0].nodeType===G?r!==a&&(r=a,t[0].textContent=a):(r=a,c?n.splice(0,c,w(e,a)):t[0]=e.parentNode.insertBefore(w(e,a),e));break;case"function":i(a(e.parentNode,t,0));break;case"object":case"undefined":if(null==a){r=a,i("");break}a instanceof o&&(a=a.render());default:if(r=a,ge(a)){var c=a.length;if(0===c)n.splice(0);else switch(typeof a[0]){case"string":case"number":case"boolean":i({html:a});break;case"function":for(var l=e.parentNode,u=0;u<c;u++)a[u]=a[u](l,t,u);i(a.concat.apply([],a));break;case"object":if(ge(a[0])&&(a=a.concat.apply([],a)),A(a[0])){Promise.all(a).then(i);break}for(var u=0,c=a.length;u<c;u++)a[u]instanceof o&&(a[u]=a[u].render());default:M(n,a)}}else if(k(a))M(n,a.nodeType===K?ue.call(a.childNodes):[a]);else if(A(a))a.then(i);else if("placeholder"in a)C(a,i);else if("text"in a)i(String(a.text));else if("any"in a)i(a.any);else if("html"in a){var s=[].concat(a.html).join("");n.splice(0);var f=m(e,s);t.push.apply(t,f.childNodes),e.parentNode.insertBefore(f,e)}else i("length"in a?ue.call(a):T(a,i))}}}function f(e,t,n){for(var r,i,o,a,c=Object.create(null),l=e.attributes,u=0,s=l.length;u<s;u++)a=l[u],a.value===te&&(r=a.name,r in c?(e.removeAttributeNode(a),c[r].value="",e.setAttributeNode(c[r]),s--,u--):(i=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1"),o=e.attributes,c[r]=o[i]||o[i.toLowerCase()],t.push(D("attr",c[r],i))))}function h(e,t,n){for(var r,i=e.childNodes,o=i.length,a=0;a<o;a++)switch(r=i[a],r.nodeType){case z:f(r,t,n),h(r,t,n);break;case J:r.textContent===te&&(n.shift(),t.push(D("any",r)));break;case G:ee.test(e.nodeName)&&me.call(r.textContent)===ne&&(n.shift(),t.push(D("text",e)))}}function d(e){return se[e]}function p(e){return{html:e}}function v(e){for(var t,n=[],r=e.childNodes,i=0,o=r.length;i<o;i++)t=r[i],t.nodeType!==z&&0===me.call(t.textContent).length||n.push(t);return 1===n.length?n[0]:n}function g(e){return e.createDocumentFragment()}function m(e,t){return(Q in e?b:y)(e,t.replace(Te,Ae))}function y(e,t){var n,r=e.ownerDocument,i=r.createElement(/<(a-\w+)[\s\S]*?>[\s\S]*?<\/\1>/.test(t)?"div":"template"),o="content"in i,a=!1;if(o||(n=g(r),a=/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)),a){var c=RegExp.$1;i.innerHTML="<table>"+t+"</table>",Ee(n,ue.call(i.querySelectorAll(c)))}else i.innerHTML=t,o?n=i.content:Ee(n,ue.call(i.childNodes));return n}function b(e,t){var n=e.ownerDocument,r=g(n);if(ae||ce){var i=n.createElement("div");i.innerHTML='<svg xmlns="'+U+'">'+t+"</svg>",Ee(r,ue.call(i.firstChild.childNodes))}else{var i=n.createElementNS(U,"svg");i.innerHTML=t,Ee(r,ue.call(i.childNodes))}return r}function w(e,t){return e.ownerDocument.createTextNode(t)}function N(e,t){for(var n,r,i=t===fe,o=0,a=e.length;o<a;o++)r=e[o],r.nodeType===z&&(n=E(r,i,t,n))}function E(e,t,n,r){if(Me.has(e))e.dispatchEvent(r||(r=new re(n)));else if(t&&$e.has(e))$e.get(e).$();else for(var i=xe(e),o=0,a=i.length;o<a;o++)r=E(i[o],t,n,r);return r}function x(e){var t=n.document,r=t.customElements||t.defaultView.customElements;return r&&r.get(e.nodeName.toLowerCase())}function S(e,t){var n=!(Q in e);if(n&&/-/.test(e.nodeName)){var r=x(e);r&&(e=r.prototype)}return n&&t in e}function C(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(p).then(t):Promise.resolve(T(e,t)).then(t)}function T(e,t){for(var n,r=0,i=we.length;r<i;r++)if(n=we[r],e.hasOwnProperty(n))return be[n](e[n],t)}function k(e){return"ELEMENT_NODE"in e}function A(e){return null!=e&&"then"in e}function L(e,t){var n="_"+e+"$";return{get:function(){return this[n]||(this[e]=t.call(this,e))},set:function(e){ye(this,n,{configurable:!0,value:e})}}}function M(e,r){var i=0,o=e.length;if(r.length!==o)t(e,r,n.MAX_LIST_SIZE);else for(;i<o--;i++)if(e[o]!==r[o]||e[i]!==r[i])return void t(e,r,n.MAX_LIST_SIZE)}function _(e){for(var t=0,n=e.length;t<n;t++)e[t++].removeAttribute(e[t])}function O(e,t,n,r){var i;switch(e.type){case"any":i=s(t,r,new a(t,r));break;case"attr":i=l(t,n,e.name);break;case"text":i=u(t)}return i}function D(e,t,n){return{type:e,path:B(t),name:n}}function $(e){var t="_"+e.join(ne);return Ne[t]||(Ne[t]=e)}function j(e,t){var n=t.previousSibling;n&&n.nodeType===G&&(e.removeChild(n),j(e,t))}function I(e,t,n){n?e.insertBefore(t,n):e.appendChild(t)}function P(e,t,n,r){for(var i=e,o=e.ownerDocument,a=n.path,c=Se(t,a),l=0,u=a.length;l<u;l++)switch(a[l++]){case"attributes":var s=c.name;e.hasAttribute(s)||e.setAttribute(s,""),i=e.attributes[s];break;case"childNodes":var f=xe(e),h=xe(c.parentNode);i=He(c);var d=i?a.indexOf.call(h,i)+1:-1;i=Pe(c);var p=i?a.indexOf.call(h,i):-1;switch(i=o.createComment(te),!0){case p<0:p=f.length;break;case d<0:d=0;default:p=-(h.length-p)}r.push.apply(r,ue.call(f,d,p)),r.length?I(e,i,Pe(r[r.length-1])):I(e,i,ue.call(f,p)[0]),0===r.length&&j(e,i);break;default:i=xe(e)[a[l]]||e.appendChild(e.ownerDocument.createElement(Se(t,a.slice(0,l+1)).nodeName)),e=i}return i}function H(e,t){for(var n,r,i=[],o=[],a=0,c=t.length;a<c;a++)r=[],n=t[a],i[a]=O(n,P(this,e,n,r),o,r);return _(o),i}function R(e){var t=[],n=m(this,e.join(ne)),r={fragment:n,paths:t};return h(n,t,e.slice()),De.set(e,r),r}function B(e){var t,n=[];switch(e.nodeType){case z:case K:t=e;break;case J:t=e.parentNode,n.unshift("childNodes",n.indexOf.call(t.childNodes,e));break;case V:default:t=e.ownerElement,n.unshift("attributes",e.name)}for(e=t;t=t.parentNode;e=t)n.unshift("children",n.indexOf.call(xe(t),e));return n}function W(e,t){for(var n,r=[],i=[],o=0,a=t.length;o<a;o++)n=t[o],r[o]=O(n,Se(e,n.path),i,[]);return _(i),r}function q(){for(var e=1,t=arguments.length;e<t;e++)this[e-1](arguments[e])}function F(e){e=le(e);var t,n=De.get(e)||R.call(this,e);if(je){var r=Ie(n.fragment);t=W.call(this,r,n.paths),_e.set(this,{template:e,updates:t}),q.apply(t,arguments),this.textContent="",this.appendChild(r)}else t=H.call(this,n.fragment,n.paths),_e.set(this,{template:e,updates:t}),q.apply(t,arguments)}function X(e){function t(t){l=g(t),c="svg"===e?t.createElementNS(U,"svg"):l,u=r(c)}function i(){return s&&(s=!1,"svg"===e&&Ee(l,ue.call(c.childNodes)),a=v(l)),a}var o,a,c,l,u,s,f;return"adopt"===e?function(r){var a=arguments;return r=le(r),f!==r&&(s=!0,f=r,o=function(r,o,f){return s&&(f<o.length?(c=o[f],l={ownerDocument:c.ownerDocument,childNodes:[c],children:[c]},u=n.adopt(l)):(Q in r&&(e="svg"),t(r.ownerDocument))),u.apply(null,a),i()}),o}:function(e){return e=le(e),f!==e&&(s=!0,f=e,t(n.document)),u.apply(null,arguments),i()}}function Z(e,t){var n=Oe.get(e),r=t.indexOf(":"),i=t;return-1<r&&(i=t.slice(r+1),t=t.slice(0,r)||"html"),n||(n={},Oe.set(e,n)),n[i]||(n[i]=X(t))}/*! (c) 2017 Andrea Giammarchi @WebReflection, (ISC) */
n.document=e,n.hyper=n,n.adopt=function(e){return function(){return je=!1,c.apply(e,arguments),je=!0,e}},n.bind=r,n.define=function(e,t){e in be||we.push(e),be[e]=t},n.escape=function(e){return e.replace(/[&<>'"]/g,d)},n.wire=i,n.Component=o,Object.defineProperties(o.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:L("html",X),svg:L("svg",X),state:L("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},setState:{value:function(e){var t=this.state,n="function"==typeof e?e.call(this,t):e;for(var r in n)t[r]=n[r];this.render()}}});var z=1,V=2,G=3,J=8,K=11,Q="ownerSVGElement",U="http://www.w3.org/2000/svg",Y=/^style$/i,ee=/^style|textarea$/i,te="_hyper: "+(Math.random()*new Date|0)+";",ne="\x3c!--"+te+"--\x3e";a.prototype.splice=function(e){for(var t,n=this.node,r=this.childNodes,i=r[e+(arguments[1]||0)]||n,o=r.splice.apply(r,arguments),a=n.parentNode,c=0,l=o.length;c<l;c++)t=o[c],r.indexOf(t)<0&&a.removeChild(t);if(c=2,l=arguments.length,c<l){if(l-c==1)t=arguments[c];else for(t=g(a.ownerDocument);c<l;)t.appendChild(arguments[c++]);a.insertBefore(t,i)}return o};var re,ie=g(e),oe="object"==typeof navigator&&/Firefox\/(\d+)/.test(navigator.userAgent)&&parseFloat(RegExp.$1)<55,ae=function(){var t=e.createElement("p");return t.innerHTML='<i data-i="" class=""></i>',/class/i.test(t.firstChild.attributes[0].name)}(),ce=!("children"in ie),le=function(e){return(le=e.propertyIsEnumerable("raw")||oe?$:function(e){return e})(e)},ue=[].slice,se={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},fe="connected",he="dis"+fe;try{new Event(fe),re=Event}catch(e){re=function(e){var t=n.document.createEvent("Event");return t.initEvent(e,!1,!1),t}}try{new MutationObserver(function(e){for(var t,n=0,r=e.length;n<r;n++)t=e[n],N(t.removedNodes,he),N(t.addedNodes,fe)}).observe(e,{subtree:!0,childList:!0})}catch(t){e.addEventListener("DOMNodeInserted",function(e){N([e.target],fe)},!1),e.addEventListener("DOMNodeRemoved",function(e){N([e.target],he)},!1)}var $,de=typeof WeakMap==typeof de?function(){return{delete:function(e){delete e[te]},get:function(e){return e[te]},has:function(e){return te in e},set:function(e,t){Object.defineProperty(e,te,{configurable:!0,value:t})}}}:WeakMap,pe=typeof WeakSet==typeof pe?function(){var e=new de;return{add:function(t){e.set(t,!0)},has:function(t){return!0===e.get(t)}}}:WeakSet,ve=typeof Map==typeof ve?function(){var e=[],t=[];return{get:function(n){return t[e.indexOf(n)]},set:function(n,r){t[e.push(n)-1]=r}}}:Map,ge=Array.isArray||function(){var e={}.toString,t=e.call([]);return function(n){return e.call(n)===t}}(),me="_hyper: ".trim||function(){return this.replace(/^\s+|\s+$/g,"")},ye=Object.defineProperty,be={},we=[],Ne={},Ee="append"in ie?function(e,t){e.append.apply(e,t)}:function(e,t){for(var n=0,r=t.length;n<r;n++)e.appendChild(t[n])},xe=ce||ae?function(e){for(var t,n=[],r=e.childNodes,i=0,o=0,a=r.length;o<a;o++)t=r[o],t.nodeType===z&&(n[i++]=t);return n}:function(e){return e.children},Se=ae||ce?function(e,t){for(var n,r=0,i=t.length;r<i;r++)switch(n=t[r++]){case"children":e=xe(e)[t[r]];break;default:e=e[n][t[r]]}return e}:function(e,t){for(var n=0,r=t.length;n<r;n++)e=e[t[n++]][t[n]];return e},Ce="[^\\S]+[^ \\f\\n\\r\\t\\/>\"'=]+",Te=new RegExp("(<[a-z]+[a-z0-9:_-]*)((?:"+Ce+"(?:=(?:'.*?'|\".*?\"|<.+?>|\\S+))?)+)([^\\S]*/?>)","gi"),ke=new RegExp("("+Ce+"=)(['\"]?)"+ne+"\\2","gi"),Ae=function(e,t,n,r){return t+n.replace(ke,Le)+r},Le=function(e,t,n){return t+(n||'"')+te+(n||'"')},Me=new pe,_e=new de,Oe=new de,De=new ve,$e=new de,je=!0,Ie=function(){return ie.appendChild(w(ie,"g")),ie.appendChild(w(ie,"")),1===ie.cloneNode(!0).childNodes.length?function(e){for(var t=e.cloneNode(),n=e.childNodes||[],r=0,i=n.length;r<i;r++)t.appendChild(Ie(n[r]));return t}:function(e){return e.cloneNode(!0)}}(),Pe=ae?function(e){for(;e=e.nextSibling;)if(e.nodeType===z)return e}:function(e){return e.nextElementSibling},He=ae?function(e){for(;e=e.previousSibling;)if(e.nodeType===z)return e}:function(e){return e.previousElementSibling};return n.MAX_LIST_SIZE=1e3,n}(document,function(){"use strict";function e(e,n,o){var a=e.length,c=n.length,l=(o||1/0)<Math.sqrt((a||1)*(c||1));return a<1||l?void((c||l)&&e.splice.apply(e,[0,a].concat(n))):c<1?void e.splice(0):void i(e,r(e,n,t(e,n)))}function t(e,t){var n,r,i,o=e.length+1,a=t.length+1,c=o*a,u=0,s=0,f=0,h=0,d=0,p=0,v=new l(c);for(v[0]=0;++u<a;)v[u]=u;for(;++s<o;){for(f=u=0,p=d,d=s*a,v[d+u]=s;++u<a;)n=v[p+u]+1,r=v[d+f]+1,i=v[p+f]+(e[h]==t[f]?0:1),v[d+u]=n<r?n<i?n:i:r<i?r:i,++f;h=s}return v}function n(e,t,n,r,i,o){e.unshift({type:t,x:n,y:r,count:i,items:o})}function r(e,t,r){for(var i,l,u,s,f,h,d=[],p=e.length+1,v=t.length+1,g=p-1,m=v-1;m&&g;)f=g*v+m,h=f-v,i=r[f],l=r[h],u=r[f-1],s=r[h-1],s<=u&&s<=l&&s<=i?(m--,g--,s<i&&n(d,c,m,g,1,[t[m]])):u<=l&&u<=i?(m--,n(d,a,m,g,0,[t[m]])):(g--,n(d,o,m,g,1,[]));for(;m--;)n(d,a,m,g,0,[t[m]]);for(;g--;)n(d,o,m,g,1,[]);return d}function i(e,t){var n,r,i,c=0,l=1,u=t.length;if(u){for(i=r=t[0];l<u;)n=t[l++],r.type===n.type&&n.x-r.x<=1&&n.y-r.y<=1?(i.count+=n.count,i.items=i.items.concat(n.items)):(e.splice.apply(e,[i.y+c,i.count].concat(i.items)),c+=i.type===a?i.items.length:i.type===o?-i.count:0,i=n),r=n;e.splice.apply(e,[i.y+c,i.count].concat(i.items))}}/*! Copyright (c) 2017, Andrea Giammarchi, @WebReflection */
var o="del",a="ins",c="sub",l=/^u/.test(typeof Int32Array)?Array:Int32Array;return e.aura=function(e,t){var n=t.splice;return t.splice=function r(){t.splice=n;var i=e.splice.apply(e,arguments);return t.splice=r,i},t},e}());try{module.exports=hyperHTML}catch(e){}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateObject = _taggedTemplateLiteral(['\n        <video class="videoplayer" id="video" width="100%" autoplay loop controlsList="nodownload nofullscreen noremoteplayback">\n            <source type="video/webm" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.webm">\n            <source type="video/mp4" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.mp4">\n        </video>\n    '], ['\n        <video class="videoplayer" id="video" width="100%" autoplay loop controlsList="nodownload nofullscreen noremoteplayback">\n            <source type="video/webm" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.webm">\n            <source type="video/mp4" src="https://download.videvo.net/videvo_files/video/free/2018-08/small_watermarked/180825_01_laptop_preview.mp4">\n        </video>\n    ']);

var _hyperhtml = __webpack_require__(0);

var _hyperhtml2 = _interopRequireDefault(_hyperhtml);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function startApp() {
    var root = window.document.querySelector('#app');
    (0, _hyperhtml2.default)(root)(_templateObject);
}
// startApp();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "html {\n  font-family: sans-serif;\n  font-size: 24px; }\n  html body {\n    padding: 0;\n    margin: 0; }\n\n.intro {\n  height: 100vh;\n  position: relative; }\n  .intro_background {\n    height: 100%; }\n    .intro_background img,\n    .intro_background video {\n      object-fit: cover;\n      width: 100%;\n      height: 100%;\n      position: absolute; }\n    .intro_background:after {\n      content: '';\n      background: rgba(62, 62, 62, 0.5);\n      position: absolute;\n      display: block;\n      height: 100%;\n      width: 100%; }\n  .intro_content {\n    color: #ffffff;\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    text-align: center;\n    width: 100%; }\n    .intro_content .avatar {\n      height: 100px;\n      width: 100px;\n      border-radius: 50%;\n      cursor: pointer; }\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);