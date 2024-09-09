﻿var Common;!function(e){!function(t){!function(i){"use strict";class s extends t.StateMachine{constructor(e){super();this._services=e}emit(e){this._raw=e;this._pos=0;this._newlineRequested=!1;this._spaceRequested=!1;this._builder=[];this._nodeStack=[];this._indexStack=[];this._offsets=[];this._currentIndex=0;var s=new i.HtmlParser;this._currentNode=s.parse(e);this.refreshCurrentNode();this.pushState(this.stateEmitNode);this.run();var n=this._builder.join("");return new t.OffsetTextMapping(n,this._offsets,e)}stateEmitNode(){switch(this._currentNode.kind){case 0:this.pushState(this.stateEmitChildren);break;case 1:this.pushState(this.stateEmitDocumentType);break;case 2:this.pushState(this.stateEmitProcessingInstruction);break;case 3:this.pushState(this.stateEmitComment);break;case 7:this.pushState(this.stateEmitCharacterData);break;case 6:this.pushState(this.stateEmitText);break;case 4:this.pushState(this.stateEmitElement)}}stateEmitElementContent(){if("script"===this._currentNode.nodeName){if(this._currentNode.firstChild){this.pushNode(this._currentNode.firstChild);this.pushStates(this.stateEmitScriptContent,this.popNode)}}else if("style"===this._currentNode.nodeName){if(this._currentNode.firstChild){this.pushNode(this._currentNode.firstChild);this.pushStates(this.stateEmitStyleContent,this.popNode)}}else this.pushState(this.stateEmitChildren)}stateEmitScriptContent(){var e=this._currentNode,t=e.parentNode;if(e.text){var i=e.text.pos,s=n(this.getTokenText(e.text),t.type,this._services);this.emitRaw("\n");var r=this._pos;this.emitRaw(s.text);for(var a=s.getOffsetMappings(),o=0;o<a.length;o++){var h=a[o];this.trackOffset(i+h.originalOffset,r+h.mappedOffset)}}}stateEmitStyleContent(){var e=this._currentNode;if(e.text){var t=e.text.pos,i=r(this.getTokenText(e.text),this._nodeStack.length-1,this._services);this.emitRaw("\n");var s=this._pos;this.emitRaw(i.text);for(var n=i.getOffsetMappings(),a=0;a<n.length;a++){var o=n[a];this.trackOffset(t+o.originalOffset,s+o.mappedOffset)}}}stateEmitChildren(){if(this._currentIndex<this._currentContainer.childNodes.length){var e=this._currentContainer.childNodes[this._currentIndex];this.pushNode(e);return this.pushStates(this.stateEmitNode,this.stateEndEmitChild,this.stateEmitChildren)}}stateEndEmitChild(){this.popNode();this._currentIndex++}stateEmitDocumentType(){var e=this._currentNode;this.requestNewline();this.emitToken(e.openToken);this.requestSpace();this.emitToken(e.content);this.requestSpaceIfNeeded(e.closeToken);this.emitToken(e.closeToken);this.requestNewline()}stateEmitProcessingInstruction(){var e=this._currentNode;this.requestNewline();this.emitToken(e.openToken);this.requestSpace();this.emitToken(e.content);this.requestSpaceIfNeeded(e.closeToken);this.emitToken(e.closeToken);this.requestNewline()}stateEmitComment(){var e=this._currentNode;this.requestNewline();this.emitToken(e.openToken);this.requestSpaceIfNeeded(e.content);this.emitToken(e.content);this.requestSpaceIfNeeded(e.closeToken);this.emitToken(e.closeToken);this.requestNewline()}stateEmitCharacterData(){var e=this._currentNode;this.emitToken(e.openToken);this.emitToken(e.text);this.emitToken(e.closeToken)}stateEmitText(){var e=this._currentNode,t=(this.peekParentElement(),!1),s=!1;if(e.parentNode&&!i.isPhrasingContent(e.parentNode.nodeName)&&(e.previousSibling||e.nextSibling||!a(e))){e.previousSibling&&!i.isPhrasingContent(e.previousSibling.nodeName)&&(t=!0);e.nextSibling&&!i.isPhrasingContent(e.nextSibling.nodeName)&&(s=!0)}t&&this.requestNewline();this.emitToken(e.text);s&&this.requestNewline()}stateEmitElement(){this.pushStates(this.stateBeginEmitElement,this.stateEmitElementContent,this.stateEndEmitElement)}stateBeginEmitElement(){var e=this._currentNode;if(e.startTagOpenToken){var t=!1;i.isPhrasingContent(e.nodeName)?e.previousSibling&&!i.isPhrasingContent(e.previousSibling.nodeName)?t=!0:"a"===e.nodeName&&e.parentNode.childNodes.every(e=>"a"===e.nodeName)&&(t=!0):t=!0;var s=!1;if(e.firstChild)if(i.isPhrasingContent(e.nodeName)||a(e.firstChild)){if(!i.isPhrasingContent(e.firstChild.nodeName)){i.isPhrasingContent(e.nodeName)&&(t=!0);s=!0}}else s=!0;t&&this.requestNewline();this.emitToken(e.startTagOpenToken);this.emitToken(e.startTagName);if(e.attributes.length>0)for(var n=0;n<e.attributes.length;n++){var r=e.attributes[n];this.emitLeadingTrivia(r.name);this.requestSpaceIfNeeded(r.name);this.emitToken(r.name);if(r.equalsToken){this.emitLeadingTrivia(r.equalsToken);this.emitToken(r.equalsToken);if(r.value){this.emitLeadingTrivia(r.value);this.emitToken(r.value)}}}this.emitLeadingTrivia(e.startTagCloseToken);this.emitToken(e.startTagCloseToken);s&&this.requestNewline()}}stateEndEmitElement(){var e=!1,t=this._currentNode;if(t.endTagOpenToken){var s=!1;if(t.lastChild)if(i.isPhrasingContent(t.nodeName)||a(t.lastChild)){if(!i.isPhrasingContent(t.lastChild.nodeName)){i.isPhrasingContent(t.nodeName)&&(e=!0);s=!0}}else s=!0;s&&this.requestNewline();this.emitToken(t.endTagOpenToken);this.emitToken(t.endTagName);this.emitLeadingTrivia(t.endTagCloseToken);this.emitToken(t.endTagCloseToken)}i.isPhrasingContent(t.nodeName)?t.nextSibling&&!i.isPhrasingContent(t.nextSibling.nodeName)?e=!0:"br"===t.nodeName?e=!0:"a"===t.nodeName&&t.parentNode.childNodes.every(e=>"a"===e.nodeName)&&(e=!0):e=!0;e&&this.requestNewline()}pushNode(e){this._nodeStack.push(this._currentNode);this._indexStack.push(this._currentIndex);this._currentNode=e;this._currentIndex=0;this.refreshCurrentNode()}popNode(){var e=this._currentNode;this._currentNode=this._nodeStack.pop();this._currentIndex=this._indexStack.pop();this.refreshCurrentNode();return e}peekParentElement(){if(this._nodeStack.length){var e=this._nodeStack[this._nodeStack.length-1];if(4===e.kind)return e}}refreshCurrentNode(){var e,t,i=this._currentNode;if(i){0!==i.kind&&4!==i.kind||(e=i);4===i.kind&&(t=i)}this._currentContainer=e;this._currentElement=t}requestNewline(){this._newlineRequested=!0}requestSpace(){this._spaceRequested=!0}requestSpaceIfNeeded(e){this._lastTokenForSpacing&&e&&e.pos>this._lastTokenForSpacing.end&&this.requestSpace()}getTokenText(e){return this._raw.substring(e.pos,e.end)}emitToken(e){this.emitTokenOrText(e,void 0)}emitText(e){this.emitTokenOrText(void 0,e)}trackOffset(e,i){var s=!1;if(0===this._offsets.length)s=!0;else{var n=this._offsets[this._offsets.length-1];n.mappedOffset-n.originalOffset!==i-e&&(s=!0)}s&&this._offsets.push(new t.OffsetMappingPair(e,i))}emitTokenOrText(e,t){if(e||t){if(this._newlineRequested){if(this._builder.length){var i=this._builder[this._builder.length-1],s=i.charCodeAt(i.length-1);if(13!==s&&10!==s){this._builder.push("\n");this._pos++}this._builder.push(Array(this._nodeStack.length).join("  "));this._pos+=2*(this._nodeStack.length-1)}}else if(this._spaceRequested&&this._builder.length){this._builder.push(" ");this._pos+=1}if(e){this.trackOffset(e.pos,this._pos);t=this.getTokenText(e);this._lastToken=e}this._newlineRequested=!1;this._spaceRequested=!1;this._builder.push(t);this._lastTokenForSpacing=e;this._pos+=t.length}}emitRaw(e){this._builder.push(e);this._pos+=e.length;this._lastTokenForSpacing=void 0}emitLeadingTrivia(e){if(this._lastToken&&e){for(var t=-1,s=this._lastToken.end;s<e.pos;s++)if(!i.isWhitespaceChar(this._raw.charCodeAt(s))){t=s;break}var n=-1;for(s=e.pos-1;s>=t;s--)if(!i.isWhitespaceChar(this._raw.charCodeAt(s))){n=s+1;break}if(t>-1){var r={kind:17,pos:t,end:n};this.requestSpaceIfNeeded(r);this.emitToken(r)}}}}i.HtmlEmitter=s;function n(i,s,n){i=i.replace(/\s+$/,"");void 0===e.FormatService.FormatWorker&&importScripts(n.formatterRoot+"formatWorker.js");var r=new t.WorkerSendMessage;r.source=i;r.mimeType=s||"text/javascript";r.commonUrl=n.commonRoot;r.loader=n.editorRoot;var a=new t.OffsetTextMapping(i,[],i),o=new t.FormatWorker(r,n.formatterRoot);o.processSource();if(o.error||!o.formattedText)return a;var h=o.generatedSourceSpans.map(e=>new t.SourceSpan(e.data));return new t.FormattedTextMapping(2,o.formattedText,a,h)}function r(i,s,n){i=i.replace(/\s+$/,"");void 0===e.FormatService.CssParser&&importScripts(n.formatterRoot+"css/CssParser.js",n.formatterRoot+"css/CssEmitter.js");var r=new t.CssParser(i).parseCss(),a=new t.CssEmitter(s),o=a.outputCss(r);return new t.OffsetTextMapping(o,a.mappings,i)}function a(e){var t=e.text;return 6===e.kind&&e.parentNode&&/^(li|d[td]|r([bp]|tc?)|t([dh]|itle))$/i.test(e.parentNode.nodeName)&&!e.previousSibling&&!e.nextSibling&&(!t||t.end-t.pos<=128)}}(t.Html||(t.Html={}))}(e.FormatService||(e.FormatService={}))}(Common||(Common={}));