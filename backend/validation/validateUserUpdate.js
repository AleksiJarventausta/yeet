const Validator = require("validator");
var isEmpty = require("is-empty");

module.exports = function validateUpdate(data) {
  let errors = {};

  //convert empty points to strings so we can use validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newpassword1 = !isEmpty(data.newpassword1) ? data.newpassword1 : "";
  data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2 : "";

  if (Validator.isEmpty(data.password)) {
    if (!Validator.isEmpty(data.newpassword1))
      errors.password = "Password field can't be empty if updating password.";
  } else {
    if (!Validator.isLength(data.newpassword1, { min: 8, max: 32 })) {
      errors.newpassword1 = "Password has to be 8 to 32 characters long.";
    } else if (data.newpassword1 !== data.newpassword2) {
      errors.newpassword2 = "Doesn't match the first one";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
