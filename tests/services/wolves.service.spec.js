const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const testMongoUrl = process.env.MONGO_URL
const testData = require('../fixtures/wolvesData.json')

let service
let db ;
mongoUnit.start({ dbName: 'wolves' }).then(() => {
  process.env.MONGO_URL = mongoUnit.getUrl()
  run() // this line start mocha tests
})

after(async () => {
  await mongoUnit.stop()
  db.close();
})

describe('service', () => {
  before(() => {
    db = require('../../config/database').db;
    // create it after DB is started
    service = require('./../../services/wolves.service')
  })
  beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
  afterEach(() => {
    mongoUnit.drop()
  })

  it('should find all wolves', () => {
    return service.getWolves().then(wolves => {
      expect(wolves.length).to.equal(1)
      expect(wolves[0].name).to.equal('Ghost')
    })
  })

  it('should create new wolf', () => {
    return service
      .addWolf({ name: 'Grey', completed: false })
      .then(wolf => {
        expect(wolf.name).to.equal('Grey')
      })
      .then(() => service.getWolves())
      .then(wolves => {
        expect(wolves.length).to.equal(2)
        expect(wolves[1].name).to.equal('Grey')
      })
  })
  it('should remove wolf', () => {
    return service
      .getWolves()
      .then(wolves => wolves[0]._id)
      .then(wolfId => service.deleteWolf(wolfId))
      .then(() => service.getWolves())
      .then(wolves => {
        expect(wolves.length).to.equal(0)
      })
  })
})