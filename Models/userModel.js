const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    president_id:{
        type: String,
        required: true,
        trim: true
    },
    namefirst: {
        type: String,
        required: true,
        trim: true
    },
    namelast: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    atom: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Users', userSchema)