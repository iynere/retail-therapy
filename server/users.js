'use strict'

const db = require('APP/db')
const User = db.model('users')
const Review = db.model('reviews')
const nodemailer = require('nodemailer')

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

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
  .get('/:id/orderConfirm', /*mustBeLoggedIn,*/ (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        let transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'retail.therapy.app@gmail.com',
              pass: 'makemefeelbetter',
            }
        })
        
        let mailOptions = {
          from: 'Retail Therapy at Grace Hopper Academy',
          to: user.email,
          subject: 'Order Confirmation',
          html: 'Your order from Retail Therapy was received, thank you.'
        }
        
        transport.sendMail(mailOptions, (error, info) => {
          if (error) console.error(error)
          else console.log(`Message sent: ${info.response}`)
        })
        
        res.json(user)
      })
  })
  .put('/', (req, res, next) =>
    User.update({role: req.body.role}, {where: {id: req.body.id}, returning: true})
    .then(updatedStatus => res.send(updatedStatus[1][0].dataValues))
    .catch(next))
  .put('/:userId', (req, res, next) => {
    User.update({email: req.body.email}, {where: {id: req.params.userId}, returning: true})
    .then(updatedUserEmail => res.sendStatus(201))
    .catch(next)
  })
  .delete('/:userId', (req, res, next) =>
    User.destroy({where: {id: req.params.userId}})
    .then(deleted => res.status(204).send())
    .catch(next))

