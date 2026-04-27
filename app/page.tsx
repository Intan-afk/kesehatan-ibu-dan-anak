"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIAppFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // State Nama & Input
  const [namaBunda, setNamaBunda] = useState("");
  const [tempInput, setTempInput] = useState(""); 

  // State Chat
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

  // LOGIKA CHAT OTOMATIS
  const handleSendMessage = () => {
    if (pesanBaru.trim() === "") return;

    const userMsg = { id: Date.now(), sender: "bunda", text: pesanBaru, time: "Baru saja" };
    setChatHistory([...chatHistory, userMsg]);
    setPesanBaru("");

    // Simulasi Dokter Mengetik
    setIsTyping(true);
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: "dokter",
        text: `Halo Bunda ${namaBunda}, pesan Anda sudah dr. Andi terima. Mohon tunggu sebentar ya, saya cek datanya dulu.`,
        time: "Baru saja"
      };
      setChatHistory(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 2000); 
  };

  // --- MODAL PROFIL ---
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[3.5rem] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-pink-200 mx-auto mb-3 overflow-hidden shadow-lg">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="Avatar" />
          </div>
          <h3 className="text-2xl font-black text-slate-800">{namaBunda}</h3>
        </div>
        <div className="space-y-4">
          <Button onClick={() => { setIsLoggedIn(false); setTempInput(""); setShowProfileMenu(false); }} className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold py-6 rounded-2xl shadow-none border-none">
            Logout / Ganti Nama
          </Button>
          <Button onClick={() => setShowProfileMenu(false)} className="w-full rounded-full py-7 bg-pink-300 text-slate-800 font-black hover:bg-pink-400">
            KEMBALI KE DASHBOARD
          </Button>
        </div>
      </div>
    </div>
  );

  // --- HALAMAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[380px] space-y-8">
          <div className="bg-pink-200 rounded-b-[100px] p-12 pb-20 text-center">
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
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#FBCFE8] rounded-b-[60px] -z-10 shadow-sm"></div>
      
      {showProfileMenu && <ProfileModal />}

      <div className="max-w-2xl mx-auto pt-12 px-6 pb-32">
        <h1 className="text-center text-2xl font-black text-slate-800 mb-10 tracking-widest uppercase">Mobile-KIA</h1>

        {activeTab === "dashboard" ? (
          <div className="animate-in fade-in duration-700">
            {/* Greeting */}
            <div className="flex items-center justify-between mb-10 bg-white/40 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/40 shadow-sm">
              <div className="text-left">
                <p className="text-xl text-slate-700">Halo,</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{namaBunda}</h2>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="profile" />
              </div>
            </div>

            {/* Kotak Chat Cepat (Dashboard) */}
            <div onClick={() => setActiveTab("chat")} className="bg-white p-6 rounded-[2.5rem] mb-10 shadow-xl border border-pink-100 flex items-center justify-between cursor-pointer active:scale-95 transition-all">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center text-2xl">👨‍⚕️</div>
                    <div>
                        <p className="font-black text-slate-800">Tanya Dokter</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">dr. Andi Pratama</p>
                    </div>
                </div>
                <div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {["informasi anak", "riwayat imunisasi", "jadwal imunisasi"].map((label, idx) => (
                <button key={idx} className="bg-[#FBCFE8] border border-pink-200 rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md active:scale-90 transition-all">
                  <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white">
                    {idx === 0 ? "👧" : idx === 1 ? "💉" : "📅"}
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">{label}</p>
                </button>
              ))}
            </div>

            {/* Reminder */}
            <div className="space-y-5">
              <h3 className="font-black text-2xl text-slate-800 ml-2">Reminder</h3>
              <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl relative overflow-hidden">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px]">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-sm font-black uppercase text-blue-500">Tue</p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 opacity-80 uppercase tracking-widest text-white/80">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AREA HALAMAN DETAIL */
          <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-8 shadow-2xl border border-white min-h-[500px] flex flex-col animate-in slide-in-from-right duration-300">
            <button onClick={() => setActiveTab("dashboard")} className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-black text-[10px] mb-8 w-fit uppercase">← Kembali</button>
            
            {activeTab === "chat" ? (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6 border-b pb-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-full border-2 border-green-400 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" alt="Dokter" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800">dr. Andi</h2>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isTyping ? 'text-blue-500 animate-pulse' : 'text-green-500'}`}>
                            {isTyping ? '● Sedang Mengetik...' : '● Online'}
                        </p>
                    </div>
                </div>
                <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[300px] pr-2">
                    {chatHistory.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'bunda' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 rounded-2xl max-w-[85%] ${msg.sender === 'bunda' ? 'bg-pink-100 rounded-tr-none' : 'bg-slate-100 rounded-tl-none'}`}>
                          <p className="text-sm text-slate-700">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-auto flex gap-2 pt-4">
                    <Input placeholder="Ketik pesan..." className="rounded-full h-12 bg-slate-50 border-none px-6" value={pesanBaru} onChange={(e) => setPesanBaru(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <Button onClick={handleSendMessage} className="w-12 h-12 rounded-full bg-pink-400 shadow-lg active:scale-90 transition-all">✈️</Button>
                </div>
              </div>
            ) : activeTab === "notif" ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-slate-800">Notifikasi</h2>
                <div className="bg-blue-50 p-6 rounded-[2rem] border-l-8 border-blue-400">
                    <p className="font-black text-slate-800">Halo Bunda {namaBunda}!</p>
                    <p className="text-sm text-slate-600 mt-1">Jangan lupa besok ada jadwal imunisasi di Posyandu Bulan Mas jam 09.30 ya.</p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-2xl">
           <span onClick={() => setActiveTab("dashboard")} className={`text-3xl cursor-pointer ${activeTab === 'dashboard' ? 'text-pink-400' : 'text-slate-200'}`}>🏠</span>
           <span className="text-slate-200 text-3xl cursor-pointer">🔍</span>
           {/* Tombol Chat */}
           <span onClick={() => setActiveTab("chat")} className={`text-3xl cursor-pointer ${activeTab === 'chat' ? 'text-pink-400' : 'text-slate-200'}`}>💬</span>
           {/* Tombol Notifikasi */}
           <div onClick={() => setActiveTab("notif")} className="relative cursor-pointer">
              <span className={`text-3xl ${activeTab === 'notif' ? 'text-pink-400' : 'text-slate-200'}`}>🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">1</span>
           </div>
           <span onClick={() => setShowProfileMenu(true)} className={`text-3xl cursor-pointer ${showProfileMenu ? 'text-pink-400' : 'text-slate-200'}`}>👤</span>
        </div>
      </div>
    </div>
  );
}