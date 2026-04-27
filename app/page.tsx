"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileKIAppFinal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // NAMA UTAMA: Benar-benar mengikuti input login (Tanpa Nama Default Nadia)
  const [namaBunda, setNamaBunda] = useState("");
  const [tempInput, setTempInput] = useState(""); 
  const [pesanBaru, setPesanBaru] = useState("");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const userTypedName = tempInput.trim() !== "" ? tempInput : "Bunda";
    setNamaBunda(userTypedName);
    setIsLoggedIn(true);
  };

  // --- MODAL PROFIL (SLIDE-UP) ---
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
        <Button onClick={() => { setIsLoggedIn(false); setTempInput(""); setShowProfileMenu(false); }} className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold py-6 rounded-2xl mb-4">
          Keluar & Ganti Nama
        </Button>
        <Button onClick={() => setShowProfileMenu(false)} className="w-full rounded-full py-7 bg-pink-300 text-slate-800 font-black">
          KEMBALI
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
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Siapa nama Bunda?</p>
              <Input 
                placeholder="Contoh: Intan / Olive" 
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="rounded-full border-slate-200 h-14 text-center text-lg font-bold shadow-sm focus:ring-pink-300" 
              />
            </div>
            <Button type="submit" className="w-full rounded-full h-14 bg-pink-300 hover:bg-pink-400 text-slate-800 font-black text-lg shadow-lg">
              MASUK KE APLIKASI
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD & HALAMAN FITUR ---
  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#FBCFE8] rounded-b-[60px] -z-10 shadow-sm"></div>
      
      {showProfileMenu && <ProfileModal />}

      <div className="max-w-2xl mx-auto pt-12 px-6 pb-32">
        <h1 className="text-center text-2xl font-black text-slate-800 mb-10 tracking-widest uppercase">Mobile-KIA</h1>

        {activeTab === "dashboard" ? (
          <div className="animate-in fade-in duration-700">
            {/* Header Nama Dinamis */}
            <div className="flex items-center justify-between mb-8 bg-white/40 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/40 shadow-sm">
              <div className="text-left">
                <p className="text-xl text-slate-700">Halo,</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{namaBunda}</h2>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${namaBunda}`} alt="profile" />
              </div>
            </div>

            {/* Kotak Pesan Dokter (Fitur Baru) */}
            <div 
              onClick={() => setActiveTab("chat")}
              className="mb-8 bg-white p-6 rounded-[2.5rem] shadow-xl border border-pink-100 flex items-center justify-between cursor-pointer active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg">👨‍⚕️</div>
                <div>
                  <h4 className="font-black text-slate-800">Tanya Dokter</h4>
                  <p className="text-xs text-slate-400 font-bold">1 Pesan Baru dari dr. Andi</p>
                </div>
              </div>
              <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce">1</span>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <button onClick={() => setActiveTab("info_anak")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white">👧</div>
                <p className="text-[10px] font-black uppercase text-slate-800">info anak</p>
              </button>
              <button onClick={() => setActiveTab("riwayat")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white">💉</div>
                <p className="text-[10px] font-black uppercase text-slate-800">riwayat</p>
              </button>
              <button onClick={() => setActiveTab("jadwal")} className="bg-[#FBCFE8] rounded-[2.5rem] p-4 flex flex-col items-center gap-3 shadow-md">
                <div className="w-14 h-14 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-3xl text-white">📅</div>
                <p className="text-[10px] font-black uppercase text-slate-800">jadwal</p>
              </button>
            </div>

            {/* Reminder */}
            <div className="bg-[#3B82F6] rounded-[3rem] p-7 flex items-center gap-6 text-white shadow-2xl relative overflow-hidden">
                <div className="bg-white rounded-3xl p-5 text-slate-900 text-center min-w-[90px] shadow-xl">
                  <p className="text-4xl font-black">12</p>
                  <p className="text-sm font-black uppercase text-blue-500">Tue</p>
                </div>
                <div className="z-10">
                  <p className="text-sm font-bold mb-1 opacity-80 uppercase">09.30 AM</p>
                  <p className="text-2xl font-black leading-tight">Posyandu <br /> Bulan Mas</p>
                </div>
            </div>
          </div>
        ) : (
          /* AREA HALAMAN DETAIL */
          <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-8 shadow-2xl border border-white animate-in slide-in-from-right duration-300 min-h-[500px] flex flex-col">
             <button onClick={() => setActiveTab("dashboard")} className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full font-black text-[10px] mb-8 w-fit">← KEMBALI</button>
             
             {/* KONTEN HALAMAN CHAT DOKTER */}
             {activeTab === "chat" ? (
               <div className="flex-1 flex flex-col">
                 <div className="flex items-center gap-4 mb-8 border-b pb-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-full overflow-hidden border-2 border-green-400">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi" alt="Dokter" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800">dr. Andi Pratama</h2>
                      <p className="text-xs text-green-500 font-bold">● Online</p>
                    </div>
                 </div>

                 {/* Balon Chat */}
                 <div className="flex-1 space-y-4 mb-4">
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                      <p className="text-sm text-slate-700">Halo Bunda {namaBunda}, bagaimana kondisi si kecil hari ini? Jangan lupa jadwal imunisasinya ya.</p>
                      <p className="text-[10px] text-slate-400 mt-2">08.45 AM</p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-right">
                      <p className="text-sm text-slate-800 font-medium">Baik dok, terima kasih sudah diingatkan!</p>
                      <p className="text-[10px] text-pink-400 mt-2">Just now</p>
                    </div>
                 </div>

                 {/* Input Chat */}
                 <div className="mt-auto flex gap-2 pt-4">
                    <Input 
                      placeholder="Tulis pesan..." 
                      className="rounded-full h-12 bg-slate-50 border-none px-6"
                      value={pesanBaru}
                      onChange={(e) => setPesanBaru(e.target.value)}
                    />
                    <Button className="w-12 h-12 rounded-full bg-pink-400 hover:bg-pink-500 flex items-center justify-center shadow-lg">
                      ✈️
                    </Button>
                 </div>
               </div>
             ) : (
               /* HALAMAN DETAIL LAINNYA */
               <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase">{activeTab.replace("_", " ")}</h2>
                  <p className="text-slate-500 font-medium">Halaman ini menampilkan data khusus untuk Bunda <span className="text-pink-500 font-bold">{namaBunda}</span>.</p>
               </div>
             )}
          </div>
        )}
      </div>

      {/* NAVBAR BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/50 p-4 flex justify-around items-center rounded-[3rem] shadow-2xl">
           <span onClick={() => setActiveTab("dashboard")} className={`text-3xl cursor-pointer ${activeTab === 'dashboard' ? 'text-pink-400' : 'text-slate-200'}`}>🏠</span>
           <span className="text-slate-200 text-3xl cursor-pointer">🔍</span>
           {/* IKON CHAT DI NAVBAR JUGA AKTIF */}
           <span onClick={() => setActiveTab("chat")} className={`text-3xl cursor-pointer ${activeTab === 'chat' ? 'text-pink-400' : 'text-slate-200'}`}>💬</span>
           <span className="text-slate-200 text-3xl cursor-pointer">🔔</span>
           <span onClick={() => setShowProfileMenu(true)} className="text-slate-200 text-3xl cursor-pointer">👤</span>
        </div>
      </div>
    </div>
  );
}