const middleware = (error, req, res, next) => {
  console.error(error)

  const message = {
    status: 'error',
    name: error.name,
    message: error.message,
    path: error.path
  }

  if (error.name === 'CastError') {
    res.status(400).json(message)
  } else {
    res.status(500).json(message)
  }
}

module.exports = middleware
