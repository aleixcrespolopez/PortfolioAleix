/* Portfolio de Aleix Crespo López — app.js */

/* =====================================================
   Rendimiento
   ===================================================== */
/* Ajusta los efectos según la potencia del dispositivo */
(()=>{'use strict';
const n=navigator,mem=n.deviceMemory||8,cores=n.hardwareConcurrency||8;
const coarse=matchMedia('(pointer:coarse)').matches,small=innerWidth<700;
const low=mem<=4||cores<=4||coarse||small;
const pf=window.__pf={
  low,
  frame:low?40:30,
  nodes:small?40:(low?55:90),
  dpr:low?1.25:2,
  matrixMs:low?100:60,
  heroOn:true,
  boot:true,
  scrolling:false
};
const root=document.documentElement;
root.classList.add('pf-boot');
{let t;addEventListener('scroll',()=>{pf.scrolling=true;clearTimeout(t);t=setTimeout(()=>{pf.scrolling=false},140)},{passive:true})}
const bootDone=()=>{pf.boot=false;root.classList.remove('pf-boot')};
addEventListener('xboot',bootDone,{once:true});setTimeout(bootDone,20000);
root.classList.toggle('pf-low',low);
document.addEventListener('visibilitychange',()=>root.classList.toggle('pf-hidden',document.hidden));
const init=()=>{
  if(!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('pf-off',!e.isIntersecting)));
  document.querySelectorAll('section,footer,.cy-ticker').forEach(s=>io.observe(s));
  const hero=document.querySelector('.hero');
  if(hero)new IntersectionObserver(es=>{pf.heroOn=es[0].isIntersecting},{rootMargin:'100px 0px'}).observe(hero);
};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
const RCH='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789ABCDEF<>/$#';
const rstr=n=>Array.from({length:n},()=>RCH[Math.random()*RCH.length|0]).join('\n');
window.whenIdle=(fn,t=1500)=>("requestIdleCallback" in window)?requestIdleCallback(fn,{timeout:t}):setTimeout(fn,200);
window.xRain=(box,o={})=>{const gap=o.gap||30,W=innerWidth,n=Math.ceil(W/gap),frag=document.createDocumentFragment();
  for(let i=0;i<n;i++){const x=i*gap+(Math.random()*8|0),edge=Math.abs(x/W-.5)*2,op=((o.center??.25)+edge*(1-(o.center??.25)))*(o.max??1);
   if(op<.12)continue;
   const c=document.createElement('i'),len=12+(Math.random()*16|0);
   c.className='rn'+(Math.random()<.1?' c':'');c.textContent=rstr(len);
   c.style.cssText=`left:${x}px;opacity:${op.toFixed(2)};animation-duration:${(o.min||7)+Math.random()*(o.span||9)}s;animation-delay:${-Math.random()*16}s`;
   frag.append(c)}
  box.textContent='';box.append(frag)};
})();

/* =====================================================
   Pantalla de carga
   ===================================================== */
(()=>{'use strict';
const boot=document.getElementById('boot');if(!boot)return;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let pref=null;try{pref=localStorage.xlang}catch{}
const isEn=()=>document.documentElement.lang==='en'||(pref?pref==='en':(navigator.language||'').toLowerCase().startsWith('en'));
const L=(a,b)=>isEn()?b:a;
const root=document.documentElement;
const $=s=>boot.querySelector(s);
const low=()=>!!(window.__pf&&__pf.low);
let leaving=false,alive=true;

const fin=()=>{boot.classList.add('x-done');window.xbootDone=1;window.dispatchEvent(new Event('xboot'))};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const S=async ms=>{if(leaving)throw 0;await wait(RM?Math.min(ms,25):ms);if(leaving)throw 0};
const leave=async fast=>{if(leaving)return;leaving=true;alive=false;if(fast){fin();return}boot.classList.add('x-off');await wait(RM?0:340);fin()};

root.classList.add('xb');
let seen=false;try{seen=sessionStorage.xvis==='1';sessionStorage.xvis='1'}catch{}
const cores=navigator.hardwareConcurrency||'?',mem=navigator.deviceMemory?navigator.deviceMemory+' GB':'RAM ?';

const ASCII=[
' █████╗ ██╗     ███████╗██╗██╗  ██╗',
'██╔══██╗██║     ██╔════╝██║╚██╗██╔╝',
'███████║██║     █████╗  ██║ ╚███╔╝ ',
'██╔══██║██║     ██╔══╝  ██║ ██╔██╗ ',
'██║  ██║███████╗███████╗██║██╔╝ ██╗',
'╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═╝'];
const HOPS=[['gw.local','192.168.1.1'],['bcn-core-01','10.42.0.1'],['es-mad-ix','185.1.192.12'],['eu-edge-sec','91.198.174.7'],['aleix@portfolio','127.0.0.1']];
const SEG=36;

boot.innerHTML=`
<div class="nb-rain" id="nbRain"></div>
<div class="nb-wrap"><div class="nb-crt"></div>
  <i class="nb-c tl"></i><i class="nb-c tr"></i><i class="nb-c bl"></i><i class="nb-c br"></i>
  <div class="nb-head"><span class="nb-d r"></span><span class="nb-d y"></span><span class="nb-d g"></span>
    <span class="nb-title">root@aleix-sec:~# ./secure-boot --tty1</span>
    <span class="nb-rec"><i></i>LIVE</span><span class="nb-clock" id="nbClock">00:00:00</span></div>
  <div class="nb-main">
    <div class="nb-left">
      <pre class="nb-ascii" id="nbAscii" aria-label="ALEIX">${ASCII.map((l,i)=>`<span style="--i:${i}">${l}</span>`).join('\n')}</pre>
      <div class="nb-ver"><b>_OS</b> v3.0 · SECURE BOOT · AES-256 · TLS 1.3</div>
      <div class="nb-log" id="nbLog"></div>
    </div>
    <aside class="nb-right">
      <div class="nb-globe">
        <canvas id="nbGlobe"></canvas>
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="nb-rb" cx="60" cy="60" r="56"/><circle class="nb-rf" id="nbRing" cx="60" cy="60" r="56"/></svg>
        <div class="nb-cap"><b id="nbPct">0%</b><i id="nbLbl">INIT</i></div>
      </div>
      <div class="nb-panel">
        <div class="nb-ph">$ traceroute aleix.portfolio</div>
        <ol class="nb-hops" id="nbHops">${HOPS.map((h,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><em>${h[0]}</em><code>${h[1]}</code><b>···</b></li>`).join('')}</ol>
      </div>
      <div class="nb-stats">
        <div><span>CPU</span><i><u id="nbCpu"></u></i></div>
        <div><span>MEM</span><i><u id="nbMem"></u></i></div>
        <div><span>NET</span><i><u id="nbNet"></u></i></div>
      </div>
    </aside>
  </div>
  <div class="nb-prog"><div class="nb-segs" id="nbSegs">${'<i></i>'.repeat(SEG)}</div><span class="nb-st" id="nbSt">BOOT</span></div>
  <div class="nb-skip">${L('[ clic o cualquier tecla para entrar ]','[ click or press any key to enter ]')}</div>
</div>
<div class="nb-grant" id="nbGrant">
  <div class="nb-shock"></div>
  <svg class="nb-lock" viewBox="0 0 64 72" aria-hidden="true">
    <path class="sh" d="M18 32V22a14 14 0 0 1 28 0v10"/>
    <rect class="bd" x="8" y="32" width="48" height="36" rx="5"/>
    <circle class="kh" cx="32" cy="48" r="4.5"/><path class="kh" d="M32 52v7"/>
  </svg>
  <div class="nb-g1" id="nbG1" data-t="${L('ACCESO CONCEDIDO','ACCESS GRANTED')}">${L('ACCESO CONCEDIDO','ACCESS GRANTED')}</div>
  <div class="nb-g2">${L('Bienvenido, visitante','Welcome, visitor')} · uid=1000(guest)</div>
  <div class="nb-g3">Aleix Crespo López<br><span>${L('Técnico informático · ASIR · Ciberseguridad','IT technician · ASIR · Cybersecurity')}</span></div>
  <div class="nb-wait" aria-hidden="true"><i></i></div>
