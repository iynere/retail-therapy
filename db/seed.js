const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', role:'basic', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', role:'admin', email: 'barack@example.gov', password: '1234'},
  {name: 'Stephanie Cure', role: 'basic', email: 'sc@gmail.com', password: '123123'},
  {name: 'Anna Pamela Calinawan', role: 'basic', email: 'an@gmail.com', password: '123123'},
  {name: 'Andrea Cornaglia', role: 'basic', email: 'ac@gmail.com', password: '123123'},
  {name: 'Rose Kaplan Bomberg', role: 'basic', email: 'rk@gmail.com', password: '123123'}
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  //dummy data for now
  {name: 'happiness', description:'this emotion is rare but the best', categories: ['rare', 'extreme'] , price: 5000 , photoUrl: '/images/happiness.png' },
  {name: 'sadness', description:'this emotion ', categories: ['rare', 'extreme'] , price: 100 , stock: 10000 , photoUrl: '/images/sadness.png' },
  {name: 'love', description:'lorem ipsum dolor sit amet', categories: ['rare', 'extreme'] , price: 100 , stock: 10000 , photoUrl: '/images/love.png' },
  {name: 'hope', description:'this emotion ...', categories: ['rare', 'extreme'] , price: 100 , stock: 10000 , photoUrl: '/images/hope.png' },
  {name: 'anger', description:'this emotion ...', categories: ['rare', 'extreme'] , price: 100 , stock: 10000 , photoUrl: '/images/anger.png' }
], product => db.model('products').create(product))

const seedReviews = () => db.Promise.map([
  {rating: 5, text: "This made me so happy!", product_id: 1, user_id: 3},
  {rating: 2, text: "This made me so sad!", product_id: 2, user_id: 6},
  {rating: 4, text: "This is the greated product ever!", product_id: 4, user_id: 2},
  {rating: 5, text: "This product helped me a lot I strongly recommend it!", product_id: 3, user_id: 4}
], review => db.model('reviews').create(review))

const seedOrders = () => db.Promise.map([
  { status: 'completed', user_id: 2, shippingAddress: '123 Dumbo Street, NY', billingAddress: '123 Dumbo Street, NY' },
  { status: 'processing', user_id: 3, shippingAddress: '4567 Einstein Street, MA' },
  { status: 'cancelled', user_id: 4, shippingAddress: '1020 Wall Street, NY', billingAddress: '1020 Wall Street, NY' },
  { status: 'cart', user_id: 2, shippingAddress: '132 Cooper sreett, NY', billingAddress: '132 Cooper sreett, NY' },
  { status: 'completed', user_id: 5, shippingAddress: '498 Bug sreett, VA', billingAddress: '498 Bug sreett, VA' },
  { status: 'completed', user_id: 6, shippingAddress: '787 Broadway sreett, VA', billingAddress: '787 Broadway sreett, VA' }
], order => db.model('orders').create(order))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(seedReviews)
  .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
  .then(seedOrders)
  .then(orders => console.log(`Seeded ${orders.length} orders OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
