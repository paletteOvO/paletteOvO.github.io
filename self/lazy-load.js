const digit="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~",decode83=(e,t,r)=>{let a=0;for(;t<r;)a*=83,a+=digit.indexOf(e[t++]);return a},pow=Math.pow,PI=Math.PI,PI2=2*PI,d=3294.6,e=269.025,sRGBToLinear=t=>t>10.31475?pow(t/e+.052132,2.4):t/d,linearTosRGB=t=>~~(t>1227e-8?e*pow(t,.416666)-13.025:t*d+1),signSqr=e=>(e<0?-1:1)*e*e,fastCos=e=>{for(e+=PI/2;e>PI;)e-=PI2;const t=1.27323954*e-.405284735*signSqr(e);return.225*(signSqr(t)-t)+t};function getBlurHashAverageColor(e){const t=decode83(e,2,6);return[t>>16,t>>8&255,255&t]}function decodeBlurHash(e,t,r,a){const o=decode83(e,0,1),n=o%9+1,s=1+~~(o/9),d=n*s;let c=0,i=0,l=0,u=0,g=0,f=0,h=0,m=0,A=0,I=0,B=0,b=0,y=0,S=0;const w=(decode83(e,1,2)+1)/13446*(1|a),P=new Float64Array(3*d),q=getBlurHashAverageColor(e);for(c=0;c<3;c++)P[c]=sRGBToLinear(q[c]);for(c=1;c<d;c++)S=decode83(e,4+2*c,6+2*c),P[3*c]=signSqr(~~(S/361)-9)*w,P[3*c+1]=signSqr(~~(S/19)%19-9)*w,P[3*c+2]=signSqr(S%19-9)*w;const C=4*t,L=new Uint8ClampedArray(C*r);for(u=0;u<r;u++)for(b=PI*u/r,l=0;l<t;l++){for(g=0,f=0,h=0,y=PI*l/t,i=0;i<s;i++)for(A=fastCos(b*i),c=0;c<n;c++)m=fastCos(y*c)*A,I=3*(c+i*n),g+=P[I]*m,f+=P[I+1]*m,h+=P[I+2]*m;B=4*l+u*C,L[B]=linearTosRGB(g),L[B+1]=linearTosRGB(f),L[B+2]=linearTosRGB(h),L[B+3]=255}return L}function ready(e){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}function getSrcFromBlurHash(e,t,r){const a=document.createElement("canvas"),o=a.getContext("2d"),n=decodeBlurHash(e,t,r),s=o.createImageData(t,r);return s.data.set(n),o.putImageData(s,0,0),a.toDataURL()}ready((()=>{let e=new IntersectionObserver((t=>{t.forEach((function(t){if(t.intersectionRatio<=.2)return;let r=t.target;if(!r.classList.contains("entered")){let t=new Image;t.src=r.getAttribute("data-lazy-src"),t.onload=()=>{r.src=r.getAttribute("data-lazy-src"),r.classList.add("loaded")},r.classList.add("entered"),e.unobserve(r)}}))}),{rootMargin:"0px",threshold:.2});Array.from(document.querySelectorAll("img[data-blurhash]")).forEach((function(t){e.observe(t)})),Array.from(document.querySelectorAll("img[data-blurhash]")).forEach((function(e){e.src=getSrcFromBlurHash(e.getAttribute("data-blurhash"),e.getAttribute("data-width"),e.getAttribute("data-height"))}))}));