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
      discord: "lol1"
    };
    chai
      .request(app)
      .post("/user/update")
      .set("Authorization", registeredUserToken)
      .send(newDiscord)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("should send that username is already in use", function(done) {
    const newDiscord = {
      username: "llll"
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
      username: "freeUsernameForTesting"
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
      username: "freeUsernameForTesting2"
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
