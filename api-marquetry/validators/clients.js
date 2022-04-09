const { check } = require('express-validator')
const validateResult = require('../helpers/validateHelper')

const validateCreate = [
  check('name').exists().isString().not().isNumeric().not().isEmpty(),
  check('phone').exists().not().isEmpty().isMobilePhone(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = validateCreate
