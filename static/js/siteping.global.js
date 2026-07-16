var SitePing=(function(exports){'use strict';var Zu=Object.create;var zn=Object.defineProperty;var qu=Object.getOwnPropertyDescriptor;var Ah=Object.getOwnPropertyNames;var eh=Object.getPrototypeOf,th=Object.prototype.hasOwnProperty;var dA=(o,n)=>()=>(o&&(n=o(o=0)),n);var rh=(o,n)=>()=>(n||o((n={exports:{}}).exports,n),n.exports),ve=(o,n)=>{for(var s in n)zn(o,s,{get:n[s],enumerable:true});},nh=(o,n,s,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let c of Ah(n))!th.call(o,c)&&c!==s&&zn(o,c,{get:()=>n[c],enumerable:!(a=qu(n,c))||a.enumerable});return o};var sh=(o,n,s)=>(s=o!=null?Zu(eh(o)):{},nh(zn(s,"default",{value:o,enumerable:true}),o));function G(o){let a=document.createRange().createContextualFragment(o).firstElementChild;if(!a||a.nodeName.toLowerCase()!=="svg")throw new Error("[siteping] Invalid SVG string");for(let c of [...a.attributes])c.name.startsWith("on")&&a.removeAttribute(c.name);for(let c of a.querySelectorAll("*"))for(let p of [...c.attributes])p.name.startsWith("on")&&c.removeAttribute(p.name);return a}function b(o,n){let s=document.createElement(o);if(n)for(let[a,c]of Object.entries(n))a==="class"?s.className=c:a==="style"?s.style.cssText=c:s.setAttribute(a,c);return s}function F(o,n){o.textContent=n;}function ye(o){let n=Array.from(o.childNodes).map(s=>s.cloneNode(true));return o.disabled=true,o.replaceChildren(b("div",{class:"sp-spinner sp-spinner--sm"})),()=>{o.replaceChildren(...n),o.disabled=false;}}function yr(o,n="en"){let s=Date.now()-new Date(o).getTime(),a=Math.floor(s/1e3);if(a<60)return new Intl.RelativeTimeFormat(n,{numeric:"auto"}).format(0,"second");let c=new Intl.RelativeTimeFormat(n,{numeric:"always",style:"narrow"}),p=Math.floor(a/60);if(p<60)return c.format(-p,"minute");let u=Math.floor(p/60);if(u<24)return c.format(-u,"hour");let B=Math.floor(u/24);return B<7?c.format(-B,"day"):new Date(o).toLocaleDateString(n)}var HA=dA(()=>{});var rs,ns,ss,Qr,Lo,Fr,xr,Ur,Er,Hr,is,To,Ko,Do,os,Mo,Ro,kr=dA(()=>{rs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',ns='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',ss='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',Qr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Lo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',Fr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',xr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',Ur='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',Er='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 9h2"/><path d="M3 9h2"/><path d="M19 13h2"/><path d="M3 13h2"/><path d="M19 17h2"/><path d="M3 17h2"/><path d="M10 2h4"/></svg>',Hr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',is='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',To='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>',Ko='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',Do='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',os='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',Mo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',Ro='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';});function bh(o){if(wh.test(o))return o;let n=Oo.test(o)?o.match(Oo):null;return n?`#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}`:mh.test(o)?o.slice(0,7):(console.warn(`[siteping] Invalid accentColor "${o}" \u2014 only hex colors (#RGB, #RRGGBB, #RRGGBBAA) are supported. Using default.`),No)}function Ch(o,n){let s=Math.max(0,Math.round(parseInt(o.slice(1,3),16)*(1-n))),a=Math.max(0,Math.round(parseInt(o.slice(3,5),16)*(1-n))),c=Math.max(0,Math.round(parseInt(o.slice(5,7),16)*(1-n)));return `#${s.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}${c.toString(16).padStart(2,"0")}`}function vh(){return typeof window>"u"?false:window.matchMedia("(prefers-color-scheme: dark)").matches}function yh(o){return o==="dark"||o==="auto"&&vh()?"dark":"light"}function Po(o=No,n){let s=bh(o),a=Ch(s,.15);return yh(n)==="dark"?{accent:s,accentLight:s+"22",accentDark:a,accentGlow:s+"44",accentGradient:`linear-gradient(135deg, ${s}, ${a})`,bg:"#0f172a",bgHover:"#1e293b",text:"#f1f5f9",textSecondary:"#94a3b8",textTertiary:"#64748b",border:"#334155",shadow:"rgba(0, 0, 0, 0.3)",glassBg:"rgba(15, 23, 42, 0.78)",glassBgHeavy:"rgba(15, 23, 42, 0.88)",glassBorder:"rgba(51, 65, 85, 0.5)",glassBorderSubtle:"rgba(51, 65, 85, 0.3)",typeQuestion:"#60a5fa",typeChange:"#fbbf24",typeBug:"#f87171",typeOther:"#94a3b8",typeQuestionBg:"rgba(59, 130, 246, 0.15)",typeChangeBg:"rgba(245, 158, 11, 0.15)",typeBugBg:"rgba(239, 68, 68, 0.15)",typeOtherBg:"rgba(100, 116, 139, 0.15)",statusOpen:"#4ade80",statusOpenBg:"rgba(74, 222, 128, 0.15)",statusResolved:"#94a3b8",statusResolvedBg:"rgba(148, 163, 184, 0.15)"}:{accent:s,accentLight:s+"14",accentDark:a,accentGlow:s+"33",accentGradient:`linear-gradient(135deg, ${s}, ${a})`,bg:"#ffffff",bgHover:"#f8f9fb",text:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",border:"#e2e8f0",shadow:"rgba(0, 0, 0, 0.06)",glassBg:"rgba(255, 255, 255, 0.72)",glassBgHeavy:"rgba(255, 255, 255, 0.85)",glassBorder:"rgba(255, 255, 255, 0.35)",glassBorderSubtle:"rgba(255, 255, 255, 0.18)",typeQuestion:"#3b82f6",typeChange:"#b45309",typeBug:"#ef4444",typeOther:"#64748b",typeQuestionBg:"#eff6ff",typeChangeBg:"#fffbeb",typeBugBg:"#fef2f2",typeOtherBg:"#f8fafc",statusOpen:"#16a34a",statusOpenBg:"#f0fdf4",statusResolved:"#64748b",statusResolvedBg:"#f1f5f9"}}function SA(o,n){switch(o){case "question":return n.typeQuestion;case "change":return n.typeChange;case "bug":return n.typeBug;default:return n.typeOther}}function $A(o,n){switch(o){case "question":return n.typeQuestionBg;case "change":return n.typeChangeBg;case "bug":return n.typeBugBg;default:return n.typeOtherBg}}function _o(o){return `
    --sp-accent: ${o.accent};
    --sp-accent-light: ${o.accentLight};
    --sp-accent-dark: ${o.accentDark};
    --sp-accent-glow: ${o.accentGlow};
    --sp-accent-gradient: ${o.accentGradient};
    --sp-bg: ${o.bg};
    --sp-bg-hover: ${o.bgHover};
    --sp-text: ${o.text};
    --sp-text-secondary: ${o.textSecondary};
    --sp-text-tertiary: ${o.textTertiary};
    --sp-border: ${o.border};
    --sp-shadow: ${o.shadow};
    --sp-glass-bg: ${o.glassBg};
    --sp-glass-bg-heavy: ${o.glassBgHeavy};
    --sp-glass-border: ${o.glassBorder};
    --sp-glass-border-subtle: ${o.glassBorderSubtle};
    --sp-type-question: ${o.typeQuestion};
    --sp-type-change: ${o.typeChange};
    --sp-type-bug: ${o.typeBug};
    --sp-type-other: ${o.typeOther};
    --sp-type-question-bg: ${o.typeQuestionBg};
    --sp-type-change-bg: ${o.typeChangeBg};
    --sp-type-bug-bg: ${o.typeBugBg};
    --sp-type-other-bg: ${o.typeOtherBg};
    --sp-radius: 12px;
    --sp-radius-lg: 16px;
    --sp-radius-xl: 20px;
    --sp-radius-full: 9999px;
    --sp-blur: 20px;
    --sp-blur-heavy: 32px;
    --sp-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
    --sp-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04);
    --sp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
    --sp-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04);
    --sp-shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);
    --sp-font: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  `}var No,wh,Oo,mh,ce=dA(()=>{No="#0066ff",wh=/^#[0-9a-fA-F]{6}$/,Oo=/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,mh=/^#[0-9a-fA-F]{8}$/;});var Go=rh((as,ls)=>{(function(o,n){typeof as=="object"&&typeof ls<"u"?ls.exports=n():typeof define=="function"&&define.amd?define(n):(o=typeof globalThis<"u"?globalThis:o||self,o.html2canvas=n());})(as,(function(){var o=function(e,A){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t;}||function(r,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i]);},o(e,A)};function n(e,A){if(typeof A!="function"&&A!==null)throw new TypeError("Class extends value "+String(A)+" is not a constructor or null");o(e,A);function r(){this.constructor=e;}e.prototype=A===null?Object.create(A):(r.prototype=A.prototype,new r);}var s=function(){return s=Object.assign||function(A){for(var r,t=1,i=arguments.length;t<i;t++){r=arguments[t];for(var l in r)Object.prototype.hasOwnProperty.call(r,l)&&(A[l]=r[l]);}return A},s.apply(this,arguments)};function a(e,A,r,t){function i(l){return l instanceof r?l:new r(function(d){d(l);})}return new(r||(r=Promise))(function(l,d){function g(w){try{f(t.next(w));}catch(C){d(C);}}function h(w){try{f(t.throw(w));}catch(C){d(C);}}function f(w){w.done?l(w.value):i(w.value).then(g,h);}f((t=t.apply(e,[])).next());})}function c(e,A){var r={label:0,sent:function(){if(l[0]&1)throw l[1];return l[1]},trys:[],ops:[]},t,i,l,d;return d={next:g(0),throw:g(1),return:g(2)},typeof Symbol=="function"&&(d[Symbol.iterator]=function(){return this}),d;function g(f){return function(w){return h([f,w])}}function h(f){if(t)throw new TypeError("Generator is already executing.");for(;r;)try{if(t=1,i&&(l=f[0]&2?i.return:f[0]?i.throw||((l=i.return)&&l.call(i),0):i.next)&&!(l=l.call(i,f[1])).done)return l;switch(i=0,l&&(f=[f[0]&2,l.value]),f[0]){case 0:case 1:l=f;break;case 4:return r.label++,{value:f[1],done:!1};case 5:r.label++,i=f[1],f=[0];continue;case 7:f=r.ops.pop(),r.trys.pop();continue;default:if(l=r.trys,!(l=l.length>0&&l[l.length-1])&&(f[0]===6||f[0]===2)){r=0;continue}if(f[0]===3&&(!l||f[1]>l[0]&&f[1]<l[3])){r.label=f[1];break}if(f[0]===6&&r.label<l[1]){r.label=l[1],l=f;break}if(l&&r.label<l[2]){r.label=l[2],r.ops.push(f);break}l[2]&&r.ops.pop(),r.trys.pop();continue}f=A.call(e,r);}catch(w){f=[6,w],i=0;}finally{t=l=0;}if(f[0]&5)throw f[1];return {value:f[0]?f[1]:void 0,done:true}}}function p(e,A,r){if(arguments.length===2)for(var t=0,i=A.length,l;t<i;t++)(l||!(t in A))&&(l||(l=Array.prototype.slice.call(A,0,t)),l[t]=A[t]);return e.concat(l||A)}for(var u=(function(){function e(A,r,t,i){this.left=A,this.top=r,this.width=t,this.height=i;}return e.prototype.add=function(A,r,t,i){return new e(this.left+A,this.top+r,this.width+t,this.height+i)},e.fromClientRect=function(A,r){return new e(r.left+A.windowBounds.left,r.top+A.windowBounds.top,r.width,r.height)},e.fromDOMRectList=function(A,r){var t=Array.from(r).find(function(i){return i.width!==0});return t?new e(t.left+A.windowBounds.left,t.top+A.windowBounds.top,t.width,t.height):e.EMPTY},e.EMPTY=new e(0,0,0,0),e})(),B=function(e,A){return u.fromClientRect(e,A.getBoundingClientRect())},m=function(e){var A=e.body,r=e.documentElement;if(!A||!r)throw new Error("Unable to get document size");var t=Math.max(Math.max(A.scrollWidth,r.scrollWidth),Math.max(A.offsetWidth,r.offsetWidth),Math.max(A.clientWidth,r.clientWidth)),i=Math.max(Math.max(A.scrollHeight,r.scrollHeight),Math.max(A.offsetHeight,r.offsetHeight),Math.max(A.clientHeight,r.clientHeight));return new u(0,0,t,i)},y=function(e){for(var A=[],r=0,t=e.length;r<t;){var i=e.charCodeAt(r++);if(i>=55296&&i<=56319&&r<t){var l=e.charCodeAt(r++);(l&64512)===56320?A.push(((i&1023)<<10)+(l&1023)+65536):(A.push(i),r--);}else A.push(i);}return A},v=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];if(String.fromCodePoint)return String.fromCodePoint.apply(String,e);var r=e.length;if(!r)return "";for(var t=[],i=-1,l="";++i<r;){var d=e[i];d<=65535?t.push(d):(d-=65536,t.push((d>>10)+55296,d%1024+56320)),(i+1===r||t.length>16384)&&(l+=String.fromCharCode.apply(String,t),t.length=0);}return l},x="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",U=typeof Uint8Array>"u"?[]:new Uint8Array(256),N=0;N<x.length;N++)U[x.charCodeAt(N)]=N;for(var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",P=typeof Uint8Array>"u"?[]:new Uint8Array(256),V=0;V<M.length;V++)P[M.charCodeAt(V)]=V;for(var eA=function(e){var A=e.length*.75,r=e.length,t,i=0,l,d,g,h;e[e.length-1]==="="&&(A--,e[e.length-2]==="="&&A--);var f=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(A):new Array(A),w=Array.isArray(f)?f:new Uint8Array(f);for(t=0;t<r;t+=4)l=P[e.charCodeAt(t)],d=P[e.charCodeAt(t+1)],g=P[e.charCodeAt(t+2)],h=P[e.charCodeAt(t+3)],w[i++]=l<<2|d>>4,w[i++]=(d&15)<<4|g>>2,w[i++]=(g&3)<<6|h&63;return f},H=function(e){for(var A=e.length,r=[],t=0;t<A;t+=2)r.push(e[t+1]<<8|e[t]);return r},R=function(e){for(var A=e.length,r=[],t=0;t<A;t+=4)r.push(e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]);return r},_=5,$=11,j=2,lA=$-_,z=65536>>_,fA=1<<_,tA=fA-1,VA=1024>>_,kt=z+VA,zA=kt,en=32,It=zA+en,Ge=65536>>$,tn=1<<lA,Ve=tn-1,St=function(e,A,r){return e.slice?e.slice(A,r):new Uint16Array(Array.prototype.slice.call(e,A,r))},Xe=function(e,A,r){return e.slice?e.slice(A,r):new Uint32Array(Array.prototype.slice.call(e,A,r))},rn=function(e,A){var r=eA(e),t=Array.isArray(r)?R(r):new Uint32Array(r),i=Array.isArray(r)?H(r):new Uint16Array(r),l=24,d=St(i,l/2,t[4]/2),g=t[5]===2?St(i,(l+t[4])/2):Xe(t,Math.ceil((l+t[4])/4));return new Lt(t[0],t[1],t[2],t[3],d,g)},Lt=(function(){function e(A,r,t,i,l,d){this.initialValue=A,this.errorValue=r,this.highStart=t,this.highValueIndex=i,this.index=l,this.data=d;}return e.prototype.get=function(A){var r;if(A>=0){if(A<55296||A>56319&&A<=65535)return r=this.index[A>>_],r=(r<<j)+(A&tA),this.data[r];if(A<=65535)return r=this.index[z+(A-55296>>_)],r=(r<<j)+(A&tA),this.data[r];if(A<this.highStart)return r=It-Ge+(A>>$),r=this.index[r],r+=A>>_&Ve,r=this.index[r],r=(r<<j)+(A&tA),this.data[r];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue},e})(),Ye="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",O=typeof Uint8Array>"u"?[]:new Uint8Array(256),sA=0;sA<Ye.length;sA++)O[Ye.charCodeAt(sA)]=sA;var uA="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",LA=50,ZA=1,QA=2,ue=3,vA=4,Fe=5,Tt=7,OA=8,ks=9,qA=10,nn=11,Is=12,sn=13,$a=14,Je=15,on=16,Kt=17,We=18,za=19,Ss=20,an=21,je=22,ln=23,xe=24,kA=25,$e=26,ze=27,Ue=28,Za=29,he=30,qa=31,Dt=32,Mt=33,cn=34,dn=35,pn=36,Ze=37,un=38,Rt=39,Ot=40,hn=41,Ls=42,Al=43,el=[9001,65288],Ts="!",Z="\xD7",Nt="\xF7",gn=rn(uA),XA=[he,pn],Bn=[ZA,QA,ue,Fe],Ks=[qA,OA],Ds=[ze,$e],tl=Bn.concat(Ks),Ms=[un,Rt,Ot,cn,dn],rl=[Je,sn],nl=function(e,A){A===void 0&&(A="strict");var r=[],t=[],i=[];return e.forEach(function(l,d){var g=gn.get(l);if(g>LA?(i.push(true),g-=LA):i.push(false),["normal","auto","loose"].indexOf(A)!==-1&&[8208,8211,12316,12448].indexOf(l)!==-1)return t.push(d),r.push(on);if(g===vA||g===nn){if(d===0)return t.push(d),r.push(he);var h=r[d-1];return tl.indexOf(h)===-1?(t.push(t[d-1]),r.push(h)):(t.push(d),r.push(he))}if(t.push(d),g===qa)return r.push(A==="strict"?an:Ze);if(g===Ls||g===Za)return r.push(he);if(g===Al)return l>=131072&&l<=196605||l>=196608&&l<=262141?r.push(Ze):r.push(he);r.push(g);}),[t,r,i]},fn=function(e,A,r,t){var i=t[r];if(Array.isArray(e)?e.indexOf(i)!==-1:e===i)for(var l=r;l<=t.length;){l++;var d=t[l];if(d===A)return  true;if(d!==qA)break}if(i===qA)for(var l=r;l>0;){l--;var g=t[l];if(Array.isArray(e)?e.indexOf(g)!==-1:e===g)for(var h=r;h<=t.length;){h++;var d=t[h];if(d===A)return  true;if(d!==qA)break}if(g!==qA)break}return  false},Rs=function(e,A){for(var r=e;r>=0;){var t=A[r];if(t===qA)r--;else return t}return 0},sl=function(e,A,r,t,i){if(r[t]===0)return Z;var l=t-1;if(Array.isArray(i)&&i[l]===true)return Z;var d=l-1,g=l+1,h=A[l],f=d>=0?A[d]:0,w=A[g];if(h===QA&&w===ue)return Z;if(Bn.indexOf(h)!==-1)return Ts;if(Bn.indexOf(w)!==-1||Ks.indexOf(w)!==-1)return Z;if(Rs(l,A)===OA)return Nt;if(gn.get(e[l])===nn||(h===Dt||h===Mt)&&gn.get(e[g])===nn||h===Tt||w===Tt||h===ks||[qA,sn,Je].indexOf(h)===-1&&w===ks||[Kt,We,za,xe,Ue].indexOf(w)!==-1||Rs(l,A)===je||fn(ln,je,l,A)||fn([Kt,We],an,l,A)||fn(Is,Is,l,A))return Z;if(h===qA)return Nt;if(h===ln||w===ln)return Z;if(w===on||h===on)return Nt;if([sn,Je,an].indexOf(w)!==-1||h===$a||f===pn&&rl.indexOf(h)!==-1||h===Ue&&w===pn||w===Ss||XA.indexOf(w)!==-1&&h===kA||XA.indexOf(h)!==-1&&w===kA||h===ze&&[Ze,Dt,Mt].indexOf(w)!==-1||[Ze,Dt,Mt].indexOf(h)!==-1&&w===$e||XA.indexOf(h)!==-1&&Ds.indexOf(w)!==-1||Ds.indexOf(h)!==-1&&XA.indexOf(w)!==-1||[ze,$e].indexOf(h)!==-1&&(w===kA||[je,Je].indexOf(w)!==-1&&A[g+1]===kA)||[je,Je].indexOf(h)!==-1&&w===kA||h===kA&&[kA,Ue,xe].indexOf(w)!==-1)return Z;if([kA,Ue,xe,Kt,We].indexOf(w)!==-1)for(var C=l;C>=0;){var Q=A[C];if(Q===kA)return Z;if([Ue,xe].indexOf(Q)!==-1)C--;else break}if([ze,$e].indexOf(w)!==-1)for(var C=[Kt,We].indexOf(h)!==-1?d:l;C>=0;){var Q=A[C];if(Q===kA)return Z;if([Ue,xe].indexOf(Q)!==-1)C--;else break}if(un===h&&[un,Rt,cn,dn].indexOf(w)!==-1||[Rt,cn].indexOf(h)!==-1&&[Rt,Ot].indexOf(w)!==-1||[Ot,dn].indexOf(h)!==-1&&w===Ot||Ms.indexOf(h)!==-1&&[Ss,$e].indexOf(w)!==-1||Ms.indexOf(w)!==-1&&h===ze||XA.indexOf(h)!==-1&&XA.indexOf(w)!==-1||h===xe&&XA.indexOf(w)!==-1||XA.concat(kA).indexOf(h)!==-1&&w===je&&el.indexOf(e[g])===-1||XA.concat(kA).indexOf(w)!==-1&&h===We)return Z;if(h===hn&&w===hn){for(var L=r[l],E=1;L>0&&(L--,A[L]===hn);)E++;if(E%2!==0)return Z}return h===Dt&&w===Mt?Z:Nt},il=function(e,A){A||(A={lineBreak:"normal",wordBreak:"normal"});var r=nl(e,A.lineBreak),t=r[0],i=r[1],l=r[2];(A.wordBreak==="break-all"||A.wordBreak==="break-word")&&(i=i.map(function(g){return [kA,he,Ls].indexOf(g)!==-1?Ze:g}));var d=A.wordBreak==="keep-all"?l.map(function(g,h){return g&&e[h]>=19968&&e[h]<=40959}):void 0;return [t,i,d]},ol=(function(){function e(A,r,t,i){this.codePoints=A,this.required=r===Ts,this.start=t,this.end=i;}return e.prototype.slice=function(){return v.apply(void 0,this.codePoints.slice(this.start,this.end))},e})(),al=function(e,A){var r=y(e),t=il(r,A),i=t[0],l=t[1],d=t[2],g=r.length,h=0,f=0;return {next:function(){if(f>=g)return {done:true,value:null};for(var w=Z;f<g&&(w=sl(r,l,i,++f,d))===Z;);if(w!==Z||f===g){var C=new ol(r,w,h,f);return h=f,{value:C,done:false}}return {done:true,value:null}}}},ll=1,cl=2,qe=4,Os=8,Pt=10,Ns=47,At=92,dl=9,pl=32,_t=34,et=61,ul=35,hl=36,gl=37,Gt=39,Vt=40,tt=41,Bl=95,FA=45,fl=33,wl=60,ml=62,bl=64,Cl=91,vl=93,yl=61,Ql=123,Xt=63,Fl=125,Ps=124,xl=126,Ul=128,_s=65533,wn=42,ge=43,El=44,Hl=58,kl=59,rt=46,Il=0,Sl=8,Ll=11,Tl=14,Kl=31,Dl=127,NA=-1,Gs=48,Vs=97,Xs=101,Ml=102,Rl=117,Ol=122,Ys=65,Js=69,Ws=70,Nl=85,Pl=90,yA=function(e){return e>=Gs&&e<=57},_l=function(e){return e>=55296&&e<=57343},Ee=function(e){return yA(e)||e>=Ys&&e<=Ws||e>=Vs&&e<=Ml},Gl=function(e){return e>=Vs&&e<=Ol},Vl=function(e){return e>=Ys&&e<=Pl},Xl=function(e){return Gl(e)||Vl(e)},Yl=function(e){return e>=Ul},Yt=function(e){return e===Pt||e===dl||e===pl},Jt=function(e){return Xl(e)||Yl(e)||e===Bl},js=function(e){return Jt(e)||yA(e)||e===FA},Jl=function(e){return e>=Il&&e<=Sl||e===Ll||e>=Tl&&e<=Kl||e===Dl},Ae=function(e,A){return e!==At?false:A!==Pt},Wt=function(e,A,r){return e===FA?Jt(A)||Ae(A,r):Jt(e)?true:!!(e===At&&Ae(e,A))},mn=function(e,A,r){return e===ge||e===FA?yA(A)?true:A===rt&&yA(r):yA(e===rt?A:e)},Wl=function(e){var A=0,r=1;(e[A]===ge||e[A]===FA)&&(e[A]===FA&&(r=-1),A++);for(var t=[];yA(e[A]);)t.push(e[A++]);var i=t.length?parseInt(v.apply(void 0,t),10):0;e[A]===rt&&A++;for(var l=[];yA(e[A]);)l.push(e[A++]);var d=l.length,g=d?parseInt(v.apply(void 0,l),10):0;(e[A]===Js||e[A]===Xs)&&A++;var h=1;(e[A]===ge||e[A]===FA)&&(e[A]===FA&&(h=-1),A++);for(var f=[];yA(e[A]);)f.push(e[A++]);var w=f.length?parseInt(v.apply(void 0,f),10):0;return r*(i+g*Math.pow(10,-d))*Math.pow(10,h*w)},jl={type:2},$l={type:3},zl={type:4},Zl={type:13},ql={type:8},Ac={type:21},ec={type:9},tc={type:10},rc={type:11},nc={type:12},sc={type:14},jt={type:23},ic={type:1},oc={type:25},ac={type:24},lc={type:26},cc={type:27},dc={type:28},pc={type:29},uc={type:31},bn={type:32},$s=(function(){function e(){this._value=[];}return e.prototype.write=function(A){this._value=this._value.concat(y(A));},e.prototype.read=function(){for(var A=[],r=this.consumeToken();r!==bn;)A.push(r),r=this.consumeToken();return A},e.prototype.consumeToken=function(){var A=this.consumeCodePoint();switch(A){case _t:return this.consumeStringToken(_t);case ul:var r=this.peekCodePoint(0),t=this.peekCodePoint(1),i=this.peekCodePoint(2);if(js(r)||Ae(t,i)){var l=Wt(r,t,i)?cl:ll,d=this.consumeName();return {type:5,value:d,flags:l}}break;case hl:if(this.peekCodePoint(0)===et)return this.consumeCodePoint(),Zl;break;case Gt:return this.consumeStringToken(Gt);case Vt:return jl;case tt:return $l;case wn:if(this.peekCodePoint(0)===et)return this.consumeCodePoint(),sc;break;case ge:if(mn(A,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(A),this.consumeNumericToken();break;case El:return zl;case FA:var g=A,h=this.peekCodePoint(0),f=this.peekCodePoint(1);if(mn(g,h,f))return this.reconsumeCodePoint(A),this.consumeNumericToken();if(Wt(g,h,f))return this.reconsumeCodePoint(A),this.consumeIdentLikeToken();if(h===FA&&f===ml)return this.consumeCodePoint(),this.consumeCodePoint(),ac;break;case rt:if(mn(A,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(A),this.consumeNumericToken();break;case Ns:if(this.peekCodePoint(0)===wn)for(this.consumeCodePoint();;){var w=this.consumeCodePoint();if(w===wn&&(w=this.consumeCodePoint(),w===Ns))return this.consumeToken();if(w===NA)return this.consumeToken()}break;case Hl:return lc;case kl:return cc;case wl:if(this.peekCodePoint(0)===fl&&this.peekCodePoint(1)===FA&&this.peekCodePoint(2)===FA)return this.consumeCodePoint(),this.consumeCodePoint(),oc;break;case bl:var C=this.peekCodePoint(0),Q=this.peekCodePoint(1),L=this.peekCodePoint(2);if(Wt(C,Q,L)){var d=this.consumeName();return {type:7,value:d}}break;case Cl:return dc;case At:if(Ae(A,this.peekCodePoint(0)))return this.reconsumeCodePoint(A),this.consumeIdentLikeToken();break;case vl:return pc;case yl:if(this.peekCodePoint(0)===et)return this.consumeCodePoint(),ql;break;case Ql:return rc;case Fl:return nc;case Rl:case Nl:var E=this.peekCodePoint(0),k=this.peekCodePoint(1);return E===ge&&(Ee(k)||k===Xt)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(A),this.consumeIdentLikeToken();case Ps:if(this.peekCodePoint(0)===et)return this.consumeCodePoint(),ec;if(this.peekCodePoint(0)===Ps)return this.consumeCodePoint(),Ac;break;case xl:if(this.peekCodePoint(0)===et)return this.consumeCodePoint(),tc;break;case NA:return bn}return Yt(A)?(this.consumeWhiteSpace(),uc):yA(A)?(this.reconsumeCodePoint(A),this.consumeNumericToken()):Jt(A)?(this.reconsumeCodePoint(A),this.consumeIdentLikeToken()):{type:6,value:v(A)}},e.prototype.consumeCodePoint=function(){var A=this._value.shift();return typeof A>"u"?-1:A},e.prototype.reconsumeCodePoint=function(A){this._value.unshift(A);},e.prototype.peekCodePoint=function(A){return A>=this._value.length?-1:this._value[A]},e.prototype.consumeUnicodeRangeToken=function(){for(var A=[],r=this.consumeCodePoint();Ee(r)&&A.length<6;)A.push(r),r=this.consumeCodePoint();for(var t=false;r===Xt&&A.length<6;)A.push(r),r=this.consumeCodePoint(),t=true;if(t){var i=parseInt(v.apply(void 0,A.map(function(h){return h===Xt?Gs:h})),16),l=parseInt(v.apply(void 0,A.map(function(h){return h===Xt?Ws:h})),16);return {type:30,start:i,end:l}}var d=parseInt(v.apply(void 0,A),16);if(this.peekCodePoint(0)===FA&&Ee(this.peekCodePoint(1))){this.consumeCodePoint(),r=this.consumeCodePoint();for(var g=[];Ee(r)&&g.length<6;)g.push(r),r=this.consumeCodePoint();var l=parseInt(v.apply(void 0,g),16);return {type:30,start:d,end:l}}else return {type:30,start:d,end:d}},e.prototype.consumeIdentLikeToken=function(){var A=this.consumeName();return A.toLowerCase()==="url"&&this.peekCodePoint(0)===Vt?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===Vt?(this.consumeCodePoint(),{type:19,value:A}):{type:20,value:A}},e.prototype.consumeUrlToken=function(){var A=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===NA)return {type:22,value:""};var r=this.peekCodePoint(0);if(r===Gt||r===_t){var t=this.consumeStringToken(this.consumeCodePoint());return t.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===NA||this.peekCodePoint(0)===tt)?(this.consumeCodePoint(),{type:22,value:t.value}):(this.consumeBadUrlRemnants(),jt)}for(;;){var i=this.consumeCodePoint();if(i===NA||i===tt)return {type:22,value:v.apply(void 0,A)};if(Yt(i))return this.consumeWhiteSpace(),this.peekCodePoint(0)===NA||this.peekCodePoint(0)===tt?(this.consumeCodePoint(),{type:22,value:v.apply(void 0,A)}):(this.consumeBadUrlRemnants(),jt);if(i===_t||i===Gt||i===Vt||Jl(i))return this.consumeBadUrlRemnants(),jt;if(i===At)if(Ae(i,this.peekCodePoint(0)))A.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),jt;else A.push(i);}},e.prototype.consumeWhiteSpace=function(){for(;Yt(this.peekCodePoint(0));)this.consumeCodePoint();},e.prototype.consumeBadUrlRemnants=function(){for(;;){var A=this.consumeCodePoint();if(A===tt||A===NA)return;Ae(A,this.peekCodePoint(0))&&this.consumeEscapedCodePoint();}},e.prototype.consumeStringSlice=function(A){for(var r=5e4,t="";A>0;){var i=Math.min(r,A);t+=v.apply(void 0,this._value.splice(0,i)),A-=i;}return this._value.shift(),t},e.prototype.consumeStringToken=function(A){var r="",t=0;do{var i=this._value[t];if(i===NA||i===void 0||i===A)return r+=this.consumeStringSlice(t),{type:0,value:r};if(i===Pt)return this._value.splice(0,t),ic;if(i===At){var l=this._value[t+1];l!==NA&&l!==void 0&&(l===Pt?(r+=this.consumeStringSlice(t),t=-1,this._value.shift()):Ae(i,l)&&(r+=this.consumeStringSlice(t),r+=v(this.consumeEscapedCodePoint()),t=-1));}t++;}while(true)},e.prototype.consumeNumber=function(){var A=[],r=qe,t=this.peekCodePoint(0);for((t===ge||t===FA)&&A.push(this.consumeCodePoint());yA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());t=this.peekCodePoint(0);var i=this.peekCodePoint(1);if(t===rt&&yA(i))for(A.push(this.consumeCodePoint(),this.consumeCodePoint()),r=Os;yA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());t=this.peekCodePoint(0),i=this.peekCodePoint(1);var l=this.peekCodePoint(2);if((t===Js||t===Xs)&&((i===ge||i===FA)&&yA(l)||yA(i)))for(A.push(this.consumeCodePoint(),this.consumeCodePoint()),r=Os;yA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());return [Wl(A),r]},e.prototype.consumeNumericToken=function(){var A=this.consumeNumber(),r=A[0],t=A[1],i=this.peekCodePoint(0),l=this.peekCodePoint(1),d=this.peekCodePoint(2);if(Wt(i,l,d)){var g=this.consumeName();return {type:15,number:r,flags:t,unit:g}}return i===gl?(this.consumeCodePoint(),{type:16,number:r,flags:t}):{type:17,number:r,flags:t}},e.prototype.consumeEscapedCodePoint=function(){var A=this.consumeCodePoint();if(Ee(A)){for(var r=v(A);Ee(this.peekCodePoint(0))&&r.length<6;)r+=v(this.consumeCodePoint());Yt(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(r,16);return t===0||_l(t)||t>1114111?_s:t}return A===NA?_s:A},e.prototype.consumeName=function(){for(var A="";;){var r=this.consumeCodePoint();if(js(r))A+=v(r);else if(Ae(r,this.peekCodePoint(0)))A+=v(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(r),A}},e})(),zs=(function(){function e(A){this._tokens=A;}return e.create=function(A){var r=new $s;return r.write(A),new e(r.read())},e.parseValue=function(A){return e.create(A).parseComponentValue()},e.parseValues=function(A){return e.create(A).parseComponentValues()},e.prototype.parseComponentValue=function(){for(var A=this.consumeToken();A.type===31;)A=this.consumeToken();if(A.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(A);var r=this.consumeComponentValue();do A=this.consumeToken();while(A.type===31);if(A.type===32)return r;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},e.prototype.parseComponentValues=function(){for(var A=[];;){var r=this.consumeComponentValue();if(r.type===32)return A;A.push(r),A.push();}},e.prototype.consumeComponentValue=function(){var A=this.consumeToken();switch(A.type){case 11:case 28:case 2:return this.consumeSimpleBlock(A.type);case 19:return this.consumeFunction(A)}return A},e.prototype.consumeSimpleBlock=function(A){for(var r={type:A,values:[]},t=this.consumeToken();;){if(t.type===32||gc(t,A))return r;this.reconsumeToken(t),r.values.push(this.consumeComponentValue()),t=this.consumeToken();}},e.prototype.consumeFunction=function(A){for(var r={name:A.value,values:[],type:18};;){var t=this.consumeToken();if(t.type===32||t.type===3)return r;this.reconsumeToken(t),r.values.push(this.consumeComponentValue());}},e.prototype.consumeToken=function(){var A=this._tokens.shift();return typeof A>"u"?bn:A},e.prototype.reconsumeToken=function(A){this._tokens.unshift(A);},e})(),nt=function(e){return e.type===15},He=function(e){return e.type===17},iA=function(e){return e.type===20},hc=function(e){return e.type===0},Cn=function(e,A){return iA(e)&&e.value===A},Zs=function(e){return e.type!==31},ke=function(e){return e.type!==31&&e.type!==4},PA=function(e){var A=[],r=[];return e.forEach(function(t){if(t.type===4){if(r.length===0)throw new Error("Error parsing function args, zero tokens for arg");A.push(r),r=[];return}t.type!==31&&r.push(t);}),r.length&&A.push(r),A},gc=function(e,A){return A===11&&e.type===12||A===28&&e.type===29?true:A===2&&e.type===3},ee=function(e){return e.type===17||e.type===15},hA=function(e){return e.type===16||ee(e)},qs=function(e){return e.length>1?[e[0],e[1]]:[e[0]]},mA={type:17,number:0,flags:qe},vn={type:16,number:50,flags:qe},te={type:16,number:100,flags:qe},st=function(e,A,r){var t=e[0],i=e[1];return [aA(t,A),aA(typeof i<"u"?i:t,r)]},aA=function(e,A){if(e.type===16)return e.number/100*A;if(nt(e))switch(e.unit){case "rem":case "em":return 16*e.number;default:return e.number}return e.number},Ai="deg",ei="grad",ti="rad",ri="turn",$t={name:"angle",parse:function(e,A){if(A.type===15)switch(A.unit){case Ai:return Math.PI*A.number/180;case ei:return Math.PI/200*A.number;case ti:return A.number;case ri:return Math.PI*2*A.number}throw new Error("Unsupported angle type")}},ni=function(e){return e.type===15&&(e.unit===Ai||e.unit===ei||e.unit===ti||e.unit===ri)},si=function(e){var A=e.filter(iA).map(function(r){return r.value}).join(" ");switch(A){case "to bottom right":case "to right bottom":case "left top":case "top left":return [mA,mA];case "to top":case "bottom":return TA(0);case "to bottom left":case "to left bottom":case "right top":case "top right":return [mA,te];case "to right":case "left":return TA(90);case "to top left":case "to left top":case "right bottom":case "bottom right":return [te,te];case "to bottom":case "top":return TA(180);case "to top right":case "to right top":case "left bottom":case "bottom left":return [te,mA];case "to left":case "right":return TA(270)}return 0},TA=function(e){return Math.PI*e/180},re={name:"color",parse:function(e,A){if(A.type===18){var r=Bc[A.name];if(typeof r>"u")throw new Error('Attempting to parse an unsupported color function "'+A.name+'"');return r(e,A.values)}if(A.type===5){if(A.value.length===3){var t=A.value.substring(0,1),i=A.value.substring(1,2),l=A.value.substring(2,3);return se(parseInt(t+t,16),parseInt(i+i,16),parseInt(l+l,16),1)}if(A.value.length===4){var t=A.value.substring(0,1),i=A.value.substring(1,2),l=A.value.substring(2,3),d=A.value.substring(3,4);return se(parseInt(t+t,16),parseInt(i+i,16),parseInt(l+l,16),parseInt(d+d,16)/255)}if(A.value.length===6){var t=A.value.substring(0,2),i=A.value.substring(2,4),l=A.value.substring(4,6);return se(parseInt(t,16),parseInt(i,16),parseInt(l,16),1)}if(A.value.length===8){var t=A.value.substring(0,2),i=A.value.substring(2,4),l=A.value.substring(4,6),d=A.value.substring(6,8);return se(parseInt(t,16),parseInt(i,16),parseInt(l,16),parseInt(d,16)/255)}}if(A.type===20){var g=YA[A.value.toUpperCase()];if(typeof g<"u")return g}return YA.TRANSPARENT}},ne=function(e){return (255&e)===0},wA=function(e){var A=255&e,r=255&e>>8,t=255&e>>16,i=255&e>>24;return A<255?"rgba("+i+","+t+","+r+","+A/255+")":"rgb("+i+","+t+","+r+")"},se=function(e,A,r,t){return (e<<24|A<<16|r<<8|Math.round(t*255)<<0)>>>0},ii=function(e,A){if(e.type===17)return e.number;if(e.type===16){var r=A===3?1:255;return A===3?e.number/100*r:Math.round(e.number/100*r)}return 0},oi=function(e,A){var r=A.filter(ke);if(r.length===3){var t=r.map(ii),i=t[0],l=t[1],d=t[2];return se(i,l,d,1)}if(r.length===4){var g=r.map(ii),i=g[0],l=g[1],d=g[2],h=g[3];return se(i,l,d,h)}return 0};function yn(e,A,r){return r<0&&(r+=1),r>=1&&(r-=1),r<1/6?(A-e)*r*6+e:r<1/2?A:r<2/3?(A-e)*6*(2/3-r)+e:e}var ai=function(e,A){var r=A.filter(ke),t=r[0],i=r[1],l=r[2],d=r[3],g=(t.type===17?TA(t.number):$t.parse(e,t))/(Math.PI*2),h=hA(i)?i.number/100:0,f=hA(l)?l.number/100:0,w=typeof d<"u"&&hA(d)?aA(d,1):1;if(h===0)return se(f*255,f*255,f*255,1);var C=f<=.5?f*(h+1):f+h-f*h,Q=f*2-C,L=yn(Q,C,g+1/3),E=yn(Q,C,g),k=yn(Q,C,g-1/3);return se(L*255,E*255,k*255,w)},Bc={hsl:ai,hsla:ai,rgb:oi,rgba:oi},it=function(e,A){return re.parse(e,zs.create(A).parseComponentValue())},YA={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},fc={name:"background-clip",initialValue:"border-box",prefix:false,type:1,parse:function(e,A){return A.map(function(r){if(iA(r))switch(r.value){case "padding-box":return 1;case "content-box":return 2}return 0})}},wc={name:"background-color",initialValue:"transparent",prefix:false,type:3,format:"color"},zt=function(e,A){var r=re.parse(e,A[0]),t=A[1];return t&&hA(t)?{color:r,stop:t}:{color:r,stop:null}},li=function(e,A){var r=e[0],t=e[e.length-1];r.stop===null&&(r.stop=mA),t.stop===null&&(t.stop=te);for(var i=[],l=0,d=0;d<e.length;d++){var g=e[d].stop;if(g!==null){var h=aA(g,A);h>l?i.push(h):i.push(l),l=h;}else i.push(null);}for(var f=null,d=0;d<i.length;d++){var w=i[d];if(w===null)f===null&&(f=d);else if(f!==null){for(var C=d-f,Q=i[f-1],L=(w-Q)/(C+1),E=1;E<=C;E++)i[f+E-1]=L*E;f=null;}}return e.map(function(k,J){var D=k.color;return {color:D,stop:Math.max(Math.min(1,i[J]/A),0)}})},mc=function(e,A,r){var t=A/2,i=r/2,l=aA(e[0],A)-t,d=i-aA(e[1],r);return (Math.atan2(d,l)+Math.PI*2)%(Math.PI*2)},bc=function(e,A,r){var t=typeof e=="number"?e:mc(e,A,r),i=Math.abs(A*Math.sin(t))+Math.abs(r*Math.cos(t)),l=A/2,d=r/2,g=i/2,h=Math.sin(t-Math.PI/2)*g,f=Math.cos(t-Math.PI/2)*g;return [i,l-f,l+f,d-h,d+h]},RA=function(e,A){return Math.sqrt(e*e+A*A)},ci=function(e,A,r,t,i){var l=[[0,0],[0,A],[e,0],[e,A]];return l.reduce(function(d,g){var h=g[0],f=g[1],w=RA(r-h,t-f);return (i?w<d.optimumDistance:w>d.optimumDistance)?{optimumCorner:g,optimumDistance:w}:d},{optimumDistance:i?1/0:-1/0,optimumCorner:null}).optimumCorner},Cc=function(e,A,r,t,i){var l=0,d=0;switch(e.size){case 0:e.shape===0?l=d=Math.min(Math.abs(A),Math.abs(A-t),Math.abs(r),Math.abs(r-i)):e.shape===1&&(l=Math.min(Math.abs(A),Math.abs(A-t)),d=Math.min(Math.abs(r),Math.abs(r-i)));break;case 2:if(e.shape===0)l=d=Math.min(RA(A,r),RA(A,r-i),RA(A-t,r),RA(A-t,r-i));else if(e.shape===1){var g=Math.min(Math.abs(r),Math.abs(r-i))/Math.min(Math.abs(A),Math.abs(A-t)),h=ci(t,i,A,r,true),f=h[0],w=h[1];l=RA(f-A,(w-r)/g),d=g*l;}break;case 1:e.shape===0?l=d=Math.max(Math.abs(A),Math.abs(A-t),Math.abs(r),Math.abs(r-i)):e.shape===1&&(l=Math.max(Math.abs(A),Math.abs(A-t)),d=Math.max(Math.abs(r),Math.abs(r-i)));break;case 3:if(e.shape===0)l=d=Math.max(RA(A,r),RA(A,r-i),RA(A-t,r),RA(A-t,r-i));else if(e.shape===1){var g=Math.max(Math.abs(r),Math.abs(r-i))/Math.max(Math.abs(A),Math.abs(A-t)),C=ci(t,i,A,r,false),f=C[0],w=C[1];l=RA(f-A,(w-r)/g),d=g*l;}break}return Array.isArray(e.size)&&(l=aA(e.size[0],t),d=e.size.length===2?aA(e.size[1],i):l),[l,d]},vc=function(e,A){var r=TA(180),t=[];return PA(A).forEach(function(i,l){if(l===0){var d=i[0];if(d.type===20&&d.value==="to"){r=si(i);return}else if(ni(d)){r=$t.parse(e,d);return}}var g=zt(e,i);t.push(g);}),{angle:r,stops:t,type:1}},Zt=function(e,A){var r=TA(180),t=[];return PA(A).forEach(function(i,l){if(l===0){var d=i[0];if(d.type===20&&["top","left","right","bottom"].indexOf(d.value)!==-1){r=si(i);return}else if(ni(d)){r=($t.parse(e,d)+TA(270))%TA(360);return}}var g=zt(e,i);t.push(g);}),{angle:r,stops:t,type:1}},yc=function(e,A){var r=TA(180),t=[],i=1,l=0,d=3,g=[];return PA(A).forEach(function(h,f){var w=h[0];if(f===0){if(iA(w)&&w.value==="linear"){i=1;return}else if(iA(w)&&w.value==="radial"){i=2;return}}if(w.type===18){if(w.name==="from"){var C=re.parse(e,w.values[0]);t.push({stop:mA,color:C});}else if(w.name==="to"){var C=re.parse(e,w.values[0]);t.push({stop:te,color:C});}else if(w.name==="color-stop"){var Q=w.values.filter(ke);if(Q.length===2){var C=re.parse(e,Q[1]),L=Q[0];He(L)&&t.push({stop:{type:16,number:L.number*100,flags:L.flags},color:C});}}}}),i===1?{angle:(r+TA(180))%TA(360),stops:t,type:i}:{size:d,shape:l,stops:t,position:g,type:i}},di="closest-side",pi="farthest-side",ui="closest-corner",hi="farthest-corner",gi="circle",Bi="ellipse",fi="cover",wi="contain",Qc=function(e,A){var r=0,t=3,i=[],l=[];return PA(A).forEach(function(d,g){var h=true;if(g===0){var f=false;h=d.reduce(function(C,Q){if(f)if(iA(Q))switch(Q.value){case "center":return l.push(vn),C;case "top":case "left":return l.push(mA),C;case "right":case "bottom":return l.push(te),C}else (hA(Q)||ee(Q))&&l.push(Q);else if(iA(Q))switch(Q.value){case gi:return r=0,false;case Bi:return r=1,false;case "at":return f=true,false;case di:return t=0,false;case fi:case pi:return t=1,false;case wi:case ui:return t=2,false;case hi:return t=3,false}else if(ee(Q)||hA(Q))return Array.isArray(t)||(t=[]),t.push(Q),false;return C},h);}if(h){var w=zt(e,d);i.push(w);}}),{size:t,shape:r,stops:i,position:l,type:2}},qt=function(e,A){var r=0,t=3,i=[],l=[];return PA(A).forEach(function(d,g){var h=true;if(g===0?h=d.reduce(function(w,C){if(iA(C))switch(C.value){case "center":return l.push(vn),false;case "top":case "left":return l.push(mA),false;case "right":case "bottom":return l.push(te),false}else if(hA(C)||ee(C))return l.push(C),false;return w},h):g===1&&(h=d.reduce(function(w,C){if(iA(C))switch(C.value){case gi:return r=0,false;case Bi:return r=1,false;case wi:case di:return t=0,false;case pi:return t=1,false;case ui:return t=2,false;case fi:case hi:return t=3,false}else if(ee(C)||hA(C))return Array.isArray(t)||(t=[]),t.push(C),false;return w},h)),h){var f=zt(e,d);i.push(f);}}),{size:t,shape:r,stops:i,position:l,type:2}},Fc=function(e){return e.type===1},xc=function(e){return e.type===2},Qn={name:"image",parse:function(e,A){if(A.type===22){var r={url:A.value,type:0};return e.cache.addImage(A.value),r}if(A.type===18){var t=mi[A.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported image function "'+A.name+'"');return t(e,A.values)}throw new Error("Unsupported image type "+A.type)}};function Uc(e){return !(e.type===20&&e.value==="none")&&(e.type!==18||!!mi[e.name])}var mi={"linear-gradient":vc,"-moz-linear-gradient":Zt,"-ms-linear-gradient":Zt,"-o-linear-gradient":Zt,"-webkit-linear-gradient":Zt,"radial-gradient":Qc,"-moz-radial-gradient":qt,"-ms-radial-gradient":qt,"-o-radial-gradient":qt,"-webkit-radial-gradient":qt,"-webkit-gradient":yc},Ec={name:"background-image",initialValue:"none",type:1,prefix:false,parse:function(e,A){if(A.length===0)return [];var r=A[0];return r.type===20&&r.value==="none"?[]:A.filter(function(t){return ke(t)&&Uc(t)}).map(function(t){return Qn.parse(e,t)})}},Hc={name:"background-origin",initialValue:"border-box",prefix:false,type:1,parse:function(e,A){return A.map(function(r){if(iA(r))switch(r.value){case "padding-box":return 1;case "content-box":return 2}return 0})}},kc={name:"background-position",initialValue:"0% 0%",type:1,prefix:false,parse:function(e,A){return PA(A).map(function(r){return r.filter(hA)}).map(qs)}},Ic={name:"background-repeat",initialValue:"repeat",prefix:false,type:1,parse:function(e,A){return PA(A).map(function(r){return r.filter(iA).map(function(t){return t.value}).join(" ")}).map(Sc)}},Sc=function(e){switch(e){case "no-repeat":return 1;case "repeat-x":case "repeat no-repeat":return 2;case "repeat-y":case "no-repeat repeat":return 3;default:return 0}},Ie;(function(e){e.AUTO="auto",e.CONTAIN="contain",e.COVER="cover";})(Ie||(Ie={}));var Lc={name:"background-size",initialValue:"0",prefix:false,type:1,parse:function(e,A){return PA(A).map(function(r){return r.filter(Tc)})}},Tc=function(e){return iA(e)||hA(e)},Ar=function(e){return {name:"border-"+e+"-color",initialValue:"transparent",prefix:false,type:3,format:"color"}},Kc=Ar("top"),Dc=Ar("right"),Mc=Ar("bottom"),Rc=Ar("left"),er=function(e){return {name:"border-radius-"+e,initialValue:"0 0",prefix:false,type:1,parse:function(A,r){return qs(r.filter(hA))}}},Oc=er("top-left"),Nc=er("top-right"),Pc=er("bottom-right"),_c=er("bottom-left"),tr=function(e){return {name:"border-"+e+"-style",initialValue:"solid",prefix:false,type:2,parse:function(A,r){switch(r){case "none":return 0;case "dashed":return 2;case "dotted":return 3;case "double":return 4}return 1}}},Gc=tr("top"),Vc=tr("right"),Xc=tr("bottom"),Yc=tr("left"),rr=function(e){return {name:"border-"+e+"-width",initialValue:"0",type:0,prefix:false,parse:function(A,r){return nt(r)?r.number:0}}},Jc=rr("top"),Wc=rr("right"),jc=rr("bottom"),$c=rr("left"),zc={name:"color",initialValue:"transparent",prefix:false,type:3,format:"color"},Zc={name:"direction",initialValue:"ltr",prefix:false,type:2,parse:function(e,A){return A==="rtl"?1:0}},qc={name:"display",initialValue:"inline-block",prefix:false,type:1,parse:function(e,A){return A.filter(iA).reduce(function(r,t){return r|Ad(t.value)},0)}},Ad=function(e){switch(e){case "block":case "-webkit-box":return 2;case "inline":return 4;case "run-in":return 8;case "flow":return 16;case "flow-root":return 32;case "table":return 64;case "flex":case "-webkit-flex":return 128;case "grid":case "-ms-grid":return 256;case "ruby":return 512;case "subgrid":return 1024;case "list-item":return 2048;case "table-row-group":return 4096;case "table-header-group":return 8192;case "table-footer-group":return 16384;case "table-row":return 32768;case "table-cell":return 65536;case "table-column-group":return 131072;case "table-column":return 262144;case "table-caption":return 524288;case "ruby-base":return 1048576;case "ruby-text":return 2097152;case "ruby-base-container":return 4194304;case "ruby-text-container":return 8388608;case "contents":return 16777216;case "inline-block":return 33554432;case "inline-list-item":return 67108864;case "inline-table":return 134217728;case "inline-flex":return 268435456;case "inline-grid":return 536870912}return 0},ed={name:"float",initialValue:"none",prefix:false,type:2,parse:function(e,A){switch(A){case "left":return 1;case "right":return 2;case "inline-start":return 3;case "inline-end":return 4}return 0}},td={name:"letter-spacing",initialValue:"0",prefix:false,type:0,parse:function(e,A){return A.type===20&&A.value==="normal"?0:A.type===17||A.type===15?A.number:0}},nr;(function(e){e.NORMAL="normal",e.STRICT="strict";})(nr||(nr={}));var rd={name:"line-break",initialValue:"normal",prefix:false,type:2,parse:function(e,A){return A==="strict"?nr.STRICT:nr.NORMAL}},nd={name:"line-height",initialValue:"normal",prefix:false,type:4},bi=function(e,A){return iA(e)&&e.value==="normal"?1.2*A:e.type===17?A*e.number:hA(e)?aA(e,A):A},sd={name:"list-style-image",initialValue:"none",type:0,prefix:false,parse:function(e,A){return A.type===20&&A.value==="none"?null:Qn.parse(e,A)}},id={name:"list-style-position",initialValue:"outside",prefix:false,type:2,parse:function(e,A){return A==="inside"?0:1}},Fn={name:"list-style-type",initialValue:"none",prefix:false,type:2,parse:function(e,A){switch(A){case "disc":return 0;case "circle":return 1;case "square":return 2;case "decimal":return 3;case "cjk-decimal":return 4;case "decimal-leading-zero":return 5;case "lower-roman":return 6;case "upper-roman":return 7;case "lower-greek":return 8;case "lower-alpha":return 9;case "upper-alpha":return 10;case "arabic-indic":return 11;case "armenian":return 12;case "bengali":return 13;case "cambodian":return 14;case "cjk-earthly-branch":return 15;case "cjk-heavenly-stem":return 16;case "cjk-ideographic":return 17;case "devanagari":return 18;case "ethiopic-numeric":return 19;case "georgian":return 20;case "gujarati":return 21;case "gurmukhi":return 22;case "hebrew":return 22;case "hiragana":return 23;case "hiragana-iroha":return 24;case "japanese-formal":return 25;case "japanese-informal":return 26;case "kannada":return 27;case "katakana":return 28;case "katakana-iroha":return 29;case "khmer":return 30;case "korean-hangul-formal":return 31;case "korean-hanja-formal":return 32;case "korean-hanja-informal":return 33;case "lao":return 34;case "lower-armenian":return 35;case "malayalam":return 36;case "mongolian":return 37;case "myanmar":return 38;case "oriya":return 39;case "persian":return 40;case "simp-chinese-formal":return 41;case "simp-chinese-informal":return 42;case "tamil":return 43;case "telugu":return 44;case "thai":return 45;case "tibetan":return 46;case "trad-chinese-formal":return 47;case "trad-chinese-informal":return 48;case "upper-armenian":return 49;case "disclosure-open":return 50;case "disclosure-closed":return 51;default:return  -1}}},sr=function(e){return {name:"margin-"+e,initialValue:"0",prefix:false,type:4}},od=sr("top"),ad=sr("right"),ld=sr("bottom"),cd=sr("left"),dd={name:"overflow",initialValue:"visible",prefix:false,type:1,parse:function(e,A){return A.filter(iA).map(function(r){switch(r.value){case "hidden":return 1;case "scroll":return 2;case "clip":return 3;case "auto":return 4;default:return 0}})}},pd={name:"overflow-wrap",initialValue:"normal",prefix:false,type:2,parse:function(e,A){return A==="break-word"?"break-word":"normal"}},ir=function(e){return {name:"padding-"+e,initialValue:"0",prefix:false,type:3,format:"length-percentage"}},ud=ir("top"),hd=ir("right"),gd=ir("bottom"),Bd=ir("left"),fd={name:"text-align",initialValue:"left",prefix:false,type:2,parse:function(e,A){switch(A){case "right":return 2;case "center":case "justify":return 1;default:return 0}}},wd={name:"position",initialValue:"static",prefix:false,type:2,parse:function(e,A){switch(A){case "relative":return 1;case "absolute":return 2;case "fixed":return 3;case "sticky":return 4}return 0}},md={name:"text-shadow",initialValue:"none",type:1,prefix:false,parse:function(e,A){return A.length===1&&Cn(A[0],"none")?[]:PA(A).map(function(r){for(var t={color:YA.TRANSPARENT,offsetX:mA,offsetY:mA,blur:mA},i=0,l=0;l<r.length;l++){var d=r[l];ee(d)?(i===0?t.offsetX=d:i===1?t.offsetY=d:t.blur=d,i++):t.color=re.parse(e,d);}return t})}},bd={name:"text-transform",initialValue:"none",prefix:false,type:2,parse:function(e,A){switch(A){case "uppercase":return 2;case "lowercase":return 1;case "capitalize":return 3}return 0}},Cd={name:"transform",initialValue:"none",prefix:true,type:0,parse:function(e,A){if(A.type===20&&A.value==="none")return null;if(A.type===18){var r=Qd[A.name];if(typeof r>"u")throw new Error('Attempting to parse an unsupported transform function "'+A.name+'"');return r(A.values)}return null}},vd=function(e){var A=e.filter(function(r){return r.type===17}).map(function(r){return r.number});return A.length===6?A:null},yd=function(e){var A=e.filter(function(h){return h.type===17}).map(function(h){return h.number}),r=A[0],t=A[1];A[2],A[3];var i=A[4],l=A[5];A[6],A[7],A[8],A[9],A[10],A[11];var d=A[12],g=A[13];return A[14],A[15],A.length===16?[r,t,i,l,d,g]:null},Qd={matrix:vd,matrix3d:yd},Ci={type:16,number:50,flags:qe},Fd=[Ci,Ci],xd={name:"transform-origin",initialValue:"50% 50%",prefix:true,type:1,parse:function(e,A){var r=A.filter(hA);return r.length!==2?Fd:[r[0],r[1]]}},Ud={name:"visible",initialValue:"none",prefix:false,type:2,parse:function(e,A){switch(A){case "hidden":return 1;case "collapse":return 2;default:return 0}}},ot;(function(e){e.NORMAL="normal",e.BREAK_ALL="break-all",e.KEEP_ALL="keep-all";})(ot||(ot={}));for(var Ed={name:"word-break",initialValue:"normal",prefix:false,type:2,parse:function(e,A){switch(A){case "break-all":return ot.BREAK_ALL;case "keep-all":return ot.KEEP_ALL;default:return ot.NORMAL}}},Hd={name:"z-index",initialValue:"auto",prefix:false,type:0,parse:function(e,A){if(A.type===20)return {auto:true,order:0};if(He(A))return {auto:false,order:A.number};throw new Error("Invalid z-index number parsed")}},vi={name:"time",parse:function(e,A){if(A.type===15)switch(A.unit.toLowerCase()){case "s":return 1e3*A.number;case "ms":return A.number}throw new Error("Unsupported time type")}},kd={name:"opacity",initialValue:"1",type:0,prefix:false,parse:function(e,A){return He(A)?A.number:1}},Id={name:"text-decoration-color",initialValue:"transparent",prefix:false,type:3,format:"color"},Sd={name:"text-decoration-line",initialValue:"none",prefix:false,type:1,parse:function(e,A){return A.filter(iA).map(function(r){switch(r.value){case "underline":return 1;case "overline":return 2;case "line-through":return 3;case "none":return 4}return 0}).filter(function(r){return r!==0})}},Ld={name:"font-family",initialValue:"",prefix:false,type:1,parse:function(e,A){var r=[],t=[];return A.forEach(function(i){switch(i.type){case 20:case 0:r.push(i.value);break;case 17:r.push(i.number.toString());break;case 4:t.push(r.join(" ")),r.length=0;break}}),r.length&&t.push(r.join(" ")),t.map(function(i){return i.indexOf(" ")===-1?i:"'"+i+"'"})}},Td={name:"font-size",initialValue:"0",prefix:false,type:3,format:"length"},Kd={name:"font-weight",initialValue:"normal",type:0,prefix:false,parse:function(e,A){return He(A)?A.number:iA(A)&&A.value==="bold"?700:400}},Dd={name:"font-variant",initialValue:"none",type:1,prefix:false,parse:function(e,A){return A.filter(iA).map(function(r){return r.value})}},Md={name:"font-style",initialValue:"normal",prefix:false,type:2,parse:function(e,A){switch(A){case "oblique":return "oblique";case "italic":return "italic";default:return "normal"}}},BA=function(e,A){return (e&A)!==0},Rd={name:"content",initialValue:"none",type:1,prefix:false,parse:function(e,A){if(A.length===0)return [];var r=A[0];return r.type===20&&r.value==="none"?[]:A}},Od={name:"counter-increment",initialValue:"none",prefix:true,type:1,parse:function(e,A){if(A.length===0)return null;var r=A[0];if(r.type===20&&r.value==="none")return null;for(var t=[],i=A.filter(Zs),l=0;l<i.length;l++){var d=i[l],g=i[l+1];if(d.type===20){var h=g&&He(g)?g.number:1;t.push({counter:d.value,increment:h});}}return t}},Nd={name:"counter-reset",initialValue:"none",prefix:true,type:1,parse:function(e,A){if(A.length===0)return [];for(var r=[],t=A.filter(Zs),i=0;i<t.length;i++){var l=t[i],d=t[i+1];if(iA(l)&&l.value!=="none"){var g=d&&He(d)?d.number:0;r.push({counter:l.value,reset:g});}}return r}},Pd={name:"duration",initialValue:"0s",prefix:false,type:1,parse:function(e,A){return A.filter(nt).map(function(r){return vi.parse(e,r)})}},_d={name:"quotes",initialValue:"none",prefix:true,type:1,parse:function(e,A){if(A.length===0)return null;var r=A[0];if(r.type===20&&r.value==="none")return null;var t=[],i=A.filter(hc);if(i.length%2!==0)return null;for(var l=0;l<i.length;l+=2){var d=i[l].value,g=i[l+1].value;t.push({open:d,close:g});}return t}},yi=function(e,A,r){if(!e)return "";var t=e[Math.min(A,e.length-1)];return t?r?t.open:t.close:""},Gd={name:"box-shadow",initialValue:"none",type:1,prefix:false,parse:function(e,A){return A.length===1&&Cn(A[0],"none")?[]:PA(A).map(function(r){for(var t={color:255,offsetX:mA,offsetY:mA,blur:mA,spread:mA,inset:false},i=0,l=0;l<r.length;l++){var d=r[l];Cn(d,"inset")?t.inset=true:ee(d)?(i===0?t.offsetX=d:i===1?t.offsetY=d:i===2?t.blur=d:t.spread=d,i++):t.color=re.parse(e,d);}return t})}},Vd={name:"paint-order",initialValue:"normal",prefix:false,type:1,parse:function(e,A){var r=[0,1,2],t=[];return A.filter(iA).forEach(function(i){switch(i.value){case "stroke":t.push(1);break;case "fill":t.push(0);break;case "markers":t.push(2);break}}),r.forEach(function(i){t.indexOf(i)===-1&&t.push(i);}),t}},Xd={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:false,type:3,format:"color"},Yd={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:false,parse:function(e,A){return nt(A)?A.number:0}},Jd=(function(){function e(A,r){var t,i;this.animationDuration=T(A,Pd,r.animationDuration),this.backgroundClip=T(A,fc,r.backgroundClip),this.backgroundColor=T(A,wc,r.backgroundColor),this.backgroundImage=T(A,Ec,r.backgroundImage),this.backgroundOrigin=T(A,Hc,r.backgroundOrigin),this.backgroundPosition=T(A,kc,r.backgroundPosition),this.backgroundRepeat=T(A,Ic,r.backgroundRepeat),this.backgroundSize=T(A,Lc,r.backgroundSize),this.borderTopColor=T(A,Kc,r.borderTopColor),this.borderRightColor=T(A,Dc,r.borderRightColor),this.borderBottomColor=T(A,Mc,r.borderBottomColor),this.borderLeftColor=T(A,Rc,r.borderLeftColor),this.borderTopLeftRadius=T(A,Oc,r.borderTopLeftRadius),this.borderTopRightRadius=T(A,Nc,r.borderTopRightRadius),this.borderBottomRightRadius=T(A,Pc,r.borderBottomRightRadius),this.borderBottomLeftRadius=T(A,_c,r.borderBottomLeftRadius),this.borderTopStyle=T(A,Gc,r.borderTopStyle),this.borderRightStyle=T(A,Vc,r.borderRightStyle),this.borderBottomStyle=T(A,Xc,r.borderBottomStyle),this.borderLeftStyle=T(A,Yc,r.borderLeftStyle),this.borderTopWidth=T(A,Jc,r.borderTopWidth),this.borderRightWidth=T(A,Wc,r.borderRightWidth),this.borderBottomWidth=T(A,jc,r.borderBottomWidth),this.borderLeftWidth=T(A,$c,r.borderLeftWidth),this.boxShadow=T(A,Gd,r.boxShadow),this.color=T(A,zc,r.color),this.direction=T(A,Zc,r.direction),this.display=T(A,qc,r.display),this.float=T(A,ed,r.cssFloat),this.fontFamily=T(A,Ld,r.fontFamily),this.fontSize=T(A,Td,r.fontSize),this.fontStyle=T(A,Md,r.fontStyle),this.fontVariant=T(A,Dd,r.fontVariant),this.fontWeight=T(A,Kd,r.fontWeight),this.letterSpacing=T(A,td,r.letterSpacing),this.lineBreak=T(A,rd,r.lineBreak),this.lineHeight=T(A,nd,r.lineHeight),this.listStyleImage=T(A,sd,r.listStyleImage),this.listStylePosition=T(A,id,r.listStylePosition),this.listStyleType=T(A,Fn,r.listStyleType),this.marginTop=T(A,od,r.marginTop),this.marginRight=T(A,ad,r.marginRight),this.marginBottom=T(A,ld,r.marginBottom),this.marginLeft=T(A,cd,r.marginLeft),this.opacity=T(A,kd,r.opacity);var l=T(A,dd,r.overflow);this.overflowX=l[0],this.overflowY=l[l.length>1?1:0],this.overflowWrap=T(A,pd,r.overflowWrap),this.paddingTop=T(A,ud,r.paddingTop),this.paddingRight=T(A,hd,r.paddingRight),this.paddingBottom=T(A,gd,r.paddingBottom),this.paddingLeft=T(A,Bd,r.paddingLeft),this.paintOrder=T(A,Vd,r.paintOrder),this.position=T(A,wd,r.position),this.textAlign=T(A,fd,r.textAlign),this.textDecorationColor=T(A,Id,(t=r.textDecorationColor)!==null&&t!==void 0?t:r.color),this.textDecorationLine=T(A,Sd,(i=r.textDecorationLine)!==null&&i!==void 0?i:r.textDecoration),this.textShadow=T(A,md,r.textShadow),this.textTransform=T(A,bd,r.textTransform),this.transform=T(A,Cd,r.transform),this.transformOrigin=T(A,xd,r.transformOrigin),this.visibility=T(A,Ud,r.visibility),this.webkitTextStrokeColor=T(A,Xd,r.webkitTextStrokeColor),this.webkitTextStrokeWidth=T(A,Yd,r.webkitTextStrokeWidth),this.wordBreak=T(A,Ed,r.wordBreak),this.zIndex=T(A,Hd,r.zIndex);}return e.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},e.prototype.isTransparent=function(){return ne(this.backgroundColor)},e.prototype.isTransformed=function(){return this.transform!==null},e.prototype.isPositioned=function(){return this.position!==0},e.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},e.prototype.isFloating=function(){return this.float!==0},e.prototype.isInlineLevel=function(){return BA(this.display,4)||BA(this.display,33554432)||BA(this.display,268435456)||BA(this.display,536870912)||BA(this.display,67108864)||BA(this.display,134217728)},e})(),Wd=(function(){function e(A,r){this.content=T(A,Rd,r.content),this.quotes=T(A,_d,r.quotes);}return e})(),Qi=(function(){function e(A,r){this.counterIncrement=T(A,Od,r.counterIncrement),this.counterReset=T(A,Nd,r.counterReset);}return e})(),T=function(e,A,r){var t=new $s,i=r!==null&&typeof r<"u"?r.toString():A.initialValue;t.write(i);var l=new zs(t.read());switch(A.type){case 2:var d=l.parseComponentValue();return A.parse(e,iA(d)?d.value:A.initialValue);case 0:return A.parse(e,l.parseComponentValue());case 1:return A.parse(e,l.parseComponentValues());case 4:return l.parseComponentValue();case 3:switch(A.format){case "angle":return $t.parse(e,l.parseComponentValue());case "color":return re.parse(e,l.parseComponentValue());case "image":return Qn.parse(e,l.parseComponentValue());case "length":var g=l.parseComponentValue();return ee(g)?g:mA;case "length-percentage":var h=l.parseComponentValue();return hA(h)?h:mA;case "time":return vi.parse(e,l.parseComponentValue())}break}},jd="data-html2canvas-debug",$d=function(e){var A=e.getAttribute(jd);switch(A){case "all":return 1;case "clone":return 2;case "parse":return 3;case "render":return 4;default:return 0}},xn=function(e,A){var r=$d(e);return r===1||A===r},_A=(function(){function e(A,r){if(this.context=A,this.textNodes=[],this.elements=[],this.flags=0,xn(r,3))debugger;this.styles=new Jd(A,window.getComputedStyle(r,null)),Nn(r)&&(this.styles.animationDuration.some(function(t){return t>0})&&(r.style.animationDuration="0s"),this.styles.transform!==null&&(r.style.transform="none")),this.bounds=B(this.context,r),xn(r,4)&&(this.flags|=16);}return e})(),zd="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",Fi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",at=typeof Uint8Array>"u"?[]:new Uint8Array(256),or=0;or<Fi.length;or++)at[Fi.charCodeAt(or)]=or;for(var Zd=function(e){var A=e.length*.75,r=e.length,t,i=0,l,d,g,h;e[e.length-1]==="="&&(A--,e[e.length-2]==="="&&A--);var f=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(A):new Array(A),w=Array.isArray(f)?f:new Uint8Array(f);for(t=0;t<r;t+=4)l=at[e.charCodeAt(t)],d=at[e.charCodeAt(t+1)],g=at[e.charCodeAt(t+2)],h=at[e.charCodeAt(t+3)],w[i++]=l<<2|d>>4,w[i++]=(d&15)<<4|g>>2,w[i++]=(g&3)<<6|h&63;return f},qd=function(e){for(var A=e.length,r=[],t=0;t<A;t+=2)r.push(e[t+1]<<8|e[t]);return r},Ap=function(e){for(var A=e.length,r=[],t=0;t<A;t+=4)r.push(e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]);return r},Be=5,Un=11,En=2,ep=Un-Be,xi=65536>>Be,tp=1<<Be,Hn=tp-1,rp=1024>>Be,np=xi+rp,sp=np,ip=32,op=sp+ip,ap=65536>>Un,lp=1<<ep,cp=lp-1,Ui=function(e,A,r){return e.slice?e.slice(A,r):new Uint16Array(Array.prototype.slice.call(e,A,r))},dp=function(e,A,r){return e.slice?e.slice(A,r):new Uint32Array(Array.prototype.slice.call(e,A,r))},pp=function(e,A){var r=Zd(e),t=Array.isArray(r)?Ap(r):new Uint32Array(r),i=Array.isArray(r)?qd(r):new Uint16Array(r),l=24,d=Ui(i,l/2,t[4]/2),g=t[5]===2?Ui(i,(l+t[4])/2):dp(t,Math.ceil((l+t[4])/4));return new up(t[0],t[1],t[2],t[3],d,g)},up=(function(){function e(A,r,t,i,l,d){this.initialValue=A,this.errorValue=r,this.highStart=t,this.highValueIndex=i,this.index=l,this.data=d;}return e.prototype.get=function(A){var r;if(A>=0){if(A<55296||A>56319&&A<=65535)return r=this.index[A>>Be],r=(r<<En)+(A&Hn),this.data[r];if(A<=65535)return r=this.index[xi+(A-55296>>Be)],r=(r<<En)+(A&Hn),this.data[r];if(A<this.highStart)return r=op-ap+(A>>Un),r=this.index[r],r+=A>>Be&cp,r=this.index[r],r=(r<<En)+(A&Hn),this.data[r];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue},e})(),Ei="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",hp=typeof Uint8Array>"u"?[]:new Uint8Array(256),ar=0;ar<Ei.length;ar++)hp[Ei.charCodeAt(ar)]=ar;var gp=1,kn=2,In=3,Hi=4,ki=5,Bp=7,Ii=8,Sn=9,Ln=10,Si=11,Li=12,Ti=13,Ki=14,Tn=15,fp=function(e){for(var A=[],r=0,t=e.length;r<t;){var i=e.charCodeAt(r++);if(i>=55296&&i<=56319&&r<t){var l=e.charCodeAt(r++);(l&64512)===56320?A.push(((i&1023)<<10)+(l&1023)+65536):(A.push(i),r--);}else A.push(i);}return A},wp=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];if(String.fromCodePoint)return String.fromCodePoint.apply(String,e);var r=e.length;if(!r)return "";for(var t=[],i=-1,l="";++i<r;){var d=e[i];d<=65535?t.push(d):(d-=65536,t.push((d>>10)+55296,d%1024+56320)),(i+1===r||t.length>16384)&&(l+=String.fromCharCode.apply(String,t),t.length=0);}return l},mp=pp(zd),KA="\xD7",Kn="\xF7",bp=function(e){return mp.get(e)},Cp=function(e,A,r){var t=r-2,i=A[t],l=A[r-1],d=A[r];if(l===kn&&d===In)return KA;if(l===kn||l===In||l===Hi||d===kn||d===In||d===Hi)return Kn;if(l===Ii&&[Ii,Sn,Si,Li].indexOf(d)!==-1||(l===Si||l===Sn)&&(d===Sn||d===Ln)||(l===Li||l===Ln)&&d===Ln||d===Ti||d===ki||d===Bp||l===gp)return KA;if(l===Ti&&d===Ki){for(;i===ki;)i=A[--t];if(i===Ki)return KA}if(l===Tn&&d===Tn){for(var g=0;i===Tn;)g++,i=A[--t];if(g%2===0)return KA}return Kn},vp=function(e){var A=fp(e),r=A.length,t=0,i=0,l=A.map(bp);return {next:function(){if(t>=r)return {done:true,value:null};for(var d=KA;t<r&&(d=Cp(A,l,++t))===KA;);if(d!==KA||t===r){var g=wp.apply(null,A.slice(i,t));return i=t,{value:g,done:false}}return {done:true,value:null}}}},yp=function(e){for(var A=vp(e),r=[],t;!(t=A.next()).done;)t.value&&r.push(t.value.slice());return r},Qp=function(e){var A=123;if(e.createRange){var r=e.createRange();if(r.getBoundingClientRect){var t=e.createElement("boundtest");t.style.height=A+"px",t.style.display="block",e.body.appendChild(t),r.selectNode(t);var i=r.getBoundingClientRect(),l=Math.round(i.height);if(e.body.removeChild(t),l===A)return  true}}return  false},Fp=function(e){var A=e.createElement("boundtest");A.style.width="50px",A.style.display="block",A.style.fontSize="12px",A.style.letterSpacing="0px",A.style.wordSpacing="0px",e.body.appendChild(A);var r=e.createRange();A.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var t=A.firstChild,i=y(t.data).map(function(h){return v(h)}),l=0,d={},g=i.every(function(h,f){r.setStart(t,l),r.setEnd(t,l+h.length);var w=r.getBoundingClientRect();l+=h.length;var C=w.x>d.x||w.y>d.y;return d=w,f===0?true:C});return e.body.removeChild(A),g},xp=function(){return typeof new Image().crossOrigin<"u"},Up=function(){return typeof new XMLHttpRequest().responseType=="string"},Ep=function(e){var A=new Image,r=e.createElement("canvas"),t=r.getContext("2d");if(!t)return  false;A.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{t.drawImage(A,0,0),r.toDataURL();}catch{return  false}return  true},Di=function(e){return e[0]===0&&e[1]===255&&e[2]===0&&e[3]===255},Hp=function(e){var A=e.createElement("canvas"),r=100;A.width=r,A.height=r;var t=A.getContext("2d");if(!t)return Promise.reject(false);t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,r,r);var i=new Image,l=A.toDataURL();i.src=l;var d=Dn(r,r,0,0,i);return t.fillStyle="red",t.fillRect(0,0,r,r),Mi(d).then(function(g){t.drawImage(g,0,0);var h=t.getImageData(0,0,r,r).data;t.fillStyle="red",t.fillRect(0,0,r,r);var f=e.createElement("div");return f.style.backgroundImage="url("+l+")",f.style.height=r+"px",Di(h)?Mi(Dn(r,r,0,0,f)):Promise.reject(false)}).then(function(g){return t.drawImage(g,0,0),Di(t.getImageData(0,0,r,r).data)}).catch(function(){return  false})},Dn=function(e,A,r,t,i){var l="http://www.w3.org/2000/svg",d=document.createElementNS(l,"svg"),g=document.createElementNS(l,"foreignObject");return d.setAttributeNS(null,"width",e.toString()),d.setAttributeNS(null,"height",A.toString()),g.setAttributeNS(null,"width","100%"),g.setAttributeNS(null,"height","100%"),g.setAttributeNS(null,"x",r.toString()),g.setAttributeNS(null,"y",t.toString()),g.setAttributeNS(null,"externalResourcesRequired","true"),d.appendChild(g),g.appendChild(i),d},Mi=function(e){return new Promise(function(A,r){var t=new Image;t.onload=function(){return A(t)},t.onerror=r,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(e));})},bA={get SUPPORT_RANGE_BOUNDS(){var e=Qp(document);return Object.defineProperty(bA,"SUPPORT_RANGE_BOUNDS",{value:e}),e},get SUPPORT_WORD_BREAKING(){var e=bA.SUPPORT_RANGE_BOUNDS&&Fp(document);return Object.defineProperty(bA,"SUPPORT_WORD_BREAKING",{value:e}),e},get SUPPORT_SVG_DRAWING(){var e=Ep(document);return Object.defineProperty(bA,"SUPPORT_SVG_DRAWING",{value:e}),e},get SUPPORT_FOREIGNOBJECT_DRAWING(){var e=typeof Array.from=="function"&&typeof window.fetch=="function"?Hp(document):Promise.resolve(false);return Object.defineProperty(bA,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:e}),e},get SUPPORT_CORS_IMAGES(){var e=xp();return Object.defineProperty(bA,"SUPPORT_CORS_IMAGES",{value:e}),e},get SUPPORT_RESPONSE_TYPE(){var e=Up();return Object.defineProperty(bA,"SUPPORT_RESPONSE_TYPE",{value:e}),e},get SUPPORT_CORS_XHR(){var e="withCredentials"in new XMLHttpRequest;return Object.defineProperty(bA,"SUPPORT_CORS_XHR",{value:e}),e},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var e=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(bA,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:e}),e}},lt=(function(){function e(A,r){this.text=A,this.bounds=r;}return e})(),kp=function(e,A,r,t){var i=Lp(A,r),l=[],d=0;return i.forEach(function(g){if(r.textDecorationLine.length||g.trim().length>0)if(bA.SUPPORT_RANGE_BOUNDS){var h=Ri(t,d,g.length).getClientRects();if(h.length>1){var f=Mn(g),w=0;f.forEach(function(Q){l.push(new lt(Q,u.fromDOMRectList(e,Ri(t,w+d,Q.length).getClientRects()))),w+=Q.length;});}else l.push(new lt(g,u.fromDOMRectList(e,h)));}else {var C=t.splitText(g.length);l.push(new lt(g,Ip(e,t))),t=C;}else bA.SUPPORT_RANGE_BOUNDS||(t=t.splitText(g.length));d+=g.length;}),l},Ip=function(e,A){var r=A.ownerDocument;if(r){var t=r.createElement("html2canvaswrapper");t.appendChild(A.cloneNode(true));var i=A.parentNode;if(i){i.replaceChild(t,A);var l=B(e,t);return t.firstChild&&i.replaceChild(t.firstChild,t),l}}return u.EMPTY},Ri=function(e,A,r){var t=e.ownerDocument;if(!t)throw new Error("Node has no owner document");var i=t.createRange();return i.setStart(e,A),i.setEnd(e,A+r),i},Mn=function(e){if(bA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var A=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(A.segment(e)).map(function(r){return r.segment})}return yp(e)},Sp=function(e,A){if(bA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var r=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(r.segment(e)).map(function(t){return t.segment})}return Kp(e,A)},Lp=function(e,A){return A.letterSpacing!==0?Mn(e):Sp(e,A)},Tp=[32,160,4961,65792,65793,4153,4241],Kp=function(e,A){for(var r=al(e,{lineBreak:A.lineBreak,wordBreak:A.overflowWrap==="break-word"?"break-word":A.wordBreak}),t=[],i,l=function(){if(i.value){var d=i.value.slice(),g=y(d),h="";g.forEach(function(f){Tp.indexOf(f)===-1?h+=v(f):(h.length&&t.push(h),t.push(v(f)),h="");}),h.length&&t.push(h);}};!(i=r.next()).done;)l();return t},Dp=(function(){function e(A,r,t){this.text=Mp(r.data,t.textTransform),this.textBounds=kp(A,this.text,t,r);}return e})(),Mp=function(e,A){switch(A){case 1:return e.toLowerCase();case 3:return e.replace(Rp,Op);case 2:return e.toUpperCase();default:return e}},Rp=/(^|\s|:|-|\(|\))([a-z])/g,Op=function(e,A,r){return e.length>0?A+r.toUpperCase():e},Oi=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i.src=t.currentSrc||t.src,i.intrinsicWidth=t.naturalWidth,i.intrinsicHeight=t.naturalHeight,i.context.cache.addImage(i.src),i}return A})(_A),Ni=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i.canvas=t,i.intrinsicWidth=t.width,i.intrinsicHeight=t.height,i}return A})(_A),Pi=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this,l=new XMLSerializer,d=B(r,t);return t.setAttribute("width",d.width+"px"),t.setAttribute("height",d.height+"px"),i.svg="data:image/svg+xml,"+encodeURIComponent(l.serializeToString(t)),i.intrinsicWidth=t.width.baseVal.value,i.intrinsicHeight=t.height.baseVal.value,i.context.cache.addImage(i.svg),i}return A})(_A),_i=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i.value=t.value,i}return A})(_A),Rn=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i.start=t.start,i.reversed=typeof t.reversed=="boolean"&&t.reversed===true,i}return A})(_A),Np=[{type:15,flags:0,unit:"px",number:3}],Pp=[{type:16,flags:0,number:50}],_p=function(e){return e.width>e.height?new u(e.left+(e.width-e.height)/2,e.top,e.height,e.height):e.width<e.height?new u(e.left,e.top+(e.height-e.width)/2,e.width,e.width):e},Gp=function(e){var A=e.type===Vp?new Array(e.value.length+1).join("\u2022"):e.value;return A.length===0?e.placeholder||"":A},lr="checkbox",cr="radio",Vp="password",Gi=707406591,On=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;switch(i.type=t.type.toLowerCase(),i.checked=t.checked,i.value=Gp(t),(i.type===lr||i.type===cr)&&(i.styles.backgroundColor=3739148031,i.styles.borderTopColor=i.styles.borderRightColor=i.styles.borderBottomColor=i.styles.borderLeftColor=2779096575,i.styles.borderTopWidth=i.styles.borderRightWidth=i.styles.borderBottomWidth=i.styles.borderLeftWidth=1,i.styles.borderTopStyle=i.styles.borderRightStyle=i.styles.borderBottomStyle=i.styles.borderLeftStyle=1,i.styles.backgroundClip=[0],i.styles.backgroundOrigin=[0],i.bounds=_p(i.bounds)),i.type){case lr:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=Np;break;case cr:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=Pp;break}return i}return A})(_A),Vi=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this,l=t.options[t.selectedIndex||0];return i.value=l&&l.text||"",i}return A})(_A),Xi=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i.value=t.value,i}return A})(_A),Yi=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;i.src=t.src,i.width=parseInt(t.width,10)||0,i.height=parseInt(t.height,10)||0,i.backgroundColor=i.styles.backgroundColor;try{if(t.contentWindow&&t.contentWindow.document&&t.contentWindow.document.documentElement){i.tree=Wi(r,t.contentWindow.document.documentElement);var l=t.contentWindow.document.documentElement?it(r,getComputedStyle(t.contentWindow.document.documentElement).backgroundColor):YA.TRANSPARENT,d=t.contentWindow.document.body?it(r,getComputedStyle(t.contentWindow.document.body).backgroundColor):YA.TRANSPARENT;i.backgroundColor=ne(l)?ne(d)?i.styles.backgroundColor:d:l;}}catch{}return i}return A})(_A),Xp=["OL","UL","MENU"],dr=function(e,A,r,t){for(var i=A.firstChild,l=void 0;i;i=l)if(l=i.nextSibling,ji(i)&&i.data.trim().length>0)r.textNodes.push(new Dp(e,i,r.styles));else if(Se(i))if(eo(i)&&i.assignedNodes)i.assignedNodes().forEach(function(g){return dr(e,g,r,t)});else {var d=Ji(e,i);d.styles.isVisible()&&(Yp(i,d,t)?d.flags|=4:Jp(d.styles)&&(d.flags|=2),Xp.indexOf(i.tagName)!==-1&&(d.flags|=8),r.elements.push(d),i.slot,i.shadowRoot?dr(e,i.shadowRoot,d,t):!ur(i)&&!$i(i)&&!hr(i)&&dr(e,i,d,t));}},Ji=function(e,A){return _n(A)?new Oi(e,A):zi(A)?new Ni(e,A):$i(A)?new Pi(e,A):Wp(A)?new _i(e,A):jp(A)?new Rn(e,A):$p(A)?new On(e,A):hr(A)?new Vi(e,A):ur(A)?new Xi(e,A):qi(A)?new Yi(e,A):new _A(e,A)},Wi=function(e,A){var r=Ji(e,A);return r.flags|=4,dr(e,A,r,r),r},Yp=function(e,A,r){return A.styles.isPositionedWithZIndex()||A.styles.opacity<1||A.styles.isTransformed()||Pn(e)&&r.styles.isTransparent()},Jp=function(e){return e.isPositioned()||e.isFloating()},ji=function(e){return e.nodeType===Node.TEXT_NODE},Se=function(e){return e.nodeType===Node.ELEMENT_NODE},Nn=function(e){return Se(e)&&typeof e.style<"u"&&!pr(e)},pr=function(e){return typeof e.className=="object"},Wp=function(e){return e.tagName==="LI"},jp=function(e){return e.tagName==="OL"},$p=function(e){return e.tagName==="INPUT"},zp=function(e){return e.tagName==="HTML"},$i=function(e){return e.tagName==="svg"},Pn=function(e){return e.tagName==="BODY"},zi=function(e){return e.tagName==="CANVAS"},Zi=function(e){return e.tagName==="VIDEO"},_n=function(e){return e.tagName==="IMG"},qi=function(e){return e.tagName==="IFRAME"},Ao=function(e){return e.tagName==="STYLE"},Zp=function(e){return e.tagName==="SCRIPT"},ur=function(e){return e.tagName==="TEXTAREA"},hr=function(e){return e.tagName==="SELECT"},eo=function(e){return e.tagName==="SLOT"},to=function(e){return e.tagName.indexOf("-")>0},qp=(function(){function e(){this.counters={};}return e.prototype.getCounterValue=function(A){var r=this.counters[A];return r&&r.length?r[r.length-1]:1},e.prototype.getCounterValues=function(A){var r=this.counters[A];return r||[]},e.prototype.pop=function(A){var r=this;A.forEach(function(t){return r.counters[t].pop()});},e.prototype.parse=function(A){var r=this,t=A.counterIncrement,i=A.counterReset,l=true;t!==null&&t.forEach(function(g){var h=r.counters[g.counter];h&&g.increment!==0&&(l=false,h.length||h.push(1),h[Math.max(0,h.length-1)]+=g.increment);});var d=[];return l&&i.forEach(function(g){var h=r.counters[g.counter];d.push(g.counter),h||(h=r.counters[g.counter]=[]),h.push(g.reset);}),d},e})(),ro={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},no={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["\u0554","\u0553","\u0552","\u0551","\u0550","\u054F","\u054E","\u054D","\u054C","\u054B","\u054A","\u0549","\u0548","\u0547","\u0546","\u0545","\u0544","\u0543","\u0542","\u0541","\u0540","\u053F","\u053E","\u053D","\u053C","\u053B","\u053A","\u0539","\u0538","\u0537","\u0536","\u0535","\u0534","\u0533","\u0532","\u0531"]},Au={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["\u05D9\u05F3","\u05D8\u05F3","\u05D7\u05F3","\u05D6\u05F3","\u05D5\u05F3","\u05D4\u05F3","\u05D3\u05F3","\u05D2\u05F3","\u05D1\u05F3","\u05D0\u05F3","\u05EA","\u05E9","\u05E8","\u05E7","\u05E6","\u05E4","\u05E2","\u05E1","\u05E0","\u05DE","\u05DC","\u05DB","\u05D9\u05D8","\u05D9\u05D7","\u05D9\u05D6","\u05D8\u05D6","\u05D8\u05D5","\u05D9","\u05D8","\u05D7","\u05D6","\u05D5","\u05D4","\u05D3","\u05D2","\u05D1","\u05D0"]},eu={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["\u10F5","\u10F0","\u10EF","\u10F4","\u10EE","\u10ED","\u10EC","\u10EB","\u10EA","\u10E9","\u10E8","\u10E7","\u10E6","\u10E5","\u10E4","\u10F3","\u10E2","\u10E1","\u10E0","\u10DF","\u10DE","\u10DD","\u10F2","\u10DC","\u10DB","\u10DA","\u10D9","\u10D8","\u10D7","\u10F1","\u10D6","\u10D5","\u10D4","\u10D3","\u10D2","\u10D1","\u10D0"]},Le=function(e,A,r,t,i,l){return e<A||e>r?dt(e,i,l.length>0):t.integers.reduce(function(d,g,h){for(;e>=g;)e-=g,d+=t.values[h];return d},"")+l},so=function(e,A,r,t){var i="";do r||e--,i=t(e)+i,e/=A;while(e*A>=A);return i},pA=function(e,A,r,t,i){var l=r-A+1;return (e<0?"-":"")+(so(Math.abs(e),l,t,function(d){return v(Math.floor(d%l)+A)})+i)},fe=function(e,A,r){r===void 0&&(r=". ");var t=A.length;return so(Math.abs(e),t,false,function(i){return A[Math.floor(i%t)]})+r},Te=1,ie=2,oe=4,ct=8,JA=function(e,A,r,t,i,l){if(e<-9999||e>9999)return dt(e,4,i.length>0);var d=Math.abs(e),g=i;if(d===0)return A[0]+g;for(var h=0;d>0&&h<=4;h++){var f=d%10;f===0&&BA(l,Te)&&g!==""?g=A[f]+g:f>1||f===1&&h===0||f===1&&h===1&&BA(l,ie)||f===1&&h===1&&BA(l,oe)&&e>100||f===1&&h>1&&BA(l,ct)?g=A[f]+(h>0?r[h-1]:"")+g:f===1&&h>0&&(g=r[h-1]+g),d=Math.floor(d/10);}return (e<0?t:"")+g},io="\u5341\u767E\u5343\u842C",oo="\u62FE\u4F70\u4EDF\u842C",ao="\u30DE\u30A4\u30CA\u30B9",Gn="\uB9C8\uC774\uB108\uC2A4",dt=function(e,A,r){var t=r?". ":"",i=r?"\u3001":"",l=r?", ":"",d=r?" ":"";switch(A){case 0:return "\u2022"+d;case 1:return "\u25E6"+d;case 2:return "\u25FE"+d;case 5:var g=pA(e,48,57,true,t);return g.length<4?"0"+g:g;case 4:return fe(e,"\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D",i);case 6:return Le(e,1,3999,ro,3,t).toLowerCase();case 7:return Le(e,1,3999,ro,3,t);case 8:return pA(e,945,969,false,t);case 9:return pA(e,97,122,false,t);case 10:return pA(e,65,90,false,t);case 11:return pA(e,1632,1641,true,t);case 12:case 49:return Le(e,1,9999,no,3,t);case 35:return Le(e,1,9999,no,3,t).toLowerCase();case 13:return pA(e,2534,2543,true,t);case 14:case 30:return pA(e,6112,6121,true,t);case 15:return fe(e,"\u5B50\u4E11\u5BC5\u536F\u8FB0\u5DF3\u5348\u672A\u7533\u9149\u620C\u4EA5",i);case 16:return fe(e,"\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678",i);case 17:case 48:return JA(e,"\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D",io,"\u8CA0",i,ie|oe|ct);case 47:return JA(e,"\u96F6\u58F9\u8CB3\u53C3\u8086\u4F0D\u9678\u67D2\u634C\u7396",oo,"\u8CA0",i,Te|ie|oe|ct);case 42:return JA(e,"\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D",io,"\u8D1F",i,ie|oe|ct);case 41:return JA(e,"\u96F6\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396",oo,"\u8D1F",i,Te|ie|oe|ct);case 26:return JA(e,"\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D","\u5341\u767E\u5343\u4E07",ao,i,0);case 25:return JA(e,"\u96F6\u58F1\u5F10\u53C2\u56DB\u4F0D\u516D\u4E03\u516B\u4E5D","\u62FE\u767E\u5343\u4E07",ao,i,Te|ie|oe);case 31:return JA(e,"\uC601\uC77C\uC774\uC0BC\uC0AC\uC624\uC721\uCE60\uD314\uAD6C","\uC2ED\uBC31\uCC9C\uB9CC",Gn,l,Te|ie|oe);case 33:return JA(e,"\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D","\u5341\u767E\u5343\u842C",Gn,l,0);case 32:return JA(e,"\u96F6\u58F9\u8CB3\u53C3\u56DB\u4E94\u516D\u4E03\u516B\u4E5D","\u62FE\u767E\u5343",Gn,l,Te|ie|oe);case 18:return pA(e,2406,2415,true,t);case 20:return Le(e,1,19999,eu,3,t);case 21:return pA(e,2790,2799,true,t);case 22:return pA(e,2662,2671,true,t);case 22:return Le(e,1,10999,Au,3,t);case 23:return fe(e,"\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3090\u3091\u3092\u3093");case 24:return fe(e,"\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084\u307E\u3051\u3075\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059");case 27:return pA(e,3302,3311,true,t);case 28:return fe(e,"\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F0\u30F1\u30F2\u30F3",i);case 29:return fe(e,"\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4\u30CD\u30CA\u30E9\u30E0\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE\u30B1\u30D5\u30B3\u30A8\u30C6\u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7\u30F1\u30D2\u30E2\u30BB\u30B9",i);case 34:return pA(e,3792,3801,true,t);case 37:return pA(e,6160,6169,true,t);case 38:return pA(e,4160,4169,true,t);case 39:return pA(e,2918,2927,true,t);case 40:return pA(e,1776,1785,true,t);case 43:return pA(e,3046,3055,true,t);case 44:return pA(e,3174,3183,true,t);case 45:return pA(e,3664,3673,true,t);case 46:return pA(e,3872,3881,true,t);default:return pA(e,48,57,true,t)}},lo="data-html2canvas-ignore",co=(function(){function e(A,r,t){if(this.context=A,this.options=t,this.scrolledElements=[],this.referenceElement=r,this.counters=new qp,this.quoteDepth=0,!r.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(r.ownerDocument.documentElement,false);}return e.prototype.toIFrame=function(A,r){var t=this,i=tu(A,r);if(!i.contentWindow)return Promise.reject("Unable to find iframe window");var l=A.defaultView.pageXOffset,d=A.defaultView.pageYOffset,g=i.contentWindow,h=g.document,f=su(i).then(function(){return a(t,void 0,void 0,function(){var w,C;return c(this,function(Q){switch(Q.label){case 0:return this.scrolledElements.forEach(lu),g&&(g.scrollTo(r.left,r.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(g.scrollY!==r.top||g.scrollX!==r.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(g.scrollX-r.left,g.scrollY-r.top,0,0))),w=this.options.onclone,C=this.clonedReferenceElement,typeof C>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:h.fonts&&h.fonts.ready?[4,h.fonts.ready]:[3,2];case 1:Q.sent(),Q.label=2;case 2:return /(AppleWebKit)/g.test(navigator.userAgent)?[4,nu(h)]:[3,4];case 3:Q.sent(),Q.label=4;case 4:return typeof w=="function"?[2,Promise.resolve().then(function(){return w(h,C)}).then(function(){return i})]:[2,i]}})})});return h.open(),h.write(ou(document.doctype)+"<html></html>"),au(this.referenceElement.ownerDocument,l,d),h.replaceChild(h.adoptNode(this.documentElement),h.documentElement),h.close(),f},e.prototype.createElementClone=function(A){if(xn(A,2))debugger;if(zi(A))return this.createCanvasClone(A);if(Zi(A))return this.createVideoClone(A);if(Ao(A))return this.createStyleClone(A);var r=A.cloneNode(false);return _n(r)&&(_n(A)&&A.currentSrc&&A.currentSrc!==A.src&&(r.src=A.currentSrc,r.srcset=""),r.loading==="lazy"&&(r.loading="eager")),to(r)?this.createCustomElementClone(r):r},e.prototype.createCustomElementClone=function(A){var r=document.createElement("html2canvascustomelement");return Vn(A.style,r),r},e.prototype.createStyleClone=function(A){try{var r=A.sheet;if(r&&r.cssRules){var t=[].slice.call(r.cssRules,0).reduce(function(l,d){return d&&typeof d.cssText=="string"?l+d.cssText:l},""),i=A.cloneNode(!1);return i.textContent=t,i}}catch(l){if(this.context.logger.error("Unable to access cssRules property",l),l.name!=="SecurityError")throw l}return A.cloneNode(false)},e.prototype.createCanvasClone=function(A){var r;if(this.options.inlineImages&&A.ownerDocument){var t=A.ownerDocument.createElement("img");try{return t.src=A.toDataURL(),t}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",A);}}var i=A.cloneNode(false);try{i.width=A.width,i.height=A.height;var l=A.getContext("2d"),d=i.getContext("2d");if(d)if(!this.options.allowTaint&&l)d.putImageData(l.getImageData(0,0,A.width,A.height),0,0);else {var g=(r=A.getContext("webgl2"))!==null&&r!==void 0?r:A.getContext("webgl");if(g){var h=g.getContextAttributes();h?.preserveDrawingBuffer===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",A);}d.drawImage(A,0,0);}return i}catch{this.context.logger.info("Unable to clone canvas as it is tainted",A);}return i},e.prototype.createVideoClone=function(A){var r=A.ownerDocument.createElement("canvas");r.width=A.offsetWidth,r.height=A.offsetHeight;var t=r.getContext("2d");try{return t&&(t.drawImage(A,0,0,r.width,r.height),this.options.allowTaint||t.getImageData(0,0,r.width,r.height)),r}catch{this.context.logger.info("Unable to clone video as it is tainted",A);}var i=A.ownerDocument.createElement("canvas");return i.width=A.offsetWidth,i.height=A.offsetHeight,i},e.prototype.appendChildNode=function(A,r,t){(!Se(r)||!Zp(r)&&!r.hasAttribute(lo)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(r)))&&(!this.options.copyStyles||!Se(r)||!Ao(r))&&A.appendChild(this.cloneNode(r,t));},e.prototype.cloneChildNodes=function(A,r,t){for(var i=this,l=A.shadowRoot?A.shadowRoot.firstChild:A.firstChild;l;l=l.nextSibling)if(Se(l)&&eo(l)&&typeof l.assignedNodes=="function"){var d=l.assignedNodes();d.length&&d.forEach(function(g){return i.appendChildNode(r,g,t)});}else this.appendChildNode(r,l,t);},e.prototype.cloneNode=function(A,r){if(ji(A))return document.createTextNode(A.data);if(!A.ownerDocument)return A.cloneNode(false);var t=A.ownerDocument.defaultView;if(t&&Se(A)&&(Nn(A)||pr(A))){var i=this.createElementClone(A);i.style.transitionProperty="none";var l=t.getComputedStyle(A),d=t.getComputedStyle(A,":before"),g=t.getComputedStyle(A,":after");this.referenceElement===A&&Nn(i)&&(this.clonedReferenceElement=i),Pn(i)&&pu(i);var h=this.counters.parse(new Qi(this.context,l)),f=this.resolvePseudoContent(A,i,d,pt.BEFORE);to(A)&&(r=true),Zi(A)||this.cloneChildNodes(A,i,r),f&&i.insertBefore(f,i.firstChild);var w=this.resolvePseudoContent(A,i,g,pt.AFTER);return w&&i.appendChild(w),this.counters.pop(h),(l&&(this.options.copyStyles||pr(A))&&!qi(A)||r)&&Vn(l,i),(A.scrollTop!==0||A.scrollLeft!==0)&&this.scrolledElements.push([i,A.scrollLeft,A.scrollTop]),(ur(A)||hr(A))&&(ur(i)||hr(i))&&(i.value=A.value),i}return A.cloneNode(false)},e.prototype.resolvePseudoContent=function(A,r,t,i){var l=this;if(t){var d=t.content,g=r.ownerDocument;if(!(!g||!d||d==="none"||d==="-moz-alt-content"||t.display==="none")){this.counters.parse(new Qi(this.context,t));var h=new Wd(this.context,t),f=g.createElement("html2canvaspseudoelement");Vn(t,f),h.content.forEach(function(C){if(C.type===0)f.appendChild(g.createTextNode(C.value));else if(C.type===22){var Q=g.createElement("img");Q.src=C.value,Q.style.opacity="1",f.appendChild(Q);}else if(C.type===18){if(C.name==="attr"){var L=C.values.filter(iA);L.length&&f.appendChild(g.createTextNode(A.getAttribute(L[0].value)||""));}else if(C.name==="counter"){var E=C.values.filter(ke),k=E[0],J=E[1];if(k&&iA(k)){var D=l.counters.getCounterValue(k.value),K=J&&iA(J)?Fn.parse(l.context,J.value):3;f.appendChild(g.createTextNode(dt(D,K,false)));}}else if(C.name==="counters"){var rA=C.values.filter(ke),k=rA[0],W=rA[1],J=rA[2];if(k&&iA(k)){var X=l.counters.getCounterValues(k.value),S=J&&iA(J)?Fn.parse(l.context,J.value):3,q=W&&W.type===0?W.value:"",AA=X.map(function(xA){return dt(xA,S,false)}).join(q);f.appendChild(g.createTextNode(AA));}}}else if(C.type===20)switch(C.value){case "open-quote":f.appendChild(g.createTextNode(yi(h.quotes,l.quoteDepth++,true)));break;case "close-quote":f.appendChild(g.createTextNode(yi(h.quotes,--l.quoteDepth,false)));break;default:f.appendChild(g.createTextNode(C.value));}}),f.className=Xn+" "+Yn;var w=i===pt.BEFORE?" "+Xn:" "+Yn;return pr(r)?r.className.baseValue+=w:r.className+=w,f}}},e.destroy=function(A){return A.parentNode?(A.parentNode.removeChild(A),true):false},e})(),pt;(function(e){e[e.BEFORE=0]="BEFORE",e[e.AFTER=1]="AFTER";})(pt||(pt={}));var tu=function(e,A){var r=e.createElement("iframe");return r.className="html2canvas-container",r.style.visibility="hidden",r.style.position="fixed",r.style.left="-10000px",r.style.top="0px",r.style.border="0",r.width=A.width.toString(),r.height=A.height.toString(),r.scrolling="no",r.setAttribute(lo,"true"),e.body.appendChild(r),r},ru=function(e){return new Promise(function(A){if(e.complete){A();return}if(!e.src){A();return}e.onload=A,e.onerror=A;})},nu=function(e){return Promise.all([].slice.call(e.images,0).map(ru))},su=function(e){return new Promise(function(A,r){var t=e.contentWindow;if(!t)return r("No window assigned for iframe");var i=t.document;t.onload=e.onload=function(){t.onload=e.onload=null;var l=setInterval(function(){i.body.childNodes.length>0&&i.readyState==="complete"&&(clearInterval(l),A(e));},50);};})},iu=["all","d","content"],Vn=function(e,A){for(var r=e.length-1;r>=0;r--){var t=e.item(r);iu.indexOf(t)===-1&&A.style.setProperty(t,e.getPropertyValue(t));}return A},ou=function(e){var A="";return e&&(A+="<!DOCTYPE ",e.name&&(A+=e.name),e.internalSubset&&(A+=e.internalSubset),e.publicId&&(A+='"'+e.publicId+'"'),e.systemId&&(A+='"'+e.systemId+'"'),A+=">"),A},au=function(e,A,r){e&&e.defaultView&&(A!==e.defaultView.pageXOffset||r!==e.defaultView.pageYOffset)&&e.defaultView.scrollTo(A,r);},lu=function(e){var A=e[0],r=e[1],t=e[2];A.scrollLeft=r,A.scrollTop=t;},cu=":before",du=":after",Xn="___html2canvas___pseudoelement_before",Yn="___html2canvas___pseudoelement_after",po=`{
    content: "" !important;
    display: none !important;
}`,pu=function(e){uu(e,"."+Xn+cu+po+`
         .`+Yn+du+po);},uu=function(e,A){var r=e.ownerDocument;if(r){var t=r.createElement("style");t.textContent=A,e.appendChild(t);}},uo=(function(){function e(){}return e.getOrigin=function(A){var r=e._link;return r?(r.href=A,r.href=r.href,r.protocol+r.hostname+r.port):"about:blank"},e.isSameOrigin=function(A){return e.getOrigin(A)===e._origin},e.setContext=function(A){e._link=A.document.createElement("a"),e._origin=e.getOrigin(A.location.href);},e._origin="about:blank",e})(),hu=(function(){function e(A,r){this.context=A,this._options=r,this._cache={};}return e.prototype.addImage=function(A){var r=Promise.resolve();return this.has(A)||(Wn(A)||wu(A))&&(this._cache[A]=this.loadImage(A)).catch(function(){}),r},e.prototype.match=function(A){return this._cache[A]},e.prototype.loadImage=function(A){return a(this,void 0,void 0,function(){var r,t,i,l,d=this;return c(this,function(g){switch(g.label){case 0:return r=uo.isSameOrigin(A),t=!Jn(A)&&this._options.useCORS===true&&bA.SUPPORT_CORS_IMAGES&&!r,i=!Jn(A)&&!r&&!Wn(A)&&typeof this._options.proxy=="string"&&bA.SUPPORT_CORS_XHR&&!t,!r&&this._options.allowTaint===false&&!Jn(A)&&!Wn(A)&&!i&&!t?[2]:(l=A,i?[4,this.proxy(l)]:[3,2]);case 1:l=g.sent(),g.label=2;case 2:return this.context.logger.debug("Added image "+A.substring(0,256)),[4,new Promise(function(h,f){var w=new Image;w.onload=function(){return h(w)},w.onerror=f,(mu(l)||t)&&(w.crossOrigin="anonymous"),w.src=l,w.complete===true&&setTimeout(function(){return h(w)},500),d._options.imageTimeout>0&&setTimeout(function(){return f("Timed out ("+d._options.imageTimeout+"ms) loading image")},d._options.imageTimeout);})];case 3:return [2,g.sent()]}})})},e.prototype.has=function(A){return typeof this._cache[A]<"u"},e.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},e.prototype.proxy=function(A){var r=this,t=this._options.proxy;if(!t)throw new Error("No proxy defined");var i=A.substring(0,256);return new Promise(function(l,d){var g=bA.SUPPORT_RESPONSE_TYPE?"blob":"text",h=new XMLHttpRequest;h.onload=function(){if(h.status===200)if(g==="text")l(h.response);else {var C=new FileReader;C.addEventListener("load",function(){return l(C.result)},false),C.addEventListener("error",function(Q){return d(Q)},false),C.readAsDataURL(h.response);}else d("Failed to proxy resource "+i+" with status code "+h.status);},h.onerror=d;var f=t.indexOf("?")>-1?"&":"?";if(h.open("GET",""+t+f+"url="+encodeURIComponent(A)+"&responseType="+g),g!=="text"&&h instanceof XMLHttpRequest&&(h.responseType=g),r._options.imageTimeout){var w=r._options.imageTimeout;h.timeout=w,h.ontimeout=function(){return d("Timed out ("+w+"ms) proxying "+i)};}h.send();})},e})(),gu=/^data:image\/svg\+xml/i,Bu=/^data:image\/.*;base64,/i,fu=/^data:image\/.*/i,wu=function(e){return bA.SUPPORT_SVG_DRAWING||!bu(e)},Jn=function(e){return fu.test(e)},mu=function(e){return Bu.test(e)},Wn=function(e){return e.substr(0,4)==="blob"},bu=function(e){return e.substr(-3).toLowerCase()==="svg"||gu.test(e)},I=(function(){function e(A,r){this.type=0,this.x=A,this.y=r;}return e.prototype.add=function(A,r){return new e(this.x+A,this.y+r)},e})(),Ke=function(e,A,r){return new I(e.x+(A.x-e.x)*r,e.y+(A.y-e.y)*r)},gr=(function(){function e(A,r,t,i){this.type=1,this.start=A,this.startControl=r,this.endControl=t,this.end=i;}return e.prototype.subdivide=function(A,r){var t=Ke(this.start,this.startControl,A),i=Ke(this.startControl,this.endControl,A),l=Ke(this.endControl,this.end,A),d=Ke(t,i,A),g=Ke(i,l,A),h=Ke(d,g,A);return r?new e(this.start,t,d,h):new e(h,g,l,this.end)},e.prototype.add=function(A,r){return new e(this.start.add(A,r),this.startControl.add(A,r),this.endControl.add(A,r),this.end.add(A,r))},e.prototype.reverse=function(){return new e(this.end,this.endControl,this.startControl,this.start)},e})(),DA=function(e){return e.type===1},Cu=(function(){function e(A){var r=A.styles,t=A.bounds,i=st(r.borderTopLeftRadius,t.width,t.height),l=i[0],d=i[1],g=st(r.borderTopRightRadius,t.width,t.height),h=g[0],f=g[1],w=st(r.borderBottomRightRadius,t.width,t.height),C=w[0],Q=w[1],L=st(r.borderBottomLeftRadius,t.width,t.height),E=L[0],k=L[1],J=[];J.push((l+h)/t.width),J.push((E+C)/t.width),J.push((d+k)/t.height),J.push((f+Q)/t.height);var D=Math.max.apply(Math,J);D>1&&(l/=D,d/=D,h/=D,f/=D,C/=D,Q/=D,E/=D,k/=D);var K=t.width-h,rA=t.height-Q,W=t.width-C,X=t.height-k,S=r.borderTopWidth,q=r.borderRightWidth,AA=r.borderBottomWidth,Y=r.borderLeftWidth,gA=aA(r.paddingTop,A.bounds.width),xA=aA(r.paddingRight,A.bounds.width),IA=aA(r.paddingBottom,A.bounds.width),oA=aA(r.paddingLeft,A.bounds.width);this.topLeftBorderDoubleOuterBox=l>0||d>0?cA(t.left+Y/3,t.top+S/3,l-Y/3,d-S/3,nA.TOP_LEFT):new I(t.left+Y/3,t.top+S/3),this.topRightBorderDoubleOuterBox=l>0||d>0?cA(t.left+K,t.top+S/3,h-q/3,f-S/3,nA.TOP_RIGHT):new I(t.left+t.width-q/3,t.top+S/3),this.bottomRightBorderDoubleOuterBox=C>0||Q>0?cA(t.left+W,t.top+rA,C-q/3,Q-AA/3,nA.BOTTOM_RIGHT):new I(t.left+t.width-q/3,t.top+t.height-AA/3),this.bottomLeftBorderDoubleOuterBox=E>0||k>0?cA(t.left+Y/3,t.top+X,E-Y/3,k-AA/3,nA.BOTTOM_LEFT):new I(t.left+Y/3,t.top+t.height-AA/3),this.topLeftBorderDoubleInnerBox=l>0||d>0?cA(t.left+Y*2/3,t.top+S*2/3,l-Y*2/3,d-S*2/3,nA.TOP_LEFT):new I(t.left+Y*2/3,t.top+S*2/3),this.topRightBorderDoubleInnerBox=l>0||d>0?cA(t.left+K,t.top+S*2/3,h-q*2/3,f-S*2/3,nA.TOP_RIGHT):new I(t.left+t.width-q*2/3,t.top+S*2/3),this.bottomRightBorderDoubleInnerBox=C>0||Q>0?cA(t.left+W,t.top+rA,C-q*2/3,Q-AA*2/3,nA.BOTTOM_RIGHT):new I(t.left+t.width-q*2/3,t.top+t.height-AA*2/3),this.bottomLeftBorderDoubleInnerBox=E>0||k>0?cA(t.left+Y*2/3,t.top+X,E-Y*2/3,k-AA*2/3,nA.BOTTOM_LEFT):new I(t.left+Y*2/3,t.top+t.height-AA*2/3),this.topLeftBorderStroke=l>0||d>0?cA(t.left+Y/2,t.top+S/2,l-Y/2,d-S/2,nA.TOP_LEFT):new I(t.left+Y/2,t.top+S/2),this.topRightBorderStroke=l>0||d>0?cA(t.left+K,t.top+S/2,h-q/2,f-S/2,nA.TOP_RIGHT):new I(t.left+t.width-q/2,t.top+S/2),this.bottomRightBorderStroke=C>0||Q>0?cA(t.left+W,t.top+rA,C-q/2,Q-AA/2,nA.BOTTOM_RIGHT):new I(t.left+t.width-q/2,t.top+t.height-AA/2),this.bottomLeftBorderStroke=E>0||k>0?cA(t.left+Y/2,t.top+X,E-Y/2,k-AA/2,nA.BOTTOM_LEFT):new I(t.left+Y/2,t.top+t.height-AA/2),this.topLeftBorderBox=l>0||d>0?cA(t.left,t.top,l,d,nA.TOP_LEFT):new I(t.left,t.top),this.topRightBorderBox=h>0||f>0?cA(t.left+K,t.top,h,f,nA.TOP_RIGHT):new I(t.left+t.width,t.top),this.bottomRightBorderBox=C>0||Q>0?cA(t.left+W,t.top+rA,C,Q,nA.BOTTOM_RIGHT):new I(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=E>0||k>0?cA(t.left,t.top+X,E,k,nA.BOTTOM_LEFT):new I(t.left,t.top+t.height),this.topLeftPaddingBox=l>0||d>0?cA(t.left+Y,t.top+S,Math.max(0,l-Y),Math.max(0,d-S),nA.TOP_LEFT):new I(t.left+Y,t.top+S),this.topRightPaddingBox=h>0||f>0?cA(t.left+Math.min(K,t.width-q),t.top+S,K>t.width+q?0:Math.max(0,h-q),Math.max(0,f-S),nA.TOP_RIGHT):new I(t.left+t.width-q,t.top+S),this.bottomRightPaddingBox=C>0||Q>0?cA(t.left+Math.min(W,t.width-Y),t.top+Math.min(rA,t.height-AA),Math.max(0,C-q),Math.max(0,Q-AA),nA.BOTTOM_RIGHT):new I(t.left+t.width-q,t.top+t.height-AA),this.bottomLeftPaddingBox=E>0||k>0?cA(t.left+Y,t.top+Math.min(X,t.height-AA),Math.max(0,E-Y),Math.max(0,k-AA),nA.BOTTOM_LEFT):new I(t.left+Y,t.top+t.height-AA),this.topLeftContentBox=l>0||d>0?cA(t.left+Y+oA,t.top+S+gA,Math.max(0,l-(Y+oA)),Math.max(0,d-(S+gA)),nA.TOP_LEFT):new I(t.left+Y+oA,t.top+S+gA),this.topRightContentBox=h>0||f>0?cA(t.left+Math.min(K,t.width+Y+oA),t.top+S+gA,K>t.width+Y+oA?0:h-Y+oA,f-(S+gA),nA.TOP_RIGHT):new I(t.left+t.width-(q+xA),t.top+S+gA),this.bottomRightContentBox=C>0||Q>0?cA(t.left+Math.min(W,t.width-(Y+oA)),t.top+Math.min(rA,t.height+S+gA),Math.max(0,C-(q+xA)),Q-(AA+IA),nA.BOTTOM_RIGHT):new I(t.left+t.width-(q+xA),t.top+t.height-(AA+IA)),this.bottomLeftContentBox=E>0||k>0?cA(t.left+Y+oA,t.top+X,Math.max(0,E-(Y+oA)),k-(AA+IA),nA.BOTTOM_LEFT):new I(t.left+Y+oA,t.top+t.height-(AA+IA));}return e})(),nA;(function(e){e[e.TOP_LEFT=0]="TOP_LEFT",e[e.TOP_RIGHT=1]="TOP_RIGHT",e[e.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",e[e.BOTTOM_LEFT=3]="BOTTOM_LEFT";})(nA||(nA={}));var cA=function(e,A,r,t,i){var l=4*((Math.sqrt(2)-1)/3),d=r*l,g=t*l,h=e+r,f=A+t;switch(i){case nA.TOP_LEFT:return new gr(new I(e,f),new I(e,f-g),new I(h-d,A),new I(h,A));case nA.TOP_RIGHT:return new gr(new I(e,A),new I(e+d,A),new I(h,f-g),new I(h,f));case nA.BOTTOM_RIGHT:return new gr(new I(h,A),new I(h,A+g),new I(e+d,f),new I(e,f));case nA.BOTTOM_LEFT:default:return new gr(new I(h,f),new I(h-d,f),new I(e,A+g),new I(e,A))}},Br=function(e){return [e.topLeftBorderBox,e.topRightBorderBox,e.bottomRightBorderBox,e.bottomLeftBorderBox]},vu=function(e){return [e.topLeftContentBox,e.topRightContentBox,e.bottomRightContentBox,e.bottomLeftContentBox]},fr=function(e){return [e.topLeftPaddingBox,e.topRightPaddingBox,e.bottomRightPaddingBox,e.bottomLeftPaddingBox]},yu=(function(){function e(A,r,t){this.offsetX=A,this.offsetY=r,this.matrix=t,this.type=0,this.target=6;}return e})(),wr=(function(){function e(A,r){this.path=A,this.target=r,this.type=1;}return e})(),Qu=(function(){function e(A){this.opacity=A,this.type=2,this.target=6;}return e})(),Fu=function(e){return e.type===0},ho=function(e){return e.type===1},xu=function(e){return e.type===2},go=function(e,A){return e.length===A.length?e.some(function(r,t){return r===A[t]}):false},Uu=function(e,A,r,t,i){return e.map(function(l,d){switch(d){case 0:return l.add(A,r);case 1:return l.add(A+t,r);case 2:return l.add(A+t,r+i);case 3:return l.add(A,r+i)}return l})},Bo=(function(){function e(A){this.element=A,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[];}return e})(),fo=(function(){function e(A,r){if(this.container=A,this.parent=r,this.effects=[],this.curves=new Cu(this.container),this.container.styles.opacity<1&&this.effects.push(new Qu(this.container.styles.opacity)),this.container.styles.transform!==null){var t=this.container.bounds.left+this.container.styles.transformOrigin[0].number,i=this.container.bounds.top+this.container.styles.transformOrigin[1].number,l=this.container.styles.transform;this.effects.push(new yu(t,i,l));}if(this.container.styles.overflowX!==0){var d=Br(this.curves),g=fr(this.curves);go(d,g)?this.effects.push(new wr(d,6)):(this.effects.push(new wr(d,2)),this.effects.push(new wr(g,4)));}}return e.prototype.getEffects=function(A){for(var r=[2,3].indexOf(this.container.styles.position)===-1,t=this.parent,i=this.effects.slice(0);t;){var l=t.effects.filter(function(h){return !ho(h)});if(r||t.container.styles.position!==0||!t.parent){if(i.unshift.apply(i,l),r=[2,3].indexOf(t.container.styles.position)===-1,t.container.styles.overflowX!==0){var d=Br(t.curves),g=fr(t.curves);go(d,g)||i.unshift(new wr(g,6));}}else i.unshift.apply(i,l);t=t.parent;}return i.filter(function(h){return BA(h.target,A)})},e})(),jn=function(e,A,r,t){e.container.elements.forEach(function(i){var l=BA(i.flags,4),d=BA(i.flags,2),g=new fo(i,e);BA(i.styles.display,2048)&&t.push(g);var h=BA(i.flags,8)?[]:t;if(l||d){var f=l||i.styles.isPositioned()?r:A,w=new Bo(g);if(i.styles.isPositioned()||i.styles.opacity<1||i.styles.isTransformed()){var C=i.styles.zIndex.order;if(C<0){var Q=0;f.negativeZIndex.some(function(E,k){return C>E.element.container.styles.zIndex.order?(Q=k,false):Q>0}),f.negativeZIndex.splice(Q,0,w);}else if(C>0){var L=0;f.positiveZIndex.some(function(E,k){return C>=E.element.container.styles.zIndex.order?(L=k+1,false):L>0}),f.positiveZIndex.splice(L,0,w);}else f.zeroOrAutoZIndexOrTransformedOrOpacity.push(w);}else i.styles.isFloating()?f.nonPositionedFloats.push(w):f.nonPositionedInlineLevel.push(w);jn(g,w,l?w:r,h);}else i.styles.isInlineLevel()?A.inlineLevel.push(g):A.nonInlineLevel.push(g),jn(g,A,r,h);BA(i.flags,8)&&wo(i,h);});},wo=function(e,A){for(var r=e instanceof Rn?e.start:1,t=e instanceof Rn?e.reversed:false,i=0;i<A.length;i++){var l=A[i];l.container instanceof _i&&typeof l.container.value=="number"&&l.container.value!==0&&(r=l.container.value),l.listValue=dt(r,l.container.styles.listStyleType,true),r+=t?-1:1;}},Eu=function(e){var A=new fo(e,null),r=new Bo(A),t=[];return jn(A,r,r,t),wo(A.container,t),r},mo=function(e,A){switch(A){case 0:return MA(e.topLeftBorderBox,e.topLeftPaddingBox,e.topRightBorderBox,e.topRightPaddingBox);case 1:return MA(e.topRightBorderBox,e.topRightPaddingBox,e.bottomRightBorderBox,e.bottomRightPaddingBox);case 2:return MA(e.bottomRightBorderBox,e.bottomRightPaddingBox,e.bottomLeftBorderBox,e.bottomLeftPaddingBox);default:return MA(e.bottomLeftBorderBox,e.bottomLeftPaddingBox,e.topLeftBorderBox,e.topLeftPaddingBox)}},Hu=function(e,A){switch(A){case 0:return MA(e.topLeftBorderBox,e.topLeftBorderDoubleOuterBox,e.topRightBorderBox,e.topRightBorderDoubleOuterBox);case 1:return MA(e.topRightBorderBox,e.topRightBorderDoubleOuterBox,e.bottomRightBorderBox,e.bottomRightBorderDoubleOuterBox);case 2:return MA(e.bottomRightBorderBox,e.bottomRightBorderDoubleOuterBox,e.bottomLeftBorderBox,e.bottomLeftBorderDoubleOuterBox);default:return MA(e.bottomLeftBorderBox,e.bottomLeftBorderDoubleOuterBox,e.topLeftBorderBox,e.topLeftBorderDoubleOuterBox)}},ku=function(e,A){switch(A){case 0:return MA(e.topLeftBorderDoubleInnerBox,e.topLeftPaddingBox,e.topRightBorderDoubleInnerBox,e.topRightPaddingBox);case 1:return MA(e.topRightBorderDoubleInnerBox,e.topRightPaddingBox,e.bottomRightBorderDoubleInnerBox,e.bottomRightPaddingBox);case 2:return MA(e.bottomRightBorderDoubleInnerBox,e.bottomRightPaddingBox,e.bottomLeftBorderDoubleInnerBox,e.bottomLeftPaddingBox);default:return MA(e.bottomLeftBorderDoubleInnerBox,e.bottomLeftPaddingBox,e.topLeftBorderDoubleInnerBox,e.topLeftPaddingBox)}},Iu=function(e,A){switch(A){case 0:return mr(e.topLeftBorderStroke,e.topRightBorderStroke);case 1:return mr(e.topRightBorderStroke,e.bottomRightBorderStroke);case 2:return mr(e.bottomRightBorderStroke,e.bottomLeftBorderStroke);default:return mr(e.bottomLeftBorderStroke,e.topLeftBorderStroke)}},mr=function(e,A){var r=[];return DA(e)?r.push(e.subdivide(.5,false)):r.push(e),DA(A)?r.push(A.subdivide(.5,true)):r.push(A),r},MA=function(e,A,r,t){var i=[];return DA(e)?i.push(e.subdivide(.5,false)):i.push(e),DA(r)?i.push(r.subdivide(.5,true)):i.push(r),DA(t)?i.push(t.subdivide(.5,true).reverse()):i.push(t),DA(A)?i.push(A.subdivide(.5,false).reverse()):i.push(A),i},bo=function(e){var A=e.bounds,r=e.styles;return A.add(r.borderLeftWidth,r.borderTopWidth,-(r.borderRightWidth+r.borderLeftWidth),-(r.borderTopWidth+r.borderBottomWidth))},br=function(e){var A=e.styles,r=e.bounds,t=aA(A.paddingLeft,r.width),i=aA(A.paddingRight,r.width),l=aA(A.paddingTop,r.width),d=aA(A.paddingBottom,r.width);return r.add(t+A.borderLeftWidth,l+A.borderTopWidth,-(A.borderRightWidth+A.borderLeftWidth+t+i),-(A.borderTopWidth+A.borderBottomWidth+l+d))},Su=function(e,A){return e===0?A.bounds:e===2?br(A):bo(A)},Lu=function(e,A){return e===0?A.bounds:e===2?br(A):bo(A)},$n=function(e,A,r){var t=Su(Me(e.styles.backgroundOrigin,A),e),i=Lu(Me(e.styles.backgroundClip,A),e),l=Tu(Me(e.styles.backgroundSize,A),r,t),d=l[0],g=l[1],h=st(Me(e.styles.backgroundPosition,A),t.width-d,t.height-g),f=Ku(Me(e.styles.backgroundRepeat,A),h,l,t,i),w=Math.round(t.left+h[0]),C=Math.round(t.top+h[1]);return [f,w,C,d,g]},De=function(e){return iA(e)&&e.value===Ie.AUTO},Cr=function(e){return typeof e=="number"},Tu=function(e,A,r){var t=A[0],i=A[1],l=A[2],d=e[0],g=e[1];if(!d)return [0,0];if(hA(d)&&g&&hA(g))return [aA(d,r.width),aA(g,r.height)];var h=Cr(l);if(iA(d)&&(d.value===Ie.CONTAIN||d.value===Ie.COVER)){if(Cr(l)){var f=r.width/r.height;return f<l!=(d.value===Ie.COVER)?[r.width,r.width/l]:[r.height*l,r.height]}return [r.width,r.height]}var w=Cr(t),C=Cr(i),Q=w||C;if(De(d)&&(!g||De(g))){if(w&&C)return [t,i];if(!h&&!Q)return [r.width,r.height];if(Q&&h){var L=w?t:i*l,E=C?i:t/l;return [L,E]}var k=w?t:r.width,J=C?i:r.height;return [k,J]}if(h){var D=0,K=0;return hA(d)?D=aA(d,r.width):hA(g)&&(K=aA(g,r.height)),De(d)?D=K*l:(!g||De(g))&&(K=D/l),[D,K]}var rA=null,W=null;if(hA(d)?rA=aA(d,r.width):g&&hA(g)&&(W=aA(g,r.height)),rA!==null&&(!g||De(g))&&(W=w&&C?rA/t*i:r.height),W!==null&&De(d)&&(rA=w&&C?W/i*t:r.width),rA!==null&&W!==null)return [rA,W];throw new Error("Unable to calculate background-size for element")},Me=function(e,A){var r=e[A];return typeof r>"u"?e[0]:r},Ku=function(e,A,r,t,i){var l=A[0],d=A[1],g=r[0],h=r[1];switch(e){case 2:return [new I(Math.round(t.left),Math.round(t.top+d)),new I(Math.round(t.left+t.width),Math.round(t.top+d)),new I(Math.round(t.left+t.width),Math.round(h+t.top+d)),new I(Math.round(t.left),Math.round(h+t.top+d))];case 3:return [new I(Math.round(t.left+l),Math.round(t.top)),new I(Math.round(t.left+l+g),Math.round(t.top)),new I(Math.round(t.left+l+g),Math.round(t.height+t.top)),new I(Math.round(t.left+l),Math.round(t.height+t.top))];case 1:return [new I(Math.round(t.left+l),Math.round(t.top+d)),new I(Math.round(t.left+l+g),Math.round(t.top+d)),new I(Math.round(t.left+l+g),Math.round(t.top+d+h)),new I(Math.round(t.left+l),Math.round(t.top+d+h))];default:return [new I(Math.round(i.left),Math.round(i.top)),new I(Math.round(i.left+i.width),Math.round(i.top)),new I(Math.round(i.left+i.width),Math.round(i.height+i.top)),new I(Math.round(i.left),Math.round(i.height+i.top))]}},Du="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",Co="Hidden Text",Mu=(function(){function e(A){this._data={},this._document=A;}return e.prototype.parseMetrics=function(A,r){var t=this._document.createElement("div"),i=this._document.createElement("img"),l=this._document.createElement("span"),d=this._document.body;t.style.visibility="hidden",t.style.fontFamily=A,t.style.fontSize=r,t.style.margin="0",t.style.padding="0",t.style.whiteSpace="nowrap",d.appendChild(t),i.src=Du,i.width=1,i.height=1,i.style.margin="0",i.style.padding="0",i.style.verticalAlign="baseline",l.style.fontFamily=A,l.style.fontSize=r,l.style.margin="0",l.style.padding="0",l.appendChild(this._document.createTextNode(Co)),t.appendChild(l),t.appendChild(i);var g=i.offsetTop-l.offsetTop+2;t.removeChild(l),t.appendChild(this._document.createTextNode(Co)),t.style.lineHeight="normal",i.style.verticalAlign="super";var h=i.offsetTop-t.offsetTop+2;return d.removeChild(t),{baseline:g,middle:h}},e.prototype.getMetrics=function(A,r){var t=A+" "+r;return typeof this._data[t]>"u"&&(this._data[t]=this.parseMetrics(A,r)),this._data[t]},e})(),vo=(function(){function e(A,r){this.context=A,this.options=r;}return e})(),Ru=1e4,Ou=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i._activeEffects=[],i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),t.canvas||(i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px"),i.fontMetrics=new Mu(document),i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.ctx.textBaseline="bottom",i._activeEffects=[],i.context.logger.debug("Canvas renderer initialized ("+t.width+"x"+t.height+") with scale "+t.scale),i}return A.prototype.applyEffects=function(r){for(var t=this;this._activeEffects.length;)this.popEffect();r.forEach(function(i){return t.applyEffect(i)});},A.prototype.applyEffect=function(r){this.ctx.save(),xu(r)&&(this.ctx.globalAlpha=r.opacity),Fu(r)&&(this.ctx.translate(r.offsetX,r.offsetY),this.ctx.transform(r.matrix[0],r.matrix[1],r.matrix[2],r.matrix[3],r.matrix[4],r.matrix[5]),this.ctx.translate(-r.offsetX,-r.offsetY)),ho(r)&&(this.path(r.path),this.ctx.clip()),this._activeEffects.push(r);},A.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore();},A.prototype.renderStack=function(r){return a(this,void 0,void 0,function(){var t;return c(this,function(i){switch(i.label){case 0:return t=r.element.container.styles,t.isVisible()?[4,this.renderStackContent(r)]:[3,2];case 1:i.sent(),i.label=2;case 2:return [2]}})})},A.prototype.renderNode=function(r){return a(this,void 0,void 0,function(){return c(this,function(t){switch(t.label){case 0:if(BA(r.container.flags,16))debugger;return r.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(r)]:[3,3];case 1:return t.sent(),[4,this.renderNodeContent(r)];case 2:t.sent(),t.label=3;case 3:return [2]}})})},A.prototype.renderTextWithLetterSpacing=function(r,t,i){var l=this;if(t===0)this.ctx.fillText(r.text,r.bounds.left,r.bounds.top+i);else {var d=Mn(r.text);d.reduce(function(g,h){return l.ctx.fillText(h,g,r.bounds.top+i),g+l.ctx.measureText(h).width},r.bounds.left);}},A.prototype.createFontStyle=function(r){var t=r.fontVariant.filter(function(d){return d==="normal"||d==="small-caps"}).join(""),i=Vu(r.fontFamily).join(", "),l=nt(r.fontSize)?""+r.fontSize.number+r.fontSize.unit:r.fontSize.number+"px";return [[r.fontStyle,t,r.fontWeight,l,i].join(" "),i,l]},A.prototype.renderTextNode=function(r,t){return a(this,void 0,void 0,function(){var i,l,d,g,h,f,w,C,Q=this;return c(this,function(L){return i=this.createFontStyle(t),l=i[0],d=i[1],g=i[2],this.ctx.font=l,this.ctx.direction=t.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",h=this.fontMetrics.getMetrics(d,g),f=h.baseline,w=h.middle,C=t.paintOrder,r.textBounds.forEach(function(E){C.forEach(function(k){switch(k){case 0:Q.ctx.fillStyle=wA(t.color),Q.renderTextWithLetterSpacing(E,t.letterSpacing,f);var J=t.textShadow;J.length&&E.text.trim().length&&(J.slice(0).reverse().forEach(function(D){Q.ctx.shadowColor=wA(D.color),Q.ctx.shadowOffsetX=D.offsetX.number*Q.options.scale,Q.ctx.shadowOffsetY=D.offsetY.number*Q.options.scale,Q.ctx.shadowBlur=D.blur.number,Q.renderTextWithLetterSpacing(E,t.letterSpacing,f);}),Q.ctx.shadowColor="",Q.ctx.shadowOffsetX=0,Q.ctx.shadowOffsetY=0,Q.ctx.shadowBlur=0),t.textDecorationLine.length&&(Q.ctx.fillStyle=wA(t.textDecorationColor||t.color),t.textDecorationLine.forEach(function(D){switch(D){case 1:Q.ctx.fillRect(E.bounds.left,Math.round(E.bounds.top+f),E.bounds.width,1);break;case 2:Q.ctx.fillRect(E.bounds.left,Math.round(E.bounds.top),E.bounds.width,1);break;case 3:Q.ctx.fillRect(E.bounds.left,Math.ceil(E.bounds.top+w),E.bounds.width,1);break}}));break;case 1:t.webkitTextStrokeWidth&&E.text.trim().length&&(Q.ctx.strokeStyle=wA(t.webkitTextStrokeColor),Q.ctx.lineWidth=t.webkitTextStrokeWidth,Q.ctx.lineJoin=window.chrome?"miter":"round",Q.ctx.strokeText(E.text,E.bounds.left,E.bounds.top+f)),Q.ctx.strokeStyle="",Q.ctx.lineWidth=0,Q.ctx.lineJoin="miter";break}});}),[2]})})},A.prototype.renderReplacedElement=function(r,t,i){if(i&&r.intrinsicWidth>0&&r.intrinsicHeight>0){var l=br(r),d=fr(t);this.path(d),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(i,0,0,r.intrinsicWidth,r.intrinsicHeight,l.left,l.top,l.width,l.height),this.ctx.restore();}},A.prototype.renderNodeContent=function(r){return a(this,void 0,void 0,function(){var t,i,l,d,g,h,K,K,f,w,C,Q,W,L,E,X,k,J,D,K,rA,W,X;return c(this,function(S){switch(S.label){case 0:this.applyEffects(r.getEffects(4)),t=r.container,i=r.curves,l=t.styles,d=0,g=t.textNodes,S.label=1;case 1:return d<g.length?(h=g[d],[4,this.renderTextNode(h,l)]):[3,4];case 2:S.sent(),S.label=3;case 3:return d++,[3,1];case 4:if(!(t instanceof Oi))return [3,8];S.label=5;case 5:return S.trys.push([5,7,,8]),[4,this.context.cache.match(t.src)];case 6:return K=S.sent(),this.renderReplacedElement(t,i,K),[3,8];case 7:return S.sent(),this.context.logger.error("Error loading image "+t.src),[3,8];case 8:if(t instanceof Ni&&this.renderReplacedElement(t,i,t.canvas),!(t instanceof Pi))return [3,12];S.label=9;case 9:return S.trys.push([9,11,,12]),[4,this.context.cache.match(t.svg)];case 10:return K=S.sent(),this.renderReplacedElement(t,i,K),[3,12];case 11:return S.sent(),this.context.logger.error("Error loading svg "+t.svg.substring(0,255)),[3,12];case 12:return t instanceof Yi&&t.tree?(f=new A(this.context,{scale:this.options.scale,backgroundColor:t.backgroundColor,x:0,y:0,width:t.width,height:t.height}),[4,f.render(t.tree)]):[3,14];case 13:w=S.sent(),t.width&&t.height&&this.ctx.drawImage(w,0,0,t.width,t.height,t.bounds.left,t.bounds.top,t.bounds.width,t.bounds.height),S.label=14;case 14:if(t instanceof On&&(C=Math.min(t.bounds.width,t.bounds.height),t.type===lr?t.checked&&(this.ctx.save(),this.path([new I(t.bounds.left+C*.39363,t.bounds.top+C*.79),new I(t.bounds.left+C*.16,t.bounds.top+C*.5549),new I(t.bounds.left+C*.27347,t.bounds.top+C*.44071),new I(t.bounds.left+C*.39694,t.bounds.top+C*.5649),new I(t.bounds.left+C*.72983,t.bounds.top+C*.23),new I(t.bounds.left+C*.84,t.bounds.top+C*.34085),new I(t.bounds.left+C*.39363,t.bounds.top+C*.79)]),this.ctx.fillStyle=wA(Gi),this.ctx.fill(),this.ctx.restore()):t.type===cr&&t.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.bounds.left+C/2,t.bounds.top+C/2,C/4,0,Math.PI*2,true),this.ctx.fillStyle=wA(Gi),this.ctx.fill(),this.ctx.restore())),Nu(t)&&t.value.length){switch(Q=this.createFontStyle(l),W=Q[0],L=Q[1],E=this.fontMetrics.getMetrics(W,L).baseline,this.ctx.font=W,this.ctx.fillStyle=wA(l.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=_u(t.styles.textAlign),X=br(t),k=0,t.styles.textAlign){case 1:k+=X.width/2;break;case 2:k+=X.width;break}J=X.add(k,0,0,-X.height/2+1),this.ctx.save(),this.path([new I(X.left,X.top),new I(X.left+X.width,X.top),new I(X.left+X.width,X.top+X.height),new I(X.left,X.top+X.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new lt(t.value,J),l.letterSpacing,E),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left";}if(!BA(t.styles.display,2048))return [3,20];if(t.styles.listStyleImage===null)return [3,19];if(D=t.styles.listStyleImage,D.type!==0)return [3,18];K=void 0,rA=D.url,S.label=15;case 15:return S.trys.push([15,17,,18]),[4,this.context.cache.match(rA)];case 16:return K=S.sent(),this.ctx.drawImage(K,t.bounds.left-(K.width+10),t.bounds.top),[3,18];case 17:return S.sent(),this.context.logger.error("Error loading list-style-image "+rA),[3,18];case 18:return [3,20];case 19:r.listValue&&t.styles.listStyleType!==-1&&(W=this.createFontStyle(l)[0],this.ctx.font=W,this.ctx.fillStyle=wA(l.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",X=new u(t.bounds.left,t.bounds.top+aA(t.styles.paddingTop,t.bounds.width),t.bounds.width,bi(l.lineHeight,l.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new lt(r.listValue,X),l.letterSpacing,bi(l.lineHeight,l.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),S.label=20;case 20:return [2]}})})},A.prototype.renderStackContent=function(r){return a(this,void 0,void 0,function(){var t,i,D,l,d,D,g,h,D,f,w,D,C,Q,D,L,E,D,k,J,D;return c(this,function(K){switch(K.label){case 0:if(BA(r.element.container.flags,16))debugger;return [4,this.renderNodeBackgroundAndBorders(r.element)];case 1:K.sent(),t=0,i=r.negativeZIndex,K.label=2;case 2:return t<i.length?(D=i[t],[4,this.renderStack(D)]):[3,5];case 3:K.sent(),K.label=4;case 4:return t++,[3,2];case 5:return [4,this.renderNodeContent(r.element)];case 6:K.sent(),l=0,d=r.nonInlineLevel,K.label=7;case 7:return l<d.length?(D=d[l],[4,this.renderNode(D)]):[3,10];case 8:K.sent(),K.label=9;case 9:return l++,[3,7];case 10:g=0,h=r.nonPositionedFloats,K.label=11;case 11:return g<h.length?(D=h[g],[4,this.renderStack(D)]):[3,14];case 12:K.sent(),K.label=13;case 13:return g++,[3,11];case 14:f=0,w=r.nonPositionedInlineLevel,K.label=15;case 15:return f<w.length?(D=w[f],[4,this.renderStack(D)]):[3,18];case 16:K.sent(),K.label=17;case 17:return f++,[3,15];case 18:C=0,Q=r.inlineLevel,K.label=19;case 19:return C<Q.length?(D=Q[C],[4,this.renderNode(D)]):[3,22];case 20:K.sent(),K.label=21;case 21:return C++,[3,19];case 22:L=0,E=r.zeroOrAutoZIndexOrTransformedOrOpacity,K.label=23;case 23:return L<E.length?(D=E[L],[4,this.renderStack(D)]):[3,26];case 24:K.sent(),K.label=25;case 25:return L++,[3,23];case 26:k=0,J=r.positiveZIndex,K.label=27;case 27:return k<J.length?(D=J[k],[4,this.renderStack(D)]):[3,30];case 28:K.sent(),K.label=29;case 29:return k++,[3,27];case 30:return [2]}})})},A.prototype.mask=function(r){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(r.slice(0).reverse()),this.ctx.closePath();},A.prototype.path=function(r){this.ctx.beginPath(),this.formatPath(r),this.ctx.closePath();},A.prototype.formatPath=function(r){var t=this;r.forEach(function(i,l){var d=DA(i)?i.start:i;l===0?t.ctx.moveTo(d.x,d.y):t.ctx.lineTo(d.x,d.y),DA(i)&&t.ctx.bezierCurveTo(i.startControl.x,i.startControl.y,i.endControl.x,i.endControl.y,i.end.x,i.end.y);});},A.prototype.renderRepeat=function(r,t,i,l){this.path(r),this.ctx.fillStyle=t,this.ctx.translate(i,l),this.ctx.fill(),this.ctx.translate(-i,-l);},A.prototype.resizeImage=function(r,t,i){var l;if(r.width===t&&r.height===i)return r;var d=(l=this.canvas.ownerDocument)!==null&&l!==void 0?l:document,g=d.createElement("canvas");g.width=Math.max(1,t),g.height=Math.max(1,i);var h=g.getContext("2d");return h.drawImage(r,0,0,r.width,r.height,0,0,t,i),g},A.prototype.renderBackgroundImage=function(r){return a(this,void 0,void 0,function(){var t,i,l,d,g,h;return c(this,function(f){switch(f.label){case 0:t=r.styles.backgroundImage.length-1,i=function(w){var C,Q,L,gA,UA,EA,oA,CA,AA,E,gA,UA,EA,oA,CA,k,J,D,K,rA,W,X,S,q,AA,Y,gA,xA,IA,oA,CA,ae,UA,EA,we,GA,le,me,be,WA,Ce,jA;return c(this,function(Re){switch(Re.label){case 0:if(w.type!==0)return [3,5];C=void 0,Q=w.url,Re.label=1;case 1:return Re.trys.push([1,3,,4]),[4,l.context.cache.match(Q)];case 2:return C=Re.sent(),[3,4];case 3:return Re.sent(),l.context.logger.error("Error loading background-image "+Q),[3,4];case 4:return C&&(L=$n(r,t,[C.width,C.height,C.width/C.height]),gA=L[0],UA=L[1],EA=L[2],oA=L[3],CA=L[4],AA=l.ctx.createPattern(l.resizeImage(C,oA,CA),"repeat"),l.renderRepeat(gA,AA,UA,EA)),[3,6];case 5:Fc(w)?(E=$n(r,t,[null,null,null]),gA=E[0],UA=E[1],EA=E[2],oA=E[3],CA=E[4],k=bc(w.angle,oA,CA),J=k[0],D=k[1],K=k[2],rA=k[3],W=k[4],X=document.createElement("canvas"),X.width=oA,X.height=CA,S=X.getContext("2d"),q=S.createLinearGradient(D,rA,K,W),li(w.stops,J).forEach(function(ut){return q.addColorStop(ut.stop,wA(ut.color))}),S.fillStyle=q,S.fillRect(0,0,oA,CA),oA>0&&CA>0&&(AA=l.ctx.createPattern(X,"repeat"),l.renderRepeat(gA,AA,UA,EA))):xc(w)&&(Y=$n(r,t,[null,null,null]),gA=Y[0],xA=Y[1],IA=Y[2],oA=Y[3],CA=Y[4],ae=w.position.length===0?[vn]:w.position,UA=aA(ae[0],oA),EA=aA(ae[ae.length-1],CA),we=Cc(w,UA,EA,oA,CA),GA=we[0],le=we[1],GA>0&&le>0&&(me=l.ctx.createRadialGradient(xA+UA,IA+EA,0,xA+UA,IA+EA,GA),li(w.stops,GA*2).forEach(function(ut){return me.addColorStop(ut.stop,wA(ut.color))}),l.path(gA),l.ctx.fillStyle=me,GA!==le?(be=r.bounds.left+.5*r.bounds.width,WA=r.bounds.top+.5*r.bounds.height,Ce=le/GA,jA=1/Ce,l.ctx.save(),l.ctx.translate(be,WA),l.ctx.transform(1,0,0,Ce,0,0),l.ctx.translate(-be,-WA),l.ctx.fillRect(xA,jA*(IA-WA)+WA,oA,CA*jA),l.ctx.restore()):l.ctx.fill())),Re.label=6;case 6:return t--,[2]}})},l=this,d=0,g=r.styles.backgroundImage.slice(0).reverse(),f.label=1;case 1:return d<g.length?(h=g[d],[5,i(h)]):[3,4];case 2:f.sent(),f.label=3;case 3:return d++,[3,1];case 4:return [2]}})})},A.prototype.renderSolidBorder=function(r,t,i){return a(this,void 0,void 0,function(){return c(this,function(l){return this.path(mo(i,t)),this.ctx.fillStyle=wA(r),this.ctx.fill(),[2]})})},A.prototype.renderDoubleBorder=function(r,t,i,l){return a(this,void 0,void 0,function(){var d,g;return c(this,function(h){switch(h.label){case 0:return t<3?[4,this.renderSolidBorder(r,i,l)]:[3,2];case 1:return h.sent(),[2];case 2:return d=Hu(l,i),this.path(d),this.ctx.fillStyle=wA(r),this.ctx.fill(),g=ku(l,i),this.path(g),this.ctx.fill(),[2]}})})},A.prototype.renderNodeBackgroundAndBorders=function(r){return a(this,void 0,void 0,function(){var t,i,l,d,g,h,f,w,C=this;return c(this,function(Q){switch(Q.label){case 0:return this.applyEffects(r.getEffects(2)),t=r.container.styles,i=!ne(t.backgroundColor)||t.backgroundImage.length,l=[{style:t.borderTopStyle,color:t.borderTopColor,width:t.borderTopWidth},{style:t.borderRightStyle,color:t.borderRightColor,width:t.borderRightWidth},{style:t.borderBottomStyle,color:t.borderBottomColor,width:t.borderBottomWidth},{style:t.borderLeftStyle,color:t.borderLeftColor,width:t.borderLeftWidth}],d=Pu(Me(t.backgroundClip,0),r.curves),i||t.boxShadow.length?(this.ctx.save(),this.path(d),this.ctx.clip(),ne(t.backgroundColor)||(this.ctx.fillStyle=wA(t.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(r.container)]):[3,2];case 1:Q.sent(),this.ctx.restore(),t.boxShadow.slice(0).reverse().forEach(function(L){C.ctx.save();var E=Br(r.curves),k=L.inset?0:Ru,J=Uu(E,-k+(L.inset?1:-1)*L.spread.number,(L.inset?1:-1)*L.spread.number,L.spread.number*(L.inset?-2:2),L.spread.number*(L.inset?-2:2));L.inset?(C.path(E),C.ctx.clip(),C.mask(J)):(C.mask(E),C.ctx.clip(),C.path(J)),C.ctx.shadowOffsetX=L.offsetX.number+k,C.ctx.shadowOffsetY=L.offsetY.number,C.ctx.shadowColor=wA(L.color),C.ctx.shadowBlur=L.blur.number,C.ctx.fillStyle=L.inset?wA(L.color):"rgba(0,0,0,1)",C.ctx.fill(),C.ctx.restore();}),Q.label=2;case 2:g=0,h=0,f=l,Q.label=3;case 3:return h<f.length?(w=f[h],w.style!==0&&!ne(w.color)&&w.width>0?w.style!==2?[3,5]:[4,this.renderDashedDottedBorder(w.color,w.width,g,r.curves,2)]:[3,11]):[3,13];case 4:return Q.sent(),[3,11];case 5:return w.style!==3?[3,7]:[4,this.renderDashedDottedBorder(w.color,w.width,g,r.curves,3)];case 6:return Q.sent(),[3,11];case 7:return w.style!==4?[3,9]:[4,this.renderDoubleBorder(w.color,w.width,g,r.curves)];case 8:return Q.sent(),[3,11];case 9:return [4,this.renderSolidBorder(w.color,g,r.curves)];case 10:Q.sent(),Q.label=11;case 11:g++,Q.label=12;case 12:return h++,[3,3];case 13:return [2]}})})},A.prototype.renderDashedDottedBorder=function(r,t,i,l,d){return a(this,void 0,void 0,function(){var g,h,f,w,C,Q,L,E,k,J,D,K,rA,W,X,S,X,S;return c(this,function(q){return this.ctx.save(),g=Iu(l,i),h=mo(l,i),d===2&&(this.path(h),this.ctx.clip()),DA(h[0])?(f=h[0].start.x,w=h[0].start.y):(f=h[0].x,w=h[0].y),DA(h[1])?(C=h[1].end.x,Q=h[1].end.y):(C=h[1].x,Q=h[1].y),i===0||i===2?L=Math.abs(f-C):L=Math.abs(w-Q),this.ctx.beginPath(),d===3?this.formatPath(g):this.formatPath(h.slice(0,2)),E=t<3?t*3:t*2,k=t<3?t*2:t,d===3&&(E=t,k=t),J=true,L<=E*2?J=false:L<=E*2+k?(D=L/(2*E+k),E*=D,k*=D):(K=Math.floor((L+k)/(E+k)),rA=(L-K*E)/(K-1),W=(L-(K+1)*E)/K,k=W<=0||Math.abs(k-rA)<Math.abs(k-W)?rA:W),J&&(d===3?this.ctx.setLineDash([0,E+k]):this.ctx.setLineDash([E,k])),d===3?(this.ctx.lineCap="round",this.ctx.lineWidth=t):this.ctx.lineWidth=t*2+1.1,this.ctx.strokeStyle=wA(r),this.ctx.stroke(),this.ctx.setLineDash([]),d===2&&(DA(h[0])&&(X=h[3],S=h[0],this.ctx.beginPath(),this.formatPath([new I(X.end.x,X.end.y),new I(S.start.x,S.start.y)]),this.ctx.stroke()),DA(h[1])&&(X=h[1],S=h[2],this.ctx.beginPath(),this.formatPath([new I(X.end.x,X.end.y),new I(S.start.x,S.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},A.prototype.render=function(r){return a(this,void 0,void 0,function(){var t;return c(this,function(i){switch(i.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=wA(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),t=Eu(r),[4,this.renderStack(t)];case 1:return i.sent(),this.applyEffects([]),[2,this.canvas]}})})},A})(vo),Nu=function(e){return e instanceof Xi||e instanceof Vi?true:e instanceof On&&e.type!==cr&&e.type!==lr},Pu=function(e,A){switch(e){case 0:return Br(A);case 2:return vu(A);default:return fr(A)}},_u=function(e){switch(e){case 1:return "center";case 2:return "right";default:return "left"}},Gu=["-apple-system","system-ui"],Vu=function(e){return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?e.filter(function(A){return Gu.indexOf(A)===-1}):e},Xu=(function(e){n(A,e);function A(r,t){var i=e.call(this,r,t)||this;return i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),i.options=t,i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px",i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+t.width+"x"+t.height+" at "+t.x+","+t.y+") with scale "+t.scale),i}return A.prototype.render=function(r){return a(this,void 0,void 0,function(){var t,i;return c(this,function(l){switch(l.label){case 0:return t=Dn(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,r),[4,Yu(t)];case 1:return i=l.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=wA(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(i,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},A})(vo),Yu=function(e){return new Promise(function(A,r){var t=new Image;t.onload=function(){A(t);},t.onerror=r,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(e));})},Ju=(function(){function e(A){var r=A.id,t=A.enabled;this.id=r,this.enabled=t,this.start=Date.now();}return e.prototype.debug=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,p([this.id,this.getTime()+"ms"],A)):this.info.apply(this,A));},e.prototype.getTime=function(){return Date.now()-this.start},e.prototype.info=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,p([this.id,this.getTime()+"ms"],A));},e.prototype.warn=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,p([this.id,this.getTime()+"ms"],A)):this.info.apply(this,A));},e.prototype.error=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,p([this.id,this.getTime()+"ms"],A)):this.info.apply(this,A));},e.instances={},e})(),Wu=(function(){function e(A,r){var t;this.windowBounds=r,this.instanceName="#"+e.instanceCount++,this.logger=new Ju({id:this.instanceName,enabled:A.logging}),this.cache=(t=A.cache)!==null&&t!==void 0?t:new hu(this,A);}return e.instanceCount=1,e})(),ju=function(e,A){return A===void 0&&(A={}),$u(e,A)};typeof window<"u"&&uo.setContext(window);var $u=function(e,A){return a(void 0,void 0,void 0,function(){var r,t,i,l,d,g,h,f,w,C,Q,L,E,k,J,D,K,rA,W,X,q,S,q,AA,Y,gA,xA,IA,oA,CA,ae,UA,EA,we,GA,le,me,be,WA,Ce;return c(this,function(jA){switch(jA.label){case 0:if(!e||typeof e!="object")return [2,Promise.reject("Invalid element provided as first argument")];if(r=e.ownerDocument,!r)throw new Error("Element is not attached to a Document");if(t=r.defaultView,!t)throw new Error("Document is not attached to a Window");return i={allowTaint:(AA=A.allowTaint)!==null&&AA!==void 0?AA:false,imageTimeout:(Y=A.imageTimeout)!==null&&Y!==void 0?Y:15e3,proxy:A.proxy,useCORS:(gA=A.useCORS)!==null&&gA!==void 0?gA:false},l=s({logging:(xA=A.logging)!==null&&xA!==void 0?xA:true,cache:A.cache},i),d={windowWidth:(IA=A.windowWidth)!==null&&IA!==void 0?IA:t.innerWidth,windowHeight:(oA=A.windowHeight)!==null&&oA!==void 0?oA:t.innerHeight,scrollX:(CA=A.scrollX)!==null&&CA!==void 0?CA:t.pageXOffset,scrollY:(ae=A.scrollY)!==null&&ae!==void 0?ae:t.pageYOffset},g=new u(d.scrollX,d.scrollY,d.windowWidth,d.windowHeight),h=new Wu(l,g),f=(UA=A.foreignObjectRendering)!==null&&UA!==void 0?UA:false,w={allowTaint:(EA=A.allowTaint)!==null&&EA!==void 0?EA:false,onclone:A.onclone,ignoreElements:A.ignoreElements,inlineImages:f,copyStyles:f},h.logger.debug("Starting document clone with size "+g.width+"x"+g.height+" scrolled to "+-g.left+","+-g.top),C=new co(h,e,w),Q=C.clonedReferenceElement,Q?[4,C.toIFrame(r,g)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return L=jA.sent(),E=Pn(Q)||zp(Q)?m(Q.ownerDocument):B(h,Q),k=E.width,J=E.height,D=E.left,K=E.top,rA=zu(h,Q,A.backgroundColor),W={canvas:A.canvas,backgroundColor:rA,scale:(GA=(we=A.scale)!==null&&we!==void 0?we:t.devicePixelRatio)!==null&&GA!==void 0?GA:1,x:((le=A.x)!==null&&le!==void 0?le:0)+D,y:((me=A.y)!==null&&me!==void 0?me:0)+K,width:(be=A.width)!==null&&be!==void 0?be:Math.ceil(k),height:(WA=A.height)!==null&&WA!==void 0?WA:Math.ceil(J)},f?(h.logger.debug("Document cloned, using foreign object rendering"),q=new Xu(h,W),[4,q.render(Q)]):[3,3];case 2:return X=jA.sent(),[3,5];case 3:return h.logger.debug("Document cloned, element located at "+D+","+K+" with size "+k+"x"+J+" using computed rendering"),h.logger.debug("Starting DOM parsing"),S=Wi(h,Q),rA===S.styles.backgroundColor&&(S.styles.backgroundColor=YA.TRANSPARENT),h.logger.debug("Starting renderer for element at "+W.x+","+W.y+" with size "+W.width+"x"+W.height),q=new Ou(h,W),[4,q.render(S)];case 4:X=jA.sent(),jA.label=5;case 5:return (!((Ce=A.removeContainer)!==null&&Ce!==void 0)||Ce)&&(co.destroy(L)||h.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),h.logger.debug("Finished rendering"),[2,X]}})})},zu=function(e,A,r){var t=A.ownerDocument,i=t.documentElement?it(e,getComputedStyle(t.documentElement).backgroundColor):YA.TRANSPARENT,l=t.body?it(e,getComputedStyle(t.body).backgroundColor):YA.TRANSPARENT,d=typeof r=="string"?it(e,r):r===null?YA.TRANSPARENT:4294967295;return A===t.documentElement?ne(i)?ne(l)?d:l:i:d};return ju}));});var pe,Ne,wt,mt,Yo=dA(()=>{pe=class extends Error{code;retryable;constructor(n,s,a){super(n),this.code=s,this.retryable=a,this.name="SitepingError";}},Ne=class extends pe{constructor(n){super(n,"NETWORK",true),this.name="SitepingNetworkError";}},wt=class extends pe{constructor(n){super(n,"VALIDATION",false),this.name="SitepingValidationError";}},mt=class extends pe{constructor(n){super(n,"AUTH",false),this.name="SitepingAuthError";}};});function Jo(o){return typeof o=="object"&&o!==null}function Lr(o,n){return Jo(o)&&n in o}var Wo=dA(()=>{});function ds(o){return {cssSelector:o.anchor.cssSelector,xpath:o.anchor.xpath,textSnippet:o.anchor.textSnippet,elementTag:o.anchor.elementTag,elementId:o.anchor.elementId,textPrefix:o.anchor.textPrefix,textSuffix:o.anchor.textSuffix,fingerprint:o.anchor.fingerprint,neighborText:o.anchor.neighborText,anchorKey:o.anchor.anchorKey??null,xPct:o.rect.xPct,yPct:o.rect.yPct,wPct:o.rect.wPct,hPct:o.rect.hPct,scrollX:o.scrollX,scrollY:o.scrollY,viewportW:o.viewportW,viewportH:o.viewportH,devicePixelRatio:o.devicePixelRatio}}var cs,jo=dA(()=>{cs=["en","fr","de","es","it","pt","ru"];});var bt=dA(()=>{Yo();Wo();jo();});var ra,na=dA(()=>{ra={"panel.title":"Feedbacks","panel.ariaLabel":"Siteping feedback panel","panel.feedbackList":"Feedback list","panel.loading":"Loading feedbacks","panel.close":"Close panel","panel.deleteAll":"Delete all","panel.deleteAllConfirmTitle":"Delete all","panel.deleteAllConfirmMessage":"Delete all feedbacks for this project? This action cannot be undone.","panel.search":"Search...","panel.searchAria":"Search feedbacks","panel.filterAll":"All","panel.loadError":"Failed to load","panel.retry":"Retry","panel.empty":"No feedback yet","panel.showMore":"Show more","panel.showLess":"Show less","panel.resolve":"Resolve","panel.reopen":"Reopen","panel.delete":"Delete","panel.cancel":"Cancel","panel.confirmDelete":"Delete","panel.loadMore":"Load more ({remaining} remaining)","panel.statusAll":"All","panel.statusOpen":"Open","panel.statusResolved":"Resolved","type.label":"Type","type.question":"Question","type.change":"Change","type.bug":"Bug","type.other":"Other","status.label":"Status","scope.label":"Scope","scope.thisPage":"This page","scope.thisType":"This type","scope.all":"All pages","fab.aria":"Siteping \u2014 Feedback menu","fab.messages":"Show sidebar","fab.annotate":"Create new annotation","fab.annotations":"Show or hide markers","annotator.instruction":"Draw a rectangle on the area to comment","annotator.cancel":"Cancel","popup.ariaLabel":"Feedback form","popup.placeholder":"Describe your feedback...","popup.textareaAria":"Feedback message","popup.submitHintMac":"\u2318+Enter to send","popup.submitHintOther":"Ctrl+Enter to send","popup.cancel":"Cancel","popup.submit":"Send","identity.title":"Identify yourself","identity.nameLabel":"Name","identity.namePlaceholder":"Your name","identity.emailLabel":"Email","identity.emailPlaceholder":"your@email.com","identity.cancel":"Cancel","identity.submit":"Continue","marker.approximate":"Approximate position (confidence: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} feedback markers displayed","fab.badge":"{count} unresolved feedbacks","feedback.sent.confirmation":"Feedback sent successfully","feedback.error.message":"Failed to send feedback","feedback.deleted.confirmation":"Feedback deleted","badge.count":"{count} unresolved feedbacks","bulk.selectAll":"Select all","bulk.selected":"{count} selected","bulk.resolve":"Resolve","bulk.delete":"Delete","bulk.deselect":"Deselect","sort.newest":"Newest first","sort.oldest":"Oldest first","sort.byType":"By type","sort.openFirst":"Open first","sort.label":"Sort","group.byPage":"By page","group.feedbacks":"{count} feedbacks","stats.open":"Open","stats.resolved":"Resolved","stats.bugs":"Bugs","stats.progress":"{percent}% resolved","detail.back":"Back","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Message","detail.screenshot":"Screenshot","detail.screenshotAlt":"Screenshot of the annotated area","detail.metadata":"Details","detail.annotation":"Annotation","detail.page":"Page","detail.author":"Author","detail.date":"Created","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Resolved at","detail.goToAnnotation":"Go to annotation","detail.element":"Element","detail.selector":"Selector","detail.position":"Position","detail.resolve":"Resolve","detail.reopen":"Reopen","detail.delete":"Delete","detail.diagnostics":"Diagnostics","detail.diagnostics.console":"Console","detail.diagnostics.network":"Failed network","detail.diagnostics.expand":"Show diagnostics","detail.diagnostics.collapse":"Hide diagnostics","detail.diagnostics.noEntries":"No entries","shortcuts.title":"Keyboard shortcuts","shortcuts.navigate":"Navigate feedbacks","shortcuts.resolve":"Resolve / Reopen","shortcuts.delete":"Delete","shortcuts.search":"Focus search","shortcuts.select":"Toggle selection","shortcuts.help":"Show shortcuts","shortcuts.close":"Close","shortcuts.hint":"Keyboard shortcuts","export.label":"Export","export.csv":"Export CSV","export.json":"Export JSON"};});var sa={};ve(sa,{de:()=>Mh});var Mh,ia=dA(()=>{Mh={"panel.title":"Feedbacks","panel.ariaLabel":"Siteping-Feedback-Panel","panel.feedbackList":"Feedbackliste","panel.loading":"Feedbacks werden geladen","panel.close":"Panel schlie\xDFen","panel.deleteAll":"Alle l\xF6schen","panel.deleteAllConfirmTitle":"Alle l\xF6schen","panel.deleteAllConfirmMessage":"Alle Feedbacks f\xFCr dieses Projekt l\xF6schen? Diese Aktion kann nicht r\xFCckg\xE4ngig gemacht werden.","panel.search":"Suchen...","panel.searchAria":"Feedbacks suchen","panel.filterAll":"Alle","panel.loadError":"Laden fehlgeschlagen","panel.retry":"Erneut versuchen","panel.empty":"Noch kein Feedback","panel.showMore":"Mehr anzeigen","panel.showLess":"Weniger anzeigen","panel.resolve":"Erledigen","panel.reopen":"Wieder \xF6ffnen","panel.delete":"L\xF6schen","panel.cancel":"Abbrechen","panel.confirmDelete":"L\xF6schen","panel.loadMore":"Mehr laden ({remaining} verbleibend)","panel.statusAll":"Alle","panel.statusOpen":"Offen","panel.statusResolved":"Erledigt","type.label":"Typ","type.question":"Frage","type.change":"\xC4nderung","type.bug":"Fehler","type.other":"Sonstiges","status.label":"Status","scope.label":"Bereich","scope.thisPage":"Diese Seite","scope.thisType":"Dieser Typ","scope.all":"Alle Seiten","fab.aria":"Siteping \u2014 Feedback-Men\xFC","fab.messages":"Seitenleiste anzeigen","fab.annotate":"Neue Anmerkung erstellen","fab.annotations":"Markierungen ein- oder ausblenden","annotator.instruction":"Zeichne ein Rechteck um den Bereich, den du kommentieren m\xF6chtest","annotator.cancel":"Abbrechen","popup.ariaLabel":"Feedbackformular","popup.placeholder":"Beschreibe dein Feedback...","popup.textareaAria":"Feedbacknachricht","popup.submitHintMac":"\u2318+Enter zum Senden","popup.submitHintOther":"Strg+Enter zum Senden","popup.cancel":"Abbrechen","popup.submit":"Senden","identity.title":"Identifiziere dich","identity.nameLabel":"Name","identity.namePlaceholder":"Dein Name","identity.emailLabel":"E-Mail","identity.emailPlaceholder":"deine@email.de","identity.cancel":"Abbrechen","identity.submit":"Fortfahren","marker.approximate":"Ungef\xE4hre Position (Konfidenz: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} Feedback-Markierungen angezeigt","fab.badge":"{count} unerledigte Feedbacks","feedback.sent.confirmation":"Feedback erfolgreich gesendet","feedback.error.message":"Feedback konnte nicht gesendet werden","feedback.deleted.confirmation":"Feedback gel\xF6scht","badge.count":"{count} unerledigte Feedbacks","bulk.selectAll":"Alle ausw\xE4hlen","bulk.selected":"{count} ausgew\xE4hlt","bulk.resolve":"Erledigen","bulk.delete":"L\xF6schen","bulk.deselect":"Abw\xE4hlen","sort.newest":"Neueste zuerst","sort.oldest":"\xC4lteste zuerst","sort.byType":"Nach Typ","sort.openFirst":"Offene zuerst","sort.label":"Sortieren","group.byPage":"Nach Seite","group.feedbacks":"{count} Feedbacks","stats.open":"Offen","stats.resolved":"Erledigt","stats.bugs":"Fehler","stats.progress":"{percent}% erledigt","detail.back":"Zur\xFCck","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Nachricht","detail.screenshot":"Screenshot","detail.screenshotAlt":"Screenshot des markierten Bereichs","detail.metadata":"Details","detail.annotation":"Anmerkung","detail.page":"Seite","detail.author":"Autor","detail.date":"Erstellt","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Erledigt am","detail.goToAnnotation":"Zur Anmerkung","detail.element":"Element","detail.selector":"Selektor","detail.position":"Position","detail.resolve":"Erledigen","detail.reopen":"Wieder \xF6ffnen","detail.delete":"L\xF6schen","detail.diagnostics":"Diagnose","detail.diagnostics.console":"Konsole","detail.diagnostics.network":"Fehlgeschlagenes Netzwerk","detail.diagnostics.expand":"Diagnose anzeigen","detail.diagnostics.collapse":"Diagnose ausblenden","detail.diagnostics.noEntries":"Keine Eintr\xE4ge","shortcuts.title":"Tastenk\xFCrzel","shortcuts.navigate":"Feedbacks navigieren","shortcuts.resolve":"Erledigen / Wieder \xF6ffnen","shortcuts.delete":"L\xF6schen","shortcuts.search":"Suche fokussieren","shortcuts.select":"Auswahl umschalten","shortcuts.help":"K\xFCrzel anzeigen","shortcuts.close":"Schlie\xDFen","shortcuts.hint":"Tastenk\xFCrzel","export.label":"Exportieren","export.csv":"CSV exportieren","export.json":"JSON exportieren"};});var oa={};ve(oa,{es:()=>Rh});var Rh,aa=dA(()=>{Rh={"panel.title":"Comentarios","panel.ariaLabel":"Panel de comentarios de Siteping","panel.feedbackList":"Lista de comentarios","panel.loading":"Cargando comentarios","panel.close":"Cerrar panel","panel.deleteAll":"Eliminar todo","panel.deleteAllConfirmTitle":"Eliminar todo","panel.deleteAllConfirmMessage":"\xBFEliminar todos los comentarios de este proyecto? Esta acci\xF3n no se puede deshacer.","panel.search":"Buscar...","panel.searchAria":"Buscar comentarios","panel.filterAll":"Todos","panel.loadError":"No se pudo cargar","panel.retry":"Reintentar","panel.empty":"A\xFAn no hay comentarios","panel.showMore":"Mostrar m\xE1s","panel.showLess":"Mostrar menos","panel.resolve":"Resolver","panel.reopen":"Reabrir","panel.delete":"Eliminar","panel.cancel":"Cancelar","panel.confirmDelete":"Eliminar","panel.loadMore":"Cargar m\xE1s ({remaining} restantes)","panel.statusAll":"Todos","panel.statusOpen":"Abiertos","panel.statusResolved":"Resueltos","type.label":"Tipo","type.question":"Pregunta","type.change":"Cambio","type.bug":"Error","type.other":"Otro","status.label":"Estado","scope.label":"\xC1mbito","scope.thisPage":"Esta p\xE1gina","scope.thisType":"Este tipo","scope.all":"Todas las p\xE1ginas","fab.aria":"Siteping \u2014 Men\xFA de comentarios","fab.messages":"Mostrar barra lateral","fab.annotate":"Crear nueva anotaci\xF3n","fab.annotations":"Mostrar u ocultar marcadores","annotator.instruction":"Dibuja un rect\xE1ngulo sobre el \xE1rea que quieres comentar","annotator.cancel":"Cancelar","popup.ariaLabel":"Formulario de comentarios","popup.placeholder":"Describe tu comentario...","popup.textareaAria":"Mensaje de comentario","popup.submitHintMac":"\u2318+Enter para enviar","popup.submitHintOther":"Ctrl+Enter para enviar","popup.cancel":"Cancelar","popup.submit":"Enviar","identity.title":"Identif\xEDcate","identity.nameLabel":"Nombre","identity.namePlaceholder":"Tu nombre","identity.emailLabel":"Correo electr\xF3nico","identity.emailPlaceholder":"tu@email.com","identity.cancel":"Cancelar","identity.submit":"Continuar","marker.approximate":"Posici\xF3n aproximada (confianza: {confidence}%)","marker.aria":"Comentario #{number}: {type} \u2014 {message}","marker.count":"{count} marcadores de feedback mostrados","fab.badge":"{count} comentarios sin resolver","feedback.sent.confirmation":"Comentario enviado correctamente","feedback.error.message":"No se pudo enviar el comentario","feedback.deleted.confirmation":"Comentario eliminado","badge.count":"{count} comentarios sin resolver","bulk.selectAll":"Seleccionar todo","bulk.selected":"{count} seleccionados","bulk.resolve":"Resolver","bulk.delete":"Eliminar","bulk.deselect":"Deseleccionar","sort.newest":"M\xE1s recientes","sort.oldest":"M\xE1s antiguos","sort.byType":"Por tipo","sort.openFirst":"Abiertos primero","sort.label":"Ordenar","group.byPage":"Por p\xE1gina","group.feedbacks":"{count} comentarios","stats.open":"Abiertos","stats.resolved":"Resueltos","stats.bugs":"Errores","stats.progress":"{percent}% resueltos","detail.back":"Atr\xE1s","detail.title":"Comentario #{number}","detail.status":"Estado","detail.message":"Mensaje","detail.screenshot":"Captura","detail.screenshotAlt":"Captura del \xE1rea anotada","detail.metadata":"Detalles","detail.annotation":"Anotaci\xF3n","detail.page":"P\xE1gina","detail.author":"Autor","detail.date":"Creado","detail.viewport":"Viewport","detail.browser":"Navegador","detail.resolvedAt":"Resuelto el","detail.goToAnnotation":"Ir a la anotaci\xF3n","detail.element":"Elemento","detail.selector":"Selector","detail.position":"Posici\xF3n","detail.resolve":"Resolver","detail.reopen":"Reabrir","detail.delete":"Eliminar","detail.diagnostics":"Diagn\xF3stico","detail.diagnostics.console":"Consola","detail.diagnostics.network":"Red fallida","detail.diagnostics.expand":"Mostrar diagn\xF3stico","detail.diagnostics.collapse":"Ocultar diagn\xF3stico","detail.diagnostics.noEntries":"Sin entradas","shortcuts.title":"Atajos de teclado","shortcuts.navigate":"Navegar comentarios","shortcuts.resolve":"Resolver / Reabrir","shortcuts.delete":"Eliminar","shortcuts.search":"Buscar","shortcuts.select":"Alternar selecci\xF3n","shortcuts.help":"Mostrar atajos","shortcuts.close":"Cerrar","shortcuts.hint":"Atajos de teclado","export.label":"Exportar","export.csv":"Exportar CSV","export.json":"Exportar JSON"};});var la={};ve(la,{fr:()=>Oh});var Oh,ca=dA(()=>{Oh={"panel.title":"Feedbacks","panel.ariaLabel":"Panneau de feedback Siteping","panel.feedbackList":"Liste des feedbacks","panel.loading":"Chargement des feedbacks","panel.close":"Fermer le panneau","panel.deleteAll":"Tout supprimer","panel.deleteAllConfirmTitle":"Tout supprimer","panel.deleteAllConfirmMessage":"Supprimer tous les feedbacks de ce projet ? Cette action est irr\xE9versible.","panel.search":"Rechercher...","panel.searchAria":"Rechercher dans les feedbacks","panel.filterAll":"Tous","panel.loadError":"Erreur de chargement","panel.retry":"R\xE9essayer","panel.empty":"Aucun feedback pour le moment","panel.showMore":"Voir plus","panel.showLess":"Voir moins","panel.resolve":"R\xE9soudre","panel.reopen":"Rouvrir","panel.delete":"Supprimer","panel.cancel":"Annuler","panel.confirmDelete":"Supprimer","panel.loadMore":"Voir plus ({remaining} restants)","panel.statusAll":"Tous","panel.statusOpen":"Ouvert","panel.statusResolved":"R\xE9solu","type.label":"Type","type.question":"Question","type.change":"Changement","type.bug":"Bug","type.other":"Autre","status.label":"Statut","scope.label":"Port\xE9e","scope.thisPage":"Cette page","scope.thisType":"Ce type","scope.all":"Toutes les pages","fab.aria":"Siteping \u2014 Menu feedback","fab.messages":"Afficher la barre lat\xE9rale","fab.annotate":"Cr\xE9er une nouvelle annotation","fab.annotations":"Afficher ou masquer les marqueurs","annotator.instruction":"Tracez un rectangle sur la zone \xE0 commenter","annotator.cancel":"Annuler","popup.ariaLabel":"Formulaire de feedback","popup.placeholder":"D\xE9crivez votre retour...","popup.textareaAria":"Message de feedback","popup.submitHintMac":"\u2318+Entr\xE9e pour envoyer","popup.submitHintOther":"Ctrl+Entr\xE9e pour envoyer","popup.cancel":"Annuler","popup.submit":"Envoyer","identity.title":"Identifiez-vous","identity.nameLabel":"Nom","identity.namePlaceholder":"Votre nom","identity.emailLabel":"Email","identity.emailPlaceholder":"votre@email.com","identity.cancel":"Annuler","identity.submit":"Continuer","marker.approximate":"Position approximative (confiance : {confidence}%)","marker.aria":"Feedback n\xB0{number} : {type} \u2014 {message}","marker.count":"{count} marqueurs de feedback affich\xE9s","fab.badge":"{count} feedbacks non r\xE9solus","feedback.sent.confirmation":"Feedback envoy\xE9 avec succ\xE8s","feedback.error.message":"\xC9chec de l'envoi du feedback","feedback.deleted.confirmation":"Feedback supprim\xE9","badge.count":"{count} feedbacks non r\xE9solus","bulk.selectAll":"Tout s\xE9lectionner","bulk.selected":"{count} s\xE9lectionn\xE9(s)","bulk.resolve":"R\xE9soudre","bulk.delete":"Supprimer","bulk.deselect":"D\xE9s\xE9lectionner","sort.newest":"Plus r\xE9cents","sort.oldest":"Plus anciens","sort.byType":"Par type","sort.openFirst":"Ouverts d'abord","sort.label":"Trier","group.byPage":"Par page","group.feedbacks":"{count} feedbacks","stats.open":"Ouverts","stats.resolved":"R\xE9solus","stats.bugs":"Bugs","stats.progress":"{percent}% r\xE9solus","detail.back":"Retour","detail.title":"Feedback n\xB0{number}","detail.status":"Statut","detail.message":"Message","detail.screenshot":"Capture d'\xE9cran","detail.screenshotAlt":"Capture d'\xE9cran de la zone annot\xE9e","detail.metadata":"D\xE9tails","detail.annotation":"Annotation","detail.page":"Page","detail.author":"Auteur","detail.date":"Cr\xE9\xE9 le","detail.viewport":"Viewport","detail.browser":"Navigateur","detail.resolvedAt":"R\xE9solu le","detail.goToAnnotation":"Aller \xE0 l'annotation","detail.element":"\xC9l\xE9ment","detail.selector":"S\xE9lecteur","detail.position":"Position","detail.resolve":"R\xE9soudre","detail.reopen":"Rouvrir","detail.delete":"Supprimer","detail.diagnostics":"Diagnostics","detail.diagnostics.console":"Console","detail.diagnostics.network":"R\xE9seau en \xE9chec","detail.diagnostics.expand":"Afficher les diagnostics","detail.diagnostics.collapse":"Masquer les diagnostics","detail.diagnostics.noEntries":"Aucune entr\xE9e","shortcuts.title":"Raccourcis clavier","shortcuts.navigate":"Naviguer les feedbacks","shortcuts.resolve":"R\xE9soudre / Rouvrir","shortcuts.delete":"Supprimer","shortcuts.search":"Rechercher","shortcuts.select":"S\xE9lectionner","shortcuts.help":"Raccourcis","shortcuts.close":"Fermer","shortcuts.hint":"Raccourcis clavier","export.label":"Exporter","export.csv":"Exporter CSV","export.json":"Exporter JSON"};});var da={};ve(da,{it:()=>Nh});var Nh,pa=dA(()=>{Nh={"panel.title":"Feedback","panel.ariaLabel":"Pannello feedback di Siteping","panel.feedbackList":"Elenco feedback","panel.loading":"Caricamento feedback","panel.close":"Chiudi pannello","panel.deleteAll":"Elimina tutto","panel.deleteAllConfirmTitle":"Elimina tutto","panel.deleteAllConfirmMessage":"Eliminare tutti i feedback per questo progetto? Questa azione non pu\xF2 essere annullata.","panel.search":"Cerca...","panel.searchAria":"Cerca feedback","panel.filterAll":"Tutti","panel.loadError":"Caricamento non riuscito","panel.retry":"Riprova","panel.empty":"Nessun feedback ancora","panel.showMore":"Mostra di pi\xF9","panel.showLess":"Mostra meno","panel.resolve":"Risolvi","panel.reopen":"Riapri","panel.delete":"Elimina","panel.cancel":"Annulla","panel.confirmDelete":"Elimina","panel.loadMore":"Carica altro ({remaining} rimanenti)","panel.statusAll":"Tutti","panel.statusOpen":"Aperti","panel.statusResolved":"Risolti","type.label":"Tipo","type.question":"Domanda","type.change":"Modifica","type.bug":"Bug","type.other":"Altro","status.label":"Stato","scope.label":"Ambito","scope.thisPage":"Questa pagina","scope.thisType":"Questo tipo","scope.all":"Tutte le pagine","fab.aria":"Siteping \u2014 Menu feedback","fab.messages":"Mostra barra laterale","fab.annotate":"Crea nuova annotazione","fab.annotations":"Mostra o nascondi i marcatori","annotator.instruction":"Disegna un rettangolo sull'area da commentare","annotator.cancel":"Annulla","popup.ariaLabel":"Modulo feedback","popup.placeholder":"Descrivi il tuo feedback...","popup.textareaAria":"Messaggio di feedback","popup.submitHintMac":"\u2318+Invio per inviare","popup.submitHintOther":"Ctrl+Invio per inviare","popup.cancel":"Annulla","popup.submit":"Invia","identity.title":"Identificati","identity.nameLabel":"Nome","identity.namePlaceholder":"Il tuo nome","identity.emailLabel":"Email","identity.emailPlaceholder":"tua@email.com","identity.cancel":"Annulla","identity.submit":"Continua","marker.approximate":"Posizione approssimativa (confidenza: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} marcatori di feedback visualizzati","fab.badge":"{count} feedback non risolti","feedback.sent.confirmation":"Feedback inviato con successo","feedback.error.message":"Invio del feedback non riuscito","feedback.deleted.confirmation":"Feedback eliminato","badge.count":"{count} feedback non risolti","bulk.selectAll":"Seleziona tutto","bulk.selected":"{count} selezionati","bulk.resolve":"Risolvi","bulk.delete":"Elimina","bulk.deselect":"Deseleziona","sort.newest":"Pi\xF9 recenti","sort.oldest":"Pi\xF9 vecchi","sort.byType":"Per tipo","sort.openFirst":"Aperti prima","sort.label":"Ordina","group.byPage":"Per pagina","group.feedbacks":"{count} feedback","stats.open":"Aperti","stats.resolved":"Risolti","stats.bugs":"Bug","stats.progress":"{percent}% risolti","detail.back":"Indietro","detail.title":"Feedback #{number}","detail.status":"Stato","detail.message":"Messaggio","detail.screenshot":"Schermata","detail.screenshotAlt":"Schermata dell'area annotata","detail.metadata":"Dettagli","detail.annotation":"Annotazione","detail.page":"Pagina","detail.author":"Autore","detail.date":"Creato","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Risolto il","detail.goToAnnotation":"Vai all'annotazione","detail.element":"Elemento","detail.selector":"Selettore","detail.position":"Posizione","detail.resolve":"Risolvi","detail.reopen":"Riapri","detail.delete":"Elimina","detail.diagnostics":"Diagnostica","detail.diagnostics.console":"Console","detail.diagnostics.network":"Rete fallita","detail.diagnostics.expand":"Mostra diagnostica","detail.diagnostics.collapse":"Nascondi diagnostica","detail.diagnostics.noEntries":"Nessuna voce","shortcuts.title":"Scorciatoie da tastiera","shortcuts.navigate":"Naviga i feedback","shortcuts.resolve":"Risolvi / Riapri","shortcuts.delete":"Elimina","shortcuts.search":"Cerca","shortcuts.select":"Attiva selezione","shortcuts.help":"Mostra scorciatoie","shortcuts.close":"Chiudi","shortcuts.hint":"Scorciatoie da tastiera","export.label":"Esporta","export.csv":"Esporta CSV","export.json":"Esporta JSON"};});var ua={};ve(ua,{pt:()=>Ph});var Ph,ha=dA(()=>{Ph={"panel.title":"Feedbacks","panel.ariaLabel":"Painel de feedback do Siteping","panel.feedbackList":"Lista de feedbacks","panel.loading":"Carregando feedbacks","panel.close":"Fechar painel","panel.deleteAll":"Excluir tudo","panel.deleteAllConfirmTitle":"Excluir tudo","panel.deleteAllConfirmMessage":"Excluir todos os feedbacks deste projeto? Esta a\xE7\xE3o n\xE3o pode ser desfeita.","panel.search":"Pesquisar...","panel.searchAria":"Pesquisar feedbacks","panel.filterAll":"Todos","panel.loadError":"Falha ao carregar","panel.retry":"Tentar novamente","panel.empty":"Nenhum feedback ainda","panel.showMore":"Mostrar mais","panel.showLess":"Mostrar menos","panel.resolve":"Resolver","panel.reopen":"Reabrir","panel.delete":"Excluir","panel.cancel":"Cancelar","panel.confirmDelete":"Excluir","panel.loadMore":"Carregar mais ({remaining} restantes)","panel.statusAll":"Todos","panel.statusOpen":"Abertos","panel.statusResolved":"Resolvidos","type.label":"Tipo","type.question":"Pergunta","type.change":"Altera\xE7\xE3o","type.bug":"Bug","type.other":"Outro","status.label":"Status","scope.label":"Escopo","scope.thisPage":"Esta p\xE1gina","scope.thisType":"Este tipo","scope.all":"Todas as p\xE1ginas","fab.aria":"Siteping \u2014 Menu de feedback","fab.messages":"Exibir barra lateral","fab.annotate":"Criar nova anota\xE7\xE3o","fab.annotations":"Exibir ou ocultar marcadores","annotator.instruction":"Desenhe um ret\xE2ngulo na \xE1rea que deseja comentar","annotator.cancel":"Cancelar","popup.ariaLabel":"Formul\xE1rio de feedback","popup.placeholder":"Descreva seu feedback...","popup.textareaAria":"Mensagem de feedback","popup.submitHintMac":"\u2318+Enter para enviar","popup.submitHintOther":"Ctrl+Enter para enviar","popup.cancel":"Cancelar","popup.submit":"Enviar","identity.title":"Identifique-se","identity.nameLabel":"Nome","identity.namePlaceholder":"Seu nome","identity.emailLabel":"E-mail","identity.emailPlaceholder":"seu@email.com","identity.cancel":"Cancelar","identity.submit":"Continuar","marker.approximate":"Posi\xE7\xE3o aproximada (confian\xE7a: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} marcadores de feedback exibidos","fab.badge":"{count} feedbacks n\xE3o resolvidos","feedback.sent.confirmation":"Feedback enviado com sucesso","feedback.error.message":"Falha ao enviar feedback","feedback.deleted.confirmation":"Feedback exclu\xEDdo","badge.count":"{count} feedbacks n\xE3o resolvidos","bulk.selectAll":"Selecionar tudo","bulk.selected":"{count} selecionados","bulk.resolve":"Resolver","bulk.delete":"Excluir","bulk.deselect":"Desmarcar","sort.newest":"Mais recentes","sort.oldest":"Mais antigos","sort.byType":"Por tipo","sort.openFirst":"Abertos primeiro","sort.label":"Ordenar","group.byPage":"Por p\xE1gina","group.feedbacks":"{count} feedbacks","stats.open":"Abertos","stats.resolved":"Resolvidos","stats.bugs":"Bugs","stats.progress":"{percent}% resolvidos","detail.back":"Voltar","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Mensagem","detail.screenshot":"Captura","detail.screenshotAlt":"Captura da \xE1rea anotada","detail.metadata":"Detalhes","detail.annotation":"Anota\xE7\xE3o","detail.page":"P\xE1gina","detail.author":"Autor","detail.date":"Criado","detail.viewport":"Viewport","detail.browser":"Navegador","detail.resolvedAt":"Resolvido em","detail.goToAnnotation":"Ir para anota\xE7\xE3o","detail.element":"Elemento","detail.selector":"Seletor","detail.position":"Posi\xE7\xE3o","detail.resolve":"Resolver","detail.reopen":"Reabrir","detail.delete":"Excluir","detail.diagnostics":"Diagn\xF3stico","detail.diagnostics.console":"Console","detail.diagnostics.network":"Rede com falha","detail.diagnostics.expand":"Mostrar diagn\xF3stico","detail.diagnostics.collapse":"Ocultar diagn\xF3stico","detail.diagnostics.noEntries":"Sem entradas","shortcuts.title":"Atalhos de teclado","shortcuts.navigate":"Navegar feedbacks","shortcuts.resolve":"Resolver / Reabrir","shortcuts.delete":"Excluir","shortcuts.search":"Buscar","shortcuts.select":"Alternar sele\xE7\xE3o","shortcuts.help":"Mostrar atalhos","shortcuts.close":"Fechar","shortcuts.hint":"Atalhos de teclado","export.label":"Exportar","export.csv":"Exportar CSV","export.json":"Exportar JSON"};});var ga={};ve(ga,{ru:()=>_h});var _h,Ba=dA(()=>{_h={"panel.title":"\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C","panel.ariaLabel":"\u041F\u0430\u043D\u0435\u043B\u044C \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438 Siteping","panel.feedbackList":"\u0421\u043F\u0438\u0441\u043E\u043A \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.loading":"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.close":"\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C","panel.deleteAll":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451","panel.deleteAllConfirmTitle":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451","panel.deleteAllConfirmMessage":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u044D\u0442\u043E\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.","panel.search":"\u041F\u043E\u0438\u0441\u043A...","panel.searchAria":"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043E\u0442\u0437\u044B\u0432\u0430\u043C","panel.filterAll":"\u0412\u0441\u0435","panel.loadError":"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438","panel.retry":"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C","panel.empty":"\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.showMore":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435","panel.showLess":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435","panel.resolve":"\u0420\u0435\u0448\u0435\u043D\u043E","panel.reopen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E","panel.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","panel.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","panel.confirmDelete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","panel.loadMore":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 ({remaining} \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C)","panel.statusAll":"\u0412\u0441\u0435","panel.statusOpen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435","panel.statusResolved":"\u0420\u0435\u0448\u0451\u043D\u043D\u044B\u0435","type.label":"\u0422\u0438\u043F","type.question":"\u0412\u043E\u043F\u0440\u043E\u0441","type.change":"\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435","type.bug":"\u0411\u0430\u0433","type.other":"\u0414\u0440\u0443\u0433\u043E\u0435","status.label":"\u0421\u0442\u0430\u0442\u0443\u0441","scope.label":"\u041E\u0431\u043B\u0430\u0441\u0442\u044C","scope.thisPage":"\u042D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430","scope.thisType":"\u042D\u0442\u043E\u0442 \u0442\u0438\u043F","scope.all":"\u0412\u0441\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B","fab.aria":"Siteping \u2014 \u041C\u0435\u043D\u044E \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438","fab.messages":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C","fab.annotate":"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044E","fab.annotations":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043B\u0438 \u0441\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u0442\u043A\u0438","annotator.instruction":"\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043B\u044F \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F","annotator.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","popup.ariaLabel":"\u0424\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438","popup.placeholder":"\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435...","popup.textareaAria":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","popup.submitHintMac":"\u2318+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","popup.submitHintOther":"Ctrl+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","popup.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","popup.submit":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","identity.title":"\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u044C\u0442\u0435\u0441\u044C","identity.nameLabel":"\u0418\u043C\u044F","identity.namePlaceholder":"\u0412\u0430\u0448\u0435 \u0438\u043C\u044F","identity.emailLabel":"Email","identity.emailPlaceholder":"\u0432\u0430\u0448@email.com","identity.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","identity.submit":"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C","marker.approximate":"\u041F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u044F (\u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C: {confidence}%)","marker.aria":"\u041E\u0442\u0437\u044B\u0432 #{number}: {type} \u2014 {message}","marker.count":"\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043E \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","fab.badge":"\u041D\u0435\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","feedback.sent.confirmation":"\u041E\u0442\u0437\u044B\u0432 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D","feedback.error.message":"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432","feedback.deleted.confirmation":"\u041E\u0442\u0437\u044B\u0432 \u0443\u0434\u0430\u043B\u0451\u043D","badge.count":"\u041D\u0435\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","bulk.selectAll":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435","bulk.selected":"\u0412\u044B\u0431\u0440\u0430\u043D\u043E: {count}","bulk.resolve":"\u0420\u0435\u0448\u0438\u0442\u044C","bulk.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","bulk.deselect":"\u0421\u043D\u044F\u0442\u044C \u0432\u044B\u0431\u043E\u0440","sort.newest":"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u043E\u0432\u044B\u0435","sort.oldest":"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0442\u0430\u0440\u044B\u0435","sort.byType":"\u041F\u043E \u0442\u0438\u043F\u0443","sort.openFirst":"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0435","sort.label":"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430","group.byPage":"\u041F\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435","group.feedbacks":"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","stats.open":"\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435","stats.resolved":"\u0420\u0435\u0448\u0451\u043D\u043D\u044B\u0435","stats.bugs":"\u0411\u0430\u0433\u0438","stats.progress":"\u0420\u0435\u0448\u0435\u043D\u043E: {percent}%","detail.back":"\u041D\u0430\u0437\u0430\u0434","detail.title":"\u041E\u0442\u0437\u044B\u0432 #{number}","detail.status":"\u0421\u0442\u0430\u0442\u0443\u0441","detail.message":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","detail.screenshot":"\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442","detail.screenshotAlt":"\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438","detail.metadata":"\u0414\u0435\u0442\u0430\u043B\u0438","detail.annotation":"\u0410\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044F","detail.page":"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430","detail.author":"\u0410\u0432\u0442\u043E\u0440","detail.date":"\u0421\u043E\u0437\u0434\u0430\u043D","detail.viewport":"Viewport","detail.browser":"\u0411\u0440\u0430\u0443\u0437\u0435\u0440","detail.resolvedAt":"\u0420\u0435\u0448\u0451\u043D","detail.goToAnnotation":"\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u0438","detail.element":"\u042D\u043B\u0435\u043C\u0435\u043D\u0442","detail.selector":"\u0421\u0435\u043B\u0435\u043A\u0442\u043E\u0440","detail.position":"\u041F\u043E\u0437\u0438\u0446\u0438\u044F","detail.resolve":"\u0420\u0435\u0448\u0438\u0442\u044C","detail.reopen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E","detail.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","detail.diagnostics":"\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430","detail.diagnostics.console":"\u041A\u043E\u043D\u0441\u043E\u043B\u044C","detail.diagnostics.network":"\u0421\u0435\u0442\u0435\u0432\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438","detail.diagnostics.expand":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443","detail.diagnostics.collapse":"\u0421\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443","detail.diagnostics.noEntries":"\u041D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439","shortcuts.title":"\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438","shortcuts.navigate":"\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u043E\u0442\u0437\u044B\u0432\u0430\u043C","shortcuts.resolve":"\u0420\u0435\u0448\u0438\u0442\u044C / \u041F\u0435\u0440\u0435\u043E\u0442\u043A\u0440\u044B\u0442\u044C","shortcuts.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","shortcuts.search":"\u041F\u043E\u0438\u0441\u043A","shortcuts.select":"\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440","shortcuts.help":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043B\u0430\u0432\u0438\u0448\u0438","shortcuts.close":"\u0417\u0430\u043A\u0440\u044B\u0442\u044C","shortcuts.hint":"\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438","export.label":"\u042D\u043A\u0441\u043F\u043E\u0440\u0442","export.csv":"\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 CSV","export.json":"\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 JSON"};});function fa(o){return Gh.has(o)}function wa(o){return (o.split("-")[0]??o).toLowerCase()}async function ma(o){let n=wa(o),s=Pe[n];if(s)return s;if(!fa(n))return null;let a;switch(n){case "de":a=await Promise.resolve().then(()=>(ia(),sa));break;case "es":a=await Promise.resolve().then(()=>(aa(),oa));break;case "fr":a=await Promise.resolve().then(()=>(ca(),la));break;case "it":a=await Promise.resolve().then(()=>(pa(),da));break;case "pt":a=await Promise.resolve().then(()=>(ha(),ua));break;case "ru":a=await Promise.resolve().then(()=>(Ba(),ga));break;default:return null}let c=a[n];return c?(Pe[n]=c,c):null}function Or(o){let n=wa(o);return n!=="en"&&!Pe[n]&&!fa(n)&&console.warn(`[siteping] Unknown locale "${o}", falling back to "en"`),s=>(Pe[n]??Pe.en)?.[s]??Pe.en?.[s]??s}function Qe(o,n){switch(o){case "question":return n("type.question");case "change":return n("type.change");case "bug":return n("type.bug");case "other":return n("type.other");default:return o}}var Pe,Gh,Ft=dA(()=>{bt();na();Pe={en:ra},Gh=new Set(cs.filter(o=>o!=="en"));});function rg(o){let n=/^[=+\-@\t\r]/.test(o)?`'${o}`:o;return n.includes('"')||n.includes(",")||n.includes(`
`)||n.includes("\r")?`"${n.replace(/"/g,'""')}"`:n}function ng(o){let n=Ua.join(","),s=o.map(a=>Ua.map(c=>{let p=a[c];return rg(p==null?"":String(p))}).join(","));return [n,...s].join(`
`)}function sg(o){return JSON.stringify(o,null,2)}function Ea(o,n,s){let a=new Blob([o],{type:s}),c=URL.createObjectURL(a),p=document.createElement("a");p.href=c,p.download=n,p.style.display="none",document.body.appendChild(p),p.click(),requestAnimationFrame(()=>{URL.revokeObjectURL(c),p.remove();});}var Ag,eg,tg,Ha,Ua,Xr,fs=dA(()=>{HA();Ag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',eg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',tg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/></svg>',Ha=`
  /* ============================
     Export Button & Menu
     ============================ */

  .sp-export-btn {
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: transparent;
    color: var(--sp-text-tertiary);
    font-family: var(--sp-font);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease;
    position: relative;
  }

  .sp-export-btn svg {
    width: 13px;
    height: 13px;
  }

  .sp-export-btn:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-export-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sp-export-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 180px;
    padding: 4px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-lg);
    z-index: 10;
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
    transition: opacity 0.15s ease, transform 0.15s ease;
    pointer-events: none;
  }

  .sp-export-menu--open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .sp-export-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
  }

  .sp-export-option:hover,
  .sp-export-option:focus-visible {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  .sp-export-option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sp-export-option-icon svg {
    width: 16px;
    height: 16px;
  }

  .sp-export-option-label {
    flex: 1;
  }

  @media (forced-colors: active) {
    .sp-export-btn,
    .sp-export-option,
    .sp-export-menu {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-export-btn:focus-visible,
    .sp-export-option:focus-visible {
      outline: 3px solid Highlight !important;
    }
  }
`,Ua=["id","type","status","message","url","authorName","authorEmail","createdAt","resolvedAt","viewport"];Xr=class{constructor(n,s,a){this.getFeedbacks=s;this.element=b("div",{style:"position: relative; display: inline-flex;"});let c=document.createElement("button");c.className="sp-export-btn",c.setAttribute("aria-haspopup","true"),c.setAttribute("aria-expanded","false"),c.appendChild(G(Ag));let p=document.createElement("span");F(p,a("export.label")),c.appendChild(p),c.addEventListener("click",m=>{m.stopPropagation(),this.toggle();}),this.menu=b("div",{class:"sp-export-menu"}),this.menu.setAttribute("role","menu");let u=this.createOption(eg,a("export.csv"),()=>{this.exportAs("csv");}),B=this.createOption(tg,a("export.json"),()=>{this.exportAs("json");});this.menu.appendChild(u),this.menu.appendChild(B),this.element.appendChild(c),this.element.appendChild(this.menu),this.onDocumentClick=m=>{this.isOpen&&!this.element.contains(m.target)&&this.close();},document.addEventListener("click",this.onDocumentClick,true);}getFeedbacks;element;menu;isOpen=false;onDocumentClick;createOption(n,s,a){let c=document.createElement("button");c.className="sp-export-option",c.setAttribute("role","menuitem");let p=b("span",{class:"sp-export-option-icon"});p.appendChild(G(n));let u=b("span",{class:"sp-export-option-label"});return F(u,s),c.appendChild(p),c.appendChild(u),c.addEventListener("click",B=>{B.stopPropagation(),a(),this.close();}),c}toggle(){this.isOpen?this.close():this.open();}open(){this.isOpen=true,this.menu.classList.add("sp-export-menu--open"),this.element.querySelector(".sp-export-btn")?.setAttribute("aria-expanded","true");}close(){this.isOpen=false,this.menu.classList.remove("sp-export-menu--open"),this.element.querySelector(".sp-export-btn")?.setAttribute("aria-expanded","false");}exportAs(n){let s=this.getFeedbacks();if(s.length===0)return;let a=s[0]?.projectName??"feedbacks",c=new Date().toISOString().slice(0,10),p=a.replace(/[^a-zA-Z0-9_-]/g,"_");if(n==="csv"){let u=ng(s);Ea(u,`feedbacks-${p}-${c}.csv`,"text/csv;charset=utf-8");}else {let u=sg(s);Ea(u,`feedbacks-${p}-${c}.json`,"application/json;charset=utf-8");}}destroy(){document.removeEventListener("click",this.onDocumentClick,true),this.element.remove();}};});var Yr,ka,Ia,Jr,ws=dA(()=>{HA();Yr='<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/></svg>',ka='<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4" fill="url(#sp-cb-grad)" stroke="none"/><polyline points="5 9 8 12 13 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sp-cb-grad" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="var(--sp-accent)"/><stop offset="100%" stop-color="var(--sp-accent-dark)"/></linearGradient></defs></svg>',Ia=`
  /* ============================
     Bulk Checkbox
     ============================ */

  .sp-bulk-checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 4px;
    color: var(--sp-border);
    opacity: 0;
    transition: opacity 0.15s ease, color 0.15s ease, transform 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .sp-bulk-checkbox svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  .sp-bulk-checkbox:hover {
    color: var(--sp-accent);
    transform: scale(1.1);
  }

  .sp-bulk-checkbox--checked {
    color: var(--sp-accent);
    opacity: 1 !important;
    filter: drop-shadow(0 0 4px var(--sp-accent-glow));
  }

  /* Show checkboxes when hovering a card */
  .sp-card:hover .sp-bulk-checkbox {
    opacity: 1;
  }

  /* When any card has selection, show ALL checkboxes */
  .sp-list--has-selection .sp-bulk-checkbox {
    opacity: 1;
  }

  /* ============================
     Card Selected State
     ============================ */

  .sp-card--selected {
    border-left: 3px solid var(--sp-accent) !important;
    background: var(--sp-accent-light) !important;
  }

  .sp-card--selected:hover {
    background: var(--sp-accent-light) !important;
  }

  /* ============================
     Select All Bar
     ============================ */

  .sp-bulk-select-all {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    margin-bottom: 4px;
    border-radius: var(--sp-radius);
    background: transparent;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, background 0.2s ease;
    user-select: none;
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    color: var(--sp-text-secondary);
  }

  .sp-bulk-select-all:hover {
    background: var(--sp-bg-hover);
  }

  /* Show select-all on list hover or when selections exist */
  .sp-list:hover .sp-bulk-select-all,
  .sp-list--has-selection .sp-bulk-select-all {
    opacity: 1;
  }

  .sp-bulk-select-all .sp-bulk-checkbox {
    opacity: 1;
  }

  /* ============================
     Floating Action Bar
     ============================ */

  @keyframes sp-bulk-bar-in {
    from {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes sp-bulk-bar-out {
    from {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
  }

  .sp-bulk-bar {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-xl);
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    transform: translateY(100%) scale(0.95);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 0.25s ease;
    font-family: var(--sp-font);
  }

  .sp-bulk-bar--visible {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .sp-bulk-bar-count {
    font-size: 13px;
    font-weight: 600;
    color: var(--sp-text);
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  .sp-bulk-bar-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-bulk-btn-resolve,
  .sp-bulk-btn-delete {
    padding: 7px 14px;
    border-radius: var(--sp-radius-full);
    border: 1.5px solid transparent;
    background: transparent;
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .sp-bulk-btn-resolve {
    color: #22c55e;
    border-color: #22c55e;
  }

  .sp-bulk-btn-resolve:hover {
    background: rgba(34, 197, 94, 0.1);
    box-shadow: 0 0 12px rgba(34, 197, 94, 0.15);
  }

  .sp-bulk-btn-resolve:active {
    transform: scale(0.96);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-delete {
    color: #ef4444;
    border-color: #ef4444;
  }

  .sp-bulk-btn-delete:hover {
    background: rgba(239, 68, 68, 0.1);
    box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
  }

  .sp-bulk-btn-delete:active {
    transform: scale(0.96);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-resolve:disabled,
  .sp-bulk-btn-delete:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sp-bulk-btn-deselect {
    width: 28px;
    height: 28px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: transparent;
    color: var(--sp-text-tertiary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .sp-bulk-btn-deselect:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
    border-color: var(--sp-text-tertiary);
  }

  .sp-bulk-btn-deselect:active {
    transform: scale(0.92);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-deselect svg {
    width: 12px;
    height: 12px;
  }

  /* Spinner inside bulk bar buttons */
  .sp-bulk-btn-resolve .sp-spinner,
  .sp-bulk-btn-delete .sp-spinner {
    width: 14px;
    height: 14px;
  }

  /* ============================
     Forced Colors / High Contrast
     ============================ */

  @media (forced-colors: active) {
    .sp-bulk-checkbox,
    .sp-bulk-btn-resolve,
    .sp-bulk-btn-delete,
    .sp-bulk-btn-deselect,
    .sp-bulk-bar {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-bulk-checkbox--checked {
      background: Highlight !important;
      color: HighlightText !important;
    }

    .sp-card--selected {
      border-left: 4px solid Highlight !important;
    }
  }

  /* ============================
     Reduced Motion
     ============================ */

  @media (prefers-reduced-motion: reduce) {
    .sp-bulk-bar {
      transition-duration: 0.01ms !important;
    }

    .sp-bulk-checkbox {
      transition-duration: 0.01ms !important;
    }
  }
`,Jr=class{constructor(n,s,a){this.callbacks=s;this.t=a,this.barElement=b("div",{class:"sp-bulk-bar"}),this.barElement.setAttribute("role","toolbar"),this.barElement.setAttribute("aria-label","Bulk actions"),this.countLabel=b("span",{class:"sp-bulk-bar-count"}),F(this.countLabel,this.t("bulk.selected").replace("{count}","0"));let c=b("div",{class:"sp-bulk-bar-actions"});this.resolveBtn=document.createElement("button"),this.resolveBtn.className="sp-bulk-btn-resolve",this.resolveBtn.type="button",this.resolveBtn.addEventListener("click",()=>this.handleResolve()),this.deleteBtn=document.createElement("button"),this.deleteBtn.className="sp-bulk-btn-delete",this.deleteBtn.type="button",this.deleteBtn.addEventListener("click",()=>this.handleDelete());let p=document.createElement("button");p.className="sp-bulk-btn-deselect",p.type="button",p.setAttribute("aria-label",this.t("bulk.deselect")),p.appendChild(G('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')),p.addEventListener("click",()=>this.deselectAll()),c.appendChild(this.resolveBtn),c.appendChild(this.deleteBtn),c.appendChild(p),this.barElement.appendChild(this.countLabel),this.barElement.appendChild(c),this.updateButtonLabels();}callbacks;barElement;selected=new Set;checkboxMap=new Map;countLabel;resolveBtn;deleteBtn;selectAllCheckbox=null;listContainer=null;isProcessing=false;t;createCheckbox(n){let s=b("div",{class:"sp-bulk-checkbox"});return s.setAttribute("role","checkbox"),s.setAttribute("aria-checked","false"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`Select feedback ${n}`),s.appendChild(G(Yr)),s.addEventListener("click",a=>{a.stopPropagation(),this.toggle(n);}),s.addEventListener("keydown",a=>{(a.key===" "||a.key==="Enter")&&(a.preventDefault(),a.stopPropagation(),this.toggle(n));}),this.checkboxMap.set(n,s),s}createSelectAllBar(n,s){let a=b("div",{class:"sp-bulk-select-all"}),c=b("div",{class:"sp-bulk-checkbox"});c.appendChild(G(Yr)),this.selectAllCheckbox=c;let p=b("span");return F(p,s),a.appendChild(c),a.appendChild(p),a.addEventListener("click",()=>{this.selected.size===n.length&&n.length>0?this.deselectAll():this.selectAll(n);}),a}setListContainer(n){this.listContainer=n;}toggle(n){this.isProcessing||(this.selected.has(n)?this.selected.delete(n):this.selected.add(n),this.updateCheckbox(n),this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass(),this.updateCardSelectedState(n));}selectAll(n){if(!this.isProcessing){for(let s of n)this.selected.add(s),this.updateCheckbox(s),this.updateCardSelectedState(s);this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass();}}deselectAll(){let n=[...this.selected];this.selected.clear();for(let s of n)this.updateCheckbox(s),this.updateCardSelectedState(s);this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass();}get selectedIds(){return [...this.selected]}get count(){return this.selected.size}get hasSelection(){return this.selected.size>0}reset(){this.selected.clear(),this.checkboxMap.clear(),this.selectAllCheckbox=null,this.isProcessing=false,this.updateBar(),this.updateListSelectionClass();}destroy(){this.selected.clear(),this.checkboxMap.clear(),this.selectAllCheckbox=null,this.listContainer=null,this.barElement.remove();}updateBar(){let n=this.selected.size,s=n>0;this.barElement.classList.toggle("sp-bulk-bar--visible",s),F(this.countLabel,this.t("bulk.selected").replace("{count}",String(n))),this.updateButtonLabels();}updateButtonLabels(){let n=this.selected.size,s=this.t("bulk.resolve"),a=this.t("bulk.delete");this.resolveBtn.replaceChildren();let c=document.createElement("span");F(c,n>0?`${s} ${n}`:s),this.resolveBtn.appendChild(c),this.deleteBtn.replaceChildren();let p=document.createElement("span");F(p,n>0?`${a} ${n}`:a),this.deleteBtn.appendChild(p);}updateCheckbox(n){let s=this.checkboxMap.get(n);if(!s)return;let a=this.selected.has(n);s.classList.toggle("sp-bulk-checkbox--checked",a),s.setAttribute("aria-checked",String(a)),s.replaceChildren(),s.appendChild(G(a?ka:Yr));}updateSelectAllCheckbox(){if(!this.selectAllCheckbox)return;let n=this.selected.size>0&&this.selected.size===this.checkboxMap.size;this.selectAllCheckbox.classList.toggle("sp-bulk-checkbox--checked",n),this.selectAllCheckbox.setAttribute("aria-checked",String(n)),this.selectAllCheckbox.replaceChildren(),this.selectAllCheckbox.appendChild(G(n?ka:Yr));}updateListSelectionClass(){this.listContainer&&this.listContainer.classList.toggle("sp-list--has-selection",this.selected.size>0);}updateCardSelectedState(n){if(!this.listContainer)return;let s=CSS.escape(n),a=this.listContainer.querySelector(`[data-feedback-id="${s}"]`);a&&a.classList.toggle("sp-card--selected",this.selected.has(n));}async handleResolve(){if(this.isProcessing||this.selected.size===0)return;this.isProcessing=true;let n=[...this.selected],s=ye(this.resolveBtn);this.deleteBtn.disabled=true;try{await this.callbacks.onResolve(n),this.reset();}catch{s(),this.deleteBtn.disabled=false;}finally{this.isProcessing=false;}}async handleDelete(){if(this.isProcessing||this.selected.size===0)return;this.isProcessing=true;let n=[...this.selected],s=ye(this.deleteBtn);this.resolveBtn.disabled=true;try{await this.callbacks.onDelete(n),this.reset();}catch{s(),this.resolveBtn.disabled=false;}finally{this.isProcessing=false;}}};});function gg(o){if(/Edg\//i.test(o)){let n=o.match(/Edg\/([\d.]+)/);return n?`Edge ${n[1]}`:"Edge"}if(/OPR\//i.test(o)||/Opera/i.test(o)){let n=o.match(/OPR\/([\d.]+)/);return n?`Opera ${n[1]}`:"Opera"}if(/Firefox\//i.test(o)){let n=o.match(/Firefox\/([\d.]+)/);return n?`Firefox ${n[1]}`:"Firefox"}if(/Chrome\//i.test(o)&&!/Chromium/i.test(o)){let n=o.match(/Chrome\/([\d.]+)/);return n?`Chrome ${n[1]}`:"Chrome"}if(/Safari\//i.test(o)&&!/Chrome/i.test(o)){let n=o.match(/Version\/([\d.]+)/);return n?`Safari ${n[1]}`:"Safari"}return "Unknown"}function Ta(o,n){try{return new Date(o).toLocaleString(n,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return o}}function Bg(o){try{return new URL(o).pathname}catch{return o}}function fg(o){return !!(/^data:image\/(jpeg|png|webp);/i.test(o)||/^https:\/\//i.test(o))}function Wr(o,n){return o.length<=n?o:o.slice(0,n-1)+"\u2026"}function wg(o){if(!o)return  false;let n=Array.isArray(o.console)?o.console.length:0,s=Array.isArray(o.network)?o.network.length:0;return n>0||s>0}function mg(o){return !Number.isFinite(o)||o<0?"\u2014":o<1e3?`${Math.round(o)} ms`:`${(o/1e3).toFixed(1)} s`}var ig,ms,og,ag,lg,cg,bs,Sa,La,dg,pg,ug,hg,Ka,jr,Cs=dA(()=>{HA();ce();ig='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',ms='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',og='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',ag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',lg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',cg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',bs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',Sa='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',La='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',dg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',pg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',ug='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',hg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',Ka=`
  /* ============================
     Detail View \u2014 Panel-in-Panel
     ============================ */

  .sp-detail {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    background: var(--sp-glass-bg);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    z-index: 20;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
    overflow: hidden;
  }

  .sp-detail--visible {
    transform: translateX(0);
  }

  /* Fallback for browsers that cannot deliver a readable "frosted glass":
     drop the translucent background to a solid one so the underlying list
     does not bleed through. Two disjoint cohorts:

       1. No backdrop-filter at all (Firefox <=102, legacy Edge / IE,
          older Chromium on Linux).
       2. Safari / iOS Safari where backdrop-filter is detectable only
          via the -webkit- prefix. Empirically this still includes recent
          Safari (observed on macOS Safari 18.6 in 2026, where
          CSS.supports('backdrop-filter', 'blur(...)') returns false even
          though the unprefixed property has shipped). On these builds the
          long-standing nested-backdrop + transform compositing bug
          silently no-ops the blur on .sp-detail (which is transformed and
          lives inside another backdrop-filter ancestor, .sp-panel), so
          the translucent default is unreadable. Detection is a pure
          feature query: prefixed supported AND unprefixed not. No
          user-agent sniffing.

     Browsers where the glass effect renders correctly (most Chromium,
     modern Firefox, any engine that advertises both property names via
     CSS.supports) are unaffected. */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .sp-detail {
      background: var(--sp-bg);
    }
  }

  @supports (-webkit-backdrop-filter: blur(1px)) and (not (backdrop-filter: blur(1px))) {
    .sp-detail {
      background: var(--sp-bg);
    }
  }

  /* ---- Header ---- */

  .sp-detail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    flex-shrink: 0;
    min-height: 64px;
  }

  .sp-detail-back {
    width: 40px;
    height: 40px;
    border-radius: var(--sp-radius);
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sp-text-tertiary);
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .sp-detail-back:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-detail-back:active {
    transform: scale(0.92);
    transition-duration: 0.1s;
  }

  .sp-detail-back svg {
    width: 18px;
    height: 18px;
  }

  .sp-detail-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--sp-text);
    letter-spacing: -0.02em;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-detail-header .sp-badge {
    flex-shrink: 0;
  }

  /* ---- Content ---- */

  .sp-detail-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
  }

  .sp-detail-content::-webkit-scrollbar {
    width: 6px;
  }

  .sp-detail-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .sp-detail-content::-webkit-scrollbar-thumb {
    background: var(--sp-border);
    border-radius: var(--sp-radius-full);
  }

  .sp-detail-content::-webkit-scrollbar-thumb:hover {
    background: var(--sp-text-tertiary);
  }

  /* ---- Section ---- */

  .sp-detail-section {
    padding: 20px 24px;
    border-bottom: 1px solid var(--sp-border);
    opacity: 0;
    transform: translateY(8px);
    animation: sp-detail-section-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes sp-detail-section-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sp-detail-section:last-child {
    border-bottom: none;
  }

  .sp-detail-section-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-detail-section-title svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
  }

  /* ---- Status + Actions Section ---- */

  .sp-detail-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .sp-detail-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: var(--sp-radius-full);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .sp-detail-status-pill--open {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .sp-detail-status-pill--resolved {
    background: rgba(156, 163, 175, 0.1);
    color: #9ca3af;
    border: 1px solid rgba(156, 163, 175, 0.2);
  }

  .sp-detail-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sp-detail-actions {
    display: flex;
    gap: 8px;
  }

  .sp-detail-actions button {
    flex: 1;
    height: 40px;
    padding: 0 16px;
    border-radius: var(--sp-radius);
    font-family: var(--sp-font);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;
  }

  .sp-detail-actions button svg {
    width: 15px;
    height: 15px;
  }

  .sp-detail-btn-resolve {
    border: 1.5px solid #22c55e;
    background: rgba(34, 197, 94, 0.06);
    color: #22c55e;
  }

  .sp-detail-btn-resolve:hover {
    background: rgba(34, 197, 94, 0.14);
    box-shadow: 0 0 16px rgba(34, 197, 94, 0.12);
    transform: translateY(-1px);
  }

  .sp-detail-btn-resolve:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-btn-reopen {
    border: 1.5px solid var(--sp-accent);
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  .sp-detail-btn-reopen:hover {
    background: rgba(var(--sp-accent), 0.14);
    box-shadow: 0 0 16px var(--sp-accent-glow);
    transform: translateY(-1px);
  }

  .sp-detail-btn-reopen:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-btn-delete {
    border: 1.5px solid #ef4444;
    background: rgba(239, 68, 68, 0.06);
    color: #ef4444;
  }

  .sp-detail-btn-delete:hover {
    background: rgba(239, 68, 68, 0.14);
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.12);
    transform: translateY(-1px);
  }

  .sp-detail-btn-delete:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
    box-shadow: none;
  }

  /* ---- Message Section ---- */

  .sp-detail-message {
    font-size: 14px;
    line-height: 1.65;
    color: var(--sp-text);
    padding: 14px 16px;
    border-left: 3px solid var(--sp-accent);
    border-radius: 0 var(--sp-radius) var(--sp-radius) 0;
    background: var(--sp-glass-bg-heavy);
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* ---- Screenshot Section ---- */

  .sp-detail-screenshot {
    display: block;
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: contain;
    border-radius: var(--sp-radius);
    border: 1px solid var(--sp-glass-border);
    background: var(--sp-glass-bg-heavy);
  }

  /* ---- Metadata Section ---- */

  .sp-detail-meta {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sp-detail-meta-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .sp-detail-meta-row svg {
    width: 14px;
    height: 14px;
    color: var(--sp-text-tertiary);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .sp-detail-meta-content {
    flex: 1;
    min-width: 0;
  }

  .sp-detail-meta-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 4px;
  }

  .sp-detail-meta-value {
    font-size: 13px;
    line-height: 1.4;
    color: var(--sp-text);
    word-break: break-all;
  }

  .sp-detail-meta-value--mono {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 12px;
    background: var(--sp-glass-bg-heavy);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--sp-glass-border-subtle);
  }

  .sp-detail-meta-value--secondary {
    color: var(--sp-text-secondary);
    font-size: 12px;
  }

  /* ---- Annotation Section ---- */

  .sp-detail-annotation {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sp-detail-annotation-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    border: 1px solid var(--sp-glass-border-subtle);
  }

  .sp-detail-annotation-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .sp-detail-annotation-row svg {
    width: 13px;
    height: 13px;
    color: var(--sp-text-tertiary);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .sp-detail-annotation-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 3px;
  }

  .sp-detail-annotation-value {
    font-size: 12px;
    line-height: 1.4;
    color: var(--sp-text);
    word-break: break-all;
  }

  .sp-detail-annotation-value--mono {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 11px;
    background: var(--sp-bg-hover);
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-detail-btn-goto {
    width: 100%;
    height: 44px;
    padding: 0 20px;
    border-radius: var(--sp-radius);
    border: none;
    background: var(--sp-accent-gradient);
    color: #fff;
    font-family: var(--sp-font);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;
    box-shadow: 0 2px 12px var(--sp-accent-glow);
  }

  .sp-detail-btn-goto svg {
    width: 16px;
    height: 16px;
  }

  .sp-detail-btn-goto:hover {
    box-shadow: 0 4px 20px var(--sp-accent-glow);
    transform: translateY(-2px);
  }

  .sp-detail-btn-goto:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  /* ---- Forced Colors / High Contrast ---- */

  @media (forced-colors: active) {
    .sp-detail {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
    }

    .sp-detail-back,
    .sp-detail-btn-goto,
    .sp-detail-btn-resolve,
    .sp-detail-btn-reopen,
    .sp-detail-btn-delete {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-detail-back:focus-visible,
    .sp-detail-btn-goto:focus-visible,
    .sp-detail-btn-resolve:focus-visible,
    .sp-detail-btn-reopen:focus-visible,
    .sp-detail-btn-delete:focus-visible {
      outline: 3px solid Highlight !important;
    }

    .sp-detail-status-pill {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-detail-message {
      border-left: 3px solid ButtonText !important;
    }
  }

  /* ---- Diagnostics Section ---- */

  .sp-detail-diag {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sp-detail-diag-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 12px;
    border-radius: var(--sp-radius);
    border: 1px solid var(--sp-glass-border-subtle);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .sp-detail-diag-toggle:hover {
    background: var(--sp-bg-hover);
  }

  .sp-detail-diag-toggle svg {
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease;
  }

  .sp-detail-diag-toggle[aria-expanded="true"] svg {
    transform: rotate(90deg);
  }

  .sp-detail-diag-counts {
    display: inline-flex;
    gap: 6px;
    font-weight: 500;
    color: var(--sp-text-tertiary);
  }

  .sp-detail-diag-count {
    padding: 1px 7px;
    border-radius: var(--sp-radius-full);
    background: var(--sp-bg-hover);
    font-variant-numeric: tabular-nums;
  }

  .sp-detail-diag-count--errors {
    background: rgba(239, 68, 68, 0.14);
    color: #ef4444;
  }

  .sp-detail-diag-body {
    display: none;
    flex-direction: column;
    gap: 14px;
  }

  .sp-detail-diag-body--open {
    display: flex;
  }

  .sp-detail-diag-group-title {
    font-size: 10px;
    font-weight: 700;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  .sp-detail-diag-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: var(--sp-radius);
    border: 1px solid var(--sp-glass-border-subtle);
    background: var(--sp-glass-bg-heavy);
    max-height: 240px;
    overflow-y: auto;
  }

  .sp-detail-diag-list li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
    border-bottom: 1px solid var(--sp-glass-border-subtle);
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 11px;
    line-height: 1.45;
    color: var(--sp-text);
  }

  .sp-detail-diag-list li:last-child {
    border-bottom: none;
  }

  .sp-detail-diag-level {
    flex-shrink: 0;
    font-weight: 700;
    width: 44px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
  }

  .sp-detail-diag-level--log {
    color: var(--sp-text-tertiary);
  }
  .sp-detail-diag-level--info {
    color: #3b82f6;
  }
  .sp-detail-diag-level--warn {
    color: #f59e0b;
  }
  .sp-detail-diag-level--error {
    color: #ef4444;
  }

  .sp-detail-diag-message {
    flex: 1;
    min-width: 0;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .sp-detail-diag-net {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
  }

  .sp-detail-diag-net-status {
    flex-shrink: 0;
    font-weight: 700;
    color: #ef4444;
    min-width: 32px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .sp-detail-diag-net-method {
    flex-shrink: 0;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    min-width: 44px;
  }

  .sp-detail-diag-net-url {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--sp-text);
  }

  .sp-detail-diag-empty {
    padding: 12px;
    font-style: italic;
    font-size: 11px;
    color: var(--sp-text-tertiary);
    text-align: center;
  }

  /* ---- Reduced Motion ---- */

  @media (prefers-reduced-motion: reduce) {
    .sp-detail {
      transition-duration: 0.01ms !important;
    }

    .sp-detail-section {
      animation-duration: 0.01ms !important;
    }
  }
`;jr=class{constructor(n,s,a,c){this.colors=n;this.callbacks=s;this.t=a,this.locale=c,this.element=b("div",{class:"sp-detail"}),this.element.setAttribute("role","dialog"),this.element.setAttribute("aria-label","Feedback detail"),this.element.setAttribute("aria-hidden","true");let p=b("div",{class:"sp-detail-header"}),u=document.createElement("button");u.type="button",u.className="sp-detail-back",u.setAttribute("aria-label",this.t("detail.back")),u.appendChild(G(ig)),u.addEventListener("click",()=>{this.hide(),this.callbacks.onBack();}),this.element.appendChild(p),p.appendChild(u),this.content=b("div",{class:"sp-detail-content"}),this.element.appendChild(this.content);}colors;callbacks;element;_isVisible=false;currentFeedback=null;content;t;locale;resolveBtn=null;deleteBtn=null;isProcessing=false;show(n,s){this.currentFeedback=n,this.isProcessing=false;let a=this.element.querySelector(".sp-detail-header");if(!a)return;let c=a.querySelector(".sp-detail-back");if(!c)return;a.replaceChildren(c);let p=b("span",{class:"sp-detail-title"});F(p,this.t("detail.title").replace("{number}",String(s))),a.appendChild(p);let u=b("span",{class:"sp-badge"});u.style.background=$A(n.type,this.colors),u.style.color=SA(n.type,this.colors),F(u,n.type),a.appendChild(u),this.content.replaceChildren();let B=0,m=this.buildSection(B++);this.buildStatusActions(m,n),this.content.appendChild(m);let y=this.buildSection(B++),v=b("div",{class:"sp-detail-section-title"});F(v,this.t("detail.message")),y.appendChild(v);let x=b("div",{class:"sp-detail-message"});if(x.style.borderLeftColor=SA(n.type,this.colors),F(x,n.message),y.appendChild(x),this.content.appendChild(y),n.screenshotUrl&&fg(n.screenshotUrl)){let M=this.buildSection(B++),P=b("div",{class:"sp-detail-section-title"});F(P,this.t("detail.screenshot")),M.appendChild(P);let V=document.createElement("img");V.className="sp-detail-screenshot",V.src=n.screenshotUrl,V.alt=this.t("detail.screenshotAlt"),V.loading="lazy",V.referrerPolicy="no-referrer",M.appendChild(V),this.content.appendChild(M);}let U=this.buildSection(B++),N=b("div",{class:"sp-detail-section-title"});if(F(N,this.t("detail.metadata")),U.appendChild(N),this.buildMetadata(U,n),this.content.appendChild(U),n.annotations.length>0){let M=this.buildSection(B++),P=b("div",{class:"sp-detail-section-title"});P.appendChild(G(ms));let V=b("span");F(V,this.t("detail.annotation")),P.appendChild(V),M.appendChild(P),this.buildAnnotation(M,n),this.content.appendChild(M);}if(wg(n.diagnostics)){let M=this.buildSection(B++),P=b("div",{class:"sp-detail-section-title"});P.appendChild(G(hg));let V=b("span");F(V,this.t("detail.diagnostics")),P.appendChild(V),M.appendChild(P),this.buildDiagnostics(M,n),this.content.appendChild(M);}this._isVisible=true,this.element.setAttribute("aria-hidden","false"),this.element.offsetHeight,this.element.classList.add("sp-detail--visible"),requestAnimationFrame(()=>{c.focus();});}hide(){this._isVisible&&(this._isVisible=false,this.element.classList.remove("sp-detail--visible"),this.element.setAttribute("aria-hidden","true"),this.currentFeedback=null,this.resolveBtn=null,this.deleteBtn=null);}get isVisible(){return this._isVisible}destroy(){this.hide(),this.element.remove();}buildSection(n){let s=b("div",{class:"sp-detail-section"});return s.style.animationDelay=`${n*40}ms`,s}buildStatusActions(n,s){let a=s.status==="resolved",c=b("div",{class:"sp-detail-section-title"});F(c,this.t("detail.status")),n.appendChild(c);let p=b("div",{class:"sp-detail-status"}),u=b("span",{class:`sp-detail-status-pill ${a?"sp-detail-status-pill--resolved":"sp-detail-status-pill--open"}`}),B=b("span",{class:"sp-detail-status-dot"});B.style.background=a?"#9ca3af":"#22c55e",u.appendChild(B);let m=b("span");F(m,a?this.t("detail.reopen"):this.t("detail.resolve")),F(m,a?"Resolved":"Open"),u.appendChild(m),p.appendChild(u),n.appendChild(p);let y=b("div",{class:"sp-detail-actions"});if(this.resolveBtn=document.createElement("button"),this.resolveBtn.type="button",a){this.resolveBtn.className="sp-detail-btn-reopen",this.resolveBtn.appendChild(G(Sa));let x=document.createElement("span");F(x,this.t("detail.reopen")),this.resolveBtn.appendChild(x);}else {this.resolveBtn.className="sp-detail-btn-resolve",this.resolveBtn.appendChild(G(bs));let x=document.createElement("span");F(x,this.t("detail.resolve")),this.resolveBtn.appendChild(x);}this.resolveBtn.addEventListener("click",()=>this.handleResolve()),this.deleteBtn=document.createElement("button"),this.deleteBtn.type="button",this.deleteBtn.className="sp-detail-btn-delete",this.deleteBtn.appendChild(G(La));let v=document.createElement("span");F(v,this.t("detail.delete")),this.deleteBtn.appendChild(v),this.deleteBtn.addEventListener("click",()=>this.handleDelete()),y.appendChild(this.resolveBtn),y.appendChild(this.deleteBtn),n.appendChild(y);}buildMetadata(n,s){let a=b("div",{class:"sp-detail-meta"});if(this.addMetaRow(a,og,this.t("detail.page"),()=>{let c=b("div",{class:"sp-detail-meta-value"}),p=Bg(s.url);return F(c,Wr(p,60)),c.title=s.url,c}),this.addMetaRow(a,ag,this.t("detail.author"),()=>{let c=b("div",{class:"sp-detail-meta-value"}),p=s.authorName||"Anonymous",u=s.authorEmail;return F(c,u?`${p} (${u})`:p),c}),this.addMetaRow(a,lg,this.t("detail.date"),()=>{let c=b("div",{class:"sp-detail-meta-value"});return F(c,Ta(s.createdAt,this.locale.startsWith("fr")?"fr":"en")),c}),this.addMetaRow(a,cg,this.t("detail.viewport"),()=>{let c=b("div",{class:"sp-detail-meta-value sp-detail-meta-value--mono"});return F(c,s.viewport||"Unknown"),c}),this.addMetaRow(a,'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',this.t("detail.browser"),()=>{let c=b("div",{class:"sp-detail-meta-value"});return F(c,gg(s.userAgent)),c}),s.resolvedAt){let c=s.resolvedAt;this.addMetaRow(a,bs,this.t("detail.resolvedAt"),()=>{let p=b("div",{class:"sp-detail-meta-value sp-detail-meta-value--secondary"});return F(p,Ta(c,this.locale.startsWith("fr")?"fr":"en")),p});}n.appendChild(a);}addMetaRow(n,s,a,c){let p=b("div",{class:"sp-detail-meta-row"});p.appendChild(G(s));let u=b("div",{class:"sp-detail-meta-content"}),B=b("div",{class:"sp-detail-meta-label"});F(B,a),u.appendChild(B),u.appendChild(c()),p.appendChild(u),n.appendChild(p);}buildAnnotation(n,s){let a=s.annotations[0];if(!a)return;let c=b("div",{class:"sp-detail-annotation"}),p=b("div",{class:"sp-detail-annotation-info"});this.addAnnotationRow(p,dg,this.t("detail.element"),()=>{let m=b("span",{class:"sp-detail-annotation-value sp-detail-annotation-value--mono"}),y=a.elementId?`<${a.elementTag}#${a.elementId}>`:`<${a.elementTag}>`;return F(m,y),m}),this.addAnnotationRow(p,pg,this.t("detail.selector"),()=>{let m=b("span",{class:"sp-detail-annotation-value sp-detail-annotation-value--mono"});return F(m,Wr(a.cssSelector,60)),m.title=a.cssSelector,m}),this.addAnnotationRow(p,ms,this.t("detail.position"),()=>{let m=b("span",{class:"sp-detail-annotation-value"});return F(m,`${a.xPct.toFixed(1)}%, ${a.yPct.toFixed(1)}%`+(a.wPct>0||a.hPct>0?` (${a.wPct.toFixed(1)}% \xD7 ${a.hPct.toFixed(1)}%)`:"")),m}),c.appendChild(p);let u=document.createElement("button");u.type="button",u.className="sp-detail-btn-goto",u.appendChild(G(ms));let B=document.createElement("span");F(B,this.t("detail.goToAnnotation")),u.appendChild(B),u.addEventListener("click",()=>{this.currentFeedback&&this.callbacks.onGoToAnnotation(this.currentFeedback);}),c.appendChild(u),n.appendChild(c);}buildDiagnostics(n,s){let a=s.diagnostics;if(!a)return;let c=Array.isArray(a.console)?a.console:[],p=Array.isArray(a.network)?a.network:[],u=c.filter(P=>P.level==="error").length,B=b("div",{class:"sp-detail-diag"}),m=document.createElement("button");m.type="button",m.className="sp-detail-diag-toggle",m.setAttribute("aria-expanded","false"),m.setAttribute("aria-label",this.t("detail.diagnostics.expand"));let y=document.createElement("span"),v=document.createElement("span");v.style.display="inline-flex",v.style.alignItems="center",v.style.gap="8px",v.appendChild(G(ug)),F(y,this.t("detail.diagnostics")),v.appendChild(y),m.appendChild(v);let x=b("span",{class:"sp-detail-diag-counts"}),U=b("span",{class:`sp-detail-diag-count${u>0?" sp-detail-diag-count--errors":""}`});F(U,`${c.length} console`);let N=b("span",{class:`sp-detail-diag-count${p.length>0?" sp-detail-diag-count--errors":""}`});F(N,`${p.length} net`),x.appendChild(U),x.appendChild(N),m.appendChild(x);let M=b("div",{class:"sp-detail-diag-body"});if(c.length>0){let P=document.createElement("div"),V=b("div",{class:"sp-detail-diag-group-title"});F(V,this.t("detail.diagnostics.console")),P.appendChild(V);let eA=document.createElement("ul");eA.className="sp-detail-diag-list";for(let H of c){let R=document.createElement("li"),_=b("span",{class:`sp-detail-diag-level sp-detail-diag-level--${H.level}`});F(_,H.level);let $=b("span",{class:"sp-detail-diag-message"});F($,Wr(H.message,240)),$.title=H.message,R.appendChild(_),R.appendChild($),eA.appendChild(R);}P.appendChild(eA),M.appendChild(P);}if(p.length>0){let P=document.createElement("div"),V=b("div",{class:"sp-detail-diag-group-title"});F(V,this.t("detail.diagnostics.network")),P.appendChild(V);let eA=document.createElement("ul");eA.className="sp-detail-diag-list";for(let H of p){let R=document.createElement("li");R.classList.add("sp-detail-diag-net");let _=b("span",{class:"sp-detail-diag-net-status"});F(_,H.status===0?"ERR":String(H.status));let $=b("span",{class:"sp-detail-diag-net-method"});F($,H.method);let j=b("span",{class:"sp-detail-diag-net-url"});F(j,Wr(H.url,120)),j.title=`${H.url} \u2014 ${mg(H.durationMs)}`,R.appendChild(_),R.appendChild($),R.appendChild(j),eA.appendChild(R);}P.appendChild(eA),M.appendChild(P);}m.addEventListener("click",()=>{let V=!(m.getAttribute("aria-expanded")==="true");m.setAttribute("aria-expanded",String(V)),m.setAttribute("aria-label",V?this.t("detail.diagnostics.collapse"):this.t("detail.diagnostics.expand")),M.classList.toggle("sp-detail-diag-body--open",V);}),B.appendChild(m),B.appendChild(M),n.appendChild(B);}addAnnotationRow(n,s,a,c){let p=b("div",{class:"sp-detail-annotation-row"});p.appendChild(G(s));let u=b("div",{class:"sp-detail-meta-content"}),B=b("div",{class:"sp-detail-annotation-label"});F(B,a),u.appendChild(B),u.appendChild(c()),p.appendChild(u),n.appendChild(p);}async handleResolve(){if(!(this.isProcessing||!this.currentFeedback)){this.isProcessing=true,this.resolveBtn&&this.setButtonLoading(this.resolveBtn),this.deleteBtn&&(this.deleteBtn.disabled=true);try{await this.callbacks.onResolve(this.currentFeedback);}catch{this.isProcessing=false,this.resolveBtn&&this.restoreResolveBtn(this.currentFeedback),this.deleteBtn&&(this.deleteBtn.disabled=false);}}}async handleDelete(){if(!(this.isProcessing||!this.currentFeedback)){this.isProcessing=true,this.deleteBtn&&this.setButtonLoading(this.deleteBtn),this.resolveBtn&&(this.resolveBtn.disabled=true);try{await this.callbacks.onDelete(this.currentFeedback);}catch{this.isProcessing=false,this.deleteBtn&&this.restoreDeleteBtn(),this.resolveBtn&&(this.resolveBtn.disabled=false);}}}setButtonLoading(n){n.disabled=true,n.replaceChildren(b("div",{class:"sp-spinner sp-spinner--sm"}));}restoreResolveBtn(n){if(!this.resolveBtn)return;this.resolveBtn.disabled=false,this.resolveBtn.replaceChildren();let s=n.status==="resolved";this.resolveBtn.appendChild(G(s?Sa:bs));let a=document.createElement("span");F(a,s?this.t("detail.reopen"):this.t("detail.resolve")),this.resolveBtn.appendChild(a);}restoreDeleteBtn(){if(!this.deleteBtn)return;this.deleteBtn.disabled=false,this.deleteBtn.replaceChildren(),this.deleteBtn.appendChild(G(La));let n=document.createElement("span");F(n,this.t("detail.delete")),this.deleteBtn.appendChild(n);}};});function Ra(o,n){let s=[...o];switch(n){case "newest":s.sort((a,c)=>new Date(c.createdAt).getTime()-new Date(a.createdAt).getTime());break;case "oldest":s.sort((a,c)=>new Date(a.createdAt).getTime()-new Date(c.createdAt).getTime());break;case "by-type":s.sort((a,c)=>{let p=Da[a.type]??99,u=Da[c.type]??99;return p!==u?p-u:new Date(c.createdAt).getTime()-new Date(a.createdAt).getTime()});break;case "open-first":s.sort((a,c)=>{let p=a.status==="open"?0:1,u=c.status==="open"?0:1;return p!==u?p-u:new Date(c.createdAt).getTime()-new Date(a.createdAt).getTime()});break}return s}function vg(o){try{return new URL(o).pathname}catch{return o}}function yg(o,n){if(o.length<=n)return o;let s="\u2026",a=Math.floor((n-1)/2);return o.slice(0,a)+s+o.slice(-a)}function Oa(o){let n=new Map;for(let a of o){let c=vg(a.url),p=n.get(c);p?p.push(a):n.set(c,[a]);}return new Map([...n.entries()].sort((a,c)=>c[1].length-a[1].length))}function Na(o,n,s){let a=b("div",{class:"sp-group-header"});a.setAttribute("role","button"),a.setAttribute("tabindex","0"),a.setAttribute("aria-expanded","true"),a.style.borderBottomColor=s.border;let c=b("span",{class:"sp-group-header-chevron"});c.appendChild(G(Cg)),a.appendChild(c);let p=b("span",{class:"sp-group-header-icon"});p.appendChild(G(Ma)),a.appendChild(p);let u=b("span",{class:"sp-group-header-path"}),B=yg(o,40);F(u,B),o.length>40&&(u.title=o),a.appendChild(u);let m=b("span",{class:"sp-group-header-count"});m.style.background=s.accentLight,m.style.color=s.accent,F(m,String(n)),a.appendChild(m);let y=()=>{let v=a.getAttribute("aria-expanded")==="true";a.setAttribute("aria-expanded",String(!v)),a.classList.toggle("sp-group-header--collapsed",v);let x=a.nextElementSibling;x?.classList.contains("sp-group-content")&&x.classList.toggle("sp-group-content--collapsed",v);};return a.addEventListener("click",y),a.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),y());}),a}var bg,Ma,Cg,Da,$r,Pa,vs=dA(()=>{HA();bg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5h10"/><path d="M11 9h7"/><path d="M11 13h4"/><path d="M3 17l3 3 3-3"/><path d="M6 18V4"/></svg>',Ma='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',Cg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',Da={question:0,change:1,bug:2,other:3};$r=class{element;_sortMode="newest";_groupByPage=false;menuEl=null;sortBtn;groupToggle;t;colors;onChange;outsideClickHandler=null;constructor(n,s,a){this.colors=n,this.onChange=s,this.t=a,this.element=b("div",{class:"sp-sort-controls"}),this.sortBtn=document.createElement("button"),this.sortBtn.className="sp-sort-btn",this.sortBtn.setAttribute("aria-haspopup","listbox"),this.sortBtn.setAttribute("aria-expanded","false"),this.sortBtn.setAttribute("aria-label",this.t("sort.label"));let c=G(bg);this.sortBtn.appendChild(c);let p=b("span",{class:"sp-sort-btn-label"});F(p,this.t("sort.newest")),this.sortBtn.appendChild(p),this.sortBtn.addEventListener("click",m=>{m.stopPropagation(),this.toggleMenu();}),this.groupToggle=document.createElement("button"),this.groupToggle.className="sp-group-toggle",this.groupToggle.setAttribute("aria-pressed","false");let u=G(Ma);this.groupToggle.appendChild(u);let B=b("span",{class:"sp-group-toggle-label"});F(B,this.t("group.byPage")),this.groupToggle.appendChild(B),this.groupToggle.addEventListener("click",()=>{this._groupByPage=!this._groupByPage,this.groupToggle.classList.toggle("sp-group-toggle--active",this._groupByPage),this.groupToggle.setAttribute("aria-pressed",String(this._groupByPage)),this.onChange();}),this.element.appendChild(this.sortBtn),this.element.appendChild(this.groupToggle);}get sortMode(){return this._sortMode}get groupByPage(){return this._groupByPage}toggleMenu(){if(this.menuEl){this.closeMenu();return}this.openMenu();}openMenu(){this.menuEl=b("div",{class:"sp-sort-menu"}),this.menuEl.setAttribute("role","listbox"),this.menuEl.setAttribute("aria-label",this.t("sort.label")),this.sortBtn.setAttribute("aria-expanded","true");let n=[{mode:"newest",label:this.t("sort.newest")},{mode:"oldest",label:this.t("sort.oldest")},{mode:"by-type",label:this.t("sort.byType")},{mode:"open-first",label:this.t("sort.openFirst")}];for(let s of n){let a=document.createElement("button");a.className=`sp-sort-option${s.mode===this._sortMode?" sp-sort-option--active":""}`,a.setAttribute("role","option"),a.setAttribute("aria-selected",String(s.mode===this._sortMode)),s.mode===this._sortMode&&(a.style.background=this.colors.accentLight,a.style.color=this.colors.accent),F(a,s.label),a.addEventListener("click",c=>{c.stopPropagation(),this._sortMode=s.mode,this.updateSortLabel(),this.closeMenu(),this.onChange();}),this.menuEl.appendChild(a);}this.element.appendChild(this.menuEl),requestAnimationFrame(()=>{this.outsideClickHandler=s=>{this.menuEl&&!this.element.contains(s.target)&&this.closeMenu();},document.addEventListener("click",this.outsideClickHandler,true);}),this.menuEl.addEventListener("keydown",s=>{s.key==="Escape"&&(this.closeMenu(),this.sortBtn.focus());});}closeMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null),this.sortBtn.setAttribute("aria-expanded","false"),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler,true),this.outsideClickHandler=null);}updateSortLabel(){let n={newest:this.t("sort.newest"),oldest:this.t("sort.oldest"),"by-type":this.t("sort.byType"),"open-first":this.t("sort.openFirst")},s=this.sortBtn.querySelector(".sp-sort-btn-label");s&&F(s,n[this._sortMode]);}destroy(){this.closeMenu();}},Pa=`
  /* ============================
     Sort Controls Container
     ============================ */

  .sp-sort-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid var(--sp-border);
  }

  /* ============================
     Sort Dropdown Button
     ============================ */

  .sp-sort-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
    position: relative;
  }

  .sp-sort-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .sp-sort-btn:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-sort-btn[aria-expanded="true"] {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  /* ============================
     Sort Floating Menu
     ============================ */

  .sp-sort-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 170px;
    padding: 4px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-md);
    z-index: 10;
    animation: sp-sort-menu-in 0.15s ease-out both;
  }

  @keyframes sp-sort-menu-in {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* ============================
     Sort Menu Option
     ============================ */

  .sp-sort-option {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
  }

  .sp-sort-option:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-sort-option--active {
    font-weight: 600;
  }

  .sp-sort-option--active:hover {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  /* ============================
     Group by Page Toggle
     ============================ */

  .sp-group-toggle {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .sp-group-toggle svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  .sp-group-toggle:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-group-toggle--active {
    background: var(--sp-accent-gradient);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 2px 8px var(--sp-accent-glow);
  }

  .sp-group-toggle--active:hover {
    background: var(--sp-accent-gradient);
    border-color: transparent;
    color: #fff;
  }

  /* ============================
     Page Group Header
     ============================ */

  .sp-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--sp-accent-light);
    border-bottom: 1px solid var(--sp-border);
    cursor: pointer;
    user-select: none;
    position: sticky;
    top: 0;
    z-index: 2;
    transition: background 0.2s ease;
  }

  .sp-group-header:hover {
    background: var(--sp-bg-hover);
  }

  .sp-group-header:focus-visible {
    outline: 2px solid var(--sp-accent);
    outline-offset: -2px;
  }

  .sp-group-header-chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
    transform: rotate(90deg);
  }

  .sp-group-header-chevron svg {
    width: 12px;
    height: 12px;
    color: var(--sp-text-tertiary);
  }

  .sp-group-header--collapsed .sp-group-header-chevron {
    transform: rotate(0deg);
  }

  .sp-group-header-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .sp-group-header-icon svg {
    width: 14px;
    height: 14px;
    color: var(--sp-text-tertiary);
  }

  .sp-group-header-path {
    font-size: 12px;
    font-weight: 600;
    color: var(--sp-text-secondary);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-group-header-count {
    font-size: 11px;
    font-weight: 700;
    padding: 1px 8px;
    border-radius: var(--sp-radius-full);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  /* ============================
     Page Group Content
     ============================ */

  .sp-group-content {
    overflow: hidden;
    transition: max-height 0.25s ease, opacity 0.2s ease;
    max-height: 5000px;
    opacity: 1;
  }

  .sp-group-content--collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* ============================
     Forced Colors / High Contrast
     ============================ */

  @media (forced-colors: active) {
    .sp-sort-btn,
    .sp-group-toggle,
    .sp-sort-option,
    .sp-group-header {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-sort-btn:focus-visible,
    .sp-group-toggle:focus-visible,
    .sp-sort-option:focus-visible,
    .sp-group-header:focus-visible {
      outline: 3px solid Highlight !important;
    }

    .sp-sort-menu {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
    }
  }

  /* ============================
     Reduced Motion
     ============================ */

  @media (prefers-reduced-motion: reduce) {
    .sp-sort-menu {
      animation: none;
    }
    .sp-group-header-chevron {
      transition: none;
    }
    .sp-group-content {
      transition: none;
    }
  }
`;});var _a,zr,ys=dA(()=>{HA();_a=`
  .sp-stats-bar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--sp-border);
    user-select: none;
  }

  .sp-stats-bar[hidden] {
    display: none;
  }

  .sp-stats-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sp-stats-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-stats-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sp-stats-value {
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    color: var(--sp-text);
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    transition: opacity 0.3s ease;
  }

  .sp-stats-label {
    font-size: 11px;
    line-height: 1;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .sp-stats-progress {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sp-stats-progress-track {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--sp-border);
    overflow: hidden;
  }

  .sp-stats-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--sp-accent), #22c55e);
    width: 0%;
    transition: width 0.5s ease;
  }

  .sp-stats-progress-label {
    font-size: 10px;
    line-height: 1;
    color: var(--sp-text-tertiary);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    min-width: 64px;
    text-align: right;
  }
`,zr=class{constructor(n,s){this.colors=n;this.t=s,this.element=b("div",{class:"sp-stats-bar"}),this.element.setAttribute("aria-label","Feedback statistics"),this.element.hidden=true;let a=b("div",{class:"sp-stats-row"}),c=b("div",{class:"sp-stats-item"}),p=b("span",{class:"sp-stats-dot"});p.style.background="#22c55e",this.valueOpen=b("span",{class:"sp-stats-value"}),F(this.valueOpen,"0");let u=b("span",{class:"sp-stats-label"});F(u,this.t("stats.open")),c.appendChild(p),c.appendChild(this.valueOpen),c.appendChild(u);let B=b("div",{class:"sp-stats-item"}),m=b("span",{class:"sp-stats-dot"});m.style.background="#9ca3af",this.valueResolved=b("span",{class:"sp-stats-value"}),F(this.valueResolved,"0");let y=b("span",{class:"sp-stats-label"});F(y,this.t("stats.resolved")),B.appendChild(m),B.appendChild(this.valueResolved),B.appendChild(y);let v=b("div",{class:"sp-stats-item"}),x=b("span",{class:"sp-stats-dot"});x.style.background=this.colors.typeBug,this.valueBugs=b("span",{class:"sp-stats-value"}),F(this.valueBugs,"0");let U=b("span",{class:"sp-stats-label"});F(U,this.t("stats.bugs")),v.appendChild(x),v.appendChild(this.valueBugs),v.appendChild(U),a.appendChild(c),a.appendChild(B),a.appendChild(v);let N=b("div",{class:"sp-stats-progress"}),M=b("div",{class:"sp-stats-progress-track"});this.progressFill=b("div",{class:"sp-stats-progress-fill"}),M.appendChild(this.progressFill),this.progressLabel=b("span",{class:"sp-stats-progress-label"}),F(this.progressLabel,""),N.appendChild(M),N.appendChild(this.progressLabel),this.element.appendChild(a),this.element.appendChild(N);}colors;element;valueOpen;valueResolved;valueBugs;progressFill;progressLabel;t;update(n,s){if(s===0){this.element.hidden=true;return}this.element.hidden=false;let a=0,c=0,p=0;for(let y of n)y.status==="open"&&a++,y.status==="resolved"&&c++,y.type==="bug"&&p++;F(this.valueOpen,String(a)),F(this.valueResolved,String(c)),F(this.valueBugs,String(p));let u=n.length,B=u>0?Math.round(c/u*100):0;requestAnimationFrame(()=>{this.progressFill.style.width=`${B}%`;});let m=this.t("stats.progress").replace("{percent}",String(B));F(this.progressLabel,m);}};});function Qs(o){let n=o.querySelectorAll(".sp-card");for(let s=0;s<n.length;s++)if(n[s]?.classList.contains("sp-card--focused"))return s;return  -1}function Ga(o,n){let s=o.querySelectorAll(".sp-card");if(s.length===0)return;for(let p of s)p.classList.remove("sp-card--focused");let a=Math.max(0,Math.min(n,s.length-1)),c=s[a];c&&(c.classList.add("sp-card--focused"),c.scrollIntoView({block:"nearest",behavior:"smooth"}),c.focus({preventScroll:true}));}var Qg,Fg,Va,xg,Zr,Fs=dA(()=>{HA();Qg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M6 12h.01"/><path d="M18 12h.01"/><path d="M8 16h8"/></svg>';Fg=[{keys:["J","K"],label:"shortcuts.navigate"},{keys:["R"],label:"shortcuts.resolve"},{keys:["D"],label:"shortcuts.delete"},{keys:["F","/"],label:"shortcuts.search"},{keys:["X"],label:"shortcuts.select"},{keys:["?"],label:"shortcuts.help"},{keys:["Esc"],label:"shortcuts.close"}],Va=`
  /* ---- Help overlay backdrop ---- */

  .sp-shortcuts-overlay {
    position: fixed;
    inset: 0;
    background: var(--sp-backdrop, rgba(15, 23, 42, 0.2));
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .sp-shortcuts-overlay--visible {
    opacity: 1;
    pointer-events: auto;
  }

  /* ---- Glassmorphism card ---- */

  .sp-shortcuts-card {
    width: 380px;
    max-width: calc(100vw - 32px);
    padding: 24px 28px 20px;
    border-radius: 20px;
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-xl);
    font-family: var(--sp-font);
    position: relative;
    transform: scale(0.92) translateY(8px);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sp-shortcuts-overlay--visible .sp-shortcuts-card {
    transform: scale(1) translateY(0);
  }

  /* ---- Title row ---- */

  .sp-shortcuts-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
    color: var(--sp-text);
    margin-bottom: 18px;
  }

  .sp-shortcuts-title svg {
    width: 18px;
    height: 18px;
    color: var(--sp-text-secondary);
    flex-shrink: 0;
  }

  /* ---- Close button ---- */

  .sp-shortcuts-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--sp-text-tertiary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .sp-shortcuts-close:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-shortcuts-close svg {
    width: 14px;
    height: 14px;
  }

  /* ---- Two-column grid ---- */

  .sp-shortcuts-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sp-shortcuts-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sp-shortcuts-keys {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 80px;
    justify-content: flex-end;
  }

  .sp-shortcuts-separator {
    font-size: 11px;
    color: var(--sp-text-tertiary);
    user-select: none;
  }

  /* ---- Key badge (<kbd> styling) ---- */

  .sp-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 26px;
    padding: 0 7px;
    border-radius: 6px;
    background: var(--sp-bg-hover);
    border: 1px solid var(--sp-border);
    box-shadow:
      inset 0 -1px 0 rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(0, 0, 0, 0.04);
    font-family: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", Menlo, monospace;
    font-size: 12px;
    font-weight: 600;
    color: var(--sp-text);
    text-align: center;
    line-height: 1;
    user-select: none;
  }

  /* ---- Description text ---- */

  .sp-shortcuts-desc {
    font-size: 13px;
    color: var(--sp-text-secondary);
    line-height: 1.3;
  }

  /* ---- Hint button (bottom-right of panel) ---- */

  .sp-shortcuts-hint {
    width: 24px;
    height: 24px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-bg-hover);
    color: var(--sp-text-tertiary);
    font-family: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", Menlo, monospace;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .sp-shortcuts-hint:hover {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
    border-color: var(--sp-accent);
  }

  .sp-shortcuts-hint::after {
    content: attr(aria-label);
    position: absolute;
    bottom: calc(100% + 6px);
    right: 0;
    padding: 4px 8px;
    border-radius: 6px;
    background: var(--sp-glass-bg-heavy);
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-sm);
    font-family: var(--sp-font);
    font-size: 11px;
    font-weight: 500;
    color: var(--sp-text-secondary);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .sp-shortcuts-hint:hover::after {
    opacity: 1;
    transform: translateY(0);
  }

  /* ---- Card focus highlight (navigation) ---- */

  .sp-card--focused {
    outline: 2px solid var(--sp-accent);
    outline-offset: -2px;
    border-radius: inherit;
  }

  /* ---- Reduced motion ---- */

  @media (prefers-reduced-motion: reduce) {
    .sp-shortcuts-overlay,
    .sp-shortcuts-card,
    .sp-shortcuts-close,
    .sp-shortcuts-hint,
    .sp-shortcuts-hint::after {
      transition-duration: 0.01ms !important;
    }
  }
`,xg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Zr=class{constructor(n,s,a){this.t=a;this.keyMap=new Map([["j",()=>s.onNavigate("down")],["k",()=>s.onNavigate("up")],["r",()=>s.onResolve()],["d",()=>s.onDelete()],["f",()=>s.onFocusSearch()],["/",()=>s.onFocusSearch()],["x",()=>s.onToggleSelect()],["?",()=>this.toggleHelp()]]),this.helpOverlay=this.buildOverlay(),this.hintButton=this.buildHintButton(),this.boundHandler=c=>this.handleKeydown(c);}t;helpOverlay;hintButton;keyMap;boundHandler;shadowRoot=null;enabled=false;helpVisible=false;destroyed=false;enable(n){if(this.destroyed||this.enabled)return;n&&(this.shadowRoot=n),(this.shadowRoot??document).addEventListener("keydown",this.boundHandler),this.enabled=true;}disable(){if(!this.enabled)return;(this.shadowRoot??document).removeEventListener("keydown",this.boundHandler),this.enabled=false,this.helpVisible&&this.hideHelp();}toggleHelp(){this.helpVisible?this.hideHelp():this.showHelp();}destroy(){this.destroyed||(this.disable(),this.helpOverlay.remove(),this.hintButton.remove(),this.destroyed=true);}handleKeydown(n){if(n.key==="Escape"){this.helpVisible&&(n.preventDefault(),n.stopPropagation(),this.hideHelp());return}if(this.helpVisible)return;let s=n.composedPath()[0];if(s){let c=s.tagName?.toLowerCase();if(c==="input"||c==="textarea"||c==="select"||s.isContentEditable)return}if(n.ctrlKey||n.altKey||n.metaKey)return;let a=this.keyMap.get(n.key);a&&(n.preventDefault(),n.stopPropagation(),a());}showHelp(){this.helpVisible=true,this.helpOverlay.classList.add("sp-shortcuts-overlay--visible"),this.helpOverlay.querySelector(".sp-shortcuts-close")?.focus();}hideHelp(){this.helpVisible=false,this.helpOverlay.classList.remove("sp-shortcuts-overlay--visible");}buildOverlay(){let n=b("div",{class:"sp-shortcuts-overlay"});n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label",this.t("shortcuts.title")),n.addEventListener("click",B=>{B.target===n&&this.hideHelp();});let s=b("div",{class:"sp-shortcuts-card"}),a=b("div",{class:"sp-shortcuts-title"});a.appendChild(G(Qg));let c=b("span");F(c,this.t("shortcuts.title")),a.appendChild(c),s.appendChild(a);let p=document.createElement("button");p.className="sp-shortcuts-close",p.setAttribute("aria-label",this.t("shortcuts.close")),p.appendChild(G(xg)),p.addEventListener("click",()=>this.hideHelp()),s.appendChild(p);let u=b("div",{class:"sp-shortcuts-grid"});for(let B of Fg){let m=b("div",{class:"sp-shortcuts-row"}),y=b("div",{class:"sp-shortcuts-keys"});B.keys.forEach((x,U)=>{if(U>0){let M=b("span",{class:"sp-shortcuts-separator"});F(M,"/"),y.appendChild(M);}let N=b("span",{class:"sp-kbd"});F(N,x),y.appendChild(N);});let v=b("span",{class:"sp-shortcuts-desc"});F(v,this.t(B.label)),m.appendChild(y),m.appendChild(v),u.appendChild(m);}return s.appendChild(u),n.appendChild(s),n}buildHintButton(){let n=document.createElement("button");return n.className="sp-shortcuts-hint",n.setAttribute("aria-label",this.t("shortcuts.hint")),F(n,"?"),n.addEventListener("click",s=>{s.stopPropagation(),this.toggleHelp();}),n}};});var Ut,Ya=dA(()=>{HA();Ut=class{element;current;opts;onChange;datasetKey;constructor(n){this.opts=n.options,this.current=n.value,this.onChange=n.onChange,this.datasetKey=n.datasetKey,this.element=b("div",{class:`sp-segmented${n.extraClass?` ${n.extraClass}`:""}`,role:"radiogroup"}),this.element.setAttribute("aria-label",n.ariaLabel);for(let s of this.opts){let a=document.createElement("button");a.type="button",a.className=n.modifierPrefix!==void 0?`sp-segmented__btn ${n.modifierPrefix}${s.value}`:"sp-segmented__btn",a.dataset[this.datasetKey]=s.value,a.setAttribute("role","radio");let c=this.current===s.value;if(a.setAttribute("aria-checked",String(c)),a.tabIndex=c?0:-1,c&&a.classList.add("sp-segmented__btn--active"),s.color&&a.style.setProperty("--sp-chip-color",s.color),s.bg&&a.style.setProperty("--sp-chip-bg",s.bg),s.icon){let u=b("span",{class:"sp-segmented__icon"});u.appendChild(G(s.icon)),a.appendChild(u);}let p=b("span",{class:"sp-segmented__label"});F(p,s.label),a.appendChild(p),a.addEventListener("click",()=>this.select(s.value)),a.addEventListener("keydown",u=>this.handleKey(u,s.value)),this.element.appendChild(a);}}select(n){this.current=n,this.syncSelection(),this.onChange(n);}syncSelection(){let n=this.element.querySelectorAll(".sp-segmented__btn");for(let s of n){let a=s.dataset[this.datasetKey]===this.current;s.classList.toggle("sp-segmented__btn--active",a),s.setAttribute("aria-checked",String(a)),s.tabIndex=a?0:-1;}}setOptionVisible(n,s){let a=this.element.querySelector(`[data-${this.kebabKey()}="${n}"]`);return a?(a.style.display=s?"":"none",true):false}get value(){return this.current}focusOption(n){this.element.querySelector(`[data-${this.kebabKey()}="${n}"]`)?.focus();}handleKey(n,s){let a=this.opts.map(B=>B.value).filter(B=>{let m=this.element.querySelector(`[data-${this.kebabKey()}="${B}"]`);return m!==null&&m.style.display!=="none"}),c=a.indexOf(s);if(c<0)return;let p;switch(n.key){case "ArrowLeft":p=(c-1+a.length)%a.length;break;case "ArrowRight":p=(c+1)%a.length;break;case "Home":p=0;break;case "End":p=a.length-1;break;default:return}n.preventDefault();let u=a[p];u!==void 0&&(this.select(u),this.focusOption(u));}kebabKey(){return this.datasetKey.replace(/[A-Z]/g,n=>`-${n.toLowerCase()}`)}};});var Ja={};ve(Ja,{Panel:()=>Hs});var Hs,Wa=dA(()=>{Ya();HA();fs();Ft();kr();ws();Cs();vs();ys();Fs();ce();Hs=class{constructor(n,s,a,c,p,u,B,m,y){this.colors=s;this.bus=a;this.client=c;this.projectName=p;this.markers=u;this.t=B;this.locale=m;this.shadowRoot=n,this.getScope=y?.getScope??(()=>({url:window.location.pathname,urlPattern:null})),this.scopeAnnotationsByUrl=y?.scopeAnnotationsByUrl??true,this.root=b("div",{class:"sp-panel"}),this.root.setAttribute("role","complementary"),this.root.setAttribute("aria-label",this.t("panel.ariaLabel")),this.root.setAttribute("aria-hidden","true");let v=b("div",{class:"sp-panel-header"}),x=b("span",{class:"sp-panel-title"});F(x,this.t("panel.title")),this.closeBtn=document.createElement("button"),this.closeBtn.className="sp-panel-close",this.closeBtn.setAttribute("aria-label",this.t("panel.close")),this.closeBtn.appendChild(G(Qr)),this.closeBtn.addEventListener("click",()=>this.close()),this.deleteAllBtn=document.createElement("button"),this.deleteAllBtn.className="sp-btn-delete-all",this.deleteAllBtn.setAttribute("aria-label",this.t("panel.deleteAll")),this.deleteAllBtn.appendChild(G(os));let U=document.createElement("span");F(U,` ${this.t("panel.deleteAll")}`),this.deleteAllBtn.appendChild(U),this.deleteAllBtn.addEventListener("click",()=>this.confirmDeleteAll()),this.exportBtn=new Xr(s,()=>this.feedbacks,this.t);let N=b("div",{class:"sp-panel-header-right"});N.appendChild(this.exportBtn.element),N.appendChild(this.deleteAllBtn),N.appendChild(this.closeBtn),v.appendChild(x),v.appendChild(N),this.stats=new zr(s,this.t);let M=b("div",{class:"sp-filters"}),P=b("div",{class:"sp-search-wrap"}),V=G(Lo);V.setAttribute("class","sp-search-icon"),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.className="sp-search",this.searchInput.placeholder=this.t("panel.search"),this.searchInput.setAttribute("aria-label",this.t("panel.searchAria")),this.searchInput.addEventListener("input",()=>{this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>this.loadFeedbacks().catch(()=>{}),200);}),P.appendChild(V),P.appendChild(this.searchInput);let eA=b("div",{class:"sp-filter-bar"});eA.appendChild(this.buildTypeDropdown()),eA.appendChild(this.buildStatusSegmented()),eA.appendChild(this.buildScopeSegmented()),this.sortControls=new $r(s,()=>this.renderList(),this.t),M.appendChild(P),M.appendChild(eA),M.appendChild(this.sortControls.element),this.listContainer=b("div",{class:"sp-list"}),this.listContainer.setAttribute("role","list"),this.listContainer.setAttribute("aria-label",this.t("panel.feedbackList")),this.bulk=new Jr(s,{onResolve:H=>this.bulkResolve(H),onDelete:H=>this.bulkDelete(H)},this.t),this.bulk.setListContainer(this.listContainer),this.detail=new jr(s,{onBack:()=>this.detail.hide(),onResolve:async H=>{try{let R=H.status!=="resolved";await this.client.resolveFeedback(H.id,R),await this.loadFeedbacks(),this.detail.hide();}catch(R){throw this.bus.emit("feedback:error",R instanceof Error?R:new Error(String(R))),R}},onDelete:async H=>{try{await this.client.deleteFeedback(H.id),this.bus.emit("feedback:deleted",H.id),await this.loadFeedbacks(),this.detail.hide();}catch(R){throw this.bus.emit("feedback:error",R instanceof Error?R:new Error(String(R))),R}},onGoToAnnotation:H=>{if(H.annotations.length>0){let R=H.annotations[0];if(!R)return;window.scrollTo({left:R.scrollX,top:R.scrollY,behavior:"smooth"}),this.markers.pinHighlight(H);}}},this.t,m),this.shortcuts=new Zr(s,{onNavigate:H=>{let R=Qs(this.listContainer);Ga(this.listContainer,H==="down"?R+1:R-1);},onResolve:()=>{let H=this.getFocusedFeedback();if(H&&!this.pendingMutations.has(H.id)){let _=this.listContainer.querySelector(`[data-feedback-id="${CSS.escape(H.id)}"]`)?.querySelector('[data-action="resolve"]');_&&this.toggleResolve(H,_).catch(()=>{});}},onDelete:()=>{let H=this.getFocusedFeedback();if(H&&!this.pendingMutations.has(H.id)){let _=this.listContainer.querySelector(`[data-feedback-id="${CSS.escape(H.id)}"]`)?.querySelector('[data-action="delete"]');_&&this.deleteFeedback(H,_).catch(()=>{});}},onFocusSearch:()=>this.searchInput.focus(),onToggleSelect:()=>{let H=this.getFocusedFeedback();H&&this.bulk.toggle(H.id);}},this.t),this.root.appendChild(v),this.root.appendChild(this.stats.element),this.root.appendChild(M),this.root.appendChild(this.listContainer),this.root.appendChild(this.bulk.barElement),this.root.appendChild(this.detail.element),this.root.appendChild(this.shortcuts.helpOverlay),this.root.appendChild(this.shortcuts.hintButton),n.appendChild(this.root),this.onListClick=H=>{let R=H.target;if(R.closest(".sp-bulk-checkbox"))return;let _=R.closest("[data-action]");if(_){H.stopPropagation();let j=_.closest(".sp-card");if(!j)return;let lA=j.dataset.feedbackId,z=this.feedbacks.find(tA=>tA.id===lA);if(!z)return;let fA=_.dataset.action;if(fA==="expand"){let tA=j.querySelector(".sp-card-message");if(!tA)return;let VA=tA.classList.toggle("sp-card-message--expanded");F(_,VA?this.t("panel.showLess"):this.t("panel.showMore")),_.setAttribute("aria-expanded",String(VA));}else if(fA==="resolve"){if(this.pendingMutations.has(z.id))return;let tA=_;this.toggleResolve(z,tA).catch(()=>{});}else if(fA==="delete"){if(this.pendingMutations.has(z.id))return;let tA=_;this.deleteFeedback(z,tA).catch(()=>{});}return}let $=R.closest(".sp-card");if($){let j=$.dataset.feedbackId,lA=this.feedbacks.find(z=>z.id===j);if(lA){let z=this.feedbacks.indexOf(lA)+1;this.detail.show(lA,z);}}},this.listContainer.addEventListener("click",this.onListClick),this.onListKeydown=H=>{let R=H;if(R.key!=="Enter"&&R.key!==" ")return;let _=R.target,$=_.closest(".sp-card");if(!$||_!==$)return;R.preventDefault();let j=$.dataset.feedbackId,lA=this.feedbacks.find(z=>z.id===j);if(lA){let z=this.feedbacks.indexOf(lA)+1;this.detail.show(lA,z);}},this.listContainer.addEventListener("keydown",this.onListKeydown),this.onListMouseover=H=>{let _=H.target.closest(".sp-card");if(!_)return;let $=_.dataset.feedbackId;$&&this.markers.highlight($);},this.listContainer.addEventListener("mouseover",this.onListMouseover),this.onListMouseout=H=>{let R=H.relatedTarget;R&&this.listContainer.contains(R)||this.markers.highlight("");},this.listContainer.addEventListener("mouseout",this.onListMouseout),this.bus.on("panel:toggle",H=>{H?this.open():this.close();}),n.addEventListener("keydown",H=>{let R=H;if(R.key==="Escape"&&this.isOpen){if(this.detail.isVisible){this.detail.hide();return}this.close();return}if(R.key==="Tab"&&this.isOpen){let _=fA=>{let tA=fA;for(;tA&&tA!==this.root;){if(tA.style.display==="none")return  false;tA=tA.parentElement;}return  true},$=Array.from(this.root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(fA=>_(fA)&&!fA.hasAttribute("disabled"));if($.length===0)return;let j=$[0],lA=$[$.length-1];if(!j||!lA)return;let z=n.activeElement;R.shiftKey&&z===j?(R.preventDefault(),lA.focus()):!R.shiftKey&&z===lA&&(R.preventDefault(),j.focus());}}),this.onMarkerClick=(H=>{this.scrollToFeedback(H.detail.feedbackId);}),document.addEventListener("sp-marker-click",this.onMarkerClick);}colors;bus;client;projectName;markers;t;locale;root;listContainer;searchInput;closeBtn;deleteAllBtn;activeFilters=new Set(["all"]);typeDropdownBtn;typeDropdownContainer;typeDropdownMenu=null;typeDropdownOutsideHandler=null;statusSegmented;typeOptions;feedbacks=[];currentPage=1;totalFeedbacks=0;isLoadingMore=false;isOpen=false;searchTimeout=null;loadController=null;pendingMutations=new Set;stats;sortControls;bulk;exportBtn;shortcuts;detail;shadowRoot;getScope;scopeAnnotationsByUrl;scopeSegmented;initialScopeFilter="this";onMarkerClick;onListClick;onListKeydown;onListMouseover;onListMouseout;async open(){this.isOpen||(this.isOpen=true,this.root.classList.add("sp-panel--open"),this.root.setAttribute("aria-hidden","false"),this.bus.emit("open"),this.shortcuts.enable(this.shadowRoot),await this.loadFeedbacks(),requestAnimationFrame(()=>{this.searchInput?this.searchInput.focus():this.closeBtn.focus();}));}close(){if(!this.isOpen)return;this.isOpen=false,this.root.classList.remove("sp-panel--open"),this.root.setAttribute("aria-hidden","true"),this.bus.emit("close"),this.shortcuts.disable(),this.detail.hide(),this.root.getRootNode().querySelector(".sp-fab")?.focus();}showLoading(){this.listContainer.replaceChildren();let n=b("div",{class:"sp-loading"});n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.setAttribute("aria-label",this.t("panel.loading"));let s=b("div",{class:"sp-spinner"});n.appendChild(s),this.listContainer.appendChild(n);}showError(){this.listContainer.replaceChildren();let n=b("div",{class:"sp-empty"});n.setAttribute("role","status"),n.setAttribute("aria-live","polite");let s=b("div",{class:"sp-empty-text"});F(s,this.t("panel.loadError"));let a=document.createElement("button");a.className="sp-btn-ghost",a.style.marginTop="8px",F(a,this.t("panel.retry")),a.addEventListener("click",()=>this.loadFeedbacks().catch(()=>{})),n.appendChild(s),n.appendChild(a),this.listContainer.appendChild(n);}async loadFeedbacks(){this.loadController?.abort(),this.loadController=new AbortController;let{signal:n}=this.loadController;this.currentPage=1;let s=this.searchInput.value.trim()||void 0,a=this.activeFilters.has("all")?void 0:Array.from(this.activeFilters)[0],c=this.statusSegmented.value,p=c==="all"?void 0:c,u=this.getScope();this.syncScopeAvailability();let B=this.scopeSegmented.value,m={page:1,limit:20};a&&(m.type=a),p&&(m.status=p),s&&(m.search=s),B==="this"?m.url=u.url:B==="template"&&u.urlPattern&&(m.urlPattern=u.urlPattern);let y=this.feedbacks.length>0;y||this.showLoading();try{let{feedbacks:v,total:x}=await this.client.getFeedbacks(this.projectName,m);if(n.aborted)return;this.feedbacks=v,this.totalFeedbacks=x,this.stats.update(v,x),this.bulk.reset(),this.renderList();let U=this.scopeAnnotationsByUrl?v.filter(N=>N.url===u.url):v;this.markers.render(U);}catch(v){if(n.aborted)return;y||this.showError(),this.bus.emit("feedback:error",v instanceof Error?v:new Error(String(v)));}}async loadMoreFeedbacks(){if(this.isLoadingMore)return;this.isLoadingMore=true;let n=this.loadController,s=this.currentPage+1,a=this.searchInput.value.trim()||void 0,c=this.activeFilters.has("all")?void 0:Array.from(this.activeFilters)[0],p=this.statusSegmented.value,u=p==="all"?void 0:p,B=this.getScope(),m=this.scopeSegmented.value,y={page:s,limit:20};c&&(y.type=c),u&&(y.status=u),a&&(y.search=a),m==="this"?y.url=B.url:m==="template"&&B.urlPattern&&(y.urlPattern=B.urlPattern);let v=this.listContainer.querySelector(".sp-btn-load-more"),x;v&&(x=ye(v));try{let{feedbacks:U,total:N}=await this.client.getFeedbacks(this.projectName,y);if(n!==this.loadController)return;this.currentPage=s,this.totalFeedbacks=N,this.feedbacks=[...this.feedbacks,...U],this.stats.update(this.feedbacks,N),this.renderList();let M=this.scopeAnnotationsByUrl?this.feedbacks.filter(P=>P.url===B.url):this.feedbacks;this.markers.render(M);}catch(U){x&&x(),this.bus.emit("feedback:error",U instanceof Error?U:new Error(String(U)));}finally{this.isLoadingMore=false;}}renderList(){if(this.listContainer.replaceChildren(),this.feedbacks.length===0){let p=b("div",{class:"sp-empty"});p.setAttribute("role","status"),p.setAttribute("aria-live","polite");let u=b("div",{class:"sp-empty-text"});F(u,this.t("panel.empty")),p.appendChild(u),this.listContainer.appendChild(p);return}let n=Ra(this.feedbacks,this.sortControls.sortMode),s=n.map(p=>p.id),a=this.bulk.createSelectAllBar(s,this.t("bulk.selectAll"));if(this.listContainer.appendChild(a),this.sortControls.groupByPage){let p=Oa(n),u=0;for(let[B,m]of p){let y=Na(B,m.length,this.colors);this.listContainer.appendChild(y);let v=b("div",{class:"sp-group-content"});for(let x of m){let U=this.createCard(x,u+1);U.style.setProperty("--sp-card-i",String(u)),v.appendChild(U),u++;}this.listContainer.appendChild(v);}}else n.forEach((p,u)=>{let B=this.createCard(p,u+1);B.style.setProperty("--sp-card-i",String(u)),this.listContainer.appendChild(B);});let c=this.totalFeedbacks-this.feedbacks.length;if(c>0){let p=b("div",{class:"sp-load-more-wrap"}),u=document.createElement("button");u.className="sp-btn-ghost sp-btn-load-more",F(u,this.t("panel.loadMore").replace("{remaining}",String(c))),u.addEventListener("click",()=>this.loadMoreFeedbacks().catch(()=>{})),p.appendChild(u),this.listContainer.appendChild(p);}}createCard(n,s){let a=n.status==="resolved",c=SA(n.type,this.colors),p=b("div",{class:`sp-card ${a?"sp-card--resolved":""}`});p.setAttribute("role","listitem"),p.setAttribute("tabindex","0"),p.setAttribute("aria-label",`Feedback #${s}: ${Qe(n.type,this.t)} \u2014 ${n.message.slice(0,80)}`),p.dataset.feedbackId=n.id;let u=b("div",{class:"sp-card-bar"});u.style.background=a?"#9ca3af":c;let B=b("div",{class:"sp-card-body"}),m=b("div",{class:"sp-card-header"}),y=this.bulk.createCheckbox(n.id);m.appendChild(y);let v=b("span",{class:"sp-card-number"});F(v,`#${s}`);let x=b("span",{class:"sp-badge"}),U=$A(n.type,this.colors);x.style.background=U,x.style.color=c,F(x,Qe(n.type,this.t));let N=b("span",{class:"sp-card-date"});F(N,yr(n.createdAt,this.locale)),m.appendChild(v),m.appendChild(x),m.appendChild(N);let M=b("div",{class:"sp-card-message"});F(M,n.message);let P=document.createElement("button");P.className="sp-card-expand",P.dataset.action="expand",F(P,this.t("panel.showMore")),P.style.display="none",P.setAttribute("aria-expanded","false"),requestAnimationFrame(()=>{M.scrollHeight>M.clientHeight&&(P.style.display="block");});let V=b("div",{class:"sp-card-footer"}),eA=document.createElement("button");if(eA.className="sp-btn-resolve",eA.dataset.action="resolve",a){eA.appendChild(G(Do));let _=document.createElement("span");F(_,` ${this.t("panel.reopen")}`),eA.appendChild(_);}else {eA.appendChild(G(Fr));let _=document.createElement("span");F(_,` ${this.t("panel.resolve")}`),eA.appendChild(_);}let H=document.createElement("button");H.className="sp-btn-delete",H.dataset.action="delete",H.appendChild(G(os));let R=document.createElement("span");return F(R,` ${this.t("panel.delete")}`),H.appendChild(R),V.appendChild(eA),V.appendChild(H),B.appendChild(m),B.appendChild(M),B.appendChild(P),B.appendChild(V),p.appendChild(u),p.appendChild(B),p}async bulkResolve(n){try{await Promise.all(n.map(s=>this.client.resolveFeedback(s,!0))),await this.loadFeedbacks();}catch(s){throw this.bus.emit("feedback:error",s instanceof Error?s:new Error(String(s))),s}}async bulkDelete(n){try{await Promise.all(n.map(s=>this.client.deleteFeedback(s)));for(let s of n)this.bus.emit("feedback:deleted",s);await this.loadFeedbacks();}catch(s){throw this.bus.emit("feedback:error",s instanceof Error?s:new Error(String(s))),s}}async confirmDeleteAll(){if(await this.showConfirmDialog(this.t("panel.deleteAllConfirmTitle"),this.t("panel.deleteAllConfirmMessage"))){this.deleteAllBtn.disabled=true;try{await this.client.deleteAllFeedbacks(this.projectName),this.bus.emit("feedback:all-deleted"),await this.loadFeedbacks();}catch(s){this.bus.emit("feedback:error",s instanceof Error?s:new Error(String(s)));}finally{this.deleteAllBtn.disabled=false;}}}showConfirmDialog(n,s){return new Promise(a=>{let c=b("div",{class:"sp-confirm-backdrop"}),p=`sp-confirm-title-${Date.now()}`,u=`sp-confirm-msg-${Date.now()}`,B=b("div",{class:"sp-confirm-dialog"});B.setAttribute("role","alertdialog"),B.setAttribute("aria-modal","true"),B.setAttribute("aria-labelledby",p),B.setAttribute("aria-describedby",u);let m=b("div",{class:"sp-confirm-title"});m.id=p,F(m,n);let y=b("div",{class:"sp-confirm-message"});y.id=u,F(y,s);let v=b("div",{class:"sp-confirm-actions"}),x=document.createElement("button");x.type="button",x.className="sp-btn-ghost",F(x,this.t("panel.cancel"));let U=document.createElement("button");U.type="button",U.className="sp-btn-danger",F(U,this.t("panel.confirmDelete"));let N=false,M=V=>{N||(N=true,c.removeEventListener("keydown",P),c.style.opacity="0",B.style.transform="translateY(8px) scale(0.97)",setTimeout(()=>{c.remove(),a(V);},200));},P=V=>{let eA=V;if(eA.key==="Escape"){M(false);return}eA.key==="Tab"&&(eA.preventDefault(),c.getRootNode().activeElement===x?U.focus():x.focus());};c.addEventListener("keydown",P),x.addEventListener("click",()=>M(false)),U.addEventListener("click",()=>M(true)),c.addEventListener("click",V=>{V.target===c&&M(false);}),v.appendChild(x),v.appendChild(U),B.appendChild(m),B.appendChild(y),B.appendChild(v),c.appendChild(B),this.root.getRootNode()instanceof ShadowRoot?this.root.getRootNode().appendChild(c):this.root.appendChild(c),requestAnimationFrame(()=>{c.style.opacity="1",B.style.transform="translateY(0) scale(1)",x.focus();});})}async deleteFeedback(n,s){this.pendingMutations.add(n.id);let a=ye(s);try{await this.client.deleteFeedback(n.id),this.bus.emit("feedback:deleted",n.id),await this.loadFeedbacks();}catch(c){a(),this.bus.emit("feedback:error",c instanceof Error?c:new Error(String(c)));}finally{this.pendingMutations.delete(n.id);}}async toggleResolve(n,s){this.pendingMutations.add(n.id);let a=ye(s);try{let c=n.status!=="resolved";await this.client.resolveFeedback(n.id,c),await this.loadFeedbacks();}catch(c){a(),this.bus.emit("feedback:error",c instanceof Error?c:new Error(String(c)));}finally{this.pendingMutations.delete(n.id);}}buildTypeDropdown(){return this.typeOptions=[{value:"all",label:this.t("panel.filterAll"),icon:is,color:this.colors.accent,bg:this.colors.accentLight},{value:"question",label:this.t("type.question"),icon:xr,color:this.colors.typeQuestion,bg:this.colors.typeQuestionBg},{value:"change",label:this.t("type.change"),icon:Ur,color:this.colors.typeChange,bg:this.colors.typeChangeBg},{value:"bug",label:this.t("type.bug"),icon:Er,color:this.colors.typeBug,bg:this.colors.typeBugBg},{value:"other",label:this.t("type.other"),icon:Hr,color:this.colors.typeOther,bg:this.colors.typeOtherBg}],this.typeDropdownContainer=b("div",{class:"sp-filter-dropdown"}),this.typeDropdownBtn=document.createElement("button"),this.typeDropdownBtn.type="button",this.typeDropdownBtn.className="sp-filter-dropdown-btn",this.typeDropdownBtn.setAttribute("aria-haspopup","listbox"),this.typeDropdownBtn.setAttribute("aria-expanded","false"),this.renderTypeDropdownTrigger(),this.typeDropdownBtn.addEventListener("click",n=>{n.stopPropagation(),this.typeDropdownMenu?this.closeTypeDropdown():this.openTypeDropdown();}),this.typeDropdownContainer.appendChild(this.typeDropdownBtn),this.typeDropdownContainer}renderTypeDropdownTrigger(){let n=this.typeOptions.find(B=>this.activeFilters.has(B.value))??this.typeOptions[0];if(!n)return;this.typeDropdownBtn.replaceChildren(),this.typeDropdownBtn.style.setProperty("--sp-chip-color",n.color),this.typeDropdownBtn.style.setProperty("--sp-chip-bg",n.bg),this.typeDropdownBtn.dataset.filter=n.value,this.typeDropdownBtn.classList.toggle("sp-filter-dropdown-btn--filtered",n.value!=="all"),this.typeDropdownBtn.setAttribute("aria-label",`${this.t("type.label")}: ${n.label}`);let s=b("span",{class:"sp-filter-dropdown-btn__icon"});s.appendChild(G(n.icon)),this.typeDropdownBtn.appendChild(s);let a=b("span",{class:"sp-filter-dropdown-btn__label"}),c=b("span",{class:"sp-filter-dropdown-btn__prefix"});F(c,this.t("type.label"));let p=b("span",{class:"sp-filter-dropdown-btn__value"});F(p,n.label),a.appendChild(c),a.appendChild(p),this.typeDropdownBtn.appendChild(a);let u=b("span",{class:"sp-filter-dropdown-btn__chevron"});u.appendChild(G(Ko)),this.typeDropdownBtn.appendChild(u);}openTypeDropdown(){this.typeDropdownMenu=b("div",{class:"sp-filter-dropdown-menu"}),this.typeDropdownMenu.setAttribute("role","listbox"),this.typeDropdownMenu.setAttribute("aria-label",this.t("type.label")),this.typeDropdownBtn.setAttribute("aria-expanded","true");for(let n of this.typeOptions){let s=document.createElement("button");s.type="button";let a=this.activeFilters.has(n.value);s.className=`sp-filter-dropdown-option${a?" sp-filter-dropdown-option--active":""}`,s.style.setProperty("--sp-chip-color",n.color),s.style.setProperty("--sp-chip-bg",n.bg),s.dataset.filter=n.value,s.setAttribute("role","option"),s.setAttribute("aria-selected",String(a));let c=b("span",{class:"sp-filter-dropdown-option__icon"});c.appendChild(G(n.icon)),s.appendChild(c);let p=b("span",{class:"sp-filter-dropdown-option__label"});if(F(p,n.label),s.appendChild(p),a){let u=b("span",{class:"sp-filter-dropdown-option__check"});u.appendChild(G(Fr)),s.appendChild(u);}s.addEventListener("click",u=>{u.stopPropagation(),this.selectTypeFilter(n.value);}),this.typeDropdownMenu.appendChild(s);}this.typeDropdownContainer.appendChild(this.typeDropdownMenu),requestAnimationFrame(()=>{this.typeDropdownOutsideHandler=n=>{this.typeDropdownMenu&&!this.typeDropdownContainer.contains(n.target)&&this.closeTypeDropdown();},document.addEventListener("click",this.typeDropdownOutsideHandler,true);}),this.typeDropdownMenu.addEventListener("keydown",n=>{n.key==="Escape"&&(this.closeTypeDropdown(),this.typeDropdownBtn.focus());});}closeTypeDropdown(){this.typeDropdownMenu&&(this.typeDropdownMenu.remove(),this.typeDropdownMenu=null),this.typeDropdownBtn.setAttribute("aria-expanded","false"),this.typeDropdownOutsideHandler&&(document.removeEventListener("click",this.typeDropdownOutsideHandler,true),this.typeDropdownOutsideHandler=null);}selectTypeFilter(n){this.activeFilters.clear(),this.activeFilters.add(n),this.renderTypeDropdownTrigger(),this.closeTypeDropdown(),this.loadFeedbacks().catch(()=>{});}buildStatusSegmented(){return this.statusSegmented=new Ut({options:[{value:"all",label:this.t("panel.statusAll"),icon:is,color:this.colors.accent,bg:this.colors.accentLight},{value:"open",label:this.t("panel.statusOpen"),icon:To,color:this.colors.statusOpen,bg:this.colors.statusOpenBg},{value:"resolved",label:this.t("panel.statusResolved"),icon:Fr,color:this.colors.statusResolved,bg:this.colors.statusResolvedBg}],value:"all",onChange:()=>{this.loadFeedbacks().catch(()=>{});},ariaLabel:this.t("status.label"),datasetKey:"statusFilter",modifierPrefix:"sp-segmented__btn--"}),this.statusSegmented.element}buildScopeSegmented(){return this.scopeSegmented=new Ut({options:[{value:"this",label:this.t("scope.thisPage")},{value:"template",label:this.t("scope.thisType")},{value:"all",label:this.t("scope.all")}],value:this.initialScopeFilter,onChange:()=>{this.loadFeedbacks().catch(()=>{});},ariaLabel:this.t("scope.label"),datasetKey:"scopeFilter",modifierPrefix:"sp-segmented__btn--scope-",extraClass:"sp-segmented--scope"}),this.syncScopeAvailability(),this.scopeSegmented.element}syncScopeAvailability(){if(!this.scopeSegmented)return;let s=!!this.getScope().urlPattern;this.scopeSegmented.setOptionVisible("template",s),!s&&this.scopeSegmented.value==="template"&&this.scopeSegmented.select("this");}getFocusedFeedback(){let n=Qs(this.listContainer);if(n<0)return;let s=this.listContainer.querySelectorAll(".sp-card")[n];if(s)return this.feedbacks.find(a=>a.id===s.dataset.feedbackId)}scrollToFeedback(n){let s=CSS.escape(n),a=this.listContainer.querySelector(`[data-feedback-id="${s}"]`);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),a.classList.add("sp-anim-flash"),a.addEventListener("animationend",()=>{a.classList.remove("sp-anim-flash");},{once:true}));}async refresh(){this.isOpen&&await this.loadFeedbacks();}get isCurrentlyOpen(){return this.isOpen}destroy(){this.loadController?.abort(),this.searchTimeout&&clearTimeout(this.searchTimeout),this.listContainer.removeEventListener("click",this.onListClick),this.listContainer.removeEventListener("keydown",this.onListKeydown),this.listContainer.removeEventListener("mouseover",this.onListMouseover),this.listContainer.removeEventListener("mouseout",this.onListMouseout),document.removeEventListener("sp-marker-click",this.onMarkerClick),this.closeTypeDropdown(),this.sortControls.destroy(),this.bulk.destroy(),this.exportBtn.destroy(),this.shortcuts.destroy(),this.detail.destroy(),this.root.remove();}};});var ih=new Set(["role","name","aria-label","rel","href"]);function oh(o,n){let s=ih.has(o);s||=o.startsWith("data-")&&ht(o);let a=ht(n)&&n.length<100;return a||=n.startsWith("#")&&ht(n.slice(1)),s&&a}function ah(o){return ht(o)}function lh(o){return ht(o)}function ch(o){return  true}function Qo(o,n){if(o.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if(o.tagName.toLowerCase()==="html")return "html";let s={root:document.body,idName:ah,className:lh,tagName:ch,attr:oh,timeoutMs:1e3,seedMinLength:3,optimizedMinLength:2,maxNumberOfPathChecks:1/0},a=new Date,c={...s,...n},p=gh(c.root,s),u,B=0;for(let y of dh(o,c,p)){if(new Date().getTime()-a.getTime()>c.timeoutMs||B>=c.maxNumberOfPathChecks){let x=uh(o,p);if(!x)throw new Error(`Timeout: Can't find a unique selector after ${c.timeoutMs}ms`);return gt(x)}if(B++,As(y,p)){u=y;break}}if(!u)throw new Error("Selector was not found.");let m=[...Uo(u,o,c,p,a)];return m.sort(Zn),m.length>0?gt(m[0]):gt(u)}function*dh(o,n,s){let a=[],c=[],p=o,u=0;for(;p&&p!==s;){let B=ph(p,n);for(let m of B)m.level=u;if(a.push(B),p=p.parentElement,u++,c.push(...xo(a)),u>=n.seedMinLength){c.sort(Zn);for(let m of c)yield m;c=[];}}c.sort(Zn);for(let B of c)yield B;}function ht(o){if(/^[a-z\-]{3,}$/i.test(o)){let n=o.split(/-|[A-Z]/);for(let s of n)if(s.length<=2||/[^aeiou]{4,}/i.test(s))return  false;return  true}return  false}function ph(o,n){let s=[],a=o.getAttribute("id");a&&n.idName(a)&&s.push({name:"#"+CSS.escape(a),penalty:0});for(let u=0;u<o.classList.length;u++){let B=o.classList[u];n.className(B)&&s.push({name:"."+CSS.escape(B),penalty:1});}for(let u=0;u<o.attributes.length;u++){let B=o.attributes[u];n.attr(B.name,B.value)&&s.push({name:`[${CSS.escape(B.name)}="${CSS.escape(B.value)}"]`,penalty:2});}let c=o.tagName.toLowerCase();if(n.tagName(c)){s.push({name:c,penalty:5});let u=qn(o,c);u!==void 0&&s.push({name:Fo(c,u),penalty:10});}let p=qn(o);return p!==void 0&&s.push({name:hh(c,p),penalty:50}),s}function gt(o){let n=o[0],s=n.name;for(let a=1;a<o.length;a++){let c=o[a].level||0;n.level===c-1?s=`${o[a].name} > ${s}`:s=`${o[a].name} ${s}`,n=o[a];}return s}function yo(o){return o.map(n=>n.penalty).reduce((n,s)=>n+s,0)}function Zn(o,n){return yo(o)-yo(n)}function qn(o,n){let s=o.parentNode;if(!s)return;let a=s.firstChild;if(!a)return;let c=0;for(;a&&(a.nodeType===Node.ELEMENT_NODE&&(n===void 0||a.tagName.toLowerCase()===n)&&c++,a!==o);)a=a.nextSibling;return c}function uh(o,n){let s=0,a=o,c=[];for(;a&&a!==n;){let p=a.tagName.toLowerCase(),u=qn(a,p);if(u===void 0)return;c.push({name:Fo(p,u),penalty:NaN,level:s}),a=a.parentElement,s++;}if(As(c,n))return c}function hh(o,n){return o==="html"?"html":`${o}:nth-child(${n})`}function Fo(o,n){return o==="html"?"html":`${o}:nth-of-type(${n})`}function*xo(o,n=[]){if(o.length>0)for(let s of o[0])yield*xo(o.slice(1,o.length),n.concat(s));else yield n;}function gh(o,n){return o.nodeType===Node.DOCUMENT_NODE?o:o===n.root?o.ownerDocument:o}function As(o,n){let s=gt(o);switch(n.querySelectorAll(s).length){case 0:throw new Error(`Can't select any node with this selector: ${s}`);case 1:return  true;default:return  false}}function*Uo(o,n,s,a,c){if(o.length>2&&o.length>s.optimizedMinLength)for(let p=1;p<o.length-1;p++){if(new Date().getTime()-c.getTime()>s.timeoutMs)return;let B=[...o];B.splice(p,1),As(B,a)&&a.querySelector(gt(B))===n&&(yield B,yield*Uo(B,n,s,a,c));}}var Bh=["role","aria-label","type","name","href","src","data-testid","data-id"];function fh(o){let n=5381;for(let s=0;s<o.length;s++)n=(n<<5)+n+o.charCodeAt(s)|0;return (n>>>0).toString(36)}function es(o){let n=o.children.length,s=0,a=o.parentElement;if(a)for(let u of a.children){if(u===o)break;u.tagName===o.tagName&&s++;}let c=[];for(let u of Bh){let B=o.getAttribute(u);B&&c.push(`${u}=${B}`);}let p=c.length>0?fh(c.join(",")):"0";return `${n}:${s}:${p}`}function Eo(o,n){let s=n.split(":");if(s.length!==3)return 0;let[a,c,p]=s,u=Number(a),B=Number(c);if(Number.isNaN(u)||Number.isNaN(B))return 0;let m=es(o),[y,v,x]=m.split(":"),U=0,N=Math.abs(Number(y)-u);N===0?U+=.2:N<=2?U+=.1:N<=5&&(U+=.03);let M=Math.abs(Number(v)-B);return M===0?U+=.4:M===1?U+=.2:M<=3&&(U+=.08),x===p&&(U+=.4),U}function Oe(o,n){let s=n==="before"?"previousElementSibling":"nextElementSibling",a=o[s],c=3;for(;a&&c>0;){let p=a.textContent?.trim();if(p)return n==="before"?p.slice(-32):p.slice(0,32);a=a[s],c--;}return ""}function vr(o){let n=o.previousElementSibling?.textContent?.trim().slice(0,40)??"",s=o.nextElementSibling?.textContent?.trim().slice(0,40)??"";return [n,s].filter(Boolean).join(" | ")}function Ho(o){if(o.id){let a=o.id.includes("'")?`concat('${o.id.replace(/'/g,`',"'",'`)}')`:`'${o.id}'`;return `//${o.localName}[@id=${a}]`}let n=[],s=o;for(;s&&s!==document.body&&n.length<6;){let a=s.localName,c=s.parentElement;if(s.id){let u=s.id.includes("'")?`concat('${s.id.replace(/'/g,`',"'",'`)}')`:`'${s.id}'`;return n.unshift(`/${a}[@id=${u}]`),"/"+n.join("")}let p=1;if(c)for(let u of c.children){if(u===s)break;u.localName===a&&p++;}n.unshift(`/${a}[${p}]`),s=c;}return "/html/body"+n.join("")}var Bt="data-feedback-anchor";function ts(o){let n=Qo(o,{className:x=>!/^(css|sc|emotion|styled)-/.test(x)&&!/^[a-z]{1,3}[A-Za-z0-9]{4,8}$/.test(x),attr:x=>["data-testid","data-id","role","aria-label"].includes(x),idName:x=>!x.startsWith("radix-")&&!/^:r[0-9]+:$/.test(x),seedMinLength:3,optimizedMinLength:2}),s=Ho(o),c=(o.textContent?.trim()??"").slice(0,120),p=Oe(o,"before"),u=Oe(o,"after"),B=es(o),m=vr(o),v=o.closest(`[${Bt}]`)?.getAttribute(Bt)??null;return {cssSelector:n,xpath:s,textSnippet:c,textPrefix:p,textSuffix:u,fingerprint:B,neighborText:m,elementTag:o.tagName,elementId:o.id||void 0,anchorKey:v}}function ko(o,n){let s=o.getBoundingClientRect();return s.left<=n.x&&s.top<=n.y&&s.right>=n.x+n.width&&s.bottom>=n.y+n.height}function Io(o,n=document.documentElement){let s=o.x+o.width/2,a=o.y+o.height/2,c=document.elementFromPoint(s,a);if(!c||c===n)return document.body;let p=c;for(;p&&p!==document.body;){if(p.hasAttribute(Bt)&&ko(p,o))return p;p=p.parentElement;}for(p=c;p&&p!==document.body;){if(ko(p,o))return p;p=p.parentElement;}return document.body}function So(o,n){return n.width<=0||n.height<=0?{xPct:0,yPct:0,wPct:1,hPct:1}:{xPct:(o.x-n.x)/n.width,yPct:(o.y-n.y)/n.height,wPct:o.width/n.width,hPct:o.height/n.height}}HA();HA();kr();ce();var Qh={question:"type.question",change:"type.change",bug:"type.bug",other:"type.other"};function Fh(){let o=navigator.userAgentData;return o?o.platform==="macOS":navigator.platform?.includes("Mac")??/Macintosh|Mac OS X/i.test(navigator.userAgent)}var Ir=class{constructor(n,s){this.colors=n;this.t=s;this.root=b("div",{style:`
        position:fixed;
        z-index:${2147483647};
        width:300px;
        padding:16px;
        border-radius:16px;
        background:${this.colors.glassBg};
        backdrop-filter:blur(24px);
        -webkit-backdrop-filter:blur(24px);
        border:1px solid ${this.colors.glassBorder};
        box-shadow:0 8px 32px ${this.colors.shadow}, 0 2px 8px ${this.colors.shadow};
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        opacity:0;
        transform:translateY(8px) scale(0.98);
        transition:opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display:none;
        -webkit-font-smoothing:antialiased;
      `}),this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("data-siteping-ignore","true");let a=[{type:"question",icon:xr},{type:"change",icon:Ur},{type:"bug",icon:Er},{type:"other",icon:Hr}];this.typeRow=b("div",{style:"display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;"});for(let p of a){let u=document.createElement("button");u.style.cssText=`
        height:44px;
        border-radius:9999px;border:1px solid ${this.colors.border};
        background:${this.colors.glassBg};cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:5px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:13px;font-weight:500;color:${this.colors.textTertiary};
        transition:all 0.2s ease;
        padding:0 12px;
      `;let B=G(p.icon);B.setAttribute("style","width:13px;height:13px;flex-shrink:0;"),u.appendChild(B),u.appendChild(document.createElement("span")),u.dataset.type=p.type,u.setAttribute("aria-pressed","false"),u.addEventListener("click",()=>{this.submittingState||this.selectType(p.type,this.typeRow);}),u.addEventListener("mouseenter",()=>{if(!this.submittingState&&u.dataset.type!==this.selectedType){let m=$A(u.dataset.type??"",this.colors);u.style.background=m,u.style.borderColor=SA(u.dataset.type??"",this.colors)+"40";}}),u.addEventListener("mouseleave",()=>{this.submittingState||u.dataset.type!==this.selectedType&&(u.style.background=this.colors.glassBg,u.style.borderColor=this.colors.border);}),this.typeRow.appendChild(u);}this.textarea=document.createElement("textarea"),this.textarea.style.cssText=`
      width:100%;min-height:72px;max-height:152px;
      padding:10px 12px;border-radius:12px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBgHeavy};
      color:${this.colors.text};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;line-height:1.5;resize:vertical;
      outline:none;transition:all 0.2s ease;
      box-sizing:border-box;
    `,this.textarea.maxLength=5e3,this.hint=b("div",{style:`
        font-size:11px;color:${this.colors.textTertiary};
        text-align:right;margin-top:4px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        letter-spacing:0.01em;
      `}),this.textarea.addEventListener("focus",()=>{this.submittingState||(this.textarea.style.borderColor=this.colors.accent,this.textarea.style.boxShadow=`0 0 0 3px ${this.colors.accent}14`,this.textarea.style.background=this.colors.bg);}),this.textarea.addEventListener("blur",()=>{this.submittingState||(this.textarea.style.borderColor=this.colors.border,this.textarea.style.boxShadow="none",this.textarea.style.background=this.colors.glassBgHeavy);}),this.textarea.addEventListener("input",()=>{this.updateSubmitState();}),this.textarea.addEventListener("keydown",p=>{this.submittingState||(p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),this.submit()),p.key==="Escape"&&this.cancel());});let c=b("div",{style:"display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"});this.cancelBtn=document.createElement("button"),this.cancelBtn.style.cssText=`
      height:34px;padding:0 16px;border-radius:9999px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBg};
      color:${this.colors.textTertiary};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:500;cursor:pointer;
      transition:all 0.2s ease;
    `,this.cancelBtn.addEventListener("click",()=>this.cancel()),this.cancelBtn.addEventListener("mouseenter",()=>{this.submittingState||(this.cancelBtn.style.borderColor=this.colors.accent,this.cancelBtn.style.color=this.colors.accent);}),this.cancelBtn.addEventListener("mouseleave",()=>{this.submittingState||(this.cancelBtn.style.borderColor=this.colors.border,this.cancelBtn.style.color=this.colors.textTertiary);}),this.submitBtn=document.createElement("button"),this.submitBtn.style.cssText=`
      height:34px;padding:0 18px;border-radius:9999px;
      border:none;background:${this.colors.accentGradient};
      color:#fff;font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:600;cursor:pointer;
      opacity:0.35;pointer-events:none;
      transition:all 0.2s ease;
      box-shadow:0 2px 8px ${this.colors.accentGlow};
      display:inline-flex;align-items:center;justify-content:center;min-width:64px;
    `,this.submitLabel=document.createElement("span"),this.submitBtn.appendChild(this.submitLabel),this.submitBtn.addEventListener("click",()=>this.submit()),c.appendChild(this.cancelBtn),c.appendChild(this.submitBtn),this.root.appendChild(this.typeRow),this.root.appendChild(this.textarea),this.root.appendChild(this.hint),this.root.appendChild(c),document.body.appendChild(this.root),this.applyLabels();}colors;t;root;selectedType=null;textarea;submitBtn;cancelBtn;typeRow;submitLabel;hint;resolve=null;previouslyFocused=null;onKeydownTrap=null;onSubmit=null;submittingState=false;spinnerAnimation=null;refreshLabels(){this.applyLabels();}applyLabels(){this.root.setAttribute("aria-label",this.t("popup.ariaLabel"));let n=this.root.querySelectorAll("button[data-type]");for(let s of n){let a=s.dataset.type;if(!a)continue;let c=Qh[a];if(!c)continue;let p=s.querySelector("span");p&&F(p,this.t(c));}this.textarea.placeholder=this.t("popup.placeholder"),this.textarea.setAttribute("aria-label",this.t("popup.textareaAria")),F(this.hint,Fh()?this.t("popup.submitHintMac"):this.t("popup.submitHintOther")),F(this.cancelBtn,this.t("popup.cancel")),F(this.submitLabel,this.t("popup.submit"));}show(n,s){return new Promise(a=>{this.resolve=a,this.onSubmit=s??null,this.selectedType=null,this.textarea.value="",this.submittingState=false,this.updateSubmitState(),this.resetTypeButtons(),this.previouslyFocused=document.activeElement;let c=220,p=300,u=n.bottom+8,B=n.left;if(u+c>window.innerHeight){let y=n.top-c-8;y>=8?u=y:u=window.innerHeight-c-8;}B+p>window.innerWidth&&(B=n.right-p),B=Math.max(8,B),u=Math.max(8,u),this.root.style.top=`${u}px`,this.root.style.left=`${B}px`,this.root.style.display="block",this.onKeydownTrap=y=>{if(y.key==="Tab"){let v=Array.from(this.root.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));if(v.length===0)return;let x=v[0],U=v[v.length-1];if(!x||!U)return;y.shiftKey?(document.activeElement===x||!this.root.contains(document.activeElement))&&(y.preventDefault(),U.focus()):(document.activeElement===U||!this.root.contains(document.activeElement))&&(y.preventDefault(),x.focus());}},this.root.addEventListener("keydown",this.onKeydownTrap);let m=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.root.style.transition=m?"none":"",requestAnimationFrame(()=>{this.root.style.opacity="1",this.root.style.transform="translateY(0) scale(1)",this.textarea.focus();});})}selectType(n,s){this.selectedType=n;let a=s.querySelectorAll("button");for(let c of a){let p=c.dataset.type===n,u=SA(c.dataset.type??"",this.colors),B=$A(c.dataset.type??"",this.colors);c.style.background=p?B:this.colors.glassBg,c.style.borderColor=p?u+"60":this.colors.border,c.style.color=p?u:this.colors.textTertiary,c.style.fontWeight=p?"600":"500",c.setAttribute("aria-pressed",String(p));}this.updateSubmitState();}resetTypeButtons(){let n=this.root.querySelectorAll("button[data-type]");for(let s of n)s.setAttribute("aria-pressed","false"),s.disabled=false,s.style.background=this.colors.glassBg,s.style.borderColor=this.colors.border,s.style.color=this.colors.textTertiary,s.style.fontWeight="500",s.style.cursor="pointer";}updateSubmitState(){if(this.submittingState)return;let n=this.selectedType!==null&&this.textarea.value.trim().length>0;this.submitBtn.disabled=!n,this.submitBtn.style.opacity=n?"1":"0.35",this.submitBtn.style.pointerEvents=n?"auto":"none";}submit(){if(this.submittingState||!this.selectedType||!this.textarea.value.trim())return;let n={type:this.selectedType,message:this.textarea.value.trim()};if(!this.onSubmit){this.resolve?.(n),this.resolve=null,this.hideElement();return}this.enterSubmittingState();let s=this.onSubmit;s(n).then(()=>{this.resolve?.(n),this.resolve=null,this.hideElement();}).catch(()=>{this.exitSubmittingState();});}cancel(){this.submittingState||(this.resolve?.(null),this.resolve=null,this.hideElement());}enterSubmittingState(){this.submittingState=true,this.submitLabel.style.display="none",this.submitBtn.disabled=true,this.submitBtn.style.cursor="wait",this.submitBtn.style.opacity="0.85",this.submitBtn.setAttribute("aria-busy","true"),this.submitBtn.appendChild(this.buildSpinner()),this.cancelBtn.disabled=true,this.cancelBtn.style.opacity="0.5",this.cancelBtn.style.cursor="not-allowed",this.cancelBtn.style.pointerEvents="none",this.textarea.disabled=true,this.textarea.style.opacity="0.6";let n=this.typeRow.querySelectorAll("button");for(let s of n)s.disabled=true,s.style.cursor="not-allowed",s.style.opacity="0.6";}exitSubmittingState(){this.submittingState=false,this.spinnerAnimation?.cancel(),this.spinnerAnimation=null,this.submitBtn.querySelector('[data-role="sp-popup-spinner"]')?.remove(),this.submitLabel.style.display="",this.submitBtn.removeAttribute("aria-busy"),this.submitBtn.style.cursor="pointer",this.cancelBtn.disabled=false,this.cancelBtn.style.opacity="1",this.cancelBtn.style.cursor="pointer",this.cancelBtn.style.pointerEvents="auto",this.textarea.disabled=false,this.textarea.style.opacity="1";let s=this.typeRow.querySelectorAll("button");for(let a of s)a.disabled=false,a.style.cursor="pointer",a.style.opacity="1";this.updateSubmitState();}buildSpinner(){let n=document.createElement("div");return n.dataset.role="sp-popup-spinner",n.style.cssText=`
      width:14px;height:14px;
      border:2px solid rgba(255,255,255,0.35);
      border-top-color:#fff;
      border-radius:50%;
      box-sizing:border-box;
    `,!(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)&&typeof n.animate=="function"&&(this.spinnerAnimation=n.animate([{transform:"rotate(0deg)"},{transform:"rotate(360deg)"}],{duration:600,iterations:1/0,easing:"linear"})),n}hideElement(){this.onKeydownTrap&&(this.root.removeEventListener("keydown",this.onKeydownTrap),this.onKeydownTrap=null),this.submittingState&&this.exitSubmittingState(),this.onSubmit=null,this.root.style.opacity="0",this.root.style.transform="translateY(8px) scale(0.98)",this.previouslyFocused?.focus(),this.previouslyFocused=null,setTimeout(()=>{this.root.style.display="none";},250);}destroy(){this.submittingState&&this.exitSubmittingState(),this.resolve?.(null),this.resolve=null,this.onSubmit=null,this.onKeydownTrap&&(this.root.removeEventListener("keydown",this.onKeydownTrap),this.onKeydownTrap=null),this.root.remove();}};var ft,Vo=false;async function xh(){if(ft!==void 0)return ft;try{let o=await Promise.resolve().then(()=>sh(Go(),1));return ft=o.default??o,ft}catch(o){return ft=null,Vo||(Vo=true,console.warn("[siteping] html2canvas import failed unexpectedly. Capture is disabled for this session \u2014 feedbacks are still submitted, just without screenshots. Underlying error:",o)),null}}async function Xo(o,n){let s=await xh();if(!s)return null;let a=.85,c=1200;try{let p=await s(document.body,{x:window.scrollX+o.x,y:window.scrollY+o.y,width:o.width,height:o.height,scale:window.devicePixelRatio,useCORS:!0,allowTaint:!0,logging:!1,ignoreElements:x=>x.tagName==="SITEPING-WIDGET"||x.closest?.("siteping-widget")!==null||x.getAttribute?.("data-siteping-ignore")==="true"});if(p.width<=c)return p.toDataURL("image/jpeg",a);let u=c/p.width,B=c,m=Math.round(p.height*u),y=document.createElement("canvas");y.width=B,y.height=m;let v=y.getContext("2d");return v?(v.drawImage(p,0,0,B,m),y.toDataURL("image/jpeg",a)):null}catch(p){return console.warn("[siteping] Screenshot capture failed:",p),null}}var Sr=class{constructor(n,s,a,c=false){this.colors=n;this.bus=s;this.t=a;this.enableScreenshot=c;this.popup=new Ir(n,a),this.bus.on("annotation:start",()=>this.activate());}colors;bus;t;enableScreenshot;overlay=null;toolbar=null;drawingRect=null;startX=0;startY=0;isDrawing=false;isActive=false;popup;savedOverflow="";preActiveFocusElement=null;rafId=null;pendingMoveEvent=null;rejectPendingSubmission=null;refreshLabels(){this.popup.refreshLabels();}get submissionInFlight(){return this.rejectPendingSubmission!==null}async maybeCapture(n){return this.enableScreenshot?Xo(n):null}activate(){if(this.isActive)return;this.isActive=true,this.preActiveFocusElement=document.activeElement,this.savedOverflow=document.body.style.overflow,document.body.style.overflow="hidden",this.overlay=b("div",{style:`
        position:fixed;inset:0;
        z-index:${2147483646};
        background:rgba(15, 23, 42, 0.04);
        cursor:crosshair;
      `}),this.overlay.setAttribute("role","application"),this.overlay.setAttribute("aria-label",this.t("annotator.instruction")),this.overlay.setAttribute("data-siteping-ignore","true"),this.toolbar=b("div",{style:`
        position:fixed;top:0;left:0;right:0;
        z-index:${2147483647};
        height:52px;
        background:${this.colors.glassBg};
        backdrop-filter:blur(24px);
        -webkit-backdrop-filter:blur(24px);
        border-bottom:1px solid ${this.colors.glassBorder};
        display:flex;align-items:center;justify-content:center;gap:16px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:14px;color:${this.colors.text};
        box-shadow:0 4px 16px ${this.colors.shadow};
        -webkit-font-smoothing:antialiased;
      `}),this.toolbar.setAttribute("data-siteping-ignore","true");let n=b("span",{style:`
        width:8px;height:8px;border-radius:50%;
        background:${this.colors.accent};
        box-shadow:0 0 8px ${this.colors.accentGlow};
        animation:pulse 1.5s ease-in-out infinite;
      `}),s=document.createElement("style");s.textContent=["@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}","@media(prefers-reduced-motion:reduce){@keyframes pulse{from,to{opacity:1}}}"].join(""),this.toolbar.appendChild(s);let a=b("span",{style:"font-weight:500;letter-spacing:-0.01em;"});F(a,this.t("annotator.instruction"));let c=document.createElement("button");c.style.cssText=`
      height:34px;padding:0 18px;border-radius:9999px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBg};
      color:${this.colors.textTertiary};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:500;cursor:pointer;
      transition:all 0.2s ease;
    `,F(c,this.t("annotator.cancel")),c.addEventListener("click",()=>this.deactivate()),c.addEventListener("mouseenter",()=>{c.style.borderColor=this.colors.typeBug,c.style.color=this.colors.typeBug,c.style.background=this.colors.typeBugBg;}),c.addEventListener("mouseleave",()=>{c.style.borderColor=this.colors.border,c.style.color=this.colors.textTertiary,c.style.background=this.colors.glassBg;}),this.toolbar.appendChild(n),this.toolbar.appendChild(a),this.toolbar.appendChild(c),this.overlay.addEventListener("mousedown",this.onMouseDown),this.overlay.addEventListener("mousemove",this.onMouseMove),this.overlay.addEventListener("mouseup",this.onMouseUp),this.overlay.addEventListener("touchstart",this.onTouchStart,{passive:false}),this.overlay.addEventListener("touchmove",this.onTouchMove,{passive:false}),this.overlay.addEventListener("touchend",this.onTouchEnd),this.overlay.addEventListener("keydown",this.onOverlayKeyDown),this.overlay.setAttribute("tabindex","0"),document.addEventListener("keydown",this.onKeyDown),document.body.appendChild(this.overlay),document.body.appendChild(this.toolbar),this.overlay.focus({preventScroll:true});}deactivate(){if(!this.isActive)return;this.isActive=false,this.isDrawing=false;let n=this.preActiveFocusElement;this.preActiveFocusElement=null,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.pendingMoveEvent=null,document.body.style.overflow=this.savedOverflow,document.removeEventListener("keydown",this.onKeyDown),this.overlay?.remove(),this.toolbar?.remove(),this.drawingRect?.remove(),this.overlay=null,this.toolbar=null,this.drawingRect=null,n instanceof HTMLElement&&n.isConnected&&n.focus({preventScroll:true}),this.bus.emit("annotation:end");}onKeyDown=n=>{n.key==="Escape"&&this.deactivate();};onOverlayKeyDown=async n=>{if(n.key!=="Enter"||(n.preventDefault(),this.submissionInFlight))return;let s=this.preActiveFocusElement;if(!s||!(s instanceof HTMLElement))return;let a=s.getBoundingClientRect();if(a.width<=0||a.height<=0)return;let c=new DOMRect(a.x,a.y,a.width,a.height),u={anchor:ts(s),rect:{xPct:0,yPct:0,wPct:1,hPct:1},scrollX:window.scrollX,scrollY:window.scrollY,viewportW:window.innerWidth,viewportH:window.innerHeight,devicePixelRatio:window.devicePixelRatio},B={};await this.popup.show(c,y=>this.runSubmission(u,y,c,B))&&this.deactivate();};onMouseDown=n=>{this.startDrawing(n.clientX,n.clientY);};onTouchStart=n=>{n.preventDefault();let s=n.touches[0];s&&this.startDrawing(s.clientX,s.clientY);};startDrawing(n,s){this.submissionInFlight||(this.isDrawing=true,this.startX=n,this.startY=s,this.drawingRect?.remove(),this.drawingRect=b("div",{style:`
        position:fixed;
        border:2px solid ${this.colors.accent};
        background:${this.colors.accent}12;
        pointer-events:none;
        border-radius:8px;
        box-shadow:0 0 16px ${this.colors.accentGlow};
        transition:box-shadow 0.15s ease;
      `}),this.drawingRect.setAttribute("data-siteping-ignore","true"),this.overlay?.appendChild(this.drawingRect));}onMouseMove=n=>{this.scheduleRectUpdate(n);};onTouchMove=n=>{n.preventDefault(),n.touches[0]&&this.scheduleRectUpdate(n.touches[0]);};scheduleRectUpdate(n){!this.isDrawing||!this.drawingRect||(this.pendingMoveEvent=n,this.rafId===null&&(this.rafId=requestAnimationFrame(()=>{this.rafId=null;let s=this.pendingMoveEvent;if(!s||!this.drawingRect)return;let a=Math.min(s.clientX,this.startX),c=Math.min(s.clientY,this.startY),p=Math.abs(s.clientX-this.startX),u=Math.abs(s.clientY-this.startY);this.drawingRect.style.left=`${a}px`,this.drawingRect.style.top=`${c}px`,this.drawingRect.style.width=`${p}px`,this.drawingRect.style.height=`${u}px`;})));}onTouchEnd=async n=>{let s=n.changedTouches[0];s&&await this.finishDrawing(s.clientX,s.clientY);};onMouseUp=async n=>{await this.finishDrawing(n.clientX,n.clientY);};finishDrawing=async(n,s)=>{if(!this.isDrawing||!this.drawingRect)return;this.isDrawing=false;let a=Math.min(n,this.startX),c=Math.min(s,this.startY),p=Math.abs(n-this.startX),u=Math.abs(s-this.startY);if(p<10||u<10){this.drawingRect.remove(),this.drawingRect=null;return}let B=new DOMRect(a,c,p,u),m=this.buildAnnotation(B),y={},v=await this.popup.show(B,x=>this.runSubmission(m,x,B,y));this.drawingRect?.remove(),this.drawingRect=null,v&&this.deactivate();};async runSubmission(n,s,a,c){c.value===void 0&&(c.value=await this.maybeCapture(a));let p=c.value;await new Promise((u,B)=>{let m=()=>{y(),v(),x(),this.rejectPendingSubmission=null;},y=this.bus.on("feedback:sent",()=>{m(),u();}),v=this.bus.on("feedback:error",U=>{m(),B(U);}),x=this.bus.on("submission:cancelled",()=>{m(),B(new Error("Feedback submission cancelled"));});this.rejectPendingSubmission=U=>{m(),B(U);},this.bus.emit("annotation:complete",{annotation:n,type:s.type,message:s.message,screenshotDataUrl:p});});}buildAnnotation(n){this.overlay&&(this.overlay.style.pointerEvents="none");let s=Io(n);this.overlay&&(this.overlay.style.pointerEvents="auto");let a=ts(s),c=s.getBoundingClientRect(),p=So(n,c);return {anchor:a,rect:p,scrollX:window.scrollX,scrollY:window.scrollY,viewportW:window.innerWidth,viewportH:window.innerHeight,devicePixelRatio:window.devicePixelRatio}}destroy(){this.deactivate(),this.rejectPendingSubmission?.(new Error("Annotator destroyed during submission")),this.popup.destroy();}};bt();async function Ct(o,n){let s=await o.text().catch(()=>"Unknown error"),a=s?`${o.status} ${s}`:`${o.status}`,c=`${n}: ${a}`;return o.status===401||o.status===403?new mt(c):o.status>=400&&o.status<500?new wt(c):new pe(c,"SERVER",false)}function vt(o,n){if(o instanceof Ne)return o;let s=o instanceof Error?o.message:String(o);return new Ne(`${n}: ${s}`)}var Uh=3,Eh=1e4,Tr="siteping_retry_queue",Hh=20;async function yt(o,n,s=Uh){for(let a=0;a<=s;a++){let c=new AbortController,p=setTimeout(()=>c.abort(),Eh);try{let m=await fetch(o,{...n,signal:c.signal});if(clearTimeout(p),m.ok||m.status>=400&&m.status<500||a===s)return m}catch(m){if(clearTimeout(p),a===s)throw m}let u=1e3*2**a,B=Math.random()*1e3-500;await new Promise(m=>setTimeout(m,u+B));}throw new Error("Max retries exceeded")}var kh="siteping_retry_queue";async function Zo(o){return typeof navigator<"u"&&navigator.locks?navigator.locks.request(kh,()=>o()):o()}function qo(){let o=localStorage.getItem(Tr);if(!o)return [];let n=JSON.parse(o);return Array.isArray(n)?n:[]}function Ih(o,n){Zo(()=>{try{let s=qo();s.length>=Hh&&s.shift(),s.push({endpoint:o,payload:n}),localStorage.setItem(Tr,JSON.stringify(s));}catch{}});}function $o(o){return o.trim()}function zo(o){return o.trim().toLowerCase()}async function Aa(o,n){await Zo(async()=>{try{let s=qo();if(s.length===0)return;let a=[],c=[],p=0;for(let m of s){if(m.endpoint!==o){c.push(m);continue}!n||$o(m.payload.authorName)===$o(n.name)&&zo(m.payload.authorEmail)===zo(n.email)?a.push(m):p+=1;}if(a.length===0&&p===0)return;p>0;let u=[];for(let m of a)try{(await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m.payload)})).ok||u.push(m);}catch{u.push(m);}let B=c.concat(u);B.length>0?localStorage.setItem(Tr,JSON.stringify(B)):localStorage.removeItem(Tr);}catch{}});}async function ps(o){return await o.json()}var Kr=class{constructor(n,s){this.endpoint=n;this.projectName=s;}endpoint;projectName;async sendFeedback(n){try{let s;try{s=await yt(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});}catch(a){throw vt(a,"Failed to send feedback")}if(!s.ok)throw await Ct(s,"Failed to send feedback");return ps(s)}catch(s){throw Ih(this.endpoint,n),s}}async getFeedbacks(n,s){let a=new URLSearchParams({projectName:n});s?.page&&a.set("page",String(s.page)),s?.limit&&a.set("limit",String(s.limit)),s?.type&&a.set("type",s.type),s?.status&&a.set("status",s.status),s?.search&&a.set("search",s.search),s?.url&&a.set("url",s.url),s?.urlPattern&&a.set("urlPattern",s.urlPattern);let c;try{c=await yt(`${this.endpoint}?${a.toString()}`,{method:"GET",cache:"no-store"});}catch(p){throw vt(p,"Failed to fetch feedbacks")}if(!c.ok)throw await Ct(c,"Failed to fetch feedbacks");return ps(c)}async resolveFeedback(n,s){let a;try{a=await yt(this.endpoint,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n,projectName:this.projectName,status:s?"resolved":"open"})});}catch(c){throw vt(c,"Failed to update feedback")}if(!a.ok)throw await Ct(a,"Failed to update feedback");return ps(a)}async deleteFeedback(n){let s;try{s=await yt(this.endpoint,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n,projectName:this.projectName})});}catch(a){throw vt(a,"Failed to delete feedback")}if(!s.ok)throw await Ct(s,"Failed to delete feedback")}async deleteAllFeedbacks(n){let s;try{s=await yt(this.endpoint,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectName:n,deleteAll:!0})});}catch(a){throw vt(a,"Failed to delete all feedbacks")}if(!s.ok)throw await Ct(s,"Failed to delete all feedbacks")}};var Sh=["log","info","warn","error"];function Lh(o){if(o===null)return "null";if(o===void 0)return "undefined";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean"||typeof o=="bigint")return String(o);if(o instanceof Error)return `${o.name}: ${o.message}${o.stack?`
${o.stack}`:""}`;try{let n=new WeakSet;return JSON.stringify(o,(s,a)=>{if(typeof a=="function")return "[Function]";if(typeof a=="symbol")return a.toString();if(typeof a=="object"&&a!==null){if(n.has(a))return "[Circular]";n.add(a);}return a})}catch{try{return String(o)}catch{return "[Unserializable]"}}}function Th(o){let n="";for(let s=0;s<o.length&&(s>0&&(n+=" "),n+=Lh(o[s]),!(n.length>=500));s++);return n.length>500&&(n=`${n.slice(0,499)}\u2026`),n}var Dr=class{maxEntries;entries=[];originals=new Map;disposed=false;constructor(n=50){if(this.maxEntries=Math.min(Math.max(Math.floor(n),0),1e3),!(typeof console>"u"))for(let s of Sh){let a=console[s];if(typeof a!="function")continue;this.originals.set(s,a);let c=this,p=function(...u){try{c.push(s,u);}catch{}a.apply(this??console,u);};try{Object.defineProperty(p,"name",{value:s});}catch{}console[s]=p;}}push(n,s){this.maxEntries!==0&&(this.entries.length>=this.maxEntries&&this.entries.shift(),this.entries.push({level:n,timestamp:new Date().toISOString(),message:Th(s)}));}getEntries(){return this.entries.slice()}dispose(){if(!this.disposed&&(this.disposed=true,!(typeof console>"u"))){for(let[n,s]of this.originals)try{console[n]=s;}catch{}this.originals.clear();}}};function ea(o){return o.length<=2e3?o:`${o.slice(0,1999)}\u2026`}function ta(o){if(typeof o=="string")return o;if(o instanceof URL)return o.href;if(typeof o=="object"&&o!==null&&"url"in o){let n=o.url;if(typeof n=="string")return n}try{return String(o)}catch{return "(unknown)"}}var Mr=class{maxEntries;entries=[];originalFetch=null;originalXhrOpen=null;originalXhrSend=null;disposed=false;constructor(n=20){this.maxEntries=Math.min(Math.max(Math.floor(n),0),500),this.installFetch(),this.installXhr();}push(n){this.maxEntries!==0&&(this.entries.length>=this.maxEntries&&this.entries.shift(),this.entries.push(n));}installFetch(){if(typeof globalThis.fetch!="function")return;let n=globalThis.fetch;this.originalFetch=n;let s=async(a,c)=>{let p=new Date,u=typeof performance<"u"?performance.now():Date.now(),B=ea(ta(a)),m=(c?.method??(a instanceof Request?a.method:"GET")).toUpperCase();try{let y=await n(a,c);if(!y.ok){let v=typeof performance<"u"?performance.now():Date.now();this.push({url:B,method:m,status:y.status,durationMs:Math.round(v-u),timestamp:p.toISOString()});}return y}catch(y){let v=typeof performance<"u"?performance.now():Date.now();throw this.push({url:B,method:m,status:0,durationMs:Math.round(v-u),timestamp:p.toISOString()}),y}};globalThis.fetch=s;}installXhr(){if(typeof XMLHttpRequest>"u")return;let n=XMLHttpRequest.prototype,s=n.open,a=n.send;this.originalXhrOpen=s,this.originalXhrSend=a;let c=this,p=new WeakMap;n.open=function(u,B,...m){try{p.set(this,{method:u.toUpperCase(),url:ea(ta(B)),startedAt:new Date,t0:typeof performance<"u"?performance.now():Date.now()});}catch{}return s.call(this,u,B,...m)},n.send=function(u){let B=p.get(this);if(B){let m=()=>{try{let y=typeof performance<"u"?performance.now():Date.now(),v=this.status;(v===0||v>=400)&&c.push({url:B.url,method:B.method,status:v,durationMs:Math.round(y-B.t0),timestamp:B.startedAt.toISOString()});}catch{}};try{this.addEventListener("loadend",m,{once:!0});}catch{try{this.addEventListener("loadend",m);}catch{}}}return a.call(this,u??null)};}getEntries(){return this.entries.slice()}dispose(){if(!this.disposed){if(this.disposed=true,this.originalFetch&&typeof globalThis.fetch=="function")try{globalThis.fetch=this.originalFetch;}catch{}if(typeof XMLHttpRequest<"u")try{this.originalXhrOpen&&(XMLHttpRequest.prototype.open=this.originalXhrOpen),this.originalXhrSend&&(XMLHttpRequest.prototype.send=this.originalXhrSend);}catch{}}}};var Qt=class{listeners=new Map;on(n,s){let a=this.listeners.get(n);return a||(a=new Set,this.listeners.set(n,a)),a.add(s),()=>{a?.delete(s);}}off(n,s){this.listeners.get(n)?.delete(s);}emit(n,...s){let a=this.listeners.get(n);if(a)for(let c of a)try{c(...s);}catch(p){console.error(`[siteping] Error in event listener for "${String(n)}":`,p);}}removeAll(){this.listeners.clear();}};HA();kr();var Kh=54,Dh={chat:"fab.messages",annotate:"fab.annotate","toggle-annotations":"fab.annotations"},Rr=class{constructor(n,s,a,c){this.bus=a;this.t=c;let p=s.position??"bottom-right",u=p==="bottom-right";this.items=[{id:"chat",icon:Mo},{id:"annotate",icon:Ro}],s.showAnnotationsToggle!==false&&this.items.push({id:"toggle-annotations",icon:ns,iconAlt:ss}),this.fab=document.createElement("button"),this.fab.className=`sp-fab sp-fab--${p} sp-anim-fab-in`,this.fab.style.position="fixed",this.fab.appendChild(G(rs)),this.fab.setAttribute("aria-expanded","false"),this.fab.addEventListener("click",()=>this.toggle()),this.radialContainer=document.createElement("div"),this.radialContainer.className=`sp-radial sp-radial--${p}`,this.radialContainer.setAttribute("role","menu");for(let y=0;y<this.items.length;y++){let v=this.items[y];if(!v)continue;let x=document.createElement("button");x.className="sp-radial-item",x.style.setProperty("--sp-i",String(y)),x.appendChild(G(v.icon)),x.setAttribute("role","menuitem"),x.dataset.itemId=v.id,x.addEventListener("click",N=>{N.stopPropagation(),this.handleItemClick(v.id);});let U=document.createElement("span");U.className="sp-radial-label",U.style.cssText=u?"position:absolute; right:54px; top:50%; transform:translateY(-50%); white-space:nowrap;":"position:absolute; left:54px; top:50%; transform:translateY(-50%); white-space:nowrap;",x.appendChild(U),this.radialContainer.appendChild(x);}this.root=document.createElement("div"),this.root.appendChild(this.radialContainer),this.root.appendChild(this.fab),n.appendChild(this.root),this.applyLabels();let B=n.host;this.onDocumentClick=y=>{this.isOpen&&!y.composedPath().includes(B)&&this.close();},document.addEventListener("click",this.onDocumentClick);let m=y=>{y.key==="Escape"&&this.isOpen&&(y.stopPropagation(),this.close());};this.fab.addEventListener("keydown",m),this.radialContainer.addEventListener("keydown",m),this.radialContainer.addEventListener("keydown",y=>{let v=Array.from(this.radialContainer.querySelectorAll(".sp-radial-item"));if(v.length===0||!this.isOpen)return;let x=n.activeElement??document.activeElement,U=v.indexOf(x);switch(y.key){case "ArrowUp":{y.preventDefault();let N=U<=0?v.length-1:U-1;v[N]?.focus();break}case "ArrowDown":{y.preventDefault();let N=U>=v.length-1?0:U+1;v[N]?.focus();break}case "Home":{y.preventDefault(),v[0]?.focus();break}case "End":{y.preventDefault(),v[v.length-1]?.focus();break}}});}bus;t;root;fab;radialContainer;badgeEl=null;isOpen=false;annotationsVisible=true;items;onDocumentClick;refreshLabels(){this.applyLabels();}applyLabels(){this.fab.setAttribute("aria-label",this.t("fab.aria"));let n=this.radialContainer.querySelectorAll(".sp-radial-item");for(let s of n){let a=s.dataset.itemId;if(!a)continue;let c=Dh[a];if(!c)continue;let p=this.t(c);s.setAttribute("aria-label",p);let u=s.querySelector(".sp-radial-label");u&&F(u,p);}}updateBadge(n){if(n<=0){this.badgeEl?.remove(),this.badgeEl=null;return}this.badgeEl||(this.badgeEl=document.createElement("span"),this.badgeEl.className="sp-fab-badge",this.badgeEl.setAttribute("role","status"),this.badgeEl.setAttribute("aria-live","polite"),this.fab.appendChild(this.badgeEl));let s=n>99?"99+":String(n);F(this.badgeEl,s),this.badgeEl.setAttribute("aria-label",this.t("fab.badge").replace("{count}",String(n)));}toggle(){this.isOpen?this.close():this.open();}open(){this.isOpen=true,this.setFabIcon(Qr),this.fab.setAttribute("aria-expanded","true"),this.radialContainer.querySelectorAll(".sp-radial-item").forEach((s,a)=>{let c=-(16+Kh*(a+1));s.style.transform=`translate(0px, ${c}px) scale(1)`,s.classList.add("sp-radial-item--open");}),requestAnimationFrame(()=>{this.radialContainer.querySelector(".sp-radial-item")?.focus();});}close(){this.isOpen=false,this.setFabIcon(rs),this.fab.setAttribute("aria-expanded","false"),this.radialContainer.querySelectorAll(".sp-radial-item").forEach(s=>{s.style.transform="translate(0, 0) scale(0.8)",s.classList.remove("sp-radial-item--open");}),this.fab.focus();}setFabIcon(n){let s=this.badgeEl;this.fab.replaceChildren(G(n)),s&&this.fab.appendChild(s);}handleItemClick(n){switch(this.close(),n){case "chat":this.bus.emit("panel:toggle",true);break;case "annotate":{let s=this.bus.on("annotation:end",()=>{s(),this.fab.focus();});this.bus.emit("annotation:start");break}case "toggle-annotations":{this.annotationsVisible=!this.annotationsVisible,this.bus.emit("annotations:toggle",this.annotationsVisible);let a=this.radialContainer.querySelector('[data-item-id="toggle-annotations"]')?.querySelector("svg");if(a){let c=G(this.annotationsVisible?ns:ss);a.replaceWith(c);}break}}}destroy(){document.removeEventListener("click",this.onDocumentClick),this.root.remove();}};Ft();bt();var ba="siteping_identity";function Vh(o){if(!Lr(o,"name")||!Lr(o,"email"))return  false;let n=o.name,s=o.email;return typeof n=="string"&&typeof s=="string"&&n.length>0&&s.length>0}function us(){try{let o=localStorage.getItem(ba);if(!o)return null;let n=JSON.parse(o);return Vh(n)?n:null}catch{return null}}function Ca(o){try{localStorage.setItem(ba,JSON.stringify(o));}catch{}}function Xh(o,n){if(o===n)return 0;if(o.length===0)return n.length;if(n.length===0)return o.length;if(o.length>n.length){let u=o;o=n,n=u;}let s=o.length,a=n.length,c=new Array(s+1);for(let u=0;u<=s;u++)c[u]=u;let p=new Array(s+1);for(let u=1;u<=a;u++){p[0]=u;for(let m=1;m<=s;m++){let y=c[m-1]??0;p[m]=o[m-1]===n[u-1]?y:1+Math.min(y,c[m]??0,p[m-1]??0);}let B=c;c=p,p=B;}return c[s]??0}function _e(o,n){if(o===n)return 1;let s=Math.max(o.length,n.length);return s===0?1:1-Xh(o,n)/s}function hs(o,n,s=.6){if(!n||!o)return 0;if(o.includes(n))return 1;let a=n.length;if(a>o.length){let B=_e(o,n);return B>=s?B:0}let c=0,p=o.length>500?o.slice(0,500):o,u=p.length-a;for(let B=0;B<=u;B++){let m=p.slice(B,B+a),y=_e(m,n);if(y>c&&(c=y),c>=.95)break}return c>=s?c:0}var Yh=300,Jh=.3;function Nr(o,n){if(!n.textSnippet)return  true;let s=(o.textContent?.trim()??"").slice(0,500);return hs(s,n.textSnippet,.5)>Jh}function Wh(o){if(o.anchorKey){let n=o.anchorKey.replace(/\\/g,"\\\\").replace(/"/g,'\\"');try{let s=document.querySelector(`[${Bt}="${n}"]`);if(s&&Nr(s,o))return {element:s,confidence:1,strategy:"anchorKey"}}catch{}}if(o.elementId){let n=document.getElementById(o.elementId);if(n&&n.tagName===o.elementTag&&Nr(n,o))return {element:n,confidence:1,strategy:"id"}}try{let n=document.querySelector(o.cssSelector);if(n&&n.tagName===o.elementTag&&Nr(n,o))return {element:n,confidence:.95,strategy:"css"}}catch{}try{let s=document.evaluate(o.xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s instanceof Element&&s.tagName===o.elementTag&&Nr(s,o))return {element:s,confidence:.9,strategy:"xpath"}}catch{}return jh(o)}function jh(o){let n=o.elementTag.toLowerCase(),s=document.querySelectorAll(n);if(s.length===0)return null;let a=null,c=0,p=Math.min(s.length,Yh);for(let u=0;u<p;u++){let B=s[u];if(!B)continue;let m=$h(B,o);if(m>c&&(c=m,a=B,c>=.85))break}return !a||c<.4?null:{element:a,confidence:Math.min(c,.85),strategy:"scan"}}function $h(o,n){let s=0,a=0,c=(o.textContent?.trim()??"").slice(0,500);if(n.textSnippet&&(a+=40,s+=hs(c,n.textSnippet,.5)*40),n.fingerprint&&(a+=20,s+=Eo(o,n.fingerprint)*20),n.textPrefix||n.textSuffix){a+=20;let p=0,u=0;if(n.textPrefix){let B=Oe(o,"before");p+=B?_e(B,n.textPrefix):0,u++;}if(n.textSuffix){let B=Oe(o,"after");p+=B?_e(B,n.textSuffix):0,u++;}u>0&&(s+=p/u*20);}if(n.neighborText){a+=20;let p=vr(o);s+=p?_e(p,n.neighborText)*20:0;}return a>0?s/a:0}function Pr(o,n){let s=Wh(o);if(!s)return null;let a=s.element.getBoundingClientRect(),c=new DOMRect(a.x+n.xPct*a.width,a.y+n.yPct*a.height,n.wPct*a.width,n.hPct*a.height);return {element:s.element,rect:c,confidence:s.confidence,strategy:s.strategy}}HA();Ft();ce();function gs(o){return {cssSelector:o.cssSelector,xpath:o.xpath,textSnippet:o.textSnippet,elementTag:o.elementTag,elementId:o.elementId??void 0,textPrefix:o.textPrefix,textSuffix:o.textSuffix,fingerprint:o.fingerprint,neighborText:o.neighborText,anchorKey:o.anchorKey??null}}function _r(o){return {xPct:o.xPct,yPct:o.yPct,wPct:o.wPct,hPct:o.hPct}}var va=13;function ya(o){return {top:o.top+window.scrollY-va,left:o.right+window.scrollX-va}}function xt(o,n){let s=o.entries[n],a=o.elementIndices[n];if(!(!s||a===void 0))return s.elements[a]}var Qa=300,Fa=200,zh=.7,Zh=28,xa=32,Gr=class{constructor(n,s,a,c,p=null){this.colors=n;this.tooltip=s;this.bus=a;this.t=c;this.liveRegion=p;this.container=b("div",{style:`position:absolute;top:0;left:0;pointer-events:none;z-index:${2147483646};`}),this.container.id="siteping-markers",document.body.appendChild(this.container),this.bus.on("annotations:toggle",u=>{this.container.style.display=u?"block":"none";}),this.resizeHandler=()=>this.scheduleReposition(),window.addEventListener("resize",this.resizeHandler,{passive:true}),this.scrollHandler=()=>this.scheduleReposition(),window.addEventListener("scroll",this.scrollHandler,{passive:true,capture:true}),this.mutationObserver=new MutationObserver(u=>{let B=false;for(let m of u)if(!(this.container.contains(m.target)||this.tooltip.contains(m.target))){B=true;break}B&&this.scheduleReposition();}),this.mutationObserver.observe(document.body,{childList:true,subtree:true,attributes:false,characterData:false}),this.onDocumentClickForClusters=u=>{this.container.contains(u.target)||this.collapseAllClusters();},document.addEventListener("click",this.onDocumentClickForClusters);}colors;tooltip;bus;t;liveRegion;container;entries=[];highlightElements=[];pinnedFeedback=null;onDocumentClick=null;repositionTimer=null;mutationObserver=null;scrollHandler=null;resizeHandler=null;anchorCache=new Map;clusters=[];onDocumentClickForClusters=null;lastOpenCount=-1;get count(){return this.entries.length}get openCount(){let n=0;for(let s of this.entries)s.feedback.status==="open"&&n++;return n}scheduleReposition(){this.repositionTimer||("requestIdleCallback"in window?this.repositionTimer=window.requestIdleCallback(()=>{this.repositionTimer=null,this.repositionAll();},{timeout:Fa+100}):this.repositionTimer=+setTimeout(()=>{this.repositionTimer=null,this.repositionAll();},Fa));}repositionAll(){let n=new Set;for(let s of this.entries)for(let a=0;a<s.feedback.annotations.length;a++){let c=s.elements[a];if(!c)continue;let p=s.feedback.annotations[a];if(!p)continue;let u=`${s.feedback.id}:${a}`;n.add(u);let m=this.anchorCache.get(u)?.deref(),y;if(m?.isConnected){let x=m.getBoundingClientRect(),U=_r(p);y={element:m,rect:new DOMRect(x.left+U.xPct*x.width,x.top+U.yPct*x.height,U.wPct*x.width,U.hPct*x.height),confidence:1,strategy:"css"};}else y=Pr(gs(p),_r(p)),y?.element&&this.anchorCache.set(u,new WeakRef(y.element));if(!y){c.style.display="none";continue}let v=ya(y.rect);s.baseTop=v.top,s.baseLeft=v.left,c.style.display="flex",this.applyConfidenceStyle(c,y.confidence,s.feedback);}for(let s of this.anchorCache.keys())n.has(s)||this.anchorCache.delete(s);this.applyClusterPositions(),this.pinnedFeedback&&this.showHighlight(this.pinnedFeedback);}applyClusterPositions(){for(let n of this.clusters)n.expanded?this.applyFanPositions(n):this.applyStackPositions(n);}emitMarkersChanged(){let n=this.openCount;n!==this.lastOpenCount&&(this.lastOpenCount=n,this.bus.emit("markers:changed",n));}render(n){this.clear(),n.forEach((s,a)=>{let c=this.buildEntry(s,a+1);this.entries.push(c);}),this.buildClusters(),this.liveRegion&&this.entries.length>0&&(this.liveRegion.textContent=this.t("marker.count").replace("{count}",String(this.entries.length))),this.emitMarkersChanged();}addFeedback(n,s){let a=this.buildEntry(n,s);for(let c of a.elements)c.style.animation="sp-marker-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both";this.entries.push(a),this.buildClusters(),this.emitMarkersChanged();}buildEntry(n,s){let a={feedback:n,elements:[],baseTop:0,baseLeft:0};for(let c of n.annotations){let p=Pr(gs(c),_r(c));if(!p)continue;let u=ya(p.rect);a.baseTop=u.top,a.baseLeft=u.left;let B=this.createMarker(s,n,u);this.applyConfidenceStyle(B,p.confidence,n),this.container.appendChild(B),a.elements.push(B);}return a}buildClusters(){for(let a of this.container.querySelectorAll(".sp-cluster-badge"))a.remove();let n=[];for(let a of this.entries)for(let c=0;c<a.elements.length;c++)n.push({entry:a,elIdx:c});let s=new Set;this.clusters=[];for(let a=0;a<n.length;a++){if(s.has(a))continue;let c=n[a];if(!c)continue;let p={entries:[c.entry],elementIndices:[c.elIdx],expanded:false};s.add(a);for(let u=a+1;u<n.length;u++){if(s.has(u))continue;let B=c.entry,m=n[u];if(!m)continue;let y=m.entry;Math.sqrt((B.baseLeft-y.baseLeft)**2+(B.baseTop-y.baseTop)**2)<Zh&&(p.entries.push(y),p.elementIndices.push(m.elIdx),s.add(u));}this.clusters.push(p);}for(let a of this.clusters)a.entries.length<=1||(this.applyStackPositions(a),this.addClusterBadge(a));}applyStackPositions(n){let s=n.entries[0];if(!s)return;let{baseTop:a,baseLeft:c}=s,p=n.entries.length<=1;for(let u=0;u<n.entries.length;u++){let B=xt(n,u);B&&(B.style.top=`${a+(p?0:u*3)}px`,B.style.left=`${c+(p?0:u*3)}px`,B.style.zIndex=String(u+1));}}applyFanPositions(n){let s=n.entries[0];if(!s)return;let{baseTop:a,baseLeft:c}=s,p=n.entries.length,u=(p-1)*xa,B=c-u/2;for(let m=0;m<p;m++){let y=xt(n,m);y&&(y.style.top=`${a}px`,y.style.left=`${B+m*xa}px`,y.style.zIndex=String(10+m));}}addClusterBadge(n){let s=xt(n,n.entries.length-1);if(!s)return;let a=b("div",{class:"sp-cluster-badge",style:`
        position:absolute;top:-6px;right:-6px;
        min-width:16px;height:16px;padding:0 4px;
        border-radius:9999px;
        background:${this.colors.accent};color:#fff;
        font-size:10px;font-weight:700;
        display:flex;align-items:center;justify-content:center;
        border:1.5px solid #fff;
        pointer-events:none;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        line-height:1;
      `});F(a,String(n.entries.length)),s.appendChild(a);}setBadgesVisible(n,s){for(let a=0;a<n.entries.length;a++){let c=xt(n,a)?.querySelector(".sp-cluster-badge");c&&(c.style.display=s?"flex":"none");}}findCluster(n){for(let s of this.clusters)if(!(s.entries.length<=1)){for(let a=0;a<s.entries.length;a++)if(xt(s,a)===n)return s}return null}handleClusterClick(n,s){let a=this.findCluster(n);return a?a.expanded?false:(s.stopPropagation(),this.collapseAllClusters(),a.expanded=true,this.applyFanPositions(a),this.setBadgesVisible(a,false),true):false}collapseCluster(n){n.expanded&&(n.expanded=false,this.applyStackPositions(n),this.setBadgesVisible(n,true));}collapseAllClusters(){for(let n of this.clusters)this.collapseCluster(n);}applyConfidenceStyle(n,s,a){let c=a.status==="resolved";s<zh&&!c?(n.style.borderStyle="dashed",n.style.opacity="0.7",n.title=this.t("marker.approximate").replace("{confidence}",String(Math.round(s*100)))):(n.style.borderStyle="solid",n.style.opacity="1",n.title="");}createMarker(n,s,a){let c=SA(s.type,this.colors),p=s.status==="resolved",u=b("div",{style:`
        position:absolute;
        top:${a.top}px;
        left:${a.left}px;
        width:26px;height:26px;
        border-radius:50%;
        background:${p?"rgba(241,245,249,0.9)":"rgba(255,255,255,0.92)"};
        border:2px solid ${p?"#cbd5e1":c};
        display:flex;align-items:center;justify-content:center;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:11px;font-weight:700;
        color:${p?"#94a3b8":c};
        cursor:pointer;pointer-events:auto;
        box-shadow:${p?"0 2px 8px rgba(0,0,0,0.06)":`0 2px 12px ${c}25, 0 2px 6px rgba(0,0,0,0.06)`};
        transition:top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease, box-shadow 0.15s ease;
        user-select:none;
        -webkit-font-smoothing:antialiased;
      `});u.dataset.feedbackId=s.id,u.setAttribute("tabindex","0"),u.setAttribute("role","button");let B=s.message.length>60?`${s.message.slice(0,60)}...`:s.message,m=this.t("marker.aria").replace("{number}",String(n)).replace("{type}",Qe(s.type,this.t)).replace("{message}",B);u.setAttribute("aria-label",m),u.setAttribute("aria-describedby",this.tooltip.tooltipId),F(u,p?"\u2713":String(n)),u.addEventListener("mouseenter",()=>{u.style.transform="scale(1.2)",u.style.boxShadow=p?"0 4px 16px rgba(0,0,0,0.1)":`0 4px 20px ${c}35, 0 4px 12px rgba(0,0,0,0.08)`,this.tooltip.show(s,u.getBoundingClientRect()),this.pinnedFeedback||this.showHighlight(s);}),u.addEventListener("mouseleave",()=>{u.style.transform="scale(1)",u.style.boxShadow=p?"0 2px 8px rgba(0,0,0,0.06)":`0 2px 12px ${c}25, 0 2px 6px rgba(0,0,0,0.06)`,this.tooltip.scheduleHide(),this.pinnedFeedback||this.clearHighlight();}),u.addEventListener("focus",()=>{this.tooltip.show(s,u.getBoundingClientRect()),this.pinnedFeedback||this.showHighlight(s);}),u.addEventListener("blur",()=>{this.tooltip.scheduleHide(),this.pinnedFeedback||this.clearHighlight();});let y=v=>{v instanceof MouseEvent&&this.handleClusterClick(u,v)||(this.pinHighlight(s),this.bus.emit("panel:toggle",true),u.dispatchEvent(new CustomEvent("sp-marker-click",{detail:{feedbackId:s.id},bubbles:true})));};return u.addEventListener("click",v=>y(v)),u.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),y(v));}),u}focusFeedback(n){let s=this.entries.find(c=>c.feedback.id===n);if(!s)return  false;let a=s.elements[0];return a&&a.scrollIntoView({behavior:"smooth",block:"center"}),this.pinHighlight(s.feedback),this.highlight(n),true}highlight(n){for(let s of this.entries)if(s.feedback.id===n)for(let a of s.elements)a.style.animation="sp-pulse-ring 0.7s ease-out",a.addEventListener("animationend",()=>{a.style.animation="";},{once:true});}showHighlight(n){this.removeHighlightElements();for(let s of n.annotations){let a=Pr(gs(s),_r(s));if(!a)continue;let c=SA(n.type,this.colors),p=a.rect,u=b("div",{style:`
          position:absolute;
          top:${p.top+window.scrollY}px;
          left:${p.left+window.scrollX}px;
          width:${p.width}px;height:${p.height}px;
          border:2px solid ${c};
          background:${c}0c;
          border-radius:8px;
          pointer-events:none;z-index:-1;
          opacity:0;
          box-shadow:0 0 16px ${c}20;
          transition:opacity ${Qa}ms ease;
        `});this.container.appendChild(u),this.highlightElements.push(u),u.offsetHeight,u.style.opacity="1";}}pinHighlight(n){this.unpinHighlight(),this.showHighlight(n),this.pinnedFeedback=n,this.onDocumentClick=s=>{this.container.contains(s.target)||this.unpinHighlight();},document.addEventListener("click",this.onDocumentClick,{capture:true});}unpinHighlight(){this.onDocumentClick&&(document.removeEventListener("click",this.onDocumentClick,{capture:true}),this.onDocumentClick=null),this.pinnedFeedback=null,this.clearHighlight();}clearHighlight(){for(let n of this.highlightElements)n.style.opacity="0",setTimeout(()=>n.remove(),Qa);this.highlightElements=[];}removeHighlightElements(){for(let n of this.highlightElements)n.remove();this.highlightElements=[];}clear(){this.unpinHighlight(),this.container.replaceChildren(),this.entries=[],this.clusters=[],this.anchorCache.clear();}destroy(){this.unpinHighlight(),this.repositionTimer&&("cancelIdleCallback"in window&&window.cancelIdleCallback(this.repositionTimer),clearTimeout(this.repositionTimer)),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.scrollHandler&&window.removeEventListener("scroll",this.scrollHandler,{capture:true}),this.onDocumentClickForClusters&&document.removeEventListener("click",this.onDocumentClickForClusters),this.mutationObserver?.disconnect(),this.container.remove();}};bt();var Vr=class{constructor(n,s){this.store=n;this.projectName=s;}store;projectName;async sendFeedback(n){let s=await this.store.createFeedback({projectName:n.projectName,type:n.type,message:n.message,status:"open",url:n.url,urlPattern:n.urlPattern??null,viewport:n.viewport,userAgent:n.userAgent,authorName:n.authorName,authorEmail:n.authorEmail,clientId:n.clientId,annotations:n.annotations.map(ds),screenshotDataUrl:n.screenshotDataUrl??null});return Bs(s)}async getFeedbacks(n,s){let{feedbacks:a,total:c}=await this.store.getFeedbacks({projectName:n,page:s?.page,limit:s?.limit,type:s?.type,status:s?.status,search:s?.search,url:s?.url,urlPattern:s?.urlPattern});return {feedbacks:a.map(Bs),total:c}}async resolveFeedback(n,s){let a=await this.store.updateFeedback(n,{status:s?"resolved":"open",resolvedAt:s?new Date:null});return Bs(a)}async deleteFeedback(n){await this.store.deleteFeedback(n);}async deleteAllFeedbacks(n){await this.store.deleteAllFeedbacks(n);}};function Bs(o){return {id:o.id,projectName:o.projectName,type:o.type,message:o.message,status:o.status,url:o.url,urlPattern:o.urlPattern??null,viewport:o.viewport,userAgent:o.userAgent,authorName:o.authorName,authorEmail:o.authorEmail,resolvedAt:o.resolvedAt?.toISOString()??null,createdAt:o.createdAt.toISOString(),updatedAt:o.updatedAt.toISOString(),annotations:o.annotations.map(qh),screenshotUrl:o.screenshotUrl??null,diagnostics:o.diagnostics??null}}function qh(o){return {id:o.id,feedbackId:o.feedbackId,cssSelector:o.cssSelector,xpath:o.xpath,textSnippet:o.textSnippet,elementTag:o.elementTag,elementId:o.elementId,textPrefix:o.textPrefix,textSuffix:o.textSuffix,fingerprint:o.fingerprint,neighborText:o.neighborText,anchorKey:o.anchorKey??null,xPct:o.xPct,yPct:o.yPct,wPct:o.wPct,hPct:o.hPct,scrollX:o.scrollX,scrollY:o.scrollY,viewportW:o.viewportW,viewportH:o.viewportH,devicePixelRatio:o.devicePixelRatio,createdAt:o.createdAt.toISOString()}}fs();ws();Cs();vs();ys();Fs();var Ug="linear(0, 0.006, 0.025, 0.06, 0.11, 0.17, 0.25, 0.34, 0.45, 0.56, 0.67, 0.78, 0.88, 0.95, 1.01, 1.04, 1.05, 1.04, 1.02, 1, 0.99, 1)",xs="cubic-bezier(0.16, 1, 0.3, 1)",Us="cubic-bezier(0.34, 1.56, 0.64, 1)",Eg="cubic-bezier(0.25, 1, 0.5, 1)",Xa=`
  /* ---- Keyframes ---- */

  @keyframes sp-fab-in {
    from {
      transform: scale(0) rotate(-180deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes sp-fab-glow {
    0%, 100% { box-shadow: 0 4px 20px var(--sp-accent-glow), 0 2px 8px rgba(0, 0, 0, 0.08); }
    50% { box-shadow: 0 4px 28px var(--sp-accent-glow), 0 2px 12px rgba(0, 0, 0, 0.1); }
  }

  @keyframes sp-marker-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    60% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes sp-pulse-ring {
    0% {
      box-shadow: 0 0 0 0 var(--sp-accent-glow);
    }
    70% {
      box-shadow: 0 0 0 8px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  @keyframes sp-flash-bg {
    0% { background-color: var(--sp-accent-light); }
    100% { background-color: transparent; }
  }

  @keyframes sp-slide-up {
    from {
      transform: translateY(8px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes sp-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes sp-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* ---- Animation classes ---- */

  .sp-anim-fab-in {
    animation: sp-fab-in 0.5s ${Ug} both;
  }

  .sp-anim-marker-in {
    animation: sp-marker-in 0.35s ${Us} both;
  }

  .sp-anim-pulse {
    animation: sp-pulse-ring 0.7s ease-out;
  }

  .sp-anim-flash {
    animation: sp-flash-bg 0.5s ${Eg};
  }

  .sp-anim-slide-up {
    animation: sp-slide-up 0.3s ${xs} both;
  }

  .sp-anim-fade-in {
    animation: sp-fade-in 0.2s ease-out both;
  }

  /* ---- Transition utilities ---- */

  .sp-panel {
    transform: translateX(110%);
    transition: transform 0.4s ${xs};
  }

  .sp-panel.sp-panel--open {
    transform: translateX(0);
  }

  .sp-radial-item {
    opacity: 0;
    pointer-events: none;
    transform: translate(0, 0) scale(0.8);
    transition:
      transform 0.35s ${Us},
      opacity 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .sp-radial-item.sp-radial-item--open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Stagger delay via CSS custom property --sp-i */
  .sp-radial-item {
    transition-delay: calc(var(--sp-i, 0) * 50ms);
  }

  /* ---- Card stagger animation ---- */

  @keyframes sp-card-in {
    from {
      transform: translateY(12px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .sp-card {
    animation: sp-card-in 0.35s ${xs} both;
    animation-delay: calc(var(--sp-card-i, 0) * 40ms);
  }

  /* ---- Loading spinner ---- */

  @keyframes sp-spin {
    to { transform: rotate(360deg); }
  }

  .sp-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--sp-border);
    border-top-color: var(--sp-accent);
    border-radius: 50%;
    animation: sp-spin 0.6s linear infinite;
  }

  /* ---- Badge bounce ---- */

  @keyframes sp-badge-in {
    0% { transform: scale(0); }
    60% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  .sp-fab-badge {
    animation: sp-badge-in 0.4s ${Us} both;
  }

  /* ---- Reduced motion ---- */

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

`;ce();function Es(o){return `
    :host {
      all: initial;
      position: fixed;
      z-index: ${2147483647};
      font-family: var(--sp-font);
      font-size: 14px;
      line-height: 1.5;
      color: var(--sp-text);
      /* Match native sub-controls (autofill, scrollbars, etc.) to the resolved theme */
      color-scheme: ${o.bg==="#ffffff"?"light":"dark"};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      ${_o(o)}

      /* Identity modal \u2014 theme-aware backdrop + panel */
      --sp-identity-bg: ${o.glassBgHeavy};
      --sp-identity-overlay: ${o.bg==="#ffffff"?"rgba(15, 23, 42, 0.2)":"rgba(0, 0, 0, 0.4)"};
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ============================
       Focus visible (accessibility)
       ============================ */

    :focus-visible {
      outline: 2px solid var(--sp-accent);
      outline-offset: 2px;
      /* Double-ring against any background colour: the bg-coloured halo
         separates the accent ring from busy host-page surfaces. */
      box-shadow: 0 0 0 4px var(--sp-bg);
    }

    /* ============================
       FAB (Floating Action Button)
       ============================ */

    .sp-fab {
      position: fixed;
      width: 52px;
      height: 52px;
      border-radius: var(--sp-radius-full);
      background: var(--sp-accent-gradient);
      color: #fff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow:
        0 4px 20px var(--sp-accent-glow),
        0 2px 8px rgba(0, 0, 0, 0.08);
      transition:
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.3s ease;
      outline: none;
    }

    .sp-fab:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }

    .sp-fab:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow:
        0 8px 28px var(--sp-accent-glow),
        0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .sp-fab:active {
      transform: translateY(0) scale(0.95);
      transition-duration: 0.1s;
    }

    .sp-fab--bottom-right {
      bottom: 24px;
      right: 24px;
    }

    .sp-fab--bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .sp-fab svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* ---- FAB Badge ---- */

    .sp-fab-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: var(--sp-radius-full);
      background: #ef4444;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #fff;
      pointer-events: none;
      font-family: var(--sp-font);
      line-height: 1;
    }

    /* ============================
       Radial Menu
       ============================ */

    .sp-radial {
      position: fixed;
      pointer-events: none;
      width: 52px;
      height: 52px;
    }

    .sp-radial--bottom-right {
      bottom: 24px;
      right: 24px;
    }

    .sp-radial--bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .sp-radial-item {
      position: absolute;
      left: 4px;
      bottom: 4px;
      width: 44px;
      height: 44px;
      border-radius: var(--sp-radius-full);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      color: var(--sp-text);
      border: 1px solid var(--sp-glass-border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--sp-shadow-md);
      font-size: 12px;
      font-weight: 600;
    }

    .sp-radial-item:hover,
    .sp-radial-item:focus-visible {
      background: rgba(255, 255, 255, 0.95);
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      box-shadow:
        var(--sp-shadow-md),
        0 0 0 3px var(--sp-accent-light);
      outline: none;
    }

    .sp-radial-item svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      stroke: currentColor;
      fill: none;
    }

    .sp-radial-label {
      white-space: nowrap;
      font-size: 12px;
      font-weight: 500;
      color: var(--sp-text);
      pointer-events: none;
      opacity: 0;
      padding: 4px 12px;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-sm);
      transform: translateX(4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .sp-radial-item:hover .sp-radial-label,
    .sp-radial-item:focus-visible .sp-radial-label {
      opacity: 1;
      transform: translateX(0);
    }

    /* ============================
       Panel (Side drawer)
       ============================ */

    .sp-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      max-width: 100vw;
      height: 100vh;
      height: 100dvh;
      background: var(--sp-glass-bg);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border-left: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xl);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    @media (max-width: 480px) {
      .sp-panel {
        width: 100vw;
        border-left: none;
      }
    }

    .sp-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      position: relative;
      z-index: 2;
    }

    .sp-panel-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
    }

    .sp-panel-close {
      width: 44px;
      height: 44px;
      border-radius: var(--sp-radius);
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--sp-text-tertiary);
      transition: all 0.2s ease;
    }

    .sp-panel-close:hover {
      background: var(--sp-bg-hover);
      color: var(--sp-text);
    }

    .sp-panel-close svg {
      width: 16px;
      height: 16px;
    }

    /* ============================
       Filters & Search
       ============================ */

    .sp-filters {
      padding: 16px 24px;
      border-bottom: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .sp-search-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    .sp-search {
      width: 100%;
      height: 40px;
      padding: 0 12px 0 38px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 13px;
      outline: none;
      transition: all 0.2s ease;
    }

    .sp-search::placeholder {
      color: var(--sp-text-tertiary);
    }

    .sp-search:focus {
      border-color: var(--sp-accent);
      box-shadow: 0 0 0 3px var(--sp-accent-light);
      background: var(--sp-bg);
    }

    .sp-search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--sp-text-tertiary);
      width: 16px;
      height: 16px;
      transition: color 0.2s ease;
    }

    .sp-search:focus ~ .sp-search-icon,
    .sp-search-wrap:focus-within .sp-search-icon {
      color: var(--sp-accent);
    }

    /* ============================
       Filter bar (type dropdown + status segmented)
       ============================ */

    .sp-filter-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    /* ============================
       Type filter dropdown
       ============================ */

    .sp-filter-dropdown {
      position: relative;
      flex: 1 1 auto;
      min-width: 0;
    }

    .sp-filter-dropdown-btn {
      --sp-chip-color: var(--sp-text-secondary);
      --sp-chip-bg: var(--sp-glass-bg-heavy);

      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      height: 32px;
      padding: 0 8px 0 10px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    }

    .sp-filter-dropdown-btn:hover {
      border-color: var(--sp-chip-color);
      background: var(--sp-chip-bg);
    }

    .sp-filter-dropdown-btn[aria-expanded="true"] {
      border-color: var(--sp-chip-color);
      background: var(--sp-chip-bg);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--sp-chip-color) 14%, transparent);
    }

    .sp-filter-dropdown-btn--filtered {
      border-color: var(--sp-chip-color);
      background: var(--sp-chip-bg);
    }

    .sp-filter-dropdown-btn__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-btn__icon svg {
      width: 14px;
      height: 14px;
    }

    .sp-filter-dropdown-btn__label {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .sp-filter-dropdown-btn__prefix {
      color: var(--sp-text-tertiary);
      font-weight: 500;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .sp-filter-dropdown-btn__value {
      color: var(--sp-chip-color);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sp-filter-dropdown-btn__chevron {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: var(--sp-text-tertiary);
      transition: transform 0.18s ease, color 0.18s ease;
    }

    .sp-filter-dropdown-btn__chevron svg {
      width: 12px;
      height: 12px;
    }

    .sp-filter-dropdown-btn[aria-expanded="true"] .sp-filter-dropdown-btn__chevron {
      transform: rotate(180deg);
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      min-width: 180px;
      padding: 4px;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-md);
      z-index: 10;
      animation: sp-filter-menu-in 0.15s ease-out both;
    }

    @keyframes sp-filter-menu-in {
      from { opacity: 0; transform: translateY(-4px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .sp-filter-dropdown-option {
      --sp-chip-color: var(--sp-text-secondary);
      --sp-chip-bg: transparent;

      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 8px 10px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: background 0.12s ease, color 0.12s ease;
    }

    .sp-filter-dropdown-option__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border-radius: 6px;
      background: var(--sp-chip-bg);
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-option__icon svg {
      width: 13px;
      height: 13px;
    }

    .sp-filter-dropdown-option__label {
      flex: 1;
      min-width: 0;
    }

    .sp-filter-dropdown-option__check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-option__check svg {
      width: 13px;
      height: 13px;
    }

    .sp-filter-dropdown-option:hover {
      background: var(--sp-bg-hover);
    }

    .sp-filter-dropdown-option--active {
      color: var(--sp-chip-color);
      font-weight: 600;
    }

    .sp-filter-dropdown-option--active:hover {
      background: var(--sp-chip-bg);
    }

    /* ============================
       Status segmented control
       ============================ */

    .sp-segmented {
      display: inline-flex;
      align-items: stretch;
      padding: 2px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      flex-shrink: 0;
    }

    .sp-segmented__btn {
      --sp-chip-color: var(--sp-text-tertiary);
      --sp-chip-bg: transparent;

      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 26px;
      padding: 0 10px;
      border: none;
      border-radius: var(--sp-radius-full);
      background: transparent;
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
    }

    .sp-segmented__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      color: var(--sp-chip-color);
      transition: color 0.18s ease, transform 0.18s ease;
    }

    .sp-segmented__icon svg {
      width: 13px;
      height: 13px;
    }

    .sp-segmented__btn:hover {
      color: var(--sp-chip-color);
    }

    .sp-segmented__btn:hover .sp-segmented__icon {
      color: var(--sp-chip-color);
    }

    .sp-segmented__btn--active {
      background: var(--sp-chip-bg);
      color: var(--sp-chip-color);
      font-weight: 600;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--sp-chip-color) 35%, transparent),
        0 1px 2px rgba(0, 0, 0, 0.04);
    }

    .sp-segmented__btn--active .sp-segmented__icon {
      color: var(--sp-chip-color);
    }

    .sp-segmented__btn--open.sp-segmented__btn--active .sp-segmented__icon {
      animation: sp-segmented-pulse 2.4s ease-in-out infinite;
    }

    @keyframes sp-segmented-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.85); }
    }

    @media (prefers-reduced-motion: reduce) {
      .sp-filter-dropdown-btn,
      .sp-filter-dropdown-btn__chevron,
      .sp-filter-dropdown-option,
      .sp-segmented__btn,
      .sp-segmented__icon {
        transition: none;
      }
      .sp-filter-dropdown-menu {
        animation: none;
      }
      .sp-segmented__btn--open.sp-segmented__btn--active .sp-segmented__icon {
        animation: none;
      }
    }

    /* ============================
       Feedback Cards
       ============================ */

    .sp-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 12px;
    }

    .sp-list::-webkit-scrollbar {
      width: 6px;
    }

    .sp-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .sp-list::-webkit-scrollbar-thumb {
      background: var(--sp-border);
      border-radius: var(--sp-radius-full);
    }

    .sp-list::-webkit-scrollbar-thumb:hover {
      background: var(--sp-text-tertiary);
    }

    .sp-card {
      display: flex;
      padding: 14px 16px;
      margin-bottom: 6px;
      cursor: pointer;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xs);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .sp-card:hover {
      background: var(--sp-bg);
      border-color: var(--sp-border);
      box-shadow: var(--sp-shadow-md);
      transform: translateY(-2px);
    }

    .sp-card:active {
      transform: translateY(0) scale(0.99);
      transition-duration: 0.1s;
    }

    .sp-card-bar {
      width: 3px;
      border-radius: var(--sp-radius-full);
      margin-right: 14px;
      flex-shrink: 0;
    }

    .sp-card-body {
      flex: 1;
      min-width: 0;
    }

    .sp-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .sp-card-number {
      font-size: 12px;
      font-weight: 700;
      color: var(--sp-text-tertiary);
      font-variant-numeric: tabular-nums;
    }

    .sp-badge {
      padding: 2px 10px;
      border-radius: var(--sp-radius-full);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .sp-card-date {
      font-size: 11px;
      color: var(--sp-text-tertiary);
      margin-left: auto;
    }

    .sp-card-message {
      font-size: 13px;
      line-height: 1.5;
      color: var(--sp-text);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .sp-card-message--expanded {
      -webkit-line-clamp: unset;
    }

    .sp-card-expand {
      font-size: 12px;
      font-weight: 500;
      color: var(--sp-accent);
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px 0;
      font-family: var(--sp-font);
      transition: opacity 0.15s ease;
    }

    .sp-card-expand:hover {
      opacity: 0.8;
    }

    .sp-card-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 10px;
    }

    .sp-btn-resolve,
    .sp-btn-delete {
      padding: 8px 14px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: transparent;
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }

    .sp-btn-resolve svg,
    .sp-btn-delete svg {
      width: 14px;
      height: 14px;
    }

    .sp-btn-resolve:hover {
      border-color: #22c55e;
      color: #22c55e;
      background: rgba(34, 197, 94, 0.06);
    }

    .sp-btn-delete:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.06);
    }

    .sp-btn-resolve:disabled,
    .sp-btn-delete:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .sp-spinner--sm {
      width: 14px;
      height: 14px;
    }

    /* ---- Delete All (header) ---- */

    .sp-panel-header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sp-btn-delete-all {
      padding: 5px 12px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: transparent;
      color: var(--sp-text-tertiary);
      font-family: var(--sp-font);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }

    .sp-btn-delete-all svg {
      width: 13px;
      height: 13px;
    }

    .sp-btn-delete-all:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.06);
    }

    .sp-btn-delete-all:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ---- Confirm Dialog ---- */

    .sp-confirm-backdrop {
      position: fixed;
      inset: 0;
      background: var(--sp-backdrop, rgba(15, 23, 42, 0.2));
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${2147483647};
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sp-confirm-dialog {
      width: 340px;
      padding: 28px;
      border-radius: 20px;
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xl);
      font-family: var(--sp-font);
      transform: translateY(8px) scale(0.97);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sp-confirm-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    .sp-confirm-message {
      font-size: 14px;
      color: var(--sp-text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .sp-confirm-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .sp-btn-danger {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: none;
      background: #ef4444;
      color: #fff;
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
    }

    .sp-btn-danger:hover {
      background: #dc2626;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
      transform: translateY(-1px);
    }

    .sp-btn-danger:active {
      transform: translateY(0) scale(0.98);
      transition-duration: 0.1s;
    }

    .sp-card--resolved {
      opacity: 0.5;
    }

    .sp-card--resolved .sp-card-message {
      text-decoration: line-through;
      text-decoration-color: var(--sp-text-tertiary);
    }

    /* ============================
       Loading State
       ============================ */

    .sp-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
    }

    /* ============================
       Identity Form
       ============================ */

    .sp-identity-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
    }

    .sp-input {
      width: 100%;
      height: 42px;
      padding: 0 14px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .sp-input::placeholder {
      color: var(--sp-text-tertiary);
    }

    .sp-input:focus {
      border-color: var(--sp-accent);
      box-shadow: 0 0 0 3px var(--sp-accent-light);
      background: var(--sp-bg);
    }

    .sp-input-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--sp-text-secondary);
      margin-bottom: 6px;
      display: block;
    }

    /* ============================
       Buttons
       ============================ */

    .sp-btn-primary {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: none;
      background: var(--sp-accent-gradient);
      color: #fff;
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px var(--sp-accent-glow);
    }

    .sp-btn-primary:hover {
      box-shadow: 0 4px 16px var(--sp-accent-glow);
      transform: translateY(-1px);
    }

    .sp-btn-primary:active {
      transform: translateY(0) scale(0.98);
      transition-duration: 0.1s;
    }

    .sp-btn-primary:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .sp-btn-ghost {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .sp-btn-ghost:hover {
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      background: var(--sp-accent-light);
    }

    /* ============================
       Empty State
       ============================ */

    .sp-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 56px 24px;
      color: var(--sp-text-tertiary);
      text-align: center;
      gap: 8px;
      animation: sp-fade-in 0.3s ease-out both;
    }

    .sp-empty-text {
      font-size: 14px;
      font-weight: 500;
    }

    /* ============================
       Load More
       ============================ */

    .sp-load-more-wrap {
      display: flex;
      justify-content: center;
      padding: 12px 0 4px;
    }

    .sp-btn-load-more {
      width: 100%;
    }

    /* ============================
       Forced Colors / High Contrast
       ============================ */

    @media (forced-colors: active) {
      .sp-fab,
      .sp-radial-item,
      .sp-filter-dropdown-btn,
      .sp-segmented,
      .sp-segmented__btn,
      .sp-card,
      .sp-panel-close,
      .sp-search,
      .sp-btn-resolve,
      .sp-btn-delete,
      .sp-btn-delete-all,
      .sp-btn-primary,
      .sp-btn-ghost,
      .sp-btn-danger,
      .sp-card-expand,
      .sp-input,
      .sp-confirm-dialog {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
        color: ButtonText !important;
      }

      .sp-segmented__btn--active {
        background: Highlight !important;
        color: HighlightText !important;
      }

      .sp-filter-dropdown-menu {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
      }

      .sp-filter-dropdown-option--active {
        background: Highlight !important;
        color: HighlightText !important;
      }

      .sp-fab:focus-visible,
      .sp-radial-item:focus-visible,
      .sp-filter-dropdown-btn:focus-visible,
      .sp-segmented__btn:focus-visible,
      .sp-filter-dropdown-option:focus-visible,
      .sp-panel-close:focus-visible,
      .sp-btn-resolve:focus-visible,
      .sp-btn-delete:focus-visible,
      .sp-btn-delete-all:focus-visible,
      .sp-btn-primary:focus-visible,
      .sp-btn-ghost:focus-visible,
      .sp-btn-danger:focus-visible,
      .sp-card-expand:focus-visible,
      .sp-input:focus-visible,
      .sp-search:focus-visible {
        outline: 3px solid Highlight !important;
      }

      .sp-panel {
        border: 2px solid ButtonText !important;
      }

      .sp-fab-badge {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
        color: ButtonText !important;
      }

      .sp-card-bar {
        background: ButtonText !important;
      }
    }

    ${Xa}
    ${_a}
    ${Pa}
    ${Ia}
    ${Ha}
    ${Va}
    ${Ka}
  `}ce();HA();Ft();ce();var Hg=120,kg=80,qr=class{constructor(n,s="en"){this.colors=n;this.locale=s;this.root=b("div",{style:`
        position: fixed;
        z-index: ${2147483647};
        max-width: 280px;
        padding: 12px 14px;
        border-radius: 14px;
        background: ${this.colors.glassBgHeavy};
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid ${this.colors.glassBorder};
        box-shadow: 0 8px 32px ${this.colors.shadow}, 0 2px 8px ${this.colors.shadow};
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(6px) scale(0.97);
        transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        visibility: hidden;
        -webkit-font-smoothing: antialiased;
      `}),this.root.setAttribute("role","tooltip"),this.root.id=this.tooltipId,this.arrow=b("div",{style:`
        position: absolute;
        width: 12px;
        height: 12px;
        background: ${this.colors.glassBgHeavy};
        border: 1px solid ${this.colors.glassBorder};
        transform: rotate(45deg);
        pointer-events: none;
      `}),this.root.appendChild(this.arrow),this.root.addEventListener("mouseenter",()=>this.cancelHide()),this.root.addEventListener("mouseleave",()=>this.scheduleHide()),document.body.appendChild(this.root);}colors;locale;root;arrow;showTimer=null;hideTimer=null;currentFeedbackId=null;tooltipId="sp-tooltip";show(n,s){this.currentFeedbackId!==n.id&&(this.cancelHide(),this.cancelShow(),this.showTimer=setTimeout(()=>{this.currentFeedbackId=n.id,this.render(n),this.position(s);let a=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.root.style.transition=a?"none":"",this.root.style.visibility="visible",this.root.style.opacity="1",this.root.style.transform="translateY(0) scale(1)";},Hg));}scheduleHide(){this.cancelHide(),this.hideTimer=setTimeout(()=>this.hide(),kg);}hide(){this.cancelShow(),this.currentFeedbackId=null,this.root.style.opacity="0",this.root.style.transform="translateY(6px) scale(0.97)",setTimeout(()=>{this.currentFeedbackId||(this.root.style.visibility="hidden");},200);}cancelShow(){this.showTimer&&(clearTimeout(this.showTimer),this.showTimer=null);}cancelHide(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null);}render(n){let s=Array.from(this.root.children);for(let x of s)x!==this.arrow&&x.remove();let a=SA(n.type,this.colors),c=$A(n.type,this.colors),p=Or(this.locale),u=Qe(n.type,p),B=b("div",{style:"display:flex;align-items:center;gap:8px;margin-bottom:8px;"}),m=b("span",{style:`
        padding:3px 10px;border-radius:9999px;
        font-size:11px;font-weight:600;
        color:${a};background:${c};
        letter-spacing:0.02em;
      `});F(m,u);let y=b("span",{style:`font-size:11px;color:${this.colors.textSecondary};margin-left:auto;`});F(y,yr(n.createdAt,this.locale)),B.appendChild(m),B.appendChild(y);let v=b("div",{style:`font-size:13px;line-height:1.55;color:${this.colors.text};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;`});F(v,n.message),this.root.insertBefore(B,this.arrow),this.root.insertBefore(v,this.arrow);}position(n){let s=this.root.getBoundingClientRect(),a=10,c=n.top-s.height-a,p=n.left+n.width/2-s.width/2,u=true;c<8&&(c=n.bottom+a,u=false),p=Math.max(8,Math.min(p,window.innerWidth-s.width-8)),this.root.style.top=`${c}px`,this.root.style.left=`${p}px`;let B=Math.max(16,Math.min(n.left+n.width/2-p-6,s.width-22));u?this.arrow.style.cssText=`
        position:absolute;
        width:12px;height:12px;
        background:${this.colors.glassBgHeavy};
        border-right:1px solid ${this.colors.glassBorder};
        border-bottom:1px solid ${this.colors.glassBorder};
        transform:rotate(45deg);
        pointer-events:none;
        bottom:-6px;
        left:${B}px;
      `:this.arrow.style.cssText=`
        position:absolute;
        width:12px;height:12px;
        background:${this.colors.glassBgHeavy};
        border-left:1px solid ${this.colors.glassBorder};
        border-top:1px solid ${this.colors.glassBorder};
        transform:rotate(45deg);
        pointer-events:none;
        top:-6px;
        left:${B}px;
      `;}contains(n){return this.root.contains(n)}destroy(){this.cancelShow(),this.cancelHide(),this.root.remove();}};var Ht=null;function Ig(o){return o===void 0||o===false?{console:false,network:false,maxConsoleEntries:50,maxNetworkEntries:20}:o===true?{console:true,network:true,maxConsoleEntries:50,maxNetworkEntries:20}:{console:o.console!==false,network:o.network!==false,maxConsoleEntries:typeof o.maxConsoleEntries=="number"?o.maxConsoleEntries:50,maxNetworkEntries:typeof o.maxNetworkEntries=="number"?o.maxNetworkEntries:20}}function An(){let o=()=>{};return {destroy:o,open:o,close:o,refresh:o,focusFeedback:()=>false,on:()=>o,off:o}}function Sg(o){return o===void 0||o===false?{enabled:false,param:"siteping"}:o===true?{enabled:true,param:"siteping"}:{enabled:true,param:o.param??"siteping"}}function ja(o){let n=o.debug?(...O)=>console.debug("[siteping]",...O):()=>{};if(Ht)return n("initSiteping() called more than once \u2014 returning existing instance"),Ht;if(!o.forceShow)try{if(typeof process<"u")return o.onSkip?.("production"),An()}catch{}let s=typeof o.minViewportWidth=="number"&&Number.isFinite(o.minViewportWidth)?o.minViewportWidth:768;if(!o.forceShow&&window.innerWidth<s){let O="mobile";return o.onSkip?.(O),An()}if(!o.store&&(!o.endpoint||typeof o.endpoint!="string"))return console.error("[siteping] Missing 'endpoint' or 'store' in config. Provide an endpoint like '/api/siteping' or a SitepingStore instance."),An();if(!o.projectName||typeof o.projectName!="string")return console.error("[siteping] Missing or invalid 'projectName' in config. Expected a non-empty string."),An();let a=o.locale??"en",c=a==="en"?Promise.resolve():ma(a).catch(()=>{}),p=Or(a),u=o.scopeAnnotationsByUrl??true,B=()=>{try{let O=o.getPageScope?.();if(O)return O}catch(O){n("getPageScope() threw, falling back to pathname:",O);}return {url:window.location.pathname,urlPattern:null}};n("Initializing widget",{projectName:o.projectName,theme:o.theme??"light",locale:a,scopeAnnotationsByUrl:u});let m=Ig(o.captureDiagnostics),y=m.console?new Dr(m.maxConsoleEntries):null,v=m.network?new Mr(m.maxNetworkEntries):null,x=Po(o.accentColor,o.theme),U=new Qt,N=new Qt,M=(()=>{if(o.store)return new Vr(o.store,o.projectName);let O=o.endpoint;if(typeof O!="string"||O.length===0)throw new Error("[siteping] internal invariant: endpoint must be a non-empty string in HTTP mode");return new Kr(O,o.projectName)})();o.onOpen&&U.on("open",o.onOpen),o.onClose&&U.on("close",o.onClose),o.onFeedbackSent&&U.on("feedback:sent",o.onFeedbackSent),o.onError&&U.on("feedback:error",o.onError),o.onAnnotationStart&&U.on("annotation:start",o.onAnnotationStart),o.onAnnotationEnd&&U.on("annotation:end",o.onAnnotationEnd),U.on("feedback:sent",O=>N.emit("feedback:sent",O)),U.on("feedback:deleted",O=>N.emit("feedback:deleted",O)),U.on("open",()=>N.emit("panel:open")),U.on("close",()=>N.emit("panel:close")),U.on("open",()=>n("Panel opened")),U.on("close",()=>n("Panel closed")),U.on("feedback:sent",O=>n("Feedback sent",O.id)),U.on("feedback:error",O=>n("Feedback failed",O.message)),U.on("annotation:start",()=>n("Annotation started")),U.on("annotation:end",()=>n("Annotation ended"));let P=document.createElement("siteping-widget");P.style.cssText=`position:fixed;z-index:${2147483647};`;let V=false;try{typeof process<"u"&&process.env?.["NODE_ENV"]==="test"&&(V=!0);}catch{}let eA="open"/*protopeek:open-shadow*/,H=P.attachShadow({mode:eA});if("adoptedStyleSheets"in ShadowRoot.prototype){let O=new CSSStyleSheet;O.replaceSync(Es(x)),H.adoptedStyleSheets=[O];}else {let O=document.createElement("style");O.textContent=Es(x),H.appendChild(O);}document.body.appendChild(P);let _=document.createElement("div");_.setAttribute("role","status"),_.setAttribute("aria-live","polite"),_.setAttribute("aria-atomic","true"),_.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;",document.body.appendChild(_);let $=new qr(x,a),j=new Gr(x,$,U,p,_),lA=new Rr(H,o,U,p);U.on("markers:changed",O=>lA.updateBadge(O));let z=null,fA=null,tA=false,VA=0;async function kt(){return tA?null:z||(fA||(fA=Promise.resolve().then(()=>(Wa(),Ja)).then(O=>tA?null:(z=new O.Panel(H,x,U,M,o.projectName,j,p,a,{getScope:B,scopeAnnotationsByUrl:u}),z))),fA)}if(typeof window<"u"){let O=()=>{tA||kt();},sA=window.requestIdleCallback;typeof sA=="function"?sA(O):setTimeout(O,200);}let zA=false,en=U.on("panel:toggle",O=>{z||(O?(zA=true,kt().then(sA=>{sA&&zA&&sA.open(),zA=false;}).catch(sA=>n("Failed to lazy-load panel:",sA))):zA=false);}),It=new Sr(x,U,p,o.enableScreenshot??false);a!=="en"&&c.then(()=>{tA||(lA.refreshLabels(),It.refreshLabels());});let Ge=false,tn=U.on("annotation:complete",async O=>{if(Ge){U.emit("submission:cancelled");return}Ge=true;try{let{annotation:sA,type:uA,message:LA,screenshotDataUrl:ZA}=O,QA=o.identity??us();if(!QA){if(QA=await Lg(H,p),!QA){U.emit("submission:cancelled");return}Ca(QA);}let ue=(()=>{try{return crypto.randomUUID()}catch{return `${Date.now()}-${Math.random().toString(36).slice(2)}`}})(),vA=B(),Fe=null;(y||v)&&(Fe={console:y?.getEntries()??[],network:v?.getEntries()??[]});let Tt={projectName:o.projectName,type:uA,message:LA,url:vA.url,urlPattern:vA.urlPattern,viewport:`${window.innerWidth}x${window.innerHeight}`,userAgent:navigator.userAgent,authorName:QA.name,authorEmail:QA.email,annotations:[sA],clientId:ue,screenshotDataUrl:ZA??null,diagnostics:Fe};try{let OA=await M.sendFeedback(Tt);U.emit("feedback:sent",OA),(!u||OA.url===vA.url)&&j.addFeedback(OA,j.count+1),_.textContent=p("feedback.sent.confirmation"),z&&await z.refresh();}catch(OA){U.emit("feedback:error",OA instanceof Error?OA:new Error(String(OA))),_.textContent=p("feedback.error.message");}}finally{Ge=false;}}),Ve=B(),St=u?{limit:20,url:Ve.url}:{limit:20},Xe=Sg(o.deepLink),rn=++VA;Promise.all([M.getFeedbacks(o.projectName,St),c]).then(([{feedbacks:O}])=>{if(tA||VA!==rn)return;let sA=u?O.filter(uA=>uA.url===Ve.url):O;if(j.render(sA),Xe.enabled)try{let uA=new URLSearchParams(window.location.search).get(Xe.param);if(uA){let LA=j.focusFeedback(uA);n(`deepLink ?${Xe.param}=${uA} ${LA?"focused":"did not match a visible feedback"}`);}}catch(uA){n("deepLink parsing failed:",uA);}}).catch(O=>{n("Failed to load initial markers:",O);}),o.endpoint&&Aa(o.endpoint,o.identity??us()).then(()=>n("Retry queue flushed")).catch(()=>{});let Lt=()=>{let O=++VA;if(z?.isCurrentlyOpen)return z.refresh();let sA=B(),uA=u?{limit:20,url:sA.url}:{limit:20};return M.getFeedbacks(o.projectName,uA).then(({feedbacks:LA})=>{if(tA||O!==VA||z?.isCurrentlyOpen)return;let ZA=u?LA.filter(QA=>QA.url===sA.url):LA;j.render(ZA);})},Ye=null;if(o.watchNavigation!==false&&typeof window<"u"&&typeof history<"u"){let O=vA=>`${vA.url}
${vA.urlPattern??""}`,sA=O(Ve),uA=()=>{if(tA)return;let vA=O(B());if(vA===sA)return;let Fe=sA;sA=vA,n("SPA navigation detected \u2014 refreshing feedbacks for new scope"),Lt().catch(()=>{sA===vA&&(sA=Fe);});},LA=history.pushState,ZA=history.replaceState,QA=function(...vA){LA.apply(this,vA),uA();},ue=function(...vA){ZA.apply(this,vA),uA();};history.pushState=QA,history.replaceState=ue,window.addEventListener("popstate",uA),window.addEventListener("hashchange",uA),Ye=()=>{window.removeEventListener("popstate",uA),window.removeEventListener("hashchange",uA),history.pushState===QA&&(history.pushState=LA),history.replaceState===ue&&(history.replaceState=ZA);};}return Ht={destroy:()=>{n("Destroying widget"),tA=true,zA=false,Ye?.(),tn(),en(),lA.destroy(),z?.destroy(),It.destroy(),j.destroy(),$.destroy(),y?.dispose(),v?.dispose(),U.removeAll(),N.removeAll(),_.remove(),P.remove(),Ht=null;},open:()=>{U.emit("panel:toggle",true);},close:()=>{z?z.close():zA=false;},focusFeedback:O=>j.focusFeedback(O),refresh:()=>{Lt().catch(()=>{});},on:(O,sA)=>N.on(O,sA),off:(O,sA)=>{N.off(O,sA);}},Ht}function Lg(o,n){return new Promise(s=>{let a=o.activeElement??document.activeElement,c=o.host;c.parentNode&&c.parentNode.appendChild(c);let p=document.createElement("div");p.style.cssText=`
      position:fixed;inset:0;
      background:var(--sp-identity-overlay);
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
      display:flex;align-items:center;justify-content:center;
      z-index:${2147483647};
      opacity:0;transition:opacity 0.25s ease;
    `;let u=document.createElement("div");u.style.cssText=`
      width:340px;padding:28px;border-radius:var(--sp-radius-xl);
      background:var(--sp-identity-bg);
      backdrop-filter:blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter:blur(var(--sp-blur-heavy));
      border:1px solid var(--sp-glass-border);
      box-shadow:0 16px 48px var(--sp-shadow), 0 8px 16px var(--sp-shadow);
      font-family:var(--sp-font, "Inter",system-ui,-apple-system,sans-serif);
      color:var(--sp-text);
      transform:translateY(12px) scale(0.97);
      transition:transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      -webkit-font-smoothing:antialiased;
    `;let B=`sp-identity-title-${Date.now()}`;u.setAttribute("role","dialog"),u.setAttribute("aria-modal","true"),u.setAttribute("aria-labelledby",B);let m=document.createElement("div");m.className="sp-identity-title",m.id=B,m.textContent=n("identity.title"),m.style.marginBottom="20px";let y=`sp-identity-name-${Date.now()}`,v=`sp-identity-email-${Date.now()}`,x=document.createElement("label");x.className="sp-input-label",x.textContent=n("identity.nameLabel"),x.setAttribute("for",y);let U=document.createElement("input");U.className="sp-input",U.id=y,U.type="text",U.placeholder=n("identity.namePlaceholder"),U.style.marginBottom="14px";let N=document.createElement("label");N.className="sp-input-label",N.textContent=n("identity.emailLabel"),N.setAttribute("for",v);let M=document.createElement("input");M.className="sp-input",M.id=v,M.type="email",M.placeholder=n("identity.emailPlaceholder");let P=document.createElement("div");P.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;";let V=$=>{p.removeEventListener("keydown",_),p.style.opacity="0",u.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{p.remove(),a?.focus(),s($);},250);},eA=document.createElement("button");eA.className="sp-btn-ghost",eA.textContent=n("identity.cancel"),eA.addEventListener("click",()=>V(null));let H=document.createElement("button");H.className="sp-btn-primary",H.textContent=n("identity.submit"),H.addEventListener("click",()=>{let $=U.value.trim(),j=M.value.trim();if(!$||!j)return;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(j)){M.style.borderColor="var(--sp-type-bug, #ef4444)";return}V({name:$,email:j});});let R='input, button, [tabindex]:not([tabindex="-1"])',_=$=>{let j=$;if(j.key==="Escape"){V(null);return}if(j.key==="Tab"){let lA=Array.from(u.querySelectorAll(R));if(lA.length===0)return;let z=lA[0],fA=lA[lA.length-1];if(!z||!fA)return;let tA=o.activeElement;j.shiftKey?(tA===z||!u.contains(tA))&&(j.preventDefault(),fA.focus()):(tA===fA||!u.contains(tA))&&(j.preventDefault(),z.focus());}};p.addEventListener("keydown",_),p.addEventListener("click",$=>{$.target===p&&V(null);}),P.appendChild(eA),P.appendChild(H),u.appendChild(m),u.appendChild(x),u.appendChild(U),u.appendChild(N),u.appendChild(M),u.appendChild(P),p.appendChild(u),o.appendChild(p),requestAnimationFrame(()=>{p.style.opacity="1",u.style.transform="translateY(0) scale(1)",U.focus();});})}function Wf(o){return ja(o)}/*! Bundled license information:

html2canvas/dist/html2canvas.js:
  (*!
   * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   *)
  (*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** *)
*/exports.initSiteping=Wf;return exports;})({});
