const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    bio: {
        type: String,
    },
    college: {
        type: String,
    },
    branch: {
        type: String,
    }, 
    phoneNumber: {
        type: Number,
    }, 
    city: {
        type: String,
    }, 
    state: {
        type: String,
    },
    gitHubLink: {
        type: String,
    }, 
    linkedInLink: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
    }
},{
    timestamps: true
 }
)


const User = mongoose.model('User', userSchema)

module.exports = User