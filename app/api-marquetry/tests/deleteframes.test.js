const { api, initialFrames } = require('./helpers')
const { server } = require('../app')
const mongoose = require('mongoose')
const Frame = require('../models/Frame')

beforeEach( async () => {
  await Frame.deleteMany({})

  const newFrame = new Frame({})

})

describe('DELETE frame', () => {
  test('should ', () => {
    api.delete(`/api/marquetry/${}`)
  });
});

afterAll(() => {
  mongoose.connection.close()
  server.close()
})