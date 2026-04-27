"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIAppFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // STATE DINAMIS: Nama bisa diubah-ubah
  const [namaBunda, setNamaBunda] = useState("Nadia Febriani");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // --- 1. MODAL MENU PROFIL (SLIDE UP) ---
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-0">
      <div className="bg-white w-full max-w-md rounded-t-[3.5rem] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-pink-100">
        <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-pink-200 mx-auto mb-4 overflow-hidden shadow-lg">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} 
              alt="UserAvatar" 
              className="bg-slate-100"
            />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{namaBunda}</h3>
          <p className="text-pink-400 font-medium">Bunda Siaga</p>
        </div>

        <div className="space-y-4">
          {/* FITUR GANTI NAMA KREATIF */}
          <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
            <label className="text-xs font-bold text-slate-400 uppercase ml-2 mb-2 block tracking-widest">Ganti Nama Bunda</label>
            <Input 
              value={namaBunda} 
              onChange={(e) => setNamaBunda(e.target.value)}
              placeholder="Ketik nama baru..."
              className="bg-white rounded-full border-slate-200 h-12 px-6 focus:ring-pink-300"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button className="flex items-center gap-4 p-4 hover:bg-pink-50 rounded-2xl transition-all group">
              <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-xl group-hover:bg-pink-100 transition-colors">⚙️</div>
              <span className="font-semibold text-slate-700">Pengaturan Akun</span>
            </button>
            <button 
              onClick={() => { setIsLoggedIn(false); setShowProfileMenu(false); }}
              className="flex items-center gap-4 p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-all text-red-600 font-bold mt-2"
            >
              <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-xl">🚪</div>
              Logout
            </button>
          </div>
        </div>

        <Button 
          onClick={() => setShowProfileMenu(false)}
          className="w-full mt-8 rounded-full py-7 bg-pink-300 text-slate-800 font-bold hover:bg-pink-400 shadow-md"
        >
          Simpan & Kembali
        </Button>
      </div>
    </div>
  );

  // --- 2. HALAMAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[380px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white">
          <div className="bg-pink-200 rounded-b-[100px] p-12 pb-20 shadow-inner relative text-center">
            <h2 className="text-2xl font-black text-slate-800 mb-8 tracking-[0.2em]">MOBILE-KIA</h2>
            <div className="w-36 h-36 bg-white rounded-full mx-auto flex items-center justify-center border-8 border-pink-100 shadow-2xl text-7xl">👩‍🍼</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 px-10 py-12">
            <Input placeholder="username" className="rounded-full border-slate-200 h-14 text-center text-lg shadow-sm" />
            <Input type="password" placeholder="password" className="rounded-full border-slate-200 h-14 text-center text-lg shadow-sm" />
            <Button type="submit" className="w-full rounded-full h-14 bg-pink-300 hover:bg-pink-400 text-slate-800 font-black text-lg shadow-lg active:scale-95 transition-all">
              LOGIN
            </Button>
            <p className="text-center text-slate-400 text-sm">Lupa password? <span className="text-pink-400 font-bold">Klik di sini</span></p>
          </form>
        </div>
      </div>
    );
  }

  // --- 3. DASHBOARD & HALAMAN DETAIL ---
  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      {/* Background Pink sesuai gambar */}
      <div className="absolute top-0 left-0 w-full h-[45%] md:h-[40%] bg-[#FBCFE8] rounded-b-[60px] -z-10 shadow-sm"></div>

      {showProfileMenu && <ProfileModal />}

      <div className="max-w-2xl mx-auto pt-12 px-6 pb-32">
        <h1 className="text-center text-2xl font-black text-slate-800 mb-10 tracking-widest">MOBILE-KIA</h1>

        {activeTab === "dashboard" ? (
          <div className="animate-in fade-in duration-500">
            {/* Header Profil Dinamis */}
            <div className="flex items-center justify-between mb-10 bg-white/40 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/40 shadow-sm">
              <div className="text-left">
                <p className="text-xl text-slate-700">Halo,</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  {namaBunda}
                </h2>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="profile" />
              </div>
            </div>

            {/* Menu Utama (3 Kotak) */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {[
                { id: "info_anak", icon: "👧", label: "info anak" },
                { id: "riwayat_imunisasi", icon: "💉", label: "riwayat imunisasi" },
                { id: "jadwal_imunisasi", icon: "📅", label: "jadwal imunisasi" }
              ].map((menu) => (
                <button 
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id)}
                  className="bg-[#FBCFE8] border border-pink-200 rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md active:scale-90 transition-all hover:bg-pink-200"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
                    {menu.icon}
                  </div>
                  <p className="text-[10px] md:text-xs font-black uppercase text-slate-800 text-center leading-tight tracking-tighter">
                    {menu.label}
                  </p>
                </button>
              ))}
            </div>

            {/* Section Reminder */}
            <div className="space-y-5">
              <h3 className="font-black text-2xl text-slate-800 ml-2">Reminder</h3>
              <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px] shadow-xl">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-sm font-black uppercase tracking-widest text-blue-500">Tue</p>
                </div>
                <div className="z-10">
                  <p className="text-sm font-bold mb-1 opacity-80 uppercase tracking-widest">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              </div>
            </div>
          </div>
        ) : (
          /* AREA HALAMAN DETAIL */
          <div className="bg-white/90 backdrop-blur-xl rounded-[3.5rem] p-8 shadow-2xl border border-white animate-in slide-in-from-right duration-300">
             <button 
               onClick={() => setActiveTab("dashboard")} 
               className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-bold text-sm mb-8 hover:bg-pink-100 hover:text-pink-600 transition-all"
             >
               ← Kembali Ke Beranda
             </button>

             {activeTab === "info_anak" && (
               <div className="space-y-6">
                 <h2 className="text-3xl font-black text-slate-800">Detail Anak</h2>
                 <div className="bg-blue-50 p-8 rounded-[2.5rem] border-l-[12px] border-blue-400 shadow-inner">
                    <p className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Nama Anak Bunda {namaBunda.split(' ')[0]}</p>
                    <h3 className="text-3xl font-black text-slate-800">Budi Pratama</h3>
                    <div className="mt-6 flex gap-4">
                       <span className="bg-white px-5 py-2 rounded-2xl shadow-sm font-bold text-slate-600">👦 14 Bulan</span>
                       <span className="bg-white px-5 py-2 rounded-2xl shadow-sm font-bold text-slate-600">⚖️ 10.5 Kg</span>
                    </div>
                 </div>
               </div>
             )}

             {activeTab === "riwayat_imunisasi" && (
               <div className="space-y-4">
                 <h2 className="text-3xl font-black text-slate-800 mb-6">Riwayat</h2>
                 {["BCG & Polio 1", "DPT-HB-Hib 1", "PCV 1"].map((v, i) => (
                   <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-100 flex justify-between items-center shadow-sm">
                      <span className="font-bold text-slate-700">{v}</span>
                      <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-black uppercase">Selesai</span>
                   </div>
                 ))}
               </div>
             )}

             {activeTab === "jadwal_imunisasi" && (
               <div className="space-y-4">
                 <h2 className="text-3xl font-black text-slate-800 mb-6">Jadwal</h2>
                 <div className="bg-pink-50 p-6 rounded-[2.5rem] border-l-[12px] border-pink-400">
                    <p className="font-black text-slate-800 text-xl text-pink-600">Campak-Rubela</p>
                    <p className="text-slate-500 font-bold mt-1">Estimasi: Mei 2026</p>
                 </div>
               </div>
             )}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
           <span 
              onClick={() => {setActiveTab("dashboard"); setShowProfileMenu(false);}} 
              className={`text-3xl cursor-pointer transition-all hover:scale-125 ${activeTab === 'dashboard' ? 'text-pink-400 drop-shadow-md' : 'text-slate-200'}`}
           >
              🏠
           </span>
           <span className="text-slate-200 text-3xl cursor-pointer hover:text-pink-200 transition-colors">🔍</span>
           <span className="text-slate-200 text-3xl cursor-pointer hover:text-pink-200 transition-colors">💬</span>
           <span className="text-slate-200 text-3xl cursor-pointer hover:text-pink-200 transition-colors">🔔</span>
           {/* IKON PROFIL UNTUK SETTING */}
           <span 
              onClick={() => setShowProfileMenu(true)} 
              className={`text-3xl cursor-pointer transition-all hover:scale-125 ${showProfileMenu ? 'text-pink-400 drop-shadow-md' : 'text-slate-200'}`}
           >
              👤
           </span>
        </div>
      </div>
    </div>
  );
}