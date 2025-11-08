const mongoose = require('mongoose');

const avisSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Avis', avisSchema);
