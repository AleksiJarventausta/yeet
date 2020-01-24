const assert = require("assert");

const validateUpdate = require("../validation/validateUserUpdate");
const validateLogin = require("../validation/validateLogin");
const validateRegisteration = require("../validation/validateRegisteration");

describe("User Info update", function() {
  it("should not be valid with empty object.", function() {
    const emptyObject = {};
    assert.equal(validateUpdate(emptyObject).isValid, false);
  });
  it("should be valid with ok values", function() {
    const user = {
      username: "testname",
      password: "12345678",
      newpassword1: "23456789",
      newpassword2: "23456789"
    };

    assert(validateUpdate(user).isValid);
  });
  it("should be valid without new password", function() {
    const user = {
      username: "testname",
      password: "12345678"
    };

    assert(validateUpdate(user).isValid);
  });
  it("should return error about short new password", function() {
    const user = {
      username: "testname",
      password: "12345678",
      newpassword1: "2345678",
      newpassword2: "2345678"
    };

    assert(validateUpdate(user).errors.newpassword1);
  });
  it("shouldn't be valid without passwords", function() {
    const user = {
      username: "testname"
    };

    assert(!validateUpdate(user).isValid);
  });
  it("should return error about passwords not matching", function() {
    const user = {
      username: "testname",
      password: "12345678",
      newpassword1: "23456789",
      newpassword2: "23456780"
    };

    assert(validateUpdate(user).errors.newpassword2);
  });
  it("should return error about no old password", function() {
    const user = {
      username: "testname",
      password: "",
      newpassword1: "23456789",
      newpassword2: "23456780"
    };

    assert(validateUpdate(user).errors.password);
  });
});
describe("User registeration", function() {
  it("should be ok with normal values", function() {
    const user = {
      username: "moi",
      discord: "yeet",
      password: "moromoro",
      passwordconfirm: "moromoro"
    };
    assert(validateRegisteration(user).isValid);
  });
  it("should return error from empty properties", function() {
    const user = {
      username: "",
      discord: "",
      password: ""
    };
    assert(validateRegisteration(user).errors.discord);
    assert(validateRegisteration(user).errors.username);
    assert(validateRegisteration(user).errors.password);
  });
  it("should return error from not matching confirmpassword", function() {
    const user = {
      username: "moi",
      discord: "yeet",
      password: "moromoro",
      passwordconfirm: "moromor"
    };
    assert(validateRegisteration(user).errors.passwordconfirm);
  });
  it("should return error from not matching confirmpassword and empty property", function() {
    const user = {
      username: "",
      discord: "",
      password: "moromoro",
      passwordconfirm: "moromor"
    };
    assert(validateRegisteration(user).errors.passwordconfirm);
    assert(validateRegisteration(user).errors.discord);
    assert(validateRegisteration(user).errors.username);
  });
});
describe("User Login", function() {
  it("should be ok with normal values", function() {
    const user = {
      username: "moi",
      password: "moromoro"
    };
    assert(validateLogin(user).isValid);
  });
  it("should return error when empty fields", function() {
    const user = {
      username: "",
      password: ""
    };
    assert(!validateLogin(user).isValid);
    assert(validateLogin(user).errors.username);
    assert(validateLogin(user).errors.password);
  });
});