</div>`;

const clk=$('#nbClock');const tickClk=()=>{if(clk)clk.textContent=new Date().toTimeString().slice(0,8)};tickClk();
const clkT=setInterval(()=>{alive?tickClk():clearInterval(clkT)},1000);

window.xRain($('#nbRain'),{gap:low()?48:36,center:.2,min:5,span:6});

{const cv=$('#nbGlobe'),cx=cv.getContext('2d'),dpr=Math.min(devicePixelRatio||1,window.__pf?__pf.dpr:2);
 const SZ=cv.clientWidth||220;cv.width=cv.height=Math.round(SZ*dpr);cx.setTransform(dpr,0,0,dpr,0,0);
 const N=low()?44:64,P=[];
 for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),t=i*2.399963;P.push([Math.cos(t)*r,y,Math.sin(t)*r])}
 const LINKS=Array.from({length:4},()=>[Math.random()*N|0,Math.random()*N|0,Math.random()]);
 const TAU=Math.PI*2,tilt=.38,ct=Math.cos(tilt),st=Math.sin(tilt);let ang=0,last=0;
 const rot=(p,a)=>{const c=Math.cos(a),s=Math.sin(a);let x=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c,y=p[1];return[x,y*ct-z*st,y*st+z*ct]};
 const draw=ts=>{if(!alive)return;requestAnimationFrame(draw);if(ts-last<(low()?50:33))return;const dt=Math.min(3,(ts-(last||ts))/16.67||1);last=ts;
  if(!RM)ang+=.011*dt;const R=SZ*.4,c=SZ/2;cx.clearRect(0,0,SZ,SZ);
  cx.strokeStyle='rgba(0,255,102,.14)';cx.lineWidth=1;cx.beginPath();
  for(let m=0;m<4;m++){const a=m*Math.PI/4;for(let k=0;k<=24;k++){const t=k/24*TAU,q=rot([Math.cos(t)*Math.cos(a),Math.sin(t),Math.cos(t)*Math.sin(a)],ang),x=c+q[0]*R,y=c+q[1]*R;k?cx.lineTo(x,y):cx.moveTo(x,y)}}
  for(const la of[-.55,0,.55]){const rr=Math.sqrt(1-la*la);for(let k=0;k<=24;k++){const t=k/24*TAU,q=rot([Math.cos(t)*rr,la,Math.sin(t)*rr],ang),x=c+q[0]*R,y=c+q[1]*R;k?cx.lineTo(x,y):cx.moveTo(x,y)}}
  cx.stroke();
  const Q=P.map(p=>rot(p,ang)),scan=Math.sin(ts*.0014)*.9;
  for(let i=0;i<N;i++){const q=Q[i];if(q[2]<-.2)continue;const hot=Math.abs(q[1]-scan)<.06,al=Math.max(.1,(q[2]+1)/2);
   cx.fillStyle=hot?'#eafff1':`rgba(0,255,102,${al})`;cx.beginPath();cx.arc(c+q[0]*R,c+q[1]*R,hot?2.4:1+al*1.4,0,TAU);cx.fill()}
  LINKS.forEach(l=>{const a=Q[l[0]],b=Q[l[1]];if(a[2]<0||b[2]<0)return;
   const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,ml=Math.hypot(mx,my)||1,lift=1.35;
   const x1=c+a[0]*R,y1=c+a[1]*R,x2=c+b[0]*R,y2=c+b[1]*R,qx=c+mx/ml*R*lift,qy=c+my/ml*R*lift;
   cx.strokeStyle='rgba(34,211,238,.45)';cx.beginPath();cx.moveTo(x1,y1);cx.quadraticCurveTo(qx,qy,x2,y2);cx.stroke();
   if(!RM)l[2]=(l[2]+.012*dt)%1;const t=l[2],u=1-t,px=u*u*x1+2*u*t*qx+t*t*x2,py=u*u*y1+2*u*t*qy+t*t*y2;
   cx.fillStyle='#22d3ee';cx.beginPath();cx.arc(px,py,2.2,0,TAU);cx.fill()});
  cx.strokeStyle='rgba(0,255,102,.4)';cx.beginPath();const sy=c+scan*R,sw=Math.sqrt(Math.max(0,1-scan*scan))*R;cx.moveTo(c-sw,sy);cx.lineTo(c+sw,sy);cx.stroke()};
 RM?(ang=.6,draw(1)):requestAnimationFrame(draw)}

{const bars=['#nbCpu','#nbMem','#nbNet'].map(s=>$(s));const base=[.35,.52,.2];
 const tick=()=>{if(!alive)return;bars.forEach((b,i)=>{const v=Math.min(.98,Math.max(.06,base[i]+(Math.random()-.5)*.45));b.style.transform=`scaleX(${v.toFixed(2)})`});setTimeout(tick,RM?999999:260)};tick()}

const log=$('#nbLog'),pct=$('#nbPct'),lbl=$('#nbLbl'),ring=$('#nbRing'),segs=[...boot.querySelectorAll('#nbSegs i')],st=$('#nbSt'),hops=[...boot.querySelectorAll('#nbHops li')];
const CIRC=2*Math.PI*56;ring.style.strokeDasharray=CIRC;ring.style.strokeDashoffset=CIRC;
const setP=(p,l)=>{pct.textContent=p+'%';if(l){lbl.textContent=l;st.textContent=l}ring.style.strokeDashoffset=CIRC*(1-p/100);
  const on=Math.round(p/100*SEG);segs.forEach((s,i)=>s.classList.toggle('on',i<on));
  hops.forEach((h,i)=>{if(p>=(i+1)*18&&!h.classList.contains('on')){h.classList.add('on');h.lastChild.textContent=(Math.random()*18+2).toFixed(1)+' ms'}})};
const trim=()=>{while(log.children.length>9)log.firstChild.remove()};
const type=async(el,t,cps=6,dt=12)=>{if(RM){el.textContent=t;return}for(let c=0;c<=t.length;c+=cps){el.textContent=t.slice(0,c);await S(dt)}el.textContent=t};
let T=0;const stamp=()=>{T+=Math.random()*.09+.02;return'['+T.toFixed(4).padStart(9,' ')+']'};
const addLine=async(txt,tag,cls)=>{const d=document.createElement('div');d.className='nb-ln';
  d.innerHTML='<span class="nb-ts"></span><span class="nb-tx"></span><span class="nb-dt"></span><span class="nb-tg"></span>';
  d.firstChild.textContent=stamp();log.append(d);trim();await type(d.children[1],txt);
  if(tag){const g=d.lastChild;g.textContent='[ .. ]';g.className='nb-tg run';await S(55);g.textContent=tag;g.className='nb-tg '+(cls||'ok')}};
const inputLine=async(label,val,delay)=>{const d=document.createElement('div');d.className='nb-ln nb-in';
  d.innerHTML='<span class="nb-ts"></span><span class="nb-pr"></span><span class="nb-val"></span><span class="nb-cur"></span>';
  d.children[0].textContent=stamp();d.children[1].textContent=label;log.append(d);trim();await S(40);
  for(let i=1;i<=val.length;i++){d.children[2].textContent=val.slice(0,i);await S(delay)}await S(40);d.lastChild.remove()};
const hexLine=async ms=>{const d=document.createElement('div');d.className='nb-ln nb-hex';log.append(d);trim();const t0=performance.now();
  while(performance.now()-t0<ms){d.textContent='0x'+Array.from({length:8},()=>(Math.random()*65536|0).toString(16).padStart(4,'0')).join(' ');await S(45)}
  d.textContent='0x'+Array.from({length:8},()=>'····').join(' ')+'  OK';d.classList.add('done')};
const decrypt=async(el,final,ms=700)=>{if(RM){el.textContent=final;return}const G='01<>{}#$%&*/\\アカサ',t0=performance.now();
  await new Promise(res=>{(function f(n){if(leaving)return res();const p=Math.min(1,(n-t0)/ms);el.textContent=[...final].map((c,i)=>c===' '||i<p*final.length?c:G[Math.random()*G.length|0]).join('');p<1?requestAnimationFrame(f):res()})(t0)});el.textContent=final};

['click','keydown','touchstart'].forEach(ev=>addEventListener(ev,e=>{
  if(leaving||!e.isTrusted||document.getElementById('boot')!==boot)return;
  if(ev==='keydown'&&['Shift','Control','Alt','Meta','Tab'].includes(e.key))return;
  leave(true)},{passive:true}));

(async()=>{try{
  boot.classList.add('on');
  await S(seen?100:240);
  $('#nbAscii').classList.add('in');
  let hash='a3f9c21e07b4';try{const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(location.href+navigator.userAgent));hash=[...new Uint8Array(d)].slice(0,6).map(b=>b.toString(16).padStart(2,'0')).join('')}catch{}
  const LN0=[
    [L('Iniciando kernel aleix-sec 6.8.0','Starting kernel aleix-sec 6.8.0'),'[ OK ]','ok','KERNEL'],
    [L(`Hardware: ${cores} núcleos · ${mem} · ${screen.width}×${screen.height}`,`Hardware: ${cores} cores · ${mem} · ${screen.width}×${screen.height}`),'[ OK ]','ok','HW'],
    [L('Montando /dev/portfolio (cifrado)','Mounting /dev/portfolio (encrypted)'),'[ OK ]','ok','FS'],
    [L('Cargando reglas iptables · 42 activas','Loading iptables rules · 42 active'),'[ OK ]','ok','FIREWALL'],
    [L('Escaneando puertos: 22 80 443','Scanning ports: 22 80 443'),L('[ SEGURO ]','[ SECURE ]'),'ok','NMAP'],
    [L('Verificando integridad sha256:','Verifying integrity sha256:')+hash,'[ OK ]','ok','SHA256'],
    [L('Negociando túnel TLS 1.3','Negotiating TLS 1.3 tunnel'),'[ OK ]','ok','TLS']];
  const LN=seen?[LN0[0],LN0[6]]:[LN0[0],LN0[1],LN0[3],LN0[4],LN0[6]];
  for(let i=0;i<LN.length;i++){const[tx,tg,cl,lb]=LN[i];setP(Math.round((i+1)/LN.length*70),lb);await addLine(tx,tg,cl);await S(seen?15:35)}
  if(!seen){await S(60);
    await inputLine('login:','guest',22);
    await inputLine('password:','••••••••••',10);
    setP(80,'KEY');await addLine(L('Descifrando clave de sesión','Decrypting session key'));await hexLine(260)}
  setP(92,'AUTH');await addLine(L('Autenticando huella digital','Authenticating fingerprint'),'[ OK ]','ok');
  setP(100,L('ACCESO','ACCESS'));await addLine(L('Abriendo portfolio','Opening portfolio'),L('[ ACTIVO ]','[ ACTIVE ]'),'warn');
  await S(70);
}catch(e){}
  if(leaving)return;
  $('#nbGrant').classList.add('on');boot.classList.add('granted');
  try{await decrypt($('#nbG1'),$('#nbG1').dataset.t,seen?180:240);await S(seen?380:560)}catch(e){}
  leave();
})();
})();

/* =====================================================
   Fondo y entrada del hero
   ===================================================== */
/* Lluvia de caracteres del fondo */
(()=>{'use strict';
const bg=document.createElement('div');bg.id='cyBg';bg.setAttribute('aria-hidden','true');document.body.prepend(bg);
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const low=window.__pf&&__pf.low;
const build=()=>window.xRain(bg,{gap:low?56:42,center:.05,max:.34,min:10,span:10});build();
let w=innerWidth,h=innerHeight,t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(()=>{if(Math.abs(innerWidth-w)>80||innerHeight-h>120){w=innerWidth;h=innerHeight;build()}},300)});
})();

/* Entrada del hero y glitch del nombre */
(()=>{'use strict';
const root=document.documentElement;
const g=document.querySelector('.hero-name .glitch');if(g){g.dataset.text=g.textContent.trim();
 setInterval(()=>{if(document.hidden||(window.__pf&&!__pf.heroOn))return;g.classList.add('on');setTimeout(()=>g.classList.remove('on'),700)},5500)}
const go=()=>requestAnimationFrame(()=>root.classList.add('hero-in'));
window.xbootDone?go():addEventListener('xboot',go,{once:true});
setTimeout(go,21000);
})();

/* =====================================================
   Sobre mí, traducciones y menú
   ===================================================== */

const statData = {
  horas: {
    filename: 'perfil.json',
    content: `{\n  <span class="key">"nombre"</span>: <span class="str">"Aleix Crespo López"</span>,\n  <span class="key">"rol"</span>: <span class="str">"Técnico Informático"</span>,\n  <span class="key">"ubicación"</span>: <span class="str">"Barcelona, ES"</span>,\n  <span class="key">"formación"</span>: <span class="str">"ASIR @ Escola Pàlcam"</span>,\n  <span class="key">"apasionado_de"</span>: [\n    <span class="str">"redes"</span>, <span class="str">"soporte técnico"</span>,\n    <span class="str">"ciberseguridad"</span>, <span class="str">"sistemas"</span>\n  ],\n  <span class="key">"objetivo"</span>: <span class="str">"Seguir creciendo en el sector"</span>,\n  <span class="key">"disponible"</span>: <span style="color:var(--green)">TRUE</span>\n}`
  },
  idiomas: {
    filename: 'idiomas.json',
    content: `<span class="key">"IDIOMAS"</span>: <span class="stat-val2">03</span>,\n\n<span class="key">"listado"</span>: [\n  {\n    <span class="key">"idioma"</span>:  <span class="str">"Catalán"</span>,\n    <span class="key">"nivel"</span>:   <span class="str">"Nativo"</span>\n  },\n  {\n    <span class="key">"idioma"</span>:  <span class="str">"Castellano"</span>,\n    <span class="key">"nivel"</span>:   <span class="str">"Nativo"</span>\n  },\n  {\n    <span class="key">"idioma"</span>:  <span class="str">"Inglés"</span>,\n    <span class="key">"nivel"</span>:   <span class="str">"B1-B2 — Buena comprensión y conversación"</span>\n  }\n]`
  },
  formacion: {
    filename: 'formacion.log',
    content: `{\n  <span class="key">"centro"</span>: <span class="str">"Escola Pàlcam · Barcelona"</span>,\n\n  <span class="key">"ASIR"</span>: <span class="str">"2026 — 2028 ·</span> <span style="color:var(--red)">EN_CURSO</span><span class="str">"</span>,\n<span style="color:var(--muted)">    // Administración de Sistemas Informáticos en Red</span>\n<span style="color:var(--muted)">    // SO · Redes · Servicios · BBDD · Seguridad</span>\n  <span class="key">"SMX"</span>: <span class="str">"2024 — 2026 ·</span> <span style="color:var(--green)">Completado</span><span class="str">"</span>,\n<span style="color:var(--muted)">    // Sistemas Microinformáticos y Redes</span>\n<span style="color:var(--muted)">    // Hardware · SO · Redes locales · 515 h FCT</span>\n  <span class="key">"ESO"</span>: <span class="str">"2020 — 2024 ·</span> <span style="color:var(--green)">Completado</span><span class="str">"</span>\n<span style="color:var(--muted)">    // Educación Secundaria Obligatoria</span>\n<span style="color:var(--muted)">    // Tecnología · Matemáticas · Idiomas</span>\n}`
  },
  ingles: {
    filename: 'experiencia.json',
    content: `<span class="key">"EXPERIENCIA"</span>: <span class="stat-val2">"515h"</span>,\n\n<span class="key">"empresa"</span>: {\n  <span class="key">"nombre"</span>:      <span class="str">"Life Informàtica"</span>,\n  <span class="key">"tipo"</span>:        <span class="str">"Prácticas FCT"</span>,\n  <span class="key">"horas"</span>:       <span class="str">"515h"</span>,\n  <span class="key">"tareas"</span>: [\n    <span class="str">"Montaje de hardware"</span>,\n    <span class="str">"Reparación de equipos"</span>,\n    <span class="str">"Mantenimiento preventivo"</span>,\n    <span class="str">"Soporte técnico"</span>\n  ],\n  <span class="key">"estado"</span>:      <span style="color:var(--green)">COMPLETADO</span>\n}`
  },
  ciudad: {
    filename: 'contacto.cfg',
    content: `<span class="key">"CONTACTO"</span>: <span class="stat-val2">"ALEIX"</span>,\n\n<span class="key">"datos"</span>: {\n  <span class="key">"nombre"</span>:    <span class="str">"Aleix Crespo López"</span>,\n  <span class="key">"teléfono"</span>:  <span class="str">"+34 609 908 996"</span>,\n  <span class="key">"email"</span>:     <span class="str">"aleixcrespolopez@gmail.com"</span>,\n  <span class="key">"ciudad"</span>:    <span class="str">"Barcelona"</span>,\n  <span class="key">"cp"</span>:        <span class="str">"08025"</span>,\n}`
  }
};

const statDataEn = {
  horas: {
    filename: 'profile.json',
    content: `{\n  <span class="key">"name"</span>: <span class="str">"Aleix Crespo López"</span>,\n  <span class="key">"role"</span>: <span class="str">"IT Technician"</span>,\n  <span class="key">"location"</span>: <span class="str">"Barcelona, ES"</span>,\n  <span class="key">"education"</span>: <span class="str">"ASIR @ Escola Pàlcam"</span>,\n  <span class="key">"passionate_about"</span>: [\n    <span class="str">"networking"</span>, <span class="str">"hardware"</span>,\n    <span class="str">"cybersecurity"</span>, <span class="str">"systems"</span>\n  ],\n  <span class="key">"goal"</span>: <span class="str">"Keep growing in the industry"</span>,\n  <span class="key">"available"</span>: <span style="color:var(--green)">TRUE</span>\n}`
  },
  idiomas: {
    filename: 'languages.json',
    content: `<span class="key">"LANGUAGES"</span>: <span class="stat-val2">03</span>,\n\n<span class="key">"list"</span>: [\n  {\n    <span class="key">"language"</span>:  <span class="str">"Catalan"</span>,\n    <span class="key">"level"</span>:    <span class="str">"Native"</span>\n  },\n  {\n    <span class="key">"language"</span>:  <span class="str">"Spanish"</span>,\n    <span class="key">"level"</span>:    <span class="str">"Native"</span>\n  },\n  {\n    <span class="key">"language"</span>:  <span class="str">"English"</span>,\n    <span class="key">"level"</span>:    <span class="str">"B1-B2 — Good comprehension and conversation"</span>\n  }\n]`
  },
  formacion: {
    filename: 'education.log',
    content: `{\n  <span class="key">"school"</span>: <span class="str">"Escola Pàlcam · Barcelona"</span>,\n\n  <span class="key">"ASIR"</span>: <span class="str">"2026 — 2028 ·</span> <span style="color:var(--red)">IN_PROGRESS</span><span class="str">"</span>,\n<span style="color:var(--muted)">    // Network Computer Systems Administration</span>\n<span style="color:var(--muted)">    // OS · Networking · Services · DBs · Security</span>\n  <span class="key">"SMX"</span>: <span class="str">"2024 — 2026 ·</span> <span style="color:var(--green)">Completed</span><span class="str">"</span>,\n<span style="color:var(--muted)">    // Microcomputer Systems and Networks</span>\n<span style="color:var(--muted)">    // Hardware · OS · Local networks · 515 h FCT</span>\n  <span class="key">"ESO"</span>: <span class="str">"2020 — 2024 ·</span> <span style="color:var(--green)">Completed</span><span class="str">"</span>\n<span style="color:var(--muted)">    // Compulsory Secondary Education</span>\n<span style="color:var(--muted)">    // Technology · Maths · Languages</span>\n}`
  },
  ingles: {
    filename: 'experience.json',
    content: `<span class="key">"EXPERIENCE"</span>: <span class="stat-val2">"515h"</span>,\n\n<span class="key">"company"</span>: {\n  <span class="key">"name"</span>:         <span class="str">"Life Informàtica"</span>,\n  <span class="key">"type"</span>:         <span class="str">"FCT Internship"</span>,\n  <span class="key">"hours"</span>:        <span class="str">"515h"</span>,\n  <span class="key">"tasks"</span>: [\n    <span class="str">"Hardware assembly"</span>,\n    <span class="str">"Equipment repair"</span>,\n    <span class="str">"Preventive maintenance"</span>,\n    <span class="str">"Technical support"</span>\n  ],\n  <span class="key">"status"</span>:       <span style="color:var(--green)">COMPLETED</span>\n}`
  },
  ciudad: {
    filename: 'contact.cfg',
    content: `<span class="key">"CONTACT"</span>: <span class="stat-val2">"ALEIX"</span>,\n\n<span class="key">"details"</span>: {\n  <span class="key">"name"</span>:     <span class="str">"Aleix Crespo López"</span>,\n  <span class="key">"phone"</span>:    <span class="str">"+34 609 908 996"</span>,\n  <span class="key">"email"</span>:    <span class="str">"aleixcrespolopez@gmail.com"</span>,\n  <span class="key">"city"</span>:     <span class="str">"Barcelona"</span>,\n  <span class="key">"zip"</span>:      <span class="str">"08025"</span>,\n}`
  }
};

