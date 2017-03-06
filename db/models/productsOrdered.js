'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const ProductOrdered = db.define('productsOrdered', {
	price: Sequelize.INTEGER,
  	quantity: {
  		type: Sequelize.INTEGER,
  		defaultValue: 1
  }
}, { 
	setterMethods: {
		addOne: function() {
			this.quantity++
			console.log("Our instance quantity:", this.quantity)
		},
		removeOne: function() {
			this.quantity--
		},
		changeQuantity: function(num) {
			this.quantity = num
		}
	}
})

module.exports = ProductOrdered
