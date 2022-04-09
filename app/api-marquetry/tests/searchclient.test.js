const mongoose = require('mongoose')
const { server } = require('../app')
const { api, searchByName } = require('./helpers')

const Client = require('../models/Client')

beforeEach(async () => {
  await Client.deleteMany({})

  const save = searchByName.map(client => {
    const newClient = new Client(client)
    return newClient.save()
  })

  await Promise.allSettled(save)
})

describe('Search clients by name', () => {
  test('Should return client by full name ( Luisa Fernanda Velasquez Medina )', async () => {
    const fullName = 'Luisa Fernanda Velasquez Medina'

    const response = await api.get(`/api/marquetry/search?q=${fullName}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body[0].name).toBe(fullName)
    expect(response.body.length).toBe(1)
  })

  test('Should return client by incomplete name ( Fer )', async () => {
    const incompleteName = 'Fer'

    const response = await api.get(`/api/marquetry/search?q=${incompleteName}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const names = response.body.map(({ name }) => name)

    expect(names).toEqual(expect.arrayContaining([incompleteName]))
    expect(names.length).toBe(searchByName.length)
  })

  test('Should return clients by same firts name ( Luisa )', async () => {
    // const clientsFirstName = resultClient.filter(({ name: firstName }) =>
    //   resultClient.filter(({ name }) => name.includes(firstName.split(' ')[0])).length > 1
    // )
    const firstName = 'Luisa'

    const response = await api.get(`/api/marquetry/search?q=${firstName}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const content = response.body

    expect(content.length).toBe(1)
    expect(content[0].name.split(' ')[0]).toBe(firstName)
  })

  test('Should return clients by same firts and middle name ( Fernanda Velasquez )', async () => {
    // const clientsFirstName = resultClient.filter(({ name: firstName }) =>
    //   resultClient.filter(({ name }) => name.includes(firstName.split(' ')[0])).length > 1
    // )
    const firstName = 'Fernanda Velasquez'
    const namesExpect = ['Luisa Fernanda Velasquez Medina', 'Fernanda Velasquez']

    const response = await api.get(`/api/marquetry/search?q=${firstName}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const names = response.body.map(({ name }) => name)

    expect(names.length).toBe(namesExpect.length)
    expect(names).toEqual(expect.arrayContaining(namesExpect))
  })
})

//

describe('Errors Search clients by name', () => {
  test('Should return an error for WRONG name', async () => {
    const wrongName = 'this name does not exist'
    const response = await api.get(`/api/marquetry/search?q=${wrongName}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.length).toBe(0)
  })

  test('Should return an error for MISSING name', async () => {
    const response = await api.get('/api/marquetry/search?q=')
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
