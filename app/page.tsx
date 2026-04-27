"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // --- 1. MODAL MENU PROFIL (SLIDE UP) ---
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-pink-100 mx-auto mb-3 overflow-hidden shadow-md">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia" alt="User" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Nadia Febriani</h3>
          <p className="text-slate-500 text-sm italic">Bunda Tangguh</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button className="flex items-center gap-4 p-4 hover:bg-pink-50 rounded-2xl transition-all text-slate-700">
            <span className="text-xl">⚙️</span> <span className="font-semibold">Pengaturan Akun</span>
          </button>
          <button className="flex items-center gap-4 p-4 hover:bg-pink-50 rounded-2xl transition-all text-slate-700">
            <span className="text-xl">✏️</span> <span className="font-semibold">Edit Data Bunda & Anak</span>
          </button>
          
          <hr className="my-2 border-slate-100" />
          
          <button 
            onClick={() => { setIsLoggedIn(false); setShowProfileMenu(false); }}
            className="flex items-center gap-4 p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-all text-red-600 font-bold"
          >
            <span className="text-xl">🚪</span> Keluar Aplikasi
          </button>
        </div>

        <Button 
          onClick={() => setShowProfileMenu(false)}
          className="w-full mt-6 rounded-full py-6 bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          Tutup
        </Button>
      </div>
    </div>
  );

  // --- 2. HALAMAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-[360px] space-y-8 text-center">
          <div className="bg-pink-200 rounded-b-[100px] p-10 pb-16 shadow-sm relative">
            <h2 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-widest">mobile-KIA</h2>
            <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-xl overflow-hidden text-6xl">👩‍🍼</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 px-8">
            <Input placeholder="username" className="rounded-full border-slate-300 text-center h-12" />
            <Input type="password" placeholder="password" className="rounded-full border-slate-300 text-center h-12" />
            <Button type="submit" className="w-full rounded-full h-12 bg-pink-300 hover:bg-pink-400 text-slate-800 font-bold shadow-lg transition-transform active:scale-95">
              LOGIN
            </Button>
          </form>
          <p className="text-xs text-slate-400">Belum punya akun? <span className="text-pink-400 font-bold cursor-pointer">Daftar</span></p>
        </div>
      </div>
    );
  }

  // --- 3. DASHBOARD UTAMA & HALAMAN DETAIL ---
  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      {/* Background Pink Melengkung (Atas) */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#FBCFE8] rounded-b-[40px] -z-10"></div>

      {showProfileMenu && <ProfileModal />}

      <div className="max-w-2xl mx-auto pt-10 px-6 pb-32">
        <h1 className="text-center text-2xl font-bold text-slate-800 mb-8 tracking-tight">mobile-KIA</h1>

        {activeTab === "dashboard" ? (
          <>
            {/* Header Profil */}
            <div className="flex items-center justify-between mb-8 bg-white/30 p-4 rounded-[2rem] backdrop-blur-sm border border-white/20 shadow-sm">
              <div className="text-left">
                <p className="text-lg text-slate-800 font-medium">Halo,</p>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">Nadia Febriani</h2>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia" alt="profile" />
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              <button onClick={() => setActiveTab("info_anak")} className="bg-[#FBCFE8] border border-pink-300 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm aspect-square justify-center active:scale-90 transition-transform">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-2xl text-white shadow-md">👧</div>
                <p className="text-[9px] font-bold uppercase text-slate-800">info anak</p>
              </button>
              <button onClick={() => setActiveTab("riwayat_imunisasi")} className="bg-[#FBCFE8] border border-pink-300 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm aspect-square justify-center active:scale-90 transition-transform">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-2xl text-white shadow-md">💉</div>
                <p className="text-[9px] font-bold uppercase text-center text-slate-800 leading-tight">riwayat imunisasi</p>
              </button>
              <button onClick={() => setActiveTab("jadwal_imunisasi")} className="bg-[#FBCFE8] border border-pink-300 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm aspect-square justify-center active:scale-90 transition-transform">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-2xl text-white shadow-md">📅</div>
                <p className="text-[9px] font-bold uppercase text-center text-slate-800 leading-tight">jadwal imunisasi</p>
              </button>
            </div>

            {/* Reminder */}
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-slate-800 px-2">Reminder</h3>
              <div className="bg-[#3B82F6] rounded-[2.5rem] p-6 flex items-center gap-6 text-white shadow-xl relative overflow-hidden">
                <div className="bg-white rounded-2xl p-4 text-slate-900 text-center min-w-[80px] shadow-lg">
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm font-bold uppercase">Tue</p>
                </div>
                <div className="z-10">
                  <p className="text-sm font-medium mb-1 opacity-90">09.30 AM</p>
                  <p className="text-xl font-bold leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </>
        ) : (
          /* Halaman Detail (Info Anak / Riwayat / Jadwal) */
          <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-6 shadow-xl border border-white min-h-[400px]">
             <button onClick={() => setActiveTab("dashboard")} className="text-slate-400 font-bold mb-4 flex items-center gap-2 hover:text-pink-400 transition-colors">
               ← Kembali ke Dashboard
             </button>
             {activeTab === "info_anak" && (
               <div className="animate-in fade-in zoom-in duration-300">
                 <h2 className="text-2xl font-bold text-slate-800 mb-4">Informasi Anak</h2>
                 <div className="bg-blue-50 p-6 rounded-3xl border-l-8 border-blue-400 shadow-sm">
                    <p className="text-blue-600 font-bold">Budi Pratama</p>
                    <p className="text-slate-600">Umur: 14 Bulan | Berat: 10.5 Kg</p>
                 </div>
               </div>
             )}
             {activeTab === "riwayat_imunisasi" && (
               <div className="animate-in fade-in zoom-in duration-300">
                 <h2 className="text-2xl font-bold text-slate-800 mb-4">Riwayat Imunisasi</h2>
                 <div className="space-y-3">
                   <div className="p-4 bg-green-50 rounded-2xl flex justify-between border border-green-100">
                     <span className="font-bold">BCG & Polio 1</span>
                     <span className="text-green-600 text-sm font-bold underline">Selesai</span>
                   </div>
                 </div>
               </div>
             )}
             {activeTab === "jadwal_imunisasi" && (
               <div className="animate-in fade-in zoom-in duration-300">
                 <h2 className="text-2xl font-bold text-slate-800 mb-4">Jadwal Imunisasi</h2>
                 <div className="p-4 bg-pink-50 rounded-2xl border-l-8 border-pink-400">
                    <p className="font-bold">Campak-Rubela</p>
                    <p className="text-sm text-pink-500 font-bold">Estimasi: Mei 2026</p>
                 </div>
               </div>
             )}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-pink-100 p-4 flex justify-around items-center rounded-[2.5rem] shadow-2xl">
           <span onClick={() => {setActiveTab("dashboard"); setShowProfileMenu(false);}} className={`text-3xl cursor-pointer hover:scale-110 transition-transform ${activeTab === 'dashboard' ? 'text-pink-400' : 'text-pink-200'}`}>🏠</span>
           <span className="text-pink-200 text-3xl cursor-pointer">🔍</span>
           <span className="text-pink-200 text-3xl cursor-pointer">💬</span>
           <span className="text-pink-200 text-3xl cursor-pointer">🔔</span>
           {/* IKON PROFIL UNTUK SETTING */}
           <span onClick={() => setShowProfileMenu(true)} className={`text-3xl cursor-pointer hover:scale-110 transition-transform ${showProfileMenu ? 'text-pink-400' : 'text-pink-200'}`}>👤</span>
        </div>
      </div>
    </div>
  );
}