var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: Schema.Types.ObjectId,

    name:{ 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: Number,
    blogs: [{type: Schema.Types.ObjectId, ref:'Post'}]
});

module.exports = mongoose.model('User', userSchema);
