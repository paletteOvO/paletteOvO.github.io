import{d as N,j as C,o as O,g as _,a as w,u as R,i as d,c as g,S,b as y,s as m,r as z,t as x,k as A}from"./web.883e91e8.js";const D=x('<pre class="mt-3 text-sm opacity-80 w-0! sm:w-auto!">'),T=x('<div class=w-240px><img class="w-full object-cover"loading=lazy decoding=async>'),q=x('<div class="w-full p-4 sm:py-4 sm:px-16 transition-padding"><div class="group mx-auto elevation-1 bg-gradient-1 min-w-240px max-w-960px p-8 rounded-3 transition-shadow-300 cursor-pointer flex min-h-233px items-center hover:elevation-2 hover:bg-gradient-2"><div class=flex-grow><h2 class="text-2xl group-hover:decoration-underline group-hover:text-primary transition-colors-300"></h2><span class="sm:mt-3 flex items-center text-0.8rem opacity-50"><div class="mr-1 text-base i-material-symbols:calendar-month-outline-rounded"></div><span class="mr-1 lt-sm:hidden">Created on</span><time></time></span><!$><!/></div><!$><!/>'),F=s=>{const e=()=>s.post,[v,u]=C(void 0);let c;return O(()=>{const i=e().excerpt;if(i){const r=document.createElement("template");r.innerHTML=i,u(r.content.textContent||void 0)}new IntersectionObserver(r=>{r.filter(a=>a.intersectionRatio>0).forEach(a=>{s.onenter?.(a.target,s.index)})},{}).observe(c)}),(()=>{const i=_(q),o=i.firstChild,r=o.firstChild,a=r.firstChild,$=a.nextSibling,E=$.firstChild,L=E.nextSibling,p=L.nextSibling,k=$.nextSibling,[M,j]=w(k.nextSibling),B=r.nextSibling,[H,I]=w(B.nextSibling),h=c;return typeof h=="function"?R(h,i):c=i,o.$$click=()=>window.location.href=`/blog/${e().id}`,d(a,()=>e().title),d(p,()=>e().pub_date.toLocaleDateString("en-us",{year:"numeric",month:"short",day:"numeric"})),d(r,g(S,{get when(){return e().excerpt},get children(){const t=_(D);return d(t,()=>v()?.trim()),t}}),M,j),d(o,g(S,{get when(){return e().thumbnail},get children(){const t=_(T),l=t.firstChild;return l.addEventListener("load",n=>{n.target.classList.add("animate-fade-in")}),y(n=>{const f=e().thumbnail,b=e().title;return f!==n._v$&&m(l,"src",n._v$=f),b!==n._v$2&&m(l,"alt",n._v$2=b),n},{_v$:void 0,_v$2:void 0}),t}}),H,I),y(t=>{const l=s.index,n=e().pub_date.toISOString();return l!==t._v$3&&m(i,"data-index",t._v$3=l),n!==t._v$4&&m(p,"datetime",t._v$4=n),t},{_v$3:void 0,_v$4:void 0}),z(),i})()};N(["click"]);const J=s=>{const[e,v]=C(1);return A(()=>s.posts.slice(0,e()).map((u,c)=>g(F,{post:u,index:c,onenter:(i,o)=>{o>=e()-2&&v(e()+1)}})))};export{J as default};