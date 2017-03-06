const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res, next) => {
  if (req.user === undefined) res.status(403).send(message)
  else if (req.user.dataValues.role === 'admin') { next() }
}

module.exports = {mustBeLoggedIn, selfOnly, forbidden}

// controlling authentication in the backend / routes, instead of just in the frontend

// write a filter to keep out non-admins
