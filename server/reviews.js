'use strict'

const router = require('express').Router();
const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users')
const Product = db.model('products')
const {mustBeLoggedIn} = require('./auth.filters')

router.get('/products/:productId', (req, res, next) => {
	Review.findAll({
		where: {
			product_id: req.params.productId
		},
		include: [User]
	})
		.then(reviews => res.json(reviews))
		.catch(next)
})

router.get('/users/:userId', mustBeLoggedIn, (req, res, next) => {
	Review.findAll({
		where: {
			user_id: req.params.userId
		},
		include: [Product]
	})
		.then(reviews => res.json(reviews))
		.catch(next)
})

router.post('/:productId', mustBeLoggedIn, (req, res, next) => {
	Review.create({
		rating: req.body.rating,
		text: req.body.text,
		product_id: req.params.productId,
		user_id: req.user.id
	})
		.then(review => {
			res.json(review)})
		.catch(next)
})

module.exports = router
