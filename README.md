# Employee Management Mini Project

Proyek ini dibuat menggunakan [Angular CLI](https://github.com/angular/angular-cli) versi 20.1.4.

## Demo

Project ini sudah di deploy dengan menggunakan vercel dan dapat di cek langsung disini
https://employee-management-mini-proj.vercel.app/

## Clone project

Untuk clone project, jalankan perintah:

```bash
git clone https://github.com/kevinkellyyyy/employee-management-mini-proj.git
```

## Menjalankan Server Develop

Pertama install node_modules agar dependency di package json dapat digunakan

```bash
npm install
```

Untuk memulai server pengembangan lokal, jalankan perintah:

```bash
ng serve
```

Setelah server berjalan, buka browser dan akses `http://localhost:4200/`. Aplikasi akan otomatis memuat ulang jika ada perubahan pada file sumber.

## Beberapa catatan pada project ini

### Asset icon svg

- semua file .svg pada project ini saya ambil dari https://www.svgrepo.com/ (gartis)
- lalu diconvert ke dalam bentuk html elemen svg melalui https://nikitahl.github.io/svg-2-code/
- dan disimpan dengan standalone component dari hasil convert svg tersebut di assets/svg

### Library tambahan

- untuk ui framework saya menambahkan Material UI untuk keperluan di beberapa komponen seperti modal dialog, tabel, dan form fields
- serta moment js untuk keperluan formating tanggal
