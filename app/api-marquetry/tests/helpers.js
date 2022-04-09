const supertest = require('supertest')
const { app } = require('../app')
const api = supertest(app)

const initialClients = [
  {
    name: 'Juan Esteban',
    phone: '3207509544'
  },
  {
    name: 'Maria Paula',
    phone: '3163490567'
  },
  {
    name: 'Fernanda',
    phone: '3112993103'
  }
]

const searchByName = [
  {
    name: 'Luisa Fernanda Velasquez Medina',
    phone: '3112993103'
  },
  {
    name: 'Fernanda Velasquez',
    phone: '3112993103'
  },
  {
    name: 'Fernanda',
    phone: '3112993103'
  },
  {
    name: 'Fer',
    phone: '3112993103'
  }
]

module.exports = {
  initialClients,
  searchByName,
  api
}
