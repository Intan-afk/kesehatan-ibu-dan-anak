"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIAppFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // STATE NAMA: Kosong secara default agar mengikuti input login
  const [namaBunda, setNamaBunda] = useState("");
  const [tempInput, setTempInput] = useState(""); 
  const [pesanBaru, setPesanBaru] = useState("");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Validasi: Jika kosong beri nama 'Bunda', jika diisi gunakan isinya
    const userTyped = tempInput.trim() !== "" ? tempInput : "Bunda";
    setNamaBunda(userTyped);
    setIsLoggedIn(true);
  };

  // --- 1. MODAL MENU PROFIL (SLIDE-UP) ---
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[3.5rem] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-pink-200 mx-auto mb-3 overflow-hidden shadow-lg bg-slate-50">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="Avatar" />
          </div>
          <h3 className="text-2xl font-black text-slate-800">{namaBunda}</h3>
          <p className="text-pink-400 font-bold text-xs uppercase tracking-widest mt-1">Profil Bunda</p>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
            <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block ml-2">Ubah Nama Anda</label>
            <Input 
              value={namaBunda} 
              onChange={(e) => setNamaBunda(e.target.value)}
              className="bg-white rounded-full border-slate-200 h-12 px-6 font-bold"
            />
          </div>
          <button 
            onClick={() => { setIsLoggedIn(false); setTempInput(""); setShowProfileMenu(false); }} 
            className="w-full p-4 bg-red-50 text-red-600 font-black rounded-2xl border border-red-100 hover:bg-red-100 transition-all"
          >
            Logout & Ganti Akun
          </button>
        </div>
        <Button onClick={() => setShowProfileMenu(false)} className="w-full mt-6 rounded-full py-7 bg-pink-300 text-slate-800 font-black hover:bg-pink-400 shadow-md">
          SIMPAN PERUBAHAN
        </Button>
      </div>
    </div>
  );

  // --- 2. HALAMAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[380px] space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="bg-pink-200 rounded-b-[100px] p-12 pb-20 text-center shadow-inner">
            <h2 className="text-2xl font-black text-slate-800 mb-8 tracking-[0.2em]">MOBILE-KIA</h2>
            <div className="w-36 h-36 bg-white rounded-full mx-auto flex items-center justify-center border-8 border-white shadow-2xl text-7xl">👩‍🍼</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 px-10">
            <div className="text-center space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Siapa nama Bunda?</p>
              <Input 
                placeholder="Masukkan Nama (Intan/Olive/Dll)" 
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="rounded-full border-slate-200 h-14 text-center text-lg font-bold shadow-sm focus:ring-pink-300" 
              />
            </div>
            <Input type="password" placeholder="Password" className="rounded-full border-slate-200 h-14 text-center shadow-sm" />
            <Button type="submit" className="w-full rounded-full h-14 bg-pink-300 hover:bg-pink-400 text-slate-800 font-black text-lg shadow-lg active:scale-95 transition-all">
              MASUK KE DASHBOARD
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- 3. DASHBOARD UTAMA ---
  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      {/* Background Pink Melengkung sesuai Gambar */}
      <div className="absolute top-0 left-0 w-full h-[42%] bg-[#FBCFE8] rounded-b-[60px] -z-10 shadow-sm"></div>

      {showProfileMenu && <ProfileModal />}

      <div className="max-w-2xl mx-auto pt-10 px-6 pb-32">
        <h1 className="text-center text-2xl font-black text-slate-800 mb-8 tracking-widest uppercase">Mobile-KIA</h1>

        {activeTab === "dashboard" ? (
          <div className="animate-in fade-in duration-700">
            {/* Header Nama Otomatis Sesuai Login */}
            <div className="flex items-center justify-between mb-8 bg-white/40 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/40 shadow-sm">
              <div className="text-left">
                <p className="text-xl text-slate-700">Halo,</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  {namaBunda}
                </h2>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="profile" />
              </div>
            </div>

            {/* Kotak Pesan Dokter (Dashboard) */}
            <div 
              onClick={() => setActiveTab("chat")}
              className="mb-8 bg-white p-6 rounded-[2.5rem] shadow-xl border border-pink-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg">👨‍⚕️</div>
                <div>
                  <h4 className="font-black text-slate-800">Tanya Dokter Andi</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Ada 1 pesan balasan baru</p>
                </div>
              </div>
              <div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black animate-bounce shadow-md">1</div>
            </div>

            {/* Menu Grid 3 Kotak */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { id: "info", icon: "👧", label: "info anak" },
                { id: "riwayat", icon: "💉", label: "riwayat imunisasi" },
                { id: "jadwal", icon: "📅", label: "jadwal imunisasi" }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="bg-[#FBCFE8] border border-pink-200 rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md hover:bg-pink-200 transition-all active:scale-90"
                >
                  <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>

            {/* Reminder */}
            <div className="space-y-4">
              <h3 className="font-black text-xl text-slate-800 ml-2">Reminder</h3>
              <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl relative overflow-hidden">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px] shadow-lg">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-xs font-black uppercase text-blue-500">Tue</p>
                </div>
                <div>
                  <p className="text-xs font-bold mb-1 opacity-80 uppercase tracking-widest text-white/90">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AREA HALAMAN DETAIL / FITUR */
          <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-8 shadow-2xl border border-white min-h-[500px] flex flex-col animate-in slide-in-from-right duration-300">
             <button 
                onClick={() => setActiveTab("dashboard")} 
                className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-black text-[10px] mb-8 w-fit hover:bg-pink-100 hover:text-pink-600 transition-all"
             >
               ← KEMBALI KE BERANDA
             </button>

             {activeTab === "chat" ? (
               <div className="flex-1 flex flex-col">
                 <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-full border-2 border-green-400 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" alt="Dokter" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800">dr. Andi Pratama</h2>
                      <p className="text-xs text-green-500 font-black uppercase tracking-widest">● Online</p>
                    </div>
                 </div>

                 {/* Percakapan */}
                 <div className="flex-1 space-y-4 mb-6 overflow-y-auto pr-2">
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                      <p className="text-sm text-slate-700">Halo Bunda **{namaBunda}**, ada yang bisa saya bantu terkait kesehatan si kecil?</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase text-right">08.45 AM</p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto shadow-sm">
                      <p className="text-sm text-slate-800 font-medium italic">Halo Dok, saya ingin tanya jadwal imunisasi bulan depan...</p>
                      <p className="text-[10px] text-pink-400 mt-2 font-bold uppercase">Baru saja</p>
                    </div>
                 </div>

                 {/* Input Kirim Pesan */}
                 <div className="mt-auto flex gap-3 pt-4">
                    <Input 
                      placeholder="Ketik pesan..." 
                      className="rounded-full h-14 bg-slate-50 border-none px-6 shadow-inner font-medium"
                      value={pesanBaru}
                      onChange={(e) => setPesanBaru(e.target.value)}
                    />
                    <Button className="w-14 h-14 rounded-full bg-pink-400 hover:bg-pink-500 flex items-center justify-center shadow-xl active:scale-90 transition-all">
                      ✈️
                    </Button>
                 </div>
               </div>
             ) : (
               <div className="text-center py-20">
                 <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase">{activeTab}</h2>
                 <p className="text-slate-400 font-bold">Data Bunda <span className="text-pink-400">{namaBunda}</span> sedang disiapkan.</p>
               </div>
             )}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH MENGAMBANG */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
           <span 
              onClick={() => {setActiveTab("dashboard"); setShowProfileMenu(false);}} 
              className={`text-3xl cursor-pointer transition-all hover:scale-125 ${activeTab === 'dashboard' ? 'text-pink-400 drop-shadow-sm' : 'text-slate-200'}`}
           >
              🏠
           </span>
           <span className="text-slate-200 text-3xl cursor-pointer hover:text-pink-400 transition-colors">🔍</span>
           {/* Ikon Pesan Aktif ke Halaman Chat */}
           <span 
              onClick={() => setActiveTab("chat")} 
              className={`text-3xl cursor-pointer transition-all hover:scale-125 ${activeTab === 'chat' ? 'text-pink-400 drop-shadow-sm' : 'text-slate-200'}`}
           >
              💬
           </span>
           <span className="text-slate-200 text-3xl cursor-pointer hover:text-pink-400 transition-colors">🔔</span>
           <span 
              onClick={() => setShowProfileMenu(true)} 
              className={`text-3xl cursor-pointer transition-all hover:scale-125 ${showProfileMenu ? 'text-pink-400 drop-shadow-sm' : 'text-slate-200'}`}
           >
              👤
           </span>
        </div>
      </div>
    </div>
  );
}