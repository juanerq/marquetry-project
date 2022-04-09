const Client = require('../models/Client')
const to = require('../tools/to')

const createClient = async (req, res, next) => {
  const client = req.body

  const newClient = new Client({
    name: client.name,
    phone: client.phone
  })

  const [saveError, saveClient] = await to(newClient.save())
  if (saveError) return next(saveError)

  res.status(201).json(saveClient)
}

const updateClient = async (req, res, next) => {
  const id = req.params.id
  const client = req.body

  const newClientInfo = {
    name: client.name,
    phone: client.phone
  }

  const [updateError, update] = await to(Client.findByIdAndUpdate(id, newClientInfo, { new: true }))
  if (updateError) return next(updateError)

  res.status(200).json(update)
}

const deleteClient = async (req, res, next) => {
  const id = req.params.id

  const [deletingError, deleting] = id.toLowerCase() === 'all'
    ? await to(Client.deleteMany({}))
    : await to(Client.findByIdAndDelete(id))

  if (deletingError) return next(deletingError)

  res.status(204).json(deleting)
}

module.exports = {
  createClient,
  updateClient,
  deleteClient
}
