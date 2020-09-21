require('dotenv').config()
process.env.TZ = 'UTC'
process.env.NODE_ENV = 'test'
process.env.API_TOKEN = 'test-auth-token'

// for pancake
// process.env.TEST_DATABASE_URL = process.env.DATABASE_URL

const {
    expect
} = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest
