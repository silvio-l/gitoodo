
import{C as e,D as t,E as n,a as r,c as i,d as a,f as o,g as s,l as c,m as l,n as u,t as d,w as f,y as ee}from"./three-tP-Gppc4.js";var p={idea:-11,forge:-8,brain:0,done:7},m=[{x:-13,z:-12,size:.7,double:!1},{x:-12.5,z:-7,size:.7,double:!1},{x:-11.5,z:-2,size:.7,double:!1}],h={x:-8,z:-6.5,size:1.2,double:!0},g={x:0,z:-8,size:1.4,double:!1},_=[{x:7,z:-12,size:.8,double:!1},{x:7.5,z:-7.5,size:.8,double:!1},{x:8,z:-3,size:.8,double:!1}],v={x:12,z:-7,size:1.3,double:!0},y=[...m,h,g,..._,v];function b(e,t,n,r,i){let a=i*i,o=a*i;return .5*(2*t+(-e+n)*i+(2*e-5*t+4*n-r)*a+(-e+3*t-3*n+r)*o)}function x(e,t){let n=(e.length-1)*t+1,r=new Float32Array(n),i=new Float32Array(n),a=new Float32Array(n),o=t=>e[Math.max(0,Math.min(e.length-1,t))]??[0,0],s=0;for(let n=0;n<e.length-1;n++){let[e,c,l,u]=[o(n-1),o(n),o(n+1),o(n+2)];for(let o=n===0?0:1;o<=t;o++){let n=o/t;r[s]=b(e[0],c[0],l[0],u[0],n),i[s]=b(e[1],c[1],l[1],u[1],n),s>0&&(a[s]=(a[s-1]??0)+Math.hypot((r[s]??0)-(r[s-1]??0),(i[s]??0)-(i[s-1]??0))),s++}}return{xs:r,zs:i,len:a}}function S(e,t){let n=e.len.length,r=e.len[n-1]??0,i=Math.max(0,Math.min(1,t))*r,a=0,o=n-1;for(;o-a>1;){let t=a+o>>1;(e.len[t]??0)<i?a=t:o=t}let s=e.len[a]??0,c=e.len[o]??0,l=c>s?(i-s)/(c-s):0,u=e.xs[a]??0,d=e.zs[a]??0;return[u+((e.xs[o]??0)-u)*l,d+((e.zs[o]??0)-d)*l]}function te(e=18){let t=[];for(let n of m)for(let r of _)t.push(x([[-30,n.z*1.3+2],[n.x,n.z],[h.x,h.z],[g.x,g.z],[r.x,r.z],[v.x,v.z],[30,v.z+3]],e));return t}var ne=30,C=5,w=`
uniform float uTime;
uniform float uScale;
uniform vec3 uIdea;
uniform vec3 uForge;
uniform vec3 uBrain;
uniform vec3 uDone;
float swell(vec2 p) {
  return 0.22 * sin(p.x * 0.3 + uTime * 0.35) * cos(p.y * 0.4 + uTime * 0.22)
       + 0.12 * sin((p.x + p.y) * 0.18 - uTime * 0.27);
}
vec3 role(float x) {
  vec3 c = mix(uIdea, uForge, smoothstep(${p.idea.toFixed(1)}, ${p.forge.toFixed(1)}, x));
  c = mix(c, uBrain, smoothstep(${(p.forge+2).toFixed(1)}, ${p.brain.toFixed(1)}, x));
  return mix(c, uDone, smoothstep(${(p.brain+2).toFixed(1)}, ${p.done.toFixed(1)}, x));
}
float depthFade(float depth) {
  return smoothstep(80.0, 46.0, depth) * smoothstep(8.0, 16.0, depth);
}`,re=`${w}
uniform vec3 uField;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec3 p = position;
  p.y += swell(p.xz);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float depth = -mv.z;
  gl_PointSize = uScale * (2.0 + aSeed * 0.9) * (42.0 / depth);
  // The field takes a hint of the role colour above it; crests catch a little more light.
  vColor = mix(uField, role(p.x), 0.35);
  vAlpha = depthFade(depth) * (0.75 + 1.2 * max(p.y, 0.0));
}`,ie=`${w}
attribute float aLift;
attribute float aStation;
uniform float uPulse[${String(y.length)}];
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec3 p = position;
  p.y += swell(p.xz) + aLift;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vColor = role(p.x);
  float pulse = aStation < 0.0 ? 0.0 : uPulse[int(aStation)];
  vAlpha = depthFade(-mv.z) * (aStation < 0.0 ? 0.55 : 0.9 + 0.6 * pulse);
}`,T=`${w}
attribute float aSize;
attribute float aFade;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec3 p = position;
  p.y += swell(p.xz) + 0.34;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uScale * aSize * (42.0 / -mv.z);
  vColor = role(p.x);
  vAlpha = depthFade(-mv.z) * aFade;
}`,E=`
uniform float uAlpha;
varying vec3 vColor;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(vColor, uAlpha * vAlpha);
}`,D=`
uniform float uAlpha;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vColor, uAlpha * vAlpha * (1.0 - smoothstep(0.3, 0.5, d)));
}`;function O(){let e=new Float32Array(25344),t=new Float32Array(8448),n=0;for(let r=0;r<64;r++)for(let i=0;i<132;i++)e[n*3]=(i-66)*.46,e[n*3+2]=14-r*.66,t[n]=(i*73+r*151)%97/97,n++;let r=new o;return r.setAttribute(`position`,new a(e,3)),r.setAttribute(`aSeed`,new a(t,1)),r}function k(e){let t=[],n=[],r=[],i=(e,i,a,o,s,c,l)=>{t.push(e,0,a,o,0,c),n.push(i,s),r.push(l,l)};for(let t of e)for(let e=1;e<t.xs.length;e++)i(t.xs[e-1]??0,.3,t.zs[e-1]??0,t.xs[e]??0,.3,t.zs[e]??0,-1);y.forEach((e,t)=>{let n=e.double?[e.size/2,e.size/2-.28]:[e.size/2];for(let r of n){let n=[[e.x-r,e.z-r],[e.x+r,e.z-r],[e.x+r,e.z+r],[e.x-r,e.z+r]];for(let a=0;a<4;a++){let[o,s]=n[a]??[0,0],[c,l]=n[(a+1)%4]??[0,0];i(o,.5,s,c,.5,l,t),r===e.size/2&&(i(o,.3,s,c,.3,l,t),i(o,.3,s,o,.5,s,t))}}});let s=new o;return s.setAttribute(`position`,new a(new Float32Array(t),3)),s.setAttribute(`aLift`,new a(new Float32Array(n),1)),s.setAttribute(`aStation`,new a(new Float32Array(r),1)),s}function A(){let e=new Float32Array(150),t=new Float32Array(150);for(let n=0;n<150;n++){let r=n%C;e[n]=r===0?5:3.6-r*.5,t[n]=r===0?1:.55-r*.1}let n=new o;return n.setAttribute(`position`,new a(new Float32Array(450),3)),n.setAttribute(`aSize`,new a(e,1)),n.setAttribute(`aFade`,new a(t,1)),n}function j(){let a=document.querySelector(`[data-hero-3d]`);if(a===null||a.childElementCount>0||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let o;try{o=new c({antialias:!0,alpha:!0,powerPreference:`low-power`})}catch{return}let p=i(window.devicePixelRatio,1.5);o.setPixelRatio(p);let m=o.domElement;m.setAttribute(`aria-hidden`,`true`),a.append(m);let h=new n,g=new e(20,2,1,140),_={fov:20,base:{x:0,y:24,z:27.4},target:{x:0,y:0,z:-7}},v={fov:46,base:{x:0,y:30,z:20},target:{x:0,y:0,z:-2}},b=_,x={uTime:{value:0},uScale:{value:p},uIdea:{value:new l},uForge:{value:new l},uBrain:{value:new l},uDone:{value:new l},uField:{value:new l},uPulse:{value:y.map(()=>0)}},w=(e,n)=>new t({vertexShader:e,fragmentShader:n,uniforms:{...x,uAlpha:{value:1}},transparent:!0,depthWrite:!1,depthTest:!1}),j=w(re,D),M=w(ie,E),N=w(T,D),P=te(),F=A(),I=F.getAttribute(`position`),L=new f(F,N);L.frustumCulled=!1;let R=new s;R.add(new f(O(),j),new ee(k(P),M),L),h.add(R);let z=Array.from({length:ne},(e,t)=>({route:P[t*4%P.length]??P[0],speed:1/(26+t*7%15),phase:t*.618034%1})),B=()=>{let e=getComputedStyle(a),t=(t,n)=>e.getPropertyValue(t).trim()||n;x.uIdea.value.setStyle(t(`--hero-gl-idea`,`#b45309`)),x.uForge.value.setStyle(t(`--hero-gl-forge`,`#1d4ed8`)),x.uBrain.value.setStyle(t(`--hero-gl-brain`,`#6d28d9`)),x.uDone.value.setStyle(t(`--hero-gl-done`,`#126b67`)),x.uField.value.setStyle(t(`--hero-gl-field`,`#126b67`));let n=t(`--hero-gl-blend`,`normal`)===`add`,r=Number.parseFloat(t(`--hero-gl-alpha`,`1`))||1,i=(e,t)=>{e.uniforms.uAlpha.value=t*r,e.blending=n?2:1,e.needsUpdate=!0};i(j,n?.5:.42),i(M,n?.5:.65),i(N,1)};B();let V=()=>{let e=a.clientWidth,t=a.clientHeight;if(e===0||t===0)return;o.setSize(e,t,!1),g.aspect=e/t,b=e<768&&t>e?v:_,R.rotation.y=b===v?-Math.PI/2:0,R.position.x=b===v?-7.5:0;let n=Math.hypot(b.base.y-b.target.y,b.base.z-b.target.z);g.fov=b===v?b.fov:Math.max(b.fov,2*Math.atan(14.5/(g.aspect*n))*180/Math.PI),g.updateProjectionMatrix()};V();let ae=window.matchMedia(`(hover: hover) and (pointer: fine)`),H={x:0,y:0},U={x:0,y:0};window.addEventListener(`pointermove`,e=>{e.pointerType===`mouse`&&ae.matches&&(H.x=e.clientX/window.innerWidth*2-1,H.y=e.clientY/window.innerHeight*2-1)},{passive:!0});let W=0,oe=()=>{let e=x.uPulse.value;for(let t=0;t<e.length;t++)e[t]=(e[t]??0)*.9;let t=I.array;z.forEach((n,r)=>{if(n.route===void 0)return;let i=(W*n.speed+n.phase)%1;for(let a=0;a<C;a++){let[o,s]=S(n.route,i-a*.004),c=(r*C+a)*3;t[c]=o,t[c+2]=s,a===0&&y.forEach((t,n)=>{Math.abs(t.x-o)<t.size/2&&Math.abs(t.z-s)<t.size/2&&(e[n]=1)})}}),I.needsUpdate=!0},G=()=>{U.x+=(H.x-U.x)*.04,U.y+=(H.y-U.y)*.04;let e=Math.sin(W*.045),t=Math.sin(W*.031),{base:n,target:r}=b;g.position.set(n.x+e*3+U.x*2.4,n.y+t*1.2-U.y*1.2,n.z),g.lookAt(r.x+e*.5,r.y,r.z),x.uTime.value=W,oe(),o.render(h,g)},K=()=>!Z&&X&&!document.hidden&&!d(),q=0,J=0,Y=0,X=!0,Z=!1,Q=e=>{Y=0,K()&&(e-J>=32.333333333333336&&(W+=Math.min(.1,(e-q)/1e3),q=e,J=e,G()),Y=requestAnimationFrame(Q))},$=()=>{K()&&Y===0?(q=performance.now(),Y=requestAnimationFrame(Q)):!K()&&Y!==0&&(cancelAnimationFrame(Y),Y=0)};m.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),Z=!0,a.classList.remove(`is-ready`),m.remove()}),new ResizeObserver(()=>{V(),G()}).observe(a),new IntersectionObserver(e=>{X=e.some(e=>e.isIntersecting),$()}).observe(a),document.addEventListener(`visibilitychange`,$),document.addEventListener(r,$),window.matchMedia(`(prefers-reduced-motion: reduce)`).addEventListener(`change`,e=>{e.matches&&(Z=!0,$(),a.classList.remove(`is-ready`))}),u(()=>{B(),G()}),W=12,G(),requestAnimationFrame(()=>{a.classList.add(`is-ready`)}),$()}j();