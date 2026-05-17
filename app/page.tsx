/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Role = "Ibu" | "Bidan";
type Tab  = "dashboard" | "anak" | "imunisasi" | "anc" | "grafik" | "edukasi" | "chat" | "notif" | "profil";
interface ChatMsg { id: number; sender: "bunda" | "dokter"; text: string; time: string; }
interface Imunisasi { id: number; vaksin: string; tgl: string; status: "Selesai" | "Terjadwal" | "Belum"; tempat?: string; }
interface ANC { id: number; tgl: string; bb: number; tensi: string; catatan: string; }

function toNama(s: string) {
  return s.replace(/[_.\-]+/g, " ").trim()
    .replace(/\w\S*/g, (w: string) => w[0].toUpperCase() + w.slice(1).toLowerCase()) || "Bunda";
}
const HPHT = "2024-01-10";
function usiaKehamilan() {
  const d = Math.floor((Date.now() - new Date(HPHT).getTime()) / 86400000);
  return { minggu: Math.floor(d / 7), hari: d % 7 };
}
function hpl() {
  const d = new Date(HPHT); d.setDate(d.getDate() + 280);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
function sisaHari() {
  const d = new Date(HPHT); d.setDate(d.getDate() + 280);
  return Math.max(0, Math.floor((d.getTime() - Date.now()) / 86400000));
}

const IMUNISASI: Imunisasi[] = [
  { id:1, vaksin:"Hepatitis B (HB-0)",       tgl:"2023-06-20", status:"Selesai",   tempat:"Puskesmas" },
  { id:2, vaksin:"BCG + Polio 1",             tgl:"2023-07-18", status:"Selesai",   tempat:"Posyandu"  },
  { id:3, vaksin:"DPT-HB-Hib 1 + Polio 2",   tgl:"2023-08-20", status:"Selesai",   tempat:"Posyandu"  },
  { id:4, vaksin:"DPT-HB-Hib 2 + Polio 3",   tgl:"2023-09-20", status:"Selesai",   tempat:"Posyandu"  },
  { id:5, vaksin:"DPT-HB-Hib 3 + Polio 4",   tgl:"2024-05-12", status:"Terjadwal", tempat:"Posyandu"  },
  { id:6, vaksin:"MR (Campak-Rubella)",        tgl:"2024-06-20", status:"Belum"                        },
];
const ANC_DATA: ANC[] = [
  { id:1, tgl:"2024-02-10", bb:56, tensi:"110/70", catatan:"Kondisi baik, lanjutkan vitamin." },
  { id:2, tgl:"2024-03-08", bb:58, tensi:"112/72", catatan:"Perbanyak konsumsi zat besi dan istirahat cukup." },
  { id:3, tgl:"2024-04-05", bb:61, tensi:"115/75", catatan:"Perkembangan janin normal." },
  { id:4, tgl:"2024-05-03", bb:64, tensi:"118/76", catatan:"Persiapkan perlengkapan persalinan." },
];
const BERAT = [
  { umur:"0",  berat:3.2, lo:2.9, hi:4.4 },
  { umur:"2",  berat:5.1, lo:4.3, hi:6.3 },
  { umur:"4",  berat:6.4, lo:5.6, hi:7.8 },
  { umur:"6",  berat:7.3, lo:6.4, hi:8.8 },
  { umur:"8",  berat:8.0, lo:7.0, hi:9.6 },
  { umur:"10", berat:8.6, lo:7.5, hi:10.2 },
  { umur:"11", berat:8.9, lo:7.8, hi:10.5 },
];
const EDUKASI = [
  { judul:"Cara Memandikan Bayi Newborn",  durasi:"5:30",  kat:"Perawatan", icon:"🛁",  color:"#9b5de5" },
  { judul:"Resep MPASI 6 Bulan Pertama",   durasi:"8:15",  kat:"Nutrisi",   icon:"🥣",  color:"#ff4d8d" },
  { judul:"Teknik Menyusui yang Benar",    durasi:"6:45",  kat:"ASI",       icon:"🤱",  color:"#00b4d8" },
  { judul:"Stimulasi Tumbuh Kembang Bayi", durasi:"10:00", kat:"Tumbuh",    icon:"🧸",  color:"#00f5d4" },
  { judul:"Tanda Bahaya Kehamilan",        durasi:"7:20",  kat:"Kehamilan", icon:"⚠️", color:"#ffd60a" },
  { judul:"Senam Hamil Trimester 3",       durasi:"15:00", kat:"Olahraga",  icon:"🧘",  color:"#ff4d8d" },
];

function GrafikKMS() {
  const W=340,H=190,PL=38,PR=12,PT=14,PB=32;
  const cW=W-PL-PR, cH=H-PT-PB, n=BERAT.length;
  const xs=cW/(n-1), lo=2, hi=11;
  const ys=(v: number)=>cH-((v-lo)/(hi-lo))*cH;
  const makePath=(k: "berat"|"lo"|"hi")=>BERAT.map((d,i)=>`${i===0?"M":"L"}${PL+i*xs},${PT+ys(d[k])}`).join(" ");
  const area=BERAT.map((d,i)=>`${i===0?"M":"L"}${PL+i*xs},${PT+ys(d.hi)}`).join(" ")+" "+
    [...BERAT].reverse().map((d,i)=>`L${PL+(n-1-i)*xs},${PT+ys(d.lo)}`).join(" ")+" Z";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto"}}>
      <defs>
        <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9b5de5"/>
          <stop offset="100%" stopColor="#ff4d8d"/>
        </linearGradient>
      </defs>
      <path d={area} fill="rgba(0,245,212,0.12)"/>
      <path d={makePath("hi")} fill="none" stroke="rgba(0,245,212,0.4)" strokeWidth="1" strokeDasharray="3 2"/>
      <path d={makePath("lo")} fill="none" stroke="rgba(0,245,212,0.4)" strokeWidth="1" strokeDasharray="3 2"/>
      <path d={makePath("berat")} fill="none" stroke="url(#lineGrad2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {BERAT.map((d,i)=>(
        <g key={i}>
          <circle cx={PL+i*xs} cy={PT+ys(d.berat)} r="5" fill="#ff4d8d" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
          <text x={PL+i*xs} y={H-6} textAnchor="middle" fontSize="8" fill="rgba(248,240,255,0.4)">{d.umur}b</text>
        </g>
      ))}
      {[3,5,7,9,11].map(v=>(
        <text key={v} x={PL-5} y={PT+ys(v)+3} textAnchor="end" fontSize="8" fill="rgba(248,240,255,0.4)">{v}</text>
      ))}
    </svg>
  );
}

