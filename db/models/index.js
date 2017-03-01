'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./products')
const Review = require('./reviews')
const Order = require('./orders')
const ProductsOrdered = require('./productsOrdered')
const Category = require('./categories')

// associations
User.hasMany(Review)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)
Order.belongsTo(User)
ProductsOrdered.belongsTo(Order)
Order.hasMany(ProductsOrdered)
Product.hasMany(ProductsOrdered)
Category.belongsToMany(Product, { through: 'ProductsCategories' })

module.exports = {User, Product, Review, Order, ProductsOrdered}