let activeStatRow = null;

function loadStatPanel(key, animate) {
  const terminal = document.getElementById('about-terminal-content');
  const filenameEl = document.getElementById('tb-filename');
  const data = (typeof currentLang !== 'undefined' && currentLang === 'en' ? statDataEn : statData)[key];
  filenameEl.textContent = data.filename;
  if (animate) {
    terminal.style.opacity = '0';
    setTimeout(() => {
      terminal.innerHTML = data.content;
      terminal.style.opacity = '1';
    }, 150);
  } else {
    terminal.innerHTML = data.content;
  }
}

document.querySelectorAll('.stat-clickable').forEach(row => {
  row.addEventListener('click', () => {
    const key = row.dataset.stat;

    if (activeStatRow === row) return;

    if (activeStatRow) activeStatRow.classList.remove('stat-active');
    row.classList.add('stat-active');
    activeStatRow = row;

    loadStatPanel(key, true);
  });
});

window._typingLines = [
  'cat SobreMi.txt',
  'ping AleixCrespo.es',
  'ssh aleix@portfolio.dev',
  'nmap -sV localhost',
  'cat .secreto  # ↑↑↓↓←→←→BA',
  'sudo hack --help',
  'git commit -m "A seguir aprendiendo"',
];
let li = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  if (document.hidden || (window.__pf && !__pf.heroOn)) { setTimeout(type, 600); return; }
  const lines = window._typingLines;
  const cur = lines[li % lines.length];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = cur.slice(0, --ci);
    if (ci === 0) { deleting = false; li = (li+1) % lines.length; }
  }
  setTimeout(type, deleting ? 35 : 75);
}
setTimeout(type, 3400);

const translations = {
  es: {
    boot_1: 'ALEIX_OS v2.4.1 — Iniciando entorno seguro...',
    boot_6: 'Bienvenido. Acceso Validado.',
    nav_about: './Sobre Mí',
    nav_projects: './Proyectos',
    nav_education: './Educación',
    nav_experience: './Experiencia',
    nav_contact: './Contacto',
    nav_cert: './Certificados',
    sec_label_cert: 'ls -la ~/certs/',
    sec_title_cert: 'CERTIFICACIONES.CRT',
    tag1: 'ESTUDIANTE_SMX',
    tag2: 'ESTUDIANTE_ASIR',
    tag3: 'TÉCNICO INFORMÁTICO',
    hero_sub: 'Apasionado de la informática · Con ganas de creecer en el ambito profesional',
    btn_cv: './Curriculum',
    photo_label: 'ID: ALEIX_CRESPO · EDAD: 18 AÑOS',
    sec_label_about: 'cat SobreMi.txt',
    sec_title_about: 'Aleix.exe',
    stat1: 'PERFIL', stat2: 'FORMACIÓN', stat3: 'EXPERIENCIA', stat4: 'IDIOMAS', stat5: 'CONTACTO',
    sec_label_proj: 'ls -la proyectos/',
    sec_title_proj: 'PROYECTOS.DAT',
    proj1_name: 'RED DE UN CIBERCAFE EN PACKET TRACER',
    proj2_name: 'MONTAJE DE HARDWARE',
    proj3_name: 'PROXIMAMENTE',
    tag_soon: 'PROXIMAMENTE',
    btn_preview: 'PREVIEW',
    btn_download: 'DESCARGAR',
    proj1_tags: ['CIBERCAFE', 'VLAN', 'VTP', 'REGLAS ACL', 'ROUTER RIP'],
    proj2_tags: ['Gaming PC', 'Servidores Rack', 'Ofimáticos', 'Reparaciones'],
    sec_label_edu: 'cat /var/log/Formación.log',
    sec_title_edu: 'FORMACIÓN.LOG',
    edu1_title: 'ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS EN RED (ASIR)',
    edu1_school: '> Escola Pàlcam · Barcelona · ',
    edu1_status: 'En curso',
    edu2_title: 'SISTEMAS MICROINFORMÁTICOS Y REDES (SMX)',
    edu2_school: '> Escola Pàlcam · Barcelona · ',
    edu2_status: 'Completado',
    edu3_title: 'EDUCACIÓN SECUNDARIA OBLIGATORIA (ESO)',
    edu3_school: '> Escola Pàlcam · Barcelona · Completado',
    sec_label_exp: 'cat experiencia.sh',
    sec_title_exp: 'EXPERIENCIA_LABORAL.SH',
    exp_meta: 'Prácticas profesionales · FCT',
    exp_hours_label: '// HORAS REGISTRADAS',
    task1: 'montaje_hardware.sh — Montaje y ensamblaje de equipos informáticos',
    task2: 'reparacion.sh — Reparación y diagnóstico de equipos averiados',
    task3: 'mantenimiento.sh — Mantenimiento preventivo y correctivo de sistemas',
    task4: 'soporte_tecnico.sh — Atención y soporte técnico a clientes',
    sec_label_lang: 'locale -a',
    sec_title_lang: 'IDIOMAS.CFG',
    lang1_full: 'CATALÀ — NATIU', lang1_pct: 'LEVEL: C2 · 100%',
    lang2_full: 'CASTELLANO — NATIVO', lang2_pct: 'LEVEL: C2 · 100%',
    lang3_full: 'ENGLISH — GOOD LEVEL', lang3_pct: 'LEVEL: B1-B2 · Comprensión y conversación fluidas',
    sec_label_contact: './contacto.sh --init',
    sec_title_contact: 'CONTACTO.SH',
    contact_cta: '¿HABLAMOS?',
    contact_sub: 'Disponible para trabajar, colaboraciones y oportunidades en el mundo de la ciberseguridad y sistemas.',
    ci_nombre_label: 'NOMBRE', ci_tel_label: 'TELÉFONO', ci_email_label: 'EMAIL',
    ci_linkedin_label: 'LINKEDIN', ci_location_label: 'UBICACIÓN',
    ci_location_val: 'Barcelona, España · CP 08025',
    footer_copy: '© 2026 Aleix Crespo López · ASIR',
    footer_status: 'STATUS: [ACTIVO]',
    typing_commit: 'git commit -m "A seguir aprendiendo"',
  },
  en: {
    boot_1: 'ALEIX_OS v2.4.1 — Booting secure environment...',
    boot_6: 'Welcome. Access Validated.',
    nav_about: './About Me',
    nav_projects: './Projects',
    nav_education: './Education',
    nav_experience: './Experience',
    nav_contact: './Contact',
    nav_cert: './Certificates',
    sec_label_cert: 'ls -la ~/certs/',
    sec_title_cert: 'CERTIFICATIONS.CRT',
    tag1: 'SMX_STUDENT',
    tag2: 'ASIR_STUDENT',
    tag3: 'IT TECHNICIAN',
    hero_sub: 'Passionate about IT · Eager to grow professionally',
    btn_cv: './Resume',
    photo_label: 'ID: ALEIX_CRESPO · AGE: 18 YEARS',
    sec_label_about: 'cat AboutMe.txt',
    sec_title_about: 'Aleix.exe',
    stat1: 'PROFILE', stat2: 'EDUCATION', stat3: 'EXPERIENCE', stat4: 'LANGUAGES', stat5: 'CONTACT',
    sec_label_proj: 'ls -la projects/',
    sec_title_proj: 'PROJECTS.DAT',
    proj1_name: 'CYBERCAFE NETWORK IN PACKET TRACER',
    proj2_name: 'HARDWARE ASSEMBLY',
    proj3_name: 'COMING SOON',
    tag_soon: 'COMING SOON',
    btn_preview: 'PREVIEW',
    btn_download: 'DOWNLOAD',
    proj1_tags: ['CYBERCAFE', 'VLAN', 'VTP', 'ACL RULES', 'RIP ROUTER'],
    proj2_tags: ['Gaming PC', 'Rack Servers', 'Office PCs', 'Repairs'],
    sec_label_edu: 'cat /var/log/Education.log',
    sec_title_edu: 'EDUCATION.LOG',
    edu1_title: 'NETWORK COMPUTER SYSTEMS ADMINISTRATION (ASIR)',
    edu1_school: '> Escola Pàlcam · Barcelona · ',
    edu1_status: 'In progress',
    edu2_title: 'MICROCOMPUTER SYSTEMS AND NETWORKS (SMX)',
    edu2_school: '> Escola Pàlcam · Barcelona · ',
    edu2_status: 'Completed',
    edu3_title: 'COMPULSORY SECONDARY EDUCATION (ESO)',
    edu3_school: '> Escola Pàlcam · Barcelona · Completed',
    sec_label_exp: 'cat experience.sh',
    sec_title_exp: 'WORK_EXPERIENCE.SH',
    exp_meta: 'Professional internship · FCT',
    exp_hours_label: '// REGISTERED HOURS',
    task1: 'hardware_assembly.sh — Assembly and setup of computer equipment',
    task2: 'repair.sh — Repair and diagnosis of faulty equipment',
    task3: 'maintenance.sh — Preventive and corrective system maintenance',
    task4: 'tech_support.sh — Technical support and customer assistance',
    sec_label_lang: 'locale -a',
    sec_title_lang: 'LANGUAGES.CFG',
    lang1_full: 'CATALAN — NATIVE', lang1_pct: 'LEVEL: C2 · 100%',
    lang2_full: 'SPANISH — NATIVE', lang2_pct: 'LEVEL: C2 · 100%',
    lang3_full: 'ENGLISH — GOOD LEVEL', lang3_pct: 'LEVEL: B1-B2 · Fluent comprehension and conversation',
    sec_label_contact: './contact.sh --init',
    sec_title_contact: 'CONTACT.SH',
    contact_cta: 'LET\'S TALK?',
    contact_sub: 'Available for work, collaborations and opportunities in the world of cybersecurity and systems.',
    ci_nombre_label: 'NAME', ci_tel_label: 'PHONE', ci_email_label: 'EMAIL',
    ci_linkedin_label: 'LINKEDIN', ci_location_label: 'LOCATION',
    ci_location_val: 'Barcelona, Spain · ZIP 08025',
    footer_copy: '© 2026 Aleix Crespo López · ASIR',
    footer_status: 'STATUS: [ACTIVE]',
    typing_commit: 'git commit -m "Keep on learning"',
  }
};

let currentLang = 'es';

