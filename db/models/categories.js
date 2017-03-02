'use strict'

const db = require('APP/db')
const Sequelize = require('sequelize')

const Category = db.define('categories', {
  name: Sequelize.STRING
})

module.exports = Category
