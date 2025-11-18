const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Category title is required']
        },
        imageUrl: {
            type: String,
            default: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-craig-122861-376464.jpg&fm=jpg',
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)