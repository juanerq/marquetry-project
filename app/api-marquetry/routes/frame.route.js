const frameRouter = require('express').Router()
const validateCreate = require('../validators/clients')
const validateCreatePicture = require('../validators/pictures')

const createClientController = require('../controllers/createclient.controller')
const createPirctureController = require('../controllers/createpicture.controller')
const getClientController = require('../controllers/getclient.controller')

frameRouter.route('/')
  .post(validateCreate, createClientController.createClient)
  .get(getClientController.getClients)

frameRouter.route('/:id')
  .put(createClientController.updateClient)
  .delete(createClientController.deleteClient)

frameRouter.route('/picture')
  .post(validateCreatePicture, createPirctureController)

frameRouter.route('/search')
  .get(getClientController.searchClient)

module.exports = frameRouter
