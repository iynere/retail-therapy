'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
  name : {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  // categories: {
  //  //tbd - do we want to keep it an array or make it into a concat string and then use a getter method
  //  type: Sequelize.ARRAY(Sequelize.STRING)
  // },
  price: {
    //number is *100 to account for decimals
    type: Sequelize.INTEGER,
    allowNull: false,
        get: function() {
          return '$' + (this.getDataValue('price') / 100);
        }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  photoUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product
