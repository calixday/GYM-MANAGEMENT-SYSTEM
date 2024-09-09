﻿var Common;!function(t){!function(e){"use strict";class r{constructor(t=e.FormatServiceHelper.DefaultServices){this._services=t;this.options=new e.FormatterOptions}get canFormat(){return this.sourceText&&this.sourceText.text&&this.sourceText.text.trim().length>0}static supportsMimeType(t){return!!t&&"text/css"===t.toLowerCase()}updateOptions(t){this.options.prettyPrint=t.prettyPrint;this.options.sourcemapSupport=t.sourcemapSupport}setDocument(t,r,s,i,o){this.sourceText=new e.PositionOffsetMapper(t);this.options.prettyPrint&&o&&(this._prettyPrintPromise=this.startPrettyPrinting());return Promise.resolve(null)}getFormattedText(t){if(this.options.prettyPrint){this._prettyPrintPromise=this._prettyPrintPromise||this.startPrettyPrinting();return this._prettyPrintPromise}return Promise.resolve(this.sourceText)}startPrettyPrinting(){return new Promise(r=>{window.setImmediate(()=>{var s=e.FormatServiceHelper.getWorkerServices(new t.Uri("css/CssFormatWorker.js"),this._services),i=new Worker(s.path);i.onmessage=(t=>{var s=t.data,o=new e.OffsetTextMapping(s.text,s.mappings,this.sourceText.text);i.terminate();r(o);this._prettyPrintPromise=null});i.onerror=(t=>{i.terminate();this._prettyPrintPromise=null;throw new Error(t)});i.postMessage({services:s.services,text:this.sourceText.text})})})}}e.CssFormatter=r}(t.FormatService||(t.FormatService={}))}(Common||(Common={}));