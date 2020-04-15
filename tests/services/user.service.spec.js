const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const testMongoUrl = process.env.MONGO_URL
const testData = require('../fixtures/usersData.json')

let service
let db ;

after(async () => {
    await mongoUnit.stop()
    db.close();
})

describe('service', () => {
    before(() => {
      db = require('../../config/database').db;
      // create it after DB is started
      service = require('../../services/user-service')
    })
    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
    afterEach(() => {
      mongoUnit.drop()
    })

    it('should save a new user', () => {
        let payload = {
            first_name : 'Test',
            last_name : 'user',
            dob : '2002-01-01',
            phone_number : '0708000000',
            gender : 'Female',
            creator_id : '12345'
        }
        return service
          .saveUser(payload)
          .then(user => {
            expect(user.first_name).to.equal('Test')
            expect(user.phone_number).to.equal('0708000000')
          })
          .then(() => service.getUsers())
          .then(users => {
            expect(users.length).to.equal(3)
        });;
    })

    it('should save user contact', () => {
        let payload = {
            first_name : 'Test',
            last_name : 'user2',
            dob : '2002-02-02',
            phone_number : '0709000000',
            gender : 'Male',
            creator_id : '12345',
            user_id : '5e94516f93032a0064076d1c'
        }
        return service
          .saveUserContact(payload)
          .then()
          .then(() => service.getUsers())
          .then(users => {
            expect(users.length).to.equal(3)
        });
    })

    it('should find all users', () => {
        return service.getUsers().then(users => {
          expect(users.length).to.equal(2)
          expect(users[0].first_name).to.equal('Test')
        })
    })

    it('should find user by user id', () => {
      const user_id = '5e94516f93032a0064076d1c';
      return service.getUserById(user_id).then(users => {
        expect(users.length).to.equal(0)
      })
    });

    it('should find user by creator id', () => {
      const creator_id = 'q5YBcoW8TTVBr3mk8uFNiUdc8nz2';
      return service.getUsersByCreator(creator_id).then(users => {
        expect(users.length).to.equal(2)
        expect(users[0].first_name).to.equal('Test')
      })
    })
});