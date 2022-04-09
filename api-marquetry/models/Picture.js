const { Schema, model } = require('mongoose')

const pictureSchema = Schema({
  code: Number,
  date: Date,
  type: String,
  amount: Number,
  molding: String,
  measure: { height: Number, width: Number },
  color: String,
  glass: String,
  margin: Number,
  price: Number,
  payment: Number,
  note: String,
  photo: String,
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }
})

pictureSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Picture = model('Picture', pictureSchema)

module.exports = Picture
