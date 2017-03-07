'use strict'

const db = require('APP/db')
const User = db.model('users')
const Review = db.model('reviews')

const {mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list users'), (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))
	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))
	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		User.findById(req.params.id, {include: [Review]})
		.then(user => res.json(user))
		.catch(next))
	.put('/', (req, res, next) => {
  	User.update({role: req.body.role}, {where: {id: req.body.id}, returning: true})
		.then(updatedStatus => res.send(updatedStatus[1][0].dataValues))
		.catch(next)
})
