const scenes=[...document.querySelectorAll(".scene")];
let current=0;
const progressBar=document.getElementById("progressBar");
const progressText=document.getElementById("progressText");
const floating=document.getElementById("floatingLayer");

function showScene(index){
  if(index<0||index>=scenes.length)return;
  current=index;
  scenes.forEach((s,i)=>s.classList.toggle("active",i===index));
  const pct=Math.min(100,Math.max(0,((Math.min(index,7))/7)*100));
  progressBar.style.width=pct+"%";
  progressText.textContent=String(Math.min(index+1,6)).padStart(2,"0");
  if(index===8) startFinale();
}

function next(){showScene(current+1)}
document.getElementById("lookBtn").addEventListener("click",()=>{
  showScene(1);
  startLoading();
});
document.querySelectorAll(".magic-next").forEach(b=>b.addEventListener("click",next));
document.getElementById("restart").addEventListener("click",()=>{
  document.getElementById("finalType").textContent="";
  showScene(0);
});

function startLoading(){
  const bar=document.querySelector(".loading-line span");
  const percent=document.getElementById("loadingPercent");
  const words=["Собираем самые тёплые слова...","Добавляем немного магии...","Проверяем запас обнимашек...","Почти готово..."];
  let n=0;
  const interval=setInterval(()=>{
    n+=2;
    percent.textContent=Math.min(n,100)+"%";
    const text=words[Math.min(Math.floor(n/28),3)];
    document.getElementById("loadingText").textContent=text;
    if(n>=100){clearInterval(interval);setTimeout(()=>showScene(2),450)}
  },45);
}

function makeStars(){
  const root=document.getElementById("stars");
  for(let i=0;i<80;i++){
    const s=document.createElement("i");s.className="star";
    s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";
    s.style.animationDelay=Math.random()*3+"s";
    s.style.opacity=Math.random();
    root.appendChild(s);
  }
}
makeStars();

function confetti(count=90){
  const root=document.getElementById("confetti");
  const symbols=["","♥","✦","◆","●"];
  for(let i=0;i<count;i++){
    const p=document.createElement("span");p.className="confetti-piece";
    p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left=Math.random()*100+"vw";
    p.style.setProperty("--x",(Math.random()*240-120)+"px");
    p.style.background=["#ff8dce","#b39aff","#ffd47a","#ffffff"][Math.floor(Math.random()*4)];
    if(p.textContent)p.style.background="transparent";
    p.style.color=["#ff8dce","#b39aff","#ffd47a","#ffffff"][Math.floor(Math.random()*4)];
    p.style.animationDelay=Math.random()*1.4+"s";
    p.style.transform=`rotate(${Math.random()*180}deg)`;
    root.appendChild(p);
    setTimeout(()=>p.remove(),5500);
  }
}
function heart(){
  const h=document.createElement("span");h.className="heart-piece";h.textContent=Math.random()>.5?"♥":"♡";
  h.style.left=Math.random()*100+"vw";h.style.setProperty("--x",(Math.random()*180-90)+"px");
  h.style.fontSize=(15+Math.random()*30)+"px";
  document.getElementById("hearts").appendChild(h);setTimeout(()=>h.remove(),4300);
}
let finaleTimer;
function startFinale(){
  confetti(120);
  clearInterval(finaleTimer);
  finaleTimer=setInterval(heart,260);
  typeFinal();
}
function typeFinal(){
  const el=document.getElementById("finalType");
  const text="И пусть у тебя всегда будет повод улыбаться. 💗";
  let i=0;el.textContent="";
  const t=setInterval(()=>{el.textContent+=text[i++]||"";if(i>=text.length)clearInterval(t)},42);
}
for(let i=0;i<8;i++){
  const b=document.createElement("span");b.className="floating-dot";
  b.textContent=["✦","♡","•"][i%3];floating.appendChild(b);
}

let startX=null;
document.addEventListener("touchstart",e=>{startX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener("touchend",e=>{
  if(startX===null)return;
  const dx=e.changedTouches[0].clientX-startX;
  if(Math.abs(dx)>65){if(dx<0&&current>=2&&current<7)next();if(dx>0&&current>2)showScene(current-1)}
  startX=null;
});

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"&&current>=2&&current<7)next();
  if(e.key==="ArrowLeft"&&current>2)showScene(current-1);
});

const soundBtn=document.getElementById("soundBtn");
let audio;
soundBtn.addEventListener("click",()=>{
  soundBtn.classList.toggle("off");
  // Автовоспроизведение музыки специально не включается:
  // браузеры телефона требуют явного действия пользователя.
});

showScene(0);
