'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const User = require('./user')
const Product = require('./products')

const Review = db.define('reviews', {
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {min: 1, max: 5}
	},
	text: {
		type: Sequelize.TEXT('medium'),
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
})

User.hasMany(Review)
Product.hasMany(Review)

module.exports = Review