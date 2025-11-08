const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        prenom: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
