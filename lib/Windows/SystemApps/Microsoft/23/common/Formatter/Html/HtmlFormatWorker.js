﻿var Common;!function(t){!function(t){"use strict";onmessage=function(t){var r=t.data,e=r.services,s=r.text;importScripts(e.formatterRoot+"workerMessaging.js",e.formatterRoot+"sourcemapMappings.js",e.formatterRoot+"sourceSpan.js",e.formatterRoot+"formattedTextMapping.js",e.formatterRoot+"StateMachine.js",e.formatterRoot+"html/HtmlTokenizer.js",e.formatterRoot+"html/HtmlParser.js",e.formatterRoot+"html/HtmlEmitter.js");var m=new o(s,e).processSource();this.postMessage(JSON.stringify(m));this.close()};class o{constructor(t,o){this._text=t;this._services=o;this._mappings=[]}processSource(){return new t.Html.HtmlEmitter(this._services).emit(this._text)}}t.HtmlFormatWorker=o}(t.FormatService||(t.FormatService={}))}(Common||(Common={}));