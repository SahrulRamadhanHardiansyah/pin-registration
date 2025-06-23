# Sistem Pengambilan PIN Masuk SMA/SMK

Website ini adalah sistem antrean berbasis tiket untuk pengambilan PIN masuk SMA/SMK.  
Setiap siswa dapat mengambil tiket terlebih dahulu, kemudian menggunakan tiket tersebut untuk mengambil PIN.

---

## Fitur
- Registrasi dan pengambilan tiket dengan kuota harian.
- Cek tiket yang sudah terdaftar.
- Pengambilan PIN berdasarkan kode tiket.
- Admin dapat mengatur periode pengambilan tiket dan kuota harian.

---

## Instalasi

1. Clone repository ini:
   ```bash
   git clone [URL_REPOSITORY_ANDA]
   ```

2. Jalankan perintah berikut untuk menginstal dependensi:

   ```bash
   composer install
   npm install
   ```

3. Buat file `.env` dan sesuaikan konfigurasi database Anda.

4. Jalankan migrasi database:

   ```bash
   php artisan migrate
   ```

5. Jalankan server Laravel:

   ```bash
   php artisan serve
   ```

6. Jalankan Vite:

   ```bash
   npm run dev
   ```

---

## Alur Pengguna (Siswa)

1. Akses halaman utama:

   ```
   http://localhost:8000/
   ```
2. Isi form pengambilan tiket dengan data lengkap.
3. Pilih tanggal pengambilan PIN yang masih tersedia.
4. Dapatkan **kode tiket** dan **nomor antrean**.

### Cek Tiket

Jika lupa kode tiket, akses halaman:

```
http://localhost:8000/cek-tiket
```

Masukkan NISN untuk melihat tiket yang sudah terdaftar.

### Pengambilan PIN

Untuk mengambil PIN, **harus mengakses endpoint berikut secara manual:**

```
http://localhost:8000/ambil-pin-page
```

Masukkan kode tiket yang sudah didapat untuk mengambil PIN.

---

## Login Admin

Untuk mengatur periode pengambilan tiket dan kuota harian, **admin harus login melalui endpoint manual:**

```
http://localhost:8000/admin/login
```

Gunakan akun yang sudah didaftarkan secara manual di database.

Setelah login, admin dapat mengakses:

```
http://localhost:8000/admin/pin-period
```

Di halaman ini admin bisa mengatur:

* Tanggal mulai dan selesai pengambilan tiket
* Maksimal tiket per hari

---

## Catatan Penting

* Pengambilan PIN **tidak tersedia di halaman utama** dan harus diakses manual.
* Halaman login admin **belum tersedia di menu navigasi**, sehingga perlu mengakses endpoint secara langsung.
* Sistem akan otomatis membatasi kuota harian sesuai pengaturan admin.

---

## Teknologi yang Digunakan

* Laravel
* Inertia.js
* React
* Tailwind CSS
* MySQL

---

## Lisensi

Proyek ini dikembangkan untuk kebutuhan pembelajaran dan tidak untuk distribusi komersial tanpa izin.

