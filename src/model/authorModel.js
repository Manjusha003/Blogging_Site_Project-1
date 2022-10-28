//---------------------------------------importing modules--------------------------------------------

const mongoose = require("mongoose")

//----------------------------------------Creating Schema---------------------------------------------

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim:true
    },
    lname: {
        type: String,
        required: true,
        trim:true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        trim:true

    }
}, { timestamps: true })

// exporting all the model here
module.exports = mongoose.model('Author', authorSchema)

