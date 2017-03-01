'use strict'

const db = require('APP/db')
//note: we don't know if this should be 'products' or 'product'
const Review = db.model('reviews')
const router = require('express').Router();

// Post a review of a given product
router.post('/:productId/review', (req, res, next) => {
	Review.create(req.body)
		.then((review) => {
			res.json(review)
		})
		.catch(next)
})