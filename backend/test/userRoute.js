const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Configure chai
chai.use(chaiHttp);
chai.should();
const { expect } = chai;

const registeredUserToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWI1NTcwY2Q4YjNhNjRkNDBjODE5ZCIsInVzZXJuYW1lIjoibGxsbGxsIiwiaWF0IjoxNTc4ODQ5NjU0LCJleHAiOjE2MTA0MDY1ODB9.U-OS345Th0bzjq59CHs0dlLapT9cNR_g9GCRF3oWCBY";

describe("User router", function() {
  describe("POST /user/update", function() {
    it("should throw unauthorized", function(done) {
      chai
        .request(app)
        .post("/user/update")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it("should update discord with ok values", function(done) {
      const newDiscord = {
        discord: "lol1",
        password: "00000000"
      };
      chai
        .request(app)
        .post("/user/update")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.token).to.exist;
          done();
        });
    });
    it("should throw error when invalid password", function(done) {
      const newDiscord = {
        discord: "lol1",
        password: "0000000"
      };
      chai
        .request(app)
        .post("/user/update")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.password).to.equal("Wrong password")
          done();
        });
    });
    it("should send that username is already in use", function(done) {
      const newDiscord = {
        username: "9",
        password: "00000000"
      };
      chai
        .request(app)
        .post("/user/update")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.username).to.equals("Username already in use");
          done();
        });
    });
    it("should change the username", function(done) {
      const newDiscord = {
        username: "freeUsernameForTestingggg",
        password: "00000000"
      };
      chai
        .request(app)
        .post("/user/update")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.token).to.exist;
          done();
        });
    });
    it("should change the username back", function(done) {
      const newDiscord = {
        username: "freeUsernameForTesting2",
        password: "00000000"
      };
      chai
        .request(app)
        .post("/user/update")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.token).to.exist;
          done();
        });
    });
  });

  describe("POST /user/login", function() {
    it("should log in.", function(done) {
      const newDiscord = {
        username: "llll",
        password: "00000000"
      };
      chai
        .request(app)
        .post("/user/login")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.token).to.exist;
          done();
        });
    });
    it("should send errors about empty fields.", function(done) {
      const newDiscord = {
        username: "",
        password: ""
      };
      chai
        .request(app)
        .post("/user/login")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.username).to.exist;
          expect(res.body.password).to.exist;
          done();
        });
    });
    it("should send errors about wrong password", function(done) {
      const newDiscord = {
        username: "llll",
        password: "ssss"
      };
      chai
        .request(app)
        .post("/user/login")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.password).to.exist;
          done();
        });
    });
    it("should send errors about wrong username", function(done) {
      const newDiscord = {
        username: "lll",
        password: "ssss"
      };
      chai
        .request(app)
        .post("/user/login")
        .set("Authorization", registeredUserToken)
        .send(newDiscord)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.username).to.exist;
          done();
        });
    });
  });

  describe("POST /user/register", function() {
    it("should warn empty fields.", function(done) {
      const emptyRegistering = {}
      chai
        .request(app)
        .post("/user/register")
        .send(emptyRegistering)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.username).to.exist;
          expect(res.body.discord).to.exist;
          expect(res.body.password).to.exist;
          done();
        });
    });
    it("should warn used username.", function(done) {
      const emptyRegistering = {
        username:"llll",
        discord:"ss",
        additional:"sss",
        password:"123456789",
        passwordconfirm:"123456789"
      }
      chai
        .request(app)
        .post("/user/register")
        .send(emptyRegistering)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.username).to.exist;
          done();
        });
    });
  });
});
