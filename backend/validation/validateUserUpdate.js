const Validator = require('validator');
var isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
    let errors = {};

    //convert empty points to strings so we can use validator
    data.username = !isEmpty(data.username)? data.username: "";
    data.password= !isEmpty(data.password)? data.password: "";


    if(Validator.isEmpty(data.username)) {
        errors.username= "Email field can't be empty.";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password= "Password field can't be empty.";
    }

    return {
        errors,
        isValid: isEmpty(errors) 
    };
}