function applyTranslation(lang) {
  const t = translations[lang];
  currentLang = lang;

  const thumb = document.getElementById('langThumb');
  const flagEs = document.querySelector('.flag-es');
  const flagEn = document.querySelector('.flag-en');
  if (lang === 'en') {
    thumb.classList.add('en');
    flagEs.classList.remove('active-flag');
    flagEn.classList.add('active-flag');
  } else {
    thumb.classList.remove('en');
    flagEs.classList.add('active-flag');
    flagEn.classList.remove('active-flag');
  }

  document.documentElement.lang = lang;

  function setText(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  }
  function setHTML(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = val;
  }

  const navLinks = document.querySelectorAll('.topbar-right a');
  const navKeys = ['nav_about','nav_education','nav_cert','nav_experience','nav_projects','nav_contact'];
  navLinks.forEach((a, i) => { if (navKeys[i]) a.textContent = t[navKeys[i]]; });

  const tags = document.querySelectorAll('.hero-role .tag');
  if (tags[0]) tags[0].textContent = t.tag1;
  if (tags[1]) tags[1].textContent = t.tag2;
  if (tags[2]) tags[2].textContent = t.tag3;

  const heroSub = document.querySelector('.hero-role span[style]');
  if (heroSub) heroSub.textContent = t.hero_sub;

  const cvBtn = document.querySelector('.btn span');
  if (cvBtn) cvBtn.innerHTML = cvBtn.innerHTML.replace(/\.\/Curriculum|\.\/Resume/, t.btn_cv);

  const photoLabel = document.querySelector('.photo-label');
  if (photoLabel) photoLabel.textContent = t.photo_label;

  const secLabels = document.querySelectorAll('.sec-label');
  const secTitles = document.querySelectorAll('.sec-title');
  const sectionOrder = [
    { label: 'sec_label_about', title: 'sec_title_about' },
    { label: 'sec_label_edu', title: 'sec_title_edu' },
    { label: 'sec_label_cert', title: 'sec_title_cert' },
    { label: 'sec_label_exp', title: 'sec_title_exp' },
    { label: 'sec_label_lang', title: 'sec_title_lang' },
    { label: 'sec_label_proj', title: 'sec_title_proj' },
    { label: 'sec_label_contact', title: 'sec_title_contact' },
  ];
  sectionOrder.forEach(({ label, title }, i) => {
    if (secLabels[i]) {
      secLabels[i].dataset.full = t[label];
      if (!secLabels[i].dataset.pending) secLabels[i].textContent = t[label];
    }
    if (secTitles[i]) secTitles[i].textContent = t[title];
  });

  const statKeys = document.querySelectorAll('.stat-key');
  const statLabels = ['stat1','stat2','stat3','stat4','stat5'];
  statKeys.forEach((el, i) => { if (statLabels[i]) el.textContent = t[statLabels[i]]; });

  const projNames = document.querySelectorAll('.skill-name');
  if (projNames[0]) projNames[0].textContent = t.proj1_name;
  if (projNames[1]) projNames[1].textContent = t.proj2_name;
  if (projNames[2]) projNames[2].textContent = t.proj3_name;

  document.querySelectorAll('.skill-tag').forEach(el => {
    if (el.textContent === 'PROXIMAMENTE' || el.textContent === 'COMING SOON') {
      el.textContent = t.tag_soon;
    }
  });

  document.querySelectorAll('.project-btn span').forEach(el => {
    if (el.textContent === 'PREVIEW') el.textContent = t.btn_preview;
    if (el.textContent === 'DESCARGAR' || el.textContent === 'DOWNLOAD') el.textContent = t.btn_download;
  });

  const skillPanels = document.querySelectorAll('.skill-panel');
  if (skillPanels[0]) {
    const tags = skillPanels[0].querySelectorAll('.skill-tag');
    t.proj1_tags.forEach((tag, i) => { if (tags[i]) tags[i].textContent = tag; });
  }
  if (skillPanels[1]) {
    const tags = skillPanels[1].querySelectorAll('.skill-tag');
    t.proj2_tags.forEach((tag, i) => { if (tags[i]) tags[i].textContent = tag; });
  }

  const tlTitles = document.querySelectorAll('.tl-title');
  if (tlTitles[0]) tlTitles[0].textContent = t.edu1_title;
  if (tlTitles[1]) tlTitles[1].textContent = t.edu2_title;
  if (tlTitles[2]) tlTitles[2].textContent = t.edu3_title;

  const tlSchools = document.querySelectorAll('.tl-school');
  if (tlSchools[0]) {
    tlSchools[0].innerHTML = t.edu1_school + '<span style="color:var(--red);">' + t.edu1_status + '</span>';
  }
  if (tlSchools[1]) {
    tlSchools[1].innerHTML = t.edu2_school + '<span style="color:var(--green);">' + t.edu2_status + '</span>';
  }
  if (tlSchools[2]) {
    tlSchools[2].textContent = t.edu3_school;
  }

  const expMeta = document.querySelector('.exp-meta');
  if (expMeta) {
    const badges = expMeta.querySelectorAll('.badge');
    expMeta.childNodes[0].textContent = t.exp_meta + ' ';
  }
  const expHoursLabel = document.querySelector('.exp-h-label');
  if (expHoursLabel) expHoursLabel.textContent = t.exp_hours_label;

  const taskItems = document.querySelectorAll('.task-item');
  const taskKeys = ['task1','task2','task3','task4'];
  taskItems.forEach((el, i) => {
    if (!taskKeys[i]) return;
    const name = el.querySelector('.task-name');
    if (name) name.textContent = t[taskKeys[i]];
    const cmd = el.querySelector('.td-cmd');
    if (cmd) cmd.textContent = '$ cat ' + t[taskKeys[i]].split(' ')[0].replace('.sh', '.log');
  });

  const langFulls = document.querySelectorAll('.lang-full');
  const langPcts = document.querySelectorAll('.lang-pct');
  if (langFulls[0]) langFulls[0].textContent = t.lang1_full;
  if (langFulls[1]) langFulls[1].textContent = t.lang2_full;
  if (langFulls[2]) langFulls[2].textContent = t.lang3_full;
  if (langPcts[0]) langPcts[0].textContent = t.lang1_pct;
  if (langPcts[1]) langPcts[1].textContent = t.lang2_pct;
  if (langPcts[2]) langPcts[2].textContent = t.lang3_pct;



  const contactCta = document.querySelector('.contact-cta');
  if (contactCta) contactCta.textContent = t.contact_cta;
  const contactSub = document.querySelector('.contact-sub');
  if (contactSub) {
    contactSub.innerHTML = t.contact_sub + '<br><br><span style="color:var(--green);">$ </span>ping aleix@crespo --message "' + (lang === 'es' ? 'hola' : 'hello') + '"';
  }

  const contactItems = document.querySelectorAll('.contact-item');
  const ciLabelKeys = ['ci_nombre_label','ci_tel_label','ci_email_label','ci_linkedin_label','ci_location_label'];
  contactItems.forEach((item, i) => {
    if (!ciLabelKeys[i]) return;
    const labelEl = item.querySelector('.ci-label');
    if (labelEl) labelEl.textContent = t[ciLabelKeys[i]];
  });

  const locationItem = document.querySelectorAll('.contact-item')[4];
  if (locationItem) {
    const locDiv = locationItem.querySelector('div');
    if (locDiv) {
      const locLabel = locDiv.querySelector('.ci-label');
      if (locLabel) locLabel.textContent = t.ci_location_label;
      locDiv.childNodes.forEach(n => {
        if (n.nodeType === 3) n.textContent = t.ci_location_val;
      });
    }
  }

  const fCopy = document.querySelector('footer .f-copy');
  if (fCopy) fCopy.textContent = t.footer_copy;

  
  window._typingLines = lang === 'en' ? [
    'cat AboutMe.txt',
    'ping AleixCrespo.es',
    'ssh aleix@portfolio.dev',
    'nmap -sV localhost',
    'cat .secret  # ↑↑↓↓←→←→BA',
    'sudo hack --help',
    'git commit -m "Keep on learning"',
  ] : [
    'cat SobreMi.txt',
    'ping AleixCrespo.es',
    'ssh aleix@portfolio.dev',
    'nmap -sV localhost',
    'cat .secreto  # ↑↑↓↓←→←→BA',
    'sudo hack --help',
    'git commit -m "A seguir aprendiendo"',
  ];

  document.body.classList.toggle('lang-en', lang === 'en');
  document.querySelectorAll('.mobile-nav a[data-es][data-en]').forEach(a => { a.textContent = lang === 'en' ? a.dataset.en : a.dataset.es; });
  document.querySelectorAll('.stat-clickable').forEach(r => { r.title = lang === 'en' ? 'Click for more info' : 'Click para más info'; });
  const hbg = document.getElementById('hamburger'); if (hbg) hbg.setAttribute('aria-label', lang === 'en' ? 'Menu' : 'Menú');

  document.querySelectorAll('.exp-meta .badge').forEach(bg => {
    if (/VERIFICAD|VERIFIED/.test(bg.textContent)) bg.textContent = lang === 'en' ? 'VERIFIED' : 'VERIFICADO';
  });
  const expPath = document.querySelector('.exp-term-bar .path');
  if (expPath) expPath.textContent = lang === 'en' ? '~/experience/life-informatica' : '~/experiencia/life-informatica';

  if (activeStatRow) {
    loadStatPanel(activeStatRow.dataset.stat, false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const flagEs = document.querySelector('.flag-es');
  flagEs.classList.add('active-flag');

  document.getElementById('langToggle').addEventListener('click', () => {
    applyTranslation(currentLang === 'es' ? 'en' : 'es');
  });

  const firstStatRow = document.querySelector('.stat-clickable[data-stat="horas"]');
  if (firstStatRow) {
    firstStatRow.classList.add('stat-active');
    activeStatRow = firstStatRow;
    loadStatPanel('horas', false);
  }
});

(function(){
  const plan = [
    ['#sobre-mi .terminal-block', 'up',    0],
    ['#sobre-mi .stat-row',       'right', .08],
    ['.tl-item',                  'left',  .12],
    ['.exp-terminal',             'crt',   0],
    ['.task-item',                'left',  .09],
    ['.lang-panel',               'zoom',  .1],
    ['.skill-panel',              'flip',  .12],
  ];
  const els = [];
  plan.forEach(([sel, fx, step]) => document.querySelectorAll(sel).forEach(el => {
    const i = [...el.parentElement.children].indexOf(el);
    el.classList.add('rv');
    el.dataset.rv = fx === 'alt' ? (i % 2 ? 'right' : 'left') : fx;
    el.style.setProperty('--rv-d', (i * step + (fx === 'alt' ? Math.floor(i / 2) * .05 : 0)).toFixed(2) + 's');
    els.push(el);
  }));
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; el.classList.add('in'); obs.unobserve(el);
    setTimeout(() => { el.style.setProperty('--rv-d', '0s'); el.classList.add('rv-done'); }, 1200 + parseFloat(getComputedStyle(el).getPropertyValue('--rv-d') || 0) * 1000);
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
  const sweep = () => { const vh = innerHeight; els.forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * 1.05) el.classList.add('in'); }); };
  let q = 0; addEventListener('scroll', () => { if (!q) q = setTimeout(() => { q = 0; sweep(); }, 250); }, { passive: true });
  addEventListener('xboot', () => setTimeout(sweep, 1500)); setTimeout(sweep, 6000);
})();

/* Menú hamburguesa (móvil) */
(function(){
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function(e){
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  document.addEventListener('click', function(e){
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)){
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });

  function syncMobileNavLang(){
    const isEn = document.body.classList.contains('lang-en');
    mobileNav.querySelectorAll('a[data-es][data-en]').forEach(function(a){
      a.textContent = isEn ? a.dataset.en : a.dataset.es;
    });
  }
  const langObs = new MutationObserver(syncMobileNavLang);
  langObs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();

/* =====================================================
   Hero: radar, cursor e inclinación
   ===================================================== */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;
const TH={green:'#00ff41',amber:'#ffb000',cyan:'#00e5ff',violet:'#d070ff',root:'#ff3c3c'};
function theme(n){const h=TH[n];if(!h)return false;const s=document.documentElement.style;window._g=h;
 s.setProperty('--green',h);s.setProperty('--green2',h);s.setProperty('--border',h+'33');s.setProperty('--border2',h+'66');
 s.setProperty('--green-glow',`0 0 8px ${h},0 0 20px ${h}66`);try{localStorage.xth=n}catch{}return true}
try{if(localStorage.xth&&localStorage.xth!=='root')theme(localStorage.xth)}catch{}
function toast(m){const d=document.createElement('div');d.className='xtoast';d.textContent=m;document.body.append(d);setTimeout(()=>d.remove(),3000)}

const G='01<>{}[]#$%&*/|';
function scramble(el,ms=700){const txt=el.textContent;if(RM)return;const t0=performance.now();
 (function f(n){const p=Math.min(1,(n-t0)/ms);el.textContent=[...txt].map((c,i)=>c===' '||i<p*txt.length?c:G[Math.random()*G.length|0]).join('');p<1?requestAnimationFrame(f):el.textContent=txt})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){scramble(e.target);io.unobserve(e.target)}}),{threshold:.6});
$$('.sec-title').forEach(t=>io.observe(t));
const onBoot=f=>window.xbootDone?f():addEventListener('xboot',()=>setTimeout(f,100),{once:true});
onBoot(()=>$$('.hero-name>div').forEach((d,i)=>setTimeout(()=>scramble(d,900),i*250)));

$$('.skill-panel').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
 el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');el.style.transform=`perspective(700px) rotateX(${(.5-y)*6}deg) rotateY(${(x-.5)*8}deg)`});
 el.addEventListener('mouseleave',()=>el.style.transform='')});

let rootT=0;
function rootMode(){if(document.documentElement.classList.contains('root-mode'))return;
 const r=document.documentElement,s=r.style;theme('root');s.setProperty('--hov','#ff3c3c88');s.setProperty('--wa','#ff3c3c');r.classList.add('root-mode');
 document.body.classList.add('xroot');setTimeout(()=>document.body.classList.remove('xroot'),1100);
 // aviso con cuenta atrás; a los 8 s vuelve todo a verde
 const d=document.createElement('div');d.className='xtoast xroot-toast';document.body.append(d);let n=5;
 const paint=()=>{d.innerHTML=`<b>ROOT ACCESS GRANTED</b><span>${L('modo root','root mode')} · ${n}s</span><i style="transform:scaleX(${n/5})"></i>`};paint();
 clearInterval(rootT);rootT=setInterval(()=>{n--;paint();if(n<=0){clearInterval(rootT);
  ['--green','--green2','--border','--border2','--green-glow','--hov','--wa'].forEach(p=>s.removeProperty(p));window._g=undefined;
  try{localStorage.removeItem('xth')}catch{}r.classList.remove('root-mode');d.innerHTML=`<b>${L('SESIÓN ROOT CERRADA','ROOT SESSION CLOSED')}</b>`;setTimeout(()=>d.remove(),1800)}},1000)}
const KON='ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a'.split(',');let kp=0;
addEventListener('keydown',e=>{kp=e.key===KON[kp]?kp+1:+(e.key===KON[0]);if(kp===KON.length){kp=0;rootMode()}});

const cvA=$('.hero-btns a');
const sync=()=>{cvA.href=en()?'img/cvAleix_EN.pdf':'img/cvAleix.pdf';};
sync();$('#langToggle').addEventListener('click',()=>setTimeout(sync,0));

// Radar alrededor de la foto
const fr=$('.photo-frame'),wrap=fr&&fr.parentElement;
if(fr){const rc=document.createElement('canvas');rc.className='xradar';const sw=document.createElement('div');sw.className='xradar xsweep';fr.prepend(sw);fr.prepend(rc);const rx=rc.getContext('2d');
 const SK=['WinServer','AD','Redes','Firewalls','Kali','Nmap','Osint','CyberSec'],bl=SK.map((s,i)=>({s,a:i/SK.length*Math.PI*2+.5,o:(i%2)*14}));
 let S=0,hot=false;const TAU=Math.PI*2;
 const draw=()=>{const d=Math.min(devicePixelRatio||1,window.__pf?__pf.dpr:2);S=rc.clientWidth;if(!S)return;rc.width=rc.height=S*d;rx.setTransform(d,0,0,d,0,0);
  const lt=document.documentElement.dataset.theme==='light',g=lt?'#007a35':(window._g||'#00ff66'),A=lt?['77','44','bb','ff']:['44','22','88','cc'],c=S/2,k=S/500,ph=fr.offsetWidth/2;rx.clearRect(0,0,S,S);
  rx.lineWidth=1;[.62,.8,.98].forEach(f=>{rx.strokeStyle=g+A[0];rx.beginPath();rx.arc(c,c,c*f,0,TAU);rx.stroke()});
  rx.strokeStyle=g+A[1];rx.beginPath();rx.moveTo(c,0);rx.lineTo(c,S);rx.moveTo(0,c);rx.lineTo(S,c);rx.stroke();
  rx.strokeStyle=g+A[2];rx.beginPath();for(let n=0;n<72;n++){const a=n/72*TAU,L2=(n%6?4:9)*k+2;rx.moveTo(c+Math.cos(a)*c*.98,c+Math.sin(a)*c*.98);rx.lineTo(c+Math.cos(a)*(c*.98-L2),c+Math.sin(a)*(c*.98-L2))}rx.stroke();
  rx.font=`${Math.max(8,10*k)}px 'Share Tech Mono',monospace`;
  bl.forEach(b=>{const cs=Math.cos(b.a),sn=Math.sin(b.a),bd=ph/Math.max(Math.abs(cs),Math.abs(sn)),r=Math.min(c*.93,bd+(24+b.o)*k),x=c+cs*r,y=c+sn*r;
   rx.fillStyle=g+A[3];rx.beginPath();rx.arc(x,y,3,0,TAU);rx.fill();
   const w=rx.measureText(b.s).width,right=cs>0&&x+7+w<S-2;rx.textAlign=right||(cs<=0&&x-7-w<2)?'left':'right';rx.fillText(b.s,x+(rx.textAlign==='left'?7:-7),y+3)})};
 window.whenIdle(draw);(document.fonts&&document.fonts.ready||Promise.resolve()).then(()=>window.whenIdle(draw));
 {let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(draw,150)})}
 addEventListener('xtheme',draw);
 if(!RM&&matchMedia('(pointer:fine)').matches){const hr=$('.hero-right'),R0=.78;
  hr.addEventListener('mousemove',e=>{const r=hr.getBoundingClientRect(),
   cx=r.left+wrap.offsetLeft+wrap.offsetWidth/2,cy=r.top+wrap.offsetTop+wrap.offsetHeight/2,
   R=S/2*R0,dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy);
   hot=d<R;fr.classList.toggle('hot',hot);if(!hot){wrap.style.transform='';return}
   const k=Math.min(1,(R-d)/(R*.3));
   wrap.style.transform=`perspective(900px) rotateX(${-dy/R*16*k}deg) rotateY(${dx/R*22*k}deg) scale(${1+.04*k})`})}
 $('.hero-right').addEventListener('mouseleave',()=>{hot=false;fr.classList.remove('hot');wrap.style.transform=''})}

