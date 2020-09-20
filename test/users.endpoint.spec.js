const knex = require('knex')
const app = require('../src/app');
const { makeUsersArray, makeMaliciousUser } = require('./users.fixtures')
const { makeTracksArray } = require('./tracks.fixtures')
const supertest = require('supertest');

describe.skip(`Users API Endpoints`, () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });
    after('disconnect from the database', () => db.destroy());

    before('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY;'));


    describe('GET /api/users', () => {

        context(`Given there are users in the db`, () => {
        
            const testUsers = makeUsersArray();
            
            beforeEach('insert users into db', () => {
                return db
                .into('users')
                .insert(testUsers);
            })
            
            it('responds with 200 and all of the tracks', function () {
                return supertest(app)
                .get('/api/tracks')
                .expect(200, testTracks)
            });
            
        });
    });
});