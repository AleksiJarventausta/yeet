const Validator = require('validator');
var isEmpty = require('is-empty');

module.exports = function validateRegisteration (data) {
    let errors = {};

    //convert empty points to strings so we can use validator
    data.email = !isEmpty(data.email)? data.email: "";
    data.name = !isEmpty(data.name)? data.name: "";
    data.password= !isEmpty(data.password)? data.password: "";

    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field can't be empty.";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field can't be empty.";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
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