// Cursor: punto + mira de 4 esquinas que se "fija" en enlaces, botones e imágenes
if(matchMedia('(pointer:fine)').matches&&!RM){document.documentElement.classList.add('xcur');
 const dot=document.createElement('div');dot.id='xc';
 const fr=document.createElement('div');fr.id='xt';fr.innerHTML='<div class="xt-in"><span class="c1"></span><span class="c2"></span><span class="c3"></span><span class="c4"></span><b class="xt-l"></b></div>';
 const rip=document.createElement('div');rip.id='xr';document.body.append(fr,dot,rip);
 const lab=fr.querySelector('.xt-l');
 const IMG='.cert-thumb,#pfoto';
 const LOCK='a,button,select,summary,.cr-btn,.cr-nav,.lang-toggle-wrap,.x-more,[role=button],'+IMG;
 const BIG='.skill-panel,.stat-row,.tl-head,.task-head,.lang-panel,.contact-item';
 const TXT='p,h1,h2,h3,h4,li,dd,dt,label,code,pre,em,b,strong,a,button,.tag,.prompt,.typing-line,.sec-label,.photo-label,img,svg,input';
 const S=28;let mx=-100,my=-100,cx=-100,cy=-100,cw=S,ch=S,tx=0,ty=0,tw=S,th=S,lockEl=null,raf=0,hq=0,rel=0;
 const kind=el=>{if(el.matches(IMG))return'ZOOM';if(el.tagName==='A')return el.getAttribute('href')?.startsWith('#')?'GOTO':'LINK';
  if(el.matches('.lang-toggle-wrap'))return'LANG';return'EXEC'};
 const target=()=>{if(lockEl&&lockEl.isConnected){const r=lockEl.getBoundingClientRect(),p=lockEl.matches(IMG)?3:5;tx=r.left-p;ty=r.top-p;tw=r.width+p*2;th=r.height+p*2}
  else{tx=mx-S/2;ty=my-S/2;tw=S;th=S}};
 // ¿hay texto en ese punto? (para no pisarlo con la etiqueta)
 const busy=(x,y,up)=>{if((up&&y<52)||y<2||y>innerHeight-4)return true;const e=document.elementFromPoint(x,y);if(!e||e===document.body||e===document.documentElement)return false;
  if(lockEl&&(lockEl.contains(e)))return true;
  return !!e.closest(TXT)||[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())};
 const placeLabel=()=>{if(!lockEl)return;const r=lockEl.getBoundingClientRect(),w=lab.offsetWidth||60,xs=[r.left+6,r.left+w/2,r.left+w-4];
  const up=xs.some(x=>busy(x,r.top-4,true)||busy(x,r.top-12,true)||busy(x,r.top-21,true)),down=xs.some(x=>busy(x,r.bottom+4,false)||busy(x,r.bottom+12,false)||busy(x,r.bottom+21,false));fr.classList.toggle('lb-down',up&&!down)};
 const loop=()=>{target();
  if(lockEl){const k=.3;cx+=(tx-cx)*k;cy+=(ty-cy)*k}
  else if(performance.now()-rel<220){const k=.45;cx+=(tx-cx)*k;cy+=(ty-cy)*k}
  else{cx=tx;cy=ty} // libre: la mira va pegada al punto, sin retraso
  const ks=.3;cw+=(tw-cw)*ks;ch+=(th-ch)*ks;
  fr.style.transform=`translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;fr.style.width=cw.toFixed(1)+'px';fr.style.height=ch.toFixed(1)+'px';
  if(Math.abs(tx-cx)+Math.abs(ty-cy)+Math.abs(tw-cw)+Math.abs(th-ch)>.4)raf=requestAnimationFrame(loop);else raf=0};
 const kick=()=>{if(!raf)raf=requestAnimationFrame(loop)};
 const hit=()=>{hq=0;const t=document.elementFromPoint(mx,my);
  if(t&&t.closest('input,textarea,[contenteditable]')){fr.className='txt';dot.className='txt';if(lockEl)rel=performance.now();lockEl=null;kick();return}
  dot.className='';const l=t&&t.closest(LOCK),r=l&&l.getBoundingClientRect();
  if(l&&(l.matches(IMG)||(r.width<=560&&r.height<=240))){if(lockEl!==l){lockEl=l;lab.textContent=`[ ${kind(l)} ]`}fr.className='lock'+(l.matches(IMG)?' img':'');placeLabel()}
  else{if(lockEl)rel=performance.now();lockEl=null;fr.className=t&&t.closest(BIG)?'act':''}
  kick()};
 addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate3d(${mx}px,${my}px,0)`;
  if(!hq)hq=setTimeout(hit,40);kick()},{passive:true});
 addEventListener('scroll',()=>{if(!hq)hq=setTimeout(hit,120);kick()},{passive:true});
 document.addEventListener('mouseleave',()=>document.documentElement.classList.add('xc-out'));
 document.addEventListener('mouseenter',()=>document.documentElement.classList.remove('xc-out'));
 addEventListener('mousedown',()=>{fr.classList.add('dn');rip.style.transform=`translate3d(${mx}px,${my}px,0)`;rip.classList.remove('go');void rip.offsetWidth;rip.classList.add('go')});
 addEventListener('mouseup',()=>fr.classList.remove('dn'))}

// Terminal del hero
{const tw=$('.term-window');if(tw&&!RM&&matchMedia('(pointer:fine)').matches){
 const w=document.createElement('div');w.className='term-wrap';tw.before(w);w.append(tw);
 const FULL=.7,END=.97;
 w.addEventListener('mousemove',e=>{const r=w.getBoundingClientRect(),
  nx=(e.clientX-(r.left+r.width/2))/(r.width/2),ny=(e.clientY-(r.top+r.height/2))/(r.height/2),m=Math.max(Math.abs(nx),Math.abs(ny));
  if(m>=END){tw.style.transform='';return}
  const k=m<=FULL?1:(END-m)/(END-FULL);
  tw.style.transform=`perspective(900px) rotateX(${-ny*8*k}deg) rotateY(${nx*10*k}deg) scale(${1+.02*k})`});
 w.addEventListener('mouseleave',()=>{tw.style.transform=''})}}
})();

/* =====================================================
   Animaciones de las secciones
   ===================================================== */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
document.documentElement.classList.add('xs');

const once=(els,fn,th=.35)=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);fn(e.target)}}),{threshold:th});(els.forEach?els:[els]).forEach(el=>el&&io.observe(el))};

// Títulos de sección
$$('.sec-label').forEach(l=>{l.dataset.full=l.textContent;if(RM)return;l.textContent='';l.dataset.pending='1';
 once(l,async el=>{delete el.dataset.pending;const t=el.dataset.full;el.textContent='';
  const c=document.createElement('span');c.className='xcaret';el.append(c);
  for(const ch of t){if(el.dataset.full!==t){el.textContent=el.dataset.full;return}
   c.before(ch);await sleep(22)}
  setTimeout(()=>c.remove(),900)},.6)});
once($$('.sec-title'),el=>el.classList.add('x-in'),.6);

// Sobre mí
{const pre=$('#about-terminal-content');if(pre){
 const wipe=()=>{pre.classList.remove('x-wipe');void pre.offsetWidth;pre.classList.add('x-wipe')};
 let busy=false;new MutationObserver(()=>{if(busy)return;busy=true;wipe();setTimeout(()=>busy=false,50)}).observe(pre,{childList:true});
 once(pre,wipe,.3)}}

// Formación
{const tl=$('.timeline');if(tl){const items=$$('.tl-item',tl);let top=0,hgt=1,tops=[],vh=innerHeight,last=-1,near=true;
 const measure=()=>{const y=scrollY,r=tl.getBoundingClientRect();top=r.top+y;hgt=r.height||1;tops=items.map(it=>it.getBoundingClientRect().top+y);vh=innerHeight;last=-1;upd()};
 const upd=()=>{if(!near)return;const reach=scrollY+vh*.65,p=Math.max(0,Math.min(1,(reach-top)/hgt));if(Math.abs(p-last)<.002)return;last=p;
  tl.style.setProperty('--tl',RM?1:p.toFixed(3));items.forEach((it,i)=>it.classList.toggle('x-on',RM||tops[i]<reach))};
 let q=0;addEventListener('scroll',()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;upd()})},{passive:true});
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(measure,150)});
 if('ResizeObserver' in window){let mt;new ResizeObserver(()=>{clearTimeout(mt);mt=setTimeout(measure,80)}).observe(document.body)}
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{near=es[0].isIntersecting;if(near)upd()},{rootMargin:'300px 0px'}).observe(tl);
 measure()}}

// Experiencia: contador y barra
{const big=$('.exp-hours-big');if(big){const target=parseInt(big.textContent,10)||0;big.dataset.t=target;
 if(!RM)big.textContent='0';
 once(big,el=>{if(RM)return;const t0=performance.now(),D=1400;
  (function f(n){const p=Math.min(1,(n-t0)/D),e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e);p<1?requestAnimationFrame(f):el.textContent=target})(t0)},.5)}
 const hb=$('.exp-hbar');if(hb)once(hb,el=>el.classList.add('x-in'),.5);
 const checks=$$('.task-check');checks.forEach(c=>c.dataset.t=c.textContent);
 if(!RM)checks.forEach(c=>{c.textContent='[ .. ]';c.classList.add('x-wait')});
 const list=$('.task-list');if(list&&!RM)once(list,async()=>{for(const c of checks){await sleep(420);c.classList.remove('x-wait');c.textContent=c.dataset.t;c.classList.add('x-done')}},.3)}

// Idiomas y habilidades
const fills=(sel,gridSel,step)=>{const els=$$(sel);els.forEach(f=>{f.dataset.w=f.style.width;if(!RM)f.style.width='0'});
 if(RM)return;once($$(gridSel),g=>$$(sel,g).forEach((f,i)=>setTimeout(()=>f.style.width=f.dataset.w,i*step+150)),.25)};
fills('.lang-fill','.lang-grid',180);

{const G='01<>{}#$%&*',sc=el=>{if(RM||el._r)return;el._r=1;const t=el.dataset.t||(el.dataset.t=el.textContent),t0=performance.now();
 (function f(n){const p=Math.min(1,(n-t0)/420);el.textContent=[...t].map((c,i)=>i<p*t.length?c:G[Math.random()*G.length|0]).join('');p<1?requestAnimationFrame(f):(el.textContent=t,el._r=0)})(t0)};
 $$('.lang-panel').forEach(p=>p.addEventListener('mouseenter',()=>sc($('.lang-code',p))))}

// Contacto: ping
{const ci=$('.contact-items');if(ci)once(ci,el=>el.classList.add('x-in'),.15);
 $$('.contact-item').forEach((it,i)=>it.style.transitionDelay=`${i*.09}s,${i*.09}s,0s,0s,0s,0s`);
const sub=$('.contact-sub');if(sub){const box=document.createElement('div');box.className='x-ping';sub.after(box);
  let running=false;const N=4;
  const add=(cls,html)=>{const l=document.createElement('span');l.className='ln '+cls;l.innerHTML=html;box.append(l)};
  const run=async()=>{if(running)return;running=true;box.textContent='';
   const Lp=(a,b)=>document.documentElement.lang==='en'?b:a,hi=Lp('hola','hello');
   add('hd',Lp('PING aleix@crespo: 56 bytes de datos · mensaje','PING aleix@crespo: 56 data bytes · message')+` "${hi}"`);
   const t=[];
   for(let i=1;i<=N;i++){
    add('tx',`&raquo; seq=${i} ${Lp('enviado','sent')}`);
    const rtt=+(Math.random()*.6+.25).toFixed(2);t.push(rtt);
    await sleep(RM?0:380+rtt*400);
    add('rx',`&laquo; 64 bytes from aleix@crespo: seq=${i} ttl=64 time=${rtt.toFixed(2)} ms msg="${hi}"`);
    if(i<N)await sleep(RM?0:620)}
   await sleep(RM?0:450);
   const mn=Math.min(...t),mx=Math.max(...t),av=t.reduce((a,b)=>a+b,0)/N;
   add('sm','--- aleix@crespo ping statistics ---');
   add('sm',Lp(`${N} paquetes transmitidos, ${N} recibidos, 0% de pérdida`,`${N} packets transmitted, ${N} received, 0% packet loss`));
   add('sm',`rtt min/avg/max = ${mn.toFixed(2)}/${av.toFixed(2)}/${mx.toFixed(2)} ms · <span class="st">ONLINE</span>`);
   running=false};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)run()}),{threshold:.6});io.observe(box);const lt=$('#langToggle');lt&&lt.addEventListener('click',()=>setTimeout(()=>{if(box.children.length)run()},50))}}

const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;

// Experiencia: anillo de horas
{const mb=$('.exp-meta-block'),big=$('.exp-hours-big');
 if(mb&&big){const g=document.createElement('div');g.className='exp-gauge';
  g.innerHTML='<svg viewBox="0 0 140 140" aria-hidden="true"><circle class="gb" cx="70" cy="70" r="60"/><circle class="gf" cx="70" cy="70" r="60"/><circle class="gd" cx="70" cy="70" r="66"/></svg>';
  mb.prepend(g);g.append(big);once(g,el=>el.classList.add('x-go'),.4);if(RM)g.classList.add('x-go')}
 const co=$('.exp-header>div');
 if(co){const D='M0 18H70l8-1 6-12 8 26 7-20 5 7h40l6-1 6-10 7 22 6-16 4 5h118';const M="url(\"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 36' preserveAspectRatio='none'><path d='${D}' fill='none' stroke='#000' stroke-width='3' stroke-linejoin='round'/></svg>`)+"\")";
  co.insertAdjacentHTML('beforeend',`<div class="exp-ecg-wrap" aria-hidden="true"><svg class="exp-ecg" viewBox="0 0 300 36" preserveAspectRatio="none"><path class="b" d="${D}"/></svg><span class="ecg-glow" style="-webkit-mask-image:${M};mask-image:${M}"><i></i></span></div>`)}
}

