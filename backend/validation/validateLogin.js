const Validator = require('validator');
var isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
    let errors = {};

    //convert empty points to strings so we can use validator
    data.email = !isEmpty(data.email)? data.email: "";
    data.password= !isEmpty(data.password)? data.password: "";


    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field can't be empty.";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password= "Password field can't be empty.";
    }

    return {
        errors,
        isValid: isEmpty(errors) 
    };
}