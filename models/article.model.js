const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        category: {
            type: String
        },
        brand: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        avis: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Avis'
            }
        ],
        picture: {
            type: String
        },
        img1: {
            type: String,
            required: true
        },
        img2: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        stock: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