// Contacto: WhatsApp
{const wa=$('.ci-wa-item');if(wa){const sy=()=>wa.href='https://wa.me/34609908996?text='+encodeURIComponent(L('Hola Aleix, te escribo desde tu portfolio.','Hi Aleix, I am writing from your portfolio.'));
 sy();$('#langToggle')&&$('#langToggle').addEventListener('click',()=>setTimeout(sy,0))}}
})();

/* Altura del terminal de Sobre mí */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(pointer:fine)').matches;
const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;

{const blk=$('.terminal-block'),body=blk&&$('.tb-body',blk);
 if(body&&typeof statData!=='undefined'){
  const fit=()=>{const D=en()?statDataEn:statData;
   const ghost=document.createElement('div');ghost.className='terminal-block';
   ghost.style.cssText=`position:absolute;left:-9999px;top:0;visibility:hidden;width:${blk.offsetWidth}px;height:auto`;
   const gb=document.createElement('div');gb.className='tb-body';gb.style.cssText='flex:none;height:auto;overflow:visible';ghost.append(gb);document.body.append(ghost);
   let max=0;Object.values(D).forEach(d=>{gb.innerHTML='<pre class="cmd">'+d.content+'</pre>';max=Math.max(max,gb.offsetHeight)});
   ghost.remove();body.style.minHeight=Math.ceil(max)+'px'};
  let t;const later=()=>{clearTimeout(t);t=setTimeout(fit,120)};
  fit();(document.fonts&&document.fonts.ready||Promise.resolve()).then(fit);
  addEventListener('resize',later);addEventListener('load',fit);
  const lt=$('#langToggle');lt&&lt.addEventListener('click',()=>setTimeout(fit,30))}}

if(RM)return;

{const tt=$$('.sec-title');setInterval(()=>{if(document.hidden)return;
  const vis=tt.filter(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0});
  if(!vis.length)return;const e=vis[Math.random()*vis.length|0];e.classList.remove('x-glitch');void e.offsetWidth;e.classList.add('x-glitch');setTimeout(()=>e.classList.remove('x-glitch'),480)},6500)}
})();

/* =====================================================
   Marcos, idiomas y cinta de temas
   ===================================================== */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const once=(els,fn,th=.3)=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);fn(e.target)}}),{threshold:th});(els.forEach?els:[els]).forEach(el=>el&&io.observe(el))};

/* Textos ES/EN */
const syncText=()=>$$('.tl-desc,.tl-mod,.cy-note').forEach(el=>{
  const t=en()?el.dataset.en:el.dataset.es;if(t!=null)el.textContent=t});
syncText();

/* Esquinas de las tarjetas */
$$('.tl-item,.lang-panel,.skill-panel,.terminal-block,.exp-terminal,.stat-row,.cert-card').forEach(el=>{
  if(getComputedStyle(el).position==='static')el.classList.add('cy-host');
  ['tl','tr','bl','br'].forEach(c=>{const i=document.createElement('i');i.className='cy-c '+c;el.append(i)})});

/* Idiomas */
$$('.lang-panel').forEach(p=>{
  const w=$('.cy-wave',p);if(w)for(let i=0;i<14;i++){const b=document.createElement('i');
    b.style.setProperty('--d',(Math.random()*-1.2).toFixed(2)+'s');b.style.setProperty('--h',(.35+Math.random()*.65).toFixed(2));w.append(b)}
  const cf=$('.cy-cefr',p),segs=cf?$$('i',cf):[];
  segs.forEach(s=>{s.dataset.c=s.className;if(!RM)s.className=''});
  const say=$('.cy-say',p),tx=say&&$('.cy-say-t',say);
  const type=async()=>{if(!tx||say._busy)return;say._busy=1;const full=say.dataset.say;
    if(RM){tx.textContent=full;say._busy=0;return}
    tx.textContent='';for(const ch of full){tx.textContent+=ch;await sleep(32)}say._busy=0};
  const play=()=>{segs.forEach((s,i)=>setTimeout(()=>s.className=s.dataset.c,i*130+200));setTimeout(type,500)};
  RM?(segs.forEach(s=>s.className=s.dataset.c),type()):once(p,play,.4);
  p.addEventListener('mouseenter',()=>{if(say&&tx&&tx.textContent===say.dataset.say)type()})});

/* Cinta de temas */
const TICK=()=>[
  L('CIBERSEGURIDAD','CYBERSECURITY'),L('HACKING ÉTICO','ETHICAL HACKING'),L('REDES','NETWORKING'),
  L('ADMINISTRACIÓN DE SISTEMAS','SYSTEMS ADMINISTRATION'),'LINUX','TCP/IP','VLAN','ACL',
  'FIREWALL',L('HARDWARE','HARDWARE'),L('SEGURIDAD INFORMÁTICA','IT SECURITY'),'↑↑↓↓←→←→ B A',L('SOPORTE TÉCNICO','TECH SUPPORT'),L('¿HACK?','HACK?')];
const tick=document.createElement('div');tick.className='cy-ticker';tick.setAttribute('aria-hidden','true');
if('IntersectionObserver' in window)new IntersectionObserver(es=>tick.classList.toggle('pf-off',!es[0].isIntersecting)).observe(tick);
const sob=$('#sobre-mi');if(sob)sob.before(tick);
const buildTick=()=>{const set=TICK().map(t=>`<span>${esc(t)}</span>`).join('');
  tick.innerHTML=`<div class="cy-track">${set}</div>`;const tr=tick.firstChild;
  const w=tr.scrollWidth||1,k=Math.max(1,Math.ceil(innerWidth/w));
  tr.innerHTML=set.repeat(k*2);tr.style.setProperty('--tk-dur',Math.round(tr.scrollWidth/2/45)+'s')};
buildTick();
{let rt,lw=innerWidth;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(innerWidth!==lw){lw=innerWidth;buildTick()}},200)})}

/* Cambio de idioma */
const lt=$('#langToggle');
lt&&lt.addEventListener('click',()=>setTimeout(()=>{syncText();buildTick()},0));

})();

/* =====================================================
   Accesibilidad, navegación y botón de subir
   ===================================================== */
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,en=()=>root.lang==='en',L=(a,b)=>en()?b:a;
const raf=fn=>{let q=0;return(...a)=>{if(q)return;q=requestAnimationFrame(()=>{q=0;fn(...a)})}};

/* Teclado */
{const hb=$('#hamburger'),lt=$('#langToggle');
 [hb,lt].forEach(el=>{if(!el)return;el.setAttribute('role','button');el.tabIndex=0;
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}})});
 if(lt)lt.setAttribute('aria-label','Idioma / Language');
 if(hb){hb.setAttribute('aria-expanded','false');hb.addEventListener('click',()=>setTimeout(()=>hb.setAttribute('aria-expanded',String(hb.classList.contains('open'))),0))}}

/* Idioma guardado */
{const lt=$('#langToggle');let saved=null;try{saved=localStorage.xlang}catch{}
 const want=saved||((navigator.language||'').toLowerCase().startsWith('en')?'en':'es');
 if(lt){lt.addEventListener('click',()=>setTimeout(()=>{try{localStorage.xlang=root.lang}catch{}},0));
  const go=()=>{if(want==='en'&&root.lang!=='en')lt.click()};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go()}}

/* Enlace activo del menú */
{const ids=['sobre-mi','skills','formacion','certificaciones','experiencia','contacto'];
 const secs=$$('section[id]'),links=$$('.topbar-right a,.mobile-nav-link');let tops=[];
 const measure=()=>{tops=secs.map(s=>({id:s.id,y:s.getBoundingClientRect().top+scrollY}))};
 const spy=raf(()=>{const y=scrollY+innerHeight*.38;let cur=null;for(const t of tops){if(t.y<=y)cur=t.id}
  if(scrollY<innerHeight*.35)cur=null;
  if(scrollY+innerHeight>=root.scrollHeight-6)cur='contacto';
  const act=ids.includes(cur)?cur:(cur==='idiomas'||cur==='habilidades'?'experiencia':null);
  links.forEach(a=>a.classList.toggle('is-active',!!act&&a.getAttribute('href')==='#'+act))});
 const re=()=>{measure();spy()};
 addEventListener('scroll',spy,{passive:true});addEventListener('resize',re);addEventListener('load',re);
 [800,2500,5000,9000].forEach(t=>setTimeout(re,t));
 if('ResizeObserver' in window)new ResizeObserver(raf(re)).observe(document.body);re()}

/* Botón de subir */
{const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const HEX='M32 3 57 17.5 57 46.5 32 61 7 46.5 7 17.5Z';
 const b=document.createElement('button');b.id='cyTop';b.type='button';
 b.innerHTML=`<svg class="ct-hex" viewBox="0 0 64 64" aria-hidden="true">
   <path class="ct-bg" d="${HEX}"/><path class="ct-track" d="${HEX}" pathLength="100"/><path class="ct-prog" d="${HEX}" pathLength="100"/></svg>
  <svg class="ct-arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V6M6 11l6-6 6 6"/></svg>
  <span class="ct-pc" aria-hidden="true">0%</span>
  <span class="ct-tip" aria-hidden="true"><b>$</b> <span class="ct-cmd"></span><i></i></span>`;
 document.body.append(b);
 const prog=b.querySelector('.ct-prog'),pc=b.querySelector('.ct-pc'),cmd=b.querySelector('.ct-cmd');
 const lab=()=>{const t=L('Volver arriba','Back to top');b.setAttribute('aria-label',t);b.title=t};lab();
 const CMD=()=>L('cd ~ && clear','cd ~ && clear');
 let typing=0;
 const type=()=>{const t=CMD();clearInterval(typing);if(RM){cmd.textContent=t;return}let i=0;cmd.textContent='';
  typing=setInterval(()=>{cmd.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(typing)},28)};
 b.addEventListener('mouseenter',type);b.addEventListener('focus',type);
 let docH=root.scrollHeight;if('ResizeObserver' in window)new ResizeObserver(()=>{docH=root.scrollHeight}).observe(document.body);addEventListener('resize',()=>{docH=root.scrollHeight});
 const upd=raf(()=>{const h=docH-innerHeight||1,pr=Math.min(1,Math.max(0,scrollY/h));
  const pv=Math.round(pr*100);if(pv!==upd.pv){upd.pv=pv;prog.style.strokeDashoffset=String(100-pv);pc.textContent=pv+'%'}
  const nav=document.getElementById('mobileNav');
  b.classList.toggle('on',scrollY>innerHeight*.6&&!(nav&&nav.classList.contains('open')));
  b.classList.toggle('done',pr>.985)});
 addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
 $('#hamburger')?.addEventListener('click',()=>setTimeout(upd,0));
 b.addEventListener('click',()=>{if(b.classList.contains('go'))return;b.classList.add('go');
  setTimeout(()=>b.classList.remove('go'),900);
  scrollTo({top:0,behavior:RM?'auto':'smooth'})});
 $('#langToggle')?.addEventListener('click',()=>setTimeout(()=>{lab();cmd.textContent=''},0))}

{const sk=$('.skip-link'),f=()=>{if(sk)sk.textContent=L('Saltar al contenido','Skip to content')};f();$('#langToggle')?.addEventListener('click',()=>setTimeout(f,0))}

/* Título de la pestaña al salir */
{
 const T=document.title,ico=document.querySelector('link[rel=icon]'),IC=ico&&ico.href;
 const svg=s=>'data:image/svg+xml,'+encodeURIComponent(s);
 const AWAY=svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#03140a"/><rect x="1" y="1" width="30" height="30" rx="4" fill="none" stroke="#00ff66" stroke-width="1.5"/><path d="M8 11l5 5-5 5" fill="none" stroke="#00ff66" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="16" y="19" width="8" height="2.6" rx="1" fill="#00ff66"/><circle cx="25" cy="7.5" r="2.6" fill="#fbbf24"/></svg>`);
 const BACK=svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="#03140a"/><rect x="1" y="1" width="30" height="30" rx="4" fill="none" stroke="#00ff66" stroke-width="1.5"/><path d="M9 16.5l4.5 4.5L23 11" fill="none" stroke="#00ff66" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
 let blink=0,back=0,on=false;
 document.addEventListener('visibilitychange',()=>{clearInterval(blink);clearTimeout(back);
  if(document.hidden){const msg=L('esperando conexión','awaiting connection');on=false;
   const tick=()=>{on=!on;document.title=`aleix@crespo:~$ ${msg}${on?'_':' '}`};tick();blink=setInterval(tick,1000);if(ico)ico.href=AWAY}
  else{document.title=L('[ OK ] Conexión restablecida','[ OK ] Connection restored');if(ico)ico.href=BACK;
   back=setTimeout(()=>{document.title=T;if(ico)ico.href=IC},2200)}})}

/* Mensaje en la consola */
try{console.log('%c ALEIX_OS %c v2.4.1 ','background:#00ff41;color:#020805;font:700 14px monospace;padding:4px 8px','background:#020805;color:#00ff41;font:14px monospace;padding:4px 8px;border:1px solid #00ff41');
 console.log('%c'+L('¿Curioseando el código? Me gusta. Escríbeme y hablamos de redes, sistemas o ciberseguridad.','Peeking at the code? I like it. Message me and let’s talk networking, systems or cybersecurity.'),'color:#00ff41;font:13px monospace')}catch{}
})();

/* =====================================================
   Certificaciones
   ===================================================== */
