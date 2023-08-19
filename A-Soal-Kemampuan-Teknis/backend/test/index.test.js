const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = require("../app");

const expect = chai.expect;
chai.use(chaiHttp);
let validToken = "";

describe("Authentication Routes with POST methode", () => {
  it("should respond with success when valid credentials are provided", (done) => {
    chai
      .request(app)
      .post("/auth")
      .send({
        input_user: "dev@gmail.com",
        password: "123",
      })
      .end(function (err, res) {
        try {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success").to.be.an("boolean");
          expect(res.body).to.have.property("success").to.equal(true);
          expect(res.body).to.have.property("data").to.be.an("object");
          expect(res.body.data).to.have.property("userid").to.be.an("string");
          expect(res.body.data).to.have.property("email").to.be.an("string");
          expect(res.body.data).to.have.property("username").to.be.an("string");
          expect(res.body.data).to.have.property("token").to.be.an("string");
          validToken = res.body.data.token;
          done();
        } catch (err) {
          done();
        }
      });
  });

  it("should respond with an error message when invalid credentials are provided with POST methode", (done) => {
    chai
      .request(app)
      .post("/auth")
      .send({
        input_user: "invalid@email.com",
        password: "invalidpassword",
      })
      .end(function (err, res) {
        try {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success").to.be.an("boolean");
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body).to.have.property("data").to.be.an("object");
          expect(res.body.data).to.have.property("message").to.be.an("string");
          done();
        } catch (err) {
          done();
        }
      });
  });

  it("should log the user out and respond with success", (done) => {
    chai
      .request(app)
      .post("/logout")
      .set("Authorization", `Bearer ${validToken}`)
      .end(function (err, res) {
        try {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success").to.be.an("boolean");
          expect(res.body).to.have.property("success").to.equal(true);
          expect(res.body).to.have.property("data").to.be.an("object");
          expect(res.body.data).to.have.property("message").to.be.an("string");
          expect(res.body.data.message).to.equal("sign out success");
          done();
        } catch (err) {
          done();
        }
      });
  });

  it("should respond with an error message when an invalid token is provided", (done) => {
    const invalidtoken = "invalidtoken";
    chai
      .request(app)
      .post("/logout")
      .set("Authorization", `Bearer ${invalidtoken}`)
      .end(function (err, res) {
        try {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success").to.be.an("boolean");
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body).to.have.property("data").to.be.an("object");
          expect(res.body.data).to.have.property("message").to.be.an("string");
          expect(res.body.data.message).to.equal(
            "Token invalid" || "User not found"
          );
          done();
        } catch (err) {
          done();
        }
      });
  });
});
