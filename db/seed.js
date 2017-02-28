const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  //dummy data for now
  {name: 'happiness', description:'this emotion is rare but the best', categories: ['rare', 'extreme'] , price: 5000 , photoUrl: 'http://www.pursuit-of-happiness.org/wp-content/uploads/positivity.jpg' },
  {name: 'sadness', description:'this emotion ', categories: ['rare', 'extreme'] , price: 100 , stock: 10000 , photoUrl: 'http://weknownyourdreamz.com/images/sadness/sadness-07.jpg' }
  
  
], product => db.model('products').create(product))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
