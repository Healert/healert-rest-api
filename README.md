
# hapijs-mongoose-restapi

This is a boilerplate for creating a RESTful API using hapi.js and mongoose. The code for creating the API has been explained in this [Medium Post](https://medium.com/jsessentials/build-a-restful-api-using-hapijs-and-mongoose-4903590c5663)

[![bitHound Dependencies](https://www.bithound.io/github/chetanraj/hapijs-mongoose-restapi/badges/dependencies.svg)](https://www.bithound.io/github/chetanraj/hapijs-mongoose-restapi/master/dependencies/npm) [![Known Vulnerabilities](https://snyk.io/test/github/chetanraj/hapijs-mongoose-restapi/badge.svg)](https://snyk.io/test/github/chetanraj/hapijs-mongoose-restapi) [![Build Status](https://travis-ci.org/chetanraj/hapijs-mongoose-restapi.svg?branch=master)](https://travis-ci.org/chetanraj/hapijs-mongoose-restapi) [![CircleCI](https://circleci.com/gh/chetanraj/hapijs-mongoose-restapi.svg?style=svg)](https://circleci.com/gh/chetanraj/hapijs-mongoose-restapi) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![Coverage Status](https://coveralls.io/repos/github/chetanraj/hapijs-mongoose-restapi/badge.svg?branch=master)](https://coveralls.io/github/chetanraj/hapijs-mongoose-restapi?branch=master)

## Directory Layout

```bash
.
├── app.js                  // App and Entry Point
├── /config/database.js             // MongoDB Connection
├── /controllers/                // Controllers
├── /helpers/                // Helper code
├── /models/                // DB Models
│   └── Wolf.js             // Schema
├── /routes/                // DB Models
│   └── wolves.js           // Routes
├── /services/                // Services
├── /test/                // Tests
├── /node_modules/          // Project Dependencies[pm modules]
├── package.json
└── yarn.lock
```

## Getting Started

```
docker-compose up --build
```
This will watch for changes and restart

## Open Dev Console in another terminal
```
docker-compose exec nodejs sh
```

### Example routes

* http://localhost:4000
* http://localhost:4000/api

GET
* http://localhost:4000/api/wolves

POST
* http://localhost:4000/api/wolves/Coyote

---
Made with ♥ by Healert team
