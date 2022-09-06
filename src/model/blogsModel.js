const mongoose = require('mongoose')

const Object_id = mongoose.Schema.Types.ObjectId;

const blogsSchema = new mongoose.Schema({


    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: {
        type: Object_id,
        ref: "Author"
    },
    tag: [String],


    category: { type: String, required: true },


    subcategory: [String],
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    isPublished: { type: Boolean, default: false }
},

    {
        timestamps: true
    });

module.exports = mongoose.model('Blog', blogsSchema)



