const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },

    userPhone: {
        type: String,
        required: true
    },

    userDateOfBirth: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    },

    userAddress: {
        type: String,
        required: true
    },

    userPassword: {
        type: String,
        required: true
    },

    userRole: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;