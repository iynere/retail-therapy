'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

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
		type: Sequelize.TEXT,
		// add validator for text length
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
})

module.exports = Review