'user strict'

const db = require('APP/db')
const Product = require('../models/products')
const {expect} = require('chai')

describe('Product', () => {
  before('wait for db', () => db.didSync)

  describe('Product is declared and has validations', () => {
    afterEach(function () {
      return db.sync({force: true})
    })

    it('has a name that is a string and cant be empty', () =>
      Product.create({
        name: 'Pokeball',
        description: 'White and red device in the form of a sphere to catch pokemons',
        price: 100,
        stock: 10})
        .then(product => expect(product.name).to.equal('Pokeball'))
    )
  })
})