(()=>{'use strict';
const sec=document.getElementById('certificaciones');if(!sec)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

const sync=()=>{$$('[data-es][data-en]',sec).forEach(el=>{el.textContent=en()?el.dataset.en:el.dataset.es});
  $$('[data-es-label]',sec).forEach(el=>el.setAttribute('aria-label',en()?el.dataset.enLabel:el.dataset.esLabel));
  $$('.cert-thumb img',sec).forEach(im=>{im.alt=L('Certificado de asistencia al Curso de Hacking Ético de BIG school — Aleix Crespo López','Certificate of attendance, BIG school Ethical Hacking Course — Aleix Crespo López')})};
sync();$('#langToggle')?.addEventListener('click',()=>setTimeout(sync,0));

{const cards=$$('.cert-card',sec),n=cards.length,hrs=cards.reduce((a,c)=>a+(+c.dataset.hours||0),0);
 const cN=$('#certCount'),cH=$('#certHours'),pad=v=>String(v).padStart(2,'0');
 const count=(el,to)=>{if(!el)return;if(RM){el.textContent=pad(to);return}const t0=performance.now();
  (function f(t){const p=Math.min(1,(t-t0)/900);el.textContent=pad(Math.round(to*(1-Math.pow(1-p,3))));p<1&&requestAnimationFrame(f)})(t0)};
 if(cN)cN.textContent=pad(n);if(cH)cH.textContent=pad(hrs);
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();count(cN,n);count(cH,hrs)}},{threshold:.4});
 io.observe($('.cert-status',sec)||sec)}

/* Barra de slots */
{const shell=$('.cert-shell',sec),rail=$('.cert-rail',sec),list=$('.cert-list',sec);
 if(shell&&rail&&list){
  const real=$$('.cert-card',list),slots=Math.max(+shell.dataset.slots||5,real.length),pad=n=>String(n).padStart(2,'0');
  const LOCK='<svg viewBox="0 0 64 72" aria-hidden="true"><path d="M18 32V22a14 14 0 0 1 28 0v10"/><rect x="8" y="32" width="48" height="36" rx="5"/><circle cx="32" cy="48" r="4.5"/><path d="M32 52v7"/></svg>';
  for(let n=real.length+1;n<=slots;n++){const e=document.createElement('article');e.className='cert-card cert-empty';e.dataset.num=pad(n);
   e.innerHTML=`<div class="cert-bar"><span class="cb-path">~/certs/<b>slot_${pad(n)}.crt</b></span><span class="cb-lock" data-es="[ CIFRADO ]" data-en="[ ENCRYPTED ]">[ CIFRADO ]</span></div>
    <div class="cert-body ce-grid">
      <div class="ce-thumb">${LOCK}<span class="ce-hex" aria-hidden="true"></span></div>
      <div class="ce-info">
        <div class="ce-t">SLOT_${pad(n)} <span data-es="· DISPONIBLE" data-en="· AVAILABLE">· DISPONIBLE</span></div>
        <p class="ce-p" data-es="Aquí irá mi próxima certificación. Sigo formándome en ciberseguridad, redes y sistemas: este hueco no estará vacío mucho tiempo." data-en="My next certification will go here. I keep training in cybersecurity, networking and systems — this slot won't stay empty for long.">Aquí irá mi próxima certificación. Sigo formándome en ciberseguridad, redes y sistemas: este hueco no estará vacío mucho tiempo.</p>
        <div class="ce-sk" aria-hidden="true"><i style="width:92%"></i><i style="width:78%"></i><i style="width:85%"></i></div>
        <div class="ce-sk ce-sk2" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="ce-prog"><i></i></div>
        <div class="ce-cmd">$ ./decrypt --slot ${pad(n)} <span data-es="… esperando certificado" data-en="… awaiting certificate">… esperando certificado</span></div>
      </div></div>`;
   list.append(e)}
  $$('.ce-hex',list).forEach(h=>{h.textContent=Array.from({length:22},()=>Array.from({length:8},()=>(Math.random()*256|0).toString(16).padStart(2,'0')).join(' ')).join('\n')});
  const cards=$$('.cert-card',list);
  const ARW=d=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d?'m6 9 6 6 6-6':'m6 15 6-6 6 6'}"/></svg>`;
  rail.innerHTML=`<div class="cr-head">SLOTS</div><button type="button" class="cr-nav cr-prev" aria-label="Anterior">${ARW(0)}</button>
   <div class="cr-list"><i class="cr-trace" aria-hidden="true"></i><i class="cr-ind" aria-hidden="true"></i>`+cards.map((c,i)=>{const empty=c.classList.contains('cert-empty');
   return `<button type="button" class="cr-btn${empty?' is-empty':''}" role="tab" id="crt-tab-${i}" aria-controls="crt-panel-${i}"
     data-es-label="${empty?'Hueco vacío':(c.dataset.shortEs||'Certificado')}" data-en-label="${empty?'Empty slot':(c.dataset.shortEn||'Certificate')}"><b>${pad(i+1)}</b><i class="cr-led" aria-hidden="true"></i></button>`}).join('')+
   `</div><button type="button" class="cr-nav cr-next" aria-label="Siguiente">${ARW(1)}</button><div class="cr-foot"><b class="cr-cur">01</b><span>/${pad(cards.length)}</span></div>`;
  cards.forEach((c,i)=>{c.id='crt-panel-'+i;c.setAttribute('role','tabpanel');c.setAttribute('aria-labelledby','crt-tab-'+i)});
  const btns=$$('.cr-btn',rail),ind=$('.cr-ind',rail),curEl=$('.cr-cur',rail),lst=$('.cr-list',rail);let cur=-1;
  {const s=$('#certSlots'),f=$('#certFill');if(s)s.textContent=pad(cards.length);if(f)f.style.transform=`scaleX(${real.length/cards.length})`}
  const tips=()=>{btns.forEach(b=>b.dataset.tip=en()?b.dataset.enLabel:b.dataset.esLabel);
   $('.cr-prev',rail).setAttribute('aria-label',L('Certificado anterior','Previous certificate'));$('.cr-next',rail).setAttribute('aria-label',L('Certificado siguiente','Next certificate'))};
  tips();$('#langToggle')?.addEventListener('click',()=>setTimeout(tips,0));
  const place=()=>{const b=btns[cur];if(!b)return;const vert=getComputedStyle(lst).flexDirection==='column';
   ind.style.transform=vert?`translate3d(0,${b.offsetTop}px,0)`:`translate3d(${b.offsetLeft}px,0,0)`;ind.style.width=b.offsetWidth+'px';ind.style.height=b.offsetHeight+'px'};
  const show=(i,anim)=>{if(i===cur)return;const dir=i>cur?'dn':'up';cur=i;
   cards.forEach((c,k)=>{const on=k===i;c.hidden=!on;c.classList.toggle('is-active',on);
    if(on&&anim&&!RM){c.classList.remove('swap','dn','up');void c.offsetWidth;c.classList.add('swap',dir)}});
   btns.forEach((b,k)=>{const on=k===i;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});
   if(curEl)curEl.textContent=pad(i+1);
   place();
   const t=$('.ci-title,.ce-t',cards[i]);if(t&&anim&&!RM){const full=t.textContent,G='01<>{}#$%&*/',t0=performance.now();
    (function f(n){const p=Math.min(1,(n-t0)/450);t.textContent=[...full].map((ch,q)=>ch===' '||q<p*full.length?ch:G[Math.random()*G.length|0]).join('');p<1?requestAnimationFrame(f):t.textContent=full})(t0)}};
  btns.forEach((b,i)=>b.addEventListener('click',()=>show(i,true)));
  $('.cr-prev',rail).addEventListener('click',()=>show((cur-1+btns.length)%btns.length,true));
  $('.cr-next',rail).addEventListener('click',()=>show((cur+1)%btns.length,true));
  lst.addEventListener('keydown',e=>{const k=e.key;if(!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(k))return;e.preventDefault();
   const n=k==='Home'?0:k==='End'?btns.length-1:(cur+(k==='ArrowDown'||k==='ArrowRight'?1:-1)+btns.length)%btns.length;show(n,true);btns[n].focus()});
  {const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();shell.classList.add('scanned')}},{threshold:.15});io.observe(shell)}
  $$('.cert-thumb',list).forEach(t=>{t.addEventListener('mouseenter',()=>t.classList.add('scan-once'),{once:true});const s=document.createElement('span');s.className='cth-sheen';s.setAttribute('aria-hidden','true');t.append(s);
   if(RM||!matchMedia('(pointer:fine)').matches)return;
   // marco fijo que detecta el ratón (no se inclina, así no hay zonas muertas ni temblores en los bordes)
   const box=document.createElement('div');box.className='cert-tilt';t.before(box);box.append(t);
   let tx=0,ty=0,cx=0,cy=0,gx=50,gy=50,raf=0,hover=false;
   const step=()=>{cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;
    t.style.setProperty('--rx',cx.toFixed(2)+'deg');t.style.setProperty('--ry',cy.toFixed(2)+'deg');t.style.setProperty('--gx',gx+'%');t.style.setProperty('--gy',gy+'%');
    if(Math.abs(tx-cx)>.02||Math.abs(ty-cy)>.02)raf=requestAnimationFrame(step);else{raf=0;if(!hover){t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')}}};
   const kick=()=>{if(!raf)raf=requestAnimationFrame(step)};
   box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect(),mx=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),my=Math.min(1,Math.max(0,(e.clientY-r.top)/r.height));
    hover=true;tx=(.5-my)*8;ty=(mx-.5)*10;gx=+(mx*100).toFixed(1);gy=+(my*100).toFixed(1);t.classList.add('tilting');kick()});
   box.addEventListener('pointerleave',()=>{hover=false;tx=0;ty=0;t.classList.remove('tilting');kick()})});
  if(!RM){const m=document.createElement('div');m.className='cert-motes';m.setAttribute('aria-hidden','true');
   for(let i=0;i<14;i++){const d=document.createElement('i');d.style.cssText=`left:${(Math.random()*100).toFixed(1)}%;--s:${(2+Math.random()*3).toFixed(1)}px;--d:${(9+Math.random()*9).toFixed(1)}s;--dl:${(-Math.random()*18).toFixed(1)}s;--x:${((Math.random()-.5)*60).toFixed(0)}px`;m.append(d)}
   sec.prepend(m)}
  {const f=$('#certFill');if(f){const v=f.style.transform;f.style.transform='scaleX(0)';const go=()=>{f.style.transform=v};
   new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();setTimeout(go,300)}},{threshold:.4}).observe(f);setTimeout(go,9000)}}
  show(0,false);addEventListener('resize',place);(document.fonts&&document.fonts.ready||Promise.resolve()).then(place);
  sync()}}

const box=document.createElement('div');box.className='cert-lb';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.hidden=true;
box.innerHTML='<div class="lb-win"><div class="lb-bar"><span class="lb-t"></span><button type="button" class="lb-x">[ ESC ]</button></div><div class="lb-img"><img alt=""><i class="lb-scan"></i></div></div>';
document.body.append(box);
const img=$('img',box),title=$('.lb-t',box),x=$('.lb-x',box);let last=null;
const open=(src,alt,t,small)=>{last=document.activeElement;box.classList.toggle('lb-small',!!small);img.src=src;img.alt=alt||'';title.textContent='$ open '+(t||src.split('/').pop());
  box.hidden=false;requestAnimationFrame(()=>box.classList.add('on'));document.documentElement.classList.add('lb-open');x.focus()};
const close=()=>{box.classList.remove('on');document.documentElement.classList.remove('lb-open');setTimeout(()=>{box.hidden=true;img.removeAttribute('src')},RM?0:250);last&&last.focus()};
$$('.cert-thumb,.cert-open',sec).forEach(b=>b.addEventListener('click',e=>{e.preventDefault();
  const card=b.closest('.cert-card'),im=$('.cert-thumb img',card);open(b.dataset.full,im&&im.alt,$('.cb-path b',card)?.textContent)}));
x.addEventListener('click',close);box.addEventListener('click',e=>{if(e.target===box)close()});
window.xLightbox=open;
addEventListener('keydown',e=>{if(e.key==='Escape'&&!box.hidden)close()});
})();

/* =====================================================
   Mostrar contenido si no hay IntersectionObserver
   ===================================================== */
(()=>{'use strict';
const fix=()=>{const vh=innerHeight*1.05,inView=el=>el.getBoundingClientRect().top<vh;
  document.querySelectorAll('.sec-label[data-pending]').forEach(l=>{if(inView(l)){delete l.dataset.pending;l.textContent=l.dataset.full||l.textContent}});
  document.querySelectorAll('.sec-title:not(.x-in)').forEach(t=>{if(inView(t))t.classList.add('x-in')});
  document.querySelectorAll('.contact-items:not(.x-in)').forEach(c=>{if(inView(c))c.classList.add('x-in')});
  document.querySelectorAll('.lang-fill,.si-fill').forEach(f=>{if(f.dataset.w&&f.style.width==='0px'&&inView(f))f.style.width=f.dataset.w});
  document.querySelectorAll('.exp-hours-big[data-t]').forEach(b=>{if(b.textContent==='0'&&inView(b)&&!b._f){b._f=1;setTimeout(()=>{if(b.textContent==='0')b.textContent=b.dataset.t},300)}});
  document.querySelectorAll('.exp-hbar:not(.x-in),.exp-gauge:not(.x-go)').forEach(e=>{if(inView(e))e.classList.add(e.classList.contains('exp-gauge')?'x-go':'x-in')})};
let t=0;addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(fix,900)},{passive:true});
addEventListener('xboot',()=>setTimeout(fix,2500));setTimeout(fix,8000);
})();

/* =====================================================
   Experiencia
   ===================================================== */
(()=>{'use strict';
const list=document.querySelector('.task-list');if(!list)return;
const en=()=>document.documentElement.lang==='en';
const sync=()=>list.querySelectorAll('[data-es][data-en]').forEach(el=>{el.textContent=en()?el.dataset.en:el.dataset.es});
sync();document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(sync,0));
list.querySelectorAll('.task-item').forEach(it=>{
  const head=it.querySelector('.task-head');if(!head)return;
  head.addEventListener('click',()=>{const open=!it.classList.contains('open');
    list.querySelectorAll('.task-item.open').forEach(o=>{if(o!==it){o.classList.remove('open');o.querySelector('.task-head')?.setAttribute('aria-expanded','false')}});
    it.classList.toggle('open',open);head.setAttribute('aria-expanded',open)});
});
})();

/* =====================================================
   Formación
   ===================================================== */
(()=>{'use strict';
const tl=document.querySelector('.timeline');if(!tl)return;
const en=()=>document.documentElement.lang==='en';
const sync=()=>tl.querySelectorAll('.tl-more [data-es]').forEach(el=>{el.textContent=en()?el.dataset.en:el.dataset.es});
sync();document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(sync,0));
const items=[...tl.querySelectorAll('.tl-item')];
items.forEach(it=>{const head=it.querySelector('.tl-head');if(!head)return;
  head.addEventListener('click',()=>{const open=!it.classList.contains('open');
    items.forEach(o=>{if(o!==it&&o.classList.contains('open')){o.classList.remove('open');o.querySelector('.tl-head')?.setAttribute('aria-expanded','false')}});
    it.classList.toggle('open',open);head.setAttribute('aria-expanded',open)})});
})();

