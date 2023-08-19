const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
var path = require("path");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Pegawai Routes", () => {
  let addedPegawaiId;
  let old_picture = "404.png";

  it("should respond with agama table data when 'table_name=agama' query parameter is provided", (done) => {
    chai
      .request(app)
      .get("/pegawai")
      .query({ table_name: "agama" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success").to.be.an("boolean");
        expect(res.body).to.have.property("success").to.equal(true);
        expect(res.body).to.have.property("data").to.be.an("array");
        // Add more assertions based on your response structure
        done();
      });
  });

  it("should respond with paginated pegawai data when no query parameter is provided", (done) => {
    chai
      .request(app)
      .get("/pegawai")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success").to.be.an("boolean");
        expect(res.body).to.have.property("success").to.equal(true);
        expect(res.body).to.have.property("data").to.be.an("object");
        expect(res.body.data).to.have.property("rows").to.be.an("array");
        expect(res.body.data.rows[0])
          .to.have.property("id_pegawai")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nip")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nama")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("tempat_lahir")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("tanggal_lahir")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("jenis_kelamin")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nama_golongan")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nama_eselon")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nama_jabatan")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("tempat_tugas")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nama_agama")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("nama_unit")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("alamat")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("npwp")
          .to.be.an("string");
        expect(res.body.data.rows[0])
          .to.have.property("no_hp")
          .to.be.an("string");
        expect(res.body.data.rows[0]).to.have.property("foto_profil");
        // Add more assertions based on your response structure
        done();
      });
  });

  it("should add a new pegawai with foto profil and return success", (done) => {
    const newPegawai = {
      id_pegawai: "PGW-DEV",
      nama: "Contoh",
      tempat_lahir: "Kota Semarang",
      tanggal_lahir: "2003-08-22",
      jenis_kelamin: "P",
      golongan: "GOL-04",
      eselon: "ESL-06",
      jabatan: "JBT-06",
      tempat_tugas: "Surabaya",
      agama: "AGM-01",
      unit_kerja: "UK-06",
      alamat: "Jl. DEF No. 456",
      no_hp: "08134567890",
      npwp: "2345678901",
    };

    const filePath = path.join(__dirname, "/../public", "images", "404.png"); // Ganti dengan path file foto profil

    chai
      .request(app)
      .post("/pegawai")
      .field(newPegawai) // Isi data lain yang perlu dikirim
      .attach("foto_profil", fs.readFileSync(filePath), "404.png") // Mengirim file
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success").to.be.an("boolean");
        expect(res.body).to.have.property("success").to.equal(true);
        expect(res.body).to.have.property("data").to.be.an("object");
        expect(res.body.data).to.have.property("message").to.be.an("string");
        expect(res.body.data.message).to.equal("success add");
        addedPegawaiId = newPegawai.id_pegawai;
        done();
      });
  });

  it("should retrieve a specific pegawai by ID", (done) => {
    chai
      .request(app)
      .get(`/pegawai/${addedPegawaiId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success").to.be.an("boolean");
        expect(res.body).to.have.property("success").to.equal(true);
        expect(res.body).to.have.property("data").to.be.an("object");
        expect(res.body.data).to.have.property("id_pegawai").to.be.an("string");
        expect(res.body.data).to.have.property("nip").to.be.an("string");
        expect(res.body.data).to.have.property("nama").to.be.an("string");
        expect(res.body.data)
          .to.have.property("tempat_lahir")
          .to.be.an("string");
        expect(res.body.data)
          .to.have.property("tanggal_lahir")
          .to.be.an("string");
        expect(res.body.data)
          .to.have.property("jenis_kelamin")
          .to.be.an("string");
        expect(res.body.data).to.have.property("golongan").to.be.an("string");
        expect(res.body.data).to.have.property("eselon").to.be.an("string");
        expect(res.body.data).to.have.property("jabatan").to.be.an("string");
        expect(res.body.data)
          .to.have.property("tempat_tugas")
          .to.be.an("string");
        expect(res.body.data).to.have.property("agama").to.be.an("string");
        expect(res.body.data).to.have.property("unit_kerja").to.be.an("string");
        expect(res.body.data).to.have.property("alamat").to.be.an("string");
        expect(res.body.data).to.have.property("no_hp").to.be.an("string");
        expect(res.body.data).to.have.property("npwp").to.be.an("string");
        expect(res.body.data).to.have.property("foto_profil");
        old_picture = Buffer.from(res.body.data.foto_profil.data).toString();
        done();
      });
  });

  it("should update an existing pegawai and return success", (done) => {
    const updatedPegawai = {
      nama: "Updated",
    };

    chai
      .request(app)
      .put(`/pegawai/${addedPegawaiId}`)
      .send(updatedPegawai)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success").to.be.an("boolean");
        expect(res.body).to.have.property("success").to.equal(true);
        expect(res.body).to.have.property("data").to.be.an("object");
        expect(res.body.data).to.have.property("message").to.be.an("string");
        expect(res.body.data.message).to.equal("success update");
        done();
      });
  });

  it("should delete an existing pegawai and return success", (done) => {
    chai
      .request(app)
      .delete(`/pegawai/${addedPegawaiId}?gambar_lama=${old_picture}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success").to.be.an("boolean");
        expect(res.body).to.have.property("success").to.equal(true);
        expect(res.body).to.have.property("data").to.be.an("object");
        expect(res.body.data).to.have.property("message").to.be.an("string");
        expect(res.body.data.message).to.equal("Success delete pegawai");
        done();
      });
  });
});
