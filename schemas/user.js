import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    fingerprint: String,
});
