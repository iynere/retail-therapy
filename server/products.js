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
	Product.findById(req.params.productId/*, {include: [Review]}*/)
		.then(product => res.json(product))
		.catch(next)
})

router.put('/edit/:productId', (req, res, next) => {
	Product.findById(req.params.productId/*, {include: [Review]}*/)
		.then(product => res.json(product))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Product.create(req.body)
		   .then(review => res.json(review))
		   .catch(next)
})

module.exports = router;
