var artikel = "\nDalam kehidupan suatu negara, pendidikan memegang peranan yang amat penting untuk menjamin kelangsungan hidup negara dan bangsa, karena pendidikan merupakan wahana untuk meningkatkan dan mengembangkan kualitas sumber daya manusia. Seiring dengan perkembangan teknologi komputer dan teknologi informasi, sekolah-sekolah di Indonesia sudah waktunya mengembangkan Sistem Informasi manajemennya agar mampu mengikuti perubahan jaman.\nSISKO mampu memberikan kemudahan pihak pengelola menjalankan kegiatannya dan meningkatkan kredibilitas dan akuntabilitas sekolah dimata siswa, orang tua siswa, dan masyakat umumnya.Penerapan teknologi informasi untuk menunjang proses pendidikan telah menjadi kebutuhan bagi lembaga pendidikan di Indonesia. Pemanfaatan teknologi informasi ini sangat dibutuhkan untuk meningkatkan efisiensi dan produktivitas bagi manajemen pendidikan. Keberhasilan dalam peningkatan efisiensi dan produktivitas bagi manajemen pendidikan akan ikut menentukan kelangsungan hidup lembaga pendidikan itu sendiri. Dengan kata lain menunda penerapan teknologi informasi dalam lembaga pendidikan berarti menunda kelancaran pendidikan dalam menghadapi persaingan global.\nPemanfaatan teknologi informasi diperuntukkan bagi peningkatan kinerja lembaga pendidikan dalam upayanya meningkatkan kualitas Sumber Daya Manusia Indonesia. Guru dan pengurus sekolah tidak lagi disibukkan oleh pekerjaan-pekerjaan operasional, yang sesungguhnya dapat digantikan oleh komputer. Dengan demikian dapat memberikan keuntungan dalam efisien waktu dan tenaga.\nPenghematan waktu dan kecepatan penyajian informasi akibat penerapan teknologi informasi tersebut akan memberikan kesempatan kepada guru dan pengurus sekolah untuk meningkatkan kualitas komunikasi dan pembinaan kepada siswa. Dengan demikian siswa akan merasa lebih dimanusiakan dalam upaya mengembangkan kepribadian dan pengetahuannya.\nSebagai contoh yang paling utama adalah sistem penjadwalan yang harus dilakukan setiap awal semester. Biasanya membutuhkan waktu lama untuk menyusun penjadwalan, Dengan SISKO dapat selesai dalam waktu singkat. Untuk mempermudah bagian administrasi kurikulum sekolah, SISKO menyediakan fasilitas istimewa yang merupakan inti dari sistem kurikulum sekolah yaitu membantu dalam pembuatan penjadwalan mata pelajaran sekolah yang dapat diproses tidak lebih lama dari 10 menit. Administrator hanya akan memasukkan kondisi dari masing-masing guru yang akan mengajar baik itu dalam 1 minggu seorang guru dapat mengajar berapa jam, selain itu dapat juga melakukan pemesanan tempat dan penempatan hari libur masing-masing guru dalam 1 minggu masa mengajar. Setelah semua kondisi dimasukkan, sistem akan memproses semua data tersebut sehingga menghasilkan jadwal yang optimal dan dapat langsung dipakai karena sistem akan mendeteksi sehingga tidak akan ada jadwal yang bertumpukan satu dengan yang lainnya.\nSetelah semua kondisi dimasukkan, sistem akan memproses semua data tersebut sehingga menghasilkan jadwal yang optimal dan dapat langsung dipakai karena sistem akan mendeteksi sehingga tidak akan ada jadwal yang bertumpukan satu dengan yang lainnya. Setelah permasalahan penjadwalan dapat ditangani dengan baik, hal yang tidak kalah pentingnya adalah memasukkan data siswa.\nProgram SISKO telah menyediakan fasilitas untuk penanganan penilaian siswa yang secara langsung memasukkan nilai ke dalam raport dan siap dicetak. Untuk sistem penilaian siswa, yang dapat melakukan pengisian hanya Guru yang mengajar mata pelajaran. Sistem penilaian telah disesuaikan dengan KBK sehingga masing-masing guru dapat memasukkan deskripsi narasi dari mata pelajaran. Untuk menampilkan data penilaian dapat disesuaikan kembali dengan kebijaksanaan dari masing-masing lembaga pendidikan apakah ingin menampilkan data nilai akhir siswa maupun menampilkan data nilai siswa setiap kali mengadakan test ataupun tugas tertentu.\nSelain Modul untuk penjadwalan dan Modul Penilaian siswa, SISKO juga memberikan fasilitas untuk bagian administrasi keuangan sekolah dalam hal pembayaran SPP siswa. Bagian administrasi dapat langsung mengecek siapa siswa yang mempunyai tunggakan SPP dan untuk detail histori pembayaran SPP dari masing-masing siswa dapat dicetak seperti mencetak buku tabungan di bank sehingga mempermudah pekerjaan pihak administrasi keuangan. Administrasi keuangan dapat langsung melakukan pengaturan data pembayaran masing-masing siswa sesuai dengan kebutuhan dan dapat diubah sewaktu-waktu apabila ada kenaikan pembayaran SPP. Apabila siswa tersebut akan melakukan pembayaran, petugas dapat langsung memasukkan data. Hal sama juga dapat dilakukan untuk Data pembayaran Sumbangan Sukarela dan Tabungan Karyawisata.\n";
function hitungKemunculanKata(kata, artikel) {
    var regex = new RegExp(kata, "gi"); // cek semua dengan case-insensitive, hapus "i", untuk case-sensitive
    var jumlahKemunculan = (artikel.match(regex) || []).length; // menjumlah total/ panjang kata yang didapat
    return jumlahKemunculan;
}
function gantiKata(kataLama, kataBaru, artikel) {
    var regex = new RegExp(kataLama, "gi"); // cek semua dengan case-insensitive, hapus "i", untuk case-sensitive
    var teksBaru = artikel.replace(regex, kataBaru); // replace kata lama(kiri) diganti kata baru (kanan)
    return teksBaru;
}
function urutkanKata(artikel) {
    var kataArray = artikel
        .split(/\s+/)
        .filter(function (kata) { return kata.trim().length > 0; }); // memisahkan artikel menjadi []kata kemudian menghapus spasi
    kataArray.sort(); // mengurutkan kata
    return kataArray.join(" "); // beri spasi
}
var kataCari = "teknologi";
var kataBaru = "ilmu pengetahuan";
console.log("+------------------------------------------------------------+");
console.log("|                  Analisis Artikel                          |");
console.log("+------------------------------------------------------------+");
var jumlahKemunculan = hitungKemunculanKata(kataCari, artikel);
console.log("| Jumlah kemunculan kata dalam artikel:                      |");
console.log("| Kata \"".concat(kataCari, "\" muncul sebanyak ").concat(jumlahKemunculan, " kali             |"));
console.log("+------------------------------------------------------------+");
var artikelDenganPenggantian = gantiKata("adalah", "ialah", artikel);
console.log("| Artikel setelah penggantian kata:                         |");
console.log("|", artikelDenganPenggantian);
console.log("+------------------------------------------------------------+");
var kataYangDiurutkan = urutkanKata(artikel);
console.log("| Kata-kata dalam artikel setelah diurutkan:                |");
console.log("|", kataYangDiurutkan);
console.log("+------------------------------------------------------------+");
