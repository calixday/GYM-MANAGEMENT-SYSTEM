﻿var Common;!function(e){!function(t){"use strict";class o{constructor(e){this._context=e}static evaluateProperty(e,t,n,r){var i=(e,t)=>{if(e)try{var r=o.getPagePropertyDescriptor(n,e,t);return r||i(n.Object.getPrototypeOf(e),t)}catch(e){return"TypeError"===e.name?{}:void 0}return e},s=(e,t,o)=>{if(o){if(void 0!==o.value&&null!==o.value)return o.value;var i=typeof e;"object"!==i&&"function"!==i&&(e=new n.Object(e));if(o.isSafeGet)return r(e,t)}};return e&&s(e,t,i(e,t))}static getObjectContextPropertiesNames(t){var o=[];if(null!==t.object&&void 0!==t.object){var n=typeof t.object;"object"!==n&&"function"!==n&&(t.object=new t.windowContext.Object(t.object));var r=e.RemoteHelpers.getValidWindow(t.windowContext,t.object,!0);r.isValid&&(t.object=t.windowContext=r.window);var i=t.windowContext.Object.getOwnPropertyNames(t.object);i&&(o=i);for(var s=t.windowContext.Object.getPrototypeOf(t.object);s;){var a=t.windowContext.Object.getOwnPropertyNames(s);o=Array.prototype.concat.call(o,a);s=t.windowContext.Object.getPrototypeOf(s)}}return o}getIntellisenseItemsForExpression(e){const t=browser.unwrapMirror(this._context.currentWindowContext.global);return this.getIntellisenseItemsForExpressionUsingWindowContext(e,t,t.window,[])}getIntellisenseItemsForExpressionUsingWindowContext(e,t,o,n){var r=this.getObjectContextForExpressionUsingEvaluator(e,t,o);let i=[];t===o&&0===e.length&&(i=i.concat(this.getConsoleGlobals(),n));return this.getIntellisenseItemsForObjectContext(r,i)}static getPagePropertyDescriptor(t,o,n){var r=function(e,t){try{window.__BROWSERTOOLS_CONSOLE_INTELLISENSE_DESCRIPTOR=null;var o=Object.getOwnPropertyDescriptor(e,t);if(o){var n=!1;o.get&&/\[native code\]/.test(o.get.toString())?n=!0:void 0===o.get&&(n=!0);window.__BROWSERTOOLS_CONSOLE_INTELLISENSE_DESCRIPTOR={value:o.value,isSafeGet:n}}}catch(e){}};try{e.RemoteHelpers.executeScript("window.__BROWSERTOOLS_CONSOLE_INTELLISENSE_GET_DESCRIPTOR = "+r.toString(),t,!0);t.__BROWSERTOOLS_CONSOLE_INTELLISENSE_GET_DESCRIPTOR(o,n);return t.__BROWSERTOOLS_CONSOLE_INTELLISENSE_DESCRIPTOR}catch(e){return new t.Object(null)}}getObjectContextForExpressionUsingEvaluator(t,n,r){var i=t.split(".");const s=this.getConsoleGlobals();for(var a=0;a<i.length&&i[a].length>0;++a){var l=e.PropertyEvaluationIgnoreList.propertyEvaluationFunction(n,r);r=o.evaluateProperty(r,i[a],n,l);var c=e.RemoteHelpers.getValidWindow(n,r,!0);c.isValid&&(r=n=c.window)}if(!r&&i.length&&i[0].length){if(s.indexOf(i[0])>=0)return{object:this.getConsoleGlobalValue(i[0]),windowContext:n}}return{object:r,windowContext:n}}getIntellisenseItemsForObjectContext(e,t){for(var n=o.getObjectContextPropertiesNames(e),r=[],i=0,s=(n=Array.prototype.concat.call(n,t)).length;i<s;i++)String.prototype.match.call(n[i],/^\d/)||r.push({name:n[i],info:""});var a=(e,t)=>e<t?-1:e>t?1:0;r=Array.prototype.sort.call(r,function(e,t){var o=a(e.name.toLowerCase(),t.name.toLowerCase());return 0===o?a(t.name,e.name):o});for(i=1;i<r.length;)r[i-1].name===r[i].name?r.splice(i,1):i++;return{choices:r}}getConsoleGlobals(){const e=diagnosticsScript.getConsoleScope();return Object.keys(e)}getConsoleGlobalValue(e){return diagnosticsScript.getConsoleScope()[e]}}t.IntellisenseRemoteHelpers=o}(e.Intellisense||(e.Intellisense={}))}(Common||(Common={}));