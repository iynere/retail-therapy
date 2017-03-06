'use strict'

const router = require('express').Router()
const db = require('APP/db')

// models we need
const Order = db.model('orders')
const Product = db.model('products')
const ProductOrdered = db.model('productsOrdered')
const User = db.model('users')

router.get('/', (req, res, next) => {
  Order.findAll({})
       .then(orders => res.json(orders))
       .catch(err => console.error(err))
})

router.put('/', (req, res, next) => {
  console.log('THIS IS THE BODY:', req.body)
  Order.update({status: req.body.status}, {where: { id: req.body.id}, returning: true})
       .then(updatedStatus => {
          console.log('/////////////////////', updatedStatus)
          res.send(updatedStatus[1][0].dataValues)
       })
       .catch(err => console.error(err))
})

router.get('/:userId/cart', (req, res, next) => {
  // still only for logged-in users for now
  Order.findOne({
    where: {
      status: 'cart',
      user_id: req.params.userId
    }
  })
    .then(userOrder => {
      ProductOrdered.findAll({
        where: {
          order_id: userOrder.id
        },
        include: [Product]
      })
        .then(cartWithProducts => {
          res.json(cartWithProducts)
        })
    }).catch(next)
})

// We are querying the DB too many times, remember we have a table called ProudctsOrdered that
// has accessed to the orders and products related, we can use this table
router.post('/:productId/:userId', (req, res, next) => {
  // only for logged-in users for now
  Order.findOrCreate({
    where: {
      status: 'cart',
      user_id: req.params.userId
    }
  })
    .then(createdOrUpdatedOrder => {
      Order.findOne({
        where: {
          status: 'cart',
          user_id: req.params.userId
        }
      })
        .then(order => {
          Product.findById(req.params.productId)
            .then(product => {
              ProductOrdered.create({
                price: Number(product.price.slice(1))*100,
                product_id: product.id,
                order_id: order.id
              })
                res.json(product)
            })
          })
      }).catch(next)
})

module.exports = router

// we tried using redux-persist to persist the cart, but it doesn't qualify the persistence based on who's logged in, etc
// each time we create a cart (aka add a product to it), we create a new Order instance (with default status of 'cart')
// THEN (order_id needs to exist), add the product to the productsOrdered table (aka, create a new productsOrdered instance)
// (when checking out, we will have to update the price of the product in the productsOrdered table)

