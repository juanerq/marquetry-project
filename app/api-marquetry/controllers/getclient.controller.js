const Client = require('../models/Client')
const to = require('../tools/to')

let db = []

const getClients = async (req, res, next) => {
  const [error, clients] = await to(Client.find({}).populate('pictures', {
    client: 0
  }))
  if (error) return next(error)
  db = [null, clients]
  res.status(200).json(clients)
}

const searchClient = async (req, res, next) => {
  let { id, q, p } = req.query

  // we have an id available
  if (id) {
    const [error, client] = await to(Client.findById(id).populate('pictures', {
      client: 0
    }))
    if (error) return next(error)
    if (client) return res.status(200).json(client)
  }

  // we have a keyword to search for
  if (q) {
    if (db.length === 0 || q[0] === '@') {
      db = await to(Client.find({}).populate('pictures', { client: 0 }))
      q = q.slice(1)
    }

    const [error, clients] = db
    if (error) return next(error)

    const results = clients.filter(client => {
      const { name } = client
      return name.replace(/ |-/g, '')
        .toLowerCase()
        .includes(
          q.replace(/ |-/g, '').toLowerCase()
        )
    })
    return res.status(200).json(results)
  }

  // we have a phone number to search for
  if (p) {
    if (db.length === 0) {
      db = await to(Client.find({}).populate('pictures', { client: 0 }))
    }
    const [error, clients] = db
    if (error) return next(error)

    const results = clients.filter(client => {
      const { phone } = client
      return phone.includes(p)
    })
    if (results.length > 0) return res.status(200).json(results)
  }

  // we don't have anything
  return res.status(404).json({ message: 'Not found' })
}

module.exports = {
  getClients,
  searchClient
}

// if (code) {
//   const [error, client] = await to(Client.find({ code }).populate('pictures', {
//     client: 0
//   }))
//   if (error || client.length === 0) {
//     return next({
//       status: 'error',
//       name: 'CastError',
//       message: `Code not found - ${code}`,
//       path: 'code'
//     })
//   }
//   if (client) return res.status(200).json(...client)
// }
