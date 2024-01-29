const f={context:void 0,registry:void 0};function j(e){f.context=e}function z(){return{...f.context,id:`${f.context.id}${f.context.count++}-`,count:0}}const ee=(e,t)=>e===t,T={equals:ee};let q=X;const x=1,$=2,R={owned:null,cleanups:null,context:null,owner:null};var g=null;let k=null,d=null,y=null,m=null,M=0;function te(e,t){const n=d,s=g,i=e.length===0,l=t===void 0?s:t,r=i?R:{owned:null,cleanups:null,context:l?l.context:null,owner:l},o=i?e:()=>e(()=>w(()=>O(r)));g=r,d=null;try{return C(o,!0)}finally{d=n,g=s}}function Me(e,t){t=t?Object.assign({},T,t):T;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),K(n,i));return[Y.bind(n),s]}function A(e,t,n){const s=I(e,t,!1,x);E(s)}function ne(e,t,n){q=le;const s=I(e,t,!1,x);(!n||!n.render)&&(s.user=!0),m?m.push(s):E(s)}function B(e,t,n){n=n?Object.assign({},T,n):T;const s=I(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,E(s),Y.bind(s)}function w(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function Oe(e){ne(()=>w(e))}function ke(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function Y(){if(this.sources&&this.state)if(this.state===x)E(this);else{const e=y;y=null,C(()=>P(this),!1),y=e}if(d){const e=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(e)):(d.sources=[this],d.sourceSlots=[e]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function K(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&C(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],r=k&&k.running;r&&k.disposed.has(l),(r?!l.tState:!l.state)&&(l.pure?y.push(l):m.push(l),l.observers&&v(l)),r||(l.state=x)}if(y.length>1e6)throw y=[],new Error},!1)),t}function E(e){if(!e.fn)return;O(e);const t=M;se(e,e.value,t)}function se(e,t,n){let s;const i=g,l=d;d=g=e;try{s=e.fn(t)}catch(r){return e.pure&&(e.state=x,e.owned&&e.owned.forEach(O),e.owned=null),e.updatedAt=n+1,W(r)}finally{d=l,g=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?K(e,s):e.value=s,e.updatedAt=n)}function I(e,t,n,s=x,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:g?g.context:null,pure:n};return g===null||g!==R&&(g.owned?g.owned.push(l):g.owned=[l]),l}function L(e){if(e.state===0)return;if(e.state===$)return P(e);if(e.suspense&&w(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<M);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===x)E(e);else if(e.state===$){const s=y;y=null,C(()=>P(e,t[0]),!1),y=s}}function C(e,t){if(y)return e();let n=!1;t||(y=[]),m?n=!0:m=[],M++;try{const s=e();return ie(n),s}catch(s){n||(m=null),y=null,W(s)}}function ie(e){if(y&&(X(y),y=null),e)return;const t=m;m=null,t.length&&C(()=>q(t),!1)}function X(e){for(let t=0;t<e.length;t++)L(e[t])}function le(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:L(s)}if(f.context){if(f.count){f.effects||(f.effects=[]),f.effects.push(...e.slice(0,n));return}else f.effects&&(e=[...f.effects,...e],n+=f.effects.length,delete f.effects);j()}for(t=0;t<n;t++)L(e[t])}function P(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const i=s.state;i===x?s!==t&&(!s.updatedAt||s.updatedAt<M)&&L(s):i===$&&P(s,t)}}}function v(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=$,n.pure?y.push(n):m.push(n),n.observers&&v(n))}}function O(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),r=n.observerSlots.pop();s<i.length&&(l.sourceSlots[r]=s,i[s]=l,n.observerSlots[s]=r)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)O(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function oe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function W(e,t=g){throw oe(e)}let Q=!1;function re(){Q=!0}function je(e,t){if(Q&&f.context){const n=f.context;j(z());const s=w(()=>e(t||{}));return j(n),s}return w(()=>e(t||{}))}const fe=e=>`Stale read from <${e}>.`;function He(e){const t=e.keyed,n=B(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return B(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?w(()=>i(t?s:()=>{if(!w(n))throw fe("Show");return e.when})):i}return e.fallback},void 0,void 0)}const ce=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],ue=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...ce]),ae=new Set(["innerHTML","textContent","innerText","children"]),de=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),he=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function ge(e,t){const n=he[e];return typeof n=="object"?n[t]?n.$:void 0:n}const ye=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),De=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),me={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function we(e,t,n){let s=n.length,i=t.length,l=s,r=0,o=0,c=t[i-1].nextSibling,u=null;for(;r<i||o<l;){if(t[r]===n[o]){r++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===r){const h=l<s?o?n[o-1].nextSibling:n[l-o]:c;for(;o<l;)e.insertBefore(n[o++],h)}else if(l===o)for(;r<i;)(!u||!u.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[o]===t[i-1]){const h=t[--i].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--l],h),t[i]=n[l]}else{if(!u){u=new Map;let a=o;for(;a<l;)u.set(n[a],a++)}const h=u.get(t[r]);if(h!=null)if(o<h&&h<l){let a=r,b=1,N;for(;++a<i&&a<l&&!((N=u.get(t[a]))==null||N!==h+b);)b++;if(b>h-o){const Z=t[r];for(;o<h;)e.insertBefore(n[o++],Z)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const U="_$DX_DELEGATE";function be(e,t,n,s={}){let i;return te(l=>{i=l,t===document?e():Ne(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function Ie(e,t,n){let s;const i=()=>{const r=document.createElement("template");return r.innerHTML=e,n?r.content.firstChild.firstChild:r.content.firstChild},l=t?()=>w(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return l.cloneNode=l,l}function xe(e,t=window.document){const n=t[U]||(t[U]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,J))}}function Be(e,t,n){!f.context&&(e[t]=n)}function H(e,t,n){f.context||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function pe(e,t,n,s){f.context||(s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s))}function Ae(e,t){f.context||(t==null?e.removeAttribute("class"):e.className=t)}function Se(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n)}function Ee(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,r;for(l=0,r=i.length;l<r;l++){const o=i[l];!o||o==="undefined"||t[o]||(F(e,o,!1),delete n[o])}for(l=0,r=s.length;l<r;l++){const o=s[l],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(F(e,o,!0),n[o]=c)}return n}function Ce(e,t,n){if(!t)return n?H(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function Ue(e,t={},n,s){const i={};return s||A(()=>i.children=S(e,t.children,i.children)),A(()=>t.ref&&t.ref(e)),A(()=>Te(e,t,n,!0,i,!0)),i}function Fe(e,t){const n=e[t];return Object.defineProperty(e,t,{get(){return n()},enumerable:!0}),e}function Ge(e,t,n){return w(()=>e(t,n))}function Ne(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return S(e,t,s,n);A(i=>S(e,t(),i,n),s)}function Te(e,t,n,s,i={},l=!1){t||(t={});for(const r in i)if(!(r in t)){if(r==="children")continue;i[r]=G(e,r,null,i[r],n,l)}for(const r in t){if(r==="children"){s||S(e,t.children);continue}const o=t[r];i[r]=G(e,r,o,i[r],n,l)}}function $e(e,t,n={}){f.completed=globalThis._$HY.completed,f.events=globalThis._$HY.events,f.load=i=>globalThis._$HY.r[i],f.has=i=>i in globalThis._$HY.r,f.gather=i=>V(t,i),f.registry=new Map,f.context={id:n.renderId||"",count:0},V(t,n.renderId);const s=be(e,t,[...t.childNodes],n);return f.context=null,s}function _e(e){let t,n;return!f.context||!(t=f.registry.get(n=Pe()))?e():(f.completed&&f.completed.add(t),f.registry.delete(n),t)}function Ve(e){let t=e,n=0,s=[];if(f.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="$")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function qe(){f.events&&!f.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=f;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;J(s),t.shift()}}),f.events.queued=!0)}function Le(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function F(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function G(e,t,n,s,i,l){let r,o,c,u,h;if(t==="style")return Ce(e,n,s);if(t==="classList")return Ee(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const a=t.slice(3);s&&e.removeEventListener(a,s),n&&e.addEventListener(a,n)}else if(t.slice(0,10)==="oncapture:"){const a=t.slice(10);s&&e.removeEventListener(a,s,!0),n&&e.addEventListener(a,n,!0)}else if(t.slice(0,2)==="on"){const a=t.slice(2).toLowerCase(),b=ye.has(a);if(!b&&s){const N=Array.isArray(s)?s[0]:s;e.removeEventListener(a,N)}(b||n)&&(Se(e,a,n,b),b&&xe([a]))}else if(t.slice(0,5)==="attr:")H(e,t.slice(5),n);else if((h=t.slice(0,5)==="prop:")||(c=ae.has(t))||!i&&((u=ge(t,e.tagName))||(o=ue.has(t)))||(r=e.nodeName.includes("-"))){if(h)t=t.slice(5),o=!0;else if(f.context)return n;t==="class"||t==="className"?Ae(e,n):r&&!o&&!c?e[Le(t)]=n:e[u||t]=n}else{const a=i&&t.indexOf(":")>-1&&me[t.split(":")[0]];a?pe(e,a,t,n):H(e,de[t]||t,n)}return n}function J(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),f.registry&&!f.done&&(f.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function S(e,t,n,s,i){if(f.context){!n&&(n=[...e.childNodes]);let o=[];for(let c=0;c<n.length;c++){const u=n[c];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():o.push(u)}n=o}for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(f.context)return n;if(l==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=p(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(f.context)return n;n=p(e,n,s)}else{if(l==="function")return A(()=>{let o=t();for(;typeof o=="function";)o=o();n=S(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(D(o,t,n,i))return A(()=>n=S(e,o,n,s,!0)),()=>n;if(f.context){if(!o.length)return n;if(s===void 0)return[...e.childNodes];let u=o[0],h=[u];for(;(u=u.nextSibling)!==s;)h.push(u);return n=h}if(o.length===0){if(n=p(e,n,s),r)return n}else c?n.length===0?_(e,o,s):we(e,n,o):(n&&p(e),_(e,o));n=o}else if(t.nodeType){if(f.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=p(e,n,s,t);p(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function D(e,t,n,s){let i=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],c=n&&n[l],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=D(e,o,c)||i;else if(u==="function")if(s){for(;typeof o=="function";)o=o();i=D(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||i}else e.push(o),i=!0;else{const h=String(o);c&&c.nodeType===3&&c.data===h?e.push(c):e.push(document.createTextNode(h))}}return i}function _(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function p(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(i!==o){const c=o.parentNode===e;!l&&!r?c?e.replaceChild(i,o):e.insertBefore(i,n):c&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}function V(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],l=i.getAttribute("data-hk");(!t||l.startsWith(t))&&!f.registry.has(l)&&f.registry.set(l,i)}}function Pe(){const e=f.context;return`${e.id}${e.count++}`}const Re=(...e)=>(re(),$e(...e));export{He as S,Ve as a,je as b,Me as c,xe as d,A as e,Ae as f,_e as g,be as h,Ne as i,Re as j,Ue as k,Te as l,Fe as m,De as n,Oe as o,Be as p,ke as q,qe as r,H as s,Ie as t,Ge as u,Ee as v};
