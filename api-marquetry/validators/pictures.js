const { check } = require('express-validator')
const validateResult = require('../helpers/validateHelper')

const validateCreate = [
  check('type').exists().isString().not().isEmpty(),
  check('molding').exists().isString().not().isEmpty(),
  check('glass').exists().isString().not().isEmpty(),
  check('margin').optional().isNumeric(),
  check('amount').exists().isInt({ min: 1 }).isNumeric().not().isEmpty(),
  check('measure').exists().isObject().not().isEmpty(),
  check('measure.height').exists().isNumeric().not().isEmpty(),
  check('measure.width').exists().isNumeric().not().isEmpty(),
  check('price').exists().isInt().isNumeric().not().isEmpty(),
  check('payment').isInt().isNumeric(),
  check('note').isString(),
  check('photo').optional().isString(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = validateCreate
