"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIAppFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // 1. STATE NAMA KOSONG: Agar tidak muncul nama "Nadia" secara otomatis
  const [namaBunda, setNamaBunda] = useState("");
  const [tempInput, setTempInput] = useState(""); 

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // 2. LOGIKA VALIDASI: Jika input kosong beri nama "User", jika diisi gunakan isinya
    const namaBaru = tempInput.trim() !== "" ? tempInput : "User";
    setNamaBunda(namaBaru);
    setIsLoggedIn(true);
  };

  // --- MODAL MENU PROFIL (SLIDE-UP) ---
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[3.5rem] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-pink-200 mx-auto mb-3 overflow-hidden shadow-lg bg-slate-50">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="Avatar" />
          </div>
          <h3 className="text-2xl font-black text-slate-800">{namaBunda}</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
            <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block ml-2">Ganti Nama di Dashboard</label>
            <Input 
              value={namaBunda} 
              onChange={(e) => setNamaBunda(e.target.value)}
              className="bg-white rounded-full border-slate-200 h-12 px-6 font-bold"
            />
          </div>
          <button onClick={() => { setIsLoggedIn(false); setTempInput(""); setShowProfileMenu(false); }} className="w-full p-4 bg-red-50 text-red-600 font-black rounded-2xl">
            Logout & Ganti Akun
          </button>
        </div>
        <Button onClick={() => setShowProfileMenu(false)} className="w-full mt-8 rounded-full py-7 bg-pink-300 text-slate-800 font-black">
          SIMPAN
        </Button>
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
                placeholder="user name " 
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="rounded-full border-slate-200 h-14 text-center text-lg font-bold shadow-sm" 
              />
            </div>
            <Input type="password" placeholder="Password" className="rounded-full border-slate-200 h-14 text-center" />
            <Button type="submit" className="w-full rounded-full h-14 bg-pink-300 hover:bg-pink-400 text-slate-800 font-black text-lg shadow-lg">
              MASUK
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UTAMA ---
  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#FBCFE8] rounded-b-[60px] -z-10 shadow-sm"></div>
      {showProfileMenu && <ProfileModal />}
      <div className="max-w-2xl mx-auto pt-12 px-6 pb-32">
        <h1 className="text-center text-2xl font-black text-slate-800 mb-10 tracking-widest uppercase">Mobile-KIA</h1>
        {activeTab === "dashboard" ? (
          <div className="animate-in fade-in duration-700">
            {/* NAMA DI SINI AKAN SESUAI DENGAN YANG ANDA KETIK SAAT LOGIN */}
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
            <div className="grid grid-cols-3 gap-4 mb-12">
              <button onClick={() => setActiveTab("info_anak")} className="bg-[#FBCFE8] border border-pink-200 rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md active:scale-90 transition-all">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">👧</div>
                <p className="text-[10px] font-black uppercase text-slate-800">info anak</p>
              </button>
              <button onClick={() => setActiveTab("riwayat_imunisasi")} className="bg-[#FBCFE8] border border-pink-200 rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md active:scale-90 transition-all">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">💉</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">riwayat imunisasi</p>
              </button>
              <button onClick={() => setActiveTab("jadwal_imunisasi")} className="bg-[#FBCFE8] border border-pink-200 rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md active:scale-90 transition-all">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">📅</div>
                <p className="text-[10px] font-black uppercase text-slate-800 text-center leading-tight">jadwal imunisasi</p>
              </button>
            </div>
            <div className="space-y-5">
              <h3 className="font-black text-2xl text-slate-800 ml-2">Reminder</h3>
              <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl relative overflow-hidden group transition-all">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px] shadow-xl">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-sm font-black uppercase text-blue-500">Tue</p>
                </div>
                <div className="z-10">
                  <p className="text-sm font-bold mb-1 opacity-80 uppercase tracking-widest">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-8 shadow-2xl border border-white min-h-[400px]">
             <button onClick={() => setActiveTab("dashboard")} className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-black text-xs mb-8">← KEMBALI</button>
             <h2 className="text-3xl font-black text-slate-800">Detail Bunda {namaBunda}</h2>
             <p className="mt-4 text-slate-500">Menampilkan data kesehatan anak Anda.</p>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-2xl">
           <span onClick={() => setActiveTab("dashboard")} className={`text-3xl cursor-pointer ${activeTab === 'dashboard' ? 'text-pink-400' : 'text-slate-200'}`}>🏠</span>
           <span className="text-slate-200 text-3xl cursor-pointer">🔍</span>
           <span className="text-slate-200 text-3xl cursor-pointer">💬</span>
           <span className="text-slate-200 text-3xl cursor-pointer">🔔</span>
           <span onClick={() => setShowProfileMenu(true)} className={`text-3xl cursor-pointer ${showProfileMenu ? 'text-pink-400' : 'text-slate-200'}`}>👤</span>
        </div>
      </div>
    </div>
  );
}