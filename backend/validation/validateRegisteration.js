const Validator = require('validator');
var isEmpty = require('is-empty');

module.exports = function validateRegisteration (data) {
    let errors = {};

    //convert empty points to strings so we can use validator
    data.username = !isEmpty(data.username)? data.username: "";
    data.discord = !isEmpty(data.discord)? data.discord: "";
    data.password= !isEmpty(data.password)? data.password: "";

    if(Validator.isEmpty(data.username)) {
        errors.name = "Name field can't be empty.";
    }
    if(Validator.isEmpty(data.discord)) {
        errors.discord= "discord field can't be empty.";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password= "Password field can't be empty.";
    } else if(!Validator.isLength(data.password, {min:8, max: 32})) {
        errors.password = "Password has to be 8 to 32 characters long.";
    }

    return {
        errors,
        isValid: isEmpty(errors) 
    };
}