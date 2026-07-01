import { useEffect, useRef } from "react";
import logo from "./assets/logo.png";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(), speed: Math.random() * 0.008 + 0.003,
    }));

    const makeComet = () => {
      const angle = Math.random() * 0.4 + 0.15;
      const speed = Math.random() * 6 + 4;
      const startEdge = Math.random();
      let x, y;
      if (startEdge < 0.5) { x = Math.random() * W * 0.7; y = -10; }
      else { x = -10; y = Math.random() * H * 0.6; }
      return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, maxLife: Math.random() * 180 + 100, tail: [] };
    };
    let comets = [makeComet(), makeComet(), makeComet()];

    const dataLines = Array.from({ length: 12 }, (_, i) => ({
      x: (i + 1) * (W / 13), y: Math.random() * H,
      speed: Math.random() * 1.5 + 0.5, length: Math.random() * 60 + 30,
    }));

    let frameCount = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frameCount++;

      stars.forEach(s => {
        s.alpha += s.speed;
        const a = (Math.sin(s.alpha) + 1) / 2;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.1 + a * 0.5})`; ctx.fill();
      });

      dataLines.forEach(dl => {
        dl.y += dl.speed;
        if (dl.y > H + dl.length) { dl.y = -dl.length; dl.x = Math.random() * W; }
        const grad = ctx.createLinearGradient(dl.x, dl.y - dl.length, dl.x, dl.y);
        grad.addColorStop(0, "rgba(220,38,38,0)");
        grad.addColorStop(0.6, "rgba(220,38,38,0.06)");
        grad.addColorStop(1, "rgba(220,38,38,0.18)");
        ctx.beginPath(); ctx.moveTo(dl.x, dl.y - dl.length); ctx.lineTo(dl.x, dl.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(dl.x, dl.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,38,38,0.5)"; ctx.fill();
      });

      comets.forEach((c, ci) => {
        c.life++; c.tail.push({ x: c.x, y: c.y });
        if (c.tail.length > 28) c.tail.shift();
        c.x += c.vx; c.y += c.vy;
        c.tail.forEach((pt, i) => {
          const progress = i / c.tail.length;
          const lifeProgress = c.life / c.maxLife;
          const alpha = progress * (lifeProgress < 0.2 ? lifeProgress / 0.2 : lifeProgress > 0.8 ? (1 - lifeProgress) / 0.2 : 1) * 0.8;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, (1 - progress) * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,${Math.floor(200 * progress)},${Math.floor(200 * progress)},${alpha})`; ctx.fill();
        });
        const headAlpha = c.life < 20 ? c.life / 20 : c.life > c.maxLife - 20 ? (c.maxLife - c.life) / 20 : 1;
        const grd = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 8);
        grd.addColorStop(0, `rgba(255,255,255,${headAlpha * 0.9})`);
        grd.addColorStop(0.4, `rgba(220,80,80,${headAlpha * 0.4})`);
        grd.addColorStop(1, "rgba(220,38,38,0)");
        ctx.beginPath(); ctx.arc(c.x, c.y, 8, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        if (c.life >= c.maxLife || c.x > W + 50 || c.y > H + 50) comets[ci] = makeComet();
      });

      if (frameCount % 220 === 0) comets.push(makeComet());
      if (comets.length > 5) comets.shift();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const pillars = ["Consulting", "Strategy & Advisory", "Business Transformation", "Enterprise AI", "Digital Transformation", "Product Engineering"];
  const engines = ["Generative AI", "Predictive Intelligence", "NOX Analytics", "ANM Quadrant", "SIIRLI"];

  return (
    <div style={{ height: "100vh", width: "100%", background: "#0D0D0D", color: "#ffffff", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100% { opacity:.5; transform:scale(1); box-shadow:0 0 0 0 rgba(220,38,38,.4); } 50% { opacity:1; transform:scale(1.3); box-shadow:0 0 0 5px rgba(220,38,38,0); } }
        @keyframes glowPulse { 0%,100% { opacity:.06; } 50% { opacity:.13; } }
        @keyframes scanline { 0% { top:-60px; } 100% { top:100vh; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
        @keyframes borderGlow { 0%,100% { border-color:#1E1E1E; } 50% { border-color:rgba(220,38,38,.3); } }
        .reveal { opacity:1; animation:fadeUp .7s cubic-bezier(.16,1,.3,1) forwards; }
        .logo-float { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) forwards, float 5s ease-in-out .7s infinite; }
        .arch-card { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) forwards, borderGlow 4s ease-in-out .7s infinite; }
                        .pillar-chip { transition:border-color .3s,color .3s,transform .25s,background .3s; cursor:default; }
        .pillar-chip:hover { border-color:#dc2626!important; color:#fff!important; transform:translateY(-2px); background:rgba(220,38,38,.07)!important; }
        .engine-chip { transition:border-color .3s,transform .25s,background .3s,color .3s; cursor:default; }
        .engine-chip:hover { border-color:#dc2626!important; transform:translateY(-2px); background:rgba(220,38,38,.1)!important; color:#dc2626!important; }
        .email-link { transition:color .25s,letter-spacing .25s; }
        .email-link:hover { color:#dc2626!important; letter-spacing:.8px; }
        @media (prefers-reduced-motion:reduce) { .reveal,.logo-float,.arch-card,canvas { animation:none!important; opacity:1!important; } }
      `}</style>

      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }} />

      <div style={{ position:"absolute", top:"-15%", left:"50%", transform:"translateX(-50%)", width:"800px", height:"800px", background:"radial-gradient(circle, rgba(220,38,38,0.09) 0%, transparent 65%)", filter:"blur(40px)", animation:"glowPulse 6s ease-in-out infinite", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", left:0, right:0, height:"80px", background:"linear-gradient(180deg, transparent, rgba(220,38,38,0.05), transparent)", animation:"scanline 8s linear infinite", pointerEvents:"none", zIndex:2 }} />
      <div style={{ position:"absolute", inset:0, zIndex:1, backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize:"56px 56px", pointerEvents:"none" }} />

      {/* CONTENT */}
      <div style={{ position:"relative", zIndex:10, flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 32px", maxWidth:"900px", margin:"0 auto", width:"100%", gap:"0" }}>

        {/* Logo */}
        <div className={`logo-float reveal`} style={{ animationDelay:"0.05s", marginBottom:"10px" }}>
          <img src={logo} alt="Biz Credence" style={{ width:"90px", objectFit:"contain" }} />
        </div>

        {/* Eyebrow */}
        <p className="reveal" style={{ animationDelay:"0.14s", color:"#dc2626", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"10px" }}>
          Strategy for Tomorrow · Intelligence for Today · Engineering for What's Next
        </p>

        {/* Headline */}
        <h1 className={`reveal`} style={{ animationDelay:"0.23s", fontSize:"42px", fontWeight:800, lineHeight:1.15, letterSpacing:"-0.5px", marginBottom:"10px", textShadow:"0 0 40px rgba(255,255,255,0.08)" }}>
          Helping enterprises navigate complexity, at scale.
        </h1>

        {/* Subtext */}
        <p className="reveal" style={{ animationDelay:"0.32s", color:"#bbbbbb", fontSize:"15px", lineHeight:1.7, maxWidth:"600px", marginBottom:"14px" }}>
          Creating measurable outcomes and enduring competitive advantage through consulting, transformation, and engineering built for what comes next.
        </p>

        {/* Divider */}
        <div className="reveal" style={{ animationDelay:"0.38s", width:"48px", height:"2px", background:"linear-gradient(90deg, transparent, #dc2626, transparent)", borderRadius:"2px", marginBottom:"14px" }} />

        {/* Pillars */}
        <div className="reveal" style={{ animationDelay:"0.44s", display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px", marginBottom:"16px", maxWidth:"680px" }}>
          {pillars.map((p, i) => (
            <span key={i} className="pillar-chip" style={{ border:"1px solid #2A2A2A", color:"#cccccc", fontSize:"12px", fontWeight:500, padding:"7px 16px", borderRadius:"999px" }}>{p}</span>
          ))}
        </div>

        {/* Architecture card */}
        <div className={`arch-card reveal`} style={{ animationDelay:"0.52s", width:"100%", background:"rgba(17,17,17,0.95)", border:"1px solid #1E1E1E", borderRadius:"16px", padding:"20px 28px", marginBottom:"16px", backdropFilter:"blur(8px)" }}>
          <p style={{ color:"#dc2626", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"6px" }}>Powered By</p>
          <h2 style={{ fontSize:"17px", fontWeight:700, marginBottom:"14px", color:"#ffffff" }}>Biz Credence Enterprise Intelligence Architecture</h2>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px" }}>
            {engines.map((e, i) => (
              <span key={i} className="engine-chip" style={{ border:"1px solid #2A2A2A", color:"#eeeeee", fontSize:"12px", fontWeight:600, padding:"8px 16px", borderRadius:"10px", background:"#0D0D0D" }}>{e}</span>
            ))}
          </div>
        </div>

        {/* Coming soon + email row */}
        <div className="reveal" style={{ animationDelay:"0.6s", display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:"20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#dc2626", display:"inline-block", animation:"pulseDot 2s ease-in-out infinite", flexShrink:0 }} />
            <span style={{ fontSize:"13px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#ffffff" }}>Biz Credence 3.0</span>
            <span style={{ fontSize:"13px", color:"#666666" }}>— Coming Soon</span>
          </div>
          <span style={{ color:"#333", fontSize:"13px" }}>·</span>
          <a href="mailto:connect@bizcredence.com" className="email-link" style={{ color:"#999999", fontSize:"13px", textDecoration:"none", fontWeight:500 }}>
            connect@bizcredence.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="reveal" style={{ animationDelay:"0.7s", position:"relative", zIndex:10, textAlign:"center", padding:"10px", borderTop:"1px solid #1A1A1A", color:"#444444", fontSize:"11px", letterSpacing:"1px", flexShrink:0 }}>
        © {new Date().getFullYear()} Biz Credence. All rights reserved.
      </div>
    </div>
  );
}