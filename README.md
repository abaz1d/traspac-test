# TPPE INVESTOLINK

## Pendahuluan

Berikut ini merupakan panduan atau hal - hal yang perlu diketahui tentang aplikasi TPPE Investolink.

## Stack yang digunakan

| Perangkat Lunak | Versi |
| --------------- | ----- |
| PHP             | 8.x   |
| Composer        | 2.x   |
| Node.js         | 18.x  |
| npm             | 8.x   |
| PostgreSQL      | 12.x  |

## Depedency yang dibutuhkan di php.ini

| Ekstensi    | Deskripsi                                  |
| ----------- | ------------------------------------------ |
| `gd2`       | Menyediakan fungsi untuk manipulasi gambar |
| `mbstring`  | Mendukung string multibyte                 |
| `pgsql`     | Driver PostgreSQL                          |
| `pdo_pgsql` | Driver PDO untuk PostgreSQL                |

## Panduan Debugging Aplikasi

1. **Masuk ke dalam Folder API**

   - Masuk ke dalam folder API dengan menjalankan perintah:

     ```sh
     cd api
     ```

2. **Menyesuaikan atau Membuat File `.env`**

   - Buat atau sesuaikan file `.env` dengan parameter yang dibutuhkan, contohnya pada file .env yang sudah ada, kemduain hal yang perlu di perhatikan adalah

     ```
     DB_CONNECTION
     DB_DATABASE
     DB_HOST
     DB_PORT
     DB_USERNAME
     DB_PASSWORD
     ```

     pada parameter env tersebut pastikan diisi dengan baik dan benar.

   - Beberapa penjelasan parameter pada file `.env` sebagai berikut :

     ```
     IS_USE_INDEX_PHP => diisi 1 jika url mengandung index.php

     IS_UNDER_PROXY => diisi 1 jika url menggunakan reverse proxy

     PATH_REVERSE => diisi nama path reverse proxy nya

     IS_USE_TRANSLATED_VALUE => diisi 1 jika ingin response message sesuai dengan bahasa aktif
     ```

3. **Menjalankan Server PHP**

   - Jalankan server PHP dengan perintah:
     ```sh
     php -S localhost:8000 -t public
     ```
   - Di sini, `8000` adalah port yang dapat Anda sesuaikan sesuai kebutuhan.

4. **Masuk ke dalam Direktori App**

   - Kembali ke direktori aplikasi Nuxt.js dengan menjalankan perintah:
     ```sh
     cd ../app
     ```

5. **Menginstal Dependensi**

   - Pastikan semua dependensi telah diinstal dengan menjalankan perintah:
     ```sh
     npm install
     ```

6. **Menyesuaikan atau Membuat File `.env.development`**

   - Buat atau sesuaikan file `.env.development` dengan parameter yang dibutuhkan, contohnya:
     ```
     BASE_URL=http://localhost:8000 #sesuaikan dengan API yang telah anda jalankan sebelumnya
     IS_DISABLED_FORM=0
     BASE_URL_WORLD_BANK=https://data.worldbank.org/
     BASE_URL_BKPM=https://regionalinvestment.bkpm.go.id/pir/peluang-investasi
     BASE_URL_INA_ACCESS=https://ina-access.com/
     BASE_URL_BPS=https://www.bps.go.id/
     BASE_URL_ASSEAN=https://www.aseanstats.org/
     BASE_URL_KEK=https://kek.go.id/
     BASE_URL_SATU_DATA=https://satudata.kemendag.go.id/
     BASE_URL_INVESMENT_BOOK=https://indonesiaincorporated.bumn.go.id/investment-center/
     ```

7. **Menjalankan Aplikasi dalam Mode Development**
   - Jalankan aplikasi Nuxt.js dalam mode development dengan perintah:
     ```sh
     npm run dev
     ```

Setelah langkah-langkah di atas selesai, aplikasi Anda akan berjalan dalam mode development dengan parameter yang telah Anda atur di file `.env.development`

## known issues dan bug bug yang ada tapi sangat jarang muncul

- Jika upload >20 file bersamaan kadang terjadi error

## Panduan instalasi di server (production)

1. **Masuk ke Direktori Aplikasi**

   - Pertama, masuk ke dalam direktori aplikasi Nuxt.js Anda:
     ```sh
     cd /app
     ```

2. **Instalasi Dependensi**

   - Install semua dependensi yang dibutuhkan dengan menjalankan perintah:
     ```sh
     npm install
     ```

3. **Pengaturan Environment di `.env.production`**

   - Buat atau sesuaikan file `.env.production` di root proyek Anda dengan konfigurasi berikut:
     ```plaintext
     BASE_URL=http://localhost:8000 #sesuaikan dengan API yang telah anda jalankan diserver
     IS_DISABLED_FORM=0
     BASE_URL_WORLD_BANK=https://data.worldbank.org/
     BASE_URL_BKPM=https://regionalinvestment.bkpm.go.id/pir/peluang-investasi
     BASE_URL_INA_ACCESS=https://ina-access.com/
     BASE_URL_BPS=https://www.bps.go.id/
     BASE_URL_ASSEAN=https://www.aseanstats.org/
     BASE_URL_KEK=https://kek.go.id/
     BASE_URL_SATU_DATA=https://satudata.kemendag.go.id/
     BASE_URL_INVESMENT_BOOK=https://indonesiaincorporated.bumn.go.id/investment-center/
     ```

4. **Pengaturan Host dan Port Server di `nuxt.config.js`**

   - Buka file `nuxt.config.js` dalam proyek Nuxt.js Anda.
   - Tambahkan atau ubah bagian `server` untuk menentukan host dan port server:
     ```javascript
     export default {
       server: {
         host: "0.0.0.0", // atau 'localhost'
         port: 3000,
       },
     };
     ```

5. **Menjalankan `npm run build`**

   - Pastikan proyek Anda siap untuk di-deploy dengan menjalankan perintah:
     ```sh
     npm run build
     ```

6. **Instalasi PM2 dan Setup `ecosystem.config.js`**

   - Install PM2 secara global jika belum terinstal:
     ```sh
     npm install -g pm2
     ```
   - Buat file `ecosystem.config.js` di root proyek Anda dengan konten berikut:
     ```javascript
     module.exports = {
       apps: [
         {
           name: "my-nuxt-app",
           script: "npm",
           args: "start",
           env: {
             HOST: "0.0.0.0",
             PORT: 3000,
             NODE_ENV: "production",
           },
         },
       ],
     };
     ```

7. **Menjalankan Aplikasi dengan PM2**
   - Jalankan aplikasi Nuxt.js menggunakan PM2 dengan perintah:
     ```sh
     pm2 start ecosystem.config.js
     ```

Setelah langkah-langkah di atas selesai, aplikasi Nuxt.js Anda akan dijalankan di lingkungan produksi menggunakan PM2 dengan pengaturan host dan port yang telah Anda tentukan. Pastikan untuk menyesuaikan nilai host, port, dan nama aplikasi sesuai dengan kebutuhan Anda.
