//---------------------------------------importing modules--------------------------------------------

const mongoose = require('mongoose')

//----------------------------------------Creating Schema---------------------------------------------

const objectId = mongoose.Schema.Types.ObjectId;

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: objectId,
        ref: "Author",
        required: true
    },
    tag: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    }
},

    {
        timestamps: true
    });

//---------------------------------- exporting all the model here--------------------------------------

module.exports = mongoose.model('Blog', blogsSchema)  //blogs



