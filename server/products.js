'use strict'

const db = require('APP/db')
//note: we don't know if this should be 'products' or 'product'
const Product = db.model('products')
const Review = db.model('reviews')
const router = require('express').Router();

//we want to return all products in the db as a json response
router.get('/', function(req, res, next){
	Product.findAll()
				 .then( products => res.json(products))
				 .catch(next)
})

// View a single product and its reviews
router.get('/:productId', (req, res, next) => {
	Product.findOne({
			where: { id: req.params.productId}, 
			include: [{ model: Review, where: { product_id: req.params.productId } }]
		})
		.then(product => res.json(product))
		.catch(next)
})

// Post a review for a given product
router.post('/:productId/review', (req, res, next) => {
	Review.create(req.body)
		.then((review) => {
			res.status(204).json(review)
		})
		.catch(next)
})

//
module.exports = router;