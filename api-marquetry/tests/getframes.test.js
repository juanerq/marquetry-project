const mongoose = require('mongoose')
const { server } = require('../app')
const { initialClients, api } = require('./helpers')

const Client = require('../models/Client')

beforeEach(async () => {
  await Client.deleteMany({})

  const save = initialClients.map(client => {
    const newClient = new Client(client)
    return newClient.save()
  })

  await Promise.allSettled(save)
})

describe('GET all information from clients', () => {
  test('Should return the Clients from initialClients', async () => {
    const response = await api.get('/api/marquetry')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toHaveLength(initialClients.length)
  })

  test('A client must have the name Juan Esteban', async () => {
    const response = await api.get('/api/marquetry')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const clients = response.body
    const contents = clients.map(client => client.name)

    expect(contents).toContain('Juan Esteban')
  })
})

describe('GET clients by ID', () => {
  test('Should return client by ID', async () => {
    const client = await api.get('/api/marquetry')
    const idClient = client.body[0].id

    const response = await api.get(`/api/marquetry/search?id=${idClient}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.id).toBe(idClient)
  })

  test('Should return an error for WRONG ID', async () => {
    const wrongId = '54321'
    const response = await api.get(`/api/marquetry/search?id=${wrongId}`)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const error = response.body

    expect(error.message).toEqual(expect.stringContaining(wrongId))
    expect(error.status).toBe('error')
    expect(error.path).toBe('_id')
  })

  test('Should return an error for MISSING ID', async () => {
    const response = await api.get('/api/marquetry/search?id=')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    const error = response.body
    expect(error.message).toBe('Not found')
  })

  test('Should return an error for MISSING QUERY', async () => {
    const response = await api.get('/api/marquetry/search')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    const error = response.body
    expect(error.message).toBe('Not found')
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

// describe('GET clients by code', () => {
//   test('Should return Client by CODE', async () => {
//     const frame = await api.get('/api/marquetry')
//     const resultFrame = frame.body[0]

//     const response = await api.get(`/api/marquetry/search?code=${resultFrame.code}`)
//       .expect('Content-Type', /application\/json/)
//       .expect(200)

//     expect(response.body.code).toBe(resultFrame.code)
//     expect(response.body.id).toBe(resultFrame.id)
//   })

//   test('Should return an error for WRONG CODE', async () => {
//     const wrongCode = '85875875'
//     const response = await api.get(`/api/marquetry/search?code=${wrongCode}`)
//       .expect('Content-Type', /application\/json/)
//       .expect(400)

//     const error = response.body

//     expect(error.message).toEqual(expect.stringContaining(wrongCode))
//     expect(error.status).toBe('error')
//     expect(error.path).toBe('code')
//   })

//   test('Should return an error for MISSING CODE', async () => {
//     const response = await api.get('/api/marquetry/search?code=')
//       .expect('Content-Type', /application\/json/)
//       .expect(404)

//     const error = response.body
//     expect(error.message).toBe('Not found')
//   })
// })
