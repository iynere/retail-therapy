'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM('cart', 'processing', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'cart'
  }
})

module.exports = Order
