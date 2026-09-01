// Sayfa gecisinin GERCEKTEN calistigini ve JS'siz de icerigi gizlemedigini olcer.
import { chromium } from "playwright";
const B="http://127.0.0.1:3400";
let bad=0;
// 1) Gecis animasyonu var mi?
{
  const br=await chromium.launch(); const p=await br.newPage();
  await p.goto(B+"/the-story",{waitUntil:"domcontentloaded"});
  const r=await p.evaluate(()=>{const el=document.querySelector(".page-enter");
    if(!el) return null; const cs=getComputedStyle(el);
    return {name:cs.animationName, dur:cs.animationDuration};});
  console.log("gecis:", JSON.stringify(r));
  if(!r || r.name!=="pageEnter") { bad++; console.log("  <- gecis YOK"); }
  await br.close();
}
// 2) JS KAPALIYKEN icerik gorunur mu? (opacity:0 SSR'a sizmis mi?)
{
  const br=await chromium.launch(); const ctx=await br.newContext({javaScriptEnabled:false});
  const p=await ctx.newPage();
  await p.goto(B+"/the-story",{waitUntil:"domcontentloaded"});
  // Animasyon 520ms; bitmesini bekle. JS KAPALI olsa da CSS animasyonu
  // calisir ve `both` ile son durumda kalir — olculecek olan bu.
  await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{
    const h=document.querySelector("h1"); if(!h) return {err:"h1 yok"};
    const cs=getComputedStyle(h); const rect=h.getBoundingClientRect();
    return {op:cs.opacity, vis:cs.visibility, w:Math.round(rect.width), h:Math.round(rect.height)};});
  console.log("JS kapali h1:", JSON.stringify(r));
  if(!r || Number(r.op)<0.99 || r.vis==="hidden" || r.w<10) { bad++; console.log("  <- icerik GIZLI"); }
  await br.close();
}
console.log("\nsorun:", bad);
process.exit(bad?1:0);
