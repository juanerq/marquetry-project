const { Schema, model } = require('mongoose')

// Schema
const clientSchema = new Schema({
  name: String,
  phone: String,
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: 'Picture'
  }]
})

clientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Model
const Client = model('Client', clientSchema)

module.exports = Client
