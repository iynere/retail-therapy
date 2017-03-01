'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM('processing', 'completed', 'cancelled', 'created'),
    allowNull: false,
    defaultValue: 'created'
  }
})

module.exports = Order
