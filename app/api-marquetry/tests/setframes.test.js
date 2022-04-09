const { api } = require('./helpers')
const { server } = require('../app')
const mongoose = require('mongoose')
const Frame = require('../models/Client')

beforeEach(async () => {
  await Frame.deleteMany({})
})

describe('POST frames', () => {
  test('A valid frame can be addred', async () => {
    const newFrame = {
      name: 'midudev',
      phone: 3313133113,
      price: 25000,
      payment: 10000,
      note: 'hola como vas?',
      photo: 'https://yt3.ggpht.com/ytc/AKedOLTBFvOrff69Sw8UxdRsEF5ABUpNZpxfmm86VNZZgQ=s48-c-k-c0x00ffffff-no-rj'
    }

    await api
      .post('/api/marquetry')
      .send(newFrame)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/marquetry')

    const frames = response.body
    const contents = frames.map(frame => frame.name)

    expect(frames[0].code).toBe(1)
    expect(contents).toContain('midudev')
  })

  test('Should return errors for required empty fields', async () => {
    const newFrame = {
      name: '',
      phone: null,
      price: null,
      payment: null,
      note: '',
      photo: ''
    }
    const required = ['name', 'phone', 'price', 'payment']
    const optional = ['note', 'photo']

    const response = await api.post('/api/marquetry')
      .send(newFrame)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const errors = response.body.errors
    const errosParams = errors.map(e => e.param)

    expect(errosParams).toEqual(expect.arrayContaining(required))
    expect(errosParams).toEqual(expect.not.arrayContaining(optional))
  })

  test('Should return errors for wrong data type in fields', async () => {
    const newFrame = {
      name: 123,
      phone: 'hello',
      price: 'ninety thousand',
      payment: 'nothing',
      note: 2892892,
      photo: 999
    }
    const dataTypeError = Object.keys(newFrame)

    const response = await api.post('/api/marquetry')
      .send(newFrame)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const errors = response.body.errors
    const errosParams = errors.map(e => e.param)

    expect(errosParams).toEqual(expect.arrayContaining(dataTypeError))
  })
})

afterAll(async () => {
  await Frame.deleteMany({})
  mongoose.connection.close()
  server.close()
})
