const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String
    },
    upvote: [{
        voterId: {
            type: String
        }
    }],
    downvote: [{
        voterId: {
            type: String
        }
    }],
    userId: {
        type: String
    },
    comments: [{
        answer: {
            type: String
        },
        userId: {
            type: String
        },
        email: {
            type: String
        },
        userAvatar: {
            type: String,
            default : 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
        },
        upvote: {
            type: Number
        },
        downvote: {
            type: Number
        },
        date: {
            type: String,
            default : new Date()
        }
    }]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post