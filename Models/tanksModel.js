const express = require('express')
const mongoose = require('mongoose')


const tankSchema = new mongoose.Schema({
    tank_id:{
        type:Number,
        trim: true,
        required: true,
        min:0
    },
    side_id:{
        type: String,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    producer:{
        type: String,
        trim: true,
        required: true
    },
    modyfication:{
        type: String,
        trim: true,
        required: true
    },
    ammo:{
        type: Number,
        trim: true,
        required: true,
        min:1
    },
    armor:{
        type: String,
        required: true,
        trim: true
    },
    milage:{
        type: Number,
        trim: true,
        required: true,
        min:0
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    datetank:{
        type: Date,
        max: Date.now()
    },
    datetankc:{
        type: Date,
        max: Date.now()
    },
    checked:{
        type: Boolean,
        default: false
    },
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Tanks", tankSchema)