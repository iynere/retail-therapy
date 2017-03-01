'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./products')
const Review = require('./reviews')

// associations
User.hasMany(Review)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)

module.exports = {User, Product, Review}
