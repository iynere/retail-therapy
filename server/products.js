'use strict'

const db = require('APP/db')
//note: we don't know if this should be 'products' or 'product'
const Product = db.model('products')
const router = require('express').Router();

//we want to return all products in the db as a json response
router.get('/', function(req, res, next){
	Product.findAll()
				 .then( products => res.json(products))
				 .catch(next)
})

router.get('/:productId', (req, res, next) => {
	Product.findById(req.params.productId)
		.then(product => res.json(product))
		.catch(next)
})

module.exports = router;