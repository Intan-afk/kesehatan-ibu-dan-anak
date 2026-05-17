import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, HeartPulse, CalendarDays, Syringe, BookOpen } from "lucide-react";

export default function MaternalChildHealthApp() {
  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Aplikasi Kesehatan Ibu & Anak</h1>
          <p className="text-gray-600">
            Monitoring Kehamilan, ANC, Imunisasi, dan Edukasi Ibu & Bayi
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <HeartPulse className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Usia Kehamilan</p>
                <p className="font-semibold">28 Minggu</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <CalendarDays className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Kontrol Berikutnya</p>
                <p className="font-semibold">15 Juni 2026</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <Syringe className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Imunisasi</p>
                <p className="font-semibold">Bulan Depan</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <Baby className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Status Bayi</p>
                <p className="font-semibold">Normal</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Data Pemeriksaan ANC</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Nama Ibu:</strong> Siti Aminah</p>
                <p><strong>Berat Badan:</strong> 58 Kg</p>
                <p><strong>Tensi:</strong> 120/80</p>
                <p><strong>Catatan Bidan:</strong> Perbanyak konsumsi zat besi dan istirahat cukup.</p>
              </div>
              <Button className="rounded-xl">Input Pemeriksaan</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Jadwal Imunisasi Anak</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Nama Bayi:</strong> Ahmad Fauzan</p>
                <p><strong>Vaksin:</strong> DPT</p>
                <p><strong>Tanggal:</strong> 10 Juli 2026</p>
                <p><strong>Status:</strong> Belum Dilakukan</p>
              </div>
              <Button className="rounded-xl">Lihat Jadwal</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Edukasi Ibu & Bayi</h2>
            </div>
            <ul className="space-y-2 text-sm list-disc pl-6">
              <li>Cara memandikan bayi dengan aman</li>
              <li>Resep MPASI sehat dan bergizi</li>
              <li>Pentingnya konsumsi tablet tambah darah</li>
              <li>Tanda bahaya pada kehamilan trimester 3</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
