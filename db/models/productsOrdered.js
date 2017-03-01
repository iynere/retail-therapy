'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const ProductOrdered = db.define('productsOrdered', {
  price: {
    type: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
  }
})

module.exports = ProductOrdered
