const mongoose = require('mongoose');
var schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    organization: {
        type: String,
    },
    designation: {
        type: String
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)