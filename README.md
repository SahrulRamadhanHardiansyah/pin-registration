# Sistem Pengambilan PIN Masuk SMA/SMK

Website ini adalah sistem antrean berbasis tiket untuk pengambilan PIN masuk SMA/SMK.  
Setiap siswa dapat mengambil tiket terlebih dahulu, kemudian menggunakan tiket tersebut untuk mengambil PIN.

---

![image](https://github.com/user-attachments/assets/45a73b8e-49f8-4be3-9985-db39eef9e21c)

![image](https://github.com/user-attachments/assets/948e8672-c881-4c87-8937-b6f462f66c45)

![image](https://github.com/user-attachments/assets/8d03e719-a987-496d-bfd8-5d6f0daa23d8)

![image](https://github.com/user-attachments/assets/680f1599-e6c6-42c7-80bb-f271c0b63441)

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
   git clone https://github.com/SahrulRamadhanHardiansyah/pin-registration
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

<p align="left">
  <a href="https://laravel.com/" target="_blank">
    <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  </a>
  <a href="https://inertiajs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Inertia.js-00B4B6?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" />
  </a>
  <a href="https://reactjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://www.mysql.com/" target="_blank">
    <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </a>
</p>

---

## Lisensi

Proyek ini dikembangkan untuk kebutuhan pembelajaran dan tidak untuk distribusi komersial tanpa izin.

