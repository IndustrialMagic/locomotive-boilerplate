!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Pjax=e()}}(function(){return function i(r,a,l){function c(t,e){if(!a[t]){if(!r[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(u)return u(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var s=a[t]={exports:{}};r[t][0].call(s.exports,function(e){return c(r[t][1][e]||e)},s,s.exports,i,r,a,l)}return a[t].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)c(l[e]);return c}({1:[function(s,e,t){var r=s("./lib/execute-scripts.js"),a=s("./lib/foreach-els.js"),o=s("./lib/parse-options.js"),n=s("./lib/switches"),l=s("./lib/uniqueid.js"),i=s("./lib/events/on.js"),c=s("./lib/events/trigger.js"),u=s("./lib/util/clone.js"),d=s("./lib/util/contains.js"),h=s("./lib/util/extend.js"),f=s("./lib/util/noop"),p=function(e){this.state={numPendingSwitches:0,href:null,options:null},this.options=o(e),this.log("Pjax options",this.options),this.options.scrollRestoration&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),this.maxUid=this.lastUid=l(),this.parseDOM(document),i(window,"popstate",function(e){if(e.state){var t=u(this.options);t.url=e.state.url,t.title=e.state.title,t.history=!1,t.scrollPos=e.state.scrollPos,e.state.uid<this.lastUid?t.backward=!0:t.forward=!0,this.lastUid=e.state.uid,this.loadUrl(e.state.url,t)}}.bind(this))};if(p.switches=n,p.prototype={log:s("./lib/proto/log.js"),getElements:function(e){return e.querySelectorAll(this.options.elements)},parseDOM:function(e){var t=s("./lib/proto/parse-element");a(this.getElements(e),t,this)},refresh:function(e){this.parseDOM(e||document)},reload:function(){window.location.reload()},attachLink:s("./lib/proto/attach-link.js"),attachForm:s("./lib/proto/attach-form.js"),forEachSelectors:function(e,t,o){return s("./lib/foreach-selectors.js").bind(this)(this.options.selectors,e,t,o)},switchSelectors:function(e,t,o,n){return s("./lib/switches-selectors.js").bind(this)(this.options.switches,this.options.switchesOptions,e,t,o,n)},latestChance:function(e){window.location=e},onSwitch:function(){c(window,"resize scroll"),this.state.numPendingSwitches--,0===this.state.numPendingSwitches&&this.afterAllSwitches()},loadContent:function(e,t){var o=document.implementation.createHTMLDocument("pjax"),n=e.match(/<html[^>]+>/gi);if(n&&n.length&&(n=n[0].match(/\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi)).length&&(n.shift(),n.forEach(function(e){var t=e.trim().split("=");1===t.length?o.documentElement.setAttribute(t[0],!0):o.documentElement.setAttribute(t[0],t[1].slice(1,-1))})),o.documentElement.innerHTML=e,this.log("load content",o.documentElement.attributes,o.documentElement.innerHTML.length),document.activeElement&&d(document,this.options.selectors,document.activeElement))try{document.activeElement.blur()}catch(e){}this.switchSelectors(this.options.selectors,o,document,t)},abortRequest:s("./lib/abort-request.js"),doRequest:s("./lib/send-request.js"),handleResponse:s("./lib/proto/handle-response.js"),loadUrl:function(e,t){t="object"==typeof t?h({},this.options,t):u(this.options),this.log("load href",e,t),this.abortRequest(this.request),c(document,"pjax:send",t),this.request=this.doRequest(e,t,this.handleResponse.bind(this))},afterAllSwitches:function(){var e=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();e&&document.activeElement!==e&&e.focus(),this.options.selectors.forEach(function(e){a(document.querySelectorAll(e),function(e){r(e)})});var t=this.state;if(t.options.history&&(window.history.state||(this.lastUid=this.maxUid=l(),window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid,scrollPos:[0,0]},document.title)),this.lastUid=this.maxUid=l(),window.history.pushState({url:t.href,title:t.options.title,uid:this.maxUid,scrollPos:[0,0]},t.options.title,t.href)),this.forEachSelectors(function(e){this.parseDOM(e)},this),c(document,"pjax:complete pjax:success",t.options),"function"==typeof t.options.analytics&&t.options.analytics(),t.options.history){var o=document.createElement("a");if(o.href=this.state.href,o.hash){var n=o.hash.slice(1);n=decodeURIComponent(n);var s=0,i=document.getElementById(n)||document.getElementsByName(n)[0];if(i&&i.offsetParent)for(;s+=i.offsetTop,i=i.offsetParent;);window.scrollTo(0,s)}else!1!==t.options.scrollTo&&(1<t.options.scrollTo.length?window.scrollTo(t.options.scrollTo[0],t.options.scrollTo[1]):window.scrollTo(0,t.options.scrollTo))}else t.options.scrollRestoration&&t.options.scrollPos&&window.scrollTo(t.options.scrollPos[0],t.options.scrollPos[1]);this.state={numPendingSwitches:0,href:null,options:null}}},p.isSupported=s("./lib/is-supported.js"),p.isSupported())e.exports=p;else{var m=f;for(var w in p.prototype)p.prototype.hasOwnProperty(w)&&"function"==typeof p.prototype[w]&&(m[w]=f);e.exports=m}},{"./lib/abort-request.js":2,"./lib/events/on.js":4,"./lib/events/trigger.js":5,"./lib/execute-scripts.js":6,"./lib/foreach-els.js":7,"./lib/foreach-selectors.js":8,"./lib/is-supported.js":9,"./lib/parse-options.js":10,"./lib/proto/attach-form.js":11,"./lib/proto/attach-link.js":12,"./lib/proto/handle-response.js":13,"./lib/proto/log.js":14,"./lib/proto/parse-element":15,"./lib/send-request.js":16,"./lib/switches":18,"./lib/switches-selectors.js":17,"./lib/uniqueid.js":19,"./lib/util/clone.js":20,"./lib/util/contains.js":21,"./lib/util/extend.js":22,"./lib/util/noop":23}],2:[function(e,t,o){var n=e("./util/noop");t.exports=function(e){e&&e.readyState<4&&(e.onreadystatechange=n,e.abort())}},{"./util/noop":23}],3:[function(e,t,o){t.exports=function(e){var t=e.text||e.textContent||e.innerHTML||"",o=e.src||"",n=e.parentNode||document.querySelector("head")||document.documentElement,s=document.createElement("script");if(t.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",e),!1;if(s.type="text/javascript",""!==o&&(s.src=o,s.async=!1),""!==t)try{s.appendChild(document.createTextNode(t))}catch(e){s.text=t}return n.appendChild(s),(n instanceof HTMLHeadElement||n instanceof HTMLBodyElement)&&n.removeChild(s),!0}},{}],4:[function(e,t,o){var s=e("../foreach-els");t.exports=function(e,t,o,n){(t="string"==typeof t?t.split(" "):t).forEach(function(t){s(e,function(e){e.addEventListener(t,o,n)})})}},{"../foreach-els":7}],5:[function(e,t,o){var s=e("../foreach-els");t.exports=function(t,e,n){(e="string"==typeof e?e.split(" "):e).forEach(function(e){var o;(o=document.createEvent("HTMLEvents")).initEvent(e,!0,!0),o.eventName=e,n&&Object.keys(n).forEach(function(e){o[e]=n[e]}),s(t,function(e){var t=!1;e.parentNode||e===document||e===window||(t=!0,document.body.appendChild(e)),e.dispatchEvent(o),t&&e.parentNode.removeChild(e)})})}},{"../foreach-els":7}],6:[function(e,t,o){var n=e("./foreach-els"),s=e("./eval-script");t.exports=function(e){"script"===e.tagName.toLowerCase()&&s(e),n(e.querySelectorAll("script"),function(e){e.type&&"text/javascript"!==e.type.toLowerCase()||(e.parentNode&&e.parentNode.removeChild(e),s(e))})}},{"./eval-script":3,"./foreach-els":7}],7:[function(e,t,o){t.exports=function(e,t,o){return e instanceof HTMLCollection||e instanceof NodeList||e instanceof Array?Array.prototype.forEach.call(e,t,o):t.call(o,e)}},{}],8:[function(e,t,o){var s=e("./foreach-els");t.exports=function(e,t,o,n){n=n||document,e.forEach(function(e){s(n.querySelectorAll(e),t,o)})}},{"./foreach-els":7}],9:[function(e,t,o){t.exports=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}},{}],10:[function(e,t,o){var n=e("./switches");function s(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})}t.exports=function(e){return(e=e||{}).elements=e.elements||"a[href], form[action]",e.selectors=e.selectors||["title",".js-Pjax"],e.switches=e.switches||{},e.switchesOptions=e.switchesOptions||{},e.history=e.history||!0,e.analytics="function"==typeof e.analytics||!1===e.analytics?e.analytics:s,e.scrollTo=void 0===e.scrollTo?0:e.scrollTo,e.scrollRestoration=void 0===e.scrollRestoration||e.scrollRestoration,e.cacheBust=void 0===e.cacheBust||e.cacheBust,e.debug=e.debug||!1,e.timeout=e.timeout||0,e.currentUrlFullReload=void 0!==e.currentUrlFullReload&&e.currentUrlFullReload,e.switches.head||(e.switches.head=n.switchElementsAlt),e.switches.body||(e.switches.body=n.switchElementsAlt),e}},{"./switches":18}],11:[function(e,t,o){var n=e("../events/on"),i=e("../util/clone"),r="data-pjax-state",s=function(e,t){if(!a(t)){var o=i(this.options);o.requestOptions={requestUrl:e.getAttribute("action")||window.location.href,requestMethod:e.getAttribute("method")||"GET"};var n=document.createElement("a");n.setAttribute("href",o.requestOptions.requestUrl);var s=function(e,t){if(e.protocol!==window.location.protocol||e.host!==window.location.host)return"external";if(e.hash&&e.href.replace(e.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(e.href===window.location.href.split("#")[0]+"#")return"anchor-empty";if(t.currentUrlFullReload&&e.href===window.location.href.split("#")[0])return"reload"}(n,o);s?e.setAttribute(r,s):(t.preventDefault(),"multipart/form-data"===e.enctype?o.requestOptions.formData=new FormData(e):o.requestOptions.requestParams=function(e){var t=[];for(var o in e.elements)if(!Number.isNaN(Number(o))){var n=e.elements[o],s=n.tagName.toLowerCase();if(n.name&&void 0!==n.attributes&&"button"!==s){var i=n.attributes.type;if(!i||"checkbox"!==i.value&&"radio"!==i.value||n.checked){var r=[];if("select"===s)for(var a,l=0;l<n.options.length;l++)(a=n.options[l]).selected&&r.push(a.value||a.text);else r.push(n.value);for(var c=0;c<r.length;c++)t.push({name:encodeURIComponent(n.name),value:encodeURIComponent(r[c])})}}}return t}(e),e.setAttribute(r,"submit"),o.triggerElement=e,this.loadUrl(n.href,o))}};var a=function(e){return e.defaultPrevented||!1===e.returnValue};t.exports=function(t){var o=this;t.setAttribute(r,""),n(t,"submit",function(e){s.call(o,t,e)}),n(t,"keyup",function(e){13===e.keyCode&&s.call(o,t,e)}.bind(this))}},{"../events/on":4,"../util/clone":20}],12:[function(e,t,o){var n=e("../events/on"),s=e("../util/clone"),i="data-pjax-state",r=function(e,t){if(!a(t)){var o=s(this.options),n=function(e,t){if(1<t.which||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)return"modifier";if(e.protocol!==window.location.protocol||e.host!==window.location.host)return"external";if(e.hash&&e.href.replace(e.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(e.href===window.location.href.split("#")[0]+"#")return"anchor-empty"}(e,t);if(n)e.setAttribute(i,n);else{if(t.preventDefault(),this.options.currentUrlFullReload&&e.href===window.location.href.split("#")[0])return e.setAttribute(i,"reload"),void this.reload();e.setAttribute(i,"load"),o.triggerElement=e,this.loadUrl(e.href,o)}}};var a=function(e){return e.defaultPrevented||!1===e.returnValue};t.exports=function(t){var o=this;t.setAttribute(i,""),n(t,"click",function(e){r.call(o,t,e)}),n(t,"keyup",function(e){13===e.keyCode&&r.call(o,t,e)}.bind(this))}},{"../events/on":4,"../util/clone":20}],13:[function(e,t,o){var l=e("../util/clone.js"),c=e("../uniqueid.js"),u=e("../events/trigger.js");t.exports=function(e,t,o,n){if((n=l(n||this.options)).request=t,!1!==e){var s=window.history.state||{};window.history.replaceState({url:s.url||window.location.href,title:s.title||document.title,uid:s.uid||c(),scrollPos:[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]},document.title,window.location);var i=o;t.responseURL?o!==t.responseURL&&(o=t.responseURL):t.getResponseHeader("X-PJAX-URL")?o=t.getResponseHeader("X-PJAX-URL"):t.getResponseHeader("X-XHR-Redirected-To")&&(o=t.getResponseHeader("X-XHR-Redirected-To"));var r=document.createElement("a");r.href=i;var a=r.hash;r.href=o,a&&!r.hash&&(r.hash=a,o=r.href),this.state.href=o,this.state.options=n;try{this.loadContent(e,this.options)}catch(e){if(u(document,"pjax:error",n),this.options.debug)throw e;return console&&console.error&&console.error("Pjax switch fail: ",e),this.latestChance(o)}}else u(document,"pjax:complete pjax:error",n)}},{"../events/trigger.js":5,"../uniqueid.js":19,"../util/clone.js":20}],14:[function(e,t,o){t.exports=function(){this.options.debug&&console&&("function"==typeof console.log?console.log.apply(console,arguments):console.log&&console.log(arguments))}},{}],15:[function(e,t,o){var n="data-pjax-state";t.exports=function(e){switch(e.tagName.toLowerCase()){case"a":e.hasAttribute(n)||this.attachLink(e);break;case"form":e.hasAttribute(n)||this.attachForm(e);break;default:throw"Pjax can only be applied on <a> or <form> submit"}}},{}],16:[function(e,t,o){var d=e("./util/update-query-string");t.exports=function(t,o,n){var e,s=(o=o||{}).requestOptions||{},i=(s.requestMethod||"GET").toUpperCase(),r=s.requestParams||null,a=s.formData||null,l=null,c=new XMLHttpRequest,u=o.timeout||0;if(c.onreadystatechange=function(){4===c.readyState&&(200===c.status?n(c.responseText,c,t,o):0!==c.status&&n(null,c,t,o))},c.onerror=function(e){console.log(e),n(null,c,t,o)},c.ontimeout=function(){n(null,c,t,o)},r&&r.length)switch(e=r.map(function(e){return e.name+"="+e.value}).join("&"),i){case"GET":t=t.split("?")[0],t+="?"+e;break;case"POST":l=e}else a&&(l=a);return o.cacheBust&&(t=d(t,"t",Date.now())),c.open(i,t,!0),c.timeout=u,c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("X-PJAX","true"),c.setRequestHeader("X-PJAX-Selectors",JSON.stringify(o.selectors)),l&&"POST"===i&&c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send(l),c}},{"./util/update-query-string":24}],17:[function(e,t,o){var n=e("./foreach-els"),u=e("./switches");t.exports=function(r,a,e,t,o,l){var c=[];e.forEach(function(s){var e=t.querySelectorAll(s),i=o.querySelectorAll(s);if(this.log&&this.log("Pjax switch",s,e,i),e.length!==i.length)throw"DOM doesn’t look the same on new loaded page: ’"+s+"’ - new "+e.length+", old "+i.length;n(e,function(e,t){var o=i[t];this.log&&this.log("newEl",e,"oldEl",o);var n=r[s]?r[s].bind(this,o,e,l,a[s]):u.outerHTML.bind(this,o,e,l);c.push(n)},this)},this),this.state.numPendingSwitches=c.length,c.forEach(function(e){e()})}},{"./foreach-els":7,"./switches":18}],18:[function(e,t,o){var d=e("./events/on.js");t.exports={outerHTML:function(e,t){e.outerHTML=t.outerHTML,this.onSwitch()},innerHTML:function(e,t){e.innerHTML=t.innerHTML,""===t.className?e.removeAttribute("class"):e.className=t.className,this.onSwitch()},switchElementsAlt:function(e,t){if(e.innerHTML=t.innerHTML,t.hasAttributes())for(var o=t.attributes,n=0;n<o.length;n++)e.attributes.setNamedItem(o[n].cloneNode());this.onSwitch()},replaceNode:function(e,t){e.parentNode.replaceChild(t,e),this.onSwitch()},sideBySide:function(e,t,o,n){var s=Array.prototype.forEach,i=[],r=[],a=document.createDocumentFragment(),l="animationend webkitAnimationEnd MSAnimationEnd oanimationend",c=0,u=function(e){e.target===e.currentTarget&&--c<=0&&i&&(i.forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)}),r.forEach(function(e){e.className=e.className.replace(e.getAttribute("data-pjax-classes"),""),e.removeAttribute("data-pjax-classes")}),i=r=null,this.onSwitch())}.bind(this);n=n||{},s.call(e.childNodes,function(e){i.push(e),e.classList&&!e.classList.contains("js-Pjax-remove")&&(e.hasAttribute("data-pjax-classes")&&(e.className=e.className.replace(e.getAttribute("data-pjax-classes"),""),e.removeAttribute("data-pjax-classes")),e.classList.add("js-Pjax-remove"),n.callbacks&&n.callbacks.removeElement&&n.callbacks.removeElement(e),n.classNames&&(e.className+=" "+n.classNames.remove+" "+(o.backward?n.classNames.backward:n.classNames.forward)),c++,d(e,l,u,!0))}),s.call(t.childNodes,function(e){if(e.classList){var t="";n.classNames&&(t=" js-Pjax-add "+n.classNames.add+" "+(o.backward?n.classNames.forward:n.classNames.backward)),n.callbacks&&n.callbacks.addElement&&n.callbacks.addElement(e),e.className+=t,e.setAttribute("data-pjax-classes",t),r.push(e),a.appendChild(e),c++,d(e,l,u,!0)}}),e.className=t.className,e.appendChild(a)}}},{"./events/on.js":4}],19:[function(e,t,o){var n;t.exports=(n=0,function(){var e="pjax"+(new Date).getTime()+"_"+n;return n++,e})},{}],20:[function(e,t,o){t.exports=function(e){if(null===e||"object"!=typeof e)return e;var t=e.constructor();for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}},{}],21:[function(e,t,o){t.exports=function(e,t,o){for(var n=0;n<t.length;n++)for(var s=e.querySelectorAll(t[n]),i=0;i<s.length;i++)if(s[i].contains(o))return!0;return!1}},{}],22:[function(e,t,o){t.exports=function(e){if(null==e)return null;for(var t=Object(e),o=1;o<arguments.length;o++){var n=arguments[o];if(null!=n)for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t}},{}],23:[function(e,t,o){t.exports=function(){}},{}],24:[function(e,t,o){t.exports=function(e,t,o){var n=new RegExp("([?&])"+t+"=.*?(&|$)","i"),s=-1!==e.indexOf("?")?"&":"?";return e.match(n)?e.replace(n,"$1"+t+"="+o+"$2"):e+s+t+"="+o}},{}]},{},[1])(1)}),function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.svg4everybody=t()}):"object"==typeof module&&module.exports?module.exports=t():e.svg4everybody=t()}(this,function(){function w(e,t,o){if(o){var n=document.createDocumentFragment(),s=!t.hasAttribute("viewBox")&&o.getAttribute("viewBox");s&&t.setAttribute("viewBox",s);for(var i=o.cloneNode(!0);i.childNodes.length;)n.appendChild(i.firstChild);e.appendChild(n)}}function b(n){n.onreadystatechange=function(){if(4===n.readyState){var o=n._cachedDocument;o||((o=n._cachedDocument=document.implementation.createHTMLDocument("")).body.innerHTML=n.responseText,n._cachedTarget={}),n._embeds.splice(0).map(function(e){var t=n._cachedTarget[e.id];t||(t=n._cachedTarget[e.id]=o.getElementById(e.id)),w(e.parent,e.svg,t)})}},n.onreadystatechange()}function v(e){for(var t=e;"svg"!==t.nodeName.toLowerCase()&&(t=t.parentNode););return t}return function(e){var u,d=Object(e),t=window.top!==window.self;u="polyfill"in d?d.polyfill:/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent)||(navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/)||[])[1]<10547||(navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/)||[])[1]<537||/\bEdge\/.(\d+)\b/.test(navigator.userAgent)&&t;var h={},f=window.requestAnimationFrame||setTimeout,p=document.getElementsByTagName("use"),m=0;u&&function e(){for(var t=0;t<p.length;){var o=p[t],n=o.parentNode,s=v(n),i=o.getAttribute("xlink:href")||o.getAttribute("href");if(!i&&d.attributeName&&(i=o.getAttribute(d.attributeName)),s&&i){if(u)if(!d.validate||d.validate(i,s,o)){n.removeChild(o);var r=i.split("#"),a=r.shift(),l=r.join("#");if(a.length){var c=h[a];c||((c=h[a]=new XMLHttpRequest).open("GET",a),c.send(),c._embeds=[]),c._embeds.push({parent:n,svg:s,id:l}),b(c)}else w(n,s,document.getElementById(l))}else++t,++m}else++t}(!p.length||0<p.length-m)&&f(e,67)}()}});