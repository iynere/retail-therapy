const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
const Order = require('APP/db/models/orders')
const Product = require('APP/db/models/products')
const ProductOrdered = require('APP/db/models/productsOrdered')

const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()


/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/facebook/login`,
  },
  passport
})

// Google needs the GOOGLE_CLIENT_SECRET AND GOOGLE_CLIENT_ID
// environment variables.
OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/google/login`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecrets: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/github/login`,
  },
  passport
})

// Other passport configuration:
// Passport review in the Week 6 Concept Review:
// https://docs.google.com/document/d/1MHS7DzzXKZvR6MkL8VWdCxohFJHGgdms71XNLIET52Q/edit?usp=sharing
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        debug('deserialize did ok user.id=%d', user.id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

// require.('passport-local').Strategy => a function we can use as a constructor, that takes in a callback
passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

auth.get('/whoami', (req, res) => res.send(req.user))

// PUT requests for local login:
// in addition to logging in via passport.authenticate, take anything saved to the cart on state & add it to the cart in the database
auth.put('/local/login', passport.authenticate('local', { successRedirect: '/', }))

// GET requests for OAuth login:
// Register this route as a callback URL with OAuth provider
auth.get('/:strategy/login', (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    scope: 'email',
    successRedirect: '/',
    // Specify other config here, such as "scope"
  })(req, res, next)
)

auth.put('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

// Creates anonymous user and starts a cart. We'll only hit this route the first time the user clicks "Add to cart"
// Check if the user exists in local storage before hitting this route again
auth.post('/anon/:productId', (req, res, next) => {
  User.create({
    role: 'anonymous'
  })
  .then(createdUser => {
    Order.create({
      user_id: createdUser.id
    })
    .then(createdOrder => {
      Product.findById(req.params.productId)
        .then(product => {
          ProductOrdered.create({
            price: Number(product.price.slice(1))*100,
            product_id: product.id,
            order_id: createdOrder.id
          })
          res.json(createdUser)
        })
    })
  })
  .catch(next)
})

module.exports = auth

// updates bones uses passport-local for local login/signup so we dont need these

// auth.put('/local/login', (req, res, next) =>
//  passport.authenticate('local', {
//    successRedirect: '/'
//  })(req, res, next)
// )

// auth.post('/local/signup', (req, res, next) => {
//  User.create(req.body)
//    .then(user => {
//      res.status(201).json(user)
//    })
//    .catch(next)
// })