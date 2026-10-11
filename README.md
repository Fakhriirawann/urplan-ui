# Our Plan (UrPlan) - Frontend UI Prototype (React.js)

Prototipe Front-End interaktif untuk **Our Plan (UrPlan)** — Content Creator Workspace. Dibangun khusus hanya menggunakan **React.js + Vite + Tailwind CSS**, siap ditampilkan untuk presentasi dan dideploy ke **Vercel** tanpa membutuhkan backend PHP/Laravel.

---

## 🚀 Fitur UI yang Tersedia di Prototipe Ini

1. **Landing Page Interaktif**:
   - Aurora gradient glassmorphism header & floating preview.
   - Tab switch mockup langsung: Kanban, List View, Calendar.
   - Grid fitur lengkap (Visual Kanban, Daily Habits, Kolaborasi Tim).
   - Paket harga (Free Solo, Pro Creator, Studio/Agency).
   - FAQ & Footer responsif.

2. **Creator Workspace (Dashboard Utama)**:
   - **Pemilih Proyek (Project Switcher)**: Ganti antar proyek (contoh: *Tech Review*, *TikTok Shorts*, *Podcast Series*) atau buat proyek baru.
   - **Daily Habit Tracker**:
     - Hitungan streak harian (🔥).
     - Check-in interaktif dengan efek perayaan animasi confetti.
     - Modal tambah habit baru.
   - **Statistik & Metrik Konten**:
     - Total Konten, Dalam Proses, Siap Tayang (Published), dan Notifikasi Urgent/Overdue.
   - **Filter & Pencarian Lengkap**:
     - Pencarian teks real-time.
     - Filter berdasarkan platform (*YouTube, TikTok, Instagram, Twitter/X, LinkedIn*).
     - Filter berdasarkan prioritas (*Tinggi, Sedang, Rendah*).
     - Filter berdasarkan deadline (*Hari Ini, Mendatang, Terlewat*).
   - **3 Mode Tampilan Workspace**:
     - **Kanban Board**: Drag & Drop kartu tugas antar status (*💡 Ideation*, *✍️ Scripting*, *🎬 In Review*, *🚀 Published*), tombol aksi cepat pindah status.
     - **List View**: Tampilan tabel ringkas dengan dropdown status langsung dan sorting.
     - **Calendar View**: Kalender editorial bulanan untuk melihat jadwal tayang konten per tanggal.
   - **Modal Interaktif**:
     - Tambah & Edit Tugas Konten (Judul, Platform, Prioritas, Status, Deadline, Penugasan Anggota Tim, Outline Catatan).
     - Tambah & Edit Proyek.
     - Kelola Anggota Tim & Undang Kolaborator.
     - Ekspor data tugas ke format CSV dengan 1 klik.

3. **Panel Admin (Simulasi Command Center)**:
   - Tampilan hero dark mode dari template dashboard admin asli.
   - Metrik sistem dan sakelar Maintenance Mode.
   - Form Siar Pengumuman (*Broadcast Announcement*) yang langsung memunculkan banner pengumuman di dashboard kreator.
   - Tabel manajemen pengguna.

4. **Simulasi Autentikasi & Reset Data**:
   - Modal login/register dengan tombol pintas *"Masuk sebagai Kreator"* atau *"Masuk sebagai Admin"*.
   - Tersimpan di `localStorage` peramban (data tidak hilang saat refresh).
   - Tombol *"Reset Demo Data"* untuk mengembalikan state prototype ke data awal kapan saja.

---

## 💻 Cara Menjalankan Secara Lokal

Pastikan Anda berada di direktori `urplan-frontend`:

```bash
cd urplan-frontend
npm install
npm run dev
```

Buka URL yang ditampilkan di terminal (biasanya `http://localhost:5173/`).

---

## ☁️ Cara Deploy ke Vercel

### Metode 1: Menggunakan Git & Dashboard Vercel (Paling Direkomendasikan)
1. Buat repository baru di GitHub (misalnya: `urplan-prototype`).
2. Masuk ke direktori `urplan-frontend` dan inisialisasi Git:
   ```bash
   cd urplan-frontend
   git init
   git add .
   git commit -m "Initial commit prototype UrPlan"
   git branch -M main
   git remote add origin https://github.com/USERNAME/urplan-prototype.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com/) dan login.
4. Klik **Add New Project**, pilih repositori `urplan-prototype`.
5. Vercel akan otomatis mendeteksi framework **Vite**. Cukup klik **Deploy**.

> **Catatan jika Anda mem-push seluruh folder Laravel**:
> Di dashboard Vercel, atur **Root Directory** ke: `urplan-frontend`.

### Metode 2: Menggunakan Vercel CLI Langsung dari Terminal
```bash
cd urplan-frontend
npm install -g vercel
vercel
```
Ikuti petunjuk di terminal, pilih opsi default. Proyek Anda akan langsung live di domain `https://*.vercel.app`.

---

## 📁 Struktur Folder
```text
urplan-frontend/
├── public/
│   └── images/
│       └── logo-1.png          # Logo resmi Our Plan
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header & navigasi workspace
│   │   ├── LandingPage.jsx     # Landing page produk
│   │   ├── KanbanBoard.jsx     # Papan Kanban Drag & Drop
│   │   ├── ListView.jsx        # Tampilan tabel daftar tugas
│   │   ├── CalendarView.jsx    # Kalender editorial konten
│   │   ├── HabitTracker.jsx    # Pelacak streak habit harian
│   │   ├── StatsCards.jsx      # Kartu ringkasan metrik
│   │   ├── FiltersBar.jsx      # Search bar & filter pills
│   │   ├── TaskModal.jsx       # Modal buat/edit tugas
│   │   ├── ProjectModal.jsx    # Modal buat/edit proyek
│   │   ├── TeamModal.jsx       # Modal kelola tim
│   │   ├── AdminDashboard.jsx  # Tampilan admin simulasi
│   │   ├── AuthModal.jsx       # Modal simulasi login/register
│   │   └── Toast.jsx           # Notifikasi pop-up dinamis
│   ├── context/
│   │   └── AppContext.jsx      # State management & LocalStorage
│   ├── data/
│   │   └── mockData.js         # Data awal prototipe
│   ├── App.jsx                 # Komponen utama
│   ├── main.jsx                # Entry point React
│   └── index.css               # Styling Tailwind CSS
├── vercel.json                 # Konfigurasi routing SPA Vercel
├── vite.config.js
└── package.json
```
