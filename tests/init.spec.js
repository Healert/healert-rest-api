const mongoUnit = require('mongo-unit')

mongoUnit.start().then(() => {
  console.log('fake mongo is started: ', mongoUnit.getUrl())
  process.env.MONGO_URL = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
  run() // this line start mocha tests
})

after(() => {
  return mongoUnit.stop()
})