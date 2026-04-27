"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIAppFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [namaBunda, setNamaBunda] = useState("");
  const [tempInput, setTempInput] = useState(""); 
  const [pesanBaru, setPesanBaru] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: "dokter", text: "Halo Bunda! Ada yang bisa dr. Andi bantu hari ini?", time: "08:45" }
  ]);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const userTypedName = tempInput.trim() !== "" ? tempInput : "Bunda";
    setNamaBunda(userTypedName);
    setIsLoggedIn(true);
  };

  const handleSendMessage = () => {
    if (pesanBaru.trim() === "") return;
    const userMsg = { id: Date.now(), sender: "bunda", text: pesanBaru, time: "Baru saja" };
    setChatHistory([...chatHistory, userMsg]);
    setPesanBaru("");

    setIsTyping(true);
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: "dokter",
        text: `Pesan sudah dr. Andi terima Bunda ${namaBunda}. Mohon ditunggu sebentar ya, saya sedang mengecek jadwal si kecil.`,
        time: "Baru saja"
      };
      setChatHistory(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 2000); 
  };

  // --- HALAMAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[380px] space-y-8">
          <div className="bg-pink-200 rounded-b-[100px] p-12 pb-20 text-center shadow-inner">
            <h2 className="text-2xl font-black text-slate-800 mb-8 tracking-[0.2em]">MOBILE-KIA</h2>
            <div className="w-36 h-36 bg-white rounded-full mx-auto flex items-center justify-center border-8 border-white shadow-2xl text-7xl">👩‍🍼</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 px-10">
            <div className="text-center space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Masukkan Nama Anda</p>
              <Input 
                placeholder="Ketik Intan / Olive / Nama Anda" 
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="rounded-full border-slate-200 h-14 text-center text-lg font-bold shadow-sm focus:ring-pink-300" 
              />
            </div>
            <Button type="submit" className="w-full rounded-full h-14 bg-pink-300 hover:bg-pink-400 text-slate-800 font-black text-lg shadow-lg">
              MASUK
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden pb-32">
      {/* Background Pink Melengkung */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#FBCFE8] rounded-b-[60px] -z-10"></div>
      
      <div className="max-w-2xl mx-auto pt-12 px-6">
        <h1 className="text-center text-2xl font-black text-slate-800 mb-10 tracking-widest uppercase">Mobile-KIA</h1>

        {activeTab === "dashboard" ? (
          <div className="animate-in fade-in duration-500">
            {/* Header Profil */}
            <div className="flex items-center justify-between mb-8 bg-white/40 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/40">
              <div className="text-left">
                <p className="text-xl text-slate-700">Halo,</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{namaBunda}</h2>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="profile" />
              </div>
            </div>

            {/* Menu Navigasi Utama (Sudah Berfungsi) */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <button onClick={() => setActiveTab("informasi anak")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200 transition-all active:scale-95">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl shadow-lg">👧</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">Informasi Anak</p>
              </button>
              <button onClick={() => setActiveTab("riwayat imunisasi")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200 transition-all active:scale-95">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl shadow-lg">💉</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">Riwayat Imunisasi</p>
              </button>
              <button onClick={() => setActiveTab("jadwal imunisasi")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200 transition-all active:scale-95">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl shadow-lg">📅</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">Jadwal Imunisasi</p>
              </button>
            </div>

            {/* Reminder Card */}
            <div className="space-y-5">
              <h3 className="font-black text-2xl text-slate-800 ml-2">Reminder</h3>
              <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl relative overflow-hidden">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px]">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-sm font-black uppercase text-blue-500">Tue</p>
                </div>
                <div>
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest text-white/80">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* KONTEN DETAIL SAAT TOMBOL DIATAS DIKLIK */
          <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl border border-white min-h-[500px] flex flex-col animate-in slide-in-from-right duration-300">
             <button onClick={() => setActiveTab("dashboard")} className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-black text-[10px] mb-8 w-fit uppercase">← Kembali ke Beranda</button>
             
             {/* ISI: INFORMASI ANAK */}
             {activeTab === "informasi anak" && (
               <div className="space-y-6">
                 <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Detail Si Kecil</h2>
                 <div className="bg-blue-50 p-6 rounded-[2.5rem] border-2 border-dashed border-blue-200 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-6xl opacity-10">👧</div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Anak</p>
                    <p className="text-xl font-black text-blue-600 mb-4">Ananda dari Bunda {namaBunda}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Usia</p>
                        <p className="font-black text-slate-800">12 Bulan</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Berat Badan</p>
                        <p className="font-black text-slate-800">9.5 Kg</p>
                      </div>
                    </div>
                 </div>
               </div>
             )}

             {/* ISI: RIWAYAT IMUNISASI */}
             {activeTab === "riwayat imunisasi" && (
               <div className="space-y-4">
                 <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Riwayat Selesai</h2>
                 {[
                   { nama: "BCG + Polio 1", tgl: "02 Feb 2026", tempat: "Puskesmas" },
                   { nama: "DPT-HB-Hib 1 + Polio 2", tgl: "15 Mar 2026", tempat: "Posyandu" },
                   { nama: "DPT-HB-Hib 2 + Polio 3", tgl: "20 Apr 2026", tempat: "Posyandu" }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center bg-green-50 p-5 rounded-[2rem] border border-green-100">
                     <div>
                       <p className="font-black text-slate-800">{item.nama}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase">{item.tgl} • {item.tempat}</p>
                     </div>
                     <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shadow-md">✓</div>
                   </div>
                 ))}
               </div>
             )}

             {/* ISI: JADWAL IMUNISASI */}
             {activeTab === "jadwal imunisasi" && (
               <div className="space-y-4">
                 <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Jadwal Berikutnya</h2>
                 <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-orange-400 text-white p-3 rounded-2xl text-xl">📅</div>
                      <div>
                        <p className="font-black text-orange-700">Campak-Rubella</p>
                        <p className="text-xs font-bold text-orange-600/70">Usia 9 Bulan / Lanjutan</p>
                      </div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Estimasi Tanggal</p>
                       <p className="text-lg font-black text-slate-800">12 Mei 2026</p>
                    </div>
                 </div>
                 <p className="text-[10px] text-center font-bold text-slate-400 px-4 italic">*Pastikan Bunda membawa Buku KIA saat kunjungan.</p>
               </div>
             )}

             {/* ISI: CHAT DOKTER */}
             {activeTab === "chat" && (
               <div className="flex-1 flex flex-col">
                 <div className="flex items-center gap-4 mb-6 border-b pb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full border-2 border-green-400 overflow-hidden shadow-sm">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" alt="Dokter" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-slate-800">dr. Andi Pratama</h2>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isTyping ? 'text-blue-500 animate-pulse' : 'text-green-500'}`}>
                            {isTyping ? '● Sedang Mengetik...' : '● Online'}
                        </p>
                    </div>
                 </div>
                 <div className="flex-1 space-y-4 overflow-y-auto max-h-[320px] pr-2 mb-4">
                    {chatHistory.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'bunda' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 rounded-[1.5rem] max-w-[85%] text-sm shadow-sm ${msg.sender === 'bunda' ? 'bg-pink-100 rounded-tr-none text-slate-800' : 'bg-slate-100 rounded-tl-none text-slate-700'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                 </div>
                 <div className="flex gap-2 pt-2 border-t">
                    <Input value={pesanBaru} onChange={e => setPesanBaru(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Tanya Dokter Andi..." className="rounded-full bg-slate-50 border-none px-6 h-12" />
                    <Button onClick={handleSendMessage} className="w-12 h-12 rounded-full bg-pink-400 shadow-lg active:scale-90 transition-all">✈️</Button>
                 </div>
               </div>
             )}

             {/* ISI: NOTIFIKASI */}
             {activeTab === "notif" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-800 uppercase">Notifikasi</h2>
                  <div className="bg-pink-50 p-6 rounded-[2.5rem] border-l-8 border-pink-400 relative">
                    <p className="font-black text-slate-800">Halo Bunda {namaBunda}!</p>
                    <p className="text-sm text-slate-600 mt-2">Jangan lupa jadwal Posyandu besok pagi jam 09.30 di Posyandu Bulan Mas. Siapkan buku KIA-nya ya!</p>
                    <span className="absolute top-4 right-6 text-[9px] font-black text-pink-400 uppercase">Baru Saja</span>
                  </div>
                </div>
             )}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH (AKTIF) */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-2xl">
           <span onClick={() => setActiveTab("dashboard")} className={`text-3xl cursor-pointer transition-all ${activeTab === 'dashboard' ? 'text-pink-400 scale-125' : 'text-slate-200'}`}>🏠</span>
           <span className="text-slate-200 text-3xl cursor-pointer">🔍</span>
           {/* Tombol Chat */}
           <span onClick={() => setActiveTab("chat")} className={`text-3xl cursor-pointer transition-all ${activeTab === 'chat' ? 'text-pink-400 scale-125' : 'text-slate-200'}`}>💬</span>
           {/* Tombol Notifikasi */}
           <div onClick={() => setActiveTab("notif")} className="relative cursor-pointer">
              <span className={`text-3xl transition-all ${activeTab === 'notif' ? 'text-pink-400 scale-125' : 'text-slate-200'}`}>🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">1</span>
           </div>
           <span onClick={() => { setIsLoggedIn(false); setTempInput(""); }} className="text-slate-200 text-3xl cursor-pointer hover:text-red-400">👤</span>
        </div>
      </div>
    </div>
  );
}