"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MaternalChildHealthApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // --- TAMPILAN 1: LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center shadow-xl md:border md:rounded-[3rem] pb-10 overflow-hidden">
          <div className="bg-pink-200 rounded-b-[100px] p-10 pb-14 shadow-sm relative">
            <h2 className="text-xl font-bold text-slate-800 mb-6">mobile-KIA</h2>
            <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              <span className="text-6xl">👩‍🍼</span>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 px-8">
            <Input placeholder="username" className="rounded-full border-slate-300 text-center h-12" />
            <Input type="password" placeholder="password" className="rounded-full border-slate-300 text-center h-12" />
            <Button type="submit" className="w-full rounded-full h-12 bg-pink-300 hover:bg-pink-400 text-slate-800 font-bold shadow-md">
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 2: HALAMAN INFORMASI ANAK ---
  if (activeTab === "info_anak") {
    return (
      <div className="min-h-screen bg-pink-50 pb-24">
        <div className="bg-white p-6 rounded-b-[40px] shadow-sm flex items-center gap-4">
          <button onClick={() => setActiveTab("dashboard")} className="text-2xl text-slate-600">←</button>
          <h2 className="text-xl font-bold text-slate-800">Informasi Anak</h2>
        </div>
        <div className="max-w-md mx-auto p-6 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-md border-l-8 border-blue-400">
            <p className="text-sm text-slate-500 uppercase font-bold">Nama Anak</p>
            <h3 className="text-2xl font-bold text-slate-800">Budi Pratama</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <p className="text-xs text-blue-600 font-bold uppercase">Umur</p>
                <p className="text-lg font-bold">14 Bulan</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-2xl">
                <p className="text-xs text-pink-600 font-bold uppercase">Berat</p>
                <p className="text-lg font-bold">10.5 Kg</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setActiveTab("dashboard")} className="w-full rounded-full bg-pink-300 text-slate-800 font-bold py-6">KEMBALI</Button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 3: HALAMAN RIWAYAT IMUNISASI ---
  if (activeTab === "riwayat_imunisasi") {
    return (
      <div className="min-h-screen bg-blue-50 pb-24">
        <div className="bg-white p-6 rounded-b-[40px] shadow-sm flex items-center gap-4">
          <button onClick={() => setActiveTab("dashboard")} className="text-2xl text-slate-600">←</button>
          <h2 className="text-xl font-bold text-slate-800">Riwayat Imunisasi</h2>
        </div>
        <div className="max-w-md mx-auto p-6 space-y-4">
          {[
            { nama: "BCG & Polio 1", tgl: "12 Jan 2025", status: "Selesai" },
            { nama: "DPT-HB-Hib 1", tgl: "12 Feb 2025", status: "Selesai" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm flex justify-between items-center border border-blue-100">
              <div>
                <h4 className="font-bold text-slate-800">{item.nama}</h4>
                <p className="text-sm text-slate-500">{item.tgl}</p>
              </div>
              <span className="px-4 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">Selesai</span>
            </div>
          ))}
          <Button onClick={() => setActiveTab("dashboard")} className="w-full rounded-full bg-blue-400 text-white font-bold py-6">KEMBALI</Button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 4: HALAMAN JADWAL IMUNISASI (BARU) ---
  if (activeTab === "jadwal_imunisasi") {
    return (
      <div className="min-h-screen bg-slate-50 pb-24">
        <div className="bg-white p-6 rounded-b-[40px] shadow-sm flex items-center gap-4 border-b border-pink-100">
          <button onClick={() => setActiveTab("dashboard")} className="text-2xl text-slate-600">←</button>
          <h2 className="text-xl font-bold text-slate-800">Jadwal Mendatang</h2>
        </div>
        <div className="max-w-md mx-auto p-6 space-y-4">
          <p className="text-slate-500 text-sm font-medium px-2 italic text-center">Jangan lupa untuk membawa Buku KIA saat imunisasi ya, Bunda!</p>
          {[
            { nama: "Campak-Rubela", estimasi: "Mei 2026", ket: "Imunisasi Lanjutan" },
            { nama: "DPT-HB-Hib Lanjutan", estimasi: "Agustus 2026", ket: "Booster" },
            { nama: "PCV 3", estimasi: "Oktober 2026", ket: "Imunisasi Rutin" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm border-l-8 border-pink-300 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{item.nama}</h4>
                <p className="text-sm text-pink-500 font-semibold">{item.estimasi}</p>
                <p className="text-xs text-slate-400 mt-1">{item.ket}</p>
              </div>
              <div className="bg-pink-100 p-2 rounded-full text-xl">📅</div>
            </div>
          ))}
          <Button onClick={() => setActiveTab("dashboard")} className="w-full rounded-full bg-pink-300 text-slate-800 font-bold py-6 mt-4 shadow-md">KEMBALI KE BERANDA</Button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 5: DASHBOARD UTAMA ---
  return (
    <div className="min-h-screen bg-white relative font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[45%] md:h-[40%] bg-[#FBCFE8] rounded-b-[40px] md:rounded-b-[80px] -z-10"></div>
      <div className="max-w-2xl mx-auto pt-10 px-6 pb-32">
        <h1 className="text-center text-2xl font-bold text-slate-800 mb-8">mobile-KIA</h1>
        <div className="flex items-center justify-between mb-8 bg-white/30 p-4 rounded-[2rem] backdrop-blur-sm border border-white/20">
          <div className="text-left">
            <p className="text-lg text-slate-800">Halo,</p>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">Nadia Febriani</h2>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia" alt="profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Menu Grid - Semuanya sudah bisa diklik */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div onClick={() => setActiveTab("info_anak")} className="bg-[#FBCFE8] border border-pink-300 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm aspect-square justify-center hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-2xl text-white">👧</div>
            <p className="text-[9px] font-bold text-center text-slate-800 uppercase">informasi anak</p>
          </div>

          <div onClick={() => setActiveTab("riwayat_imunisasi")} className="bg-[#FBCFE8] border border-pink-300 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm aspect-square justify-center hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-2xl text-white">💉</div>
            <p className="text-[9px] font-bold text-center text-slate-800 uppercase">riwayat imunisasi</p>
          </div>

          <div onClick={() => setActiveTab("jadwal_imunisasi")} className="bg-[#FBCFE8] border border-pink-300 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-sm aspect-square justify-center hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-[#60A5FA] rounded-2xl flex items-center justify-center text-2xl text-white">📅</div>
            <p className="text-[9px] font-bold text-center text-slate-800 uppercase">jadwal imunisasi</p>
          </div>
        </div>

        {/* Reminder Card */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-slate-800 px-2">Reminder</h3>
          <div className="bg-[#3B82F6] rounded-[2.5rem] p-6 flex items-center gap-6 text-white shadow-xl">
            <div className="bg-white rounded-2xl p-4 text-slate-900 text-center min-w-[80px]">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm font-bold uppercase">Tue</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1 opacity-90">09.30 AM</p>
              <p className="text-xl font-bold leading-tight">Posyandu Bulan Mas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Bawah */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4">
        <div className="w-full max-w-md bg-white border border-pink-100 p-4 flex justify-around items-center rounded-[2rem] shadow-2xl">
           <span onClick={() => setActiveTab("dashboard")} className={`text-3xl cursor-pointer ${activeTab === 'dashboard' ? 'text-pink-400' : 'text-pink-200'}`}>🏠</span>
           <span className="text-pink-200 text-3xl cursor-pointer">🔍</span>
           <span className="text-pink-200 text-3xl cursor-pointer">💬</span>
           <span className="text-pink-200 text-3xl cursor-pointer">🔔</span>
           <span onClick={() => setIsLoggedIn(false)} className="text-pink-200 text-3xl cursor-pointer">👤</span>
        </div>
      </div>
    </div>
  );
}