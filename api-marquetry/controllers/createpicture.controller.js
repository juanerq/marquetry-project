const Picture = require('../models/Picture')
const to = require('../tools/to')
const Client = require('../models/Client')

const createPicture = async (req, res, next) => {
  const picture = req.body

  const client = await Client.findById(picture.clientId)

  const [error, pictures] = await to(Picture.find({}))
  if (error) { next(error) }

  let codes
  let maxCode = 0

  if (pictures.length > 0) {
    codes = pictures.map(e => Number(e.code))
    console.log({ codes })
    maxCode = Math.max(...codes)
  }
  console.log(maxCode)
  const newPicture = new Picture({
    code: maxCode + 1,
    client: client._id,
    type: picture.type,
    molding: picture.molding,
    glass: picture.glass,
    color: picture.color,
    margin: picture.margin,
    amount: picture.amount,
    measure: picture.measure,
    price: picture.price,
    payment: picture.payment || 0,
    photo: picture.photo || 'Not photo',
    note: picture.note,
    date: new Date()
  })

  const [saveError, savePicture] = await to(newPicture.save())
  if (saveError) return next(saveError)

  client.pictures = client.pictures.concat(savePicture._id)
  await client.save()

  res.status(201).json(savePicture)
}

module.exports = createPicture
