import { useEffect } from "react";
import logo from "./assets/logo.png";

export default function App() {
  const pillars = [
    "Consulting",
    "Strategy & Advisory",
    "Business Transformation",
    "Enterprise AI",
    "Digital Transformation",
    "Product Engineering",
  ];
  const engines = [
    "Integrating Generative AI",
    "Predictive Intelligence",
    "NOX Analytics",
    "Biz Cred",
    "ANM Quadrant",
    "SIIRLI",
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#0D0D0D",
        color: "#ffffff",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100% { opacity:.5; transform:scale(1); box-shadow:0 0 0 0 rgba(220,38,38,.4); } 50% { opacity:1; transform:scale(1.3); box-shadow:0 0 0 5px rgba(220,38,38,0); } }
        @keyframes glowPulse { 0%,100% { opacity:.06; } 50% { opacity:.13; } }
        @keyframes scanline { 0% { top:-60px; } 100% { top:100vh; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
        @keyframes borderGlow { 0%,100% { border-color:#1E1E1E; } 50% { border-color:rgba(220,38,38,.3); } }
        .reveal { opacity:0; animation:fadeUp .7s cubic-bezier(.16,1,.3,1) forwards; }
        .logo-float { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) forwards, float 5s ease-in-out .7s infinite; }
        .arch-card { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) forwards, borderGlow 4s ease-in-out .7s infinite; }
        .pillar-chip { transition:border-color .3s,color .3s,transform .25s,background .3s; cursor:default; }
        .pillar-chip:hover { border-color:#dc2626!important; color:#fff!important; transform:translateY(-2px); background:rgba(220,38,38,.07)!important; }
        .engine-chip { transition:border-color .3s,transform .25s,background .3s,color .3s; cursor:default; }
        .engine-chip:hover { border-color:#dc2626!important; transform:translateY(-2px); background:rgba(220,38,38,.1)!important; color:#dc2626!important; }
        .email-link { transition:color .25s,letter-spacing .25s; }
        .email-link:hover { color:#dc2626!important; letter-spacing:.8px; }
        @media (prefers-reduced-motion:reduce) { .reveal,.logo-float,.arch-card,video { animation:none!important; opacity:1!important; } }
      `}</style>

      {/* Video Background Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source
          // src="https://res.cloudinary.com/dpkzmquhc/video/upload/v1782911574/0_Digital_Code_3840x2160_tkprtz.mp4"
          src="https://res.cloudinary.com/dpkzmquhc/video/upload/v1782912757/0_Digital_Art_Futuristic_3840x2160_gymlhy.mp4"
          // src="https://res.cloudinary.com/dpkzmquhc/video/upload/v1782912738/15254965_1920_1080_24fps_kkztac.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay to maintain text contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(13, 13, 13, 0.65)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Cyber Glow Effects */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
          animation: "glowPulse 6s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(180deg, transparent, rgba(220,38,38,0.05), transparent)",
          animation: "scanline 8s linear infinite",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 32px",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          gap: "0",
        }}
      >
        {/* Logo */}
        <div className="logo-float reveal" style={{ animationDelay: "0.05s", marginBottom: "10px" }}>
          <img src={logo} alt="Biz Credence" style={{ width: "200px", objectFit: "contain" }} />
        </div>

        {/* Eyebrow */}
        <p
          className="reveal"
          style={{
            animationDelay: "0.14s",
            color: "#dc2626",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Strategy for Tomorrow · Intelligence for Today · Engineering for What's Next
        </p>

        {/* Headline */}
        <h1
          className="reveal"
          style={{
            animationDelay: "0.23s",
            fontSize: "42px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            marginBottom: "10px",
            textShadow: "0 0 40px rgba(255,255,255,0.08)",
          }}
        >
          Helping Enterprises Navigate Complexity, At Scale.
        </h1>

        {/* Subtext */}
        <p
          className="reveal"
          style={{
            animationDelay: "0.32s",
            color: "#bbbbbb",
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "600px",
            marginBottom: "14px",
          }}
        >
          Creating measurable outcomes and enduring competitive advantage through consulting, transformation, and
          engineering built for what comes next.
        </p>

        {/* Divider */}
        <div
          className="reveal"
          style={{
            animationDelay: "0.38s",
            width: "48px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
            borderRadius: "2px",
            marginBottom: "14px",
          }}
        />

        {/* Pillars */}
        <div
          className="reveal"
          style={{
            animationDelay: "0.44s",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "16px",
            maxWidth: "680px",
          }}
        >
          {pillars.map((p, i) => (
            <span
              key={i}
              className="pillar-chip"
              style={{
                border: "1px solid #2A2A2A",
                color: "#cccccc",
                fontSize: "12px",
                fontWeight: 500,
                padding: "7px 16px",
                borderRadius: "999px",
                background: "rgba(13, 13, 13, 0.4)",
                backdropFilter: "blur(4px)",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Architecture card */}
        <div
          className="arch-card reveal"
          style={{
            animationDelay: "0.52s",
            width: "100%",
            background: "rgba(17,17,17,0.85)",
            border: "1px solid #1E1E1E",
            borderRadius: "16px",
            padding: "20px 28px",
            marginBottom: "16px",
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            style={{
              color: "#dc2626",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            Powered By
          </p>
          <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "14px", color: "#ffffff" }}>
            Biz Credence Enterprise Intelligence Architecture
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
            {engines.map((e, i) => (
              <span
                key={i}
                className="engine-chip"
                style={{
                  border: "1px solid #2A2A2A",
                  color: "#eeeeee",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "10px",
                  background: "#0D0D0D",
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Coming soon + email row */}
        <div
          className="reveal"
          style={{
            animationDelay: "0.6s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#dc2626",
                display: "inline-block",
                animation: "pulseDot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#ffffff" }}>
              Biz Credence 3.0
            </span>
            <span style={{ fontSize: "13px", color: "#666666" }}>— Coming Soon</span>
          </div>
          <span style={{ color: "#333", fontSize: "13px" }}>·</span>
          <a
            href="mailto:connect@bizcredence.com"
            className="email-link"
            style={{ color: "#999999", fontSize: "13px", textDecoration: "none", fontWeight: 500 }}
          >
            connect@bizcredence.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        className="reveal"
        style={{
          animationDelay: "0.7s",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "10px",
          borderTop: "1px solid #1A1A1A",
          color: "#ffffff",
          fontSize: "11px",
          letterSpacing: "1px",
          flexShrink: 0,
        }}
      >
        © {new Date().getFullYear()} Biz Credence. All rights reserved.
      </div>
    </div>
  );
}