/* =====================================================
   Pie de página: terminal interactiva
   ===================================================== */
(()=>{'use strict';
const f=document.querySelector('footer');if(!f)return;
const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;
const out=document.getElementById('ftOut'),form=document.getElementById('ftCli'),inp=document.getElementById('ftIn');
const sync=()=>{f.querySelectorAll('[data-es][data-en]').forEach(el=>{if(el.tagName==='INPUT')el.placeholder=innerWidth<600?(en()?'type help':'escribe help'):(en()?el.dataset.en:el.dataset.es);else el.textContent=en()?el.dataset.en:el.dataset.es})};
sync();document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(sync,0));
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
const print=(cmd,lines)=>{const b=document.createElement('div');b.className='ft-blk';
  b.innerHTML=`<div class="ft-cmd"><b>$</b> ${esc(cmd)}</div>`+lines.map(l=>`<div>${l}</div>`).join('');
  out.append(b);while(out.children.length>3)out.firstChild.remove();out.classList.add('on')};
const CMDS={
 help:()=>[L('comandos:','commands:')+' <i>whoami · cv · contacto · linkedin · email · certs · top · clear</i>',
   L('<span class="ft-tip">pista:</span> hay 2 secretos. Uno se escribe con 4 letras en cualquier parte de la web; el otro es un código clásico de videojuegos <i>(↑ ↑ ↓ ↓ ← → ← → B A)</i>.','<span class="ft-tip">hint:</span> there are 2 secrets. One is a 4-letter word typed anywhere on the site; the other is a classic video game code <i>(↑ ↑ ↓ ↓ ← → ← → B A)</i>.')],
 whoami:()=>[L('Aleix Crespo López — técnico informático · ASIR en Escola Pàlcam · Barcelona','Aleix Crespo López — IT technician · ASIR at Escola Pàlcam · Barcelona')],
 cv:()=>{window.open(en()?'img/cvAleix_EN.pdf':'img/cvAleix.pdf','_blank','noopener');return[L('abriendo currículum…','opening resume…')]},
 contacto:()=>{go('contacto');return[L('saltando a ./contacto.sh','jumping to ./contact.sh')]},
 linkedin:()=>{window.open('https://www.linkedin.com/in/aleixcrespolopez/','_blank','noopener');return['linkedin.com/in/aleixcrespolopez']},
 email:()=>['<a href="https://mail.google.com/mail/?view=cm&fs=1&to=aleixcrespolopez@gmail.com" target="_blank" rel="noopener noreferrer">aleixcrespolopez@gmail.com</a>'],
 certs:()=>{go('certificaciones');return[L('1 certificado · más en camino','1 certificate · more on the way')]},
 top:()=>{scrollTo({top:0,behavior:'smooth'});return['cd ~']},
 sudo:()=>[L('buen intento ;) — prueba con <i>hack</i>','nice try ;) — try <i>hack</i>')],
 ls:()=>['sobre-mi/  formacion/  certificaciones/  experiencia/  proyectos/  contacto/  <span class="ft-dim">.secreto</span>'],
 'cat .secreto':()=>[L('hay una palabra mágica de 4 letras… empieza por <i>h</i>.','there is a magic 4-letter word… it starts with <i>h</i>.')],
 hack:()=>{setTimeout(()=>window.xEgg&&window.xEgg(),300);return[L('iniciando exploit…','launching exploit…')]},
 exit:()=>{scrollTo({top:0,behavior:'smooth'});return['logout']},
};
CMDS.contact=CMDS.contacto;CMDS['cat .secret']=CMDS['cat .secreto'];CMDS.help2=CMDS.help;
form.addEventListener('submit',e=>{e.preventDefault();const raw=inp.value.trim(),c=raw.toLowerCase();inp.value='';if(!c)return;
  if(c==='clear'){out.innerHTML='';out.classList.remove('on');return}
  const fn=CMDS[c];print(raw,fn?fn():[L(`comando no encontrado: ${esc(raw)} — prueba <i>help</i>`,`command not found: ${esc(raw)} — try <i>help</i>`)]);
  // la respuesta aparece encima de la barra: la página baja sola para verla (salvo si el comando ya lleva a otra sección)
  if(!['contacto','contact','certs','top','exit'].includes(c))requestAnimationFrame(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}))});
// el botón de subir se coloca encima del pie (que crece con las respuestas)
{const r=document.documentElement,set=()=>r.style.setProperty('--foot-h',f.offsetHeight+'px');
 new IntersectionObserver(es=>{r.classList.toggle('at-foot',es[0].isIntersecting);set()}).observe(f);
 if('ResizeObserver' in window)new ResizeObserver(set).observe(f)}
// al pulsar en la barra se enfoca la terminal
f.querySelector('.sb').addEventListener('click',e=>{if(!e.target.closest('.sb-os'))inp.focus({preventScroll:true})});
// el "?" del pie escribe help solo
})();

/* =====================================================
   Botones de ver detalles
   ===================================================== */
(()=>{'use strict';
const en=()=>document.documentElement.lang==='en';
const LBL={tl:[['ver detalles','view details'],['ocultar','hide']],task:[['ver detalles','view details'],['ocultar','hide']]};
const groups=[[document.querySelector('.timeline'),'.tl-item','tl'],[document.querySelector('.task-list'),'.task-item','task']];
const paint=()=>{groups.forEach(([box,sel,k])=>{if(!box)return;box.querySelectorAll(sel).forEach(it=>{const l=it.querySelector('.x-lbl');if(!l)return;
   const open=it.classList.contains('open');l.textContent=LBL[k][open?1:0][en()?1:0]})});
  document.querySelectorAll('.x-hint [data-es]').forEach(s=>s.textContent=en()?s.dataset.en:s.dataset.es)};
groups.forEach(([box,sel])=>{if(!box)return;
  box.addEventListener('click',e=>{if(e.target.closest('.tl-head,.task-head')){box.classList.add('touched');setTimeout(paint,0)}})});
paint();document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(paint,0));
})();


/* =====================================================
   Foto del hero ampliable
   ===================================================== */
(()=>{'use strict';
const f=document.getElementById('pfoto');if(!f)return;
f.classList.add('zoomable');f.tabIndex=0;f.setAttribute('role','button');
const lab=()=>f.setAttribute('aria-label',document.documentElement.lang==='en'?'Enlarge photo':'Ampliar foto');lab();
document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(lab,0));
const go=()=>window.xLightbox&&window.xLightbox(f.currentSrc||f.src,f.alt,'aleix_crespo.jpg',true);
f.addEventListener('click',go);f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
})();


/* =====================================================
   Certificaciones: imagen y texto a la misma altura
   ===================================================== */
(()=>{'use strict';
const fit=()=>{document.querySelectorAll('.cert-card.is-active .cert-body').forEach(body=>{
  const side=body.querySelector('.cert-side'),info=body.querySelector('.cert-info'),img=body.querySelector('.cert-thumb img');if(!side||!info||!img)return;
  body.style.removeProperty('grid-template-columns');
  if(innerWidth<1200)return;
  body.classList.add('fitting');
  const cs=getComputedStyle(body),gap=parseFloat(cs.columnGap)||30,inner=body.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
  // se busca el ancho de la imagen con el que las dos columnas miden lo mismo
  const span=el=>{const a=el.firstElementChild,z=el.lastElementChild;return z.getBoundingClientRect().bottom-a.getBoundingClientRect().top};
  const d=w=>{body.style.setProperty('grid-template-columns',`${Math.round(w)}px minmax(0,1fr)`,'important');return span(side)-span(info)};
  // se prueban varios anchos y se afina alrededor del que deja menos diferencia
  let best=inner*.5,bd=Infinity;
  for(let k=0;k<=10;k++){const w=inner*(.34+k*.03),v=Math.abs(d(w));if(v<bd){bd=v;best=w}}
  for(const s of [-.015,.015,-.0075,.0075]){const w=best+inner*s,v=Math.abs(d(w));if(v<bd){bd=v;best=w}}
  const w=best;
  body.style.setProperty('grid-template-columns',`${Math.round(w)}px minmax(0,1fr)`,'important');body.classList.remove('fitting')})};
let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(()=>{if(seen)fit()},120)});
let seen=false;const sec=document.getElementById('certificaciones');
if(sec&&'IntersectionObserver' in window)new IntersectionObserver(es=>{if(es[0].isIntersecting&&!seen){seen=true;fit()}},{rootMargin:'600px 0px'}).observe(sec);else seen=true;
(document.fonts&&document.fonts.ready||Promise.resolve()).then(()=>{if(seen)fit()});
document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(fit,60));
document.addEventListener('click',e=>{if(e.target.closest('.cr-btn,.cr-nav'))setTimeout(fit,30)});

})();


/* =====================================================
   Easter egg: escribe "hack" o pulsa 5 veces ALEIX_OS en el pie
   ===================================================== */
(()=>{'use strict';
const en=()=>document.documentElement.lang==='en',L=(a,b)=>en()?b:a;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let open=false;
const run=async()=>{if(open)return;open=true;window.__eggOpen=1;
  const root=document.documentElement;root.classList.add('egg-glitch');setTimeout(()=>root.classList.remove('egg-glitch'),600);
  const o=document.createElement('div');o.className='egg';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');
  o.innerHTML=`<div class="egg-rain" aria-hidden="true"></div>
   <div class="egg-win"><div class="egg-bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="egg-t">root@aleix-sec: ~/secret</span>
    <button type="button" class="egg-x" aria-label="${L('Cerrar','Close')}">[ ESC ]</button></div>
    <div class="egg-body"><pre class="egg-log"></pre>
     <div class="egg-end"><svg viewBox="0 0 64 72" aria-hidden="true"><path class="sh" d="M18 32V22a14 14 0 0 1 28 0v10"/><rect x="8" y="32" width="48" height="36" rx="5"/><path d="M22 50l7 7 13-14"/></svg>
      <h3>${L('¡HAS ENCONTRADO EL EASTER EGG!','YOU FOUND THE EASTER EGG!')}</h3>
      <p>${L('Curiosidad, constancia y ganas de mirar donde nadie mira: justo lo que hace falta en ciberseguridad. Si has llegado hasta aquí, eres de los míos.','Curiosity, persistence and the urge to look where nobody else does: exactly what cybersecurity needs. If you made it this far, you are one of us.')}</p>
      <div class="egg-flag"><span>FLAG</span><code>flag{4l31x_r00t_4cc3ss_2026}</code></div>
      <p class="egg-sm">${L('Menciónala cuando me escribas ;)','Mention it when you contact me ;)')}</p></div></div></div>`;
  document.body.append(o);
  if(!RM&&window.xRain)window.xRain(o.querySelector('.egg-rain'),{gap:20,center:.9,min:1.4,span:1.6});
  requestAnimationFrame(()=>o.classList.add('on'));
  const close=()=>{o.classList.remove('on');setTimeout(()=>{o.remove();open=false},300);removeEventListener('keydown',esc)};
  const esc=e=>{if(e.key==='Escape')close()};addEventListener('keydown',esc);
  o.querySelector('.egg-x').addEventListener('click',close);o.addEventListener('click',e=>{if(e.target===o)close()});
  o.querySelector('.egg-x').focus({preventScroll:true});
  const log=o.querySelector('.egg-log'),wait=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
  const lines=[['$ sudo ./easter_egg.sh',''],[L('[sudo] contraseña para visitante: ••••••••','[sudo] password for visitor: ••••••••'),''],
   [L('> escaneando puertos ocultos…','> scanning hidden ports…'),'ok'],[L('> descifrando /root/secret.enc','> decrypting /root/secret.enc'),'ok'],
   [L('> escalando privilegios a root','> escalating privileges to root'),'ok'],[L('ACCESO ROOT CONCEDIDO','ROOT ACCESS GRANTED'),'hi']];
  for(const[t,k]of lines){if(!open)return;const d=document.createElement('div');d.className='egg-ln '+k;log.append(d);
   for(let i=1;i<=t.length;i+=2){d.textContent=t.slice(0,i);await wait(12)}d.textContent=t+(k==='ok'?'  [ OK ]':'');await wait(160)}
  o.classList.add('done')};
window.xEgg=run;
// teclado: "hack" en cualquier parte (no dentro de campos de texto)
let buf='';addEventListener('keydown',e=>{if(e.target.closest&&e.target.closest('input,textarea,[contenteditable]'))return;
  if(e.key.length!==1)return;buf=(buf+e.key.toLowerCase()).slice(-4);if(buf==='hack'){buf='';run()}});
// 5 toques seguidos en ALEIX_OS del pie
{const os=document.querySelector('.sb-os');if(os){let n=0,t=0;os.style.cursor='pointer';
  os.addEventListener('click',()=>{clearTimeout(t);n++;os.classList.remove('egg-tap');void os.offsetWidth;os.classList.add('egg-tap');
   if(n>=5){n=0;run()}else t=setTimeout(()=>n=0,2500)})}}
// pista para curiosos en la consola
try{console.log('%c'+L('Pista: escribe "hack" en la web.','Hint: type "hack" on the page.'),'color:#00ff66;font:12px monospace')}catch{}
})();


/* =====================================================
   Modo claro / oscuro
   ===================================================== */
(()=>{'use strict';
const b=document.getElementById('themeToggle');if(!b)return;const root=document.documentElement;
const en=()=>root.lang==='en';
const meta=document.querySelector('meta[name=theme-color]');
const paint=()=>{const light=root.dataset.theme==='light';b.classList.toggle('is-light',light);
  const t=light?(en()?'Switch to dark mode':'Cambiar a modo oscuro'):(en()?'Switch to light mode':'Cambiar a modo claro');b.setAttribute('aria-label',t);b.title=t;
  b.setAttribute('aria-pressed',String(light));if(meta)meta.content=light?'#dcdfda':'#050505'};
const apply=light=>{if(light)root.dataset.theme='light';else delete root.dataset.theme;
  try{light?localStorage.xtheme='light':localStorage.removeItem('xtheme')}catch{}paint();dispatchEvent(new Event('xtheme'))};
// el interruptor responde en el mismo fotograma; los colores cambian justo después
let q=0;
b.addEventListener('click',()=>{const light=!b.classList.contains('is-light');b.classList.toggle('is-light',light);
  cancelAnimationFrame(q);q=requestAnimationFrame(()=>setTimeout(()=>apply(light),0))});
paint();document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(paint,0));
})();
