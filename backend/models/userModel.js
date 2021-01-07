const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5 },
    username: { type: String, unique: true, required: true, minlength: 5 },
    password: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', schema)