function Counter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      setDisplay(Math.round((frame / 40) * value));
      if (frame >= 40) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [value]);
  return <>{display}</>;
}

function NavItem({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:"6px 8px", position:"relative" }}>
      <span style={{ fontSize:24, filter:active?"none":"grayscale(1) opacity(0.3)", transition:"all 0.2s", transform:active?"scale(1.2)":"scale(1)", display:"block" }}>{icon}</span>
      <span style={{ fontSize:9, fontFamily:"'DM Sans',sans-serif", fontWeight:600, color:active?"#9b5de5":"rgba(248,240,255,0.3)", transition:"color 0.2s", textTransform:"uppercase" as const, letterSpacing:"0.05em" }}>{label}</span>
      {active && <span style={{ position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:"#9b5de5", boxShadow:"0 0 8px #9b5de5" }}/>}
    </button>
  );
}

export default function MobileKIA() {
  const [loggedIn, setLoggedIn]   = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [role, setRole]           = useState<Role>("Ibu");
  const [nama, setNama]           = useState("");
  const [tab, setTab]             = useState<Tab>("dashboard");
  const [ancForm, setAncForm]     = useState({ bb:"", tensi:"", catatan:"" });
  const [ancSaved, setAncSaved]   = useState(false);
  const [pesan, setPesan]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [chat, setChat]           = useState<ChatMsg[]>([
    { id:1, sender:"dokter", text:"Halo Bunda! Ada yang bisa dr. Andi bantu hari ini?", time:"08:45" },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const usia = usiaKehamilan();
  const nextImun = IMUNISASI.find(i => i.status === "Terjadwal");

  useEffect(() => { chatRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [chat]);

  function handleLogin(e: React.FormEvent) { e.preventDefault(); setNama(toNama(nameInput)); setLoggedIn(true); }

  function kirim() {
    if (!pesan.trim()) return;
    setChat(p => [...p, { id:Date.now(), sender:"bunda", text:pesan, time:"Baru" }]);
    setPesan(""); setTyping(true);
    setTimeout(() => {
      setChat(p => [...p, { id:Date.now()+1, sender:"dokter", text:`Terima kasih Bunda ${nama}. Mohon tunggu sebentar ya.`, time:"Baru" }]);
      setTyping(false);
    }, 2000);
  }

  function submitANC(e: React.FormEvent) {
    e.preventDefault();
    setAncSaved(true); setAncForm({ bb:"", tensi:"", catatan:"" });
    setTimeout(() => setAncSaved(false), 3000);
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily:"'Playfair Display', Georgia, serif",
    fontSize:22, fontWeight:700, color:"#f8f0ff", margin:"0 0 20px", letterSpacing:"-0.01em",
  };

  // ═══ LOGIN ═══
  if (!loggedIn) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:16, fontFamily:"'DM Sans', sans-serif" }}>
      <div className="aurora-bg"><div className="aurora-orb"/></div>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:380, animation:"fadeUp 0.6s ease both" }}>
        <Card glow="violet" radius={32} padding="40px 32px">
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ width:80, height:80, borderRadius:24, margin:"0 auto 16px", background:"linear-gradient(135deg,#9b5de5,#ff4d8d)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, boxShadow:"0 12px 36px rgba(155,93,229,0.5)", animation:"pulse-ring 2.5s ease infinite" }}>
              👩‍🍼
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:"#f8f0ff", margin:0, letterSpacing:"-0.02em" }}>
              Mobile<span style={{ color:"#ff4d8d", fontStyle:"italic" }}>KIA</span>
            </h1>
            <p style={{ fontSize:12, color:"rgba(248,240,255,0.45)", marginTop:6, letterSpacing:"0.12em", textTransform:"uppercase" }}>Kesehatan Ibu & Anak</p>
          </div>
          <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:11, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.1em", color:"rgba(248,240,255,0.5)", fontFamily:"'DM Sans',sans-serif" }}>✨ Nama Anda</label>
              <input placeholder="Ketik nama Bunda..." value={nameInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)} style={{ padding:"12px", borderRadius:14, border:"1.5px solid rgba(155,93,229,0.3)", background:"rgba(255,255,255,0.06)", color:"#f8f0ff", fontFamily:"'DM Sans',sans-serif", fontSize:14, backdropFilter:"blur(8px)", transition:"all 0.2s" }}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:11, fontWeight:600, textTransform:"uppercase" as const, letterSpacing:"0.1em", color:"rgba(248,240,255,0.5)", fontFamily:"'DM Sans',sans-serif" }}>Masuk Sebagai</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {(["Ibu","Bidan"] as Role[]).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)} style={{ padding:"12px", borderRadius:14, border:`1.5px solid ${role===r?"#9b5de5":"rgba(255,255,255,0.1)"}`, background:role===r?"rgba(155,93,229,0.2)":"rgba(255,255,255,0.04)", color:role===r?"#c4a5ff":"rgba(248,240,255,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", backdropFilter:"blur(8px)", transition:"all 0.2s", boxShadow:role===r?"0 0 20px rgba(155,93,229,0.3)":"none" }}>
                    {r==="Ibu"?"👩 Ibu":"👩‍⚕️ Bidan"}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" style={{ marginTop:8, width:"100%", letterSpacing:"0.08em" }}>MASUK →</Button>
          </form>
        </Card>
      </div>
    </div>
  );

  const isDash = tab === "dashboard";

  // ═══ MAIN APP ═══
  return (
    <div style={{ minHeight:"100vh", fontFamily:"'DM Sans', sans-serif" }}>
      <div className="aurora-bg"><div className="aurora-orb"/></div>
      <div style={{ position:"relative", zIndex:1, maxWidth:480, margin:"0 auto", padding:"52px 16px 110px" }}>

        {/* Topbar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#f8f0ff", margin:0 }}>
            Mobile<span style={{ color:"#ff4d8d", fontStyle:"italic" }}>KIA</span>
          </h1>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#f8f0ff" }}>{nama}</div>
              <div style={{ fontSize:10, color:"rgba(248,240,255,0.4)", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{role}</div>
            </div>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nama}`} alt="avatar" style={{ width:40, height:40, borderRadius:"50%", border:"2px solid rgba(155,93,229,0.6)", background:"rgba(255,255,255,0.06)" }}/>
          </div>
        </div>

        {/* ══ DASHBOARD ══ */}
        {isDash && (
          <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp 0.4s ease both" }}>
            <Card glow="violet" radius={28} padding="28px">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap" as const, gap:16 }}>
                <div>
                  <p style={{ margin:"0 0 4px", fontSize:11, textTransform:"uppercase" as const, letterSpacing:"0.12em", color:"rgba(248,240,255,0.5)" }}>Selamat Datang,</p>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:900, color:"#f8f0ff", margin:"0 0 14px", lineHeight:1.1 }}>{nama} ✨</h2>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" as const }}>
                    <div style={{ background:"rgba(155,93,229,0.2)", border:"1px solid rgba(155,93,229,0.3)", borderRadius:12, padding:"8px 14px" }}>
                      <p style={{ margin:0, fontSize:10, color:"rgba(248,240,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Usia Kehamilan</p>
                      <p style={{ margin:0, fontSize:18, fontWeight:800, color:"#c4a5ff" }}>{usia.minggu} Minggu</p>
                    </div>
                    <div style={{ background:"rgba(255,77,141,0.15)", border:"1px solid rgba(255,77,141,0.25)", borderRadius:12, padding:"8px 14px" }}>
                      <p style={{ margin:0, fontSize:10, color:"rgba(248,240,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>HPL</p>
                      <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#ffb3cc" }}>{hpl()}</p>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign:"center", background:"linear-gradient(135deg,rgba(155,93,229,0.2),rgba(255,77,141,0.2))", border:"1px solid rgba(155,93,229,0.3)", borderRadius:20, padding:"16px 20px", minWidth:86 }}>
                  <p style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color:"#f8f0ff", lineHeight:1 }}><Counter value={sisaHari()}/></p>
                  <p style={{ margin:"4px 0 0", fontSize:10, color:"rgba(248,240,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>hari lagi</p>
                </div>
              </div>
            </Card>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[
                { label:"BB Terakhir", value:"64 kg", icon:"⚖️", color:"#9b5de5" },
                { label:"Tekanan Darah", value:"118/76", icon:"❤️", color:"#ff4d8d" },
                { label:"Total ANC", value:"4×", icon:"🩺", color:"#00b4d8" },
                { label:"Vaksin Selesai", value:`${IMUNISASI.filter(i=>i.status==="Selesai").length}/${IMUNISASI.length}`, icon:"💉", color:"#00f5d4" },
              ].map((s,i) => (
                <Card key={i} radius={20} padding="16px 18px" hover>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:`${s.color}22`, border:`1px solid ${s.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{s.icon}</div>
                    <div>
                      <p style={{ margin:0, fontSize:10, color:"rgba(248,240,255,0.45)", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{s.label}</p>
                      <p style={{ margin:0, fontSize:17, fontWeight:800, color:"#f8f0ff" }}>{s.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {([
                { t:"anak" as Tab,      icon:"👧", label:"Info Anak",  bg:"linear-gradient(135deg,#9b5de5,#7c3aed)" },
                { t:"imunisasi" as Tab, icon:"💉", label:"Imunisasi",  bg:"linear-gradient(135deg,#00b4d8,#0077b6)" },
                { t:"anc" as Tab,       icon:"🩺", label:"ANC",        bg:"linear-gradient(135deg,#ff4d8d,#c9184a)" },
                { t:"grafik" as Tab,    icon:"📊", label:"KMS",        bg:"linear-gradient(135deg,#00f5d4,#00b4d8)" },
                { t:"edukasi" as Tab,   icon:"📚", label:"Edukasi",    bg:"linear-gradient(135deg,#ffd60a,#fb923c)" },
                { t:"profil" as Tab,    icon:"👤", label:"Profil",     bg:"linear-gradient(135deg,#a855f7,#ec4899)" },
              ]).map(m => (
                <button key={m.t} onClick={()=>setTab(m.t)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"16px 6px 12px", display:"flex", flexDirection:"column" as const, alignItems:"center", gap:8, cursor:"pointer", backdropFilter:"blur(12px)", transition:"all 0.2s" }}>
                  <div style={{ width:48, height:48, borderRadius:16, background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, boxShadow:"0 6px 20px rgba(0,0,0,0.3)" }}>{m.icon}</div>
                  <span style={{ fontSize:10, fontWeight:700, color:"rgba(248,240,255,0.7)", textTransform:"uppercase" as const, letterSpacing:"0.05em", fontFamily:"'DM Sans',sans-serif" }}>{m.label}</span>
                </button>
              ))}
            </div>

            {nextImun && (
              <Card glow="sky" radius={24} padding="18px 20px" hover onClick={()=>setTab("imunisasi")}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:50, height:50, borderRadius:16, background:"linear-gradient(135deg,#00b4d8,#0077b6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>📅</div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:10, color:"rgba(248,240,255,0.45)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Reminder Imunisasi</p>
                    <p style={{ margin:"3px 0 2px", fontWeight:700, fontSize:14, color:"#f8f0ff" }}>{nextImun.vaksin}</p>
                    <p style={{ margin:0, fontSize:11, color:"rgba(0,180,216,0.8)" }}>12 Mei 2026 · {nextImun.tempat}</p>
                  </div>
                  <span style={{ color:"rgba(248,240,255,0.3)", fontSize:18 }}>›</span>
                </div>
              </Card>
            )}

            <Card glow="rose" radius={22} padding="18px">
              <p style={{ margin:"0 0 8px", fontSize:10, color:"rgba(248,240,255,0.45)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Catatan Terakhir Bidan</p>
              <p style={{ margin:0, fontSize:13, color:"rgba(248,240,255,0.8)", fontStyle:"italic", lineHeight:1.6 }}>&quot;{ANC_DATA.at(-1)?.catatan}&quot;</p>
              <p style={{ margin:"8px 0 0", fontSize:11, color:"rgba(255,77,141,0.7)" }}>{new Date(ANC_DATA.at(-1)?.tgl ?? "").toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}</p>
            </Card>
          </div>
        )}

        {/* ══ DETAIL ══ */}
        {!isDash && (
          <div style={{ animation:"fadeUp 0.35s ease both" }}>
            <Button variant="ghost" size="sm" onClick={()=>setTab("dashboard")} style={{ marginBottom:20 }}>← Kembali</Button>

            {tab==="anak" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <h2 style={sectionTitle}>👧 Detail Si Kecil</h2>
                <Card glow="violet" radius={24} padding="22px">
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
                    <div style={{ width:60, height:60, borderRadius:18, background:"linear-gradient(135deg,#9b5de5,#ff4d8d)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30 }}>👶</div>
                    <div>
                      <p style={{ margin:"0 0 2px", fontSize:10, color:"rgba(248,240,255,0.45)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Putra/i dari</p>
                      <p style={{ margin:0, fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"#f8f0ff" }}>Bunda {nama}</p>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[["Usia","12 Bulan"],["Berat Badan","9.5 kg"],["Tinggi Badan","76 cm"],["Jenis Kelamin","Laki-laki"],["Tgl Lahir","20 Jun 2023"],["Gol. Darah","A"]].map(([k,v])=>(
                      <div key={k} style={{ background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"12px" }}>
                        <p style={{ margin:0, fontSize:10, color:"rgba(248,240,255,0.4)", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{k}</p>
                        <p style={{ margin:"3px 0 0", fontWeight:700, fontSize:14, color:"#f8f0ff" }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card glow="mint" radius={18} padding="16px">
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:26 }}>🟢</span>
                    <div>
                      <p style={{ margin:0, fontWeight:700, fontSize:14, color:"#00f5d4" }}>Status Gizi: Normal</p>
                      <p style={{ margin:"3px 0 0", fontSize:12, color:"rgba(248,240,255,0.55)" }}>Z-Score +0.5 — Sesuai standar WHO usia 12 bulan</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {tab==="imunisasi" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <h2 style={sectionTitle}>💉 Riwayat Imunisasi</h2>
                {IMUNISASI.map(im=>{
                  const cfg={Selesai:{color:"#00f5d4",icon:"✅",glow:"mint" as const},Terjadwal:{color:"#ffd60a",icon:"⏰",glow:"gold" as const},Belum:{color:"#ff4d8d",icon:"❌",glow:"rose" as const}}[im.status];
                  return (
                    <Card key={im.id} glow={cfg.glow} radius={18} padding="14px 16px" hover>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:20 }}>{cfg.icon}</span>
                          <div>
                            <p style={{ margin:0, fontWeight:700, fontSize:13, color:"#f8f0ff" }}>{im.vaksin}</p>
                            <p style={{ margin:"2px 0 0", fontSize:10, color:"rgba(248,240,255,0.45)", textTransform:"uppercase" as const, letterSpacing:"0.07em" }}>{new Date(im.tgl).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}{im.tempat?` · ${im.tempat}`:""}</p>
                          </div>
                        </div>
                        <span style={{ background:`${cfg.color}22`, border:`1px solid ${cfg.color}55`, color:cfg.color, borderRadius:999, padding:"4px 10px", fontSize:10, fontWeight:800, flexShrink:0 }}>{im.status}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {tab==="anc" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <h2 style={sectionTitle}>🩺 Pemeriksaan ANC</h2>
                {role==="Bidan" && (
                  <Card glow="rose" radius={22} padding="20px">
                    <p style={{ margin:"0 0 14px", fontWeight:700, fontSize:14, color:"#ffb3cc" }}>Input Pemeriksaan Baru</p>
                    <form onSubmit={submitANC} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                        <Input label="Berat (kg)" icon="⚖️" placeholder="64" type="number" accent="rose" value={ancForm.bb} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAncForm({...ancForm,bb:e.target.value})}/>
                        <Input label="Tekanan Darah" icon="❤️" placeholder="120/80" accent="rose" value={ancForm.tensi} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAncForm({...ancForm,tensi:e.target.value})}/>
                      </div>
                      <Input label="Catatan Bidan" icon="📝" placeholder="Catatan..." multiline rows={2} accent="violet" value={ancForm.catatan} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setAncForm({...ancForm,catatan:e.target.value})}/>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <Button type="submit" variant="primary" size="sm">Simpan</Button>
                        {ancSaved && <span style={{ fontSize:12, color:"#00f5d4", fontWeight:600 }}>✅ Tersimpan!</span>}
                      </div>
                    </form>
                  </Card>
                )}
                {ANC_DATA.map(a=>(
                  <Card key={a.id} radius={18} padding="16px 18px" hover>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, flexWrap:"wrap" as const, gap:8 }}>
                      <span style={{ fontWeight:700, fontSize:13, color:"#f8f0ff" }}>{new Date(a.tgl).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}</span>
                      <div style={{ display:"flex", gap:8 }}>
                        <span style={{ background:"rgba(155,93,229,0.2)", border:"1px solid rgba(155,93,229,0.3)", color:"#c4a5ff", borderRadius:999, padding:"2px 10px", fontSize:11, fontWeight:700 }}>{a.bb} kg</span>
                        <span style={{ background:"rgba(255,77,141,0.15)", border:"1px solid rgba(255,77,141,0.25)", color:"#ffb3cc", borderRadius:999, padding:"2px 10px", fontSize:11, fontWeight:700 }}>{a.tensi}</span>
                      </div>
                    </div>
                    <p style={{ margin:0, fontSize:12, color:"rgba(248,240,255,0.55)", fontStyle:"italic", lineHeight:1.5 }}>&ldquo;{a.catatan}&quot;</p>
                  </Card>
                ))}
              </div>
            )}

            {tab==="grafik" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <h2 style={{...sectionTitle,marginBottom:0}}>📊 Grafik KMS</h2>
                  <span style={{ background:"rgba(0,245,212,0.15)", border:"1px solid rgba(0,245,212,0.3)", color:"#00f5d4", borderRadius:999, padding:"4px 14px", fontSize:11, fontWeight:800 }}>Normal</span>
                </div>
                <Card glow="mint" radius={22} padding="18px"><GrafikKMS/><p style={{ textAlign:"center", fontSize:10, color:"rgba(248,240,255,0.35)", marginTop:8 }}>Hijau = standar WHO · Garis = berat anak</p></Card>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[["👶","Berat Lahir","3.2 kg","#9b5de5"],["⚖️","Saat Ini","8.9 kg","#ff4d8d"],["🎂","Usia","11 Bulan","#00b4d8"],["📈","Z-Score","+0.5","#00f5d4"]].map(([icon,label,value,color])=>(
                    <Card key={label as string} radius={18} padding="16px" hover>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:26, marginBottom:6 }}>{icon}</div>
                        <div style={{ fontWeight:900, fontSize:17, color:color as string }}>{value}</div>
                        <div style={{ fontSize:10, color:"rgba(248,240,255,0.4)", marginTop:3, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{label}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {tab==="edukasi" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <h2 style={sectionTitle}>📚 Materi Edukasi</h2>
                {EDUKASI.map((e,i)=>(
                  <Card key={i} radius={18} padding="0" hover>
                    <div style={{ display:"flex", alignItems:"center", overflow:"hidden", borderRadius:18 }}>
                      <div style={{ width:70, height:70, background:`${e.color}22`, border:`1px solid ${e.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{e.icon}</div>
                      <div style={{ padding:"10px 14px", flex:1 }}>
                        <span style={{ background:`${e.color}22`, color:e.color, borderRadius:999, padding:"2px 10px", fontSize:10, fontWeight:700 }}>{e.kat}</span>
                        <p style={{ margin:"5px 0 2px", fontWeight:700, fontSize:13, color:"#f8f0ff" }}>{e.judul}</p>
                        <p style={{ margin:0, fontSize:11, color:"rgba(248,240,255,0.4)" }}>▶ {e.durasi}</p>
                      </div>
                      <span style={{ paddingRight:14, color:"rgba(248,240,255,0.25)", fontSize:20 }}>›</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {tab==="chat" && (
              <div style={{ display:"flex", flexDirection:"column" }}>
                <h2 style={sectionTitle}>💬 Chat Dokter</h2>
                <Card radius={22} padding="16px" style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ position:"relative" }}>
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" alt="dr" style={{ width:48, height:48, borderRadius:"50%", border:"2px solid rgba(0,245,212,0.5)", background:"rgba(255,255,255,0.06)" }}/>
                      <span style={{ position:"absolute", bottom:1, right:1, width:11, height:11, borderRadius:"50%", background:typing?"#3b82f6":"#00f5d4", border:"2px solid rgba(13,2,33,0.9)" }}/>
                    </div>
                    <div>
                      <p style={{ margin:0, fontWeight:700, fontSize:15, color:"#f8f0ff" }}>dr. Andi Pratama</p>
                      <p style={{ margin:0, fontSize:10, fontWeight:600, color:typing?"#60a5fa":"#00f5d4", textTransform:"uppercase" as const, letterSpacing:"0.07em" }}>{typing?"Sedang mengetik...":"● Online"}</p>
                    </div>
                  </div>
                </Card>
                <div ref={chatRef} style={{ overflowY:"auto" as const, maxHeight:280, display:"flex", flexDirection:"column" as const, gap:10, marginBottom:14 }}>
                  {chat.map(m=>(
                    <div key={m.id} style={{ display:"flex", justifyContent:m.sender==="bunda"?"flex-end":"flex-start" }}>
                      <div style={{ maxWidth:"82%", padding:"11px 14px", fontSize:13, lineHeight:1.55, color:"#f8f0ff", background:m.sender==="bunda"?"rgba(155,93,229,0.25)":"rgba(255,255,255,0.07)", border:m.sender==="bunda"?"1px solid rgba(155,93,229,0.3)":"1px solid rgba(255,255,255,0.1)", borderRadius:m.sender==="bunda"?"18px 18px 4px 18px":"18px 18px 18px 4px", backdropFilter:"blur(8px)" }}>{m.text}</div>
                    </div>
                  ))}
                  {typing && <div style={{ display:"flex" }}><div style={{ padding:"10px 18px", background:"rgba(255,255,255,0.06)", borderRadius:"18px 18px 18px 4px", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(248,240,255,0.5)", fontSize:20 }}>···</div></div>}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <Input placeholder="Tanya dr. Andi..." value={pesan} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPesan(e.target.value)} onKeyDown={(e: React.KeyboardEvent)=>e.key==="Enter"&&kirim()} accent="violet" style={{ flex:1 }}/>
                  <Button variant="primary" size="md" onClick={kirim} style={{ flexShrink:0, borderRadius:14 }}>✈️</Button>
                </div>
              </div>
            )}

            {tab==="notif" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <h2 style={sectionTitle}>🔔 Notifikasi</h2>
                {[
                  { glow:"rose" as const, icon:"🌸", title:`Halo Bunda ${nama}!`, body:"Jangan lupa jadwal Posyandu besok jam 09:30 di Posyandu Bulan Mas. Bawa buku KIA!", badge:"Baru", color:"#ff4d8d" },
                  { glow:"sky" as const,  icon:"⏰", title:"Jadwal Imunisasi Dekat", body:`${nextImun?.vaksin} dijadwalkan 12 Mei 2026 di ${nextImun?.tempat}.`, badge:"Hari Ini", color:"#00b4d8" },
                  { glow:"violet" as const, icon:"💊", title:"Pengingat Vitamin", body:"Jangan lupa konsumsi vitamin prenatal hari ini, Bunda!", badge:"Rutin", color:"#9b5de5" },
                ].map((n,i)=>(
                  <Card key={i} glow={n.glow} radius={20} padding="16px 18px" hover>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                      <div style={{ display:"flex", gap:12, flex:1 }}>
                        <span style={{ fontSize:22 }}>{n.icon}</span>
                        <div>
                          <p style={{ margin:"0 0 4px", fontWeight:700, fontSize:13, color:"#f8f0ff" }}>{n.title}</p>
                          <p style={{ margin:0, fontSize:12, color:"rgba(248,240,255,0.55)", lineHeight:1.5 }}>{n.body}</p>
                        </div>
                      </div>
                      <span style={{ background:`${n.color}22`, border:`1px solid ${n.color}44`, color:n.color, borderRadius:999, padding:"3px 10px", fontSize:9, fontWeight:800, textTransform:"uppercase" as const, flexShrink:0 }}>{n.badge}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {tab==="profil" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <h2 style={sectionTitle}>👤 Profil</h2>
                <Card glow="violet" radius={24} padding="24px" style={{ textAlign:"center" }}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nama}`} alt="avatar" style={{ width:84, height:84, borderRadius:"50%", border:"3px solid rgba(155,93,229,0.5)", boxShadow:"0 8px 28px rgba(155,93,229,0.3)", background:"rgba(255,255,255,0.06)", margin:"0 auto 12px", display:"block" }}/>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"#f8f0ff", margin:"0 0 6px" }}>{nama}</h3>
                  <span style={{ background:"rgba(155,93,229,0.2)", border:"1px solid rgba(155,93,229,0.3)", color:"#c4a5ff", borderRadius:999, padding:"4px 16px", fontSize:12, fontWeight:700 }}>{role}</span>
                </Card>
                <Card radius={22} padding="0" style={{ overflow:"hidden" }}>
                  {[["NIK","7371234567890001"],["Nama Lengkap",nama],["Tgl Lahir","15 Maret 1995"],["HPHT","10 Januari 2024"],["HPL",hpl()],["Gol. Darah","A"]].map(([k,v],i,arr)=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"14px 20px", borderBottom:i<arr.length-1?"1px solid rgba(255,255,255,0.06)":"none" }}>
                      <span style={{ fontSize:13, color:"rgba(248,240,255,0.45)" }}>{k}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:"#f8f0ff" }}>{v}</span>
                    </div>
                  ))}
                </Card>
                <Card glow="sky" radius={18} padding="16px 18px">
                  <p style={{ margin:"0 0 4px", fontWeight:700, fontSize:12, color:"#00b4d8" }}>🔒 Keamanan Data</p>
                  <p style={{ margin:0, fontSize:12, color:"rgba(248,240,255,0.5)", lineHeight:1.5 }}>Data medis dienkripsi AES-256. Hanya tenaga medis berwenang yang dapat mengakses.</p>
                </Card>
                <Button variant="danger" size="md" onClick={()=>{setLoggedIn(false);setNameInput("");}} style={{ width:"100%" }}>🚪 Keluar dari Akun</Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, display:"flex", justifyContent:"center", padding:"10px 16px 20px", zIndex:50 }}>
        <div style={{ width:"100%", maxWidth:460, background:"rgba(13,2,33,0.9)", backdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"10px 24px", display:"flex", justifyContent:"space-around", alignItems:"center", boxShadow:"0 -4px 32px rgba(0,0,0,0.4)" }}>
          <NavItem icon="🏠" label="Home"   active={tab==="dashboard"} onClick={()=>setTab("dashboard")}/>
          <NavItem icon="📚" label="Belajar" active={tab==="edukasi"}   onClick={()=>setTab("edukasi")}/>
          <NavItem icon="💬" label="Chat"   active={tab==="chat"}      onClick={()=>setTab("chat")}/>
          <div onClick={()=>setTab("notif")} style={{ position:"relative", cursor:"pointer" }}>
            <NavItem icon="🔔" label="Notif" active={tab==="notif"}    onClick={()=>setTab("notif")}/>
            <span style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:"#ff4d8d", border:"1.5px solid rgba(13,2,33,0.9)", boxShadow:"0 0 6px #ff4d8d" }}/>
          </div>
          <NavItem icon="👤" label="Profil" active={tab==="profil"}    onClick={()=>setTab("profil")}/>
        </div>
      </div>
    </div>
  );
}