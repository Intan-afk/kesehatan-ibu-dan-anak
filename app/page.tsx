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
        text: `Pesan sudah dr. Andi terima Bunda ${namaBunda}. Mohon ditunggu ya!`,
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
                placeholder="Contoh: Intan / Olive" 
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="rounded-full border-slate-200 h-14 text-center text-lg font-bold" 
              />
            </div>
            <Button type="submit" className="w-full rounded-full h-14 bg-pink-300 hover:bg-pink-400 text-slate-800 font-black text-lg">
              MASUK
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden pb-32">
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

            {/* Menu Utama (AKTIF) */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <button onClick={() => setActiveTab("info")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl">👧</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center">Info Anak</p>
              </button>
              <button onClick={() => setActiveTab("riwayat")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl">💉</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center">Riwayat</p>
              </button>
              <button onClick={() => setActiveTab("jadwal")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl">📅</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center">Jadwal</p>
              </button>
            </div>

            {/* Reminder */}
            <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px]">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-sm font-black uppercase text-blue-500">Tue</p>
                </div>
                <div>
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
            </div>
          </div>
        ) : (
          /* AREA DETAIL TIAP MENU */
          <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl border border-white min-h-[500px] flex flex-col animate-in slide-in-from-right duration-300">
             <button onClick={() => setActiveTab("dashboard")} className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-black text-[10px] mb-8 w-fit uppercase">← Kembali</button>
             
             {/* 1. INFO ANAK */}
             {activeTab === "info" && (
               <div className="space-y-6">
                 <h2 className="text-2xl font-black text-slate-800">Detail Si Kecil</h2>
                 <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-dashed border-blue-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Nama Anak</p>
                    <p className="text-xl font-black text-blue-500">Buah Hati Bunda {namaBunda}</p>
                    <hr className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-[10px] font-bold text-slate-400 uppercase">Usia</p><p className="font-bold">12 Bulan</p></div>
                      <div><p className="text-[10px] font-bold text-slate-400 uppercase">Berat</p><p className="font-bold">9.5 Kg</p></div>
                    </div>
                 </div>
               </div>
             )}

             {/* 2. RIWAYAT IMUNISASI */}
             {activeTab === "riwayat" && (
               <div className="space-y-4">
                 <h2 className="text-2xl font-black text-slate-800">Riwayat Imunisasi</h2>
                 {[
                   { label: "BCG", date: "02 Feb 2026", status: "Selesai" },
                   { label: "Polio 1", date: "15 Mar 2026", status: "Selesai" }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center bg-green-50 p-4 rounded-2xl border border-green-100">
                     <div><p className="font-black text-slate-800">{item.label}</p><p className="text-xs text-slate-500">{item.date}</p></div>
                     <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">{item.status}</span>
                   </div>
                 ))}
               </div>
             )}

             {/* 3. JADWAL IMUNISASI */}
             {activeTab === "jadwal" && (
               <div className="space-y-4">
                 <h2 className="text-2xl font-black text-slate-800">Jadwal Mendatang</h2>
                 <div className="bg-blue-50 p-5 rounded-[2rem] border border-blue-100">
                    <p className="font-black text-blue-600">DPT-HB-Hib 1</p>
                    <p className="text-sm text-slate-600">Estimasi: 12 Mei 2026</p>
                    <p className="text-[10px] font-bold mt-3 text-blue-400 italic">*Siapkan buku KIA saat datang</p>
                 </div>
               </div>
             )}

             {/* 4. CHAT DOKTER */}
             {activeTab === "chat" && (
               <div className="flex-1 flex flex-col">
                 <div className="flex items-center gap-4 mb-6 border-b pb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full border-2 border-green-400 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" alt="Dokter" /></div>
                    <div><h2 className="text-lg font-black text-slate-800">dr. Andi</h2><p className={`text-[10px] font-black ${isTyping ? 'text-blue-500 animate-pulse' : 'text-green-500'}`}>{isTyping ? 'MENGETIK...' : 'ONLINE'}</p></div>
                 </div>
                 <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] mb-4">
                    {chatHistory.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'bunda' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm ${msg.sender === 'bunda' ? 'bg-pink-100 rounded-tr-none' : 'bg-slate-50 rounded-tl-none'}`}>{msg.text}</div>
                      </div>
                    ))}
                 </div>
                 <div className="flex gap-2"><Input value={pesanBaru} onChange={e => setPesanBaru(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Ketik..." className="rounded-full bg-slate-50 border-none" /><Button onClick={handleSendMessage} className="rounded-full bg-pink-400">✈️</Button></div>
               </div>
             )}

             {/* 5. NOTIFIKASI */}
             {activeTab === "notif" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-800">Notifikasi</h2>
                  <div className="bg-pink-50 p-5 rounded-[2rem]">
                    <p className="text-sm text-slate-700">Halo Bunda **{namaBunda}**, si kecil ada jadwal imunisasi di Posyandu Bulan Mas besok jam 09.30 ya!</p>
                  </div>
                </div>
             )}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-2xl">
           <span onClick={() => setActiveTab("dashboard")} className={`text-3xl cursor-pointer ${activeTab === 'dashboard' ? 'text-pink-400' : 'text-slate-200'}`}>🏠</span>
           <span onClick={() => setActiveTab("chat")} className={`text-3xl cursor-pointer ${activeTab === 'chat' ? 'text-pink-400' : 'text-slate-200'}`}>💬</span>
           <div onClick={() => setActiveTab("notif")} className="relative cursor-pointer">
              <span className={`text-3xl ${activeTab === 'notif' ? 'text-pink-400' : 'text-slate-200'}`}>🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white text-[8px] text-white flex items-center justify-center font-bold">1</span>
           </div>
           <span onClick={() => {setShowProfileMenu(true); setActiveTab("profile")}} className="text-slate-200 text-3xl cursor-pointer">👤</span>
        </div>
      </div>
    </div>
  );
}