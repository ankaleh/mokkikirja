const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 5
    },
    writtenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    guests: { 
        type: [String]
    },
    date: {
        type: String,//Date,
        required: true
    }
  
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Post', schema)